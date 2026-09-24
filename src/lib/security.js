/**
 * MESA Security Core — Faz 0 Güvenlik Kilidi
 * ─────────────────────────────────────────────────
 * Statik frontend prototipi için sunucu tarafı kontrollerin
 * tarayıcı katmanı karşılıkları:
 *
 *  - Login rate limiting (IP/hesap bazlı, sliding window)
 *  - Oturum boşta kalma zaman aşımı (inactivity timeout)
 *  - Güvenlik olaylarının audit log köprüsü (OperationalContext ile aynı zincire yazar)
 *  - Dosya doğrulama (MIME + uzantı beyaz listesi + boyut sınırı)
 *
 * ÜRETİM NOTU: Bunlar savunma derinliğidir; gerçek güvenlik yalnızca
 * sunucu tarafı auth + tenant izolasyonu + HttpOnly cookie ile sağlanır.
 */

const RATE_KEY = 'mesa_rate_limits';
const AUDIT_KEY = 'mesa_audit_logs';
export const AUDIT_EVENT_NAME = 'mesa_audit_event';
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 dakika boşta kalma
const SESSION_ACTIVITY_KEY = 'mesa_last_activity';

// ─────────────────────────────────────────────
// Sliding-window rate limiter (login, QR talep, dosya yükleme)
// ─────────────────────────────────────────────
const safeRead = (key, fallback) => {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
};

const safeWrite = (key, value) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch { /* kota dolu — sessizce devam */ }
};

/**
 * @param {string} identifier - örn. "login:abcoinsaat@gmail.com"
 * @param {number} maxAttempts
 * @param {number} windowMs
 * @returns {{ allowed: boolean, retryAfterSec: number, remaining: number }}
 */
export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const buckets = safeRead(RATE_KEY, {});
    const bucket = (buckets[identifier] || []).filter(ts => now - ts < windowMs);

    if (bucket.length >= maxAttempts) {
        const oldest = bucket[0];
        const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
        return { allowed: false, retryAfterSec, remaining: 0 };
    }

    bucket.push(now);
    buckets[identifier] = bucket;

    // Eski kayıtları temizle (storage hijyeni)
    Object.keys(buckets).forEach(key => {
        buckets[key] = buckets[key].filter(ts => now - ts < windowMs);
        if (buckets[key].length === 0) delete buckets[key];
    });
    safeWrite(RATE_KEY, buckets);

    return { allowed: true, retryAfterSec: 0, remaining: maxAttempts - bucket.length };
}

export function resetRateLimit(identifier) {
    const buckets = safeRead(RATE_KEY, {});
    delete buckets[identifier];
    safeWrite(RATE_KEY, buckets);
}

// ─────────────────────────────────────────────
// Oturum boşta kalma zaman aşımı
// ─────────────────────────────────────────────
export function touchActivity() {
    safeWrite(SESSION_ACTIVITY_KEY, Date.now());
}

export function isSessionExpired() {
    const last = safeRead(SESSION_ACTIVITY_KEY, 0);
    if (!last) return false;
    return Date.now() - last > SESSION_TIMEOUT_MS;
}

export function clearActivity() {
    if (typeof window === 'undefined') return;
    try { window.localStorage.removeItem(SESSION_ACTIVITY_KEY); } catch { /* no-op */ }
}

/** Kullanıcı etkileşimlerini dinleyip oturum aktivitesini günceller. */
export function startActivityWatch() {
    if (typeof window === 'undefined' || window.__mesaActivityWatch) return;
    const handler = () => touchActivity();
    ['click', 'keydown', 'scroll', 'touchstart'].forEach(evt =>
        window.addEventListener(evt, handler, { passive: true })
    );
    window.__mesaActivityWatch = true;
}

// ─────────────────────────────────────────────
// Audit log köprüsü (OperationalContext zincirine yazar)
// ─────────────────────────────────────────────
export function appendSecurityAudit(entry) {
    const log = {
        id: 'aud_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
        timestamp: new Date().toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        actorName: entry.actorName || 'Bilinmeyen',
        actorRole: entry.actorRole || 'anonymous',
        actionType: entry.actionType || 'SECURITY_EVENT',
        details: entry.details || '',
        resourceType: entry.resourceType || 'security',
        resourceId: entry.resourceId || '-'
    };
    const logs = safeRead(AUDIT_KEY, []);
    logs.unshift(log);
    safeWrite(AUDIT_KEY, logs.slice(0, 500)); // üst sınır

    // Canlı senkron: OperationalContext bu olayı dinleyip state'ine ekler
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(AUDIT_EVENT_NAME, { detail: log }));
    }
    return log;
}

// ─────────────────────────────────────────────
// Dosya doğrulama (kanıt yükleme güvenliği)
// ─────────────────────────────────────────────
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];
const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.pdf'];
const MAX_FILE_MB = 10;

/**
 * @param {File} file
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateEvidenceFile(file) {
    if (!file) return { valid: false, error: 'Dosya bulunamadı.' };
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
        return { valid: false, error: `Dosya boyutu ${MAX_FILE_MB} MB sınırını aşıyor.` };
    }
    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
    const mimeOk = ALLOWED_MIME.includes(file.type);
    const extOk = ALLOWED_EXT.includes(ext);
    if (!mimeOk || !extOk) {
        appendSecurityAudit({
            actorName: 'Dosya Doğrulayıcı',
            actorRole: 'system',
            actionType: 'FILE_REJECTED',
            details: ` reddedildi: ${file.name} (MIME: ${file.type || 'bilinmiyor'}, Uzantı: ${ext})`,
            resourceType: 'evidence',
            resourceId: file.name
        });
        return { valid: false, error: 'Geçersiz dosya türü. Yalnızca JPG, PNG, WEBP, HEIC ve PDF kabul edilir.' };
    }
    return { valid: true, error: null };
}
