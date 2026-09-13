// Türkiye'nin 7 Coğrafi Bölgesi - İş Makinası Servis & Lojistik Hub Verisi
export const regionsData = [
  {
    id: 'marmara',
    slug: 'marmara-is-makinalari-servisi',
    name: 'Marmara Bölgesi',
    shortName: 'Marmara',
    description: 'İstanbul, Kocaeli, Bursa ve Tekirdağ sanayi koridorları, liman lojistiği, mega altyapı ve kentsel dönüşüm şantiyeleri için yüksek kapasiteli mobil servis ve hidrolik revizyon desteği.',
    focusSectors: ['Liman ve Konteyner Lojistiği', 'Otomotiv ve Yan Sanayi', 'Kentsel Dönüşüm ve Ağır Hafriyat', 'Köprü ve Tünel Altyapı Projeleri'],
    hubCenter: 'İstanbul - Kocaeli - Bursa Hattı',
    cities: [
      'İstanbul', 'Bursa', 'Kocaeli', 'Balıkesir', 'Tekirdağ', 
      'Çanakkale', 'Sakarya', 'Edirne', 'Kırklareli', 'Bilecik', 'Yalova'
    ],
    dispatchTime: 'Mobil Servis Sevkiyatı: 2 - 4 Saat'
  },
  {
    id: 'ege',
    slug: 'ege-is-makinalari-servisi',
    name: 'Ege Bölgesi',
    shortName: 'Ege',
    description: 'İzmir Alsancak ve Aliağa limanları, Manisa OSB, Aydın ve Denizli mermer/maden ocakları ile rüzgar enerji santralleri şantiyelerinde ekskavatör, loder ve telehandler teknik servis desteği.',
    focusSectors: ['Mermer ve Doğaltaş Taş Ocakları', 'Petrokimya ve Ağır Sanayi', 'RES ve Jeotermal Enerji Santralleri', 'Tarım Endüstrisi ve Depolama'],
    hubCenter: 'İzmir - Manisa - Denizli Koridoru',
    cities: [
      'İzmir', 'Manisa', 'Aydın', 'Denizli', 'Muğla', 
      'Afyonkarahisar', 'Kütahya', 'Uşak'
    ],
    dispatchTime: 'Mobil Servis Sevkiyatı: 2 - 4 Saat'
  },
  {
    id: 'akdeniz',
    slug: 'akdeniz-is-makinalari-servisi',
    name: 'Akdeniz Bölgesi',
    shortName: 'Akdeniz',
    description: 'Adana merkez ana atölye tesisimiz, Mersin Uluslararası Limanı, İskenderun Demir-Çelik havzası, Antalya turizm altyapısı ve Çukurova tarım makinaları için 7/24 kesintisiz 30 dakikada mobil intikal.',
    focusSectors: ['Demir-Çelik ve Ağır Metal Sanayi', 'Uluslararası Liman Vinç ve Elleçleme Ekipmanları', 'Narenciye ve Tarım Arazileri', 'Krom ve Boksit Madenciliği'],
    hubCenter: 'Adana Merkez Atölye (HQ) & Çukurova Ağı',
    cities: [
      'Adana', 'Antalya', 'Mersin', 'Hatay', 'Kahramanmaraş', 
      'Osmaniye', 'Isparta', 'Burdur'
    ],
    dispatchTime: 'Mobil Servis Sevkiyatı: 30 - 90 Dakika'
  },
  {
    id: 'ic-anadolu',
    slug: 'ic-anadolu-is-makinalari-servisi',
    name: 'İç Anadolu Bölgesi',
    shortName: 'İç Anadolu',
    description: 'Ankara OSTİM ve İvedik sanayi merkezleri, Konya tarım ve döküm makineleri, Eskişehir havacılık/raylı sistemler ve Kayseri organize sanayi aksı için yerinde hidrolik revizyon ve arıza tespit.',
    focusSectors: ['Savunma ve Ağır Makine İmalatı', 'Karasal Madencilik ve Taş Ocakları', 'Baraj ve Karayolu Müteahhitlik Şantiyeleri', 'Geniş Tarım Havzaları'],
    hubCenter: 'Ankara - Konya - Kayseri Aksı',
    cities: [
      'Ankara', 'Konya', 'Kayseri', 'Eskişehir', 'Sivas', 
      'Kırıkkale', 'Aksaray', 'Karaman', 'Kırşehir', 'Niğde', 
      'Nevşehir', 'Yozgat', 'Çankırı'
    ],
    dispatchTime: 'Mobil Servis Sevkiyatı: 2 - 4 Saat'
  },
  {
    id: 'karadeniz',
    slug: 'karadeniz-is-makinalari-servisi',
    name: 'Karadeniz Bölgesi',
    shortName: 'Karadeniz',
    description: 'Samsun ve Trabzon limanları, Zonguldak taşkömürü madenleri, Artvin ve Rize HES şantiyeleri, zorlu arazi şartlarında paletli ekskavatör, kaya kırıcı ve hidrolik borwerk onarımı.',
    focusSectors: ['Yeraltı ve Açık Kömür Madenciliği', 'HES ve Su Tünelleri İnşaatı', 'Liman ve Tersane Faaliyetleri', 'Zorlu Eğimli Arazi Yol Şantiyeleri'],
    hubCenter: 'Samsun - Trabzon - Zonguldak Hatları',
    cities: [
      'Samsun', 'Trabzon', 'Ordu', 'Giresun', 'Rize', 
      'Artvin', 'Zonguldak', 'Karabük', 'Bartın', 'Kastamonu', 
      'Sinop', 'Bolu', 'Düzce', 'Amasya', 'Tokat', 
      'Çorum', 'Gümüşhane', 'Bayburt'
    ],
    dispatchTime: 'Mobil Servis Sevkiyatı: 3 - 6 Saat'
  },
  {
    id: 'dogu-anadolu',
    slug: 'dogu-anadolu-is-makinalari-servisi',
    name: 'Doğu Anadolu Bölgesi',
    shortName: 'Doğu Anadolu',
    description: 'Erzurum, Malatya, Van ve Elazığ maden sahaları, sınır kapısı lojistik sahaları, kar temizleme ve zorlu kış şartlarında ağır iş makinalarına yüksek irtifa ve soğuk iklim servis çözümleri.',
    focusSectors: ['Bakır, Krom ve Altın Madenciliği', 'Dağ Yolu, Tünel ve Viyadük İnşaatı', 'Sınır Lojistiği ve Ağır Nakliyat', 'Kış Şartları Hidrolik Bakımları'],
    hubCenter: 'Malatya - Elazığ - Erzurum Koridoru',
    cities: [
      'Erzurum', 'Malatya', 'Van', 'Elazığ', 'Ağrı', 
      'Kars', 'Muş', 'Bitlis', 'Bingöl', 'Erzincan', 
      'Hakkari', 'Iğdır', 'Ardahan', 'Tunceli'
    ],
    dispatchTime: 'Mobil Servis Sevkiyatı: 3 - 6 Saat'
  },
  {
    id: 'guneydogu-anadolu',
    slug: 'guneydogu-anadolu-is-makinalari-servisi',
    name: 'Güneydoğu Anadolu Bölgesi',
    shortName: 'Güneydoğu Anadolu',
    description: 'Gaziantep OSB sanayi devleri, Şanlıurfa GAP tarım sulama kanalları şantiyeleri, Diyarbakır ve Batman petrol sahaları için ağır iş makinelerine 7/24 yerinde mobil teknik müdahale.',
    focusSectors: ['GAP Sulama ve Altyapı Projeleri', 'Petrol ve Gaz Sondaj Sahaları', 'Tekstil ve Gıda Organize Sanayi', 'Bölgesel İhracat Taşımacılığı'],
    hubCenter: 'Gaziantep - Şanlıurfa - Diyarbakır Hattı',
    cities: [
      'Gaziantep', 'Şanlıurfa', 'Diyarbakır', 'Mardin', 'Batman', 
      'Adıyaman', 'Siirt', 'Şırnak', 'Kilis'
    ],
    dispatchTime: 'Mobil Servis Sevkiyatı: 1 - 3 Saat'
  }
];
