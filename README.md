# 🚜 MESA İş Makinaları - Türkiye Geneli 7/24 Mobil Servis, Hidrolik Revizyon & Operasyon Portalı

[![Production Status](https://img.shields.io/badge/status-live-success.svg)](https://www.mesaismakineleri.com.tr)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Hosting-Firebase-FFCA28.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

**MESA İş Makinaları**, Türkiye'nin 81 ilinde şantiye sahasında 7/24 yerinde mobil teknik servis, paletli ve lastikli ekskavatör, bekoloder, loder, dozer, teleskopik yükleyici (telehandler) tamiri, 500 bar seyyar hidrolik hortum presi, seyyar borwerk delik işleme, powershift şanzıman, ağır hizmet dizel motor rektifiyesi ve telematik filo operasyon yönetim platformudur.

🌐 **Canlı Web Portalı:** [https://www.mesaismakineleri.com.tr](https://www.mesaismakineleri.com.tr)  
📞 **7/24 Acil Müdahale Çağrı Hattı:** `0533 529 36 74`  
📍 **Merkez Atölye:** Yeşiloba Mah. 46167. Sokak No: 19/A, 01170 Seyhan / Adana

---

## 🌟 Temel Modüller ve Özellikler

### 1. 🇹🇷 81 İl Kapsamlı Mobil Servis Şebekesi
- Türkiye'nin 7 coğrafi bölgesine (Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu Anadolu, Güneydoğu Anadolu) göre organize edilmiş 81 il servis ağı.
- Her il için ortalama intikal süresi, nöbetçi teknisyen ve sanayi sitesi / OSB hızlı arama altyapısı.
- Arama motorları için özel olarak optimize edilmiş dinamik 81 il açılış sayfaları (`/sehirler/:slug`).

### 2. 🚨 7/24 Acil Arıza Bildirim Sihirbazı (`/ariza-bildir`)
- Şantiyede acil arıza yaşayan operatörler ve şantiye şefleri için 3 adımlı ekspres arıza kayıt sihirbazı.
- Makine tipi, arıza kategorisi (Hidrolik, Motor, Şanzıman, Elektrik/Elektronik, Yürüyüş/Cer, Ataşman), anlık GPS konum paylaşımı ve tek tıkla WhatsApp entegrasyonu.

### 3. 🧮 OEM Periyodik Bakım & Maliyet Hesaplayıcı (`/bakim-hesaplayici`)
- Caterpillar, Komatsu, Volvo, Hidromek, JCB, Hitachi vb. ağır iş makineleri için 250, 500, 1000 ve 2000 çalışma saati bakım paketleri.
- OEM filtre ve ağır hizmet yağ maliyetlerini işçilik ve yağ analiziyle birleştiren şeffaf maliyet hesaplama motoru ve PDF / WhatsApp teklif dökümü.

### 4. 🔍 Ağır Vasıta Hata Kodu Çözücü (`/ariza-kodu-cozucu`)
- SPN/FMI, CAT MID/CID, Komatsu VHP ve SAE standart arıza kodlarını tarayan akıllı arıza teşhis rehberi.
- Kritiklik seviyesi, saha acil eylem planı ve teknisyen yönlendirmesi.

### 5. 📊 Operasyon & ERP Yönetim Paneli (`/panel`)
- **Filo Telematik:** 81 ildeki servis araçlarının anlık konumları, telematik durumları ve hız/arıza göstergeleri.
- **Finans & Muhasebe:** Çift girişli (double-entry) kasa hareketleri, çek-senet takip sistemi, cari hesap mutabakatları.
- **İş Emirleri & QR Etiket:** Makinelere basılan QR kodla servis geçmişine hızlı erişim ve iş emri yönetimi.

### 6. 🛡️ Güvenilirlik & Hata İzolasyonu (NVIDIA Nemotron Onaylı Mimari)
- **Çift Katmanlı ErrorBoundary:** Runtime hatalarında uygulamanın beyaz ekrana düşmesini engelleyen, MESA kurumsal acil arayüzü sunan hata yakalama katmanı.
- **ImageWithFallback & Yerel Görseller:** Dış CDN kesintilerini sıfırlayan, tamamen yerel yüksek çözünürlüklü endüstriyel görseller ve `onError` kurtarma korumaları.
- **SSG Prerender & XML Sitemap:** Tüm sayfaların arama motorlarına statik HTML olarak anında sunulmasını sağlayan SEO altyapısı.

---

## 📁 Proje Dizin Yapısı

```text
mesaismak/
├── public/
│   ├── images/              # Yüksek çözünürlüklü yerel hizmet ve atölye görselleri
│   ├── favicon.ico          # Site faviconları
│   └── sw.js                # PWA Service Worker
├── scripts/
│   ├── generate-sitemaps.js # Otomatik XML Sitemap üreteci (81 il + hizmetler + rehberler)
│   └── prerender.js         # Statik SSG (Static Site Generation) motoru
├── src/
│   ├── components/          # Yeniden kullanılabilir UI bileşenleri
│   │   ├── dashboard/       # Operasyon paneli sekmeleri (Filo, Finans, İş Emirleri)
│   │   ├── ErrorBoundary.jsx# Kurumsal hata kurtarma bileşeni
│   │   ├── ImageWithFallback.jsx # Kırık görsel önleyici bileşen
│   │   ├── Navbar.jsx       # Üst navigasyon ve acil durum çağrısı
│   │   ├── Footer.jsx       # Kurumsal alt bilgi
│   │   └── WhatsAppWidget.jsx # Canlı WhatsApp destek balonu
│   ├── context/             # Global Context API (Dil, Operasyon, Yetki)
│   ├── data/                # Statik veriler (81 il, hizmetler, markalar, rehberler)
│   ├── pages/               # Rota sayfaları (Ana Sayfa, Detaylar, Hesaplayıcı vb.)
│   ├── router/              # Bağımsız, hafif ve ultra hızlı SPA Router
│   ├── App.jsx              # Ana uygulama kabuğu ve rota tanımları
│   ├── index.css            # TailwindCSS ve küresel animasyon stilleri
│   └── main.jsx             # React DOM kök girişi ve PWA kaydı
├── firebase.json            # Firebase Hosting ve caching kuralları
├── package.json             # Bağımlılıklar ve derleme betikleri
├── tailwind.config.js       # Tailwind tema yapılandırması
└── vite.config.js           # Vite derleme yapılandırması
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

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

---

## 📦 Üretim Derlemesi ve Dağıtım

### Üretim Paketi Oluşturma (SSG & Sitemap)
```bash
npm run build
```
Bu komut sırasıyla:
1. Vite ile tüm modülleri optimize ederek `dist/` klasörüne derler.
2. Tüm 81 il, hizmetler ve sayfalar için XML sitemap dosyalarını oluşturur.
3. Arama motoru botları (SEO) için statik SSG prerender HTML çıktılarını üretir.

### Firebase Hosting Dağıtımı
```bash
firebase deploy --only hosting
```

---

## 🛠️ Teknoloji Yığını

- **Frontend Kütüphanesi:** React 18
- **Derleme Aracı:** Vite 6
- **Stil & Tasarım:** TailwindCSS 3, PostCSS, Autoprefixer
- **İkon Seti:** Lucide React
- **Dağıtım & CDN:** Google Firebase Hosting
- **Mühendislik Standartları:** NVIDIA Nemotron Architectural Code Review Checklists

---

## 📞 İletişim ve Destek

- **Yetkili:** MESA İş Makinaları Saha Yönetimi
- **E-Posta:** `servis@mesaismakineleri.com.tr`
- **Telefon:** `+90 533 529 36 74`
- **WhatsApp:** `+90 534 407 55 85`
- **Web:** [https://www.mesaismakineleri.com.tr](https://www.mesaismakineleri.com.tr)

---
*© 2026 MESA İş Makinaları. Tüm Hakları Saklıdır.*

## 🔐 Gelişmiş Operasyon API'si

Proje artık statik arayüzün yanında çalıştırılabilir bir Node.js API katmanı da içerir. API; tenant izolasyonu, rol tabanlı erişim, MFA, güvenli QR makine özeti, QR'dan servis talebi, iş emri durum makinesi, zorunlu servis kanıtları, stok hareketleri, QR token rotasyonu ve audit log uçlarını sağlar.

### API'yi yerelde çalıştırma

```bash
cp .env.example .env
# .env içinde MESA_ADMIN_PASSWORD değerini güçlü bir parola ile değiştirin
npm run api
```

API varsayılan olarak `http://localhost:8787` adresinde çalışır. Frontend'in API'ye bağlanması için `VITE_API_BASE=http://localhost:8787` kullanılır. Yönetici girişi iki aşamalıdır; demo MFA kodu `123456` olarak tanımlıdır ve gerçek ortamda TOTP/SMS sağlayıcısıyla değiştirilmelidir.

### Otomatik kabul testleri

```bash
npm run test:api
npm run build
```

Kabul testleri; QR kamu görünümünün hassas veri döndürmediğini, oturumsuz portalın engellendiğini, MFA akışını, tenant kapsamlı makine listesini, makine servis geçmişini ve QR servis talebi oluşturmayı doğrular.

### API modülleri

- `GET /api/public/machines/:token/summary`: Hassas veri içermeyen kamu QR görünümü.
- `POST /api/public/machines/:token/service-requests`: QR üzerinden rate-limit uygulanabilir servis talebi.
- `POST /api/auth/login` ve `POST /api/auth/mfa/verify`: MFA destekli oturum.
- `GET /api/portal/machines` ve `GET /api/portal/machines/:id/history`: Tenant ve rol kontrollü müşteri verisi.
- `POST /api/work-orders/:id/transitions`: Kontrollü iş emri durum geçişi.
- `POST /api/work-orders/:id/evidence`: Arıza, işlem, parça, test, sayaç, fotoğraf ve imza kanıtları.
- `POST /api/inventory/parts/:id/movements`: Atomik stok hareketi.
- `POST /api/admin/machines/:id/qr/rotate`: Eski QR tokenını geçersiz kılıp yenisini üretme.
- `GET /api/admin/audit`: Yetkili audit olayları.

### Üretim uyarısı

Yerel JSON repository geliştirme ve demo içindir. Üretimde `server/index.js` içindeki repository Firestore/PostgreSQL gibi kalıcı bir veritabanına taşınmalı; parola hashleme Argon2id/bcrypt, gerçek TOTP MFA, Redis rate limit, object storage ve malware taraması eklenmelidir. Firebase Hosting tek başına Node API çalıştırmaz; API, Cloud Run/Functions veya ayrı bir Node sunucusunda yayınlanmalı ve `VITE_API_BASE` bu HTTPS adresine yönlendirilmelidir. Gerçek müşteri verisi, sunucu tarafı tenant yetkilendirmesi tamamlanmadan sisteme alınmamalıdır.

Ayrıntılı domain modeli, tehdit modeli, API sınırı ve kabul testleri: [`docs/advanced-service-platform-blueprint.md`](docs/advanced-service-platform-blueprint.md)

---
*© 2026 MESA İş Makinaları. Tüm Hakları Saklıdır.*
