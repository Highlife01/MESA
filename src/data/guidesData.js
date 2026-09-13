export const guidesData = [
  {
    id: 'hidrolik-yag-kirliligi-ve-pompa-omru',
    slug: 'hidrolik-yag-kirliligi-ve-pompa-omru',
    title: 'İş Makinalarında Hidrolik Yağ Kirliliği ve Pompa Ömrünü Uzatma Rehberi (ISO 4406)',
    shortDesc: 'Hidrolik arızaların %75\'i yağ kirliliğinden kaynaklanır. ISO 4406 partikül temizlik kodları, filtreleme stratejileri ve şantiyede pompa koruma yöntemleri.',
    category: 'Hidrolik Bakım',
    readTime: '6 Dk Okuma',
    publishDate: 'Eylül 2026',
    author: 'Mesa Teknik Mühendislik Kurulu',
    heroImage: '/images/service-hydraulics.jpg',
    tags: ['Hidrolik Pompa', 'ISO 4406', 'Yağ Analizi', 'Kawasaki', 'Rexroth'],
    summary: 'Ağır iş makinelerinde hidrolik pompa, valf ve silindir revizyonlarının ana sebebi mekanik yorulma değil, mikroskobik yağ kirliliğidir. Bu rehberde şantiyelerde uygulanabilir koruyucu adımları sıralıyoruz.',
    content: [
      {
        sectionTitle: '1. Görünmeyen Tehlike: Mikron Seviyesinde Aşınma',
        text: 'İnsan gözü 40 mikrondan küçük parçacıkları göremez. Oysa modern değişken debili ekskavatör pompalarındaki (Kawasaki K3V veya Rexroth A8VO) piston pabucu ve silindir bloğu arasındaki çalışma toleransı sadece 3 ila 5 mikrondur. Şantiyede açık havada yapılan bir kova hortumu değişimi esnasında sisteme karışan toz zerrecikleri, saatte 2000 devir dönen pompanın ayna yüzeyini adeta zımparalar.'
      },
      {
        sectionTitle: '2. ISO 4406 Temizlik Standardı Nedir?',
        text: 'ISO 4406 kodu, 100 ml yağ örneğindeki 4µm, 6µm ve 14µm boyutlarındaki parçacık sayısını üçlü bir rakamla (Örn: 18/16/13) ifade eder. Fabrikadan yeni çıkan varil yağları bile genellikle 21/19/16 seviyesindedir ve iş makinasına doğrudan konulması tavsiye edilmez! Mesa İş Makinaları olarak şantiye dolumlarında yağları 3 mikronluk mikro-filtrasyon arabalarından geçirerek 16/14/11 seviyesine indiriyoruz.'
      },
      {
        sectionTitle: '3. Şantiye Sorumluları İçin 5 Altın Kural',
        checklist: [
          'Hortum patladığında rakor ağzını temiz bezle değil, plastik kör tapayla kapatın.',
          'Yeni hidrolik yağı varilden doğrudan makinaya doldurmayın; mutlaka filtreleme arabası kullanın.',
          'Dönüş filtresi indikatörü sarı/kırmızı sınıra geldiğinde bakım saatini beklemeden filtreyi değiştirin.',
          'Tank hava tahliye (breather) filtresini her 500 saatte bir yenileyin (tozların %60\'ı buradan girer).',
          'Her 1000 saatte bir akredite laboratuvara 100 ml SOS yağ numunesi göndererek metal oranlarını ölçtürün.'
        ]
      }
    ],
    relatedServiceSlug: 'hidrolik-sistem-tamiri'
  },
  {
    id: 'agir-is-makinasi-periyodik-bakim-cizelgesi',
    slug: 'agir-is-makinasi-periyodik-bakim-cizelgesi',
    title: 'Ağır İş Makinası Periyodik Bakım Çizelgesi: 250, 500, 1000 ve 2000 Saat Kontrolleri',
    shortDesc: 'CAT, Komatsu, Volvo ve Hidromek makineler için şantiye arıza riskini sıfıra indiren çalışma saatine göre kontrol listesi ve kritik tolerans değerleri.',
    category: 'Koruyucu Bakım',
    readTime: '8 Dk Okuma',
    publishDate: 'Eylül 2026',
    author: 'Mesa Saha Operasyon Birimi',
    heroImage: '/images/service-maintenance.jpg',
    tags: ['Periyodik Bakım', '250 Saat', '500 Saat', 'Filtre Değişimi', 'Gresleme'],
    summary: 'Planlı bakım maliyeti, şantiyede plansız duran bir makinenin yarattığı iş kaybının sadece %5\'i kadardır. İşte uzman teknisyenlerimizin uyguladığı saat kademeli bakım protokolü.',
    content: [
      {
        sectionTitle: '1. 250 Saatlik Rutin Şantiye Bakımı',
        text: 'Ağır şantiye şartlarında ilk kademe bakım, motorun can damarlarını korumayı amaçlar.',
        checklist: [
          'Motor yağı ve yağ filtresi değişimi (15W-40 CI-4 veya CK-4 onaylı)',
          'Yakıt su ayırıcı (sedimenter) ön filtre temizliği ve tahliyesi',
          'Bom, arm, kova ve dönüş kulesi bilyasının yüksek basınçlı greslenmesi',
          'Hava filtresi emiş tozu tahliye lastiğinin (dust valve) boşaltılması',
          'Palet gergi payı ve zincir sarkma mesafesinin kontrolü (25-35 mm tolerans)'
        ]
      },
      {
        sectionTitle: '2. 500 Saatlik Hidrolik ve Güç Aktarım Bakımı',
        text: 'Bu aşamada hidrolik emiş ve pilot basınç filtreleri kontrol edilir, şanzıman yağı seviyesi ve diferansiyel kilitleri test edilir.',
        checklist: [
          'Hidrolik pilot ve dönüş filtrelerinin değişimi',
          'Şanzıman ve cer redüktör yağ seviyesi kontrolleri',
          'Radyatör peteklerinin basınçlı hava ve özel kimyasalla yıkanması',
          'Akü voltajı ve alternatör şarj dinamosu akım ölçümü'
        ]
      },
      {
        sectionTitle: '3. 1000 ve 2000 Saatlik Ağır Revizyon Bakımı',
        text: 'Bu kademede hidrolik tank içindeki yağ tamamen analiz edilir; cer dişli yağları, şanzıman yağı ve diferansiyel sıvıları sıfırlanır, supap ayarları mikron mastarıyla yapılır.'
      }
    ],
    relatedServiceSlug: 'periyodik-bakim'
  },
  {
    id: 'dpf-ve-adblue-arizalarinin-onlenmesi',
    slug: 'dpf-ve-adblue-arizalarinin-onlenmesi',
    title: 'Dizel Partikül Filtresi (DPF) ve AdBlue (SCR) Arızalarının Önlenmesi: Şantiye Rehberi',
    shortDesc: 'Tier 4 Final ve Stage V makinelerde şantiyede işi durduran egzoz emisyon kilitlenmeleri, rejenerasyon süreçleri ve çözümleri.',
    category: 'Motor & Emisyon',
    readTime: '7 Dk Okuma',
    publishDate: 'Eylül 2026',
    author: 'Mesa Elektronik Teşhis Laboratuvarı',
    heroImage: '/images/service-diesel-engine.jpg',
    tags: ['DPF Rejenerasyon', 'AdBlue', 'SCR', 'Stage V', 'Tier 4'],
    summary: 'Yeni nesil iş makinelerinde en sık yaşanan duruşların başında DPF kurum doluluğu ve AdBlue kristalleşmesi gelir. Makine gücünün %40 oranında düşmesini (derate) önleme yöntemleri.',
    content: [
      {
        sectionTitle: '1. DPF Neden Şantiyede Tıkanır?',
        text: 'İş makinası düşük devirde rölantide uzun süre bekletildiğinde veya kısa aralıklarla dur-kalk çalıştırıldığında egzoz gazı sıcaklığı 350°C üzerine çıkamaz. Bu durumda otomatik pasif rejenerasyon gerçekleşemez ve bal peteği seramik gözenekler kurumla dolar.'
      },
      {
        sectionTitle: '2. Şantiyede Rejenerasyon İkazı Yandığında Ne Yapılmalı?',
        checklist: [
          'Göstergede sarı DPF ikazı belirdiğinde makineyi hemen stop etmeyin.',
          'Makineyi güvenli açık bir alana çekin ve el gazını yükselterek park rejenerasyonunu başlatın.',
          'Rejenerasyon sırasında egzoz çıkışında 600°C sıcak gaz oluşacağından yanıcı maddelerden uzak tutun.',
          'İşlemi yarıda kesmeyin; işlem ortalama 20-35 dakika içinde kendiliğinden tamamlanacaktır.'
        ]
      },
      {
        sectionTitle: '3. AdBlue Kristalleri ve Pompa Koruması',
        text: 'Kullanılan AdBlue sıvısının ISO 22241 standardında ve %32.5 üre oranında olması şarttır. Şantiyede açık bidonlarda bekletilen sıvılar toz alır veya su buharlaşarak kristalleşir. Bu kristaller AdBlue dozaj pompasını ve enjektörünü tıkar. Mesa servis araçlarımız sahada ultrasonik DPF temizleme ve dozaj pompa kalibrasyonu sağlamaktadır.'
      }
    ],
    relatedServiceSlug: 'motor-arizalari'
  },
  {
    id: 'kule-donus-rulmani-ve-cer-dislisi-asinma-olcum-rehberi',
    slug: 'kule-donus-rulmani-ve-cer-dislisi-asinma-olcum-rehberi',
    title: 'Paletli Ekskavatörlerde Kule Dönüş Rulmanı ve Cer Dişlisi Aşınma Ölçüm Rehberi',
    shortDesc: 'Kule boşluğu nasıl ölçülür? Çember dişli aşınma limitleri, eksenel salgı ölçümü ve ölümcül kazaları önleyen periyodik kontroller.',
    category: 'Mekanik & Yürüyüş',
    readTime: '5 Dk Okuma',
    publishDate: 'Eylül 2026',
    author: 'Mesa Mekanik Revizyon Atölyesi',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Kule Rulmanı', 'Cer Dişlisi', 'Ekskavatör', 'Komparatör', 'Boşluk Ölçümü'],
    summary: 'Kule dönüş bilyasındaki milimetrik bir aşınma, kepçe ucunda onlarca santimetrelik kontrolsüz salınıma neden olur. Kule boşluğunun şantiyede doğru ölçüm metodolojisi.',
    content: [
      {
        sectionTitle: '1. Kule Boşluğu Tehlikeli Boyutta mı?',
        text: 'Ekskavatör bomu havada ve kova boşken ileriye uzatılır; manyetik ayaklı dijital komparatör alt şasi ile üst kule arasına sıfırlanır. Ardından kepçe yere bastırılarak ön tekerler/paletler yerden 20 cm kaldırılır. Komparatördeki sapma 1.5 - 2.5 mm üzerine çıkmışsa kule bilyası derhal bakıma alınmalıdır.'
      },
      {
        sectionTitle: '2. Yağ Sızıntıları ve Floating Keçe Arızaları',
        text: 'Cer dişlisi göbeğinde iki adet taşlanmış metal halkadan oluşan "Floating Seal" bulunur. Bu keçenin arkasındaki kauçuk o-ringler taşlaşırsa cer yağı dışarı akar veya içeriye toz girer. Yağsız kalan planet dişliler yüksek tork altında kırılarak cer kutusunu tamamen patlatır.'
      }
    ],
    relatedServiceSlug: 'kule-donus-cer-revizyonu'
  },
  {
    id: 'is-makinasi-150-nokta-ekspertiz-rehberi',
    slug: 'is-makinasi-150-nokta-ekspertiz-rehberi',
    title: 'İkinci El İş Makinası Alımında 150 Nokta Ekspertiz ve Hidrolik Basınç Testi Önemi',
    shortDesc: 'İkinci el ekskavatör, loder ve bekoloder alırken nelere bakılmalı? Şasi çatlak kontrolü, pompa debisi ve karter üflemesi ölçüm kılavuzu.',
    category: 'Ekspertiz & Rapor',
    readTime: '9 Dk Okuma',
    publishDate: 'Eylül 2026',
    author: 'Mesa Baş Denetçi & Ekspertiz Ekibi',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ekspertiz', 'İkinci El', 'Hidrolik Basınç Testi', 'Şasi Çatlağı', 'Ekskavatör'],
    summary: 'İkinci el bir iş makinası satın alırken yapılacak 1 saatlik profesyonel ekspertiz, sizi 500.000 TL\'yi aşabilecek gizli revizyon masraflarından kurtarır.',
    content: [
      {
        sectionTitle: '1. Hidrolik Isınma Testi (Stall Test)',
        text: 'Makine soğukken her hidrolik hareket hızlı görünebilir. Gerçek performans, hidrolik yağ sıcaklığı 55°C üzerine çıktığında anlaşılır. Makine 30 dakika ağır yükte çalıştırılır; ana emniyet valfi basıncı ve silindir drenaj kaçakları manometreyle ölçülür. Isındığında yavaşlayan makinelerde pompa rotary grubu aşınmıştır.'
      },
      {
        sectionTitle: '2. Şasi ve Bom Ultrasonik Çatlak Muayenesi',
        text: 'Boya altında gizlenen kılcal gerilim çatlakları gözle görülemez. Mesa ekspertiz ekipleri, manyetik parçacık ve ultrasonik kalınlık ölçüm cihazlarıyla bom mafsal kulaklarını, arm kule bağlantılarını ve alt şasi X-kirişini tarar.'
      },
      {
        sectionTitle: '3. Elektronik Beyin (ECU) Çalışma Saati Doğrulaması',
        text: 'Gösterge panelindeki saat teli sökülmüş veya değiştirilmiş olabilir. Caterpillar ET, JCB ServiceMaster veya Komatsu diagnostic cihazlarımızla motor beyni, şanzıman beyni ve telematik modülündeki gerçek çalışma saatleri kıyaslanarak manipülasyon tespit edilir.'
      }
    ],
    relatedServiceSlug: 'is-makinasi-tamiri'
  },
  {
    id: 'santiyelerde-mevsimsel-yag-secimi-ve-isinma-nedenleri',
    slug: 'santiyelerde-mevsimsel-yag-secimi-ve-isinma-nedenleri',
    title: 'Şantiyelerde Kışlık ve Yazlık Yağ Seçimi: Viskozite İndeksleri ve Hidrolik Isınma Nedenleri',
    shortDesc: 'Adana ve Çukurova\'nın 45°C yaz sıcağında hidrolik sistemler neden kaynar? ISO VG 46 vs ISO VG 68 yağ farkı ve radyatör temizliği.',
    category: 'Sıvı & Yağlama',
    readTime: '6 Dk Okuma',
    publishDate: 'Eylül 2026',
    author: 'Mesa Teknik Kimya ve Yağlama Kurulu',
    heroImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hidrolik Yağ', 'ISO VG 46', 'ISO VG 68', 'Hararet', 'Yağ Soğutucu'],
    summary: 'Çukurova bölgesi yaz aylarında Türkiye\'nin en yüksek çevre sıcaklıklarına ulaşır. Doğru viskozitede hidrolik yağ kullanılmadığında pompalar kavitasyonla aşınır.',
    content: [
      {
        sectionTitle: '1. ISO VG 46 mı Yoksa ISO VG 68 mi?',
        text: 'Ilıman iklimlerde ve kış aylarında ISO VG 46 ideal akışkanlık sağlarken, Adana, Mersin, Hatay ve Osmaniye şantiyelerinde yaz aylarında çevre sıcaklığı 40°C\'yi aştığında yağ sıcaklığı 85°C\'ye yaklaşır. Bu sıcaklıkta VG 46 aşırı incelerek film mukavemetini kaybeder. Yaz aylarında yüksek viskozite indeksli ISO VG 68 hidrolik yağlara geçiş yapılması tavsiye edilir.'
      },
      {
        sectionTitle: '2. Yağ Soğutucu (Oil Cooler) Petek Temizliği',
        text: 'Şantiye tozu radyatör ve yağ soğutucu peteklerinin arasını adeta beton gibi tıkar. Basınçlı su petekleri yamultarak hava akışını bozar. Özel kimyasal solüsyonlar ve ters yönlü düşük basınçlı kuru hava ile temizlik yapılmalıdır.'
      }
    ],
    relatedServiceSlug: 'periyodik-bakim'
  }
];
