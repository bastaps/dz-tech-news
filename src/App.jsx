import React, { useState, useEffect } from 'react';
import { Cpu, Smartphone, Wifi, Globe, Zap, Gamepad2, Search, Clock, Eye, Plus, X, ArrowRight, TrendingUp } from 'lucide-react';

const CATEGORIES = [
  { id: "tech", name: "Technologies", color: "bg-blue-600" },
  { id: "smartphones", name: "Smartphones", color: "bg-green-600" },
  { id: "digital", name: "Digital", color: "bg-purple-600" },
  { id: "international", name: "International", color: "bg-red-600" }
];

export default function App() {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('dz_tech_v3');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "Algérie Télécom lance la 5G dans 10 wilayas pilotes",
        excerpt: "Le géant algérien des télécommunications annonce le déploiement officiel de la 5G. Un tournant majeur pour le numérique algérien.",
        category: "tech",
        author: "Amine Benali",
        date: "01/05/2026",
        image: "https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=800",
        views: 15420,
        featured: true
      }
    ];
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dz_tech_v3', JSON.stringify(articles));
  }, [articles]);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newArt = {
      id: Date.now(),
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      category: formData.get('category'),
      author: "Rédaction DZ",
      date: new Date().toLocaleDateString('fr-FR'),
      image: formData.get('image') || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800",
      views: 0
    };
    setArticles([newArt, ...articles]);
    setIsModalOpen(false);
  };

  const filtered = activeCategory === "all" ? articles : articles.filter(a => a.category === activeCategory);
  const featured = articles.find(a => a.featured) || articles[0];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER TOP */}
      <div className="bg-gray-950 text-white py-2 text-[10px] font-bold px-4 flex justify-between uppercase">
          <span>1 MAI 2026</span>
          <span className="text-green-500">DZ TECHNEWS OFFICIEL</span>
      </div>

      {/* NAV MAIN */}
      <header className="bg-white border-b-4 border-green-600 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-black italic tracking-tighter mb-4 md:mb-0">
            <span className="text-green-600">DZ</span>TECH<span className="text-red-600">NEWS</span>
          </h1>
          <nav className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setActiveCategory("all")} className="px-4 py-1 rounded-full text-xs font-bold bg-gray-200">TOUS</button>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)} className="px-4 py-1 rounded-full text-xs font-bold bg-gray-100 hover:bg-gray-200 uppercase">
                {c.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* FLASH INFO */}
      <div className="bg-red-600 text-white py-2 overflow-hidden flex relative">
        <div className="bg-red-800 px-4 font-black italic text-xs z-10 flex items-center">FLASH</div>
        <div className="animate-marquee flex gap-10 font-bold uppercase text-xs">
          <span>🔴 Condor Electronics annonce un nouveau partenariat</span>
          <span>🚀 Algérie Télécom : La fibre arrive dans le Sud</span>
          <span>💰 DZ Pay dépasse le million de transactions</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            {/* FEATURED */}
            {activeCategory === "all" && (
              <div className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
                <img src={featured.image} className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end">
                  <span className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded w-fit mb-4">À LA UNE</span>
                  <h2 className="text-white text-3xl font-black mb-2">{featured.title}</h2>
                  <p className="text-gray-300 line-clamp-2 text-sm">{featured.excerpt}</p>
                </div>
              </div>
            )}

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.filter(a => !a.featured || activeCategory !== "all").map(art => (
                <div key={art.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <img src={art.image} className="h-48 w-full object-cover" />
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 leading-tight">{art.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{art.excerpt}</p>
                    <div className="mt-auto flex justify-between items-center text-[10px] font-bold text-gray-400 border-t pt-4">
                      <span>{art.author} • {art.date}</span>
                      <button className="text-green-600 flex items-center gap-1">LIRE <ArrowRight size={12}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-red-600 underline decoration-4 underline-offset-8">
                <TrendingUp size={20}/> TENDANCES
              </h3>
              <div className="space-y-6">
                {articles.slice(0, 3).map((art, idx) => (
                  <div key={art.id} className="flex gap-4 items-start">
                    <span className="text-3xl font-black text-gray-200">0{idx+1}</span>
                    <h4 className="font-bold text-sm hover:text-green-600 cursor-pointer">{art.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-700 p-8 rounded-2xl text-white shadow-lg">
              <h3 className="text-xl font-black mb-2">Newsletter</h3>
              <p className="text-green-100 text-sm mb-4">Recevez l'essentiel de la tech algérienne.</p>
              <input placeholder="Email" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 mb-3 outline-none" />
              <button className="w-full bg-white text-green-800 font-bold py-3 rounded-lg uppercase text-xs">S'abonner</button>
            </div>
          </aside>
        </div>
      </main>

      {/* ADD BUTTON */}
      <button onClick={() => setIsModalOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 border-4 border-white">
        <Plus size={32} strokeWidth={4} />
      </button>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400"><X size={24}/></button>
            <h2 className="text-2xl font-black mb-6">PUBLIER</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <input name="title" placeholder="Titre" required className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <select name="category" className="p-3 bg-gray-50 border rounded-lg outline-none">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input name="image" placeholder="Lien image" className="p-3 bg-gray-50 border rounded-lg outline-none" />
              </div>
              <textarea name="excerpt" placeholder="Résumé..." rows="3" className="w-full p-3 bg-gray-50 border rounded-lg outline-none"></textarea>
              <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-lg shadow-lg">METTRE EN LIGNE</button>
            </form>
          </div>
        </div>
      )}
      
      <footer className="bg-gray-950 text-white py-10 text-center">
         <h3 className="text-xl font-black italic">DZ<span className="text-green-600">TECH</span>NEWS</h3>
         <p className="text-gray-500 text-[10px] font-bold mt-2 uppercase">© 2026 • FAIT AVEC ❤️ EN ALGÉRIE</p>
      </footer>
    </div>
  );
}