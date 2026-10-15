# 🚜 MESA İş Makinaları — Türkiye Geneli 7/24 Mobil Servis, Hidrolik Revizyon & Operasyon Portalı

[![Production Status](https://img.shields.io/badge/status-live-success.svg)](https://www.mesaismakineleri.com.tr)
[![Live Site](https://img.shields.io/badge/domain-mesaismakineleri.com.tr-blue.svg)](https://www.mesaismakineleri.com.tr)
[![Firebase Hosting](https://img.shields.io/badge/hosting-Firebase%20Hosting-FFCA28.svg)](https://mesaismak.web.app)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18.svg)](https://vitest.dev/)
[![Security](https://img.shields.io/badge/Security-Hardened%20(No%20Client%20Secrets)-brightgreen.svg)]()

**MESA İş Makinaları**, Türkiye'nin 81 ilinde şantiye sahasında 7/24 yerinde mobil teknik servis, paletli ve lastikli ekskavatör, bekoloder, loder, dozer, teleskopik yükleyici (telehandler) tamiri, 500 bar seyyar hidrolik hortum presi, seyyar borwerk delik işleme, powershift şanzıman, ağır hizmet dizel motor rektifiyesi ve telematik filo operasyon yönetim platformudur.

- 🌐 **Canlı Web Portalı:** [https://www.mesaismakineleri.com.tr](https://www.mesaismakineleri.com.tr)
- 🌐 **Firebase Hosting URL:** [https://mesaismak.web.app](https://mesaismak.web.app)
- 📞 **7/24 Acil Çağrı:** `0533 529 36 74`
- 💬 **WhatsApp Destek:** `+90 534 407 55 85`
- 📍 **Merkez Atölye:** Yeşiloba Mah. 46167. Sokak No: 19/A, 01170 Seyhan / Adana

---

## 📑 İçindekiler

1. [Öne Çıkan Modüller ve Yetenekler](#-öne-çıkan-modüller-ve-yetenekler)
2. [Güvenlik ve Kimlik Doğrulama Mimarisi](#-güvenlik-ve-kimlik-doğrulama-mimarisi)
3. [Personel Rol Yönetimi CLI](#-personel-rol-yönetimi-cli)
4. [Gelişmiş Node.js Operasyon API'si](#-gelişmiş-nodejs-operasyon-apisi)
5. [SEO, SSG Prerender ve PWA Altyapısı](#-seo-ssg-prerender-ve-pwa-altyapısı)
6. [Proje Dizin Yapısı](#-proje-dizin-yapısı)
7. [Kurulum ve Yerel Geliştirme](#-kurulum-ve-yerel-geliştirme)
8. [Test Süreçleri](#-test-süreçleri)
9. [Üretim Derlemesi ve Canlı Dağıtım](#-üretim-derlemesi-ve-canlı-dağıtım)
10. [İletişim ve Lisans](#-iletişim-ve-destek)

---

## 🌟 Öne Çıkan Modüller ve Yetenekler

### 1. 🇹🇷 81 İl ve 7 Coğrafi Bölge Servis Ağı
- Türkiye'nin 7 bölgesinde organize edilmiş tam donanımlı mobil servis filosu.
- Her il için ortalama intikal süresi, nöbetçi teknisyen ve sanayi sitesi / OSB arama altyapısı.
- SEO optimizasyonlu 81 dinamik il açılış sayfası (`/sehirler/:slug`).

### 2. 🚨 7/24 Acil Arıza Bildirim Sihirbazı (`/ariza-bildir`)
- Şantiyede arıza yaşayan operatörler için 3 adımlı ekspres kayıt sihirbazı.
- Makine tipi, arıza kategorisi (Hidrolik, Motor, Şanzıman, Elektrik/Elektronik, Yürüyüş/Cer, Ataşman), GPS konum paylaşımı ve doğrudan doğrulanmış WhatsApp entegrasyonu.

### 3. 🧮 OEM Periyodik Bakım & Maliyet Hesaplayıcı (`/bakim-hesaplayici`)
- CAT, Komatsu, Volvo, Hidromek, JCB makineleri için 250, 500, 1000 ve 2000 çalışma saati bakım paketleri.
- OEM filtre ve ağır hizmet yağ maliyetlerini işçilik ve yağ analiziyle birleştiren hesaplama motoru.

### 4. 🔍 Ağır Vasıta DTC Arıza Kodu Çözücü (`/ariza-kodu-cozucu`)
- SPN/FMI, CAT MID/CID, Komatsu VHP ve SAE standart arıza kodlarını tarayan diagnostik rehber.
- Kritiklik seviyesi ve saha acil eylem planı önerileri.

### 5. 📊 Operasyon & ERP Yönetim Paneli (`/panel`)
- **Filo Telematik:** Servis araçlarının anlık konumları ve saha durumları.
- **Finans & Muhasebe:** Çift girişli (double-entry) kasa hareketleri, çek-senet takip sistemi.
- **İş Emirleri & Süreç:** Durum makinesi (state machine) destekli iş emri takibi.

### 6. 📱 Saha Teknisyen Mobil Terminali (`/teknisyen`) & PWA
- Saha teknisyenleri için iş emri tamamlama, telematik sayaç, parça sarfiyatı ve dijital imza toplama ekranı.
- Çevrimdışı önbellekleme destekli PWA Service Worker (`public/sw.js`).

### 7. 🏷️ Dijital Makine Pasaportu & Dinamik QR (`/m/:token`)
- Makinelere basılan güvenli QR kodlar ile sayaç saati ve kamuya açık servis özeti sorgulama.

---

## 🛡️ Güvenlik ve Kimlik Doğrulama Mimarisi

Platform kurumsal güvenlik, veri izolasyonu ve OWASP standartlarına uygun olarak tasarlanmıştır:

1. **İstemci Tarafında Sıfır Sır (Zero-Secrets Client Bundle):**
   - Kaynak kodda ve derlenen JavaScript paketlerinde (`dist/assets/*.js`) hiçbir statik parola, gizli anahtar veya demo hesabı bulunmaz.
   - Hassas sunucu ortam değişkenleri (`.cloudrun.env.yaml`, servis anahtarları) `.gitignore` ile korunur; depoya yalnızca güvenli şablonlar eklenir.

2. **Firebase Auth & Custom Claims ile Rol Yetkilendirme:**
   - Personel kimlik doğrulaması Firebase Auth (E-posta/Şifre) üzerinden yürütülür.
   - Sayfa erişimleri (`RequireStaff`) istemci tarafındaki rol tahminine değil, Firebase ID token üzerindeki güvenli `mesaRole` custom claim'ine dayanır:
     - `admin` / `super_admin`: Tam yetkili yönetim paneli (`/panel`).
     - `technician`: Saha teknisyen terminali (`/teknisyen`).
     - `customer_admin`: Müşteri makine takip portalı (`/musteri-portali`).
     - `finance`, `warehouse`, `dispatcher`, `manager`: İlgili ERP modülleri.

3. **Güvenlik Başlıkları & İçerik Güvenliği Politikası (CSP):**
   - `firebase.json` üzerinden `Strict-Transport-Security (HSTS)`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` ve sıkılaştırılmış `Content-Security-Policy` uygulanır.

---

## 🔑 Personel Rol Yönetimi CLI

Firebase Console üzerinde kullanıcı oluşturulduktan sonra personellere `mesaRole` atamak için hazır CLI aracı kullanılır:

```bash
# 1. Servis hesabı JSON anahtarını çevre değişkenine tanımlayın:
export GOOGLE_APPLICATION_CREDENTIALS="/guvenli/dizin/serviceAccountKey.json"
# PowerShell için:
# $env:GOOGLE_APPLICATION_CREDENTIALS="C:\anahtarlar\serviceAccountKey.json"

# 2. Personele rol atayın:
npm run staff:role -- personel@mesaismakineleri.com.tr admin
npm run staff:role -- teknisyen@mesaismakineleri.com.tr technician
npm run staff:role -- finans@mesaismakineleri.com.tr finance
npm run staff:role -- depo@mesaismakineleri.com.tr warehouse
npm run staff:role -- yetkili@musteri.com customer_admin tenant_abc "ABC İnşaat Ltd."

# 3. Mevcut rolü sorgulayın:
npm run staff:role -- personel@mesaismakineleri.com.tr --show

# 4. Rolü iptal edin (tüm aktif oturumları anında sonlandırır):
npm run staff:role -- personel@mesaismakineleri.com.tr --remove
```

---

## ⚙️ Gelişmiş Node.js Operasyon API'si

Proje, bağımsız bir mikroservis olarak çalışabilen hafif ve güçlü bir Node.js API katmanı içerir (`server/index.js`):

- **MFA Doğrulama & RFC 6238 TOTP:** Yalnızca şifresi doğrulanmış ara token'ların API çağrısı yapması engellenmiştir. Üretimde RFC 6238 uyumlu dinamik TOTP (Google Authenticator) kodu zorunludur.
- **Kayan Pencereli Rate Limiting:** Brute-force saldırılarına karşı 15 dakikalık pencerede IP başına maksimum 10 başarısız denemeye izin verilir.
- **Güvenli QR & Servis Talebi:** Makine QR kodlarından kamuya açık güvenli servis talebi oluşturma (`POST /api/public/machines/:token/service-requests`).
- **İş Emri Durum Geçişleri & Kanıt Seti:** Ön teşhis, atama, parça onayı, test adımları ve imza kanıtları toplanmadan iş emrinin tamamlanmasını engelleyen iş kuralı denetimi.

```bash
# API'yi yerelde başlatma:
npm run api
```

---

## 🚀 SEO, SSG Prerender ve PWA Altyapısı

Platform, tek sayfa uygulaması (SPA) olmasına rağmen arama motorları için tam statik HTML sunumu (SSG) yapar:

1. **144 Sayfa SSG Prerender Motoru (`scripts/prerender.js`):**
   - Ana sayfa, 81 il açılış sayfası, 22 hizmet sayfası, 7 bölge sayfası, kurumsal sayfalar ve teknik rehberler derleme anında statik HTML olarak `dist/` klasörüne yazılır.
   - Tüm dinamik veriler HTML ve JSON-LD seviyesinde XSS ataklarına karşı kaçışlanır (`escapeHtml`, `safeJsonLd`).
   - SEO başlıkları ve açıklamaları doğrudan bileşenlerin `<SEO>` bloklarından okunarak tek doğruluk kaynağı (single source of truth) sağlanır.

2. **Dinamik XML Sitemap Otomasyonu (`scripts/generate-sitemaps.js`):**
   - `sitemap.xml` ana haritası; sayfalar, hizmetler, 81 il, bölgeler ve teknik rehberleri alt sitemap'lere bağlar ve hem `public/` hem `dist/` dizinlerine senkronize edilir.

3. **SPA Fallback Güvenliği (`dist/spa.html`):**
   - `firebase.json` içindeki `**` yönlendirmesi `spa.html` dosyasına yönlendirilir.
   - `spa.html`, `<meta name="robots" content="noindex, follow" />` etiketi taşır ve kanonik URL içermez; böylece arama motorlarının var olmayan veya dinamik sayfaları yanlışlıkla indekslemesi önlenir.

---

## 📁 Proje Dizin Yapısı

```text
mesaismak/
├── public/
│   ├── images/                 # Yüksek çözünürlüklü hizmet, filo ve atölye görselleri
│   ├── favicon.ico             # Site faviconları
│   ├── manifest.json           # PWA web manifestosu
│   ├── robots.txt              # Arama motoru robot direktifleri
│   ├── sitemap*.xml            # Üretilen dinamik site haritaları
│   └── sw.js                   # PWA Service Worker (V6 önbellekleme & SWR)
├── scripts/
│   ├── generate-sitemaps.js    # Otomatik XML Sitemap üreteci
│   ├── prerender.js            # 144 sayfalık SSG Prerender motoru
│   └── set-staff-role.mjs      # Firebase Admin custom claims yetki yönetim aracı
├── server/
│   ├── index.js                # Node.js operasyon ve durum makinesi API'si
│   ├── api.test.js             # API entegrasyon ve kabul testleri
│   └── data.json               # Geliştirme ortamı yerel veri tabanı
├── src/
│   ├── components/             # Yeniden kullanılabilir UI bileşenleri
│   │   ├── dashboard/          # ERP yönetim paneli sekmeleri (Filo, Finans, İş Emirleri)
│   │   ├── ErrorBoundary.jsx   # Çift katmanlı kurumsal hata yakalama bileşeni
│   │   ├── RequireStaff.jsx    # Güvenli personel rota koruyucusu
│   │   ├── SEO.jsx             # Dinamik meta etiket ve Open Graph yöneticisi
│   │   └── WhatsAppWidget.jsx  # 7/24 canlı WhatsApp destek butonu
│   ├── context/                # Global durum yöneticileri (AuthContext, OperationalContext)
│   ├── data/                   # 81 il, hizmetler, markalar, rehberler ve katalog verileri
│   ├── lib/                    # Firebase istemcisi, analitik ve WhatsApp yardımcıları
│   ├── pages/                  # Sayfa bileşenleri (Ana Sayfa, Şehirler, Hesaplayıcı vb.)
│   ├── router/                 # Ultra hafif ve optimize SPA yönlendirici
│   ├── App.jsx                 # Kök uygulama ve rota ağacı
│   └── main.jsx                # DOM başlatma, PWA kaydı ve analitik dinleyicileri
├── tests/                      # Vitest birim ve mantık testleri
├── .cloudrun.env.example.yaml  # Cloud Run ortam değişkenleri şablonu
├── .env.example                # İstemci ortam değişkenleri şablonu
├── firebase.json               # Hosting, caching kuralları ve CSP güvenlik başlıkları
├── package.json                # Bağımlılıklar ve npm scriptleri
├── vitest.config.js            # Vitest test koşucu yapılandırması
└── vite.config.js              # Vite 6 modül derleyici yapılandırması
```

---

## 🚀 Kurulum ve Yerel Geliştirme

### Gereksinimler
- **Node.js:** v18.0.0 veya üzeri
- **npm:** v9.0.0 veya üzeri

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/Highlife01/MESA.git
cd MESA
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Tanımlayın
```bash
cp .env.example .env
```
`.env` dosyası genel istemci tanımlayıcılarını içerir (Firebase API anahtarları istemci tarafında genel kimlik işlevi görür, asla parola veya sunucu sırrı içermez).

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Uygulama yerelde `http://localhost:5173` (veya belirtilen portta) çalışmaya başlar.

---

## 🧪 Test Süreçleri

Projede hem istemci iş mantığı hem de sunucu API güvenlik akışları için otomatik testler bulunmaktadır:

```bash
# 1. Operasyonel kurallar ve istemci mantık testleri (Vitest):
npm test

# 2. Node.js API kabul, MFA ve rate-limit testleri:
npm run test:api

# 3. İki test paketini birlikte çalıştırma:
npm test; npm run test:api
```

---

## 📦 Üretim Derlemesi ve Canlı Dağıtım

### 1. Üretim Derlemesi Oluşturma (Build + SSG + Sitemaps)
```bash
npm run build
```
Bu komut sırasıyla:
1. `vite build` çalıştırarak React modüllerini küçültür ve optimize eder (`dist/`).
2. `generate-sitemaps.js` ile tüm XML sitemap'leri derler.
3. `prerender.js` ile 144 açılış sayfasını arama motorları için statik HTML olarak hazırlar ve `dist/spa.html` fallback dosyasını üretir.

### 2. Firebase Hosting'e Dağıtım
```bash
npx firebase deploy --only hosting
```

---

## 📞 İletişim ve Destek

- **Firma:** MESA İş Makinaları San. ve Tic. Ltd. Şti.
- **E-Posta:** `servis@mesaismakineleri.com.tr`
- **Telefon:** `+90 533 529 36 74`
- **WhatsApp:** `+90 534 407 55 85`
- **Adres:** Yeşiloba Mah. 46167. Sokak No: 19/A, 01170 Seyhan / Adana
- **Web:** [https://www.mesaismakineleri.com.tr](https://www.mesaismakineleri.com.tr)

---

*© 2026 MESA İş Makinaları San. ve Tic. Ltd. Şti. Tüm Hakları Saklıdır.*
