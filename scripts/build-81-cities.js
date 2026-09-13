import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 81 İl Listesi ve Coğrafi Eşleşmeler
const PROVINCES_RAW = [
  { plate: '01', name: 'Adana', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Çukurova tarım altyapısı, Ceyhan enerji koridoru ve Seyhan taş ocakları' },
  { plate: '02', name: 'Adıyaman', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'Deprem konutları inşaatı, petrol sondaj sahaları ve agrega ocakları' },
  { plate: '03', name: 'Afyonkarahisar', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'İscehisar mermer ocakları, termal altyapı ve yol kavşağı şantiyeleri' },
  { plate: '04', name: 'Ağrı', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Sınır lojistiği, karayolu viyadükleri ve zorlu kış şartları maden kazıları' },
  { plate: '05', name: 'Amasya', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Mermer işletmeleri, Yeşilırmak ıslahı ve karayolu tünel inşaatları' },
  { plate: '06', name: 'Ankara', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'OSTİM, İvedik ve Başkent OSB, kamu altyapı ve taş ocağı şantiyeleri' },
  { plate: '07', name: 'Antalya', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Mermer ocakları, turizm altyapı hafriyatları ve kıyı liman projeleri' },
  { plate: '08', name: 'Artvin', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Yusufeli ve Çoruh vadisi barajları, HES projeleri ve dağ tünelleri' },
  { plate: '09', name: 'Aydın', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'Jeotermal enerji şantiyeleri, maden ocakları ve otoyol viyadük inşaatları' },
  { plate: '10', name: 'Balıkesir', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Marmara Adası mermer ocakları, bor madenleri ve rüzgar santralleri' },
  { plate: '11', name: 'Bilecik', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Seramik kili madenleri, mermer ocakları ve hızlı tren tünel şantiyeleri' },
  { plate: '12', name: 'Bingöl', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Demir madeni işletmeleri, dağ yolu hafriyatları ve deprem konutları' },
  { plate: '13', name: 'Bitlis', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Pomza ve perlit ocakları, karayolu tünel ve köprü altyapı şantiyeleri' },
  { plate: '14', name: 'Bolu', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Otoyol tünel bakımları, orman işletme yolları ve çimento fabrikaları' },
  { plate: '15', name: 'Burdur', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Burdur beji mermer ocakları, agrega işletmeleri ve çimento fabrikaları' },
  { plate: '16', name: 'Bursa', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Otomotiv OSB, kentsel dönüşüm, taş ocakları ve Gemlik liman lojistiği' },
  { plate: '17', name: 'Çanakkale', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Köprü çevre yolu projeleri, linyit madenleri ve RES şantiyeleri' },
  { plate: '18', name: 'Çankırı', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Kaya tuzu madenleri, seramik kili ocakları ve karayolu altyapısı' },
  { plate: '19', name: 'Çorum', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Tuğla-kiremit sanayisi, baraj inşaatları ve organize sanayi tesisleri' },
  { plate: '20', name: 'Denizli', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'Traverten mermer ocakları, tekstil OSB ve otoyol viyadük inşaatları' },
  { plate: '21', name: 'Diyarbakır', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'Silvan baraj tünelleri, bazalt ocakları ve GAP sulama kanalları' },
  { plate: '22', name: 'Edirne', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Sınır kapısı lojistik sahaları, hızlı tren hattı ve çeltik drenaj kazıları' },
  { plate: '23', name: 'Elazığ', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Krom ve bakır madenleri, mermer ocakları ve deprem konut şantiyeleri' },
  { plate: '24', name: 'Erzincan', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Altın ve bakır madenciliği, dağ yolu tünelleri ve baraj inşaatları' },
  { plate: '25', name: 'Erzurum', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Yüksek irtifa karayolu şantiyeleri, tünel inşaatları ve krom ocakları' },
  { plate: '26', name: 'Eskişehir', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Bor ve manyezit madenleri, havacılık sanayisi ve raylı sistemler altyapısı' },
  { plate: '27', name: 'Gaziantep', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: '5 büyük OSB sahası, kentsel dönüşüm, taş ocakları ve lojistik depolar' },
  { plate: '28', name: 'Giresun', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Liman lojistiği, yayla yolları inşaatı ve taş ocağı işletmeleri' },
  { plate: '29', name: 'Gümüşhane', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Altın ve gümüş madenciliği, Zigana tünel bağlantıları ve baraj projeleri' },
  { plate: '30', name: 'Hakkari', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Çinko-kurşun madenleri, sınır güvenlik yolları ve tünel inşaatları' },
  { plate: '31', name: 'Hatay', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Yeniden inşa ve konut şantiyeleri, İskenderun limanı ve ağır sanayi' },
  { plate: '32', name: 'Isparta', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Mermer ocakları, çimento fabrikaları ve karayolu viyadük projeleri' },
  { plate: '33', name: 'Mersin', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Uluslararası konteyner limanı, Akkuyu NGS şantiyesi ve krom ocakları' },
  { plate: '34', name: 'İstanbul', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Kentsel dönüşüm, metro ve otoyol kazıları, liman lojistiği ve dev OSB\'ler' },
  { plate: '35', name: 'İzmir', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'Aliağa petrokimya, Alsancak liman lojistiği, mermer ve taş ocakları' },
  { plate: '36', name: 'Kars', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Bakü-Tiflis-Kars demiryolu lojistiği, baraj inşaatları ve taş ocakları' },
  { plate: '37', name: 'Kastamonu', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Küre bakır madenleri, orman yolları açımı ve mermer ocakları' },
  { plate: '38', name: 'Kayseri', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Organize sanayi bölgeleri, bazalt ve pomza ocakları ve altyapı şantiyeleri' },
  { plate: '39', name: 'Kırklareli', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Çimento fabrikaları, taş ocakları ve Trakya hızlı tren projesi' },
  { plate: '40', name: 'Kırşehir', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Kalker ocakları, tuz işletmeleri ve karayolu bölünmüş yol şantiyeleri' },
  { plate: '41', name: 'Kocaeli', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Gebze ve Dilovası ağır sanayisi, liman vinçleri ve otomotiv fabrikaları' },
  { plate: '42', name: 'Konya', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Döküm ve makine sanayisi, tarım arazisi ıslahı, mermer ve boksit ocakları' },
  { plate: '43', name: 'Kütahya', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'Linyit kömür sahaları, bor ve seramik kili madenciliği' },
  { plate: '44', name: 'Malatya', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Deprem konutları, demir madenleri ve çevre yolu tünel şantiyeleri' },
  { plate: '45', name: 'Manisa', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'Soma kömür işletmeleri, Manisa OSB ve jeotermal enerji santralleri' },
  { plate: '46', name: 'Kahramanmaraş', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Afşin-Elbistan linyit sahaları, kentsel yeniden inşa ve tekstil OSB' },
  { plate: '47', name: 'Mardin', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'Fosfat tesisleri, GAP kanalları, taş ocakları ve sınır lojistiği' },
  { plate: '48', name: 'Muğla', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'Yatağan ve Milas kömür ocakları, feldspat madenciliği ve marina altyapısı' },
  { plate: '49', name: 'Muş', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Alparslan barajı şantiyeleri, karayolu kazıları ve taş ocakları' },
  { plate: '50', name: 'Nevşehir', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Pomza madenleri, tüf taş ocakları ve altyapı tünel projeleri' },
  { plate: '51', name: 'Niğde', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Kalsit ve mikronize kireç madenciliği, otoyol projeleri ve taş ocakları' },
  { plate: '52', name: 'Ordu', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Dereyolu tünelleri, bentonit madenleri ve kıyı liman tahkimatları' },
  { plate: '53', name: 'Rize', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Ovit tüneli bağlantıları, İyidere lojistik limanı ve taş ocakları' },
  { plate: '54', name: 'Sakarya', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Otomotiv ve vagon sanayisi, nehir kumu ocakları ve otoyol şantiyeleri' },
  { plate: '55', name: 'Samsun', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Samsun liman lojistiği, bakır işletmeleri ve organize sanayi tesisleri' },
  { plate: '56', name: 'Siirt', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'Bakır ve çinko madenleri, Çetin barajı havzası ve yol şantiyeleri' },
  { plate: '57', name: 'Sinop', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Karayolu tünel inşaatları, liman mendirek yapımı ve taş ocakları' },
  { plate: '58', name: 'Sivas', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Demir cevheri madenleri, jips ocakları ve hızlı tren altyapı şantiyeleri' },
  { plate: '59', name: 'Tekirdağ', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Çorlu ve Çerkezköy sanayi koridoru, Asyaport limanı ve taş ocakları' },
  { plate: '60', name: 'Tokat', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Baraj gövde dolguları, mermer ocakları ve karayolu viyadükleri' },
  { plate: '61', name: 'Trabzon', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Zigana ve Kanuni bulvarı tünelleri, liman lojistiği ve taş ocakları' },
  { plate: '62', name: 'Tunceli', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Munzur su yapıları, karayolu köprüleri ve taş ocakları' },
  { plate: '63', name: 'Şanlıurfa', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'GAP sulama kanalları, güneş enerji tarlaları ve taş ocakları' },
  { plate: '64', name: 'Uşak', regionId: 'ege', regionName: 'Ege Bölgesi', sector: 'Kışladağ altın madeni, seramik sanayisi ve karayolu altyapı projeleri' },
  { plate: '65', name: 'Van', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Kuzey çevre yolu hafriyatları, ponza ocakları ve sınır lojistiği' },
  { plate: '66', name: 'Yozgat', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Hızlı tren hattı, çimento fabrikaları ve taş kırma tesisleri' },
  { plate: '67', name: 'Zonguldak', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'TTK taşkömürü havzası, Filyos limanı ve termik santral altyapısı' },
  { plate: '68', name: 'Aksaray', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Otomotiv yan sanayi, tuz ocakları ve demiryolu altyapı şantiyeleri' },
  { plate: '69', name: 'Bayburt', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Kop dağı tüneli inşaatı, taş ocakları ve karayolu şantiyeleri' },
  { plate: '70', name: 'Karaman', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Organize sanayi tesisleri, mermer ocakları ve hızlı tren bağlantıları' },
  { plate: '71', name: 'Kırıkkale', regionId: 'ic-anadolu', regionName: 'İç Anadolu Bölgesi', sector: 'Tüpraş rafinerisi, savunma sanayisi fabrikaları ve agrega ocakları' },
  { plate: '72', name: 'Batman', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'TPAO petrol sahaları, rafineri tesisleri ve Ilısu barajı hafriyatları' },
  { plate: '73', name: 'Şırnak', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'Gabar ve Cudi petrol sahaları, kömür ocakları ve sınır yolları' },
  { plate: '74', name: 'Bartın', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Amasra taşkömürü ocakları, liman altyapısı ve taş kırma tesisleri' },
  { plate: '75', name: 'Ardahan', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Ilgaz ve Ilgar tüneli inşaatları, sınır kapısı altyapısı ve kış yolları' },
  { plate: '76', name: 'Iğdır', regionId: 'dogu-anadolu', regionName: 'Doğu Anadolu Bölgesi', sector: 'Üç ülke sınır koridoru lojistiği, sulama kanalları ve agrega ocakları' },
  { plate: '77', name: 'Yalova', regionId: 'marmara', regionName: 'Marmara Bölgesi', sector: 'Tersane ve gemi inşa sahaları, kimya sanayisi ve lojistik depolar' },
  { plate: '78', name: 'Karabük', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Kardemir demir-çelik tesisleri, cüruf sahaları ve ağır sanayi taşımaları' },
  { plate: '79', name: 'Kilis', regionId: 'guneydogu-anadolu', regionName: 'Güneydoğu Anadolu Bölgesi', sector: 'Sınır lojistik merkezleri, Polateli OSB altyapısı ve zeytinyağı tesisleri' },
  { plate: '80', name: 'Osmaniye', regionId: 'akdeniz', regionName: 'Akdeniz Bölgesi', sector: 'Demir-çelik organize sanayi bölgesi, rüzgar santralleri ve otoyol kavşağı' },
  { plate: '81', name: 'Düzce', regionId: 'karadeniz', regionName: 'Karadeniz Bölgesi', sector: 'Organize sanayi bölgeleri, orman ürünleri tesisleri ve otoyol şantiyeleri' }
];

function slugify(text) {
  const trMap = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o'
  };
  return text
    .split('')
    .map(c => trMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildCityObject(raw) {
  const citySlugPart = slugify(raw.name);
  const slug = `${citySlugPart}-is-makinalari-servisi`;
  
  return {
    id: citySlugPart,
    plate: raw.plate,
    name: raw.name,
    slug: slug,
    regionId: raw.regionId,
    regionName: raw.regionName,
    isActive: true,
    seoTitle: `${raw.name} İş Makinaları Servisi & Hidrolik Tamiri | MESA`,
    seoDescription: `${raw.name} genelinde şantiye, maden ve sanayi sahalarına 7/24 mobil iş makinası tamiri, hidrolik revizyon ve acil müdahale desteği. 0533 529 36 74.`,
    h1: `${raw.name} İş Makinası Tamir ve Mobil Servis`,
    intro: `${raw.name} ve çevresindeki altyapı, maden, organize sanayi ve inşaat sahalarında çalışan ağır iş makinelerine tam donanımlı mobil servis araçlarımızla yerinde 7/24 teknik servis sunuyoruz.`,
    industryContext: `${raw.name} ili genelinde ${raw.sector} başta olmak üzere zorlu çalışma koşullarındaki ekskavatör, loder ve kazıcı yükleyicilere kesintisiz saha desteği sağlanmaktadır.`,
    mobileServiceText: `${raw.name} şantiyelerinde makinelerinizin iş kaybı yaşamaması için gezici mobil araçlarımız, orijinal arıza tespit cihazları, jeneratör ve seyyar hidrolik pres ekipmanlarıyla doğrudan sahaya gelir.`,
    hydraulicText: `500 Bar hidrolik hortum presleme, ana pompa (Kawasaki, Rexroth) revizyonu, kule dönüş redüktörleri, yürüyüş cer dişlileri ve bom silindir keçe değişimleri garantili olarak yapılır.`,
    servicedMachinery: [
      'Paletli ve Lastikli Ekskavatörler (20T - 50T)',
      'Kazıcı Yükleyiciler (Bekoloder JCB/CAT/Hidromek)',
      'Ağır Taş Ocağı ve Şantiye Kaya Loderleri',
      'Teleskopik Telehandler Yükleyiciler (Manitou, Merlo, JCB)',
      'Organize Sanayi Fabrika Forkliftleri (Dizel/Elektrikli)'
    ],
    nearbyCities: [], // doldurulacak
    faq: [
      {
        q: `${raw.name} genelinde şantiyeye mobil servis geliyor mu?`,
        a: `Evet, ${raw.name} merkez ve tüm ilçelerindeki şantiye, taş ocağı ve sanayi tesislerine donanımlı mobil araçlarımızla yerinde müdahale ediyoruz.`
      },
      {
        q: `${raw.name}’da iş makinası arızasında konum nasıl iletilir?`,
        a: `Sitemizdeki "Canlı GPS Konumu Paylaş" butonuna basarak veya 0533 529 36 74 nolu WhatsApp hattımıza konum göndererek ekibimizi yönlendirebilirsiniz.`
      },
      {
        q: 'Elektronik arıza kodları (DTC) sahada silinebiliyor mu?',
        a: 'CAT ET, JCB ServiceMaster, Volvo Tech Tool ve Cummins lisanslı teşhis cihazlarımızla makinenizin beynine bağlanıp kalibrasyon ve testler yerinde tamamlanır.'
      },
      {
        q: 'Patlayan hidrolik hortumlar şantiyede preslenebilir mi?',
        a: 'Mobil servis araçlarımızda 4 telli yüksek basınca dayanıklı hidrolik hortumları yerinde imal edebilen 500 Bar seyyar pres bulunmaktadır.'
      }
    ]
  };
}

// 81 ili inşa et
const allCities = PROVINCES_RAW.map(buildCityObject);

// Komşu şehirleri bağla (aynı bölgeden ilk 2 diğer il)
allCities.forEach(city => {
  const neighbors = allCities
    .filter(c => c.regionId === city.regionId && c.id !== city.id)
    .slice(0, 3)
    .map(c => ({ name: c.name, slug: c.slug }));
  city.nearbyCities = neighbors;
});

const content = `// MESA İş Makinaları - Türkiye Geneli 81 İl SEO & Operasyonel Veri Katmanı
export const activeCitiesData = ${JSON.stringify(allCities, null, 2)};

// Helper functions
export function getActiveCities() {
  return activeCitiesData.filter(c => c.isActive);
}

export function getCityBySlug(slug) {
  return activeCitiesData.find(c => c.slug === slug);
}
`;

const targetPath = path.resolve(__dirname, '../src/data/citiesData.js');
fs.writeFileSync(targetPath, content, 'utf-8');
console.log(`[OK] 81 İl Başarıyla Oluşturuldu! Dosya: ${targetPath} (Toplam ${allCities.length} şehir)`);
