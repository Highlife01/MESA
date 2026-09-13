export const servicesData = [
  {
    id: 'is-makinasi-tamiri',
    slug: 'is-makinasi-tamiri',
    title: 'İş Makinası Tamiri & Genel Mekanik Revizyon',
    shortDesc: 'Paletli ve lastikli ekskavatör, kazıcı yükleyici (bekoloder), loder, dozer ve greyderler için komple mekanik, şasi ve güç aktarım revizyonu.',
    icon: 'Wrench',
    category: 'Mekanik & Revizyon',
    duration: '1 - 3 Gün',
    warranty: '12 Ay / 2.000 Saat Garanti',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    content: `Mesa İş Makinaları olarak şantiyelerinizin durmaması için ağır iş makinelerinin komple mekanik, aktarma ve hidrolik revizyonunu uluslararası OEM toleranslarında gerçekleştiriyoruz. Caterpillar, JCB, Hidromek, Komatsu, Volvo ve Liebherr gibi sektör lideri markaların paletli ve lastikli ekskavatörleri, bekoloderleri, loderleri ve dozerleri uzman kadromuz tarafından incelenir.

Gelişmiş arıza tespit donanımları (Electronic Technician, ServiceMaster, H-Diag vb.) ile makinelerinizin elektronik kontrol üniteleri (ECU), hidrolik basınç haritaları ve motor çalışma parametreleri incelenerek sıfır hata toleransıyla revizyon planı oluşturulur. Atölyemizde 10 ton gezer vinç, 450 bar dinamik test standı ve seyyar borwerk delik işleme tezgahları ile tüm operasyon tek çatı altında tamamlanır.`,
    highlights: [
      'Motor, şanzıman, cer dişlisi ve kule redüktörü komple revizyonu',
      'Bom, arm ve kova burç-pim değişimleri, lazer hizalama ve seyyar borwerk delik honlama',
      'Ağır şasi çatlak onarımları, gerilim giderme ve sertifikalı gazaltı kaynak güçlendirmesi',
      'Orijinal OEM yedek parça ve onaylı ağır hizmet sızdırmazlık elemanları',
      'Revizyon sonrası bilgisayarlı basınç, akış (debi) ve hidrolik yük test raporu'
    ],
    technicalSpecs: [
      { label: 'Atölye Kaldırma Kapasitesi', value: '10 Ton Gezer Tavan Vinci' },
      { label: 'İşleme Toleransı', value: '±0.01 mm Mikron Hassasiyeti' },
      { label: 'Uyumlu Makine Tonajı', value: '1.5 Ton - 65 Ton Arası Tüm Modeller' },
      { label: 'Test Standardı', value: 'ISO Dinamik Basınç ve Sıcaklık Doğrulaması' }
    ],
    processSteps: [
      { step: '01', title: 'Elektronik & Mekanik Ekspertiz', desc: 'Arıza tespit cihazları ve hidrolik manometrelerle tüm sistem parametreleri kayıt altına alınır.' },
      { step: '02', title: 'Hassas Demontaj & Kimyasal Temizlik', desc: 'Bileşenler parçalanarak ultrasonik ve basınçlı kimyasal kabinlerde temizlenir, aşınma mikrometre ile ölçülür.' },
      { step: '03', title: 'Parça Değişimi & CNC/Tornalama', desc: 'Tolerans dışı parçalar OEM yenileriyle değiştirilir, şasi ve delik yüzeyleri seyyar borwerk ile işlenir.' },
      { step: '04', title: 'Yük Altında Test & Teslimat', desc: '450 Bar basınç ve debi testleri sonrası şantiye ortamında kalibrasyon yapılarak 12 ay garantiyle teslim edilir.' }
    ],
    commonIssues: [
      'Kova, bom veya arm bağlantılarında aşırı boşluk, pim aşınması ve ovallik oluşması',
      'Yürüyüş motorlarında (cer) çekiş düşüklüğü, aşırı ısınma ve mekanik ayna-mahruti sesi',
      'Dönüş kulesinde (swing motor & dişli) boşluk, yalpalama veya hidrolik frenleme zaafı',
      'Aşırı yakıt sarfiyatı, motor kompresyon kaybı ve siyah/mavi egzoz dumanı atma'
    ],
    faqs: [
      {
        q: 'Revizyon süreci ne kadar sürer ve şantiyede yerinde yapılabilir mi?',
        a: 'Periyodik bakım ve lokal mekanik onarımlar mobil servis araçlarımızla şantiyenizde 4-8 saatte tamamlanır. Komple şanzıman, kule veya motor revizyonları ise merkez atölyemizde ortalama 2-4 iş gününde test raporu ile teslim edilir.'
      },
      {
        q: 'Yapılan işçilik ve kullanılan parçalar resmi garantili midir?',
        a: 'Tüm mekanik ve hidrolik revizyonlarımız ile kullanılan orijinal parçalarımız 12 ay veya 2.000 çalışma saati resmi Mesa İş Makinaları servis garantisi altındadır.'
      },
      {
        q: 'Revizyon sırasında şantiyemizdeki işin aksamaması için yedek makine sağlıyor musunuz?',
        a: 'Anlaşmalı kurumsal filo sözleşmelerimiz kapsamında, kritik projelerde revizyon süresince makine kiralama ve ikame makine desteği sunmaktayız.'
      }
    ]
  },
  {
    id: 'hidrolik-sistem-tamiri',
    slug: 'hidrolik-sistem-tamiri',
    title: 'Hidrolik Pompa, Valf ve Silindir Revizyonu',
    shortDesc: 'Kawasaki, Bosch Rexroth, Parker, Danfoss ve Eaton hidrolik ana pompalar, kumanda blokları ve oransal valfler için 450 bar test tezgahlı revizyon.',
    icon: 'Activity',
    category: 'Hidrolik Sistemler',
    duration: 'Aynı Gün / 24 Saat',
    warranty: '12 Ay Garanti',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    content: `İş makinelerinin kalbi hidrolik sistemlerdir. Mesa İş Makinaları bünyesindeki modern hidrolik test istasyonumuzda; Kawasaki K3V/K5V/K7V serisi, Bosch Rexroth A8VO/A10VO/A11VO, Parker, Danfoss ve Eaton değişken debili eğik plakalı pistonlu pompalar sıfır toleransla revize edilir.

Rotary grup, piston pabucu, plaka, distribütör aynası ve tahrik şaftı değişimlerinin ardından pompalar dinamik test standımıza bağlanır. 450 Bar tepe basıncında debi verimliliği, kavitasyon riski ve iç kaçak (drenaj) testlerinden geçirilerek grafiksel test sertifikası ile teslim edilir.`,
    highlights: [
      '450 Bar tepe basınç ve 400 lt/dk debi kapasiteli dinamik hidrolik test standı',
      'Kawasaki, Bosch Rexroth, Sauer Danfoss, Parker ve Komatsu ana pompa revizyonu',
      'Ana kumanda bloğu (control valve) iç sızıntı taşlama, spool honlama ve pilot basınç kalibrasyonu',
      'Bom, arm, kova ve kule piston silindirleri krom kaplama, honlama ve ağır hizmet sızdırmazlık keçeleri',
      'Yağ sıcaklığı yükseldiğinde yaşanan hidrolik güç ve hız kayıplarının kesin çözümü'
    ],
    technicalSpecs: [
      { label: 'Dinamik Test Basıncı', value: '450 Bar Tepe Basıncı' },
      { label: 'Debi Ölçüm Kapasitesi', value: '400 Litre / Dakika' },
      { label: 'Test Yağı Sıcaklık Şartlandırma', value: '55°C Sabit Viskozite Testi' },
      { label: 'Sertifikasyon', value: 'Grafiksel Debi / Basınç Test Raporu' }
    ],
    processSteps: [
      { step: '01', title: 'Giriş ve Drenaj Ölçümü', desc: 'Pompa debi ve iç kaçak basınçları manometre ve debimetreyle şantiyede veya atölyede ölçülür.' },
      { step: '02', title: 'Rotary Grup İncelemesi', desc: 'Silindir bloğu, piston pabuçları ve ayna yüzeyleri mikron komparatörle kılcal çizik ve aşınma testine tabi tutulur.' },
      { step: '03', title: 'Hassas Taşlama & Orijinal Parça', desc: 'Distribütör plakası optik taşlama tezgahında alıştırılır; pistonlar ve keçeler OEM setle yenilenir.' },
      { step: '04', title: '450 Bar Dinamik Yük Testi', desc: 'Test tezgahında farklı devir ve basınç kademelerinde kavitasyon ve debi grafiği çıkarılarak onaylanır.' }
    ],
    commonIssues: [
      'Makine ısındığında hidrolik kolların bayılması, hareketlerin aşırı yavaşlaması ve güçten düşmesi',
      'Ana hidrolik pompadan gelen anormal uğultu, vuruntu, inleme veya aşırı titreme sesleri',
      'Piston silindir keçelerinden dışarıya yağ fışkırması veya iç kaçak nedeniyle bomun kendiliğinden aşağı salması',
      'Kumanda levyelerinde (joystick) sertleşme, tepkisizlik veya aynı anda birden fazla fonksiyonda basınç çökmesi'
    ],
    faqs: [
      {
        q: 'Hidrolik pompa revizyonu mu yoksa sıfır pompa almak mı daha mantıklıdır?',
        a: 'Doğru yapılan bir revizyon, sıfır OEM parçalar ve dinamik test tezgahında kalibrasyon ile orijinal pompanın %95+ fabrika performansına %40-%60 daha uygun maliyetle ulaşmasını sağlar.'
      },
      {
        q: 'Hidrolik yağ sıcaklığının aşırı yükselmesi neden kaynaklanır?',
        a: 'Yağın aşırı ısınması genellikle hidrolik pompadaki iç kaçaklar (drenaj kaybı), rahatsız çalışan oransal emniyet valfleri veya tıkalı yağ soğutucu (oil cooler) peteklerinden kaynaklanır. Cihazlarımızla noktasal termal analiz yapmaktayız.'
      }
    ]
  },
  {
    id: 'teleskopik-yukleyici-tamiri',
    slug: 'teleskopik-yukleyici-tamiri',
    title: 'Teleskopik Yükleyici (Telehandler) ve Vinç Servisi',
    shortDesc: 'Manitou, JCB Loadall, Merlo, Dieci ve Magni teleskopik yükleyiciler için bom açma-kapama zincirleri, hidrostatik yürüyüş ve LMI emniyet sistemi onarımı.',
    icon: 'Truck',
    category: 'Telehandler & Vinç',
    duration: 'Aynı Gün / 48 Saat',
    warranty: '12 Ay Garanti',
    heroImage: '/images/service-telehandler.jpg',
    content: `İnşaat, endüstriyel tesis montajı ve tarım sektörünün vazgeçilmezi olan teleskopik yükleyiciler (telehandler), yüksek irtifada ağır yük kaldırdığı için en yüksek güvenlik standartlarını gerektirir. Mesa İş Makinaları; Manitou (MT, MT-X serisi), JCB Loadall, Merlo Panoramic, Dieci ve Magni telehandler makinelerinin yetkin özel servisidir.

Teleskopik bom uzatma ve toplama zincirlerinin gergi kontrolleri, aşınma takozları (kaydırıcı pabuçlar), hidrostatik şanzımanlar, 4 tekerlek yönlendirme (yengeç yürüyüş) açı kalibrasyonları ve en önemlisi Yük Moment Göstergesi (LMI) emniyet sensörleri uzman teknisyenlerimizce kalibre edilir.`,
    highlights: [
      'Manitou, JCB Loadall, Merlo, Dieci ve Magni uzmanlığı',
      'Teleskopik bom uzatma zincir ve çelik halat değişimi, gergi kalibrasyonu',
      'Bom kaydırıcı teflon aşınma takozları değişimi ve boşluk sıfırlama',
      'Rexroth & Sauer Danfoss hidrostatik yürüyüş pompası ve hidromotor revizyonu',
      'LMI (Yük Moment Sınırlayıcı) açı ve basınç sensörü kalibrasyonu ve güvenlik testleri'
    ],
    technicalSpecs: [
      { label: 'Erişim Yüksekliği Kapsamı', value: '4 Metre - 32 Metre Arası Roto & Düz Bom' },
      { label: 'Güvenlik Testi', value: 'Dinamik Yük ve Devrilme Önleme Testi (LMI)' },
      { label: 'Yürüyüş Sistemi', value: 'Hidrostatik 4x4x4 Yengeç & Dört Tekerlek Direksiyon' },
      { label: 'Zincir Güvenlik Katsayısı', value: 'EN Standartlarına Uygun Sertifikalı Çelik Zincir' }
    ],
    processSteps: [
      { step: '01', title: 'Bom & Yürüyüş Güvenlik Taraması', desc: 'Bom uzama kızakları, zincir uzaması ve şasi terazi sensörleri kontrol edilir.' },
      { step: '02', title: 'Hidrostatik Yürüyüş Basınç Ayarı', desc: 'Düşük ve yüksek hız hidrostatik basınçları ile frenleme emniyet valfleri kalibre edilir.' },
      { step: '03', title: 'LMI Elektronik Kalibrasyon', desc: 'Yük hücresi (load cell) ve bom açı potansiyometresi fabrika referans ağırlıklarıyla ayarlanır.' },
      { step: '04', title: 'Sertifikalı İş Güvenliği Testi', desc: 'Maksimum bom açısında nominal yük testi yapılarak iş güvenliği raporu verilir.' }
    ],
    commonIssues: [
      'Bom uzatıldığında veya toplanırken takılma, sarsıntı veya aşırı sürtünme sesi gelmesi',
      'Makinanın yürüyüş hızının düşmesi, rampada çekmemesi veya yön değiştirirken vuruntu yapması',
      'LMI emniyet ekranının hata vermesi, alarm ötmesi ve makinenin bom hareketlerini kilitlemesi',
      '4 tekerlek direksiyon sisteminde tekerlerin aynı hizaya gelmemesi (senkronizasyon kaybı)'
    ],
    faqs: [
      {
        q: 'Telehandler bom zincirleri ne sıklıkla kontrol edilmeli ve değiştirilmelidir?',
        a: 'İş güvenliği mevzuatına göre her 6 ayda bir uzman servis tarafından gözle ve ölçümle incelenmeli, zincir uzaması %2 toleransını aştığında derhal yenilenmelidir.'
      },
      {
        q: 'LMI (Yük Güvenlik) sistemi kilitlendiğinde ne yapılmalıdır?',
        a: 'Makine emniyet amacıyla hidrolik valfleri kapatmıştır. Elektronik kalibrasyon cihazımızla yerinde açı ve basınç sensörlerini sıfırlayarak makineyi güvenle tekrar devreye alıyoruz.'
      }
    ]
  },
  {
    id: 'mobil-saha-servisi',
    slug: 'mobil-saha-servisi',
    title: '7/24 Acil Şantiye Gezici Mobil Servis Filosu',
    shortDesc: 'Adana, Mersin, Hatay, Osmaniye, Niğde ve tüm Çukurova bölgesine 45 dakikada ulaşan, atölye donanımlı 5 mobil acil müdahale aracı.',
    icon: 'ShieldCheck',
    category: 'Mobil Servis',
    duration: '45 Dk Ortalama Varış',
    warranty: 'Yerinde Müdahale Garantisi',
    heroImage: '/images/service-mobile-fleet.jpg',
    content: `Şantiyede duran her iş makinası, doğrudan proje gecikmesi ve yüksek finansal kayıp demektir. Mesa İş Makinaları 7/24 Gezici Mobil Servis Filosu; şantiyenizin bulunduğu lokasyona (maden sahası, taş ocağı, tünel, otoyol veya liman) en kısa sürede ulaşarak arızayı yerinde çözer.

Mobil servis araçlarımız sıradan bir arıza aracı değildir; araç içinde Kaeser vidalı dizel kompresör, Finn-Power mobil hidrolik hortum sıkma presi, jeneratörlü inverter gazaltı/ark kaynak makineleri, orijinal teşhis bilgisayarları ve zengin acil sarfiyat stoğu barındıran yürüyen bir atölyedir.`,
    highlights: [
      '5 adet tam donanımlı 4x4 ve panelvan mobil acil müdahale aracı',
      'Çukurova Bölgesi genelinde (Adana, Mersin, Hatay, Osmaniye) ortalama 45 dakika varış süresi',
      'Şantiye sahasında anında hidrolik hortum imalatı ve presleme imkanı',
      'Elektronik teşhis cihazlarıyla sahada ECU okuma, arıza kodu silme ve sensör kalibrasyonu',
      'Yerinde yağ değişimi, filtre yenileme ve numune alma (SOS Yağ Analizi)'
    ],
    technicalSpecs: [
      { label: 'Filo Büyüklüğü', value: '5 Donanımlı Mobil Servis Aracı' },
      { label: 'Hizmet Saatleri', value: '7 Gün 24 Saat Kesintisiz Vardiya' },
      { label: 'Hortum İmalat Çapı', value: '1/4" ila 2" 4 Telli R12/R15 Spiral Hortum' },
      { label: 'Mobil Güç Ünitesi', value: '15 kVA Entegre Dizel Jeneratör & Kompresör' }
    ],
    processSteps: [
      { step: '01', title: 'Acil Çağrı & Konum Tespiti', desc: '0533 529 36 74 nolu acil hattımız veya web sitemiz üzerinden arıza bildirilir, nöbetçi ekibe rota atanır.' },
      { step: '02', title: 'Hızlı Ulaşım (Ort. 45 Dk)', desc: 'En yakın konumdaki nöbetçi mobil ekibimiz tam donanımlı araçla şantiye lokasyonunuza intikal eder.' },
      { step: '03', title: 'Yerinde Noktasal Teşhis', desc: 'OEM diagnostik cihaz ve mekanik test aletleriyle arıza kaynağı kesin olarak tespit edilir.' },
      { step: '04', title: 'Sahada Onarım & İş Teslimi', desc: 'Parça değişimi, hortum presi veya kaynak işlemi yapılarak makine çalışır halde şantiye şefine teslim edilir.' }
    ],
    commonIssues: [
      'Şantiye çalışırken patlayan ana bom hortumu ve sahaya hidrolik yağ saçılması',
      'Motorun marş basmaması, mazot havası yapması veya yakıt pompası elektronik arızası',
      'Makinenin aniden kilitlenmesi ve ekranda kırmızı ikaz kodlarının yanıp sönmesi',
      'Kırıcı hattında basınç düşüklüğü veya hidrolik kaplin kırılması'
    ],
    faqs: [
      {
        q: 'Gezici servis için mesafe sınırı var mıdır?',
        a: 'Merkezimiz Adana olmak üzere Mersin, Tarsus, Ceyhan, İskenderun, Antakya, Osmaniye, Kadirli, Niğde ve çevre illerdeki tüm şantiye ve taş ocaklarına kesintisiz servis sunuyoruz.'
      },
      {
        q: 'Hafta sonu, gece veya resmi tatillerde servis çağırabilir miyiz?',
        a: 'Evet. 365 gün 24 saat nöbetçi saha ekiplerimiz ve mobil destek araçlarımız sürekli teyakkuz halindedir.'
      }
    ]
  },
  {
    id: 'hidrolik-hortum-pres',
    slug: 'hidrolik-hortum-pres',
    title: 'Mobil Hidrolik Hortum İmalatı ve Sahada Pres Hizmeti',
    shortDesc: 'Şantiyede işi durduran patlak hortumlara anında müdahale: 1/4" - 2" arası 4 telli yüksek basınç hortumları yerinde imal edilir ve preslenir.',
    icon: 'RotateCw',
    category: 'Hortum & Bağlantı',
    duration: '30 - 60 Dakika',
    warranty: 'Yüksek Basınç Sızdırmazlık Garantisi',
    heroImage: '/images/service-hydraulic-hose.jpg',
    content: `Şantiye operasyonlarının en sık karşılaştığı plansız duruş sebebi, yüksek basınç altında çalışan hidrolik hortumların patlaması veya rakor bağlantılarından sızdırmasıdır. Mesa İş Makinaları, şantiyenizden hortumu söküp sanayiye götürme derdini ortadan kaldırır.

Mobil araçlarımızda bulunan Finn-Power yüksek hassasiyetli hidrolik hortum sıkma presleri ve geniş rakor stoğu (BSP, JIC, ORFS, Komatsu Flanş, CAT Flanş, Metrik) sayesinde; 1/4 inçten 2 inçe kadar 1SN, 2SN, 4SP ve 4SH 4 telli spiral yüksek basınç hortumları şantiye sahasında dakikalar içinde üretilir ve makineye montajı yapılır.`,
    highlights: [
      'Şantiye sahasında sıfır bekleme süresiyle anında hortum üretimi',
      '4 telli (4SH / 4SP) ve 6 telli ultra yüksek basınç kırıcı hortumu stoğu',
      'Tüm uluslararası rakor standartları: CAT Flanş, Komatsu Metrik, ORFS, JIC, BSP',
      'Aşınma önleyici spiral plastik ve çelik zırh koruma kılıfları',
      'Hortum içi çapak temizleme mermisi uygulaması ile hidrolik pompa koruması'
    ],
    technicalSpecs: [
      { label: 'Presleme Çap Aralığı', value: '1/4" - 2" (DN6 - DN50)' },
      { label: 'Çalışma Basıncı Dayanımı', value: '700 Bar (10.000 PSI) Test Standartları' },
      { label: 'Hortum Normları', value: 'EN 853, EN 856, SAE 100 R12/R13/R15' },
      { label: 'Mobil Pres Markası', value: 'Finn-Power Hassas Mikrometreli Pres' }
    ],
    processSteps: [
      { step: '01', title: 'Patlak Hortumun İncelenmesi', desc: 'Hortum boyu, çalışma basıncı, bükülme yarıçapı ve rakor tipi şantiyede incelenir.' },
      { step: '02', title: 'Hassas Kesim & Pah Kırma', desc: 'Yeni hortum soğutmalı testereyle kesilir, iç ve dış kauçuk katmanları sıyırma tezgahında hazırlanır.' },
      { step: '03', title: 'Mikrometrik Presleme', desc: 'Finn-Power pres tezgahında tolerans değerine göre rakor soketi mikron hassasiyetle sıkılır.' },
      { step: '04', title: 'Hortum Yıkama & Montaj', desc: 'Hortumun içine çapak temizleme mermisi atılır ve makineye montajı yapılarak sızdırmazlık kontrol edilir.' }
    ],
    commonIssues: [
      'Ağır iş esnasında hortumun basınca dayanamayarak patlaması ve tonlarca yağın toprağa dökülmesi',
      'Rakor pres boyunlarından kılcal yağ kaçakları ve basınç kayıpları',
      'Hortumun sürtünme sonucu dış katmanının aşınarak çelik tellerin korozyona uğraması',
      'Yanlış basılmış rakor nedeniyle hortumun yüksek basınçta yerinden fırlaması'
    ],
    faqs: [
      {
        q: 'Patlayan hortumu söküp size getirmemiz gerekir mi?',
        a: 'Hayır! Mobil servis ekibimiz makinenizin yanına gelir, eski hortumu söker, araçtaki tezgahta yenisini sıfırdan üretir ve montajını tamamlar.'
      },
      {
        q: 'Kırıcı hortumları neden çok çabuk patlar?',
        a: 'Kırıcı hatlarında çok yüksek basınç darbeleri ve sürekli titreşim oluşur. Standart 2 telli hortumlar yerine 4 telli ağır hizmet (4SH/R15) hortum ve özel titreşim emici montaj yapılması şarttır.'
      }
    ]
  },
  {
    id: 'sanziman-diferansiyel',
    slug: 'sanziman-diferansiyel',
    title: 'Şanzıman, Tork Konvertörü ve Diferansiyel Revizyonu',
    shortDesc: 'ZF, Dana Spicer, Carraro ve Allison Powershift şanzımanlar, tork konvertörleri ve ağır hizmet aks-diferansiyel sistemleri için test raporlu revizyon.',
    icon: 'Settings',
    category: 'Güç Aktarımı',
    duration: '2 - 4 Gün',
    warranty: '12 Ay Garanti',
    heroImage: '/images/service-transmission.jpg',
    content: `Ağır iş makinelerinde motor gücünün tekerleklere veya yürüyüş cerlerine kayıpsız aktarılması; şanzıman, tork konvertörü ve diferansiyel dişli gruplarının kusursuz çalışmasına bağlıdır. Mesa İş Makinaları; ZF (WG serisi), Dana Spicer, Carraro ve Allison otomatik/powershift şanzımanların yetkin revizyon merkezidir.

Şanzıman iç debriyaj balataları, piston segmanları, selenoid valf gövdeleri, ayna-mahruti dişlileri ve planet taşıyıcılar orijinal yedek parçalarla yenilenir. Revizyon sonrasında şanzıman kontrol ünitesi (TCU) kalibrasyonu yapılarak vites geçişleri pürüzsüz hale getirilir.`,
    highlights: [
      'ZF, Dana Spicer, Carraro ve Allison Powershift şanzıman uzmanlığı',
      'Tork konvertörü dinamik balans ayarı, stator ve türbin kanat onarımı',
      'Ayna-mahruti ve diferansiyel kilit sistemleri boşluk (backlash) ayarları',
      'Şanzıman selenoid valf testleri ve elektronik vites kalibrasyonu',
      'Planet dişli grupları, aks milleri ve cer redüktörleri rulman değişimi'
    ],
    technicalSpecs: [
      { label: 'Şanzıman Tipleri', value: 'Powershift, Otomatik, Hidrostatik & Manuel' },
      { label: 'Dişli Boşluk Toleransı', value: '0.15 - 0.25 mm Ayna-Mahruti Sente Ayarı' },
      { label: 'Tork Konvertör Balansı', value: 'Dinamik Elektronik Balans Tezgahı' },
      { label: 'Yazılım Kalibrasyonu', value: 'ZF Testman & Dana Spicer Diagnostic Tool' }
    ],
    processSteps: [
      { step: '01', title: 'Basınç & Isı Testi', desc: 'Kavrama ve tork basınçları şanzıman test portlarından ölçülerek arızalı kavrama grubu tespit edilir.' },
      { step: '02', title: 'Komple Demontaj & İnceleme', desc: 'Gövde açılarak sürtünme balataları, çelik plakalar ve selenoid valf gövdesi sökülür.' },
      { step: '03', title: 'Orijinal Balata & Rulman Değişimi', desc: 'Aşınmış sürtünme diskleri, bronz burçlar ve konik masuralı rulmanlar OEM parçalarla yenilenir.' },
      { step: '04', title: 'Sentelenme & Kalibrasyon', desc: 'Ayna mahruti temas yüzeyi boya testiyle doğrulanır; yazılımsal vites geçiş kalibrasyonu yapılır.' }
    ],
    commonIssues: [
      'Makinenin vitese geçmemesi, vites geçişlerinde sert sarsıntı ve vuruntu yapması',
      'Yokuş yukarı çıkarken veya kova doluyken çekişin düşmesi, torkun kaçırması ve yağın kaynaması',
      'Diferansiyelden gelen uğultu, sürtünme veya dönüşlerde tekerlek kilitlenmesi sesleri',
      'Şanzıman filtresinde bronz veya çelik talaşı birikmesi'
    ],
    faqs: [
      {
        q: 'Şanzıman yağında yanık kokusu veya talaş görülmesi ne anlama gelir?',
        a: 'Bu durum sürtünme balatalarının sıyrıldığını veya rulman kafeslerinin dağıldığını gösterir. Makine derhal durdurulmalı; aksi halde dişli gövdesi tamamen kırılarak masraf katlanacaktır.'
      },
      {
        q: 'Tork konvertörünün revizyonu mümkün müdür?',
        a: 'Evet. Tork konvertörleri torna tezgahında özel olarak açılır, iç kanatlar ve tek yönlü kavrama debriyajı yenilenir, kaynak sonrası dinamik balansı alınarak sıfır ayarına getirilir.'
      }
    ]
  },
  {
    id: 'motor-arizalari',
    slug: 'motor-arizalari',
    title: 'Ağır Hizmet Dizel Motor Rektifiye ve Enjeksiyon Servisi',
    shortDesc: 'Caterpillar, Perkins, Isuzu, Cummins, Volvo Penta ve Deutz ağır hizmet dizel motorları için ana yatak, krank, silindir kapağı ve common-rail revizyonu.',
    icon: 'Cpu',
    category: 'Motor & Güç',
    duration: '3 - 5 Gün',
    warranty: '12 Ay / 2.000 Saat Garanti',
    heroImage: '/images/service-diesel-engine.jpg',
    content: `Şantiye koşullarında yüksek toz, aşırı sıcaklık ve sürekli ağır yük altında çalışan dizel motorlar, en üst seviye uzmanlık gerektirir. Mesa İş Makinaları; Caterpillar (C4.4, C7, C9, C13), Perkins (1104, 1106 serisi), Isuzu (4HK1, 6HK1), Cummins (QSB, QSC, QSL) ve Volvo Penta motorların rektifiye ve revizyon merkezidir.

Gelişmiş motor revizyon atölyemizde; silindir bloğu honlama, krank mili taşlama ve çatlak testi, silindir kapağı basınç testi, supap yuvası alıştırma ve OEM piston-gömlek montajı sıfır toleransla yapılır. Common-Rail yüksek basınç pompaları ve piezo enjektörler test edilerek emisyon ve yakıt optimizasyonu sağlanır.`,
    highlights: [
      'Caterpillar, Perkins, Isuzu, Cummins, Volvo ve Deutz motor revizyonu',
      'Krank mili mikron taşlama, dinamik balans ve manyetik çatlak kontrolü (magnaflux)',
      'Silindir bloğu gömlek honlama ve yüzey taşlama işlemleri',
      'Common-rail yüksek basınç pompası ve elektronik enjektör kalibrasyonu',
      'Revizyon sonrası bilgisayarlı kompresyon, yağ basıncı ve dinamometre testleri'
    ],
    technicalSpecs: [
      { label: 'Motor Güç Kapasitesi', value: '50 HP - 1.200 HP Endüstriyel Dizel Motorlar' },
      { label: 'Krank Taşlama Hassasiyeti', value: '0.005 mm (5 Mikron) Tolerans' },
      { label: 'Çatlak Kontrol Teknolojisi', value: 'Ultrasonik ve Manyetik Parçacık (Magnaflux)' },
      { label: 'Garanti Kapsamı', value: '12 Ay / 2.000 Çalışma Saati Resmi Garanti' }
    ],
    processSteps: [
      { step: '01', title: 'Kompresyon & Karter Basınç Testi', desc: 'Silindir kompresyon kaçakları ve karter üflemesi elektronik sensörlerle ölçülür.' },
      { step: '02', title: 'Motor Demontajı & Kimyasal Banyo', desc: 'Motor sökülerek karbonlaşmış kurumlar ultrasonik sıcak kimyasal havuzlarda arındırılır.' },
      { step: '03', title: 'Talaşlı İmalat & Hassas Montaj', desc: 'Blok taşlanır, OEM ana ve kol yatakları mikrometrik tork değerleriyle toplanır.' },
      { step: '04', title: 'Yağlama & Rodaj Testi', desc: 'Dizel motor test istasyonunda yağ basıncı, hararet ve egzoz gazı parametreleri izlenerek rodajı yapılır.' }
    ],
    commonIssues: [
      'Motorun karterden aşırı üflemesi, mavi egzoz dumanı ve yüksek motor yağı eksiltme',
      'Radyatöre yağ basması veya motor yağına soğutma suyu karışarak yağın beyazlaması (tahinleşme)',
      'Motor yatak sarması, krank vuruntusu ve düşük yağ basıncı ikaz lambasının yanması',
      'Common-rail enjektörlerin aşırı geri dönüş vermesi nedeniyle motorun zor çalışması veya stop etmesi'
    ],
    faqs: [
      {
        q: 'Motor rektifiyesinde neden orijinal parçalar tercih edilmelidir?',
        a: 'Ağır iş makineleri binek araçlara benzemez; sürekli tork ve 90°C+ sıcaklık altında çalışır. Yan sanayi piston ve yataklar genleşme katsayısı uyumsuzluğu nedeniyle kısa sürede motorun kilitlenmesine yol açar.'
      },
      {
        q: 'Komple motor revizyonundan sonra rodaj süreci nasıl olmalıdır?',
        a: 'Revizyon sonrası motorlarımız atölyemizde ön testten geçirilir. Şantiyede ilk 50 çalışma saati boyunca makinenin %70 yükü geçmemesi ve 50. saatte yağ/filtre kontrolünün yapılması tavsiye edilir.'
      }
    ]
  },
  {
    id: 'periyodik-bakim',
    slug: 'periyodik-bakim',
    title: 'Şantiye Periyodik Bakımı ve Spektrometrik Yağ Analizi',
    shortDesc: '250, 500, 1000 ve 2000 saatlik şantiye ağır hizmet periyodik bakımları; OEM filtre değişimi ve aşınma metalleri spektrometrik laboratuvar analizi.',
    icon: 'Clock',
    category: 'Koruyucu Bakım',
    duration: '2 - 4 Saat',
    warranty: 'Orijinal Filtre & Yağ Garantisi',
    heroImage: '/images/service-maintenance.jpg',
    content: `Ağır iş makinelerinin kullanım ömrünü uzatmanın ve büyük arıza maliyetlerinin önüne geçmenin tek yolu, tavizsiz koruyucu periyodik bakımdır. Mesa İş Makinaları; şantiyelerinizde 250, 500, 1000 ve 2000 saatlik fabrika standartlarında periyodik bakım paketleri sunar.

Tüm bakımlarda motor yağı, hidrolik yağı, şanzıman ve cer yağları vakumlu kapalı devre sistemlerle tahliye edilir; OEM standartlarında onaylı filtreler takılır. Ayrıca alınan yağ numuneleri spektrometrik laboratuvar analizine tabi tutularak bakır, demir, krom, kurşun ve silisyum gibi aşınma metalleri ölçülür, henüz arıza meydana gelmeden önleyici rapor sunulur.`,
    highlights: [
      '250, 500, 1000 ve 2000 saatlik fabrika onaylı periyodik bakım programları',
      'OEM standartlarında yakıt, hava, yağ ve hidrolik emiş/dönüş filtre değişimleri',
      'SOS Yağ Analizi: Aşınma metalleri, kurum oranı ve su kirliliği tespiti',
      'Gresleme noktaları, kule bilyası ve mafsal pimlerinin yüksek basınçlı yağlanması',
      'Soğutma sıvısı antifriz derecesi ve korozyon önleyici katkı kontrolleri'
    ],
    technicalSpecs: [
      { label: 'Bakım Aralıkları', value: '250 / 500 / 1.000 / 2.000 Çalışma Saati' },
      { label: 'Yağ Analiz Metodu', value: 'ASTM Standartlarında ICP Spektrometresi' },
      { label: 'Filtre Kalitesi', value: 'OEM ve Tier-1 Onaylı Mikrofiltrasyon' },
      { label: 'Mobil Yağlama Ünitesi', value: 'Pnömatik Yüksek Basınçlı Gres ve Yağ Dağıtıcı' }
    ],
    processSteps: [
      { step: '01', title: 'Çalışma Saati & Geçmiş İncelemesi', desc: 'Makinenin telematik ve saat göstergeleri incelenerek bakım kademesi belirlenir.' },
      { step: '02', title: 'Kapalı Devre Sıvı Tahliyesi', desc: 'Eski yağlar çevreye zarar vermeden vakumlu atık tanklarına çekilir ve numune alınır.' },
      { step: '03', title: 'OEM Filtre & Sıvı Dolumu', desc: 'Viskozite onaylı ağır hizmet motor, hidrolik ve cer yağları doldurulur, filtreler yenilenir.' },
      { step: '04', title: 'Genel Kontrol & Bakım Sıfırlama', desc: '50 nokta güvenlik kontrolü yapılarak servis sayacı sıfırlanır ve bakım karnesine işlenir.' }
    ],
    commonIssues: [
      'Zamanında değiştirilmeyen yakıt filtreleri sebebiyle enjektörlerin tıkanması ve pompaların bozulması',
      'Hava filtresi delinmesi sonucu motora toz girmesi ve silindir gömleklerinin aşırı çizilmesi',
      'Hidrolik yağın özelliğini yitirerek asitleşmesi ve valf sızıntılarına yol açması',
      'Greslenmeyen kule dönüş dişlisi ve pimlerin aşınarak binlerce liralık boşluk yapması'
    ],
    faqs: [
      {
        q: 'Spektrometrik yağ analizi (SOS) bize ne kazandırır?',
        a: 'Yağ analizinde mikron seviyedeki metal parçacıkları incelenir. Örneğin yağda bronz çıkması hidrolik pompanın, kurşun çıkması motor yataklarının aşınmaya başladığını haber verir. Böylece makine sahada kilitlenmeden çok küçük bir maliyetle önlem alınır.'
      },
      {
        q: 'Bakımı şantiyede kendi imkanlarımızla yapmak ile servis çağırmak arasındaki fark nedir?',
        a: 'Mesa ekipleri sadece filtre değiştirmez; 50 noktalı elektronik ve mekanik güvenlik denetimi yapar, hidrolik basınçları ayarlar ve bakım geçmişini kurumsal ERP sistemimizde garanti altına alır.'
      }
    ]
  },
  {
    id: 'elektronik-ariza-beyin-tamiri',
    slug: 'elektronik-ariza-beyin-tamiri',
    title: 'ECU Beyin, Elektronik & Diagnostik Teşhis',
    shortDesc: 'İş makineleri motor beyni (ECM), hidrolik kontrol ünitesi (HCU), gösterge paneli ve CAN-Bus tesisat arızalarının laboratuvar ortamında onarımı.',
    icon: 'Cpu',
    category: 'Elektronik & Diagnostik',
    duration: '24 - 48 Saat',
    warranty: '12 Ay Elektronik Garanti',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    content: `Modern iş makineleri, karmaşık mikrodenetleyiciler ve sensör ağlarıyla yönetilir. Bir kablo kopukluğu, voltaj dalgalanması veya beyin arızası yüz tonluk bir makineyi anında kilitleyebilir. Mesa İş Makinaları bünyesindeki Elektronik Kart ve Beyin Onarım Laboratuvarı; en zorlu elektronik arızaları çözer.

Caterpillar A4/A5 ECM, JCB LiveLink ve ECU, Hidromek Opera kontrol ünitesi, Komatsu controller ve Volvo V-ECU beyinleri lehimleme istasyonlarımızda mikroçip seviyesinde onarılır. Şantiye sahasında ise osiloskop ve CAN-Bus analizörleri ile tesisat kopuklukları dakikalar içinde tespit edilir.`,
    highlights: [
      'Caterpillar, JCB, Hidromek, Komatsu ve Volvo ECU/ECM beyin tamiri',
      'CAN-Bus haberleşme hattı sinyal analizi ve tesisat şase/kopukluk tespiti',
      'Operatör gösterge panelleri (display panel) ve joystick potansiyometre onarımı',
      'Elektronik selenoid valf sürücü çıkışları ve sensör kalibrasyonu',
      'Yazılım güncelleme, parametre yükleme ve arıza hafızası kalıcı temizleme'
    ],
    technicalSpecs: [
      { label: 'Onarım Seviyesi', value: 'BGA & SMD Mikroçip Düzeyinde Lehimleme' },
      { label: 'Test Cihazı', value: 'Çok Kanallı Dijital Depolamalı Osiloskop' },
      { label: 'Simülatör', value: 'Masaüstü ECU Motor & Hidrolik Simülasyon Tezgahı' },
      { label: 'Koruma Standartı', value: 'Şantiye Koşullarına Karşı Poliüretan İzolasyon Kaplama' }
    ],
    processSteps: [
      { step: '01', title: 'Hata Kodları Analizi', desc: 'OEM arıza tespit soketinden aktif ve hafızadaki DTC hata kodları okunur.' },
      { step: '02', title: 'CAN-Bus & Tesisat Taraması', desc: 'Direnç, voltaj ve osiloskop dalga formu testleriyle tesisat arızaları ayrıştırılır.' },
      { step: '03', title: 'Kart Laboratuvar Onarımı', desc: 'Yanmış transistörler, koruma diyotları ve işlemciler mikroskop altında yenilenir.' },
      { step: '04', title: 'Simülatör Testi & İzolasyon', desc: 'Beyin masaüstü test tezgahında çalıştırılır, şantiye titreşimine karşı sıvı silikonla yalıtılır.' }
    ],
    commonIssues: [
      'Makinenin marşa basmaması veya marş bassa da yakıt enjektörlerinin tetiklenmemesi',
      'Gösterge ekranında "CAN Communication Failure" veya iletişim kopukluğu uyarısı çıkması',
      'Makinanın aniden emniyet (limp home) moduna geçerek gaz yememesi ve devir yükseltmemesi',
      'Ters akü kutup bağlantısı veya takviye sırasında beynin yanması ve sigorta attırması'
    ],
    faqs: [
      {
        q: 'Yanan bir iş makinası beyni tamir edilebilir mi yoksa sıfır mı alınmalıdır?',
        a: 'Ters voltaj veya kısa devre kaynaklı arızaların %85-90ı laboratuvarımızda orijinal komponentlerle tamir edilebilir. Bu sayede sıfır beyin bekleme süresi ve binlerce euroluk masraf önlenmiş olur.'
      },
      {
        q: 'Onarılan beyinler şantiye toz ve neminden etkilenir mi?',
        a: 'Hayır. Onarım sonrası elektronik kartlar fabrika standartlarında özel IP67 su ve toz geçirmez koruyucu vernik (conformal coating) ile kaplanır.'
      }
    ]
  },
  {
    id: 'kule-donus-cer-revizyonu',
    slug: 'kule-donus-cer-revizyonu',
    title: 'Kule Dönüş, Cer Dişlisi ve Yürüyüş Takımı Onarımı',
    shortDesc: 'Ekskavatör kule bilyası, dönüş redüktörü (swing motor), cer dişlileri, palet zinciri, istikamet ve yürüyüş makaraları komple revizyonu.',
    icon: 'Compass',
    category: 'Yürüyüş & Dönüş',
    duration: '2 - 3 Gün',
    warranty: '12 Ay Garanti',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    content: `Ağır tonajlı paletli ekskavatörlerde üst yapının 360 derece dönmesini sağlayan kule çember dişlisi ve makinayı yürüten nihai cer redüktörleri, en yüksek mekanik gerilime maruz kalan kısımlardır. Mesa İş Makinaları; kule dönüş ve yürüyüş sistemlerinde uzmanlaşmıştır.

Kule bilyası eksenel boşluk ölçümü, kule fren balataları, planet dişli kademeleri ve mekanik ayna keçeleri sıfırlanır. Ayrıca palet gergi silindirleri, istikamet tekerleri, alt/üst yürüyüş makaraları ve palet pabuçları şantiye sahasında hidrolik sökme preslerimizle onarılır.`,
    highlights: [
      'Kule dönüş çember dişlisi (swing bearing) boşluk tespiti ve değişimi',
      'Dönüş hidromotoru ve planet dişli redüktör komple revizyonu',
      'Cer redüktörü mekanik ayna keçesi (floating seal) kaçak onarımı',
      'Palet gergi yayları ve hidrolik gergi piston keçeleri yenileme',
      'İstikamet tekeri (idlers), alt-üst makara ve palet zinciri değişimi'
    ],
    technicalSpecs: [
      { label: 'Kule Boşluk Ölçüm Metodu', value: 'Manyetik Ayaklı Dijital Komparatör' },
      { label: 'Sızdırmazlık Teknolojisi', value: 'Ağır Hizmet Metal-Metal Floating Seal' },
      { label: 'Torklama Ekipmanı', value: 'Hidrolik Tork Anahtarı (10.000 Nm Kapasite)' },
      { label: 'Uyumlu Tonaj', value: '5 Ton - 50 Ton Paletli Ekskavatörler' }
    ],
    processSteps: [
      { step: '01', title: 'Boşluk & Salgı Ölçümü', desc: 'Komparatörle kule rulmanının yatay ve dikey eksenel boşlukları ölçülür.' },
      { step: '02', title: 'Üst Şasi Ayrıştırma', desc: 'Gerektiğinde 10 ton vinç ve hidrolik krikolarla üst kule güvenle askıya alınır.' },
      { step: '03', title: 'Redüktör & Keçe Yenileme', desc: 'Planet kademe dişlileri, iğneli rulmanlar ve floating mekanik keçeler yenilenir.' },
      { step: '04', title: 'Yüksek Torklu Cıvata Montajı', desc: 'Kule cıvataları hidrolik tork anahtarıyla çapraz sırayla fabrika tork değerinde sıkılır.' }
    ],
    commonIssues: [
      'Ekskavatör kulesi dönerken sürtünme, takılma veya metalik taşlama sesleri gelmesi',
      'Dönüş durdurulduğunda kulenin kaymaya devam etmesi (frenleme tutmaması)',
      'Cer dişlisi göbeğinden dışarıya ağır diferansiyel yağı sızması ve paletin kilitlenmesi',
      'Palet zincirinin gevşeyerek sık sık yerinden çıkması veya gergi pistonunun yağ tutmaması'
    ],
    faqs: [
      {
        q: 'Kule bilyası boşluk yaparsa ne gibi tehlikeler doğurur?',
        a: 'Kule boşluğu ihmal edilirse kule dişlisinin dişleri kırılır, kule pinyon şaftı yamulur ve nihayetinde üst gövdenin alt şasiden ayrılmasına kadar varabilecek ölümcül iş kazalarına yol açabilir.'
      },
      {
        q: 'Cer keçesi kaçırdığında sadece yağ ekleyerek çalışmaya devam edilebilir mi?',
        a: 'Kesinlikle hayır! Yağ sızdıran floating keçe aynı zamanda içeriye toz ve taş alır. Yağsız kalan cer planet dişlileri saatler içinde tamamen parçalanır ve çok ağır masraf çıkarır.'
      }
    ]
  },
  {
    id: 'borwerk-delik-isleme-ve-kaynak',
    slug: 'borwerk-delik-isleme-ve-kaynak',
    title: 'Seyyar Borwerk Delik İşleme & Gazaltı Burç Kaynak',
    shortDesc: 'Şantiyede bom, arm ve kova bağlantı deliklerinin sökülmeden yerinde lazer hassasiyetinde seyyar borwerk tezgahıyla işlenmesi ve burçlanması.',
    icon: 'Layers',
    category: 'Talaşlı İmalat',
    duration: 'Aynı Gün (4 - 8 Saat)',
    warranty: 'Sıfır Boşluk Tolerans Garantisi',
    heroImage: '/images/service-borwerk.jpg',
    content: `Zamanla aşınan, ovallaşen veya çatlayan bom, arm, kova ve şasi bağlantı kulaklarını atölyeye taşımak büyük vinçler ve günler süren nakliye masrafı gerektirir. Mesa İş Makinaları, taşınabilir (seyyar) borwerk delik işleme makinelerini doğrudan şantiyenize getirir.

Bozulmuş delik yuvalarına otomatik döner gazaltı kaynak robotu ile dolgu yapılır; ardından karbür elmas uçlu seyyar borwerk milimiz delik merkezine lazerle hizalanarak fabrika ölçüsünde mikron toleransla honlanır. Orijinal burç ve sertleştirilmiş pimler çakılarak sıfır boşlukla iş teslim edilir.`,
    highlights: [
      'Şantiye sahasında makineyi parçalamadan yerinde delik işleme',
      'Otomatik delik içi spiral dolgu kaynağı ile homojen et kalınlığı',
      'Ø 35 mm den Ø 400 mm ye kadar geniş delik işleme çapı',
      'Bom ucu, arm ucu, kova bağlantı kulakları ve şasi mafsal delikleri',
      'Sertleştirilmiş orijinal burç ve kromajlı pim çakma hizmeti'
    ],
    technicalSpecs: [
      { label: 'İşleme Çap Aralığı', value: 'Ø 35 mm - Ø 400 mm Delik Çapları' },
      { label: 'Hassasiyet Toleransı', value: 'H7 Delik Geçme Toleransı (±0.015 mm)' },
      { label: 'Kaynak Sistemi', value: 'Otomatik Sürekli Döner Gazaltı Dolgu Robotu' },
      { label: 'Eksenel Hizalama', value: 'Lazerli Çift Merkezleme Mastarı' }
    ],
    processSteps: [
      { step: '01', title: 'Ovallik Ölçümü & Merkezleme', desc: 'Aşınmış delik iç çap mikrometresi ile taranır, borwerk mili her iki delik eksenine hizalanır.' },
      { step: '02', title: 'Otomatik Delik Kaynak Dolgusu', desc: 'Döner torç robotu ile delik içine homojen ve gözeneksiz sert dolgu kaynağı çekilir.' },
      { step: '03', title: 'Hassas Paso Tornalama', desc: 'Karbür elmas uçlu borwerk kafası mikrometrik pasolarla deliği nominal burç çapına getirir.' },
      { step: '04', title: 'Sıvı Azotla Burç Çakma', desc: 'Yeni çelik burçlar gerektiğinde sıvı azotta şoklanarak mikron toleransla yuvaya preslenir.' }
    ],
    commonIssues: [
      'Kovanın veya armın kazı yaparken aşırı şakırdaması, sallanması ve operatörün kontrol zorluğu yaşaması',
      'Aşınan pimin delik yuvasını ovallaştırması ve standart burçların artık yuvaya oturmaması',
      'Bom bağlantı kulaklarında aşırı gerilme sonucu kılcal çatlakların başlaması',
      'Düzensiz aşınan burçlar nedeniyle hidrolik silindir keçelerinin sürekli patlaması'
    ],
    faqs: [
      {
        q: 'Seyyar borwerk işlemi ne kadar sürer?',
        a: 'Bir çift delik için (örneğin kova-arm bağlantısı) dolgu kaynağı ve hassas tornalama işlemi yerinde ortalama 3-5 saat içinde tamamlanarak makine aynı gün işe döner.'
      },
      {
        q: 'Doldurulan delik orijinali kadar dayanıklı olur mu?',
        a: 'Kullandığımız gazaltı dolgu telleri yüksek karbonlu ve aşınmaya dirençli özel alaşımlardır. Fabrika döküm gövdesinden daha yüksek sertlikte ve uzun ömürlü bir aşınma yüzeyi elde edilir.'
      }
    ]
  },
  {
    id: 'hidrolik-kirici-ve-atasman-bakimi',
    slug: 'hidrolik-kirici-ve-atasman-bakimi',
    title: 'Hidrolik Kırıcı, Kova & Özel Ataşman Servisi',
    shortDesc: 'Montabert, Rammer, Soosan, Furukawa ve Epiroc hidrolik kırıcılar için diyafram membran, kama, piston, azot gazı dolumu ve vibrasyon takozları revizyonu.',
    icon: 'Shield',
    category: 'Ataşman & Kırıcı',
    duration: 'Aynı Gün / 24 Saat',
    warranty: 'Vuruntu & Sızdırmazlık Garantisi',
    heroImage: '/images/service-hydraulic-breaker.jpg',
    content: `Taş ocakları, yol yarma ve yıkım projelerinin en ağır darbe yükünü çeken hidrolik kırıcılar, dakikada 400 ila 1000 darbe vurarak çalışır. Mesa İş Makinaları; Montabert, Rammer, Soosan, Furukawa, Epiroc (Atlas Copco) ve MTB kırıcıların Adana ve Çukurova bölgesindeki yetkin revizyon merkezidir.

Kırıcı ana gövde bağlantı saplamaları (tie-rod), piston ve silindir vuruntu yüzeyleri, alt/üst kama burçları ve darbe sönümleyici poliüretan takozlar yenilenir. Azot akümülatörlerine yüksek saflıkta N2 gazı basılarak kırıcı darbe gücü fabrika nominal değerine çıkarılır.`,
    highlights: [
      'Montabert, Rammer, Soosan, Furukawa ve Epiroc hidrolik kırıcı uzmanlığı',
      'Azot akümülatörü membran değişimi ve dijital manometreyle N2 gazı dolumu',
      'Kırıcı ana piston ve silindir kavitasyon/çizik honlama işlemleri',
      'Alt ve üst kama (keski) burçları değişimi ve gres kanalı temizliği',
      'Ağır hizmet kova bıçakları, tırnak adaptörleri ve Hardox aşınma plakası montajı'
    ],
    technicalSpecs: [
      { label: 'Kırıcı Çalışma Ağırlığı', value: '150 kg - 7.000 kg Ağır Kaya Kırıcıları' },
      { label: 'Azot Dolum Basıncı', value: '15 - 60 Bar N2 Yüksek Saflıkta Azot' },
      { label: 'Saplama Torklama', value: 'Hidrolik Gerdirme & Açısal Tork Kontrolü' },
      { label: 'Kova Zırhı Malzemesi', value: 'Hardox 450 / 500 Ağır Hizmet Aşınma Sacı' }
    ],
    processSteps: [
      { step: '01', title: 'Darbe & Kaçak İncelemesi', desc: 'Kırıcı darbe sayısı, çalışma basıncı ve azot haznesi gaz basıncı ölçülür.' },
      { step: '02', title: 'Komple Gövde Demontajı', desc: 'Saplamalar sökülerek silindir, piston ve valf grubu mikron hassasiyetle kontrol edilir.' },
      { step: '03', title: 'Conta & Membran Yenileme', desc: 'Yüksek sıcaklığa dayanıklı viton sızdırmazlık setleri ve diyafram membran takılır.' },
      { step: '04', title: 'Azot Gazı Basımı & Darbe Testi', desc: 'Nominal basınçta azot gazı doldurulup ekskavatör üzerinde hidrolik debi testi yapılır.' }
    ],
    commonIssues: [
      'Kırıcının vurmayı durdurması, darbe gücünün zayıflaması veya tek vuruş yapıp kilitlenmesi',
      'Kama dibinden dışarıya aşırı miktarda siyah hidrolik yağ püskürmesi',
      'Gövde saplamalarının (tie rod) aşırı gerilme veya gevşeme sonucu çatlaması/kopması',
      'Kama burcunun aşırı boşluk yapması sonucu pistonun köşeli vurarak silindiri çizmesi'
    ],
    faqs: [
      {
        q: 'Kırıcıya azot gazı ne zaman basılmalıdır?',
        a: 'Kırıcının darbe gücü düştüğünde veya ekskavatör hortumlarında aşırı titreşim hissedildiğinde akümülatör gazı kontrol edilmelidir. Rutin olarak her 3 ayda bir gaz basıncı manometre ile ölçülmelidir.'
      },
      {
        q: 'Kama boşluğu neden silindire zarar verir?',
        a: 'Aşınan kama sağa-sola yalpalar. Bu yalpalama, yukarıdan inen ana pistonun kamaya düz değil açılı vurmasına neden olur; bu da dakikalar içinde silindir gömleğini ve pistonu çizer.'
      }
    ]
  },
  {
    id: 'is-makinalari-servisi',
    slug: 'is-makinalari-servisi',
    title: 'İş Makinaları Teknik Servisi',
    shortDesc: 'Türkiye genelinde ekskavatör, loder, bekoloder ve ağır şantiye iş makinaları için 7/24 yerinde mobil teknik servis ve mekanik onarım.',
    icon: 'Wrench',
    category: 'Ulusal Teknik Servis',
    duration: 'Aynı Gün / 24 Saat',
    warranty: '12 Ay / 2.000 Saat Garanti',
    heroImage: '/images/mesa-excavator-hero.png',
    content: `MESA İş Makinaları, Türkiye genelinde inşaat, madencilik, altyapı ve taş ocağı şantiyelerinde çalışan tüm ağır iş makinelerine 7/24 mobil teknik servis desteği sunar. Tam donanımlı gezici servis araçlarımız, arıza tespiti ve acil müdahale donanımlarıyla şantiyenize doğrudan intikal eder.

Mekanik aşınmalar, motor ve aktarma organları revizyonu, yürüyüş takımları (cer dişlisi, palet gergi, istikamet tekeri) onarımı ve periyodik ağır hizmet bakımları OEM standartlarında gerçekleştirilir.`,
    highlights: [
      'Türkiye geneli şantiyede yerinde arıza tespiti ve acil mekanik onarım',
      'Ekskavatör, loder, bekoloder ve dozer güç aktarım organları revizyonu',
      'Seyyar borwerk delik işleme tezgahı ile sahada pim ve burç honlama',
      'Cer dişlisi, kule dönüş redüktörü ve şanzıman revizyonu',
      '12 ay resmi MESA servis garantisi ve detaylı ekspertiz raporu'
    ],
    technicalSpecs: [
      { label: 'Mobil İntikal Süresi', value: 'Bölgeye Göre 30 Dakika - 3 Saat' },
      { label: 'Uyumlu Tonaj', value: '1.5 Ton - 90 Ton Ağır Hizmet Makinaları' },
      { label: 'Teşhis Teknolojisi', value: 'OEM Lisanslı Elektronik Diagnostik' },
      { label: 'Garanti Kapsamı', value: '12 Ay / 2.000 Çalışma Saati' }
    ],
    processSteps: [
      { step: '01', title: 'Acil Çağrı & Şantiye Konumu', desc: 'Telefon veya WhatsApp üzerinden arıza belirtileri ve GPS konumu alınır.' },
      { step: '02', title: 'Mobil Ekip Sevkiyatı', desc: 'En yakın mobil servis aracı gerekli yedek parça ve takımlarla şantiyeye sevk edilir.' },
      { step: '03', title: 'Sahada Teşhis & Onarım', desc: 'Arıza tespit cihazı ve basınç manometreleriyle sorun belirlenip yerinde giderilir.' },
      { step: '04', title: 'Yük Testi & Teslimat', desc: 'Makine çalışma şartlarında test edilip resmi servis formu ile operatöre teslim edilir.' }
    ],
    commonIssues: [
      'Yük altında makinenin bayılması ve hidrolik basınç düşüklüğü',
      'Yürüyüş motorlarında çekiş düşüklüğü veya palet kilitlenmesi',
      'Dönüş kulesinde boşluk, vuruntu veya frenleme kaçırması',
      'Aşırı motor harareti, yağ yakma veya siyah duman atma'
    ],
    faqs: [
      {
        q: 'Türkiye geneli şantiyelere servis aracınız geliyor mu?',
        a: 'Evet, MESA İş Makinaları mobil teknik servis araçları ile Türkiye genelindeki inşaat, maden ve baraj şantiyelerine yerinde servis hizmeti sağlamaktadır.'
      },
      {
        q: 'Hangi marka iş makinelerine servis veriyorsunuz?',
        a: 'Caterpillar, Komatsu, JCB, Hidromek, Volvo, Hitachi, Liebherr, Doosan ve Hyundai başta olmak üzere tüm lider markalara teknik servis hizmeti veriyoruz.'
      }
    ]
  },
  {
    id: 'mobil-teknik-servis',
    slug: 'mobil-teknik-servis',
    title: '7/24 Mobil Teknik Servis & Yerinde Müdahale',
    shortDesc: 'Tam donanımlı mobil servis araçları, seyyar hidrolik hortum presi ve arıza tespit cihazlarıyla şantiyede yerinde acil tamir.',
    icon: 'Truck',
    category: 'Mobil Servis',
    duration: 'Acil Çağrı / 30-90 Dk',
    warranty: '12 Ay Servis Güvencesi',
    heroImage: '/images/mesa-workshop.png',
    content: `İş makinası arızalandığında makineyi atölyeye taşımak yüksek nakliye maliyeti ve ciddi iş kaybı demektir. MESA Mobil Teknik Servis birimi; jeneratör, kompresör, seyyar kaynak makinesi, hidrolik hortum presi ve arıza tespit cihazlarıyla donatılmış araçlarıyla tam bir seyyar atölye gibi şantiyenize gelir.

Hidrolik patlak hortum değişimi, kumanda valfi kaçakları, marş ve şarj dinamosu arızaları, enjektör problemleri ve yürüyüş takımı onarımları sahada anında çözülür.`,
    highlights: [
      'Şantiye sahasına doğrudan sevk edilen tam teşekküllü mobil atölye araçları',
      'Yerinde 1/4" - 2" 4 telli yüksek basınç hidrolik hortum presleme imkanı',
      'Seyyar gazaltı kaynak ve şasi çatlak onarım donanımı',
      'Dijital arıza tespit cihazı ile yerinde hata kodu okuma ve silme',
      '7 gün 24 saat kesintisiz acil şantiye nöbetçi teknisyen hattı'
    ],
    technicalSpecs: [
      { label: 'Araç Donanımı', value: 'Dizel Jeneratör + Kompresör + Kaynak + Pres' },
      { label: 'Hortum Pres Basıncı', value: '500 Bar Tepe Sıkma Kapasitesi' },
      { label: 'Hizmet Kapsamı', value: 'Şantiye, Taş Ocağı, Maden ve Yol Projeleri' },
      { label: 'Çalışma Saatleri', value: '7 Gün 24 Saat Kesintisiz Acil Müdahale' }
    ],
    processSteps: [
      { step: '01', title: 'Bildirim & GPS Paylaşımı', desc: 'Operatör veya şantiye şefi konumu WhatsApp veya çağrı merkezimize iletir.' },
      { step: '02', title: 'Hazırlık & Parça Temini', desc: 'Arıza tipine uygun OEM filtre, conta, hortum ve takımlar araca yüklenir.' },
      { step: '03', title: 'Yerinde Hızlı Müdahale', desc: 'Teknisyenlerimiz şantiye güvenliğini alarak arızayı yerinde onarır.' },
      { step: '04', title: 'Saha Testi ve Tutanak', desc: 'Makine operatör gözetiminde denenir ve servis raporu düzenlenir.' }
    ],
    commonIssues: [
      'Basınç altında patlayan hidrolik hortumlar nedeniyle işin durması',
      'Marş basmama veya elektriksel sigorta atması kaynaklı kilitlenmeler',
      'Mazot filtresi tıkanması ve common rail yakıt hattı basınç düşüklüğü',
      'Bom ve arm pimlerinin sıkışması veya yağsızlıktan sarma yapması'
    ],
    faqs: [
      {
        q: 'Mobil servis şantiyede hangi işlemleri yapabilir?',
        a: 'Hidrolik hortum presleme, valf ve silindir sızdırmazlık onarımı, arıza tespit ve elektriksel onarımlar, filtre ve yağ değişimleri, cer motoru mekanik kontrolleri sahada yapılabilir.'
      },
      {
        q: 'Mobil servis çağırmak için ne yapmalıyım?',
        a: '0533 529 36 74 numaralı acil hattımızı arayabilir veya sitemiz üzerinden WhatsApp ile şantiye GPS konumunuzu gönderebilirsiniz.'
      }
    ]
  },
  {
    id: 'hidrolik-servis',
    slug: 'hidrolik-servis',
    title: 'İş Makinası Hidrolik Servisi & Sistem Onarımı',
    shortDesc: '450 Bar dinamik test tezgahı ile ana hidrolik pompa, kumanda valfi, hidromotor ve kule dönüş hidrolik sistem revizyonu.',
    icon: 'Activity',
    category: 'Hidrolik Sistemler',
    duration: '1 - 2 Gün',
    warranty: '12 Ay Resmi Test Garantisi',
    heroImage: '/images/mesa-workshop.png',
    content: `Ağır iş makinelerinde gücün kaynağı hidrolik sistemlerdir. MESA Hidrolik Servis Merkezi, Kawasaki, Bosch Rexroth, Parker, Sauer Danfoss, Eaton ve Komatsu marka eğik plakalı pistonlu pompaların komple revizyonunu gerçekleştirir.

Rotary grup, piston pabucu, dağıtıcı plaka ve şaft yenilemeleri sonrası pompalar 450 Bar dinamik test standımızda yük altında test edilir. İç drenaj kaçakları, debi kararlılığı ve basınç tepkileri bilgisayar çıktısıyla belgelenir.`,
    highlights: [
      '450 Bar tepe basınç kapasiteli bilgisayarlı hidrolik test standı',
      'Kawasaki K3V/K5V, Bosch Rexroth A8VO/A10VO ana pompa revizyonu',
      'Oransal kumanda valf blokları honlama ve spool taşlama',
      'Kule dönüş ve yürüyüş hidromotorları tork ve basınç kalibrasyonu',
      'Lazer partikül sayacı ile hidrolik yağ kirlilik analizi (ISO 4406)'
    ],
    technicalSpecs: [
      { label: 'Test Basıncı Kapasitesi', value: '450 Bar Tepe / 380 Bar Sürekli Yük' },
      { label: 'Debi Ölçüm Aralığı', value: '0 - 550 Litre / Dakika Dijital Flowmetre' },
      { label: 'Tolerans Hassasiyeti', value: '±0.002 mm Mikron Yüzey Pürüzlülüğü' },
      { label: 'Raporlama', value: 'Bilgisayarlı Basınç & Akış Grafik Sertifikası' }
    ],
    processSteps: [
      { step: '01', title: 'Basınç Düşüşü Ölçümü', desc: 'Makinadaki pilot, ana pompa ve sinyal basınçları dijital manometre ile ölçülür.' },
      { step: '02', title: 'Hassas Demontaj & İnceleme', desc: 'Pompa parçalanarak kavitasyon, çizik ve aşınmalar mikrometreyle tespit edilir.' },
      { step: '03', title: 'Rotary Grup & Plaka Değişimi', desc: 'Orijinal OEM toleranslı pistonlar, yaylar ve plaka takımları monte edilir.' },
      { step: '04', title: 'Dinamik Tezgah Testi', desc: '450 Bar basınçta sıcak yağ altında debi verimi test edilip onaylanır.' }
    ],
    commonIssues: [
      'Yağ ısındıkça makinenin yavaşlaması ve kova kaldırma gücünün düşmesi',
      'Hidrolik pompadan gelen uğultu, vuruntu ve kavitasyon sesleri',
      'Kumanda kolları bırakıldığında bomun kendi kendine aşağı süzülmesi',
      'Hidrolik filtrenin bronz veya çelik talaş parçalarıyla dolması'
    ],
    faqs: [
      {
        q: 'Hidrolik pompa revizyonu sonrası test raporu veriliyor mu?',
        a: 'Evet, atölyemizde revize edilen tüm hidrolik pompalar 450 bar dinamik test standında test edilir ve basınç-debi değerlerini gösteren onaylı test sertifikası ile teslim edilir.'
      }
    ]
  },
  {
    id: 'hidrolik-silindir-tamiri',
    slug: 'hidrolik-silindir-tamiri',
    title: 'Hidrolik Silindir Tamiri & Honlama Servisi',
    shortDesc: 'Bom, arm, kova, teleskopik uzatma ve direksiyon silindirleri için rod taşlama, boğaz keçesi yenileme ve honlama onarımı.',
    icon: 'Layers',
    category: 'Hidrolik Sistemler',
    duration: 'Aynı Gün / 24 Saat',
    warranty: '12 Ay Sızdırmazlık Garantisi',
    heroImage: '/images/mesa-workshop.png',
    content: `Ekskavatör bom silindirleri, loder kova pistonları ve teleskopik yükleyici bom pistonları şantiye ortamında darbe, taş çarpması ve toz nedeniyle rod çizilmeleri ve keçe aşınmalarına maruz kalır.

MESA Hidrolik Silindir Servisimizde, 4 metre boya kadar silindir boruları seyyar ve sabit honlama tezgahlarımızda işlenir. Eğrilmiş kromlu miller doğrultulur veya sert krom kaplı yeni millerle değiştirilir. Ağır hizmet poliüretan ve PTFE keçe setleri monte edilerek sıfır kaçak garantisi sağlanır.`,
    highlights: [
      'Bom, arm, kova, dozer bıçak ve kule kilit silindirleri revizyonu',
      '4 metreye kadar hidrolik boru içi derin delik honlama işlemi',
      'Sert krom kaplı indüksiyonlu mil değişimi ve doğrultma presi',
      'Hallite, Kastas ve Parker yüksek basınç sızdırmazlık keçe takımları',
      '350 Bar statik basınç altında sızdırmazlık kaçak kontrol testi'
    ],
    technicalSpecs: [
      { label: 'İşleme Çapı', value: 'Ø 40 mm - Ø 450 mm İç Çap Silindirler' },
      { label: 'Maksimum Silindir Boyu', value: '4.500 mm (4.5 Metre) Tek Parça' },
      { label: 'Mil Doğrultma Presi', value: '150 Ton Hidrolik Hassas Doğrultma' },
      { label: 'Statik Test Basıncı', value: '350 Bar Hidrolik Holding Testi' }
    ],
    processSteps: [
      { step: '01', title: 'Demontaj & Çizik Kontrolü', desc: 'Silindir kovanı ve mili sökülerek derin çizik ve ovallik ölçülür.' },
      { step: '02', title: 'Honlama & Mil Taşlama', desc: 'Kovan içi taşlanıp honlanır, mildeki çapaklar ve eğrilikler giderilir.' },
      { step: '03', title: 'Boğaz & Piston Keçesi Montajı', desc: 'Sıcaklığa ve yüksek basınca dayanıklı viton/PTFE keçeler takılır.' },
      { step: '04', title: '350 Bar Basınç Testi', desc: 'Piston her iki yöne hareket ettirilip 350 bar altında sızdırmazlık onaylanır.' }
    ],
    commonIssues: [
      'Silindir boğazından dışarıya yağ fışkırması ve toz keçesinin yırtılması',
      'Piston içi kaçak nedeniyle bomun yükteyken aşağı kaçırması (drift)',
      'Taş sekmesi sonucu kromlu mil üzerinde çentik ve vuruk oluşması',
      'Silindir kovanının aşırı basınç altında şişme yapması'
    ],
    faqs: [
      {
        q: 'Çizilen silindir mili tamir edilir mi yoksa değişmesi mi gerekir?',
        a: 'Hafif çizikler polisaj ile giderilebilir. Ancak derin taş yaralarında keçenin tekrar kesilmemesi için mil orijinal indüksiyonlu sert krom mil ile yenilenir.'
      }
    ]
  },
  {
    id: 'is-makinasi-ariza-tespiti',
    slug: 'is-makinasi-ariza-tespiti',
    title: 'İş Makinası Arıza Tespiti & Diagnostik',
    shortDesc: 'CAT ET, JCB ServiceMaster, Cummins Insite ve Volvo Tech Tool ile elektronik kontrol ünitesi (ECU) teşhisi ve arıza kodu çözümü.',
    icon: 'Cpu',
    category: 'Diagnostik & Beyin',
    duration: '1 - 3 Saat',
    warranty: 'Doğru Teşhis Garantisi',
    heroImage: '/images/mesa-excavator-hero.png',
    content: `Modern iş makineleri karmaşık CAN-bus elektronik ağları ve dijital kontrol üniteleriyle yönetilir. Gereksiz parça değişimlerini önlemenin tek yolu doğru elektronik diagnostiktir.

MESA uzman teknisyenleri; Caterpillar Electronic Technician (ET), JCB ServiceMaster, Volvo Tech Tool, Hidromek H-Diag ve Cummins Insite orijinal teşhis cihazları ile makinenize bağlanır. Sensör canlı verileri, enjektör dengeleme testleri, DPF/SCR emisyon parametreleri ve hidrolik solenoid basınç kalibrasyonları şantiyede eksiksiz yapılır.`,
    highlights: [
      'Caterpillar, Komatsu, Volvo, JCB, Hidromek OEM arıza tespit cihazları',
      'Motor ECU, hidrolik pompa kontrol ünitesi ve şanzıman beyni teşhisi',
      'Enjektör kesme, sıkıştırma (kompresyon) ve turbo basınç canlı testleri',
      'DPF rejenerasyonu, AdBlue/SCR nox sensörü kalibrasyonu',
      'Geçmiş arıza kodları (DTC) dökümü ve teknik servis raporu teslimi'
    ],
    technicalSpecs: [
      { label: 'Desteklenen Protokoller', value: 'J1939, J1708, CAN 2.0B, ISO 9141' },
      { label: 'Donanım Portları', value: '9-Pin, 14-Pin, OBD2 ve Özel Üretici Soketleri' },
      { label: 'Kalibrasyon Yetkisi', value: 'Oransal Valf, Gaz Kelebeği, Basınç Sensörleri' },
      { label: 'Rapor Çıktısı', value: 'Elektronik PDF Diagnostik Sağlık Raporu' }
    ],
    processSteps: [
      { step: '01', title: 'Diagnostik Soket Bağlantısı', desc: 'Makinenin ana veri yoluna orijinal ara yüz cihazı ile bağlanılır.' },
      { step: '02', title: 'Hata Kodlarının (DTC) Taranması', desc: 'Aktif ve kayıtlı arıza kodları okunarak kök neden analiz edilir.' },
      { step: '03', title: 'Canlı Veri & Aktif Testler', desc: 'Motor ve hidrolik sistem yük altındayken sensör voltajları izlenir.' },
      { step: '04', title: 'Kalibrasyon & Raporlama', desc: 'Sensör kalibrasyonları yapılıp arıza tespit raporu teslim edilir.' }
    ],
    commonIssues: [
      'Ekranda beliren uyarı lambaları ve makinenin koruma moduna (limp mode) geçmesi',
      'DPF filtresinin dolması ve motorun devir almaması',
      'Gaz potansiyometresi ve oransal solenoid valf elektriksel iletişim kopuklukları',
      'CAN-bus hattı kopması sonucu gösterge panelinin yanıt vermemesi'
    ],
    faqs: [
      {
        q: 'Arıza tespit cihazı şantiyeye getirilebilir mi?',
        a: 'Evet, tüm mobil servis araçlarımızda endüstriyel dayanıklı diagnostik tabletleri ve üretici kablo soketleri mevcuttur.'
      }
    ]
  },
  {
    id: 'is-makinasi-bakim',
    slug: 'is-makinasi-bakim',
    title: 'İş Makinası Periyodik Bakım ve Onarım',
    shortDesc: '250, 500, 1000 ve 2000 saatlik ağır hizmet şantiye bakım paketleri. OEM filtre, onaylı yağlar ve 150 nokta ekspertiz kontrolü.',
    icon: 'CheckCircle2',
    category: 'Periyodik Bakım',
    duration: '3 - 6 Saat',
    warranty: 'Resmi Servis Kayıtlı',
    heroImage: '/images/mesa-excavator-hero.png',
    content: `Ağır iş makinelerinin arızalanmasını önlemenin ve ikinci el değerini korumanın en ekonomik yolu düzenli periyodik bakımdır. MESA İş Makinaları, şantiyenizin çalışma temposunu aksatmadan mesai dışı veya vardiya aralarında periyodik bakım hizmeti sunar.

Motor yağı, hidrolik sistem yağı, şanzıman ve cer dişlisi yağları üretici OEM onaylı viskozitelerle yenilenir. Donaldson, Baldwin ve Mann marka ağır hizmet hava, yakıt, su ayırıcı ve hidrolik filtreleri takılır. 150 nokta kontrol formuyla makinenin tüm aşınmaları önceden raporlanır.`,
    highlights: [
      '250, 500, 1000 ve 2000 saatlik OEM üretici bakım protokolleri',
      'Donaldson, Mann ve Fleetguard orijinal ağır hizmet filtre kitleri',
      'CAT HYDO, Shell Tellus, Mobil Delvac onaylı ağır şantiye yağları',
      '150 nokta mekanik, hidrolik ve elektriksel güvenlik kontrol listesi',
      'Kullanılmış yağ analizi ile aşınma elementi (demir, bakır, krom) tespiti'
    ],
    technicalSpecs: [
      { label: 'Yağ Değişim Ekipmanı', value: 'Havalı Dağıtım & Vakumlu Atık Yağ Emiş Tankı' },
      { label: 'Filtre Standardı', value: 'OEM Mikron Spesifikasyonlu Ağır Hizmet Filtreleri' },
      { label: 'Gresleme', value: 'Aşırı Basınç (EP2 / MoS2) Molibden Katkılı Gres' },
      { label: 'Kayıt Sistemi', value: 'Dijital QR Makina Kimlik Kartı & Servis Karnesi' }
    ],
    processSteps: [
      { step: '01', title: 'Çalışma Saati & Geçmiş Kontrolü', desc: 'Makinenin saati ve son bakım geçmişi incelenerek paket belirlenir.' },
      { step: '02', title: 'Yağ ve Filtre Değişimi', desc: 'Sıcak yağ vakumla tahliye edilir, OEM filtreler tork anahtarıyla takılır.' },
      { step: '03', title: '150 Nokta Mekanik Kontrol', desc: 'Pim boşlukları, palet gerginliği, hortum sürtünmeleri ve şasi taranır.' },
      { step: '04', title: 'Test & Dijital Servis Kaydı', desc: 'Sızıntı kontrolü yapılıp dijital makine kimliğine bakım işlenir.' }
    ],
    commonIssues: [
      'Zamanında değişmeyen mazot filtresi nedeniyle yüksek basınç pompa arızası',
      'Hava filtresi yırtılması sonucu motorun toz emmesi ve rektifiye gerektirmesi',
      'Kirli hidrolik yağın ana pompa distribütör aynasını çizmesi',
      'Yetersiz gresleme nedeniyle kova ve bom burçlarının aşınarak ovallik yapması'
    ],
    faqs: [
      {
        q: 'Periyodik bakımlar şantiyede mi yapılıyor?',
        a: 'Evet, mobil servis araçlarımız atık yağ emiş tankları ve havalı yağ dağıtıcıları ile çevreye tek damla atık bırakmadan şantiyenizde bakımı tamamlar.'
      }
    ]
  },
  {
    id: 'teleskopik-yukleyici-servisi',
    slug: 'teleskopik-yukleyici-servisi',
    title: 'Teleskopik Yükleyici (Telehandler) Servisi',
    shortDesc: 'Manitou, Merlo, JCB Loadall, Dieci ve Bobcat teleskopik yükleyiciler için bom uzatma zincirleri, moment limitör ve hidrolik revizyon.',
    icon: 'PenTool',
    category: 'Teleskopik Yükleyici',
    duration: '1 - 2 Gün',
    warranty: '12 Ay Garanti',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    content: `Şantiyelerin vazgeçilmezi olan teleskopik yükleyiciler (telehandler), yüksek irtifada ağır yük kaldırdıkları için güvenlik sistemleri kusursuz çalışmalıdır. MESA İş Makinaları; Manitou MT/MLT, JCB Loadall 535/540, Merlo Panoramic/Roto ve Dieci makinelerin uzman servis merkezidir.

İç içe geçen bom teleskop kızak pabuçları (aşınma takozları), bom uzatma ve geri çekme zincirleri, oransal joystick kumandaları ve devrilme önleyici moment kontrol (LMI) sensörleri fabrika toleranslarında kalibre edilir.`,
    highlights: [
      'Manitou, JCB Loadall, Merlo, Dieci ve Bobcat telehandler uzmanlığı',
      'Teleskopik bom uzatma ve toplama zincirleri gerdirme ve değişimi',
      'Bom içi aşınma kızak pabuçları (kayar pad) ayarı ve değişimi',
      'Yük moment limitörü (LMI) ve aks açısı sensör kalibrasyonu',
      '4 tekerlek yönlendirme (yengeç yürüyüşü) hidrolik silindir senkronizasyonu'
    ],
    technicalSpecs: [
      { label: 'Ulaşma Yüksekliği', value: '6 Metre - 30 Metre Döner Kuleli Modeller' },
      { label: 'Kaldırma Kapasitesi', value: '2.5 Ton - 7 Ton Arası Ağır Telehandlerlar' },
      { label: 'Güvenlik Doğrulaması', value: 'EN 15000 Yük Momenti Güvenlik Standartları' },
      { label: 'Zincir Testi', value: 'Ultrasonik Çatlak & Uzama Mikrometre Kontrolü' }
    ],
    processSteps: [
      { step: '01', title: 'Bom & Zincir Muayenesi', desc: 'Bom zincir baklalarında uzama, çatlak ve kızak boşlukları incelenir.' },
      { step: '02', title: 'Aşınma Pabuçları Ayarı', desc: 'Bom bölümleri arasındaki boşluklar ayar şimleri ile sıfırlanır.' },
      { step: '03', title: 'Hidrolik Kilit Valfi Testi', desc: 'Hortum patlama güvenlik valfleri yük altında test edilir.' },
      { step: '04', title: 'Ağırlıklı Yük Kalibrasyonu', desc: 'Standart ağırlıklarla moment limitörü emniyet testinden geçirilir.' }
    ],
    commonIssues: [
      'Bom uzatıldığında takılma, titreme veya geri toplarken zorlanma',
      'Moment limitörünün boş makinede bile arıza verip hidroliği kilitlemesi',
      'Direksiyon modları (ön, dört teker, yengeç) arasında tekerleklerin hizadan çıkması',
      'Bom içi hidrolik hortum makarası yayının kırılması sonucu hortum ezilmesi'
    ],
    faqs: [
      {
        q: 'Telehandler bom zincirleri ne sıklıkla kontrol edilmelidir?',
        a: 'Şantiye güvenliği açısından bom zincirleri her 250 saatte bir gözle, her 1000 saatte bir mikrometrik uzama kontrolü ile denetlenmeli ve özel zincir spreyi ile yağlanmalıdır.'
      }
    ]
  },
  {
    id: 'forklift-servisi',
    slug: 'forklift-servisi',
    title: 'Endüstriyel Forklift Servisi & Bakım Onarım',
    shortDesc: 'Dizel, lpg ve elektrikli akülü forkliftler için asansör zinciri, cer motoru, tork konvertör şanzıman ve hidrolik valf revizyonu.',
    icon: 'PenTool',
    category: 'Forklift & Depo',
    duration: 'Aynı Gün / 24 Saat',
    warranty: '12 Ay Garanti',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    content: `Fabrika, antrepo, liman ve lojistik merkezlerin yük taşıma operasyonlarında forkliftlerin durması sevkiyatı felç eder. MESA İş Makinaları; Linde, Toyota, Clark, Komatsu, Hyster, Yale, Jungheinrich ve Heli marka forkliftlerin tüm mekanik, hidrolik ve yürüyüş aksamlarına yerinde servis sağlar.

Dubleks ve tripleks asansör mast rulmanları, asansör kaldırma zincirleri, tilt silindirleri sızdırmazlığı, tork konvertör revizyonu ve dingil bilyaları fabrika toleranslarında yenilenir.`,
    highlights: [
      'Dizel, LPG ve Akülü elektrikli forklift mekanik ve hidrolik servisi',
      'Tripleks/Dubleks asansör mast rulmanları ve kaldırma zinciri değişimi',
      'Tilt ve kaydırma (side-shift) ataşman hidrolik silindir tamiri',
      'Otomatik şanzıman, debriyaj plakaları ve diferansiyel revizyonu',
      'Arka yönlendirme dingili mafsal burçları ve rot başı boşluk giderme'
    ],
    technicalSpecs: [
      { label: 'Kaldırma Kapasitesi', value: '1.5 Ton - 16 Ton Ağır Hizmet Forkliftleri' },
      { label: 'Asansör Tipleri', value: 'Standart Dubleks, Serbest Kaldırma, Tripleks Mast' },
      { label: 'Tahrik Sistemleri', value: 'Dizel Motor, LPG Yakıt, AC Elektrik Çekiş Motorları' },
      { label: 'Fren Sistemi', value: 'Yağ Banyolu Çoklu Disk Fren & Kuru Kampana' }
    ],
    processSteps: [
      { step: '01', title: 'İşletme Yerinde Ekspertiz', desc: 'Mobil aracımız fabrikanıza gelerek asansör, fren ve hidroliği test eder.' },
      { step: '02', title: 'Sızıntı ve Güvenlik Onarımı', desc: 'Asansör keçeleri, zincir gergisi ve fren pabuçları yerinde yenilenir.' },
      { step: '03', title: 'Şanzıman ve Tork Ayarı', desc: 'Vites geçişleri, yön kontrol solenoidleri ve yürüyüş torku kalibre edilir.' },
      { step: '04', title: 'Yük Kaldırma Güvenlik Testi', desc: 'Nominal tonajda yük kaldırılarak basınca ve fren tutuşuna onay verilir.' }
    ],
    commonIssues: [
      'Forkliftin yük altındayken çatalları aşağı kaçırması veya yavaş kaldırması',
      'İleri-geri vites geçişlerinde vuruntu veya yürüyüşte çekiş düşüklüğü',
      'Arka tekerleklerin aşırı boşluk yapması ve virajda savurma hissi vermesi',
      'Asansör rulmanlarının dağılması sonucu mastın kasıntı yaparak inmemesi'
    ],
    faqs: [
      {
        q: 'Forklift bakımını fabrikamızda yerinde yapıyor musunuz?',
        a: 'Evet, forkliftlerin periyodik bakımı, filtre/yağ değişimleri ve hafif mekanik onarımları işletmenizin sahasında 2-4 saat içinde tamamlanmaktadır.'
      }
    ]
  },
  {
    id: 'ekskavator-servisi',
    slug: 'ekskavator-servisi',
    title: 'Ekskavatör Servisi & Ağır Saha Tamiri',
    shortDesc: 'Paletli ve lastikli ekskavatörler için ana pompa, cer motoru, kule dönüş redüktörü, bom çatlak kaynağı ve seyyar borwerk.',
    icon: 'Wrench',
    category: 'Ekskavatör',
    duration: '1 - 3 Gün',
    warranty: '12 Ay / 2.000 Saat Garanti',
    heroImage: '/images/mesa-excavator-hero.png',
    content: `Şantiyelerin en ağır yükünü taşıyan paletli ve lastikli ekskavatörler, zorlu kaya ve hafriyat şartlarında yüksek dayanıklılık gerektirir. MESA Ekskavatör Servis Departmanı; Caterpillar 320/336, Komatsu PC200/PC390, Hidromek HMK220/HMK300, Volvo EC210/EC380 ve Hitachi Zaxis ekskavatörlerde derin uzmanlığa sahiptir.

Kule dönüş bilyaları, cer redüktör dişlileri, bom-arm çatlaklarının gazaltı kaynakla takviyesi, seyyar borwerk delik işleme tezgahıyla ovalleşen pim yuvalarının honlanması ve ana hidrolik dağıtıcı revizyonu garantili olarak yapılır.`,
    highlights: [
      '14 tondan 70 tona kadar paletli ve lastikli ekskavatör tamiri',
      'Kule dönüş şanzımanı, fren grubu ve cer yürüyüş motoru revizyonu',
      'Seyyar borwerk tezgahıyla şantiyede kova, bom ve arm delik revizyonu',
      'Bom ve arm üzerinde oluşan metal yorgunluğu çatlaklarının sertifikalı onarımı',
      'Kawasaki ve Komatsu ana hidrolik pompa debi ve basınç kalibrasyonu'
    ],
    technicalSpecs: [
      { label: 'Ekskavatör Sınıfları', value: 'Mini (3.5T), Standart (22T-35T), Ağır Maden (50T-90T)' },
      { label: 'Delik İşleme Kapasitesi', value: 'Ø 45 mm - Ø 250 mm Seyyar Borwerk Barası' },
      { label: 'Kaynak Prosedürü', value: 'Ön Isıtmalı Gazaltı & Bazik Elektrot Gerilim Giderme' },
      { label: 'Palet Gergi Sistemi', value: 'Gresli Silindir & Yay Grubu Yenileme' }
    ],
    processSteps: [
      { step: '01', title: 'Sahada Hidrolik & Mekanik Teşhis', desc: 'Basınç manometreleri ve arıza tespit cihazıyla ekskavatör incelenir.' },
      { step: '02', title: 'Aşınma Ölçümü & Borwerk Hazırlığı', desc: 'Pim ovallikleri ve cer aşınmaları mikrometreyle ölçülür.' },
      { step: '03', title: 'Parça Revizyonu & Talaşlı İmalat', desc: 'Aşınan delikler seyyar borwerkle işlenip orijinal burçlar preslenir.' },
      { step: '04', title: 'Kazı Yükü Altında Doğrulama', desc: 'Makine şantiye hafriyatında tam yükte denenerek teslim edilir.' }
    ],
    commonIssues: [
      'Kova bağlantı pimlerinde aşırı boşluk ve kazı esnasında sarsıntı',
      'Tek taraf cer motorunun çekmemesi veya cer kapağından yağ akıtması',
      'Kule dönerken takılma, sürtünme sesi veya dururken salınım yapması',
      'Bom kaldırma ve arm toplama hareketlerinin eş zamanlı çalışmaması'
    ],
    faqs: [
      {
        q: 'Borwerk delik işleme şantiyede yerinde yapılabiliyor mu?',
        a: 'Evet, seyyar borwerk delik işleme tezgahlarımızı ve jeneratörlerimizi doğrudan şantiyenize getirerek bom, arm ve kova deliklerini yerinde sıfır toleransla işliyoruz.'
      }
    ]
  },
  {
    id: 'kepce-loader-servisi',
    slug: 'kepce-loader-servisi',
    title: 'Kepçe & Loder (Yükleyici) Servisi',
    shortDesc: 'Kazıcı yükleyici (bekoloder) ve lastikli loderler için tork konvertör, şanzıman, diferansiyel, bel kırma mafsalı ve fren revizyonu.',
    icon: 'PenTool',
    category: 'Yükleyici & Loder',
    duration: '1 - 2 Gün',
    warranty: '12 Ay Garanti',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    content: `İnşaatların belkemiği kazıcı yükleyiciler (bekoloder - JCB 3CX/4CX, Hidromek 102B/102S, CAT 428/432) ve taş ocaklarının lastikli loderleri (CAT 950/966, Komatsu WA380/WA470, Volvo L120/L220) ağır çekiş ve tork altında çalışır.

MESA Kepçe ve Loder Servisi; ZF ve Carraro powershift şanzıman revizyonu, aks ve diferansiyel ayna-mahruti ayarları, bel kırma orta mafsal rulman boşlukları, ıslak fren diskleri ve hidrostatik direksiyon sistemlerini orijinal toleranslarda yeniler.`,
    highlights: [
      'JCB 3CX/4CX, Hidromek 102B, CAT 428/432 bekoloder uzmanlığı',
      'CAT 950/966/980, Komatsu WA serisi ağır lastikli loder servisi',
      'ZF, Carraro, Turner powershift şanzıman ve tork konvertör revizyonu',
      'Loder bel kırma (artikülasyon) orta mafsal pim ve burç yenileme',
      'Yağ banyolu ıslak fren balataları ve diferansiyel kilit tamiri'
    ],
    technicalSpecs: [
      { label: 'Şanzıman Tipleri', value: 'Powershift, Autoshift ve Hidrostatik Şanzımanlar' },
      { label: 'Aks Markaları', value: 'Carraro, ZF, Dana Spicer ve Üretici Orijinal Akslar' },
      { label: 'Fren Testi', value: 'Hidrolik Basınç & Eğimde Kaydırmazlık Testi' },
      { label: 'Bel Kırma Boşluğu', value: 'Lazer Doğrultma & Seyyar Borwerk Revizyonu' }
    ],
    processSteps: [
      { step: '01', title: 'Sürüş & Çekiş Testi', desc: 'Vites geçişleri, tork bayılması ve fren tutuşu test edilir.' },
      { step: '02', title: 'Şanzıman Basınç Ölçümü', desc: 'Kavrama ve konvertör çalışma basınçları manometreyle ölçülür.' },
      { step: '03', title: 'Mekanik & Hidrolik Yenileme', desc: 'Aşınan diskler, keçeler ve mafsal rulmanları değiştirilir.' },
      { step: '04', title: 'Yükleme & Eğim Denemesi', desc: 'Kova tam doldurularak tork gücü ve vites geçişleri sahada onaylanır.' }
    ],
    commonIssues: [
      'Gaza basıldığında loderin yığılması ve tork konvertörünün kaçırması',
      'Bekoloder ileri-geri vitese geçerken sert vuruntu yapması',
      'Bel kırma mafsalının boşluk yapması sonucu direksiyon hakimiyetinin kaybolması',
      'Fren pedalının boşa düşmesi veya fren basıldığında tekerleklerin kilitlenip kalması'
    ],
    faqs: [
      {
        q: 'Bekoloder şanzıman revizyonu ne kadar sürer?',
        a: 'Powershift şanzıman sökümü, parça değişimi ve test standı denemeleri merkez atölyemizde ortalama 2-3 iş gününde tamamlanır.'
      }
    ]
  }
];
