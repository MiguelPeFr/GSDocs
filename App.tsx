import React, { useState, useEffect, useContext, createContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate, useParams, matchPath } from 'react-router-dom';
import { Menu, X, Box, ChevronRight, ChevronDown, Globe } from 'lucide-react';
import { getCourseData } from './data';
import { Part, Section, Language } from './types';

// Language Context
interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}
const LanguageContext = createContext<LanguageContextType>({ lang: 'es', toggleLang: () => {} });

// Sidebar Component
const Sidebar = ({ 
  isOpen, 
  closeMobile, 
  activeSectionId,
  data
}: { 
  isOpen: boolean; 
  closeMobile: () => void;
  activeSectionId: string;
  data: Part[];
}) => {
  const [expandedParts, setExpandedParts] = useState<string[]>(['part-1', 'part-2', 'part-3', 'part-4', 'part-5']);

  const togglePart = (id: string) => {
    setExpandedParts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl">
          <Box className="w-6 h-6" />
          <span>Docs 3DGS</span>
        </div>
        <button onClick={closeMobile} className="ml-auto lg:hidden text-slate-400">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-2">
        {data.map((part) => (
          <div key={part.id} className="mb-4">
            <button 
              onClick={() => togglePart(part.id)}
              className="flex items-center w-full text-left text-slate-200 font-semibold text-sm py-2 px-2 hover:bg-slate-900 rounded transition"
            >
              {expandedParts.includes(part.id) ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
              {part.title}
            </button>
            
            {expandedParts.includes(part.id) && (
              <div className="ml-2 pl-2 border-l border-slate-800 mt-1 space-y-1">
                {part.sections.map((section) => (
                  <Link 
                    key={section.id} 
                    to={`/section/${section.id}`}
                    onClick={closeMobile}
                    className={`block text-sm py-1.5 px-3 rounded transition-colors ${activeSectionId === section.id ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
                  >
                   {section.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

// Section View Component
const SectionView = () => {
  const { id } = useParams();
  const { lang } = useContext(LanguageContext);
  
  const courseData = getCourseData(lang);

  // Flatten data to find current section
  const allSections = courseData.flatMap(p => p.sections);
  const currentSection = allSections.find(s => s.id === id);
  
  // Find Parent Part
  const parentPart = courseData.find(p => p.sections.some(s => s.id === id));

  // Navigation Logic
  const currentIndex = allSections.findIndex(s => s.id === id);
  const prevSection = currentIndex > 0 ? allSections[currentIndex - 1] : null;
  const nextSection = currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null;

  if (!currentSection) return (
    <div className="p-10 text-center text-slate-500">
      {lang === 'es' ? 'Sección no encontrada. Selecciona un tema en el menú.' : 'Section not found. Please select a topic from the menu.'}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase mb-2 block">
          {parentPart?.title}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          {currentSection.title}
        </h1>
        {parentPart && <p className="text-slate-400 text-lg">{parentPart.description}</p>}
      </div>

      <div className="space-y-12">
        {currentSection.subsections.map((sub) => (
          <div key={sub.id} id={sub.id} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-200 mb-4 flex items-center">
              <span className="text-indigo-500 mr-2">#</span> {sub.title}
            </h2>
            <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed">
              {typeof sub.content === 'string' ? <p>{sub.content}</p> : sub.content}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center gap-4">
        {prevSection ? (
          <Link to={`/section/${prevSection.id}`} className="flex flex-col items-start group">
            <span className="text-xs text-slate-500 uppercase font-bold mb-1 group-hover:text-indigo-400 transition">{lang === 'es' ? 'Anterior' : 'Previous'}</span>
            <span className="text-slate-300 font-medium group-hover:text-white transition flex items-center">
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> {prevSection.title}
            </span>
          </Link>
        ) : <div />}
        
        {nextSection ? (
          <Link to={`/section/${nextSection.id}`} className="flex flex-col items-end group">
            <span className="text-xs text-slate-500 uppercase font-bold mb-1 group-hover:text-indigo-400 transition">{lang === 'es' ? 'Siguiente' : 'Next'}</span>
            <span className="text-slate-300 font-medium group-hover:text-white transition flex items-center">
              {nextSection.title} <ChevronRight className="w-4 h-4 ml-1" />
            </span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};

// Main Layout
const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { lang, toggleLang } = useContext(LanguageContext);
  const data = getCourseData(lang);

  // Use matchPath for robust section detection
  const match = matchPath('/section/:id', pathname);
  const sectionId = match?.params.id || '';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar 
        isOpen={isMobileOpen} 
        closeMobile={() => setIsMobileOpen(false)} 
        activeSectionId={sectionId}
        data={data}
      />
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <header className="h-16 bg-slate-950/80 backdrop-blur border-b border-slate-800 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setIsMobileOpen(true)} className="text-slate-300 p-2 hover:bg-slate-900 rounded -ml-2">
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-indigo-400 font-bold flex items-center gap-2">
              <Box className="w-5 h-5" /> <span>3DGS Docs</span>
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-indigo-500 transition group"
            >
              <Globe className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                 <span className={`${lang === 'es' ? 'text-white' : 'text-slate-600'}`}>ES</span>
                 <span className="text-slate-700">|</span>
                 <span className={`${lang === 'en' ? 'text-white' : 'text-slate-600'}`}>EN</span>
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
          <Routes>
             <Route path="/" element={<Navigate to="/section/1" replace />} />
             <Route path="/section/:id" element={<SectionView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  
  const toggleLang = () => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      <HashRouter>
        <Layout />
      </HashRouter>
    </LanguageContext.Provider>
  );
}