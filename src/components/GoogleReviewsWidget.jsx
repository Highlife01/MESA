import React from 'react';
import { Star, ShieldCheck, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';

export const GoogleReviewsWidget = () => {
  const reviews = [
    {
      id: 1,
      author: 'Ahmet Karataş',
      role: 'Akdeniz Taş Ocağı Şantiye Müdürü',
      location: 'Seyhan / Adana',
      rating: 5,
      date: '3 gün önce',
      comment: 'CAT 336D ekskavatörümüzün ana pompa basınç düşüşünde 40 dakikada şantiyeye ulaştılar. Seyyar presle hortumları yenileyip pompayı kalibre ettiler. İş kaybımızı önlediler, kesinlikle tavsiye ederim.',
      verified: true
    },
    {
      id: 2,
      author: 'Mustafa Yıldırım',
      role: 'Çukurova Altyapı & Hafriyat',
      location: 'Ceyhan / Adana',
      rating: 5,
      date: '1 hafta önce',
      comment: 'JCB 3CX kazıcımızın kule dönüş hidromotoru kilitlenmişti. Gece 02:00\'de acil çağrı yaptık, 45 dakikada Ceyhan\'a ulaşıp arızayı çözdüler. 7/24 kesintisiz hizmetleri gerçekmiş.',
      verified: true
    },
    {
      id: 3,
      author: 'Serdar Demirtaş',
      role: 'Toroslar Mermer & Madencilik',
      location: 'Kozan / Adana',
      rating: 5,
      date: '2 hafta önce',
      comment: 'Komatsu PC390 için OEM filtre ve hidrolik emniyet valfi siparişi verdik. 3 saat içinde şantiyemize teslim edildi. Dijital imza ile servis tutanağımızı anında aldık.',
      verified: true
    },
    {
      id: 4,
      author: 'Emre Başer',
      role: 'Liman Lojistik & Konteyner Hizmetleri',
      location: 'Mersin Limanı / Taşucu',
      rating: 5,
      date: '3 hafta önce',
      comment: 'Manitou telehandler bom açma valfindeki elektriksel soket arızasını bilgisayarlı diagnostik cihazla 15 dakikada tespit ettiler. 12 ay garantili faturalı teslim aldık.',
      verified: true
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
      {/* Background glowing gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20">
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">Google İşletme Puanı</h3>
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Doğrulanmış Profil
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-base font-extrabold text-slate-900">4.9</span>
              <span className="text-xs text-slate-500 font-medium">(148+ Müşteri İncelemesi)</span>
            </div>
          </div>
        </div>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-200 shadow-sm"
        >
          <span>Google Haritalar'da İncele & Yorum Yaz</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
        </a>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {reviews.map((rev) => (
          <div 
            key={rev.id}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.author}
                    {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium block">{rev.role}</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">{rev.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <MapPin className="w-3 h-3" />
                {rev.location}
              </span>
              <span className="text-slate-400">Doğrulanmış İş Makinası Sahibi</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
