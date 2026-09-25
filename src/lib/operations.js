import { partsCatalogData } from '../data/partsCatalogData';

export const CART_STORAGE_KEY = 'mesa.parts.cart.v1';
export const MAX_CART_ITEMS = partsCatalogData.length;
export const MAX_QUANTITY = 999;
export const JOB_STEPS = Object.freeze({
  'Talep Alındı': 0,
  'Atandı': 1,
  'Mobil Ekip Yolda': 2,
  'Şantiyede': 3,
  'Teşhiste': 3,
  'Onarımda': 4,
  'Tamamlandı': 5,
});
export const PARTS_STATUSES = ['Onay Bekliyor', 'Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'];

const catalog = new Map(partsCatalogData.map(part => [part.id, part]));

export function inputText(value, label, maxLength, required = true) {
  const text = typeof value === 'string' ? value.trim() : '';
  if ((required && !text) || text.length > maxLength) {
    throw new Error(`${label} alanını kontrol edin (en fazla ${maxLength} karakter).`);
  }
  return text;
}

export function quantityValue(value) {
  if (!Number.isInteger(value) || value < 1 || value > MAX_QUANTITY) {
    throw new Error(`Ürün adedi 1–${MAX_QUANTITY} arasında bir tam sayı olmalıdır.`);
  }
  return value;
}

export function canonicalCartItem(partId, quantity) {
  const part = catalog.get(partId);
  if (!part || !part.inStock) throw new Error('Bu ürün şu anda siparişe uygun değil.');
  return { ...part, quantity: quantityValue(quantity) };
}

// Persist IDs and quantities only. Prices, names and images always come from the catalog.
export function parseSavedCart(serialized) {
  if (!serialized) return [];
  const parsed = JSON.parse(serialized);
  if (!Array.isArray(parsed) || parsed.length > MAX_CART_ITEMS) throw new Error('Geçersiz sepet kaydı.');
  const seen = new Set();
  return parsed.map(item => {
    if (!item || typeof item !== 'object' || seen.has(item.id)) throw new Error('Geçersiz sepet kaydı.');
    seen.add(item.id);
    return canonicalCartItem(item.id, item.quantity);
  });
}

export function readSavedCart(storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    if (!target) return { cart: [], error: '' };
    return { cart: parseSavedCart(target.getItem(CART_STORAGE_KEY)), error: '' };
  } catch {
    return { cart: [], error: 'Kayıtlı sepet okunamadı. Yeni sepetiniz bu oturumda kullanılabilir.' };
  }
}

export function saveCart(cart, storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    if (!target) return false;
    target.setItem(CART_STORAGE_KEY, JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity }))));
    return true;
  } catch {
    return false;
  }
}

export function createRecordCode(prefix, cryptoSource = globalThis.crypto) {
  if (!['MS', 'SP'].includes(prefix) || !cryptoSource?.randomUUID) {
    throw new Error('Güvenli kayıt oluşturmak için güncel bir tarayıcı ve HTTPS bağlantısı gerekir.');
  }
  return `${prefix}-${cryptoSource.randomUUID().toUpperCase()}`;
}

export function buildEmergencyJob(jobData, ownerUid, code, createdAt) {
  return {
    id: code,
    code,
    ownerUid,
    customer: inputText(jobData.customer, 'Yetkili adı', 160),
    phone: inputText(jobData.phone, 'Telefon', 40),
    machine: inputText(jobData.machine, 'Makine', 240),
    issue: inputText(jobData.issue, 'Arıza açıklaması', 4000),
    location: inputText(jobData.location, 'Konum', 2000),
    status: 'Talep Alındı',
    stepIndex: 0,
    assignedTechnician: null,
    vehicle: null,
    techDistance: null,
    etaMinutes: null,
    createdAt,
    updatedAt: createdAt,
    partsUsed: [],
    cost: 0,
    supervisorSignature: null,
    technicianSignature: null,
    signerName: '',
    signerRole: '',
    technicianNotes: '',
  };
}

export function buildPartsOrder(orderData, cart, ownerUid, orderCode, createdAt) {
  if (!Array.isArray(cart) || cart.length === 0 || cart.length > MAX_CART_ITEMS) {
    throw new Error('Sipariş için sepetinize ürün ekleyin.');
  }
  const seen = new Set();
  const items = cart.map(item => {
    if (seen.has(item.id)) throw new Error('Sepetinizde yinelenen ürün var.');
    seen.add(item.id);
    const part = canonicalCartItem(item.id, item.quantity);
    return { id: part.id, name: part.name, oem: part.oem || '', quantity: part.quantity, price: part.price };
  });
  return {
    orderCode,
    ownerUid,
    customerName: inputText(orderData.customerName, 'Ad soyad', 160),
    companyName: inputText(orderData.companyName, 'Firma', 240, false),
    phone: inputText(orderData.phone, 'Telefon', 40),
    taxNo: inputText(orderData.taxNo, 'Vergi numarası', 40, false),
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    address: inputText(orderData.address, 'Teslimat adresi', 2000),
    notes: inputText(orderData.notes, 'Sipariş notu', 4000, false),
    status: 'Onay Bekliyor',
    createdAt,
    updatedAt: createdAt,
  };
}

export function jobStatusPatch(status, requestedStep) {
  if (!Object.hasOwn(JOB_STEPS, status)) throw new Error('Geçersiz iş emri durumu.');
  if (requestedStep !== undefined && requestedStep !== JOB_STEPS[status]) {
    throw new Error('İş emri durumu ve aşaması birbiriyle uyuşmuyor.');
  }
  return { status, stepIndex: JOB_STEPS[status] };
}

export function signatureValue(value) {
  if (typeof value !== 'string' || value.length > 150000 || !/^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) {
    throw new Error('Geçerli bir imza ekleyin (en fazla 150 KB).');
  }
  return value;
}

export function signaturePatch(data) {
  const partsUsed = data?.partsUsed || [];
  if (!Array.isArray(partsUsed) || partsUsed.length > 20) throw new Error('En fazla 20 parça satırı kaydedilebilir.');
  return {
    ...jobStatusPatch('Tamamlandı'),
    supervisorSignature: signatureValue(data?.signatureDataUrl),
    signerName: inputText(data?.signerName, 'İmzalayan adı', 160),
    signerRole: inputText(data?.signerRole, 'İmzalayan görevi', 160, false),
    technicianNotes: inputText(data?.technicianNotes, 'Teknisyen notu', 4000, false),
    partsUsed: partsUsed.map(part => ({
      name: inputText(part?.name, 'Parça adı', 240),
      qty: quantityValue(part?.qty),
    })),
  };
}

export function assertOperationRole(isStaff, isAdmin, adminOnly = false) {
  if (!isStaff || (adminOnly && !isAdmin)) throw new Error('Bu işlem için yetkiniz bulunmuyor.');
}

export function friendlyOperationError(error) {
  switch (error?.code) {
    case 'permission-denied': return new Error('Bu kayda erişim yetkiniz yok. Oturumunuzu ve hizmet ayarlarını kontrol edin.');
    case 'unavailable':
    case 'auth/network-request-failed': return new Error('Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip yeniden deneyin.');
    case 'not-found': return new Error('Kayıt bulunamadı; başka bir kullanıcı tarafından silinmiş olabilir.');
    case 'unauthenticated': return new Error('Oturum doğrulanamadı. Yeniden giriş yapın.');
    default: return error instanceof Error && !error.code ? error : new Error('İşlem tamamlanamadı. Lütfen yeniden deneyin.');
  }
}
