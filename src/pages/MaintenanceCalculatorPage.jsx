import React, { useState, useId } from 'react';
import { SEO } from '../components/SEO';
import { Link } from '../router/Router';
import { useOperational } from '../context/OperationalContext';
import { 
  Calculator, Wrench, CheckCircle2, AlertTriangle, Printer, 
  MessageSquare, Phone, ShieldCheck, ArrowRight, Clock, 
  FileText, Sparkles, Download, Layers, ShoppingBag
} from 'lucide-react';

export const MaintenanceCalculatorPage = () => {
  const { addToCart } = useOperational();
  const [selectedMachine, setSelectedMachine] = useState('cat320d');
  const [selectedHours, setSelectedHours] = useState('500');
  const [addedNotification, setAddedNotification] = useState(false);

  const machineDatabase = {
    cat320d: {
      name: 'CAT 320D Paletli Ekskavatör',
      brand: 'Caterpillar',
      engine: 'Cat C6.4 ACERT (148 HP)',
      hydCapacity: '260 Litre',
      engineOilCapacity: '25 Litre (15W-40 DEO)',
      gearOilCapacity: '10 Litre (80W-90)',
      packages: {
        '250': {
          title: '250 Saat İlk / Ara Bakım',
          duration: '1.5 Saat',
          labor: 2800,
          partsCost: 6400,
          oilCost: 4750,
          filters: [
            { code: '1R-1808', name: 'Orijinal CAT Motor Yağ Filtresi', qty: 1, price: 1650 },
            { code: '1R-0770', name: 'CAT Yakıt Ön Filtresi & Su Ayırıcı', qty: 1, price: 2100 },
            { code: '326-1644', name: 'CAT Pilot Hidrolik Filtresi', qty: 1, price: 2650 }
          ],
          oils: [
            { name: 'Cat DEO-ULS 15W-40 Motor Yağı', qty: '25 Litre', spec: 'API CK-4' }
          ],
          inspections: [
            'Elektronik ET Arıza Kodu Taraması',
            'Kule Dönüş Şanzıman Yağ Seviyesi Kontrolü',
            'Palet Gergi Boşluk ve Gresleme Kontrolü',
            'Radyatör ve Hidrolik Soğutucu Petek Temizliği'
          ]
        },
        '500': {
          title: '500 Saat Standart Şantiye Bakımı',
          duration: '2.5 Saat',
          labor: 4200,
          partsCost: 14850,
          oilCost: 5900,
          filters: [
            { code: '1R-1808', name: 'Orijinal CAT Motor Yağ Filtresi', qty: 1, price: 1650 },
            { code: '1R-0762', name: 'CAT İkincil Yakıt Filtresi (2 Mikron)', qty: 1, price: 2450 },
            { code: '1R-0770', name: 'CAT Yakıt Ön Filtresi & Su Ayırıcı', qty: 1, price: 2100 },
            { code: '131-8822', name: 'CAT Ana Dış Hava Filtresi', qty: 1, price: 4250 },
            { code: '131-8821', name: 'CAT Emniyet İç Hava Filtresi', qty: 1, price: 2350 },
            { code: '093-7521', name: 'CAT Hidrolik Tank Havalık Filtresi', qty: 1, price: 2050 }
          ],
          oils: [
            { name: 'Cat DEO-ULS 15W-40 Motor Yağı', qty: '25 Litre', spec: 'API CK-4' },
            { name: 'Mobil Delvac Synthetic Gear 80W-90 Kule Yağı', qty: '8 Litre', spec: 'GL-5' }
          ],
          inspections: [
            'CAT ET Canlı Basınç Kalibrasyonu',
            'Ana Hidrolik Pompa Stand-by Basınç Testi (350 Bar)',
            'Bom ve Arm Pim Boşluklarının Mastarlanması',
            'Akü Yoğunluk ve Marş Dinamosu Şarj Voltaj Testi',
            'Yüksek Basınç Hortumlarının Termal Kaçak Kontrolü'
          ]
        },
        '1000': {
          title: '1.000 Saat Kapsamlı Güç Aktarma Bakımı',
          duration: '4 Saat',
          labor: 6500,
          partsCost: 26400,
          oilCost: 18200,
          filters: [
            { code: '1R-1808', name: 'CAT Motor Yağ Filtresi', qty: 1, price: 1650 },
            { code: '1R-0762', name: 'CAT İkincil Yakıt Filtresi', qty: 1, price: 2450 },
            { code: '1R-0770', name: 'CAT Su Ayırıcı Yakıt Filtresi', qty: 1, price: 2100 },
            { code: '131-8822', name: 'CAT Dış Hava Filtresi', qty: 1, price: 4250 },
            { code: '131-8821', name: 'CAT İç Hava Filtresi', qty: 1, price: 2350 },
            { code: '1R-0777', name: 'CAT Hidrolik Dönüş Filtresi', qty: 2, price: 7800 },
            { code: '326-1644', name: 'CAT Pilot Hat Filtresi', qty: 1, price: 2650 },
            { code: '179-9806', name: 'Kabin Havalandırma & Polen Filtresi', qty: 1, price: 3150 }
          ],
          oils: [
            { name: 'Cat DEO-ULS 15W-40 Motor Yağı', qty: '25 Litre', spec: 'API CK-4' },
            { name: 'Cat HYDO Advanced 10 Hidrolik Yağ (Ekleme/Kısmi)', qty: '60 Litre', spec: 'ISO VG 46' },
            { name: 'Cat FDAO 60W Cer ve Kule Yağı', qty: '18 Litre', spec: 'CAT TO-4' }
          ],
          inspections: [
            'Subap Boşluk Ayarı (Valf Açıklık Mastarı)',
            'Common Rail Enjektör Geri Dönüş Kaçak Testi',
            'Cer Dişli Aşınma Boşluğu ve Mıknatıs Tapa Analizi',
            'Klima Gaz Basıncı ve Kompresör Manyetik Kavrama Testi'
          ]
        },
        '2000': {
          title: '2.000 Saat Ağır Hidrolik Revizyon & Fabrika Sıfırlama',
          duration: '6.5 Saat',
          labor: 9800,
          partsCost: 41200,
          oilCost: 38500,
          filters: [
            { code: '1R-1808', name: 'CAT Motor Yağ Filtresi', qty: 1, price: 1650 },
            { code: '1R-0762', name: 'CAT İkincil Yakıt Filtresi', qty: 1, price: 2450 },
            { code: '1R-0770', name: 'CAT Su Ayırıcı Filtre', qty: 1, price: 2100 },
            { code: '131-8822 / 8821', name: 'CAT Komple Ağır Hava Filtre Seti', qty: 1, price: 6600 },
            { code: '1R-0777', name: 'CAT Hidrolik Dönüş Filtresi Çiftli', qty: 2, price: 7800 },
            { code: '326-1644', name: 'CAT Pilot Filtre', qty: 1, price: 2650 },
            { code: '093-7521', name: 'Hidrolik Havalık Kiti', qty: 1, price: 2050 },
            { code: 'KIT-CAT-VALVE', name: 'Orijinal O-Ring & Valf Keçe Seti', qty: 1, price: 15900 }
          ],
          oils: [
            { name: 'Cat DEO-ULS 15W-40 Motor Yağı', qty: '25 Litre', spec: 'API CK-4' },
            { name: 'Cat HYDO Advanced 10 Komple Hidrolik Değişimi', qty: '220 Litre', spec: 'ISO VG 46' },
            { name: 'Komple Cer ve Kule Şanzıman Yağları', qty: '24 Litre', spec: 'CAT TO-4' }
          ],
          inspections: [
            'Tüm Hidrolik Silindir Keçe Kaçak Testleri (500 Bar)',
            'Ana Pompa Debi Verimliliği Dinamometre Ölçümü',
            'Radyatör Termostat ve Soğutma Sıvısı Komple Değişimi',
            'CAT ET Fabrika ECU Parametre Sıfırlama & Kalibrasyon'
          ]
        }
      }
    },
    jcb3cx: {
      name: 'JCB 3CX Eco Kazıcı Yükleyici',
      brand: 'JCB',
      engine: 'JCB Dieselmax 4.4L (92 HP)',
      hydCapacity: '130 Litre',
      engineOilCapacity: '15 Litre (15W-40)',
      gearOilCapacity: '18 Litre (Powershift Şanzıman)',
      packages: {
        '250': {
          title: '250 Saat İlk / Ara Bakım',
          duration: '1.5 Saat',
          labor: 2400,
          partsCost: 4850,
          oilCost: 3200,
          filters: [
            { code: '320/04133', name: 'Orijinal JCB Motor Yağ Filtresi', qty: 1, price: 1250 },
            { code: '320/07155', name: 'JCB Yakıt Filtresi & Su Ayırıcı', qty: 1, price: 1750 },
            { code: '581/18076', name: 'JCB Şanzıman Filtresi', qty: 1, price: 1850 }
          ],
          oils: [
            { name: 'JCB Engine Oil UP 15W-40', qty: '15 Litre', spec: 'API CH-4' }
          ],
          inspections: [
            'JCB ServiceMaster ECU Teşhisi',
            'Ön/Arka Aks Diferansiyel Yağ Kontrolü',
            'Gresleme Noktaları ve Kırıcı Tesisatı Basınç Testi',
            'Tork Konvertör Kavrama Basınç Kontrolü'
          ]
        },
        '500': {
          title: '500 Saat Standart Şantiye Bakımı',
          duration: '2.5 Saat',
          labor: 3800,
          partsCost: 11200,
          oilCost: 5600,
          filters: [
            { code: '320/04133', name: 'JCB Motor Yağ Filtresi', qty: 1, price: 1250 },
            { code: '320/07155', name: 'JCB Yakıt Ön Filtresi', qty: 1, price: 1750 },
            { code: '320/07057', name: 'JCB İkincil Yakıt Filtresi', qty: 1, price: 1950 },
            { code: '32/917804', name: 'JCB Dış Hava Filtresi', qty: 1, price: 2950 },
            { code: '32/917805', name: 'JCB İç Emniyet Hava Filtresi', qty: 1, price: 1650 },
            { code: '581/18076', name: 'JCB Powershift Şanzıman Filtresi', qty: 1, price: 1650 }
          ],
          oils: [
            { name: 'JCB Engine Oil UP 15W-40', qty: '15 Litre', spec: 'API CH-4' },
            { name: 'JCB Transmission Fluid EP 10W', qty: '18 Litre', spec: 'Powershift' }
          ],
          inspections: [
            'ServisMaster Live Data Enjektör Testi',
            'Hidrolik Basınç Tahliye Valf Testi (250 Bar)',
            'Arka Bom Kazıcı Kilit Mekanizma Kontrolü',
            'Fren Hidrolik Yağı ve Kaliper Boşluk Testi'
          ]
        },
        '1000': {
          title: '1.000 Saat Kapsamlı Güç Aktarma Bakımı',
          duration: '3.5 Saat',
          labor: 5500,
          partsCost: 19800,
          oilCost: 12800,
          filters: [
            { code: '320/04133', name: 'JCB Motor Yağ Filtresi', qty: 1, price: 1250 },
            { code: '320/07155', name: 'JCB Yakıt Filtre Seti', qty: 2, price: 3700 },
            { code: '32/917804/805', name: 'JCB Komple Hava Filtresi Seti', qty: 1, price: 4600 },
            { code: '32/925346', name: 'JCB Hidrolik Dönüş Filtresi', qty: 1, price: 4950 },
            { code: '581/18076', name: 'JCB Şanzıman Filtresi', qty: 1, price: 1650 },
            { code: '30/925759', name: 'Kabin Filtresi Seti', qty: 1, price: 3650 }
          ],
          oils: [
            { name: 'JCB 15W-40 Motor Yağı', qty: '15 Litre', spec: 'API CH-4' },
            { name: 'JCB Hidrolik Yağ HP46', qty: '40 Litre', spec: 'ISO VG 46' },
            { name: 'JCB Gear Oil HP Plus Aks Yağları', qty: '20 Litre', spec: 'GL-4/5' }
          ],
          inspections: [
            'Ön Aks Salıncak Burç ve Rulman Boşlukları',
            'Teleskopik Kol (Extradig) Ayar Plakaları Boşluk Kontrolü',
            'Powershift Vites Geçiş Valf Basınçları',
            'Kırıcı Hattı Geri Dönüş Çekvalf Testi'
          ]
        },
        '2000': {
          title: '2.000 Saat Ağır Hidrolik & Güç Aktarma Revizyonu',
          duration: '5.5 Saat',
          labor: 8200,
          partsCost: 31500,
          oilCost: 24500,
          filters: [
            { code: '320/04133', name: 'JCB Motor Filtresi', qty: 1, price: 1250 },
            { code: 'JCB-FUEL-KIT', name: 'JCB Yakıt Filtre Kiti', qty: 1, price: 3700 },
            { code: 'JCB-AIR-KIT', name: 'JCB Ağır Hava Filtre Kiti', qty: 1, price: 4600 },
            { code: '32/925346', name: 'JCB Hidrolik Dönüş Filtresi', qty: 1, price: 4950 },
            { code: '581/18076', name: 'JCB Şanzıman Filtresi', qty: 1, price: 1650 },
            { code: 'JCB-SEAL-KIT', name: 'Orijinal Hidrolik Valf Keçe Kiti', qty: 1, price: 15350 }
          ],
          oils: [
            { name: 'JCB Motor Yağı 15W-40', qty: '15 Litre', spec: 'API CH-4' },
            { name: 'JCB Hidrolik Yağ HP46 (Komple)', qty: '120 Litre', spec: 'ISO VG 46' },
            { name: 'JCB Şanzıman & Aks Komple Yağları', qty: '38 Litre', spec: 'Özel JCB' }
          ],
          inspections: [
            'Ana Hidrolik Pompa P2/P3 Akış ve Debi Testi',
            'Direksiyon Yörünge Valfi ve Silindir Keçeleri',
            'Tork Konvertör Sıcaklık ve Basınç Kaybı Ölçümü',
            'Komple Radyatör ve Soğutma Devresi Kimyasal Yıkama'
          ]
        }
      }
    },
    hidromek102b: {
      name: 'Hidromek HMK 102B Alpha Bekoloder',
      brand: 'Hidromek',
      engine: 'Perkins 1104D-44TA (100 HP)',
      hydCapacity: '145 Litre',
      engineOilCapacity: '12 Litre (15W-40)',
      gearOilCapacity: '19 Litre (Autoshift)',
      packages: {
        '250': {
          title: '250 Saat İlk / Ara Bakım',
          duration: '1.5 Saat',
          labor: 2300,
          partsCost: 4600,
          oilCost: 2900,
          filters: [
            { code: 'F01/81432', name: 'Orijinal Hidromek Motor Yağ Filtresi', qty: 1, price: 1150 },
            { code: 'F01/81433', name: 'Hidromek Yakıt Filtresi & Su Tutucu', qty: 1, price: 1650 },
            { code: 'F01/81438', name: 'Şanzıman Basınç Filtresi', qty: 1, price: 1800 }
          ],
          oils: [
            { name: 'Mobil Delvac Modern 15W-40 Motor Yağı', qty: '12 Litre', spec: 'API CI-4' }
          ],
          inspections: [
            'Perkins EST Diagnostik Arıza Taraması',
            'Ön ve Arka Diferansiyel Yağ Seviye Kontrolü',
            'Uzatmalı Arm Boşluk Plakası Ayarı',
            'Gresleme ve Hortum Sızıntı Kontrolü'
          ]
        },
        '500': {
          title: '500 Saat Standart Şantiye Bakımı',
          duration: '2.5 Saat',
          labor: 3600,
          partsCost: 10400,
          oilCost: 5200,
          filters: [
            { code: 'F01/81432', name: 'Hidromek Motor Yağ Filtresi', qty: 1, price: 1150 },
            { code: 'F01/81433', name: 'Hidromek Yakıt Filtresi', qty: 1, price: 1650 },
            { code: 'F01/81434', name: 'Hidromek İkincil Yakıt Filtresi', qty: 1, price: 1850 },
            { code: 'F01/81420', name: 'Hidromek Dış Hava Filtresi', qty: 1, price: 2750 },
            { code: 'F01/81421', name: 'Hidromek İç Hava Filtresi', qty: 1, price: 1550 },
            { code: 'F01/81438', name: 'Şanzıman Filtresi', qty: 1, price: 1450 }
          ],
          oils: [
            { name: 'Mobil 15W-40 Motor Yağı', qty: '12 Litre', spec: 'API CI-4' },
            { name: 'Autoshift Şanzıman Yağı ATF', qty: '19 Litre', spec: 'ATF III' }
          ],
          inspections: [
            'Hidromek Alpha SmartLink Teşhis Kontrolü',
            'Rexroth Tandem Dişli Pompa Basınç Testi',
            'Fren Devresi ve El Freni Tutuş Testi',
            'Kazıcı Kule Dönüş Silindir Boşluk Mastarı'
          ]
        },
        '1000': {
          title: '1.000 Saat Kapsamlı Güç Aktarma Bakımı',
          duration: '3.5 Saat',
          labor: 5200,
          partsCost: 18900,
          oilCost: 11900,
          filters: [
            { code: 'F01/81432', name: 'Hidromek Motor Yağ Filtresi', qty: 1, price: 1150 },
            { code: 'F01-FUEL-SET', name: 'Hidromek Komple Yakıt Filtre Seti', qty: 1, price: 3500 },
            { code: 'F01-AIR-SET', name: 'Hidromek Komple Hava Filtre Seti', qty: 1, price: 4300 },
            { code: 'F01/81450', name: 'Hidromek Hidrolik Dönüş Filtresi', qty: 1, price: 4650 },
            { code: 'F01/81438', name: 'Şanzıman Yağ Filtresi', qty: 1, price: 1450 },
            { code: 'HMK-CABIN', name: 'Kabin Polen Filtresi', qty: 1, price: 3850 }
          ],
          oils: [
            { name: '15W-40 Motor Yağı', qty: '12 Litre', spec: 'API CI-4' },
            { name: 'ISO VG 46 Hidrolik Yağ (Kısmi)', qty: '50 Litre', spec: 'ISO VG 46' },
            { name: '85W-90 Aks ve Diferansiyel Yağları', qty: '22 Litre', spec: 'GL-5' }
          ],
          inspections: [
            'Perkins Subap Açıklık Sentil Ayarı',
            'Ön Dingil Denge Mili ve Porya Rulman Boşlukları',
            'Powershift Şanzıman Kalibrasyonu',
            'Hidrolik Kırıcı Çekvalf ve Akümülatör Basınç Ölçümü'
          ]
        },
        '2000': {
          title: '2.000 Saat Ağır Hidrolik & Güç Aktarma Revizyonu',
          duration: '5.5 Saat',
          labor: 7800,
          partsCost: 29800,
          oilCost: 23200,
          filters: [
            { code: 'F01/81432', name: 'Hidromek Motor Filtresi', qty: 1, price: 1150 },
            { code: 'F01-FUEL-SET', name: 'Komple Yakıt Filtre Kiti', qty: 1, price: 3500 },
            { code: 'F01-AIR-SET', name: 'Ağır Hava Filtre Kiti', qty: 1, price: 4300 },
            { code: 'F01/81450', name: 'Hidrolik Dönüş Filtresi', qty: 1, price: 4650 },
            { code: 'F01/81438', name: 'Şanzıman Filtresi', qty: 1, price: 1450 },
            { code: 'HMK-SEAL-KIT', name: 'Hidrolik Valf Blok O-Ring Kiti', qty: 1, price: 14750 }
          ],
          oils: [
            { name: '15W-40 Motor Yağı', qty: '12 Litre', spec: 'API CI-4' },
            { name: 'ISO VG 46 Hidrolik Yağ Komple', qty: '135 Litre', spec: 'ISO VG 46' },
            { name: 'Şanzıman ve Diferansiyeller Komple', qty: '41 Litre', spec: 'Özel Spesifikasyon' }
          ],
          inspections: [
            'Ana Pompa Debi ve Kaçak Testi',
            'Kazıcı ve Yükleyici Tüm Silindir Piston Keçeleri',
            'Fren Balata Kalınlığı ve Kaliper Sızdırmazlığı',
            'Soğutma Radyatörleri Kimyasal Dezenfeksiyon ve Yıkama'
          ]
        }
      }
    },
    komatsu200: {
      name: 'Komatsu PC200-8 Paletli Ekskavatör',
      brand: 'Komatsu',
      engine: 'Komatsu SAA6D107E-1 (148 HP)',
      hydCapacity: '240 Litre',
      engineOilCapacity: '24 Litre (15W-40)',
      gearOilCapacity: '12 Litre (80W-90)',
      packages: {
        '500': {
          title: '500 Saat Standart Şantiye Bakımı',
          duration: '2.5 Saat',
          labor: 4000,
          partsCost: 13900,
          oilCost: 5800,
          filters: [
            { code: '6736-51-5142', name: 'Orijinal Komatsu Motor Yağ Filtresi', qty: 1, price: 1550 },
            { code: '600-319-3550', name: 'Komatsu Yakıt Ön Filtresi & Su Ayırıcı', qty: 1, price: 2350 },
            { code: '6754-71-6130', name: 'Komatsu Ana Yakıt Filtresi', qty: 1, price: 2200 },
            { code: '600-185-4100', name: 'Komatsu Dış & İç Hava Filtre Kiti', qty: 1, price: 5400 },
            { code: '207-60-71182', name: 'Komatsu Hidrolik Tank Havalığı', qty: 1, price: 2400 }
          ],
          oils: [
            { name: 'Komatsu Genuine Engine Oil 15W-40', qty: '24 Litre', spec: 'DH-1' },
            { name: 'Komatsu Gear Oil 80W-90 Kule Yağı', qty: '8 Litre', spec: 'GL-5' }
          ],
          inspections: [
            'Komatsu KOMTRAX & Diagnostic Tool Canlı Bağlantı',
            'HPV95 Hidrolik Pompa Basınç Testi (37.3 MPa)',
            'Bom ve Kule Dönüş Yatak Gresleme',
            'Palet Pabuç Cıvataları Tork Kontrolü'
          ]
        },
        '1000': {
          title: '1.000 Saat Kapsamlı Güç Aktarma Bakımı',
          duration: '4 Saat',
          labor: 6200,
          partsCost: 24900,
          oilCost: 17500,
          filters: [
            { code: '6736-51-5142', name: 'Komatsu Motor Yağ Filtresi', qty: 1, price: 1550 },
            { code: 'KOM-FUEL-KIT', name: 'Komatsu İkili Yakıt Filtresi', qty: 1, price: 4550 },
            { code: '600-185-4100', name: 'Ağır Hizmet Hava Filtresi', qty: 1, price: 5400 },
            { code: '207-60-71182', name: 'Komatsu Hidrolik Dönüş Filtresi', qty: 2, price: 7900 },
            { code: '207-60-71311', name: 'Komatsu Pilot Filtre', qty: 1, price: 2600 },
            { code: '17M-911-3530', name: 'Kabin Klima Filtresi', qty: 1, price: 2900 }
          ],
          oils: [
            { name: 'Komatsu 15W-40 Motor Yağı', qty: '24 Litre', spec: 'DH-1' },
            { name: 'Komatsu Super Hyd Oil HO46', qty: '60 Litre', spec: 'ISO VG 46' },
            { name: 'Komatsu TO-30 Cer Dişli Yağları', qty: '16 Litre', spec: 'CAT TO-4' }
          ],
          inspections: [
            'Komatsu Common Rail Basınç Sensör Testi',
            'Cer Dişli Aşınma Boşluğu Ölçümü',
            'Kule Dişli Boşluk Komparatör Testi',
            'Soğutma Suyu Antifriz Derece ve pH Ölçümü'
          ]
        },
        '2000': {
          title: '2.000 Saat Ağır Hidrolik & Güç Aktarma Revizyonu',
          duration: '6.5 Saat',
          labor: 9400,
          partsCost: 39500,
          oilCost: 36800,
          filters: [
            { code: '6736-51-5142', name: 'Komatsu Motor Filtresi', qty: 1, price: 1550 },
            { code: 'KOM-FUEL-KIT', name: 'Komple Yakıt Filtre Kiti', qty: 1, price: 4550 },
            { code: '600-185-4100', name: 'Komple Hava Filtre Kiti', qty: 1, price: 5400 },
            { code: '207-60-71182', name: 'Hidrolik Dönüş Filtresi Çiftli', qty: 2, price: 7900 },
            { code: '207-60-71311', name: 'Pilot Filtre', qty: 1, price: 2600 },
            { code: 'KOM-VALVE-KIT', name: 'Komple Ana Kontrol Valf Keçe Kiti', qty: 1, price: 17500 }
          ],
          oils: [
            { name: 'Komatsu 15W-40 Motor Yağı', qty: '24 Litre', spec: 'DH-1' },
            { name: 'Komatsu Super Hyd Oil HO46 Komple', qty: '210 Litre', spec: 'ISO VG 46' },
            { name: 'Cer ve Kule Yağları Komple', qty: '22 Litre', spec: 'TO-30' }
          ],
          inspections: [
            'Komatsu Ana Pompa Swash Plate Açısı Kalibrasyonu',
            'Silindir Boğaz ve Piston Keçe Kaçak Testleri',
            'Radyatör ve Yağ Soğutucu Kimyasal Yıkama',
            'KOMTRAX Telematik Verici Testi'
          ]
        }
      }
    }
  };

  const machine = machineDatabase[selectedMachine] || machineDatabase.cat320d;
  const availableHours = Object.keys(machine.packages);
  const activeHours = availableHours.includes(selectedHours) ? selectedHours : availableHours[0];
  const pkg = machine.packages[activeHours] || machine.packages['500'];

  const subtotal = pkg.labor + pkg.partsCost + pkg.oilCost;
  const vat = Math.round(subtotal * 0.20);
  const grandTotal = subtotal + vat;

  const handleAddToCart = () => {
    addToCart({
      id: `PKG-${selectedMachine}-${activeHours}`,
      title: `${machine.name} - ${pkg.title}`,
      price: grandTotal,
      category: 'Periyodik Bakım Paketi',
      brand: machine.brand,
      qty: 1
    });
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 3000);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-10">
      <SEO
        title="İş Makinası OEM Periyodik Bakım & Maliyet Hesaplayıcı | MESA"
        description="CAT, JCB, Hidromek, Komatsu ve Volvo iş makinalarınız için 250, 500, 1000 ve 2000 saat OEM filtre, orijinal yağ ve mobil servis bakım maliyetlerini anında şeffaf hesaplayın."
        canonical="/bakim-hesaplayici"
        keywords="iş makinası bakım maliyeti, CAT 320 bakım fiyatı, JCB 3CX 500 saat bakımı, Hidromek periyodik bakım kiti, mobil iş makinası servisi"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-red-600">Ana Sayfa</Link>
            <span>/</span>
            <Link to="/hizmetler" className="hover:text-red-600">Hizmetlerimiz</Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">OEM Bakım Hesaplayıcı</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200 mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Şeffaf & Orijinal OEM Parça Garantisi</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                İş Makinası OEM Periyodik Bakım Maliyeti Hesaplayıcı
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Makina modelinizi ve çalışma saatini seçin; gereken orijinal OEM filtre kodlarını, onaylı motor ve hidrolik yağ miktarlarını, tahmini servis süresini ve net maliyet tablosunu anında görün.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs shadow-xs transition shrink-0"
            >
              <Printer className="w-4 h-4 text-red-600" />
              <span>Proforma Teklif Yazdır</span>
            </button>
          </div>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Machine Selector */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-3">
              1. İş Makinası Modelini Seçin
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(machineDatabase).map(([key, m]) => {
                const isSelected = selectedMachine === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedMachine(key)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      isSelected 
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20' 
                        : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-wider block ${isSelected ? 'text-red-200' : 'text-slate-400'}`}>
                      {m.brand}
                    </span>
                    <strong className="text-xs font-black block mt-0.5">{m.name}</strong>
                    <span className={`text-[11px] block mt-1 ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      {m.engine}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Maintenance Interval Selector */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-3">
              2. Bakım Çalışma Saatini Seçin
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: '250', label: '250 Saat', sub: 'İlk / Ara Bakım', icon: '🌱' },
                { id: '500', label: '500 Saat', sub: 'Standart Şantiye Bakımı', icon: '⚙️' },
                { id: '1000', label: '1.000 Saat', sub: 'Kapsamlı Güç Aktarma', icon: '🛡️' },
                { id: '2000', label: '2.000 Saat', sub: 'Ağır Hidrolik Revizyon', icon: '⚡' }
              ].map(item => {
                const isSelected = activeHours === item.id;
                const isAvailable = availableHours.includes(item.id);
                if (!isAvailable) return null;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedHours(item.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected 
                        ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20' 
                        : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{item.icon}</span>
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-amber-200' : 'text-red-600'}`}>
                        {item.label}
                      </span>
                    </div>
                    <strong className="text-sm font-black block">{item.sub}</strong>
                    <span className={`text-[11px] block mt-1 ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      {machine.packages[item.id]?.duration} tahmini işçilik
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Detailed Breakdown Card */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider">
                {machine.name} • {pkg.title}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Orijinal OEM Parça & Bakım Spesifikasyonu
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                <span>⏱️ Servis Süresi: <strong className="text-slate-800">{pkg.duration}</strong></span>
                <span>🛢️ Motor Yağı: <strong className="text-slate-800">{machine.engineOilCapacity}</strong></span>
                <span>💧 Hidrolik Tank: <strong className="text-slate-800">{machine.hydCapacity}</strong></span>
              </div>
            </div>

            <div className="text-right shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block">KDV DAHİL TOPLAM TEKLİF</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                ₺{grandTotal.toLocaleString('tr-TR')}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Yerinde Mobil Servis & Montaj Dahil</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            
            {/* Left: Filters Table */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-red-600" />
                  <span>Kullanılacak Orijinal OEM Filtreler ({pkg.filters.length} Kalem)</span>
                </h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">OEM Parça No</th>
                        <th className="p-3">Tanım</th>
                        <th className="p-3 text-center">Adet</th>
                        <th className="p-3 text-right">Tutar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pkg.filters.map((f, fIdx) => (
                        <tr key={fIdx} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-red-600">{f.code}</td>
                          <td className="p-3 font-medium text-slate-800">{f.name}</td>
                          <td className="p-3 text-center font-bold text-slate-600">{f.qty}</td>
                          <td className="p-3 text-right font-mono font-bold text-slate-900">₺{f.price.toLocaleString('tr-TR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Oils and Fluids */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>Onaylı Yağ ve Sıvılar</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.oils.map((o, oIdx) => (
                    <div key={oIdx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <strong className="text-xs font-black text-slate-900 block">{o.name}</strong>
                      <div className="flex items-center justify-between text-xs mt-1 text-slate-500 font-medium">
                        <span>Hacim: <strong className="text-slate-800">{o.qty}</strong></span>
                        <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">{o.spec}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Checkpoints */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Standart Diagnostik & Kontrol Kontrol Noktaları</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.inspections.map((ins, insIdx) => (
                    <div key={insIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Cost Matrix & Actions */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3.5 text-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                  Maliyet Özeti & Fiyatlandırma
                </h3>

                <div className="flex justify-between items-center text-slate-600">
                  <span>OEM Filtre Kiti Bedeli:</span>
                  <span className="font-mono font-bold text-slate-900">₺{pkg.partsCost.toLocaleString('tr-TR')}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Orijinal Yağ ve Sıvılar:</span>
                  <span className="font-mono font-bold text-slate-900">₺{pkg.oilCost.toLocaleString('tr-TR')}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>Mobil Atölye ve Yerinde İşçilik:</span>
                  <span className="font-mono font-bold text-slate-900">₺{pkg.labor.toLocaleString('tr-TR')}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-slate-600">
                  <span>Ara Toplam (Net):</span>
                  <span className="font-mono font-bold text-slate-900">₺{subtotal.toLocaleString('tr-TR')}</span>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>KDV (%20):</span>
                  <span className="font-mono font-bold text-slate-900">₺{vat.toLocaleString('tr-TR')}</span>
                </div>

                <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-baseline">
                  <strong className="text-sm font-black text-slate-900">GENEL TOPLAM:</strong>
                  <span className="text-2xl font-black text-emerald-700 font-mono">₺{grandTotal.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotification ? '✓ Sepete Eklendi!' : 'Bu Bakım Paketini Sepete Ekle'}</span>
                </button>

                <a
                  href={`https://wa.me/905344075585?text=${encodeURIComponent(`Merhaba MESA Servis, ${machine.name} makinam için ${pkg.title} (₺${grandTotal.toLocaleString('tr-TR')}) randevusu almak ve teklifi onaylamak istiyorum.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Randevu Onayla</span>
                </a>

                <a
                  href="tel:05344075585"
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>Teknik Danışman: 0534 407 55 85</span>
                </a>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Tüm bakım paketlerimiz Adana, Mersin, Hatay, Osmaniye geneline 18 mobil atölye aracımızla yerinde şantiyenizde uygulanmaktadır.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
