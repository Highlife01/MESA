export const brandsData = [
  {
    id: 'caterpillar',
    name: 'Caterpillar (CAT)',
    origin: 'ABD',
    category: 'Ekskavatör, Loder, Dozer, Bekoloder',
    logoText: 'CAT',
    badge: 'Ağır Hizmet Uzmanlığı',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    description: 'Caterpillar paletli ekskavatörler (320, 330, 336 serisi), kazıcı yükleyiciler (428, 432, 434), lastikli yükleyiciler (950, 966, 980) ve D6/D8 dozerler için yetkin özel servis, arıza teşhis ve orijinal yedek parça tedariği.',
    diagnosticTool: 'CAT Electronic Technician (ET) & SIS2 Servis Entegrasyonu',
    supportedModels: [
      'CAT 320D / 320E / 320 Next Gen Paletli Ekskavatör',
      'CAT 329D / 330D2 / 336D / 336F Ağır Hizmet Ekskavatörleri',
      'CAT 428D / 428E / 428F2 / 432F Bekoloder Kazıcı Yükleyici',
      'CAT 950H / 966H / 980H Lastikli Yükleyici (Loder)',
      'CAT D6R / D6T / D8R / D8T Paletli Dozerler'
    ],
    expertiseAreas: [
      'CAT C4.4, C7.1, C9.3 ACERT ve 3306 mekanik/elektronik motor revizyonu',
      'HEUI ve Common-Rail yakıt enjeksiyon pompası ve enjektör kodlama',
      'Ana hidrolik pompa (Rexroth / CAT pistonlu pompa) 450 Bar dinamik debi ayarı',
      'Product Link ve ECM motor beyni yazılım parametre kalibrasyonu',
      'Cer redüktörü, kule şanzımanı ve ayna-mahruti diferansiyel sentelenmesi'
    ],
    commonFaults: [
      {
        code: 'MID 036 CID 0164 FMI 00',
        title: 'Enjeksiyon Basıncı (ICP) Yüksek / Sapma Hatası',
        solution: 'IAPCV kontrol valfi ve yüksek basınç yağ pompası basınç düşüm testi yapılır, sensör kalibrasyonu veya valf yenilemesiyle çözülür.'
      },
      {
        code: 'MID 039 CID 0588 FMI 09',
        title: 'Ekran & Gösterge İletişim Hatası',
        solution: 'Cat Data Link (CDL) ve CAN haberleşme hattında osiloskop ile sinyal zayıflaması taranır, soket ve direnç hattı onarılır.'
      }
    ]
  },
  {
    id: 'jcb',
    name: 'JCB',
    origin: 'İngiltere',
    category: 'Kazıcı Yükleyici, Telehandler, Mini Ekskavatör',
    logoText: 'JCB',
    badge: 'Bekoloder Lideri',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    description: 'JCB 3CX, 4CX Eco Kazıcı Yükleyiciler, Loadall 531, 540 Teleskopik Yükleyiciler ve JS200/JS220 paletli ekskavatörler için şantiyede yerinde ve atölyede kapsamlı revizyon.',
    diagnosticTool: 'JCB ServiceMaster 4 & DLA Diagnostic Adaptör',
    supportedModels: [
      'JCB 3CX Eco / Turbo / Sitemaster Bekoloder',
      'JCB 4CX / 4CX Super 4WS Kazıcı Yükleyici',
      'JCB Loadall 531-70 / 535-95 / 540-140 / 540-170 Telehandler',
      'JCB JS200 / JS210 / JS220 / JS330 Ağır Ekskavatör',
      'JCB 8025 / 8035 / 8085 Mini ve Midi Ekskavatörler'
    ],
    expertiseAreas: [
      'JCB Dieselmax 444 ve 448 motor rektifiye ve turbo revizyonu',
      'Powershift ve Autoshift şanzıman selenoid valf gövdesi revizyonu',
      'Hush-Power ve değişken debili ana hidrolik pompa basınç dengelemesi',
      'Extradig uzar arm kızak aşınma pabuçları ve bom zincir gergi revizyonu',
      'LiveLink telematik ünitesi ve ECU konfigürasyon yüklemeleri'
    ],
    commonFaults: [
      {
        code: 'P0087 / JCB DTC 2043',
        title: 'Yakıt Dağıtım Yolu Basıncı Çok Düşük',
        solution: 'Dizel yakıt filtresi, depo içi emiş süzgeci ve Delphi yüksek basınç pompası debisi ölçülerek arızalı regülatör değiştirilir.'
      },
      {
        code: 'DTC 3012',
        title: 'Powershift İleri / Geri Kavrama Basınç Uyarısı',
        solution: 'Şanzıman kontrol selenoidlerinin iç dirençleri ölçülür, kavrama diski basınç düşümü giderilerek yazılımsal kalibrasyon yapılır.'
      }
    ]
  },
  {
    id: 'hidromek',
    name: 'Hidromek',
    origin: 'Türkiye',
    category: 'Bekoloder, Ekskavatör, Greyder, Loder',
    logoText: 'HMK',
    badge: 'Yerli Güç Uzmanlığı',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    description: 'Hidromek HMK 102B, 102S Alpha/Supra bekoloderler, HMK 140LC, 220LC, 300LC Gen ve H4 serisi ekskavatörler ile HMK 600MG greyderler için orijinal parça ve fabrika seviyesi teknik servis desteği.',
    diagnosticTool: 'Hidromek H-Diag & Opera Kontrol Arayüzü',
    supportedModels: [
      'HMK 102B / 102S Alpha & Supra Kazıcı Yükleyiciler',
      'HMK 140LC / 145LC / 200W Lastikli ve Paletli Ekskavatörler',
      'HMK 220LC / 300LC / 390LC Gen & H4 Serisi Ekskavatörler',
      'HMK 600MG Ağır Hizmet Motor Greyder',
      'HMK 640WL Ağır Hizmet Lastikli Yükleyici'
    ],
    expertiseAreas: [
      'Perkins ve Isuzu Tier-3/Tier-4 motor rektifiye ve diagnostik arıza çözümleri',
      'Kawasaki ana hidrolik pompa debi ve pilot basınç eşitlemesi',
      'Opera kontrol ünitesi, ergonomik joystick konsolu ve ekran onarımı',
      'Ağır hizmet şasi, arm çatlak onarımı ve seyyar borwerk delik işleme',
      'ZF şanzıman ve Carraro aks diferansiyel ayna-mahruti sentelenmesi'
    ],
    commonFaults: [
      {
        code: 'HMK E-041 / Can Fail',
        title: 'Opera Kontrol Sistemi CAN İletişim Kesintisi',
        solution: 'Joystick kollarından ana kontrol beynine giden CAN hattı direnç testi yapılır; oksitlenmiş kabin altı soketleri yenilenir.'
      },
      {
        code: 'HMK H-018',
        title: 'Pilot Basınç Düşüklüğü (Hareketlerde Yavaşlama)',
        solution: 'Pilot pompa emniyet valfi ve akümülatör şarj basıncı ölçülerek pilot filtre grubu değiştirilir.'
      }
    ]
  },
  {
    id: 'komatsu',
    name: 'Komatsu',
    origin: 'Japonya',
    category: 'Ekskavatör, Loder, Dozer, Kaya Kamyonu',
    logoText: 'KOMATSU',
    badge: 'Japon Hidrolik Hassasiyeti',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Komatsu PC200, PC300, PC390, PC450 paletli ekskavatörler, WA380, WA470 lastikli yükleyiciler ve D65, D85, D155 dozerler için CLSS hidrolik sistem revizyonu ve Komtrax servis desteği.',
    diagnosticTool: 'Komatsu Komtrax & K-Detect / Insite Teşhis Sistemi',
    supportedModels: [
      'Komatsu PC200-7 / PC200-8 / PC210-10M0 Paletli Ekskavatör',
      'Komatsu PC300-7 / PC300-8 / PC350LC / PC390LC Ağır Ekskavatör',
      'Komatsu PC450-8 / PC500LC Maden Sınıfı Ekskavatörler',
      'Komatsu WA380-6 / WA470-6 / WA480-6 Lastikli Yükleyici',
      'Komatsu D65EX / D85EX / D155A Ağır Paletli Dozer'
    ],
    expertiseAreas: [
      'Komatsu SAA6D102, SAA6D107, SAA6D114 ve SAA6D125 motor revizyonu',
      'CLSS (Closed-center Load Sensing System) hidrolik ana pompa revizyonu',
      'Unloader valf, LS valf ve PC valf dinamik debi kalibrasyonları',
      'Kule dönüş redüktörü ve çift cer planet dişli aşınma onarımı',
      'Dozing bıçağı silindirleri, yürüyüş baklaları ve istikamet makara değişimi'
    ],
    commonFaults: [
      {
        code: 'CA2249 / Komatsu DTC',
        title: 'Common Rail Basıncı Çok Düşük (HPCR Hatası)',
        solution: 'Basınç tahliye emniyet valfi kaçak testi yapılır, yakıt besleme pompası debisi ve SCV valfi kalibre edilir.'
      },
      {
        code: 'DAFRKR / E02',
        title: 'Pompa Kontrol Selenoid Arızası',
        solution: 'EPC valf bobin dirençleri ölçülerek oransal basınç kontrol hattı hidrolik test standında ayarlanır.'
      }
    ]
  },
  {
    id: 'volvo',
    name: 'Volvo Construction Equipment',
    origin: 'İsveç',
    category: 'Ekskavatör, Lastikli Yükleyici, Belden Kırma Kamyon',
    logoText: 'VOLVO',
    badge: 'İskandinav Güvenlik & Güç',
    heroImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    description: 'Volvo EC210D, EC220D, EC300D, EC380D, EC480D ekskavatörler, L90, L120, L150 lastikli yükleyiciler ve A30G, A40G belden kırma kaya kamyonları için ileri seviye elektronik ve hidrolik servis.',
    diagnosticTool: 'Volvo Tech Tool (PTT) & VCADS Pro Adaptör',
    supportedModels: [
      'Volvo EC210B / EC210D / EC220D / EC250D Paletli Ekskavatör',
      'Volvo EC300D / EC300E / EC380D / EC480D Ağır Ekskavatör',
      'Volvo L90F / L120F / L120G / L150G Lastikli Yükleyici',
      'Volvo EW140 / EW160 / EW205 Lastikli Ekskavatör',
      'Volvo A30F / A30G / A40G Belden Kırma Kaya Kamyonu'
    ],
    expertiseAreas: [
      'Volvo D6E, D7E, D8J, D13F ve D16 motor komple rektifiye ve test işlemleri',
      'OptiShift otomatik şanzıman ve ters tork konvertör kavrama revizyonu',
      'E-ECU, V-ECU ve I-ECU kontrol beyinleri arası veri hattı onarımları',
      'Volvo çift değişken debili ana pompa ve elektro-hidrolik kumanda bloğu revizyonu',
      'CareTrack telematik sistemi ve yakıt tasarrufu modu yazılım kalibrasyonu'
    ],
    commonFaults: [
      {
        code: 'MID 128 PID 94 FMI 1',
        title: 'Dizel Yakıt Besleme Basıncı Düşük',
        solution: 'Ön filtre su ayırıcı ve besleme pompası debisi kontrol edilir; yakıt basınç sensörü test edilerek sorun giderilir.'
      },
      {
        code: 'MID 187 PSID 200 FMI 9',
        title: 'V-ECU / Motor ECU İletişim Hatası',
        solution: 'J1939 yüksek hızlı omurga hattında kablo bükülme ve ezilme taraması yapılır; terminatör dirençleri yenilenir.'
      }
    ]
  },
  {
    id: 'manitou',
    name: 'Manitou',
    origin: 'Fransa',
    category: 'Teleskopik Yükleyici (Telehandler), Roto, Forklift',
    logoText: 'MANITOU',
    badge: 'Telehandler Referans Servisi',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    description: 'Manitou MT, MT-X serisi şantiye telehandlerları, MRT Roto döner kuleli teleskopik vinçler ve ağır hizmet arazi forkliftleri için mekanik, bom zinciri ve LMI emniyet sistemi bakımı.',
    diagnosticTool: 'Manitou Easy Manager & Özel Diagnostik Yazılımı',
    supportedModels: [
      'Manitou MT-X 732 / MT-X 1030 / MT-X 1440 Şantiye Telehandler',
      'Manitou MT-X 1740 / MT-X 1840 Ağır Hizmet Yüksek İrtifa Yükleyici',
      'Manitou MRT 1840 / MRT 2150 / MRT 2540 Roto Döner Kuleli Vinç',
      'Manitou M 30-4 / M 50-4 Arazi Tipi 4x4 Forkliftler'
    ],
    expertiseAreas: [
      'Perkins ve Deutz motorların şantiye yerinde periyodik bakım ve onarımı',
      'Rexroth hidrostatik yürüyüş pompası ve hidromotor basınç testleri',
      'Teleskopik bom iç zincirlerinin değişimi, gergi ayarı ve kaydırıcı teflon pabuçlar',
      'LMI (Yük Moment Sınırlayıcı) emniyet kartı, açı potansiyometresi ve basınç hücresi',
      '4 teker yengeç ve ön tekerlek direksiyon senkronizasyon silindirleri onarımı'
    ],
    commonFaults: [
      {
        code: 'LMI Alarm / Cut-Off',
        title: 'Bom Yük Güvenlik Kilitlemesi',
        solution: 'Bom açı sensörü ve şasi meyil sensörü referans açı kalibrasyonuna tabi tutularak emniyet kilidi açılır.'
      },
      {
        code: 'Hydrostatic Slow Speed',
        title: 'Yürüyüş Hızı ve Rampada Çekiş Kaybı',
        solution: 'Hidrostatik yüksek basınç emniyet valfleri (cut-off) 420 bar seviyesine ayarlanır; oransal yürüyüş selenoidi temizlenir.'
      }
    ]
  },
  {
    id: 'merlo',
    name: 'Merlo',
    origin: 'İtalya',
    category: 'Teleskopik Yükleyici, Panoramic, Turbofarmer',
    logoText: 'MERLO',
    badge: 'Kompakt Mühendislik',
    heroImage: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80',
    description: 'Merlo Panoramic, Turbofarmer ve Roto serisi teleskopik yükleyiciler için İtalyan hidrolik mimarisine uygun CDC güvenlik sistemi, bom süspansiyonu ve hidrostatik servis.',
    diagnosticTool: 'Merlo CDC Diagnostic Interface & E-Work',
    supportedModels: [
      'Merlo Panoramic P 38.13 / P 40.17 / P 50.18 Şantiye Telehandler',
      'Merlo Turbofarmer TF 35.7 / TF 42.7 Endüstriyel Yükleyiciler',
      'Merlo Roto 40.26 / 45.21 / 50.35 Döner Kuleli Modeller'
    ],
    expertiseAreas: [
      'CDC (Dinamik Yük Kontrolü) ekran ve sensör sistemleri onarımı',
      'Sauer Danfoss elektro-oransal hidrolik dağıtıcı blok revizyonu',
      'BSS Bom Süspansiyon Sistemi azot akümülatörü gaz basımı ve sönümleme ayarı',
      'Kabin yana yatırma (şasi dengeleme) silindirleri keçeleme ve kilit valfi onarımı'
    ],
    commonFaults: [
      {
        code: 'CDC Block Err 12',
        title: 'Dinamik Yük Algılayıcı Sinyal Tutarsızlığı',
        solution: 'Arka aks yük hücresi (load sensor) voltaj seviyesi ölçülür ve sıfır noktası kalibrasyonu yapılır.'
      }
    ]
  },
  {
    id: 'bobcat',
    name: 'Bobcat',
    origin: 'ABD / Çekya',
    category: 'Mini Yükleyici, Mini Ekskavatör, Kompakt Telehandler',
    logoText: 'BOBCAT',
    badge: 'Kompakt Güç Uzmanı',
    heroImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    description: 'Bobcat S530, S570, S650, T770 nokta dönüşlü mini yükleyiciler ve E26, E35, E50 mini ekskavatörler için tandem hidrostatik pompa, zincirli tahrik kutusu ve Bob-Tach onarımı.',
    diagnosticTool: 'Bobcat Service Analyzer & KUBOTA Diagmaster',
    supportedModels: [
      'Bobcat S450 / S530 / S570 / S650 / S770 Skid-Steer Nokta Dönüşlü Loder',
      'Bobcat T590 / T770 / T870 Paletli Kompakt Yükleyici',
      'Bobcat E26 / E35 / E50 / E60 Mini ve Paletli Ekskavatörler'
    ],
    expertiseAreas: [
      'Kubota ve Bobcat D1803 / D2403 motor periyodik bakım ve rektifiyesi',
      'Tandem hidrostatik pompa revizyonu ve aşınma plakası taşlaması',
      'Zincir kutusu (chaincase) zincir gerdirme ve cer aks rulman değişimleri',
      'Bob-Tach hızlı ataşman değiştirici hidrolik kilit silindiri onarımı'
    ],
    commonFaults: [
      {
        code: 'DTC 04-21',
        title: 'Sol / Sağ Hidrostatik Yürüyüş Basınç Uyuşmazlığı',
        solution: 'Makine bir tarafa çekme yapar; oransal yürüyüş bobini ve tandem pompa pilot basınç ayarları yapılarak dengelenir.'
      }
    ]
  },
  {
    id: 'liebherr',
    name: 'Liebherr',
    origin: 'Almanya / İsviçre',
    category: 'Ağır Paletli Ekskavatör, Maden Makinaları, Lastikli Loder',
    logoText: 'LIEBHERR',
    badge: 'Alman Ağır Sanayi Standardı',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    description: 'Liebherr R924, R934, R944, R950 Litronic paletli ekskavatörler ve L550, L566, L580 XPower lastikli yükleyiciler için Alman standartlarında üst düzey teknik destek.',
    diagnosticTool: 'Liebherr Sculi Diagnostic Tool & LiDAT',
    supportedModels: [
      'Liebherr R920 / R924 / R934 / R944C Litronic Ekskavatör',
      'Liebherr R950 / R960 Ağır Maden ve Taş Ocağı Ekskavatörü',
      'Liebherr L550 / L566 / L580 2plus2 / XPower Lastikli Loder'
    ],
    expertiseAreas: [
      'Liebherr 4 ve 6 silindirli V motor rektifiye ve enjeksiyon kalibrasyonu',
      'Litronic pozitif hidrolik kumanda ve çift pompa akış kontrolü',
      'XPower kademesiz hidrostatik-mekanik güç bölünmeli şanzıman revizyonu',
      'Ağır hizmet kule dönüş redüktörü ve sıvı azotlu bilya montajı'
    ],
    commonFaults: [
      {
        code: 'Sculi Error 5104',
        title: 'Litronic Basınç Sınırlama Valfi Sapması',
        solution: 'Elektronik pilot basınç regülatörü laboratuvar ortamında temizlenir ve test standında basınç haritası yenilenir.'
      }
    ]
  },
  {
    id: 'hitachi',
    name: 'Hitachi Construction Machinery',
    origin: 'Japonya',
    category: 'Zaxis Paletli Ekskavatör, Lastikli Ekskavatör',
    logoText: 'HITACHI',
    badge: 'Zaxis Güvenilirliği',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Hitachi Zaxis ZX200, ZX210, ZX250, ZX300, ZX350 ve ZX470 serisi paletli ve lastikli ekskavatörler için HIOS hidrolik rejenerasyon ve Isuzu motor tamiri.',
    diagnosticTool: 'Hitachi ZX Service Tool & MPDr Diagnostik Arayüzü',
    supportedModels: [
      'Hitachi Zaxis ZX200-5G / ZX210-5A / ZX210LC-6 Paletli Ekskavatör',
      'Hitachi Zaxis ZX250H-5G / ZX300LC-6 / ZX350H-5G Ağır Ekskavatör',
      'Hitachi Zaxis ZX470H-5G Maden Sınıfı Ekskavatör',
      'Hitachi ZX140W-6 / ZX190W-6 Lastikli Ekskavatörler'
    ],
    expertiseAreas: [
      'Isuzu 4HK1 ve 6HK1 common-rail motor arıza tespiti ve rektifiyesi',
      'HIOS III ve TRIAS hidrolik çoklu pompa enerji geri kazanım valfi revizyonu',
      'Kule dönüş dişlisi ve cer redüktörü mekanik sızdırmazlık (floating seal) onarımı',
      'MC (Machine Controller) ve ECM motor kontrol üniteleri kalibrasyonu'
    ],
    commonFaults: [
      {
        code: 'ZX DTC 1111-3',
        title: 'Bom Düşürme Pilot Basınç Sensörü Yüksek Voltaj',
        solution: 'Pilot kumanda hattı basınç sensörü test edilir; soket korozyonu giderilerek sensör nominal dirence getirilir.'
      }
    ]
  }
];
