# 🚜 MESA İş Makinaları - Türkiye Geneli 7/24 Mobil Servis, Hidrolik Revizyon & Operasyon Portalı

[![Production Status](https://img.shields.io/badge/status-live-success.svg)](https://mesaismak.web.app)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Hosting-Firebase-FFCA28.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

**MESA İş Makinaları**, Türkiye'nin 81 ilinde şantiye sahasında 7/24 yerinde mobil teknik servis, paletli ve lastikli ekskavatör, bekoloder, loder, dozer, teleskopik yükleyici (telehandler) tamiri, 500 bar seyyar hidrolik hortum presi, seyyar borwerk delik işleme, powershift şanzıman, ağır hizmet dizel motor rektifiyesi ve telematik filo operasyon yönetim platformudur.

🌐 **Canlı Web Portalı:** [https://mesaismak.web.app](https://mesaismak.web.app)  
📞 **7/24 Acil Müdahale Çağrı Hattı:** `0533 529 36 74`  
📍 **Merkez Atölye:** Seyhan OSB, Şantiyeler Yolu No: 48, Seyhan / Adana

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
- **E-Posta:** `info@mesais.com`
- **Telefon:** `+90 533 529 36 74`
- **WhatsApp:** `+90 534 407 55 85`
- **Web:** [https://mesaismak.web.app](https://mesaismak.web.app)

---
*© 2026 MESA İş Makinaları. Tüm Hakları Saklıdır.*
