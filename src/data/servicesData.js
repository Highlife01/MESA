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
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
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
    shortDesc: 'Adana, Mersin, Hatay, Osmaniye, Niğde ve tüm Çukurova bölgesine 45 dakikada ulaşan, atölye donanımlı 18 mobil acil müdahale aracı.',
    icon: 'ShieldCheck',
    category: 'Mobil Servis',
    duration: '45 Dk Ortalama Varış',
    warranty: 'Yerinde Müdahale Garantisi',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    content: `Şantiyede duran her iş makinası, doğrudan proje gecikmesi ve yüksek finansal kayıp demektir. Mesa İş Makinaları 7/24 Gezici Mobil Servis Filosu; şantiyenizin bulunduğu lokasyona (maden sahası, taş ocağı, tünel, otoyol veya liman) en kısa sürede ulaşarak arızayı yerinde çözer.

Mobil servis araçlarımız sıradan bir arıza aracı değildir; araç içinde Kaeser vidalı dizel kompresör, Finn-Power mobil hidrolik hortum sıkma presi, jeneratörlü inverter gazaltı/ark kaynak makineleri, orijinal teşhis bilgisayarları ve zengin acil sarfiyat stoğu barındıran yürüyen bir atölyedir.`,
    highlights: [
      '18 adet tam donanımlı 4x4 ve panelvan mobil acil müdahale aracı',
      'Çukurova Bölgesi genelinde (Adana, Mersin, Hatay, Osmaniye) ortalama 45 dakika varış süresi',
      'Şantiye sahasında anında hidrolik hortum imalatı ve presleme imkanı',
      'Elektronik teşhis cihazlarıyla sahada ECU okuma, arıza kodu silme ve sensör kalibrasyonu',
      'Yerinde yağ değişimi, filtre yenileme ve numune alma (SOS Yağ Analizi)'
    ],
    technicalSpecs: [
      { label: 'Filo Büyüklüğü', value: '18 Donanımlı Mobil Servis Aracı' },
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
    heroImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
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
  }
];
