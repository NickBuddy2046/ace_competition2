import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
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
  Calendar
} from 'lucide-react';
import { RankingItem, SymbolItem, CharacterItem } from './types';

// --- Mock Data ---
const initialRankings: RankingItem[] = [
  { id: 'ea-1', rank: 1, eaId: 'KIRIN', amount: 125430.50, percentage: 100, rankChange: 'none' },
  { id: 'ea-2', rank: 2, eaId: 'PHOENIX', amount: 98765.20, percentage: 80, rankChange: 'none' },
  { id: 'ea-3', rank: 3, eaId: 'COBRA', amount: 85432.10, percentage: 60, rankChange: 'none' },
  { id: 'ea-4', rank: 4, eaId: 'LOTTO', amount: 72100.00, percentage: 50, rankChange: 'none' },
  { id: 'ea-5', rank: 5, eaId: 'BUBO', amount: 65430.80, percentage: 45, rankChange: 'none' },
  { id: 'ea-6', rank: 6, eaId: 'FALCON', amount: 58900.40, percentage: 40, rankChange: 'none' },
  { id: 'ea-7', rank: 7, eaId: 'WIZARD', amount: 52100.90, percentage: 35, rankChange: 'none' },
  { id: 'ea-8', rank: 8, eaId: 'KIRIN', amount: 48500.20, percentage: 30, rankChange: 'none' },
  { id: 'ea-9', rank: 9, eaId: 'PHOENIX', amount: 42300.10, percentage: 25, rankChange: 'none' },
  { id: 'ea-10', rank: 10, eaId: 'COBRA', amount: 38900.50, percentage: 20, rankChange: 'none' },
];

const characters: CharacterItem[] = [
  { name: 'KIRIN', imageUrl: '/image/Kirin.png' },
  { name: 'PHOENIX', imageUrl: '/image/Phoenix.png' },
  { name: 'COBRA', imageUrl: '/image/Cobra.png' },
  { name: 'LOTTO', imageUrl: '/image/Lotto.png' },
  { name: 'BUBO', imageUrl: '/image/Bubo.png' },
  { name: 'FALCON', imageUrl: '/image/Falcon.png' },
  { name: 'PYTHON', imageUrl: '/image/Python.png' },
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
  <div className="text-center mb-12 relative">
    <h2 className="text-4xl md:text-5xl font-black tracking-widest italic uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-3">
      {children}
    </h2>
    {subtitle && (
      <p className="text-yellow-500 font-mono text-sm md:text-base tracking-[0.3em] uppercase drop-shadow-md">
        {subtitle}
      </p>
    )}
    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-6 opacity-80" />
  </div>
);

const DynamicEnergyBar: React.FC<{ percentage: number; className?: string; skewClass?: string; reverse?: boolean; responsive?: boolean; rankChange?: 'up' | 'down' | 'none'; cw?: number }> = ({ percentage, className = '', skewClass = 'skew-x-[-30deg]', reverse = false, responsive = false, rankChange, cw = 10 }) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  const getIndicator = () => {
    if (!rankChange || rankChange === 'none') {
      const color = rankChange === 'none' ? '#94a3b8' : '#dc2626';
      return (
        <div 
          className="absolute bottom-0 w-0 h-0 transition-all duration-1000 ease-out z-10"
          style={{ 
            borderLeft: responsive ? `${0.6 * cw}px solid transparent` : '6px solid transparent',
            borderRight: responsive ? `${0.6 * cw}px solid transparent` : '6px solid transparent',
            borderTop: responsive ? `${0.9 * cw}px solid ${color}` : `9px solid ${color}`,
            [reverse ? 'right' : 'left']: `${clampedPercentage}%`, 
            transform: reverse ? 'translateX(50%)' : 'translateX(-50%)' 
          }}
        />
      );
    }

    const isUp = rankChange === 'up';
    const color = isUp ? '#22c55e' : '#ef4444';
    
    return (
      <div 
        className="absolute bottom-0 w-0 h-0 transition-all duration-1000 ease-out z-10"
        style={{ 
          borderLeft: responsive ? `${0.6 * cw}px solid transparent` : '6px solid transparent',
          borderRight: responsive ? `${0.6 * cw}px solid transparent` : '6px solid transparent',
          ...(isUp 
            ? { borderBottom: responsive ? `${0.9 * cw}px solid ${color}` : `9px solid ${color}` } 
            : { borderTop: responsive ? `${0.9 * cw}px solid ${color}` : `9px solid ${color}` }
          ),
          [reverse ? 'right' : 'left']: `${clampedPercentage}%`, 
          transform: reverse ? 'translateX(50%)' : 'translateX(-50%)',
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      />
    );
  };

  return (
    <div className={`relative flex flex-col items-start ${className}`}>
      {/* Indicator */}
      <div 
        className={`relative w-full ${responsive ? '' : 'h-2 mb-0.5'}`}
        style={responsive ? { height: `${0.6 * cw}px`, marginBottom: `${0.2 * cw}px` } : {}}
      >
        {getIndicator()}
      </div>
      
      {/* Bar Container - 移除背景與邊框，直接融入底圖的軌道 */}
      <div 
        className={`relative w-full ${responsive ? '' : 'h-[10px] md:h-[14px]'} ${skewClass} overflow-hidden`}
        style={responsive ? { height: `${1.4 * cw}px` } : {}}
      >
        {/* Fill */}
        <div 
          className={`absolute top-0 ${reverse ? 'right-0' : 'left-0'} h-full bg-gradient-to-r ${reverse ? 'from-orange-600 via-yellow-400 to-orange-600' : 'from-orange-600 via-yellow-400 to-orange-600'} transition-all duration-1000 ease-out ${reverse ? 'animate-energy-flow-reverse' : 'animate-energy-flow'} overflow-hidden`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {/* Sweep animation */}
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent ${reverse ? 'animate-sweep-reverse' : 'animate-sweep'}`} />
        </div>
        {/* Inner highlight for 3D effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 pointer-events-none" />
      </div>
    </div>
  );
};

const RankingRow: React.FC<{ item: RankingItem }> = ({ item }) => {
  const isTop3 = item.rank <= 3;
  const trophyColor = item.rank === 1 ? 'text-yellow-400' : item.rank === 2 ? 'text-slate-300' : 'text-amber-600';

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="ranking-item group"
    >
      <div className="flex items-center gap-4 md:gap-6">
        <div className="w-8 md:w-12 text-xl md:text-2xl font-black italic text-slate-500 group-hover:text-white transition-colors">
          {item.rank}
        </div>
        {isTop3 && <Trophy className={`w-5 h-5 md:w-6 md:h-6 ${trophyColor} drop-shadow-lg`} />}
        <div className="font-mono text-base md:text-lg tracking-widest text-slate-300">
          EA <span className="text-white">{item.eaId}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {item.percentage !== undefined && <DynamicEnergyBar percentage={item.percentage} />}
        <div className="font-mono text-lg md:text-xl font-bold text-yellow-400 tracking-tighter text-right min-w-[120px]">
          $ <AnimatedNumber value={item.amount} />
        </div>
      </div>
    </motion.div>
  );
};

const SymbolProgress: React.FC<{ symbol: string, percentage: number }> = ({ symbol, percentage }) => {
  const segments = 20;
  const activeSegments = Math.round((percentage / 100) * segments);

  return (
    <div className="flex items-center gap-4 mb-2 justify-center">
      <div 
        className="w-[100px] flex-shrink-0 text-right text-black drop-shadow-sm" 
        style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: '16px' }}
      >
        {symbol}
      </div>
      
      <div className="w-[600px] flex-shrink-0 bg-[#1a1a1a] p-[3px] rounded-md flex gap-[2px] border-[4px] border-[#1a1a1a] shadow-lg">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeSegments;
          return (
            <div 
              key={i} 
              className="flex-1 h-[32px] rounded-sm transition-all duration-500"
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
        className="w-[80px] flex-shrink-0 text-left text-black font-bold drop-shadow-sm"
        style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '18px' }}
      >
        {percentage.toFixed(1).padStart(5, '0')}%
      </div>
    </div>
  );
};

const CountdownBox = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-slate-900 border border-slate-700 w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-black italic gold-glow mb-2">
      {value}
    </div>
    <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">{label}</span>
  </div>
);

const Navbar = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-yellow-500/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <div className="cursor-pointer" onClick={() => scrollTo('home')}>
            <img 
              src="/image/ACE Fortune Logo B1a.png" 
              alt="ACE Fortune Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex items-center gap-12">
          <button onClick={() => scrollTo('home')} className="text-white font-bold hover:text-yellow-500 transition-colors cursor-pointer text-sm tracking-wide">Home</button>
          <button onClick={() => scrollTo('leaderboard')} className="text-white font-bold hover:text-yellow-500 transition-colors cursor-pointer text-sm tracking-wide">Leaderboard</button>
          <button onClick={() => scrollTo('more-results')} className="text-white font-bold hover:text-yellow-500 transition-colors cursor-pointer text-sm tracking-wide">More Results</button>
          <button onClick={() => scrollTo('rules')} className="text-white font-bold hover:text-yellow-500 transition-colors cursor-pointer text-sm tracking-wide">官方比賽細則</button>
        </div>

        {/* Social Icons */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <a href="#" className="text-yellow-500 hover:text-white transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-yellow-500 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

// --- Main App ---

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [timeElapsed, setTimeElapsed] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [monthlyRankings, setMonthlyRankings] = useState(initialRankings);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0].name);
  const [characterRankings, setCharacterRankings] = useState<RankingItem[]>([]);
  const [symbolsData, setSymbolsData] = useState<SymbolItem[]>(symbols);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(10); // Default 1% of container width

  useEffect(() => {
    const DUMMY_USERS = [
      "ALEX99", "TRADER", "CRYPTO", "BULLRN", "MOONBY", 
      "WHALE1", "SNIPER", "PROBOT", "ALPHA", "OMEGA"
    ];

    // Generate dummy data based on the selected character
    const generateRankings = (charName: string) => {
      // Create a stable seed based on character name length and first letter
      const seed = charName.length * charName.charCodeAt(0);
      const baseAmount = seed * 100 + 50000;
      
      return Array.from({ length: 10 }).map((_, i) => {
        // Small random factor so the initial gaps are tight
        const randomFactor = (seed * (i + 1)) % 500;
        const nameIndex = (seed + i) % DUMMY_USERS.length;
        return {
          id: `${charName.toLowerCase()}-${i + 1}`,
          rank: i + 1,
          eaId: DUMMY_USERS[nameIndex],
          // Make the gap between ranks much smaller (e.g., 200-500) so they can overtake each other easily
          amount: baseAmount - (i * 300) + randomFactor,
          percentage: Math.max(10, 100 - (i * 10)),
          rankChange: 'none' as 'up' | 'down' | 'none',
        };
      }).sort((a, b) => b.amount - a.amount).map((item, index) => ({ ...item, rank: index + 1 }));
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
        return newRankings
          .sort((a, b) => b.amount - a.amount)
          .map((item, index) => {
            const oldRank = item.rank;
            const newRank = index + 1;
            let rankChange: 'up' | 'down' | 'none' = 'none';
            if (newRank < oldRank) rankChange = 'up';
            else if (newRank > oldRank) rankChange = 'down';
            else rankChange = item.rankChange; // keep previous change indicator if rank didn't change this tick
            
            return { ...item, rank: newRank, rankChange };
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
      <Navbar />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/image/ACE _Website_Final_r02a_BG.png')",
          backgroundSize: '100% auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          marginTop: '81px'
        }}
      />
      
      {/* Header / Hero Section */}
      <header id="home" className="relative z-10 h-[65vw] min-h-[80vh] flex flex-col items-center justify-center pt-20 pb-20 px-4 text-center overflow-hidden">
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24 space-y-24">
        
        {/* Leaderboard Section */}
        <section id="leaderboard" className="scroll-mt-20">
          <div className="text-center mb-16 relative">
            {/* Main Title */}
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase relative z-10 text-yellow-500"
              style={{
                WebkitTextStroke: '3px #000',
                textShadow: '0px 4px 15px rgba(0,0,0,0.5)',
                marginTop: '10px',  // 【標題垂直微調】修改這個數值可以調整標題與上方的距離 (負數往上，正數往下)
                marginBottom: '24px' // 【標題垂直微調】修改這個數值可以調整標題與下方的距離
              }}
            >
              LEADERBOARD
            </h1>

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
              
              <SectionTitle subtitle="MONTHLY TOTAL RANKING">月總排名</SectionTitle>
              <div 
                ref={containerRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 w-full"
              >
                <img src="/image/month lead2.png" alt="Monthly Total Ranking" className="w-full h-auto block" />
                
                {/* 
                  【微調指南】
                  如果您發現能量條超出了底圖的軌道範圍，您可以直接修改下方的陣列數值。
                  - topPositions: 控制上下位置 (數值越大越往下)
                  - leftWidths / rightWidths: 控制能量條的長度 (數值越小，能量條越短，就不會超出範圍)
                  - leftAnchors / rightAnchors: 控制能量條靠近中間的起始點
                  
                  💡 小提示：您可以將下方的 DEBUG_MODE 改為 true，
                  這會為能量條加上紅色的外框，幫助您更精準地對齊底圖！
                */}
                <div className="absolute inset-0 pointer-events-none">
                  {(() => {
                    const DEBUG_MODE = false; // 改為 true 可以顯示紅色對齊輔助線
                    return monthlyRankings.map((item, index) => {
                      // 【垂直位置微調】
                      const topPositions = [
                        12.7, 20.7, 29.0, 37.6, 45.7, 
                        54.2, 63.5, 72.9, 82.2, 91.4
                      ];
                      
                      // 【左邊能量條】長度微調 (如果超出左邊界，請把這裡的數字改小)
                      const leftWidths = [
                        13.2, 15.0, 17.0, 19.0, 21.0, 
                        23.0, 25.0, 27.0, 29.0, 31.0
                      ];
                      // 【左邊能量條】靠中間的錨點微調 (固定右側，向左延伸)
                      const leftAnchors = [
                        46.4, 46.3, 46.0, 46.0, 46.0, 
                        46.0, 46.0, 46.0, 46.0, 46.0
                      ];
                      
                      // 【右邊能量條】長度微調 (如果超出右邊界，請把這裡的數字改小)
                      const rightWidths = [
                        13.2, 15.0, 17.0, 19.0, 21.0, 
                        23.0, 25.0, 27.0, 29.0, 31.0
                      ];
                      // 【右邊能量條】靠中間的錨點微調 (固定左側，向右延伸)
                      const rightAnchors = [
                        61.4, 61.4, 61.4, 61.4, 61.4, 
                        61.4, 61.4, 61.4, 61.4, 61.4
                      ];
                      
                      const topPos = topPositions[index]; 
                      const leftWidth = leftWidths[index];
                      const leftAnchor = leftAnchors[index];
                      const rightWidth = rightWidths[index];
                      const rightAnchor = rightAnchors[index];

                      return (
                        <React.Fragment key={item.rank}>
                          {/* 左邊文字 (EA XXXXXX) */}
                          <div
                            className={`absolute flex items-baseline justify-end ${DEBUG_MODE ? 'border border-red-500 bg-red-500/20' : ''}`}
                            style={{
                              top: `calc(${topPos}% - ${3.2 * cw}px)`,
                              right: `${100 - leftAnchor - 0.5}%`,
                              gap: `${0.5 * cw}px`,
                              textShadow: '0px 0px 4px #000080, 0px 0px 8px #0000ff, 1px 1px 2px #000',
                            }}
                          >
                            <span className="text-white font-black italic" style={{ fontSize: `${1.6 * cw}px`, lineHeight: 1 }}>EA</span>
                            <span className="text-white font-black italic tracking-wider" style={{ fontSize: `${2.4 * cw}px`, lineHeight: 1 }}>{item.eaId}</span>
                          </div>

                          {/* 左邊能量條 */}
                          <div 
                            className={`absolute ${DEBUG_MODE ? 'border border-red-500 bg-red-500/20' : ''}`}
                            style={{ 
                              top: `${topPos}%`, 
                              right: `${100 - leftAnchor}%`,
                              width: `${leftWidth}%`
                            }}
                          >
                            {item.percentage !== undefined && (
                              <DynamicEnergyBar percentage={item.percentage} className="w-full" skewClass="skew-x-[30deg]" reverse={true} responsive={true} rankChange={item.rankChange} cw={cw} />
                            )}
                          </div>

                          {/* 右邊文字 ($ 00,000.00) */}
                          <div
                            className={`absolute flex items-baseline justify-start ${DEBUG_MODE ? 'border border-red-500 bg-red-500/20' : ''}`}
                            style={{
                              top: `calc(${topPos}% - ${3.2 * cw}px)`,
                              left: `${rightAnchor}%`,
                              gap: `${0.5 * cw}px`,
                              textShadow: '0px 0px 4px #000080, 0px 0px 8px #0000ff, 1px 1px 2px #000',
                            }}
                          >
                            <span className="text-white font-black italic" style={{ fontSize: `${1.8 * cw}px`, lineHeight: 1 }}>$</span>
                            <span className="text-white font-black italic tracking-wider" style={{ fontSize: `${2.4 * cw}px`, lineHeight: 1 }}><AnimatedNumber value={item.amount} /></span>
                          </div>

                          {/* 右邊能量條 */}
                          <div 
                            className={`absolute ${DEBUG_MODE ? 'border border-red-500 bg-red-500/20' : ''}`}
                            style={{ 
                              top: `${topPos}%`, 
                              left: `${rightAnchor}%`,
                              width: `${rightWidth}%`
                            }}
                          >
                            {item.percentage !== undefined && (
                              <DynamicEnergyBar percentage={item.percentage} className="w-full" skewClass="skew-x-[-30deg]" responsive={true} cw={cw} />
                            )}
                          </div>
                        </React.Fragment>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <SectionTitle subtitle="MONTHLY PROGRAM RANKING">月程式排名</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {characters.map((char) => (
                  <motion.div 
                    key={char.name}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedCharacter(char.name)}
                    className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all shadow-lg bg-slate-900/50 ${
                      selectedCharacter === char.name 
                        ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                        : 'border-slate-800 hover:border-yellow-500/50'
                    }`}
                  >
                    <img 
                      src={char.imageUrl} 
                      alt={char.name} 
                      className={`w-full h-auto block transition-all duration-500 ${
                        selectedCharacter === char.name ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                      }`} 
                      referrerPolicy="no-referrer" 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-300 ${
                      selectedCharacter === char.name ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                    }`} />
                    <div className="absolute bottom-2 right-3 text-right">
                      <span className={`text-lg md:text-xl font-black italic tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-colors ${
                        selectedCharacter === char.name ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'
                      }`}>
                        {char.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto w-full mt-6">
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl text-black border-[3px] border-black">
                <div className="text-center mb-6 border-b border-black/20 pb-4 relative flex items-center justify-center">
                  <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>{selectedCharacter}</h3>
                  <div className="absolute right-0 flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-green-600 font-bold text-xs tracking-widest">LIVE</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:gap-0 px-2 md:px-8">
                  <AnimatePresence>
                    {characterRankings.map((item) => (
                      <motion.div 
                        layout 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        key={item.id} 
                        className="grid grid-cols-[auto_auto_1fr_auto_auto] gap-x-3 md:gap-x-6 items-center py-2 md:py-1 hover:bg-slate-50 rounded-xl px-2 -mx-2 transition-colors duration-200 cursor-default border-b border-slate-100 last:border-0"
                      >
                        <div className="w-5 md:w-6 flex justify-center items-center">
                          {item.rankChange === 'up' && (
                            <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-sm">
                              <polygon points="4,18 20,18 12,10" fill="#00ff00" />
                            </svg>
                          )}
                          {item.rankChange === 'down' && (
                            <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-sm">
                              <polygon points="4,6 20,6 12,14" fill="#ff0000" />
                            </svg>
                          )}
                          {item.rankChange === 'none' && (
                            <div className="w-3 h-1 bg-slate-300 rounded-full"></div>
                          )}
                        </div>
                        <span 
                          className="text-4xl md:text-5xl font-black italic w-10 md:w-16 text-center leading-none" 
                          style={{ 
                            color: item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#E3E3E3' : item.rank === 3 ? '#CD7F32' : '#888888',
                            textShadow: '2px 2px 0px #333, -1px -1px 0px #333, 1px -1px 0px #333, -1px 1px 0px #333, 1px 1px 0px #333',
                            fontFamily: 'Impact, sans-serif'
                          }}
                        >
                          {item.rank}
                        </span>
                        <span 
                          className="text-2xl md:text-3xl font-black text-black tracking-widest uppercase text-left leading-none pl-2 md:pl-4"
                        >
                          {item.eaId.substring(0, 6).toUpperCase()}
                        </span>
                        <span 
                          className="text-2xl md:text-3xl font-black text-black leading-none text-right opacity-80"
                        >
                          $
                        </span>
                        <span 
                          className="text-2xl md:text-3xl font-black text-black tracking-tight text-right leading-none w-[140px] md:w-[180px] tabular-nums"
                        >
                          <AnimatedNumber value={item.amount} />
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Symbols Section */}
        <section id="symbols">
          <SectionTitle subtitle="TRADING ASSETS DISTRIBUTION">Most Used Symbols</SectionTitle>
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-full max-w-[950px] rounded-2xl p-8 shadow-2xl relative overflow-x-auto" style={{
              background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.5)'
            }}>
              {/* Add some abstract background shapes to match the image */}
              <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none min-w-[850px]" style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 0%, transparent 50%)'
              }}></div>
              <div className="relative z-10 flex flex-col gap-1 min-w-[800px]">
                {symbolsData.map((s) => (
                  <motion.div layout transition={{ type: 'spring', stiffness: 300, damping: 30 }} key={s.symbol}>
                    <SymbolProgress symbol={s.symbol} percentage={s.percentage} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore More Results */}
        <section id="more-results" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-24">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="metallic-card rounded-2xl p-8 flex items-center justify-between group border border-yellow-500/20"
          >
            <div className="text-left">
              <p className="text-yellow-500 font-mono text-xs tracking-widest mb-1">EXPLORE MORE</p>
              <h3 className="text-2xl font-black italic text-white">年度成績 ANNUAL RESULTS</h3>
            </div>
            <ChevronRight className="w-8 h-8 text-yellow-500 group-hover:translate-x-2 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="metallic-card rounded-2xl p-8 flex items-center justify-between group border border-yellow-500/20"
          >
            <div className="text-left">
              <p className="text-yellow-500 font-mono text-xs tracking-widest mb-1">EXPLORE MORE</p>
              <h3 className="text-2xl font-black italic text-white">月度成績 MONTHLY RESULTS</h3>
            </div>
            <ChevronRight className="w-8 h-8 text-yellow-500 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </section>

        {/* Rules Section */}
        <section id="rules" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black italic text-yellow-600 drop-shadow-sm">《ACE明星大亂鬥2026》</h2>
            <h2 className="text-4xl font-black italic text-slate-700 drop-shadow-sm">官方比賽細則</h2>
            <h2 
              className="text-4xl font-black italic text-yellow-400 animate-pulse tracking-wide"
              style={{ 
                WebkitTextStroke: '1.5px rgba(0,0,0,0.8)', 
                textShadow: '0px 4px 15px rgba(0,0,0,0.6), 0px 2px 4px rgba(0,0,0,0.8)' 
              }}
            >
              由 ACE FORTUNE 全力贊助與主辦
            </h2>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
            <RuleCard title="【 比賽宗旨 】" icon={<Zap className="w-5 h-5" />}>
              為鼓勵學員透過實戰，提升各種EA策略運用技巧，互相觀摩、交流操作手法，
              ACE 將舉辦《ACE EA明星大亂鬥2026》，以程式交易實力一較高下，角逐豐厚獎金及「EA王者」榮譽稱號。
              <br /><br />
              <span className="text-yellow-400 font-bold">本次活動無需任何報名費，旨在推動實戰操作與技術交流。</span>
            </RuleCard>

            <RuleCard title="【 首輪比賽日期 】" icon={<Clock className="w-5 h-5" />}>
              <div className="space-y-4 text-slate-300 text-sm text-center">
                <p className="text-lg text-slate-200">2026年5月1日（00:00）至5月31日（23:59）｜以系統時間為準</p>
                <p>※ 比賽期間可中途加入，惟開始越早，排名優勢越高。</p>
                <p>※ 只會計算比賽期間內的 EA 開單與平倉單。(其他訂單不會計算)</p>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-12 pt-8">
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-2xl font-bold text-yellow-500 uppercase tracking-wider">STARTED</p>
                    <div className="flex gap-2">
                      <CountdownBox label="Days" value={timeElapsed.days} />
                      <CountdownBox label="Hours" value={timeElapsed.hours} />
                      <CountdownBox label="Minutes" value={timeElapsed.minutes} />
                      <CountdownBox label="Seconds" value={timeElapsed.seconds} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-2xl font-bold text-yellow-500 uppercase tracking-wider">Will end in</p>
                    <div className="flex gap-2">
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
            <RuleCard title="【 參加方法 】" icon={<Users className="w-5 h-5" />}>
              凡使用 ACE Fortune EA 操作，即自動視為報名參賽 (不論任何版本)
              成績將自動登錄至比賽即時排行榜系統，並於參賽者帳號的圖表中實時顯示
            </RuleCard>

            <RuleCard title="【 參賽資格 】" icon={<ShieldCheck className="w-5 h-5" />}>
              <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                <li>所有 ACE Fortune AI CAD 在籍學生均可參與</li>
                <li>必須使用 實盤 LIVE Standard 帳戶 (不接受 DEMO、CENT、美分帳戶、RAW、ECN等，任何非標準實盤將自動除名)</li>
                <li>無參賽帳戶上限，但必須為已登記 AI CAD 團體福利的帳戶</li>
                <li>Ace Fortune 工作人員或導師均可參加，但不予競逐獎項，如有得獎將順延至其他參賽者</li>
              </ul>
            </RuleCard>

            <RuleCard title="【 比賽規則與公平性聲明 】" icon={<Info className="w-5 h-5" />}>
              <p className="text-slate-400 text-sm leading-relaxed">
                本比賽由 Ace Fortune 主辦，負責獎金、獎品、評審與頒獎活動等全程支援。
                整個比賽過程將以公開、透明、公正 原則執行，排名可透過比賽平時即時 查詢。
                比賽期間嚴禁作弊、假帳號交易、人為干預紀錄等行為，一經發現，將即時取消資格並不作另行通知。
              </p>
            </RuleCard>

            <RuleCard title="【 獎勵與表揚機制 】" icon={<Award className="w-5 h-5" />}>
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

            <RuleCard title="【 其他注意事項 】" icon={<TrendingUp className="w-5 h-5" />}>
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
        <section className="text-center pt-12">
          <div className="metallic-card rounded-2xl p-8 max-w-2xl mx-auto mb-12">
            <h3 className="text-xl font-bold italic gold-glow mb-4">【 立即啟動 《ACE明星大亂鬥2026》 挑戰EA王者寶座！ 】</h3>
            <p className="text-slate-400 text-sm mb-6">
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
              className="inline-flex flex-col items-center justify-center px-12 py-4 bg-yellow-500 text-slate-950 font-black italic rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-all"
            >
              <span className="text-xl">尚未有 EA 在手?</span>
              <span className="text-sm font-bold opacity-80 mt-1">立即聯絡小助手查詢</span>
            </motion.a>
          </div>
        </section>

      </main>

      <footer className="text-center text-slate-600 font-mono text-[10px] uppercase tracking-[0.2em] py-10">
        © 2026 ACE FORTUNE CHAMPIONSHIP. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

function RuleCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="metallic-card rounded-2xl p-8">
      <div className="flex items-center gap-3 text-yellow-400 mb-6">
        {icon}
        <h3 className="text-xl font-bold italic">{title}</h3>
      </div>
      <div className="text-slate-300 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
}
