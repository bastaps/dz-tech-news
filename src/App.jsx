import React, { useState, useEffect } from 'react';
import { Cpu, Smartphone, Wifi, Globe, Zap, Search, Clock, Eye, Plus, X, ArrowRight, TrendingUp, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = [
  { id: "tech", name: "Technologies", color: "bg-blue-600" },
  { id: "smartphones", name: "Smartphones", color: "bg-green-600" },
  { id: "digital", name: "Digital", color: "bg-purple-600" },
  { id: "international", name: "International", color: "bg-red-600" }
];

export default function App() {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('dz_tech_v4');
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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    localStorage.setItem('dz_tech_v4', JSON.stringify(articles));
  }, [articles]);

  // Fonction pour transformer l'image du PC en lien utilisable
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      image: selectedImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800",
      views: 0
    };
    setArticles([newArt, ...articles]);
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const filtered = activeCategory === "all" ? articles : articles.filter(a => a.category === activeCategory);
  const featured = articles.find(a => a.featured) || articles[0];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <div className="bg-gray-950 text-white py-2 text-[10px] font-bold px-4 flex justify-between uppercase">
          <span>1 MAI 2026</span>
          <span className="text-green-500 font-black">DZ TECHNEWS OFFICIEL</span>
      </div>

      <header className="bg-white border-b-4 border-green-600 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-black italic tracking-tighter mb-4 md:mb-0">
            <span className="text-green-600">DZ</span>TECH<span className="text-red-600">NEWS</span>
          </h1>
          <nav className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setActiveCategory("all")} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === 'all' ? 'bg-black text-white' : 'bg-gray-100'}`}>TOUS</button>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === c.id ? c.color + ' text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}>
                {c.name.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-red-600 text-white py-2 overflow-hidden flex relative">
        <div className="bg-red-800 px-4 font-black italic text-xs z-10 flex items-center">FLASH</div>
        <div className="animate-marquee flex gap-10 font-bold uppercase text-xs">
          <span>🔴 Condor Electronics : Nouveau record d'exportation</span>
          <span>🚀 Algérie Télécom déploie la 5G à Oran et Alger</span>
          <span>💰 DZ Pay franchit le million d'utilisateurs</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            {activeCategory === "all" && (
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer border-4 border-white">
                <img src={featured.image} className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-8 flex flex-col justify-end">
                  <span className="bg-green-600 text-white text-[10px] font-black px-3 py-1 rounded w-fit mb-4">À LA UNE</span>
                  <h2 className="text-white text-3xl md:text-5xl font-black mb-2 leading-tight">{featured.title}</h2>
                  <p className="text-gray-200 line-clamp-2 text-sm font-medium">{featured.excerpt}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.filter(a => !a.featured || activeCategory !== "all").map(art => (
                <div key={art.id} className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all">
                  <div className="h-52 w-full overflow-hidden relative">
                    <img src={art.image} className="h-full w-full object-cover transition-transform hover:scale-110 duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">
                      {CATEGORIES.find(c => c.id === art.category)?.name}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-black text-xl mb-3 leading-tight uppercase tracking-tighter">{art.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">{art.excerpt}</p>
                    <div className="mt-auto flex justify-between items-center text-[10px] font-black text-gray-400 border-t pt-4">
                      <span>{art.author} • {art.date}</span>
                      <button className="text-green-600 flex items-center gap-1 font-black">LIRE <ArrowRight size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-red-600 uppercase border-b-2 border-red-50 pb-4">
                <TrendingUp size={22}/> TENDANCES
              </h3>
              <div className="space-y-6">
                {articles.slice(0, 4).map((art, idx) => (
                  <div key={art.id} className="flex gap-4 items-start group cursor-pointer">
                    <span className="text-3xl font-black text-gray-100 group-hover:text-green-600 transition-colors">0{idx+1}</span>
                    <h4 className="font-bold text-sm leading-snug group-hover:text-green-600 transition-colors">{art.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-900 p-8 rounded-[2rem] text-white shadow-xl shadow-green-100">
               <h3 className="text-2xl font-black mb-2 tracking-tighter">Newsletter</h3>
               <p className="text-green-100 text-xs mb-6 font-bold uppercase tracking-widest">L'innovation algérienne en direct.</p>
               <input placeholder="Email" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 outline-none font-bold text-white placeholder:text-white/40" />
               <button className="w-full bg-white text-green-800 font-black py-4 rounded-xl shadow-lg uppercase text-xs">S'abonner</button>
            </div>
          </aside>
        </div>
      </main>

      <button onClick={() => setIsModalOpen(true)} className="fixed bottom-10 right-10 w-20 h-20 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all z-50 border-[6px] border-white group">
        <Plus size={40} strokeWidth={4} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-950/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative border border-gray-100">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-red-600 transition-colors"><X size={32}/></button>
            <h2 className="text-4xl font-black mb-2 tracking-tighter text-gray-900">PUBLIER</h2>
            <p className="text-gray-400 text-xs font-black mb-8 tracking-[0.2em] uppercase">NOUVELLE ACTUALITÉ</p>
            
            <form onSubmit={handleAdd} className="space-y-6">
              <input name="title" placeholder="Titre de l'article" required className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-green-500 outline-none font-bold text-lg" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select name="category" className="w-full p-5 bg-gray-50 rounded-2xl font-black text-gray-600 outline-none border-2 border-transparent focus:border-green-500">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>)}
                </select>
                
                {/* SECTION UPLOAD IMAGE DEPUIS PC */}
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="flex items-center justify-center gap-2 w-full p-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-green-500 transition-all font-bold text-gray-500 text-sm">
                    {selectedImage ? <span className="text-green-600">Image prête ✅</span> : <><ImageIcon size={18}/> Image du PC</>}
                  </label>
                </div>
              </div>

              <textarea name="excerpt" placeholder="Résumé de l'info..." rows="4" className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-green-500 outline-none font-medium"></textarea>
              
              <button type="submit" className="w-full bg-green-600 text-white font-black py-6 rounded-2xl shadow-xl hover:bg-green-700 transition-all uppercase tracking-widest text-sm">Mettre en ligne sur le site</button>
            </form>
          </div>
        </div>
      )}
      
      <footer className="bg-gray-950 text-white py-16 text-center border-t-8 border-green-600">
         <h3 className="text-3xl font-black italic tracking-tighter mb-4">DZ<span className="text-green-600">TECH</span>NEWS</h3>
         <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 • FAIT AVEC ❤️ EN ALGÉRIE</p>
      </footer>
    </div>
  );
}