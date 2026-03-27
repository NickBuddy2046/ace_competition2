import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  Info, 
  ChevronRight, 
  ExternalLink,
  Award,
  ShieldCheck,
  Zap,
  Users,
  Facebook,
  Instagram,
  Calendar,
  TrendingDown,
  Minus,
  Menu,
  X
} from 'lucide-react';
import { RankingItem, SymbolItem, CharacterItem, PlayerRankingItem } from './types';

// --- Mock Data ---
const initialRankings: PlayerRankingItem[] = [
  { 
    id: 'ea-1', rank: 1, playerName: 'ALEX99', amount: 125430.50, percentage: 100, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'KIRIN', percentage: 60, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'PHOENIX', percentage: 40, color: 'from-blue-600 via-cyan-400 to-blue-600' }
    ]
  },
  { 
    id: 'ea-2', rank: 2, playerName: 'TRADER', amount: 98765.20, percentage: 78.74, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'PHOENIX', percentage: 70, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'COBRA', percentage: 30, color: 'from-purple-600 via-fuchsia-400 to-purple-600' }
    ]
  },
  { 
    id: 'ea-3', rank: 3, playerName: 'CRYPTO', amount: 85432.10, percentage: 68.11, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'COBRA', percentage: 50, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'LOTTO', percentage: 50, color: 'from-green-600 via-emerald-400 to-green-600' }
    ]
  },
  { 
    id: 'ea-4', rank: 4, playerName: 'BULLRN', amount: 72100.00, percentage: 57.48, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'LOTTO', percentage: 100, color: 'from-orange-600 via-yellow-400 to-orange-600' }
    ]
  },
  { 
    id: 'ea-5', rank: 5, playerName: 'MOONBY', amount: 65430.80, percentage: 52.16, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'BUBO', percentage: 80, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'FALCON', percentage: 20, color: 'from-red-600 via-rose-400 to-red-600' }
    ]
  },
  { 
    id: 'ea-6', rank: 6, playerName: 'WHALE1', amount: 58900.40, percentage: 46.95, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'FALCON', percentage: 60, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'WIZARD', percentage: 40, color: 'from-indigo-600 via-violet-400 to-indigo-600' }
    ]
  },
  { 
    id: 'ea-7', rank: 7, playerName: 'SNIPER', amount: 52100.90, percentage: 41.53, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'WIZARD', percentage: 90, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'KIRIN', percentage: 10, color: 'from-pink-600 via-pink-400 to-pink-600' }
    ]
  },
  { 
    id: 'ea-8', rank: 8, playerName: 'PROBOT', amount: 48500.20, percentage: 38.66, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'KIRIN', percentage: 40, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'PHOENIX', percentage: 30, color: 'from-teal-600 via-teal-400 to-teal-600' },
      { eaId: 'COBRA', percentage: 30, color: 'from-blue-600 via-cyan-400 to-blue-600' }
    ]
  },
  { 
    id: 'ea-9', rank: 9, playerName: 'ALPHA', amount: 42300.10, percentage: 33.72, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'PHOENIX', percentage: 100, color: 'from-orange-600 via-yellow-400 to-orange-600' }
    ]
  },
  { 
    id: 'ea-10', rank: 10, playerName: 'OMEGA', amount: 38900.50, percentage: 31.01, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'COBRA', percentage: 50, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'LOTTO', percentage: 50, color: 'from-green-600 via-emerald-400 to-green-600' }
    ]
  },
];

const characters: CharacterItem[] = [
  { name: 'KIRIN', imageUrl: '/ea/Kirin.png' },
  { name: 'PHOENIX', imageUrl: '/ea/Phoenix.png' },
  { name: 'COBRA', imageUrl: '/ea/Cobra.png' },
  { name: 'LOTTO', imageUrl: '/ea/Lotto.png' },
  { name: 'BUBO', imageUrl: '/ea/Bubo.png' },
  { name: 'FALCON', imageUrl: '/ea/Falcon.png' },
  { name: 'PYTHON', imageUrl: '/ea/Python.png' },
  { name: 'WIZARD', imageUrl: '/ea/Wizard.png' },
];

const symbols: SymbolItem[] = [
  { symbol: 'BTCUSD', percentage: 100 },
  { symbol: 'XAUUSD', percentage: 85.5 },
  { symbol: 'ETHUSD', percentage: 72.3 },
  { symbol: 'SOLUSD', percentage: 58.1 },
  { symbol: 'USDCAD', percentage: 45.9 },
  { symbol: 'GBPNZD', percentage: 32.4 },
  { symbol: 'TRUMP', percentage: 25.8 },
  { symbol: 'EURSGD', percentage: 18.2 },
  { symbol: 'GBPAUD', percentage: 12.5 },
  { symbol: 'Other', percentage: 5.0 },
];

// --- Sub-components ---

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number;
    const duration = 1000; // 1 second animation
    const startValue = displayValue;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(startValue + (endValue - startValue) * easeProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return <>{displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>;
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-8 md:mb-12 relative px-4">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-widest italic uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-3">
      {children}
    </h2>
    {subtitle && (
      <p className="text-yellow-500 font-mono text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-md">
        {subtitle}
      </p>
    )}
    <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4 md:mt-6 opacity-80" />
  </div>
);



const StackedEnergyBar: React.FC<{ 
  totalPercentage: number; 
  breakdown: { eaId: string; percentage: number; color: string }[]; 
  className?: string; 
  skewClass?: string; 
  reverse?: boolean; 
  responsive?: boolean; 
  cw?: number 
}> = ({ totalPercentage, breakdown, className = '', skewClass = 'skew-x-[-30deg]', reverse = false, responsive = false, cw = 10 }) => {
  const clampedPercentage = Math.max(0, Math.min(100, totalPercentage));

  return (
    <div className={`relative flex flex-col items-start ${className}`}>
      {/* Bar Container */}
      <div 
        className={`relative w-full ${responsive ? '' : 'h-[12px] md:h-[16px]'} ${skewClass} overflow-hidden bg-slate-200/80 border border-slate-300 shadow-inner rounded-sm`}
        style={responsive ? { height: `${1.4 * cw}px` } : {}}
      >
        {/* Fill */}
        <div 
          className={`absolute top-0 ${reverse ? 'right-0' : 'left-0'} h-full flex ${reverse ? 'flex-row-reverse' : 'flex-row'} transition-all duration-1000 ease-out`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {breakdown.map((segment, idx) => (
            <div 
              key={idx}
              className={`h-full bg-gradient-to-r ${segment.color} relative overflow-hidden border-r border-white/30 last:border-r-0`}
              style={{ width: `${segment.percentage}%` }}
            >
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent ${reverse ? 'animate-sweep-reverse' : 'animate-sweep'}`} />
            </div>
          ))}
        </div>
        {/* Inner highlight for 3D effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 pointer-events-none" />
      </div>
    </div>
  );
};



const SymbolProgress: React.FC<{ symbol: string, percentage: number }> = ({ symbol, percentage }) => {
  const segments = 20;
  const activeSegments = Math.round((percentage / 100) * segments);

  return (
    <div className="flex items-center gap-2 sm:gap-4 mb-2 justify-center w-full">
      <div 
        className="w-[60px] sm:w-[80px] md:w-[100px] flex-shrink-0 text-right text-black drop-shadow-sm" 
        style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(10px, 3vw, 16px)' }}
      >
        {symbol}
      </div>
      
      <div className="flex-1 min-w-0 max-w-[600px] bg-[#1a1a1a] p-[2px] sm:p-[3px] rounded-md flex gap-[1px] sm:gap-[2px] border-[2px] sm:border-[4px] border-[#1a1a1a] shadow-lg">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeSegments;
          return (
            <div 
              key={i} 
              className="flex-1 h-[20px] sm:h-[28px] md:h-[32px] rounded-sm transition-all duration-500 min-w-[4px]"
              style={{ 
                background: isActive 
                  ? 'linear-gradient(to bottom, #7CFC00, #228B22)' 
                  : 'linear-gradient(to bottom, #c0c0c0, #606060)',
                boxShadow: isActive ? 'inset 0 1px 1px rgba(255,255,255,0.5), 0 0 5px rgba(124,252,0,0.5)' : 'inset 0 1px 1px rgba(255,255,255,0.3)',
                transitionDelay: `${i * 20}ms`
              }}
            />
          );
        })}
      </div>
      
      <div 
        className="w-[50px] sm:w-[65px] md:w-[80px] flex-shrink-0 text-left text-black font-bold drop-shadow-sm"
        style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: 'clamp(10px, 3vw, 18px)' }}
      >
        {percentage.toFixed(1).padStart(5, '0')}%
      </div>
    </div>
  );
};

const CountdownBox = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-slate-900 border border-slate-700 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black italic gold-glow mb-1 sm:mb-2 min-w-[48px] min-h-[48px]">
      {value}
    </div>
    <span className="text-[8px] sm:text-[10px] uppercase tracking-tighter text-slate-500 font-bold">{label}</span>
  </div>
);

// --- Ad Components ---

const PopupAd = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-[600px] w-full" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-lg z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img 
            src="/ibpromotion/Static_20th_anniversery-600x425-English-GOMU.jpg" 
            alt="20th Anniversary Promotion" 
            className="w-full h-auto rounded-2xl shadow-2xl cursor-pointer hover:opacity-95 transition-opacity"
          />
        </a>
      </div>
    </motion.div>
  );
};

const SideAds = () => {
  return (
    <>
      {/* Left Side Ad */}
      <div className="hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 z-30">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img 
            src="/ibpromotion/Static_catch_the_golden_opportunity-300x600-English-GOMU.jpg" 
            alt="Catch the Golden Opportunity" 
            className="w-[150px] 2xl:w-[180px] h-auto rounded-xl shadow-2xl cursor-pointer hover:opacity-90 transition-opacity"
          />
        </a>
      </div>
      {/* Right Side Ad */}
      <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-30">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img 
            src="/ibpromotion/Static_catch_the_golden_opportunity-300x600-English-GOMU.jpg" 
            alt="Catch the Golden Opportunity" 
            className="w-[150px] 2xl:w-[180px] h-auto rounded-xl shadow-2xl cursor-pointer hover:opacity-90 transition-opacity"
          />
        </a>
      </div>
    </>
  );
};

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: 'home' | 'annual' | 'monthly') => void }) => {
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setLeaderboardOpen(false);
    setResultsOpen(false);
    
    const NAVBAR_HEIGHT = 80; // 固定導航欄高度 + 間距
    
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 150);
      return;
    }
    
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const goTo = (page: 'annual' | 'monthly', sectionId?: string) => {
    setLeaderboardOpen(false);
    setResultsOpen(false);
    setCurrentPage(page);
    
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const NAVBAR_HEIGHT = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const navBtn = "font-bold transition-colors cursor-pointer text-sm tracking-wide text-white hover:text-yellow-500";
  const activeBtn = "font-bold cursor-pointer text-sm tracking-wide text-yellow-500";
  const dropdownItem = "block w-full text-left px-4 py-2 text-sm font-bold text-white hover:text-yellow-500 hover:bg-white/5 transition-colors whitespace-nowrap";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-yellow-500/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <div className="cursor-pointer max-w-[120px] sm:max-w-[140px] md:max-w-[160px]" onClick={() => scrollTo('home')}>
            <img src="/bg/ACE Fortune Logo B1a.png?v=3" alt="ACE Fortune Logo" className="h-7 sm:h-8 md:h-9 w-full object-contain" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home */}
          <button onClick={() => scrollTo('home')} className={currentPage === 'home' ? activeBtn : navBtn}>
            Home
          </button>

          {/* Leaderboard dropdown */}
          <div className="relative">
            <button
              onClick={() => { setLeaderboardOpen(o => !o); setResultsOpen(false); }}
              className={`${navBtn} flex items-center gap-1`}
            >
              Leaderboard
              <ChevronRight className={`w-3 h-3 transition-transform ${leaderboardOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
            {leaderboardOpen && (
              <div className="absolute top-full left-0 mt-2 bg-black border border-yellow-500/20 rounded-xl shadow-2xl py-1 min-w-[220px]">
                <button onClick={() => scrollTo('月總排名')} className={dropdownItem}>月總排名</button>
                <button onClick={() => scrollTo('月程式排名')} className={dropdownItem}>月程式排名</button>
                <button onClick={() => scrollTo('symbols')} className={dropdownItem}>Most Used Symbols</button>
              </div>
            )}
          </div>

          {/* Results dropdown */}
          <div className="relative">
            <button
              onClick={() => { setResultsOpen(o => !o); setLeaderboardOpen(false); }}
              className={`${currentPage === 'annual' || currentPage === 'monthly' ? activeBtn : navBtn} flex items-center gap-1`}
            >
              Results
              <ChevronRight className={`w-3 h-3 transition-transform ${resultsOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
            {resultsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-black border border-yellow-500/20 rounded-xl shadow-2xl py-1 min-w-[180px]">
                <button onClick={() => goTo('annual', 'annual-results')} className={dropdownItem}>Annual Results</button>
                <button onClick={() => goTo('monthly', 'monthly-results')} className={dropdownItem}>Monthly Results</button>
              </div>
            )}
          </div>

          {/* 官方比賽細則 */}
          <button onClick={() => scrollTo('rules')} className={navBtn}>官方比賽細則</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden flex-1 justify-end">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-yellow-500 hover:text-white transition-colors p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Social Icons - Desktop Only */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-6">
          <a href="https://www.facebook.com/acefortuneresearch" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="https://www.instagram.com/ace_fortune_research/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-yellow-500/20 shadow-2xl py-4 px-6">
          <div className="flex flex-col gap-4">
            <button onClick={() => { scrollTo('home'); setMobileMenuOpen(false); }} className={currentPage === 'home' ? activeBtn : navBtn}>
              Home
            </button>
            <button onClick={() => { scrollTo('月總排名'); setMobileMenuOpen(false); }} className={navBtn}>
              月總排名
            </button>
            <button onClick={() => { scrollTo('月程式排名'); setMobileMenuOpen(false); }} className={navBtn}>
              月程式排名
            </button>
            <button onClick={() => { scrollTo('symbols'); setMobileMenuOpen(false); }} className={navBtn}>
              Most Used Symbols
            </button>
            <div className="border-t border-yellow-500/20 pt-4 mt-2">
              <p className="text-yellow-500/60 text-xs font-bold mb-2 uppercase tracking-wider">Results</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { goTo('annual', 'annual-results'); setMobileMenuOpen(false); }} className={navBtn}>
                  Annual Results
                </button>
                <button onClick={() => { goTo('monthly', 'monthly-results'); setMobileMenuOpen(false); }} className={navBtn}>
                  Monthly Results
                </button>
              </div>
            </div>
            <button onClick={() => { scrollTo('rules'); setMobileMenuOpen(false); }} className={navBtn}>
              官方比賽細則
            </button>
            <div className="flex items-center gap-4 pt-4 border-t border-yellow-500/20">
              <a href="https://www.facebook.com/acefortuneresearch" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/ace_fortune_research/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdowns on outside click */}
      {(leaderboardOpen || resultsOpen || mobileMenuOpen) && (
        <div className="fixed inset-0 z-[-1]" onClick={() => { setLeaderboardOpen(false); setResultsOpen(false); setMobileMenuOpen(false); }} />
      )}
    </nav>
  );
}

const DUMMY_USERS = [
  "ALEX99", "TRADER", "CRYPTO", "BULLRN", "MOONBY", 
  "WHALE1", "SNIPER", "PROBOT", "ALPHA", "OMEGA"
];

const useWindowSize = () => {
  const [size, setSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1024, height: typeof window !== 'undefined' ? window.innerHeight : 768 });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
};

const TotalRankingList = ({ rankings, isStatic = false, compact = false }: { rankings: PlayerRankingItem[], isStatic?: boolean, compact?: boolean }) => {
  const { height, width } = useWindowSize();
  // Available height: subtract navbar (~64px), title+subtitle (~120px), container padding (~64px), gaps (9 * gap)
  const ROWS = 10;
  const RESERVED = 64 + 120 + 64;
  const GAP = compact ? 4 : 4;
  const availableH = height - RESERVED - (ROWS - 1) * GAP;
  // On mobile, use fixed smaller row height; on desktop, use dynamic calculation
  const isMobile = width < 640;
  const rowH = isMobile ? 56 : Math.max(52, Math.floor(availableH / ROWS));
  const iconSize = Math.max(24, Math.min(48, rowH * 0.7));
  const fontSize = isMobile ? 12 : Math.max(13, Math.min(20, rowH * 0.38));
  const coinSize = Math.max(18, Math.min(36, rowH * 0.45));
  const amountSize = isMobile ? 13 : Math.max(13, Math.min(24, rowH * 0.42));
  const py = Math.max(4, Math.floor((rowH - iconSize) / 2));

  return (
    <div className="flex flex-col w-full relative z-10" style={{ gap: `${GAP}px` }}>
      {rankings.map((item) => {
        return (
          <div 
            key={item.id} 
            className="flex items-center w-full relative z-0 hover:z-50 bg-gradient-to-br from-amber-50/95 to-yellow-100/90 backdrop-blur-md rounded-xl shadow-sm border border-yellow-200/60 hover:shadow-md transition-shadow"
            style={{ paddingTop: `${py}px`, paddingBottom: `${py}px`, paddingLeft: '10px', paddingRight: '10px' }}
          >
            {/* 排名 Icon */}
            <div className="flex-shrink-0 flex items-center justify-center relative z-20" style={{ width: `${iconSize + 8}px` }}>
              <div className="relative flex items-center justify-center">
                {item.rank === 1 && <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50 rounded-full scale-150 animate-pulse"></div>}
                {item.rank === 2 && <div className="absolute inset-0 bg-slate-300 blur-md opacity-50 rounded-full scale-125 animate-pulse"></div>}
                {item.rank === 3 && <div className="absolute inset-0 bg-amber-600 blur-md opacity-50 rounded-full scale-110 animate-pulse"></div>}
                {item.rank <= 10 ? (
                  <img src={`/bg/toptenimage/tops${item.rank}.png?v=2`} alt={`Rank ${item.rank}`} className="relative z-10 object-contain drop-shadow-lg" style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
                ) : (
                  <span className="font-black italic text-slate-400" style={{ fontFamily: 'Impact, sans-serif', fontSize: `${fontSize * 1.5}px` }}>{item.rank}</span>
                )}
              </div>
            </div>

            {/* 升跌標誌 */}
            <div className="flex-shrink-0 flex items-center justify-center" style={{ width: `${fontSize + 8}px`, paddingLeft: '4px' }}>
              {item.rankChange === 'up' && <TrendingUp className="text-green-500" style={{ width: `${fontSize + 2}px`, height: `${fontSize + 2}px` }} strokeWidth={3} />}
              {item.rankChange === 'down' && <TrendingDown className="text-red-500" style={{ width: `${fontSize + 2}px`, height: `${fontSize + 2}px` }} strokeWidth={3} />}
              {item.rankChange === 'none' && <Minus className="text-slate-400" style={{ width: `${fontSize + 2}px`, height: `${fontSize + 2}px` }} strokeWidth={3} />}
            </div>

            {/* 用戶名 - 固定寬度約25字 */}
            <div className="flex-shrink-0 font-black text-slate-800 tracking-tight whitespace-nowrap border-l border-slate-200/80 truncate" style={{ fontSize: `${fontSize}px`, paddingLeft: '8px', paddingRight: '8px', width: isMobile ? '140px' : '230px' }}>
              {item.playerName}
            </div>

            {/* EA Coins + 能量條 - 自動填充剩餘空間 */}
            <div className="flex-1 flex flex-col justify-center min-w-[80px] sm:min-w-0" style={{ paddingLeft: '6px', paddingRight: '6px', gap: '2px' }}>
              <div className="flex items-center" style={{ gap: '2px' }}>
                {[...item.eaBreakdown]
                  .sort((a, b) => b.percentage - a.percentage)
                  .slice(0, 3)
                  .map((ea, idx) => {
                  const coinName = ea.eaId.charAt(0).toUpperCase() + ea.eaId.slice(1).toLowerCase() + 'Coin.png';
                  return (
                    <div key={idx} className="relative group">
                      <img src={`/eacoin/${coinName}`} alt={ea.eaId} className="object-contain drop-shadow cursor-help hover:scale-110 transition-transform" style={{ width: `${coinSize}px`, height: `${coinSize}px` }} />
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {ea.eaId}
                      </div>
                    </div>
                  );
                })}
              </div>
              <StackedEnergyBar totalPercentage={item.percentage || 0} breakdown={item.eaBreakdown} className="w-full" skewClass="skew-x-[-20deg]" />
            </div>

            {/* 金額 - 固定寬度 */}
            <div className="flex-shrink-0 flex items-center justify-end" style={{ width: isMobile ? '100px' : '160px' }}>
              <div className="font-black italic tracking-tighter text-white whitespace-nowrap tabular-nums leading-none"
                style={{ fontSize: `${amountSize}px`, WebkitTextStroke: isMobile ? '0.5px #000080' : '1px #000080', textShadow: '0 0 10px rgba(0,0,255,0.8), 2px 2px 4px rgba(0,0,0,0.9)' }}>
                $ {isStatic ? item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : <AnimatedNumber value={item.amount} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const EARankingList = ({ rankings, isStatic = false, compact = false }: { rankings: RankingItem[], isStatic?: boolean, compact?: boolean }) => {
  return (
    <div className="flex flex-col gap-1 md:gap-0 px-1 sm:px-2 md:px-8">
      <AnimatePresence>
        {rankings.map((item) => (
          <motion.div 
            layout 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            key={item.id} 
            className={`grid grid-cols-[auto_auto_1fr_auto_auto] gap-x-2 sm:gap-x-3 md:gap-x-6 items-center py-2 md:py-1 hover:bg-white/40 rounded-xl px-1 sm:px-2 -mx-1 sm:-mx-2 transition-colors duration-200 cursor-default border-b border-slate-300/30 last:border-0 relative z-0 hover:z-50 ${
              compact 
                ? 'mb-1' 
                : item.rank === 1 ? 'mb-12 md:mb-16 mt-8 md:mt-12' : 
                  item.rank === 2 ? 'mb-8 md:mb-12' : 
                  item.rank === 3 ? 'mb-6 md:mb-8' : 
                  item.rank >= 4 && item.rank <= 6 ? 'mb-4 md:mb-6' : 
                  ''
            }`}
          >
          <div className={`flex justify-center items-center flex-shrink-0 ${compact ? 'w-10 sm:w-12 md:w-20' : 'w-16 sm:w-20 md:w-48'}`}>
            {item.rank <= 10 ? (
              <div className="relative flex items-center justify-center">
                {/* Glow effect for top 3 */}
                {!compact && item.rank === 1 && <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-60 rounded-full scale-[2.5] sm:scale-[3] md:scale-[4] animate-pulse"></div>}
                {!compact && item.rank === 2 && <div className="absolute inset-0 bg-slate-300 blur-lg opacity-60 rounded-full scale-[2] sm:scale-[2.5] md:scale-[3] animate-pulse"></div>}
                {!compact && item.rank === 3 && <div className="absolute inset-0 bg-amber-600 blur-lg opacity-60 rounded-full scale-[1.5] sm:scale-[2] md:scale-[2.5] animate-pulse"></div>}
                
                <img 
                  src={`/bg/toptenimage/tops${item.rank}.png?v=2`} 
                  alt={`Rank ${item.rank}`} 
                  className={`relative z-10 object-contain drop-shadow-md transition-transform ${
                    compact 
                      ? 'w-6 h-6 sm:w-8 sm:h-8 scale-100' 
                      : item.rank === 1 ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 scale-[2] sm:scale-[2.5] md:scale-[3.5] drop-shadow-[0_0_20px_rgba(250,204,21,1)]' :
                        item.rank === 2 ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 scale-[1.6] sm:scale-[2] md:scale-[2.5] drop-shadow-[0_0_15px_rgba(148,163,184,0.9)]' :
                        item.rank === 3 ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 scale-[1.4] sm:scale-[1.6] md:scale-[2.0] drop-shadow-[0_0_15px_rgba(217,119,6,0.9)]' :
                        item.rank >= 4 && item.rank <= 6 ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 scale-[1.2] sm:scale-[1.4] md:scale-[1.7]' : 
                        'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
                  }`}
                />
              </div>
            ) : (
              <span className={`font-black italic text-slate-400 ${compact ? 'text-base sm:text-lg md:text-2xl' : 'text-xl sm:text-2xl md:text-4xl'}`} style={{ fontFamily: 'Impact, sans-serif' }}>
                {item.rank}
              </span>
            )}
          </div>
          <div className="w-4 sm:w-5 md:w-6 flex justify-center items-center flex-shrink-0">
            {item.rankChange === 'up' && <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 drop-shadow-sm" strokeWidth={3} />}
            {item.rankChange === 'down' && <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 drop-shadow-sm" strokeWidth={3} />}
            {item.rankChange === 'none' && <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 drop-shadow-sm" strokeWidth={3} />}
          </div>
          <div className={`flex items-center pl-1 sm:pl-2 md:pl-4 min-w-0 ${compact ? 'gap-1 md:gap-2' : 'gap-2 sm:gap-3 md:gap-6'}`}>
            <span 
              className={`font-black text-slate-800 tracking-wider sm:tracking-widest uppercase text-left leading-none truncate ${compact ? 'text-sm sm:text-base md:text-2xl' : 'text-xl sm:text-2xl md:text-4xl'}`}
            >
              {item.eaId.substring(0, 6).toUpperCase()}
            </span>
          </div>
          <span 
            className={`font-black text-slate-800 leading-none text-right opacity-80 flex-shrink-0 ${compact ? 'text-sm sm:text-base md:text-xl' : 'text-lg sm:text-xl md:text-3xl'}`}
          >
            $
          </span>
          <span 
            className={`font-black text-slate-900 tracking-tight text-right leading-none tabular-nums whitespace-nowrap flex-shrink-0 ${compact ? 'text-xs sm:text-sm md:text-xl w-[70px] sm:w-[90px] md:w-[140px]' : 'text-lg sm:text-xl md:text-3xl w-[100px] sm:w-[130px] md:w-[220px]'}`}
          >
            {isStatic ? item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : <AnimatedNumber value={item.amount} />}
          </span>
        </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const marqueeImages = [
  '/eabit/Cobra_bit.png',
  '/eabit/Falcon_bit.png',
  '/eabit/Python_bit.png',
  '/eabit/Tiger_bit.png',
  '/eabit/bubo_bit.png',
  '/eabit/gekco_bit.png',
  '/eabit/kirin_bit.png',
  '/eabit/lotto_bit.png',
  '/eabit/shark_bit.png',
  '/eabit/Wizard_bit.png',
  '/eabit/Phoenix_bit.png'
];

// Create an array large enough to loop seamlessly (4 sets of images)
const marqueeContent = [...marqueeImages, ...marqueeImages, ...marqueeImages, ...marqueeImages];

const StatisticsPanel = () => {
  const [stats, setStats] = useState({
    volume: 48320.75,
    participants: 312,
    orders: 18540,
    profit: 1_284_673.42,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        volume: prev.volume + Math.random() * 12.5,
        participants: prev.participants + (Math.random() > 0.85 ? 1 : 0),
        orders: prev.orders + Math.floor(Math.random() * 8),
        profit: prev.profit + Math.random() * 850,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-12 relative overflow-hidden flex flex-col gap-6 py-4">
      {/* Top Marquee */}
      <div 
        className="relative flex overflow-x-hidden w-full h-16"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex w-max animate-marquee-left items-center">
          {marqueeContent.map((src, idx) => (
            <img key={`top-${idx}`} src={src} alt="EA Bit" className="h-12 w-auto mx-4 object-contain opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          ))}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-6xl mx-auto z-10 px-4">
        <div className="metallic-card rounded-2xl p-4 flex flex-col items-center justify-center border border-yellow-500/30 text-center shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <p className="text-yellow-500 font-mono text-xs tracking-widest mb-1 relative z-10">Total Volume(Lots)</p>
          <h4 className="font-black italic tracking-tighter text-white relative z-10 tabular-nums w-full text-center overflow-hidden"
            style={{ fontFamily: 'Impact, sans-serif', fontSize: 'clamp(14px, 2.5vw, 32px)', WebkitTextStroke: '0.8px #000080', textShadow: '0 0 4px #fff, 0 0 10px rgba(0,0,255,0.6), 1px 1px 3px rgba(0,0,0,0.9)', letterSpacing: '0.02em' }}>
            <AnimatedNumber value={stats.volume} />
          </h4>
        </div>
        <div className="metallic-card rounded-2xl p-4 flex flex-col items-center justify-center border border-yellow-500/30 text-center shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <p className="text-yellow-500 font-mono text-xs tracking-widest mb-1 relative z-10">Total Participants</p>
          <h4 className="font-black italic tracking-tighter text-white relative z-10 tabular-nums w-full text-center overflow-hidden"
            style={{ fontFamily: 'Impact, sans-serif', fontSize: 'clamp(14px, 2.5vw, 32px)', WebkitTextStroke: '0.8px #000080', textShadow: '0 0 4px #fff, 0 0 10px rgba(0,0,255,0.6), 1px 1px 3px rgba(0,0,0,0.9)', letterSpacing: '0.02em' }}>
            {stats.participants.toLocaleString('en-US')}
          </h4>
        </div>
        <div className="metallic-card rounded-2xl p-4 flex flex-col items-center justify-center border border-yellow-500/30 text-center shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <p className="text-yellow-500 font-mono text-xs tracking-widest mb-1 relative z-10">Total Orders</p>
          <h4 className="font-black italic tracking-tighter text-white relative z-10 tabular-nums w-full text-center overflow-hidden"
            style={{ fontFamily: 'Impact, sans-serif', fontSize: 'clamp(14px, 2.5vw, 32px)', WebkitTextStroke: '0.8px #000080', textShadow: '0 0 4px #fff, 0 0 10px rgba(0,0,255,0.6), 1px 1px 3px rgba(0,0,0,0.9)', letterSpacing: '0.02em' }}>
            {stats.orders.toLocaleString('en-US')}
          </h4>
        </div>
        <div className="metallic-card rounded-2xl p-4 flex flex-col items-center justify-center border border-yellow-500/30 text-center shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <p className="text-yellow-500 font-mono text-xs tracking-widest mb-1 relative z-10">Total Profit</p>
          <h4 className="font-black italic tracking-tighter text-white relative z-10 tabular-nums w-full text-center overflow-hidden"
            style={{ fontFamily: 'Impact, sans-serif', fontSize: 'clamp(12px, 1.8vw, 28px)', WebkitTextStroke: '0.8px #000080', textShadow: '0 0 4px #fff, 0 0 10px rgba(0,0,255,0.6), 1px 1px 3px rgba(0,0,0,0.9)', letterSpacing: '0.02em' }}>
            $ <AnimatedNumber value={stats.profit} />
          </h4>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div 
        className="relative flex overflow-x-hidden w-full h-16"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex w-max animate-marquee-right items-center">
          {marqueeContent.map((src, idx) => (
            <img key={`bottom-${idx}`} src={src} alt="EA Bit" className="h-12 w-auto mx-4 object-contain opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          ))}
        </div>
      </div>
    </div>
  );
};

const SymbolsSection = ({ symbolsData }: { symbolsData: SymbolItem[] }) => {
  return (
    <section id="symbols" className="scroll-mt-24 px-2 sm:px-4">
      <SectionTitle subtitle="TRADING ASSETS DISTRIBUTION">Most Used Symbols</SectionTitle>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full rounded-2xl p-3 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden" style={{
          background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.5)'
        }}>
          {/* Add some abstract background shapes to match the image */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
          }}></div>
          <div className="relative z-10 flex flex-col gap-1 w-full">
            {symbolsData.map((s) => (
              <motion.div layout transition={{ type: 'spring', stiffness: 300, damping: 30 }} key={s.symbol}>
                <SymbolProgress symbol={s.symbol} percentage={s.percentage} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <StatisticsPanel />
    </section>
  );
};

const AnnualResults = ({ onBack, symbolsData }: { onBack: () => void, symbolsData: SymbolItem[] }) => {
  // Generate mock annual rankings (larger numbers)
  const annualRankings = initialRankings.map(item => ({
    ...item,
    amount: item.amount * 12 + Math.floor(Math.random() * 50000),
  })).sort((a, b) => b.amount - a.amount);
  
  const maxAmount = annualRankings[0].amount;
  const finalAnnualRankings = annualRankings.map((item, index) => ({
    ...item,
    rank: index + 1,
    percentage: Math.max(15, (item.amount / maxAmount) * 100)
  }));

  // Generate mock annual EA rankings
  const annualEARankings = DUMMY_USERS.map((user, index) => {
    const amount = 800000 - (index * 60000) + Math.floor(Math.random() * 20000);
    return {
      id: `annual-ea-${index}`,
      rank: index + 1,
      playerName: user,
      eaId: characters[index % characters.length].name,
      amount: amount,
      percentage: Math.max(15, (amount / 800000) * 100),
      rankChange: ['up', 'down', 'none'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'none'
    };
  }).sort((a, b) => b.amount - a.amount).map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <>
      {/* Top Banner Image */}
      <div className="w-full bg-black relative">
        <button 
          onClick={onBack}
          className="absolute top-16 sm:top-20 left-2 sm:left-4 md:left-8 flex items-center gap-1 sm:gap-2 text-yellow-500 hover:text-yellow-400 transition-colors pointer-events-auto bg-black/70 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-yellow-500/30 z-20 text-xs sm:text-sm min-h-[44px]"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 rotate-180" />
          <span className="font-bold tracking-wider hidden sm:inline">BACK TO HOME</span>
          <span className="font-bold tracking-wider sm:hidden">BACK</span>
        </button>
        <img 
          src="/bg/ACE _topbanner.png" 
          alt="Annual Results Banner" 
          className="w-full h-auto block"
        />
      </div>

      {/* Title Bar */}
      <div id="annual-results" className="w-full bg-black py-2 px-2 sm:px-4 flex items-center justify-center scroll-mt-24">
        <h1 className="font-black italic tracking-tighter uppercase text-yellow-500 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight text-center"
          style={{ WebkitTextStroke: '1px #000', textShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>
          ANNUAL RESULTS
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full"
        style={{ backgroundImage: "url('/bg/Ace_BackGround2.png')", backgroundSize: '100% auto', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
      <main className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        <div className="text-center mb-16 relative">
        <p className="text-xl md:text-2xl text-slate-300 font-bold tracking-widest">2026.05 - 2027.04</p>
      </div>

      <section className="mb-12 md:mb-24">
        <SectionTitle subtitle="SPECIAL AWARDS">年度特別大獎</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Award 1 - Highest Profit */}
          <div className="flex flex-col items-center group">
            <div className="clip-banner bg-gradient-to-b from-slate-300 to-slate-500 p-1 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] aspect-[1/1.4] relative transition-transform duration-500 group-hover:-translate-y-4 md:mt-12 shadow-2xl">
              <div className="clip-banner w-full h-full relative overflow-hidden bg-slate-900">
                {/* Coin 背景图 */}
                <img src="/eacoin/KirinCoin.png" alt="Kirin Coin" className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                {/* 顶部图标和标题 */}
                <div className="absolute top-4 sm:top-5 md:top-6 left-0 right-0 flex flex-col items-center px-3">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-slate-300 mb-2 drop-shadow-[0_0_10px_rgba(203,213,225,0.8)]" />
                  <h3 className="text-base sm:text-lg md:text-xl font-black italic text-white text-center leading-tight drop-shadow-lg">HIGHEST<br/>PROFIT</h3>
                </div>
                {/* 底部信息 */}
                <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-0 right-0 text-center px-2">
                  <p className="text-slate-300 font-bold text-sm sm:text-base md:text-lg tracking-widest drop-shadow-lg mb-1">KIRIN</p>
                  <p className="text-yellow-400 font-black text-xs sm:text-sm md:text-base tracking-wider drop-shadow-lg truncate">ALEX99</p>
                </div>
              </div>
            </div>
          </div>

          {/* Award 2 - Best EA of the Year (Center, larger) */}
          <div className="flex flex-col items-center group sm:col-span-2 md:col-span-1">
            <div className="clip-banner bg-gradient-to-b from-yellow-400 to-amber-600 p-1 w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] aspect-[1/1.4] relative transition-transform duration-500 group-hover:-translate-y-4 z-10 shadow-2xl">
              <div className="clip-banner w-full h-full relative overflow-hidden bg-slate-900">
                {/* Coin 背景图 */}
                <img src="/eacoin/PhoenixCoin.png" alt="Phoenix Coin" className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                {/* 顶部图标和标题 */}
                <div className="absolute top-5 sm:top-6 md:top-7 left-0 right-0 flex flex-col items-center px-3">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-yellow-400 mb-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black italic text-white text-center leading-tight drop-shadow-lg">BEST EA<br/>OF THE YEAR</h3>
                </div>
                {/* 底部信息 */}
                <div className="absolute bottom-5 sm:bottom-6 md:bottom-7 left-0 right-0 text-center px-2">
                  <p className="text-yellow-400 font-black text-base sm:text-lg md:text-xl tracking-widest drop-shadow-lg mb-1">PHOENIX</p>
                  <p className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wider drop-shadow-lg truncate">TRADER</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Award 3 - Most Popular */}
          <div className="flex flex-col items-center group">
            <div className="clip-banner bg-gradient-to-b from-amber-700 to-orange-900 p-1 w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] aspect-[1/1.4] relative transition-transform duration-500 group-hover:-translate-y-4 md:mt-12 shadow-2xl">
              <div className="clip-banner w-full h-full relative overflow-hidden bg-slate-900">
                {/* Coin 背景图 */}
                <img src="/eacoin/CobraCoin.png" alt="Cobra Coin" className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                {/* 顶部图标和标题 */}
                <div className="absolute top-4 sm:top-5 md:top-6 left-0 right-0 flex flex-col items-center px-3">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-600 mb-2 drop-shadow-[0_0_10px_rgba(217,119,6,0.8)]" />
                  <h3 className="text-base sm:text-lg md:text-xl font-black italic text-white text-center leading-tight drop-shadow-lg">MOST<br/>POPULAR</h3>
                </div>
                {/* 底部信息 */}
                <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-0 right-0 text-center px-2">
                  <p className="text-amber-500 font-bold text-sm sm:text-base md:text-lg tracking-widest drop-shadow-lg mb-1">COBRA</p>
                  <p className="text-yellow-400 font-black text-xs sm:text-sm md:text-base tracking-wider drop-shadow-lg truncate">CRYPTO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle subtitle="ANNUAL TOTAL RANKING">年度合總盈利排名</SectionTitle>
        <div 
          className="relative rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 md:p-12 shadow-2xl text-slate-900 border border-white/60 max-w-6xl mx-auto w-full mx-2 sm:mx-4"
          style={{
            background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.5)'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none rounded-[1.5rem] sm:rounded-[2rem]" style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
          }}></div>
          <TotalRankingList rankings={finalAnnualRankings} isStatic={true} />
        </div>
      </section>

      <section>
        <SectionTitle subtitle="ANNUAL EA RANKING">年度各EA合總排名</SectionTitle>
        <div className="max-w-6xl mx-auto flex flex-col items-center px-2 sm:px-4">
          <div className="w-full max-w-[900px] rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 shadow-2xl relative" style={{
            background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.5)'
          }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none rounded-xl sm:rounded-2xl" style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
            }}></div>
            <div className="relative z-10">
              <div className="text-center mb-2 sm:mb-4 border-b border-slate-300/50 pb-2 relative flex items-center justify-center gap-2">
                <img src="/eacoin/KirinCoin.png" alt="EA" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain opacity-60" />
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>ALL EA RANKING</h3>
                <img src="/eacoin/PhoenixCoin.png" alt="EA" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain opacity-60" />
              </div>
              <div className="flex flex-col gap-0.5 px-0 sm:px-2 md:px-4">
                <EARankingList rankings={annualEARankings} isStatic={true} compact={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - Below ALL EA RANKING */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 sm:my-12">
        <a href="#" target="_blank" rel="noopener noreferrer" className="block w-full">
          <img 
            src="/ibpromotion/Static_20th_anniversery-1016x180-English-GOMU.jpg" 
            alt="20th Anniversary" 
            className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl hover:opacity-95 transition-opacity"
          />
        </a>
      </section>

      <SymbolsSection symbolsData={symbolsData} />

      {/* Ad Banner - Above Explore More Buttons */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <a href="#" target="_blank" rel="noopener noreferrer" className="block w-full">
          <img 
            src="/ibpromotion/Static_catch_the_golden_opportunity-1490x350-English-GOMU.jpg" 
            alt="Catch the Golden Opportunity" 
            className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl hover:opacity-95 transition-opacity"
          />
        </a>
      </section>

    </main>
    </div>
    </>
  );
};

const MonthlyResults = ({ onBack, symbolsData }: { onBack: () => void, symbolsData: SymbolItem[] }) => {
  const [selectedMonth, setSelectedMonth] = useState('2026-05');
  
  const months = [
    "2026-05", "2026-06", "2026-07", "2026-08", "2026-09", "2026-10",
    "2026-11", "2026-12", "2027-01", "2027-02", "2027-03", "2027-04"
  ];

  // Generate mock monthly rankings based on selected month
  const seed = parseInt(selectedMonth.replace('-', ''));
  
  const monthlyRankingsData = initialRankings.map(item => ({
    ...item,
    amount: item.amount * (0.8 + (seed % 10) * 0.05) + Math.floor(Math.random() * 10000),
  })).sort((a, b) => b.amount - a.amount);
  
  const maxAmount = monthlyRankingsData[0].amount;
  const finalMonthlyRankings = monthlyRankingsData.map((item, index) => ({
    ...item,
    rank: index + 1,
    percentage: Math.max(15, (item.amount / maxAmount) * 100)
  }));

  const monthlyEARankings = DUMMY_USERS.map((user, index) => {
    const amount = 100000 - (index * 8000) + Math.floor(Math.random() * 5000) * (seed % 5);
    return {
      id: `monthly-ea-${index}`,
      rank: index + 1,
      playerName: user,
      eaId: characters[index % characters.length].name,
      amount: amount,
      percentage: Math.max(15, (amount / 100000) * 100),
      rankChange: ['up', 'down', 'none'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'none'
    };
  }).sort((a, b) => b.amount - a.amount).map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <>
      {/* Top Banner Image */}
      <div className="w-full bg-black relative">
        <button 
          onClick={onBack}
          className="absolute top-16 sm:top-20 left-2 sm:left-4 md:left-8 flex items-center gap-1 sm:gap-2 text-yellow-500 hover:text-yellow-400 transition-colors pointer-events-auto bg-black/70 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-yellow-500/30 z-20 text-xs sm:text-sm min-h-[44px]"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 rotate-180" />
          <span className="font-bold tracking-wider hidden sm:inline">BACK TO HOME</span>
          <span className="font-bold tracking-wider sm:hidden">BACK</span>
        </button>
        <img 
          src="/bg/ACE _topbanner.png" 
          alt="Monthly Results Banner" 
          className="w-full h-auto block"
        />
      </div>

      {/* Title Bar */}
      <div id="monthly-results" className="w-full bg-black py-2 px-2 sm:px-4 flex items-center justify-center scroll-mt-24">
        <h1 className="font-black italic tracking-tighter uppercase text-yellow-500 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight text-center"
          style={{ WebkitTextStroke: '1px #000', textShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>
          MONTHLY RESULTS
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full"
        style={{ backgroundImage: "url('/bg/Ace_BackGround2.png')", backgroundSize: '100% auto', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
      <main className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 pb-16 sm:pb-24 space-y-12 sm:space-y-16">
        <div className="text-center mb-8 relative">
        </div>

      {/* Month Selector */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-8 sm:mb-12 px-2">
        {months.map(month => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 md:px-6 md:py-3 rounded-lg sm:rounded-xl font-bold tracking-wider sm:tracking-widest text-xs sm:text-sm md:text-base transition-all min-h-[40px] sm:min-h-[44px] ${
              selectedMonth === month 
                ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-105' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <section>
        <SectionTitle subtitle={`TOTAL RANKING - ${selectedMonth}`}>月度合總盈利排名</SectionTitle>
        <div 
          className="relative rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 md:p-12 shadow-2xl text-slate-900 border border-white/60 max-w-6xl mx-auto w-full mx-2 sm:mx-4"
          style={{
            background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.5)'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none rounded-[1.5rem] sm:rounded-[2rem]" style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
          }}></div>
          <TotalRankingList rankings={finalMonthlyRankings} isStatic={true} />
        </div>
      </section>

      <section>
        <SectionTitle subtitle={`EA RANKING - ${selectedMonth}`}>月度各EA排名</SectionTitle>
        <div className="max-w-6xl mx-auto flex flex-col items-center px-2 sm:px-4">
          <div className="w-full max-w-[900px] rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-5 shadow-2xl relative" style={{
            background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.5)'
          }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none rounded-xl sm:rounded-2xl" style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
            }}></div>
            <div className="relative z-10">
              <div className="text-center mb-2 sm:mb-4 border-b border-slate-300/50 pb-2 relative flex items-center justify-center gap-2">
                <img src="/eacoin/KirinCoin.png" alt="EA" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain opacity-60" />
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>ALL EA RANKING</h3>
                <img src="/eacoin/PhoenixCoin.png" alt="EA" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain opacity-60" />
              </div>
              <div className="flex flex-col gap-0.5 px-0 sm:px-2 md:px-4">
                <EARankingList rankings={monthlyEARankings} isStatic={true} compact={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SymbolsSection symbolsData={symbolsData} />
    </main>
    </div>
    </>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'annual' | 'monthly'>('home');
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [timeElapsed, setTimeElapsed] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [monthlyRankings, setMonthlyRankings] = useState(initialRankings);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0].name);
  const [characterRankings, setCharacterRankings] = useState<RankingItem[]>([]);
  const [symbolsData, setSymbolsData] = useState<SymbolItem[]>(symbols);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(10); // Default 1% of container width
  const [showPopup, setShowPopup] = useState(false);

  // Popup Ad Timer
  useEffect(() => {
    // Show popup after 5 seconds
    const initialTimer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    // Show popup every 60 seconds
    const interval = setInterval(() => {
      setShowPopup(true);
    }, 60000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Generate dummy data based on the selected character
    const generateRankings = (charName: string) => {
      // Create a stable seed based on character name length and first letter
      const seed = charName.length * charName.charCodeAt(0);
      const baseAmount = seed * 100 + 50000;
      
      const generated = Array.from({ length: 10 }).map((_, i) => {
        // Small random factor so the initial gaps are tight
        const randomFactor = (seed * (i + 1)) % 500;
        const nameIndex = (seed + i) % DUMMY_USERS.length;
        return {
          id: `${charName.toLowerCase()}-${i + 1}`,
          rank: i + 1,
          eaId: DUMMY_USERS[nameIndex],
          // Make the gap between ranks much smaller (e.g., 200-500) so they can overtake each other easily
          amount: baseAmount - (i * 300) + randomFactor,
          percentage: 0, // will be calculated below
          rankChange: 'none' as 'up' | 'down' | 'none',
        };
      }).sort((a, b) => b.amount - a.amount);

      const maxAmount = generated[0].amount;
      return generated.map((item, index) => ({
        ...item,
        rank: index + 1,
        percentage: Math.max(15, (item.amount / maxAmount) * 100)
      }));
    };
    
    setCharacterRankings(generateRankings(selectedCharacter));

      // Dynamic Simulation: Randomly update amounts every 2 seconds
      const interval = setInterval(() => {
        setCharacterRankings(prev => {
          const newRankings = prev.map(item => {
            // Randomly increase amount for some users to simulate live trading
            // Higher chance and higher amount to force rank changes
            const increase = Math.random() > 0.3 ? Math.floor(Math.random() * 600) : 0;
            return { ...item, amount: item.amount + increase };
          });
          
          // Re-sort and update rankings
          const sorted = newRankings.sort((a, b) => b.amount - a.amount);
          const maxAmount = sorted[0].amount;

          return sorted.map((item, index) => {
            const oldRank = item.rank;
            const newRank = index + 1;
            let rankChange: 'up' | 'down' | 'none' = 'none';
            if (newRank < oldRank) rankChange = 'up';
            else if (newRank > oldRank) rankChange = 'down';
            
            return { 
              ...item, 
              rank: newRank, 
              rankChange,
              percentage: Math.max(15, (item.amount / maxAmount) * 100)
            };
          });
        });
      }, 2000);

    return () => clearInterval(interval);
  }, [selectedCharacter]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCw(entry.contentRect.width / 100);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Symbol Data Simulation
  useEffect(() => {
    // Initial animation (start from 0)
    setSymbolsData(symbols.map(s => ({ ...s, percentage: 0 })));
    const timeout = setTimeout(() => {
      setSymbolsData([...symbols]);
    }, 100);

    const interval = setInterval(() => {
      setSymbolsData(prev => {
        const newData = prev.map(item => {
          // Small fluctuation
          const fluctuation = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
          let newPercentage = item.percentage + fluctuation;
          newPercentage = Math.max(0, Math.min(100, newPercentage));
          return { ...item, percentage: newPercentage };
        });
        
        // Sort descending
        return newData.sort((a, b) => b.percentage - a.percentage);
      });
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMonthlyRankings(prev => {
        // 1. Add random amounts (larger variation to force rank changes)
        const updated = prev.map(item => {
          // Some EAs might have a lucky streak
          const isLucky = Math.random() > 0.8;
          const randomIncrease = isLucky ? Math.random() * 8000 + 2000 : Math.random() * 1000 + 100;
          return {
            ...item,
            amount: item.amount + randomIncrease
          };
        });

        // 2. Sort by amount descending
        updated.sort((a, b) => b.amount - a.amount);

        // 3. Find max amount for percentage calculation
        const maxAmount = updated[0].amount;

        // 4. Assign new ranks and calculate rankChange
        return updated.map((item, index) => {
          const newRank = index + 1;
          let rankChange: 'up' | 'down' | 'none' = 'none';
          
          if (item.rank > newRank) {
            rankChange = 'up'; // Rank number decreased (e.g., 4 -> 3), so they went UP in standings
          } else if (item.rank < newRank) {
            rankChange = 'down'; // Rank number increased (e.g., 3 -> 4), so they went DOWN in standings
          }

          return {
            ...item,
            prevRank: item.rank,
            rank: newRank,
            rankChange,
            percentage: Math.max(15, (item.amount / maxAmount) * 100)
          };
        });
      });
    }, 3500); // Update every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const startDate = new Date('2026-05-01T00:00:00').getTime();
      const endDate = new Date('2026-05-31T23:59:59').getTime();

      // Calculate time left
      const distanceLeft = endDate - now;
      if (distanceLeft > 0) {
        setTimeLeft({
          days: Math.floor(distanceLeft / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((distanceLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
          minutes: Math.floor((distanceLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
          seconds: Math.floor((distanceLeft % (1000 * 60)) / 1000).toString().padStart(2, '0'),
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }

      // Calculate time elapsed
      const distanceElapsed = now - startDate;
      if (distanceElapsed > 0) {
        const actualElapsed = now > endDate ? endDate - startDate : distanceElapsed;
        setTimeElapsed({
          days: Math.floor(actualElapsed / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((actualElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
          minutes: Math.floor((actualElapsed % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
          seconds: Math.floor((actualElapsed % (1000 * 60)) / 1000).toString().padStart(2, '0'),
        });
      } else {
        setTimeElapsed({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen pb-20 bg-black text-white">
      {/* Popup Ad */}
      <AnimatePresence>
        {showPopup && <PopupAd onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
      
      {/* Side Ads */}
      {currentPage === 'home' && <SideAds />}
      
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && (
        <>
          {/* Top Banner Image */}
          <div className="w-full bg-black overflow-hidden">
            <img 
              src="/bg/ACE _topbanner.png" 
              alt="ACE Championship Banner" 
              className="w-full h-auto block object-cover object-center max-h-[50vh] sm:max-h-none"
            />
          </div>

          {/* Leaderboard Title Bar */}
          <div className="w-full bg-black py-2 px-2 sm:px-4 flex items-center justify-center">
            <h1
              className="font-black italic tracking-tighter uppercase text-yellow-500 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight text-center"
              style={{
                WebkitTextStroke: '1px #000',
                textShadow: '0px 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              LEADERBOARD
            </h1>
          </div>

          {/* Ace Background */}
          <div
            className="relative z-10 w-full"
            style={{
              backgroundImage: "url('/bg/Ace_BackGround2.png')",
              backgroundSize: '100% auto',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Dim overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
          <main className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        
        {/* Leaderboard Section */}
        <section id="leaderboard" className="scroll-mt-20">
          <div className="text-center mb-16 relative">

            {/* Prize Pool Info */}
            <div className="flex flex-col items-center justify-center space-y-4 mt-8 relative z-10">
              <div className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-6 px-8 py-4 bg-slate-900/80 border border-yellow-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.15)]">
                <span className="text-slate-300 font-bold text-lg md:text-xl tracking-widest uppercase">Prize Pool</span>
                <div className="hidden md:block w-px h-8 bg-slate-700"></div>
                <div className="flex items-baseline gap-1">
                  <span className="text-yellow-500 font-black text-2xl md:text-3xl">$</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 font-black text-4xl md:text-6xl tracking-tighter drop-shadow-sm">
                    100,000
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-3 bg-black/60 px-6 py-3 rounded-xl border border-blue-500/30 shadow-lg backdrop-blur-sm">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  <span className="text-slate-200 font-mono text-base md:text-xl tracking-wider uppercase">June 01 - June 30, 2026</span>
                </div>
                
                <div className="flex items-center gap-3 bg-green-900/40 px-6 py-3 rounded-xl border border-green-500/40 shadow-[0_0_15px_rgba(74,222,128,0.15)] backdrop-blur-sm">
                  <span className="text-green-400 font-black text-base md:text-xl tracking-widest uppercase">No Entry Fee</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col items-center">
              {/* Pill moved here */}
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900/90 border border-yellow-500/30 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)] mb-8 relative z-20 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                <span 
                  className="text-xs md:text-sm font-mono tracking-[0.2em] text-yellow-500 font-bold"
                  style={{ WebkitTextStroke: '0.5px #000' }}
                >
                  REAL-TIME LEADERBOARD
                </span>
              </div>
              
              <div id="月總排名"><SectionTitle subtitle="MONTHLY TOTAL RANKING">月總排名</SectionTitle></div>
              <div 
                ref={containerRef}
                className="relative rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 md:p-12 shadow-2xl text-slate-900 border border-white/60 max-w-6xl mx-auto w-full mx-2 sm:mx-4"
                style={{
                  background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.5)'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none rounded-[1.5rem] sm:rounded-[2rem]" style={{
                  background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
                }}></div>
                
                <TotalRankingList rankings={monthlyRankings} />
              </div>
            </div>

            <div className="max-w-6xl mx-auto w-full">
              <div id="月程式排名"><SectionTitle subtitle="MONTHLY PROGRAM RANKING">月程式排名</SectionTitle></div>
              
              {/* 角色選擇器 - 8個橫向排列 */}
              <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2 mb-4 px-1 sm:px-0">
                {characters.map((char) => (
                  <motion.div 
                    key={char.name}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCharacter(char.name)}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all shadow-lg min-h-[60px] sm:min-h-[80px] ${
                      selectedCharacter === char.name 
                        ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)] bg-slate-900/50' 
                        : 'border-slate-800 hover:border-yellow-500/50 bg-white/80'
                    }`}
                  >
                    <img 
                      src={char.imageUrl} 
                      alt={char.name} 
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        selectedCharacter === char.name ? 'scale-105 opacity-100' : 'scale-100 opacity-60 group-hover:scale-105 group-hover:opacity-100'
                      }`} 
                      referrerPolicy="no-referrer" 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${
                      selectedCharacter === char.name ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                    }`} />
                    <div className="absolute bottom-0.5 sm:bottom-1 left-0 w-full px-0.5 sm:px-1 text-center">
                      <span className={`text-[10px] sm:text-xs md:text-sm font-black italic tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-colors ${
                        selectedCharacter === char.name ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'
                      }`}>
                        {char.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* 排名列表 */}
              <div 
                className="relative rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 shadow-2xl text-slate-900 border border-white/60"
                style={{
                  background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.5)'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none rounded-xl sm:rounded-2xl" style={{
                  background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
                }}></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-2 sm:mb-4 border-b border-slate-300/50 pb-2 sm:pb-3 relative flex items-center justify-center gap-2 sm:gap-3">
                    <img src={`/eacoin/${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1).toLowerCase()}Coin.png`} alt={`${selectedCharacter} Coin`} className="w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-md" />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>{selectedCharacter}</h3>
                    <img src={`/eacoin/${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1).toLowerCase()}Coin.png`} alt={`${selectedCharacter} Coin`} className="w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-md" />
                    <div className="absolute right-0 flex items-center gap-1 sm:gap-2 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-green-200">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <span className="text-green-600 font-bold text-[10px] sm:text-xs tracking-widest">LIVE</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 px-0 md:px-2">
                    <EARankingList rankings={characterRankings} compact={true} />
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </section>

        <SymbolsSection symbolsData={symbolsData} />

        {/* Explore More Results */}
        <section id="more-results" className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 scroll-mt-24 px-2 sm:px-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setCurrentPage('annual');
              window.scrollTo(0, 0);
            }}
            className="metallic-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex items-center justify-between group border border-yellow-500/20 min-h-[80px] sm:min-h-[100px]"
          >
            <div className="text-left">
              <p className="text-yellow-500 font-mono text-[10px] sm:text-xs tracking-widest mb-1">EXPLORE MORE</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black italic text-white">年度成績 ANNUAL RESULTS</h3>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 group-hover:translate-x-2 transition-transform flex-shrink-0 ml-2" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setCurrentPage('monthly');
              window.scrollTo(0, 0);
            }}
            className="metallic-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex items-center justify-between group border border-yellow-500/20 min-h-[80px] sm:min-h-[100px]"
          >
            <div className="text-left">
              <p className="text-yellow-500 font-mono text-[10px] sm:text-xs tracking-widest mb-1">EXPLORE MORE</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black italic text-white">月度成績 MONTHLY RESULTS</h3>
            </div>
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 group-hover:translate-x-2 transition-transform flex-shrink-0 ml-2" />
          </motion.button>
        </section>

        {/* Rules Section */}
        <section id="rules" className="space-y-8 md:space-y-12 scroll-mt-24 px-2 sm:px-4">
          <div className="text-center space-y-2 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black italic text-yellow-600 drop-shadow-sm">《ACE明星大亂鬥2026》</h2>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black italic text-slate-700 drop-shadow-sm">官方比賽細則</h2>
            <h2 
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-black italic text-yellow-400 animate-pulse tracking-wide"
              style={{ 
                WebkitTextStroke: '1px rgba(0,0,0,0.8)', 
                textShadow: '0px 4px 15px rgba(0,0,0,0.6), 0px 2px 4px rgba(0,0,0,0.8)' 
              }}
            >
              由 ACE FORTUNE 全力贊助與主辦
            </h2>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
            <RuleCard title="【 比賽宗旨 】" icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5" />}>
              為鼓勵學員透過實戰，提升各種EA策略運用技巧，互相觀摩、交流操作手法，
              ACE 將舉辦《ACE EA明星大亂鬥2026》，以程式交易實力一較高下，角逐豐厚獎金及「EA王者」榮譽稱號。
              <br /><br />
              <span className="text-yellow-400 font-bold">本次活動無需任何報名費，旨在推動實戰操作與技術交流。</span>
            </RuleCard>

            <RuleCard title="【 首輪比賽日期 】" icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <div className="space-y-4 text-slate-300 text-sm text-center">
                <p className="text-lg text-slate-200">2026年5月1日（00:00）至5月31日（23:59）｜以系統時間為準</p>
                <p>※ 比賽期間可中途加入，惟開始越早，排名優勢越高。</p>
                <p>※ 只會計算比賽期間內的 EA 開單與平倉單。(其他訂單不會計算)</p>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-12 pt-4 sm:pt-8">
                  <div className="flex flex-col items-center space-y-2 sm:space-y-4">
                    <p className="text-lg sm:text-2xl font-bold text-yellow-500 uppercase tracking-wider">STARTED</p>
                    <div className="flex gap-1 sm:gap-2">
                      <CountdownBox label="Days" value={timeElapsed.days} />
                      <CountdownBox label="Hours" value={timeElapsed.hours} />
                      <CountdownBox label="Minutes" value={timeElapsed.minutes} />
                      <CountdownBox label="Seconds" value={timeElapsed.seconds} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 sm:space-y-4">
                    <p className="text-lg sm:text-2xl font-bold text-yellow-500 uppercase tracking-wider">Will end in</p>
                    <div className="flex gap-1 sm:gap-2">
                      <CountdownBox label="Days" value={timeLeft.days} />
                      <CountdownBox label="Hours" value={timeLeft.hours} />
                      <CountdownBox label="Minutes" value={timeLeft.minutes} />
                      <CountdownBox label="Seconds" value={timeLeft.seconds} />
                    </div>
                  </div>
                </div>
              </div>
            </RuleCard>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
            <RuleCard title="【 參加方法 】" icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}>
              凡使用 ACE Fortune EA 操作，即自動視為報名參賽 (不論任何版本)
              成績將自動登錄至比賽即時排行榜系統，並於參賽者帳號的圖表中實時顯示
            </RuleCard>

            <RuleCard title="【 參賽資格 】" icon={<ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                <li>所有 ACE Fortune AI CAD 在籍學生均可參與</li>
                <li>必須使用 實盤 LIVE Standard 帳戶 (不接受 DEMO、CENT、美分帳戶、RAW、ECN等，任何非標準實盤將自動除名)</li>
                <li>無參賽帳戶上限，但必須為已登記 AI CAD 團體福利的帳戶</li>
                <li>Ace Fortune 工作人員或導師均可參加，但不予競逐獎項，如有得獎將順延至其他參賽者</li>
              </ul>
            </RuleCard>

            <RuleCard title="【 比賽規則與公平性聲明 】" icon={<Info className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <p className="text-slate-400 text-sm leading-relaxed">
                本比賽由 Ace Fortune 主辦，負責獎金、獎品、評審與頒獎活動等全程支援。
                整個比賽過程將以公開、透明、公正 原則執行，排名可透過比賽平時即時 查詢。
                比賽期間嚴禁作弊、假帳號交易、人為干預紀錄等行為，一經發現，將即時取消資格並不作另行通知。
              </p>
            </RuleCard>

            <RuleCard title="【 獎勵與表揚機制 】" icon={<Award className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <div className="space-y-4 text-slate-400 text-sm">
                <p>● 第一輪 (5月賽季) 成績將作為日後可能延伸的【 年度聯賽 】累計成績</p>
                <p>● 賽事結束後約兩個月內 舉行頒獎典禮，邀請得獎者親臨現場領獎</p>
                <p>● 得獎者需準備 不少於5分鐘的操作分享 PPT ( 或影片 )，進行現場或線上播放</p>
                <p>● 若無法出席頒獎活動，將視作放棄得獎資格，由排名次一者遞補 ( 海外得獎者可預先錄製分享影片 )</p>
                <div className="pl-4 border-l-2 border-yellow-500/30 space-y-2">
                  <p><span className="text-yellow-400 font-bold">● 【 金牌霸主 】</span> — 終極EA王者榮耀 HKD 28000 + 1個月會期</p>
                  <p className="pl-4">總盈利金額最高者 榮登排行榜之首，真正的 EA 操盤之神！</p>
                  
                  <p><span className="text-slate-300 font-bold">● 【 銀色勇者 】</span> — 攻守兼備的準王者 HKD 12000 + 1個月會期</p>
                  <p className="pl-4">總盈利金額排名第二 靠實力穩紮穩打，貼身緊咬頂尖高手！</p>
                  
                  <p><span className="text-amber-700 font-bold">● 【 銅幣精英 】</span> — 穩健突進的潛力王者 HKD 5000 + 1個月會期</p>
                  <p className="pl-4">總盈利金額排名第三 靈活操作、嚴守紀律，是市場中的黑馬！</p>
                  
                  <p><span className="text-yellow-500 font-bold">● 【 倍化霸主 】</span> — 以小博大的獲利之王 HKD 3000 + 1個月會期</p>
                  <p className="pl-4">賬戶回報百分比最高者 ( % ) 小本翻倍，化身最致命的奇兵！</p>
                  
                  <p><span className="text-slate-400 font-bold">● 【 猛攻勇者 】</span> — 排名 4-10 名獎勵優厚 HKD 500 + 1個月會期</p>
                  <p className="pl-4">實力接近，惜敗無悔！展現出色穩健操盤表現，仍可獲得豐富獎品！</p>
                </div>
                <p>● 尚有其他特設獎項，適時公佈，得獎機會大提升！</p>
              </div>
            </RuleCard>

            <RuleCard title="【 其他注意事項 】" icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />}>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>報名即視為同意並遵守以上比賽規則</p>
                <p>比賽官方網站或系統自動統計，將不接受個別申請訴</p>
                <p>每名用戶只允許領取一個獎項 ( 例：同時得第2名、第8名，取其最高排名的獎項 )</p>
                <p>Ace 有權利隨機抽查參賽者帳戶的操作情況，以便核對成績獎項，確保每位參賽者都得到公平的環境比賽</p>
                <p className="text-yellow-500 font-bold mt-4">Ace Fortune 保留對活動之最終解釋與調整權利</p>
              </div>
            </RuleCard>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center pt-8 sm:pt-12 px-2 sm:px-4">
          <div className="metallic-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto mb-8 sm:mb-12">
            <h3 className="text-base sm:text-lg md:text-xl font-bold italic gold-glow mb-3 sm:mb-4">【 立即啟動 《ACE明星大亂鬥2026》 挑戰EA王者寶座！ 】</h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6">
              誰會成為下一位排行榜上的程式交易王者？<br />
              一場策略、風控與心理的極致較量，即將展開！<br />
              立即使用 Ace Fortune EA 爭奪王者寶座！
            </p>
            <motion.a
              href="https://wa.link/jg5h3l"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex flex-col items-center justify-center px-6 sm:px-12 py-3 sm:py-4 bg-yellow-500 text-slate-950 font-black italic rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all min-h-[56px] sm:min-h-[64px]"
            >
              <span className="text-base sm:text-xl">尚未有 EA 在手?</span>
              <span className="text-xs sm:text-sm font-bold opacity-80 mt-1">立即聯絡小助手查詢</span>
            </motion.a>
          </div>
        </section>

      </main>
          </div>
        </>
      )}

      {currentPage === 'annual' && <AnnualResults onBack={() => setCurrentPage('home')} symbolsData={symbolsData} />}
      {currentPage === 'monthly' && <MonthlyResults onBack={() => setCurrentPage('home')} symbolsData={symbolsData} />}

      <footer className="text-center text-slate-600 font-mono text-[10px] uppercase tracking-[0.2em] py-10">
        © 2026 ACE FORTUNE CHAMPIONSHIP. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

function RuleCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="metallic-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-2 sm:gap-3 text-yellow-400 mb-3 sm:mb-6">
        {icon}
        <h3 className="text-lg sm:text-xl font-bold italic">{title}</h3>
      </div>
      <div className="text-slate-300 leading-relaxed text-xs sm:text-sm">
        {children}
      </div>
    </div>
  );
}
