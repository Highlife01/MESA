export const faultCodesData = [
  // Caterpillar
  {
    id: 'cat-mid128-pid94',
    code: 'MID 128 PID 94 FMI 1',
    brand: 'Caterpillar (CAT)',
    system: 'Yakıt Enjeksiyon Sistemi',
    machine: 'CAT 320D / 330D / 336D',
    title: 'Yakıt Dağıtım Basıncı Düşük (Fuel Delivery Pressure Low)',
    severity: 'Kritik (Motor Koruma Modu)',
    description: 'Dizel yakıt besleme hattında basınç kritik eşiğin altına düşmüştür. ECM motor devrini ve torkunu sınırlar.',
    rootCauses: [
      'Ön yakıt filtresi veya su ayırıcı (sedimenter) aşırı kirli/tıkalı',
      'Besleme pompası (lift pump) mekanik veya elektrik arızası',
      'Yakıt emiş hattında hava alma veya depo emiş süzgecinde tıkanıklık',
      'Yakıt basınç sensörü soket oksitlenmesi veya kablo kopukluğu'
    ],
    fieldActions: [
      'Motoru rölantiye alın ve ön filtre su tahliye vanasını kontrol edin.',
      'El pompası (primer pump) ile yakıt sisteminin havasını alın.',
      'Basınç sensörü soketini temizleyin; düzelmezse filtre setini yenileyin.'
    ],
    recommendedParts: ['CAT Orijinal Yakıt Filtre Kiti (1R-0751 / 1R-0770)', 'Yakıt Basınç Sensörü'],
    estDowntime: '1 - 2 Saat',
    urgencyScore: 9
  },
  {
    id: 'cat-mid036-cid0164',
    code: 'MID 036 CID 0164 FMI 00',
    brand: 'Caterpillar (CAT)',
    system: 'HEUI / Enjeksiyon Kontrol Basıncı',
    machine: 'CAT 320D / 325D (C7 ACERT Motor)',
    title: 'Enjeksiyon Kontrol Basıncı (ICP) Çok Yüksek',
    severity: 'Kritik (Acil Müdahale)',
    description: 'HEUI hidrolik enjeksiyon kontrol basıncı izin verilen maksimum emniyet limitini aşmıştır.',
    rootCauses: [
      'IAPCV kontrol valfi sıkışmış veya oransal bobini yanmış',
      'Motor yağı viskozitesi yanlış veya yağ aşırı kirlenmiş/köpürmüş',
      'ICP yüksek basınç sensöründe referans voltaj kayması'
    ],
    fieldActions: [
      'Motoru derhal stop edin; yüksek basınç enjektör gövdelerini patlatabilir.',
      'Motor yağı seviyesini ve kalitesini kontrol edin.',
      'Mesa acil servis ekibini CAT ET teşhis cihazı ile çağırın.'
    ],
    recommendedParts: ['IAPCV Kontrol Valfi', 'ICP Basınç Sensörü', 'Mobil 15W-40 Motor Yağı'],
    estDowntime: '3 - 5 Saat',
    urgencyScore: 10
  },

  // Komatsu
  {
    id: 'komatsu-ca2249',
    code: 'CA2249 / DTC 2249',
    brand: 'Komatsu',
    system: 'Common-Rail Yüksek Basınç (HPCR)',
    machine: 'Komatsu PC200-8 / PC300-8 / PC390LC',
    title: 'Common Rail Basıncı Çok Düşük (Rail Pressure Drop)',
    severity: 'Kritik',
    description: 'Ortak yakıt yolu basıncı enjeksiyon talebini karşılayamıyor. Makine siyah duman atar ve bayılır.',
    rootCauses: [
      'Basınç tahliye emniyet valfi (Pressure Limiter) kaçırıyor',
      'Elektronik enjektörlerin aşırı miktarda kartere/depoya geri dönüş vermesi',
      'Besleme pompası SCV debi ayar valfi sıkışması'
    ],
    fieldActions: [
      'Enjektör geri dönüş hortumunu sökerek tek tek kaçak testi yapın.',
      'Basınç sınırlayıcı emniyet valfinin ısısını termal kamerayla ölçün.'
    ],
    recommendedParts: ['Komatsu HPCR Enjektör Takımı', 'Rail Basınç Emniyet Valfi'],
    estDowntime: '4 - 6 Saat',
    urgencyScore: 9
  },
  {
    id: 'komatsu-dafrkr',
    code: 'DAFRKR / E02',
    brand: 'Komatsu',
    system: 'CLSS Hidrolik Pompa Kontrolü',
    machine: 'Komatsu PC200-7 / PC220-8',
    title: 'Pompa EPC Selenoid Valf Devre Arızası',
    severity: 'Normal (Hız Düşüklüğü)',
    description: 'Ana hidrolik pompanın debisini ayarlayan EPC selenoid valfine sinyal gitmiyor; hidrolik hareketler yarı hızına düşer.',
    rootCauses: [
      'Pompa üzerindeki EPC selenoid bobin direnci kopuk (normal: 7-14 Ohm)',
      'Kabin altı kablo demetinde sürtünme sonucu şase/kopukluk',
      'Pompa kontrolörü çıkış transistörü arızası'
    ],
    fieldActions: [
      'Multimetre ile bobin soketinden iç direnci ölçün.',
      'Soketi söküp kontak spreyi ile temizleyin.'
    ],
    recommendedParts: ['Komatsu Oransal Pompa EPC Valfi', 'Sızdırmaz O-Ring Kiti'],
    estDowntime: '1 - 2 Saat',
    urgencyScore: 6
  },

  // JCB
  {
    id: 'jcb-dtc-2043',
    code: 'DTC 2043 / P0087',
    brand: 'JCB',
    system: 'JCB Dieselmax Yakıt Hattı',
    machine: 'JCB 3CX / 4CX Eco Kazıcı Yükleyici',
    title: 'Yakıt Dağıtım Yolu Basıncı Minimumun Altında',
    severity: 'Acil',
    description: 'JCB Dieselmax 444 motorda rail basıncı istenen seviyeye ulaşamıyor. Makine yük altında stop ediyor.',
    rootCauses: [
      'Ön filtre su ayırıcı haznesi su dolu veya donmuş',
      'Delphi yüksek basınç pompası transfer basıncı zayıf',
      'Depo havalandırma hortumu ezilmiş (depoda vakum oluşuyor)'
    ],
    fieldActions: [
      'Yakıt deposu kapağını açıp fısıltı sesi (vakum) olup olmadığını test edin.',
      'Ön filtreyi söküp su tahliyesi yapın ve pompayla havasını alın.'
    ],
    recommendedParts: ['JCB Orijinal Yakıt Filtre Elemanı (32/925915)', 'Delphi SCV Valfi'],
    estDowntime: '2 Saat',
    urgencyScore: 8
  },
  {
    id: 'jcb-dtc-3012',
    code: 'DTC 3012',
    brand: 'JCB',
    system: 'Powershift Şanzıman',
    machine: 'JCB 3CX / 4CX Autoshift',
    title: 'İleri / Geri Kavrama Basınç Uyarısı',
    severity: 'Acil (Şanzıman Koruma)',
    description: 'Şanzıman yön değiştirme selenoidi aktive olduğunda hidrolik basınç algılanamadı. Vites geçişi kilitlenir.',
    rootCauses: [
      'Şanzıman selenoid bloğu iç sızıntısı veya tıkanıklık',
      'Kavrama piston segmanı aşınması',
      'Şanzıman yağ filtresi tıkalı (basınç düşümü)'
    ],
    fieldActions: [
      'Şanzıman yağ seviyesini motor çalışırken sıcak olarak kontrol edin.',
      'Şanzıman filtresini söküp bronz talaş kontrolü yapın.'
    ],
    recommendedParts: ['JCB Şanzıman Filtresi (581/18076)', 'Powershift Selenoid Bobini'],
    estDowntime: '3 - 4 Saat',
    urgencyScore: 8
  },

  // Hidromek
  {
    id: 'hmk-e041',
    code: 'HMK E-041 / CAN FAIL',
    brand: 'Hidromek',
    system: 'Opera Kontrol Sistemi',
    machine: 'HMK 102B / 102S Alpha & Supra',
    title: 'Opera Kumanda Konsolu CAN-Bus Haberleşme Hatası',
    severity: 'Kritik',
    description: 'Operatör koltuğu joystick kumandaları ile ana araç kontrolörü (VCU) arasındaki veri hattı koptu.',
    rootCauses: [
      'Koltuk altı spiral kablo demetinde bükülme ve ezilme',
      'CAN-Bus 120 Ohm sonlandırma direncinin açık devre olması',
      'Kabin içi sigorta kutusunda VCU besleme rölesi temassızlığı'
    ],
    fieldActions: [
      'Koltuk altındaki sarı ve yeşil bükümlü CAN kablolarını gözle muayene edin.',
      'Kabin ana sigortalarını kontrol edin.'
    ],
    recommendedParts: ['Opera Joystick Kablo Demeti', '120 Ohm Sonlandırma Direnci'],
    estDowntime: '2 Saat',
    urgencyScore: 8
  },

  // Volvo
  {
    id: 'volvo-mid187-psid200',
    code: 'MID 187 PSID 200 FMI 9',
    brand: 'Volvo CE',
    system: 'V-ECU / Araç Kontrol Beyni',
    machine: 'Volvo EC210D / EC300D / L120F',
    title: 'Motor ECU ile V-ECU Arası Haberleşme Kesintisi',
    severity: 'Kritik',
    description: 'Volvo ana araç beyni (V-ECU), motor beyninden (E-ECU) J1939 veri paketlerini alamıyor.',
    rootCauses: [
      'J1939 omurga hattında oksitlenmiş ana soket bağlantısı',
      'E-ECU motor beyni güç besleme rölesi kontak yapışması',
      'Akü voltaj dalgalanması sonrası beynin kendini korumaya alması'
    ],
    fieldActions: [
      'Akü kutup başlarını söküp 5 dakika bekleyerek beyni resetleyin.',
      'Motor bölümündeki büyük gri 62 pinli soketi kontrol edin.'
    ],
    recommendedParts: ['Volvo Tech Tool Yazılım Kalibrasyonu', 'V-ECU Röle Seti'],
    estDowntime: '2 - 3 Saat',
    urgencyScore: 9
  }
];
