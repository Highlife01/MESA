# MESA İş Makineleri — Gelişmiş Servis Operasyon Platformu Tasarımı

## 1. Kapsam ve temel karar

MESA için hedef yalnızca bir admin paneli değil; **makine merkezli servis operasyon platformudur**. Makine, müşteri, şantiye, iş emri, teknisyen, parça, bakım planı, telematik sayaç ve servis kanıtları tek bir denetlenebilir kayıt zincirinde birleşmelidir.

Bu çalışma, mevcut React uygulamasındaki kritik kullanıcı deneyimi eksiklerini kapatır: müşteri portalı varsayılan olarak kilitlenmiştir, kimlik doğrulama olmadan müşteri ve finans bilgileri render edilmez, makineye özgü tahmin edilemez QR token akışı eklenmiştir ve QR sayfası yalnızca kamuya açık güvenli özeti gösterir. Gerçek üretim güvenliği için frontend kilidi yeterli değildir; aşağıdaki sunucu tarafı mimari zorunludur.

## 2. Güvenlik sınırı

Statik React uygulaması bir prototip ve operasyon arayüzüdür. Üretimde hiçbir müşteri, finans veya servis geçmişi yalnızca JavaScript bundle içinde korunmamalıdır. Tüm hassas veriler API üzerinden, her istekte sunucu tarafı tenant ve rol kontrolü yapılarak döndürülmelidir.

| Veri sınıfı | QR kamu görünümü | Müşteri hesabı | Teknisyen | Yönetim |
|---|---:|---:|---:|---:|
| Marka, model, makine kodu | Görülebilir | Görülebilir | Görülebilir | Görülebilir |
| Aktif servis durumu | Özet | Detay | Atanmış iş emri | Tümü |
| Servis fotoğrafı ve test sonucu | Hayır | Yetkili | Atanmış iş emri | Tümü |
| Tam şasi/seri numarası | Hayır | Yetkili | Gerektiğinde maskeli | Yetkili |
| Müşteri telefonu ve özel not | Hayır | Kendi hesabı | İş emri kapsamı | Yetkili |
| Fiyat, cari bakiye, banka bilgisi | Hayır | Finans rolü | Hayır | Finans yetkisi |

## 3. Önerilen domain modeli

### Machine

`id`, `publicToken`, `assetCode`, `brand`, `model`, `modelYear`, `serialNumber`, `chassisNumber`, `engineNumber`, `currentHours`, `lastMeterAt`, `status`, `customerId`, `siteId`, `warrantyUntil`, `locationVisibility`, `qrRevokedAt` alanlarını içerir. `publicToken` sıralı ID olmamalı; en az 128 bit rastgele değer olmalı ve token rotasyonu desteklenmelidir.

### Customer, Site ve User

Müşteri birden fazla şantiye ve filoya sahip olabilir. Kullanıcılar müşteri tenant’ına bağlanır. Her sorgu `tenantId` filtresiyle başlar. Kullanıcı rolleri `customer_admin`, `customer_viewer`, `dispatcher`, `technician`, `warehouse`, `finance`, `manager`, `super_admin` olarak ayrılmalıdır.

### WorkOrder

İş emri yaşam döngüsü kontrollü enum olarak tutulmalıdır:

`received → triaged → scheduled → assigned → en_route → on_site → waiting_parts → waiting_approval → testing → completed → customer_approved → invoiced → cancelled`

Her geçişte `actorId`, `occurredAt`, `location`, `note`, `fromStatus`, `toStatus` ve opsiyonel kanıt dosyası yazılmalıdır. Durum alanını doğrudan değiştirmek yerine append-only `work_order_events` kaydı oluşturulmalıdır.

### Evidence ve ServiceReport

Teknisyen kapatma işlemi için arıza nedeni, yapılan işlem, değişen parça, ölçüm/test sonucu, sayaç, önce/sonra fotoğrafları ve müşteri imzası zorunlu olmalıdır. PDF raporu bu kanıtların hash’ini taşımalı ve rapor versiyonlanmalıdır.

### Part ve InventoryMovement

Parça stok hareketleri çift taraflı kayıt mantığıyla tutulmalıdır: tüketim, rezervasyon, iade, iptal ve transfer ayrı hareket tipleridir. İş emri kapatılmadan önce parça hareketleri ve garanti durumu doğrulanmalıdır.

## 4. API sınırı

Önerilen servis uçları:

- `GET /api/public/machines/:token/summary` — yalnızca güvenli QR özeti.
- `POST /api/public/machines/:token/service-requests` — rate limit ve bot koruması ile talep açma.
- `POST /api/auth/login` ve `POST /api/auth/mfa/verify` — kısa ömürlü access token, HttpOnly refresh cookie.
- `GET /api/portal/machines` — tenant kapsamlı müşteri makineleri.
- `GET /api/portal/machines/:id/history` — tenant kontrolü ve alan bazlı maskeleme.
- `GET /api/work-orders/:id` — rol ve atama kontrolü.
- `POST /api/work-orders/:id/evidence` — dosya türü, boyutu ve malware kontrolü.
- `POST /api/work-orders/:id/transitions` — izinli durum makinesi geçişi.
- `POST /api/admin/machines/:id/qr/rotate` — eski token anında iptal edilir.
- `GET /api/audit-events` — yalnızca yetkili yönetim ve finans rolleri.

## 5. Tehdit modeli ve zorunlu kontroller

1. **IDOR / tenant kaçışı:** Her `machineId`, `workOrderId` ve `customerId` erişiminde sunucu tarafı tenant doğrulaması yapılmalıdır. UI gizleme güvenlik kontrolü değildir.
2. **QR token tahmini:** UUIDv4 veya kriptografik rastgele token kullanılmalı, eski tokenlar kara listeye alınmalı ve kamu endpoint’i hassas alan döndürmemelidir.
3. **Oturum çalma:** Access token kısa ömürlü, refresh token HttpOnly/Secure/SameSite cookie içinde, oturum iptali ve cihaz oturumu listesi destekli olmalıdır.
4. **CSRF ve rate limit:** Cookie tabanlı işlemlerde CSRF token; login, QR talep ve dosya yüklemede IP/hesap bazlı rate limit uygulanmalıdır.
5. **Dosya güvenliği:** MIME doğrulama, uzantı beyaz listesi, boyut sınırı, virüs taraması ve özel object storage bucket kullanılmalıdır.
6. **Finans ayrımı:** Finans endpoint’leri teknik servis rollerine kapalı olmalı; dışa aktarma işlemi gerekçe, kullanıcı ve zaman bilgisiyle audit log’a yazılmalıdır.
7. **Gözlemleme:** Başarısız login, yetkisiz erişim, QR taraması, token rotasyonu, veri dışa aktarma ve durum değişiklikleri alarm üretmelidir.
8. **Güvenlik başlıkları:** CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, güvenli cookie ve frame-ancestors politikaları uygulanmalıdır.

## 6. Üretim ekranları

Yönetim panelinin önerilen modülleri:

- **Komuta merkezi:** SLA, açık arıza, geciken işler, bekleyen onaylar, parça bekleyen işler ve teknisyen haritası.
- **Makine dosyası:** genel durum, servis geçmişi, bakım planı, parça geçmişi, dokümanlar, sayaçlar, lokasyon ve sorumlular.
- **İş emri çalışma alanı:** durum makinesi, checklist, güvenlik uyarısı, fotoğraf/video, ölçüm, imza ve müşteri onayı.
- **Filo ve telematik:** son ping, sayaç, yakıt, sıcaklık, konum geçmişi ve geofence ihlalleri.
- **Stok ve garanti:** kritik stok, rezervasyon, lot/seri, uyumlu modeller ve garanti talepleri.
- **Finans:** cari hesap, teklif, fatura, tahsilat ve dışa aktarma; teknik rollerden ayrı navigasyon ve API yetkisi.
- **Denetim merkezi:** değiştirilemez olay günlüğü, erişim inceleme, oturumlar ve token rotasyonları.

## 7. Kabul testleri

- Oturumsuz kullanıcı `/musteri-portali` sayfasında müşteri adı, filo, bakiye veya iş emri göremez.
- Müşteri A’nın access token’ı ile müşteri B’nin makine ve servis geçmişi 404/403 döner.
- Kamu QR sayfası finans, telefon, tam şasi, fiyat ve özel servis notu döndürmez.
- Eski QR token rotasyondan sonra çalışmaz.
- Teknisyen yalnızca kendisine atanmış iş emrinde durum değiştirir ve kanıt ekler.
- İş emri; arıza nedeni, işlem, parça, test, sayaç ve imza olmadan `completed` durumuna geçemez.
- Parça tüketimi iş emriyle atomik stok hareketi üretir; iptal/iade ters hareket oluşturur.
- Finans rolü olmayan kullanıcı banka, çek ve cari bakiye endpoint’lerine erişemez.
- Her login başarısızlığı, yetkisiz erişim ve veri dışa aktarma audit log’a düşer.
- CSP ihlalleri raporlanır; inline script ve güvensiz üçüncü taraf kaynaklar engellenir.

## 8. Uygulama sırası

**Faz 0 — Güvenlik kilidi:** müşteri portalı erişim kontrolü, demo/üretim ayrımı, sunucu tarafı auth, tenant izolasyonu, CSP ve audit log.

**Faz 1 — Servis çekirdeği:** Machine, WorkOrder, status events, technician assignment, evidence upload, digital approval ve PDF raporu.

**Faz 2 — QR ve müşteri deneyimi:** token rotasyonu, kamu özeti, yetkili geçmiş, servis talebi, bildirimler ve bakım planı.

**Faz 3 — Operasyon derinliği:** stok, garanti, sayaç/telematik, saha offline senkronizasyonu, harita ve SLA analitiği.

**Faz 4 — Kurumsal entegrasyon:** e-fatura/ERP, muhasebe, webhook’lar, müşteri SSO ve veri saklama politikaları.

> Mevcut frontend bu planın ilk iki fazının kullanıcı deneyimi prototipini taşımaktadır. Gerçek müşteri verisi açılmadan önce backend yetkilendirmesi ve tenant izolasyonu tamamlanmalıdır.
