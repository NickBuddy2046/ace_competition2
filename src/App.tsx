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
  Menu,
  X
} from 'lucide-react';
import { RankingItem, SymbolItem, CharacterItem, PlayerRankingItem } from './types';

// --- Mock Data ---
const initialRankings: PlayerRankingItem[] = [
  {
    id: 'ea-1', rank: 1, playerName: 'ALEX99', amount: 1000000.00, percentage: 100, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'KIRIN Std', percentage: 60, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'PHOENIX Prem', percentage: 40, color: 'from-blue-600 via-cyan-400 to-blue-600' }
    ]
  },
  {
    id: 'ea-2', rank: 2, playerName: 'TRADER', amount: 98765.20, percentage: 78.74, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'PHOENIX Std', percentage: 70, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'COBRA Prem', percentage: 30, color: 'from-purple-600 via-fuchsia-400 to-purple-600' }
    ]
  },
  {
    id: 'ea-3', rank: 3, playerName: 'CRYPTO', amount: 85432.10, percentage: 68.11, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'COBRA Std', percentage: 50, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'LOTTO Prem', percentage: 50, color: 'from-green-600 via-emerald-400 to-green-600' }
    ]
  },
  {
    id: 'ea-4', rank: 4, playerName: 'BULLRN', amount: 72100.00, percentage: 57.48, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'LOTTO Std', percentage: 100, color: 'from-orange-600 via-yellow-400 to-orange-600' }
    ]
  },
  {
    id: 'ea-5', rank: 5, playerName: 'MOONBY', amount: 65430.80, percentage: 52.16, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'BUBO Std', percentage: 80, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'FALCON Prem', percentage: 20, color: 'from-red-600 via-rose-400 to-red-600' }
    ]
  },
  {
    id: 'ea-6', rank: 6, playerName: 'WHALE1', amount: 58900.40, percentage: 46.95, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'FALCON Std', percentage: 60, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'WIZARD Prem', percentage: 40, color: 'from-indigo-600 via-violet-400 to-indigo-600' }
    ]
  },
  {
    id: 'ea-7', rank: 7, playerName: 'SNIPER', amount: 52100.90, percentage: 41.53, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'WIZARD Std', percentage: 90, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'KIRIN Prem', percentage: 10, color: 'from-pink-600 via-pink-400 to-pink-600' }
    ]
  },
  {
    id: 'ea-8', rank: 8, playerName: 'PROBOT', amount: 48500.20, percentage: 38.66, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'KIRIN Std', percentage: 40, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'PHOENIX Prem', percentage: 30, color: 'from-teal-600 via-teal-400 to-teal-600' },
      { eaId: 'COBRA Std', percentage: 30, color: 'from-blue-600 via-cyan-400 to-blue-600' }
    ]
  },
  {
    id: 'ea-9', rank: 9, playerName: 'ALPHA', amount: 42300.10, percentage: 33.72, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'PHOENIX Std', percentage: 100, color: 'from-orange-600 via-yellow-400 to-orange-600' }
    ]
  },
  {
    id: 'ea-10', rank: 10, playerName: 'OMEGA', amount: 38900.50, percentage: 31.01, rankChange: 'none',
    eaBreakdown: [
      { eaId: 'COBRA Prem', percentage: 50, color: 'from-orange-600 via-yellow-400 to-orange-600' },
      { eaId: 'LOTTO Std', percentage: 50, color: 'from-green-600 via-emerald-400 to-green-600' }
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
    <div className="flex items-center gap-3 sm:gap-4 mb-2 justify-center w-full">
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
        {percentage.toFixed(1)}%
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
        <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer">
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

const getLeaderboardDateRangeLabel = () => {
  const competitionStart = new Date(2026, 4, 1);
  const now = new Date();
  const effectiveDate = now < competitionStart ? competitionStart : now;
  const startOfMonth = new Date(effectiveDate.getFullYear(), effectiveDate.getMonth(), 1);
  const endOfMonth = new Date(effectiveDate.getFullYear(), effectiveDate.getMonth() + 1, 0);
  const monthName = startOfMonth.toLocaleString('en-US', { month: 'long' });
  const startDay = String(startOfMonth.getDate()).padStart(2, '0');
  const endDay = String(endOfMonth.getDate()).padStart(2, '0');

  return `${startDay} ${monthName} - ${endDay} ${monthName}, ${startOfMonth.getFullYear()}`;
};

const ChampionsPodium = ({ rankings, showPromotion = true }: { rankings: PlayerRankingItem[], showPromotion?: boolean }) => {
  // rankings 是按 rank 排序的数组: [0]=第1名, [1]=第2名, [2]=第3名
  const [liveAmounts, setLiveAmounts] = useState({
    first: rankings[0]?.amount || 1000000.00,
    second: rankings[1]?.amount || 98765.20,
    third: rankings[2]?.amount || 85432.10
  });
  const leaderboardDateRangeLabel = getLeaderboardDateRangeLabel();

  const first = rankings[0];   // 第1名 - 中间
  const second = rankings[1];  // 第2名 - 左边
  const third = rankings[2];   // 第3名 - 右边

  // Simulate live amount updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAmounts((prev: { first: number; second: number; third: number }) => ({
        first: prev.first + (Math.random() * 500 - 100), // Fluctuate more for first place
        second: prev.second + (Math.random() * 200 - 50),
        third: prev.third + (Math.random() * 150 - 40)
      }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-4 relative z-10 w-full">
      {/* Date and Entry Fee - Desktop */}
      {showPromotion && (
      <div className="hidden md:flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-8 py-4 rounded-2xl border-2 border-blue-400/60 shadow-[0_0_25px_rgba(59,130,246,0.5)] backdrop-blur-sm animate-pulse">
          <Calendar className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
          <span className="text-white font-black text-xl md:text-2xl tracking-wider uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{leaderboardDateRangeLabel}</span>
        </div>

        <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 rounded-2xl border-2 border-yellow-400 shadow-[0_0_30px_rgba(34,197,94,0.6)] backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-2xl animate-pulse"></div>
          <span className="relative text-yellow-300 font-black text-xl md:text-2xl tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
            無需報名費 <span className="text-white">NO ENTRY FEE</span>
          </span>
        </div>
      </div>
      )}

      {/* Three Cups Layout with Background */}
      <div className="w-full max-w-6xl mx-auto relative">
        {/* Background Image - Centered */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/bg/no1bg.png)' }}
        />

        {/* Cups Only - No text underneath */}
        <div className="relative z-10 flex justify-center items-end gap-3 sm:gap-6 md:gap-8 pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-0">
          {/* 2nd Place Cup - Left */}
          <div className="relative w-[110px] sm:w-[150px] md:w-[200px] lg:w-[250px] pb-2 sm:pb-4">
            <img
              src="/bg/No2andNo3Cup.png"
              alt="2nd Place"
              className="w-full h-auto opacity-95"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(192,192,192,0.4))',
                animation: 'pulseGlow 3s ease-in-out infinite'
              }}
            />
            {/* Ranking Number B2 */}
            <img
              src="/bg/B_Number/B2.png"
              alt="2nd"
              className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[40%] h-auto"
              style={{
                animation: 'subtleBounce 4s ease-in-out infinite',
                animationDelay: '0.4s'
              }}
            />
          </div>

          {/* 1st Place Cup - Center */}
          <div className="relative w-[160px] sm:w-[220px] md:w-[300px] lg:w-[380px] -mx-2 sm:-mx-3 md:-mx-6 z-10 pb-4 sm:pb-6">
            <img
              src="/bg/No1Cup.png"
              alt="1st Place"
              className="w-full h-auto"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.7))',
                animation: 'pulseGlowGold 3s ease-in-out infinite'
              }}
            />
            {/* Ranking Number B1 */}
            <img
              src="/bg/B_Number/B1.png"
              alt="1st"
              className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[40%] h-auto"
              style={{
                animation: 'subtleBounce 4s ease-in-out infinite'
              }}
            />
          </div>

          {/* 3rd Place Cup - Right */}
          <div className="relative w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] pb-2 sm:pb-4">
            <img
              src="/bg/No2andNo3Cup.png"
              alt="3rd Place"
              className="w-full h-auto opacity-90"
              style={{
                transform: 'scaleX(-1)',
                filter: 'drop-shadow(0 0 15px rgba(205,127,50,0.4))',
                animation: 'pulseGlowBronze 3s ease-in-out infinite'
              }}
            />
            {/* Ranking Number B3 */}
            <img
              src="/bg/B_Number/B3.png"
              alt="3rd"
              className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[40%] h-auto"
              style={{
                animation: 'subtleBounce 4s ease-in-out infinite',
                animationDelay: '0.8s'
              }}
            />
          </div>
        </div>

        {/* Names and Amounts Row - Match trophy alignment exactly */}
        <div className="relative z-10 flex justify-center items-start gap-3 sm:gap-6 md:gap-8 -mt-12 sm:-mt-16 md:-mt-20 pb-4 sm:pb-6 md:pb-8">
          {/* 2nd Place Info - Match width of 2nd place cup */}
          <div className="text-center w-[110px] sm:w-[150px] md:w-[200px] lg:w-[250px]">
            <div
              className="font-black text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wider uppercase"
              style={{
                color: '#FFD700',
                textShadow: '0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.6), 0 0 30px rgba(255,215,0,0.4), 0 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '1px rgba(139,69,19,0.5)'
              }}
            >
              {second?.playerName || 'TRADER'}
            </div>
            <div
              className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide mt-0.5"
              style={{
                color: '#FFF8DC',
                textShadow: '0 0 8px rgba(255,215,0,0.9), 0 0 16px rgba(255,215,0,0.7), 0 2px 4px rgba(0,0,0,1)'
              }}
            >
              ${liveAmounts.second.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          {/* 1st Place Info - Match width and negative margin of 1st place cup */}
          <div className="text-center w-[160px] sm:w-[220px] md:w-[300px] lg:w-[380px] -mx-2 sm:-mx-3 md:-mx-6">
            <div
              className="font-black text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase"
              style={{
                color: '#FFD700',
                textShadow: '0 0 12px rgba(255,215,0,1), 0 0 24px rgba(255,215,0,0.8), 0 0 36px rgba(255,215,0,0.6), 0 0 48px rgba(255,165,0,0.4), 0 2px 4px rgba(0,0,0,0.9)',
                WebkitTextStroke: '1.5px rgba(139,69,19,0.6)'
              }}
            >
              {first?.playerName || 'ALEX99'}
            </div>
            <div
              className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide mt-0.5"
              style={{
                color: '#FFF8DC',
                textShadow: '0 0 10px rgba(255,215,0,1), 0 0 20px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.6), 0 2px 4px rgba(0,0,0,1)'
              }}
            >
              ${liveAmounts.first.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          {/* 3rd Place Info - Match width of 3rd place cup */}
          <div className="text-center w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px]">
            <div
              className="font-black text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wider uppercase"
              style={{
                color: '#FFB347',
                textShadow: '0 0 8px rgba(255,165,0,0.8), 0 0 16px rgba(255,165,0,0.5), 0 0 24px rgba(255,140,0,0.3), 0 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '1px rgba(139,69,19,0.5)'
              }}
            >
              {third?.playerName || 'CRYPTO'}
            </div>
            <div
              className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide mt-0.5"
              style={{
                color: '#FFE4B5',
                textShadow: '0 0 6px rgba(255,165,0,0.9), 0 0 12px rgba(255,165,0,0.6), 0 2px 4px rgba(0,0,0,1)'
              }}
            >
              ${liveAmounts.third.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Go Market Bonus Promotion */}
      {showPromotion && (
      <div className="flex justify-center items-center mt-8 mb-4 px-4">
        <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-4 border-yellow-300 shadow-[0_0_40px_rgba(251,191,36,0.8)] overflow-hidden">
          {/* Animated background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>

          <div className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            <span className="text-black text-base sm:text-xl md:text-2xl font-bold drop-shadow-md">使用</span>

            <span className="inline-flex items-center px-4 py-1.5 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl border-2 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)]">
              <span className="text-white text-xl sm:text-2xl md:text-3xl font-black tracking-wide" style={{
                textShadow: '0 0 10px rgba(147,197,253,0.8), 0 2px 6px rgba(0,0,0,0.9)'
              }}>
                Go Market
              </span>
            </span>

            <span className="text-black text-base sm:text-xl md:text-2xl font-bold drop-shadow-md">帳戶參賽者將會額外獲得</span>

            <span className="inline-flex items-center px-4 py-1.5 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-xl border-3 border-yellow-300 shadow-[0_0_20px_rgba(239,68,68,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)]"
              style={{
                animation: 'subtleBounce 2s ease-in-out infinite'
              }}>
              <span className="text-yellow-300 text-xl sm:text-2xl md:text-3xl font-black tracking-wider" style={{
                textShadow: '0 0 15px rgba(253,224,71,1), 0 0 25px rgba(253,224,71,0.8), 0 3px 8px rgba(0,0,0,1)'
              }}>
                獎金兩倍
              </span>
            </span>

            <span className="text-black text-base sm:text-xl md:text-2xl font-bold drop-shadow-md">加成</span>
          </div>

          {/* Decorative stars */}
          <div className="absolute -top-2 -left-2 text-yellow-200 text-2xl sm:text-3xl" style={{ animation: 'twinkle 2s ease-in-out infinite' }}>⭐</div>
          <div className="absolute -top-2 -right-2 text-yellow-200 text-2xl sm:text-3xl" style={{ animation: 'twinkle 2s ease-in-out infinite 0.5s' }}>⭐</div>
          <div className="absolute -bottom-2 -left-2 text-yellow-200 text-2xl sm:text-3xl" style={{ animation: 'twinkle 2s ease-in-out infinite 1s' }}>⭐</div>
          <div className="absolute -bottom-2 -right-2 text-yellow-200 text-2xl sm:text-3xl" style={{ animation: 'twinkle 2s ease-in-out infinite 1.5s' }}>⭐</div>
        </div>
      </div>
      )}

      {/* Date and Entry Fee - Mobile only */}
      {showPromotion && (
      <div className="flex md:hidden flex-col items-center justify-center gap-4 mt-6">
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-6 py-3 rounded-xl border-2 border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.5)] backdrop-blur-sm animate-pulse">
          <Calendar className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
          <span className="text-white font-black text-base tracking-wider uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">{leaderboardDateRangeLabel}</span>
        </div>

        <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-xl border-2 border-yellow-400 shadow-[0_0_25px_rgba(34,197,94,0.6)] backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-xl animate-pulse"></div>
          <span className="relative text-yellow-300 font-black text-base tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,1)] text-center">
            無需報名費<br/>
            <span className="text-white text-sm">NO ENTRY FEE</span>
          </span>
        </div>
      </div>
      )}
    </div>
  );
};

const SideAds = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const BANNER_HEIGHT = 480; // Approximate topbanner + LEADERBOARD height
  
  useEffect(() => {
    const checkWidth = () => {
      const viewportWidth = window.innerWidth;
      const leaderboardWidth = 1152;
      const sideSpace = (viewportWidth - leaderboardWidth) / 2;
      setIsVisible(sideSpace >= 188);
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    checkWidth();
    handleScroll();
    
    window.addEventListener('resize', checkWidth, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkWidth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (!isVisible) return null;

  // Calculate ad position: fixed below navbar, follow scroll after banner
  const baseTop = 100;
  const scrollOffset = Math.max(0, scrollY - BANNER_HEIGHT + 100);
  const adTop = baseTop + scrollOffset * 0.1; // Subtle parallax effect

  return (
    <>
      {/* Left Side Ad */}
      <div 
        className="fixed z-30 transition-all duration-500 ease-out" 
        style={{ 
          top: `${adTop}px`,
          right: 'calc(50% + 576px + 8px)',
          maxWidth: '180px',
          transform: `translateY(${scrollOffset * 0.05}px)`
        }}
      >
        <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer">
          <img 
            src="/ibpromotion/Static_catch_the_golden_opportunity-300x600-English-GOMU.jpg" 
            alt="Catch the Golden Opportunity" 
            className="w-full h-auto rounded-xl shadow-2xl cursor-pointer hover:opacity-90 transition-all duration-300 hover:scale-105"
          />
        </a>
      </div>
      {/* Right Side Ad */}
      <div 
        className="fixed z-30 transition-all duration-500 ease-out" 
        style={{ 
          top: `${adTop}px`,
          left: 'calc(50% + 576px + 8px)',
          maxWidth: '180px',
          transform: `translateY(${scrollOffset * 0.05}px)`
        }}
      >
        <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer">
          <img 
            src="/ibpromotion/Static_catch_the_golden_opportunity-300x600-English-GOMU.jpg" 
            alt="Catch the Golden Opportunity" 
            className="w-full h-auto rounded-xl shadow-2xl cursor-pointer hover:opacity-90 transition-all duration-300 hover:scale-105"
          />
        </a>
      </div>
    </>
  );
};

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: 'home' | 'annual' | 'monthly') => void }) => {
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setLeaderboardOpen(false);

    const NAVBAR_HEIGHT = 120; // 固定導航欄高度 + 間距
    
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-yellow-500/10 px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <div className="cursor-pointer max-w-[160px] sm:max-w-[200px] md:max-w-[240px]" onClick={() => scrollTo('home')}>
            <img src="/bg/ACE Fortune Logo D1a.png?v=1" alt="ACE Fortune Logo" className="h-9 sm:h-11 md:h-14 w-full object-contain" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Home */}
          <button onClick={() => scrollTo('home')} className={`${currentPage === 'home' ? activeBtn : navBtn} text-lg`}>
            Home
          </button>

          {/* Leaderboard dropdown */}
          <div className="relative">
            <button
              onClick={() => setLeaderboardOpen(o => !o)}
              className={`${navBtn} flex items-center gap-1 text-lg`}
            >
              Leaderboard
              <ChevronRight className={`w-4 h-4 transition-transform ${leaderboardOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
            {leaderboardOpen && (
              <div className="absolute top-full left-0 mt-2 bg-black border border-yellow-500/20 rounded-xl shadow-2xl py-1 min-w-[240px]">
                <button onClick={() => scrollTo('月總排名')} className={`${dropdownItem} text-base py-3`}>月總排名</button>
                <button onClick={() => scrollTo('月程式排名')} className={`${dropdownItem} text-base py-3`}>月程式排名</button>
                <button onClick={() => scrollTo('symbols')} className={`${dropdownItem} text-base py-3`}>Most Used Symbols</button>
              </div>
            )}
          </div>

          {/* Results - Direct buttons */}
          <button 
            onClick={() => goTo('annual', 'annual-results')} 
            className={`${currentPage === 'annual' ? activeBtn : navBtn} text-lg`}
          >
            Annual Results
          </button>
          <button 
            onClick={() => goTo('monthly', 'monthly-results')} 
            className={`${currentPage === 'monthly' ? activeBtn : navBtn} text-lg`}
          >
            Monthly Results
          </button>

          {/* 官方比賽細則 */}
          <button onClick={() => scrollTo('rules')} className={`${navBtn} text-lg`}>官方比賽細則</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden flex-1 justify-end">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-yellow-500 hover:text-white transition-colors p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Social Icons - Desktop Only */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-6">
          <a href="https://www.facebook.com/acefortuneresearch" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
          <a href="https://www.instagram.com/ace_fortune_research/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black border-b border-yellow-500/20 shadow-2xl py-6 px-6">
          <div className="flex flex-col gap-5">
            <button onClick={() => { scrollTo('home'); setMobileMenuOpen(false); }} className={`${currentPage === 'home' ? activeBtn : navBtn} text-lg py-3`}>
              Home
            </button>
            <button onClick={() => { scrollTo('月總排名'); setMobileMenuOpen(false); }} className={`${navBtn} text-lg py-3`}>
              月總排名
            </button>
            <button onClick={() => { scrollTo('月程式排名'); setMobileMenuOpen(false); }} className={`${navBtn} text-lg py-3`}>
              月程式排名
            </button>
            <button onClick={() => { scrollTo('symbols'); setMobileMenuOpen(false); }} className={`${navBtn} text-lg py-3`}>
              Most Used Symbols
            </button>
            <button onClick={() => { goTo('annual', 'annual-results'); setMobileMenuOpen(false); }} className={`${currentPage === 'annual' ? activeBtn : navBtn} text-lg py-3`}>
              Annual Results
            </button>
            <button onClick={() => { goTo('monthly', 'monthly-results'); setMobileMenuOpen(false); }} className={`${currentPage === 'monthly' ? activeBtn : navBtn} text-lg py-3`}>
              Monthly Results
            </button>
            <button onClick={() => { scrollTo('rules'); setMobileMenuOpen(false); }} className={`${navBtn} text-lg py-3`}>
              官方比賽細則
            </button>
            <div className="flex items-center gap-5 pt-5 border-t border-yellow-500/20">
              <a href="https://www.facebook.com/acefortuneresearch" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="https://www.instagram.com/ace_fortune_research/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdowns on outside click */}
      {(leaderboardOpen || mobileMenuOpen) && (
        <div className="fixed inset-0 z-[-1]" onClick={() => { setLeaderboardOpen(false); setMobileMenuOpen(false); }} />
      )}
    </nav>
  );
}

const DUMMY_USERS = [
  "ALEX99", "TRADER", "CRYPTO", "BULLRN", "MOONBY",
  "WHALE1", "SNIPER", "PROBOT", "ALPHA", "OMEGA"
];

// Add EA version suffix (Std or Prem) based on index
const addEAVersion = (eaName: string, index: number) => {
  // Alternate between Std and Prem based on index
  const version = index % 2 === 0 ? 'Std' : 'Prem';
  return `${eaName} ${version}`;
};

const useWindowSize = () => {
  const [size, setSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1024, height: typeof window !== 'undefined' ? window.innerHeight : 768 });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
};

const TotalRankingList = ({ rankings, isStatic = false, compact = false, highlightPremCoins = false }: { rankings: PlayerRankingItem[], isStatic?: boolean, compact?: boolean, highlightPremCoins?: boolean }) => {
  const { height, width } = useWindowSize();
  // Available height: subtract navbar (~64px), title+subtitle (~120px), container padding (~64px), gaps (9 * gap)
  const ROWS = 10;
  const RESERVED = 64 + 120 + 64;
  const GAP = compact ? 4 : 4;
  const availableH = height - RESERVED - (ROWS - 1) * GAP;
  // On mobile, use fixed smaller row height; on desktop, use dynamic calculation
  const isMobile = width < 640;
  const rowH = isMobile ? 56 : Math.max(52, Math.floor(availableH / ROWS));
  const iconSize = Math.max(28, Math.min(56, rowH * 0.8));
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
                  <img src={`/bg/Number_A_PNG/A${item.rank}.png?v=1`} alt={`Rank ${item.rank}`} className="relative z-10 object-contain drop-shadow-lg" style={{ width: `${item.rank <= 3 ? iconSize : item.rank === 10 ? iconSize * 0.82 : item.rank === 7 ? iconSize * 0.64 : iconSize * 0.72}px`, height: `${item.rank <= 3 ? iconSize : item.rank === 10 ? iconSize * 0.82 : item.rank === 7 ? iconSize * 0.64 : iconSize * 0.72}px` }} />
                ) : (
                  <span className="font-black italic text-slate-400" style={{ fontFamily: 'Impact, sans-serif', fontSize: `${fontSize * 1.5}px` }}>{item.rank}</span>
                )}
              </div>
            </div>

            {/* 升跌標誌 */}
            <div className="flex-shrink-0 flex items-center justify-center" style={{ width: `${fontSize + 8}px`, paddingLeft: '4px' }}>
              {item.rankChange === 'up' && (
                <span className="text-green-500 font-bold drop-shadow-sm" style={{ fontSize: `${fontSize + 4}px`, lineHeight: '1' }}>▲</span>
              )}
              {item.rankChange === 'down' && (
                <span className="text-red-500 font-bold drop-shadow-sm" style={{ fontSize: `${fontSize + 4}px`, lineHeight: '1' }}>▼</span>
              )}
            </div>

            {/* 用戶名 */}
            <div className="flex-shrink-0 font-black text-slate-800 tracking-tight whitespace-nowrap border-l border-slate-200/80 truncate" style={{ fontSize: `${fontSize}px`, paddingLeft: isMobile ? '4px' : '8px', paddingRight: isMobile ? '4px' : '8px', width: isMobile ? '90px' : '230px' }}>
              {item.playerName}
            </div>

            {/* EA Coins + 能量條 - 自動填充剩餘空間 */}
            <div className="flex-1 flex flex-col justify-center min-w-0" style={{ paddingLeft: isMobile ? '2px' : '6px', paddingRight: isMobile ? '2px' : '6px', gap: '2px' }}>
              <div className="flex items-center" style={{ gap: '2px' }}>
                {[...item.eaBreakdown]
                  .sort((a, b) => b.percentage - a.percentage)
                  .slice(0, isMobile ? 2 : 3)
                  .map((ea, idx) => {
                  // Extract EA name without version suffix (e.g., "PHOENIX Std" -> "PHOENIX")
                  const eaNameOnly = ea.eaId.split(' ')[0];
                  const isPrem = ea.eaId.toLowerCase().includes('prem');
                  const coinName = eaNameOnly.charAt(0).toUpperCase() + eaNameOnly.slice(1).toLowerCase() + 'Coin.png';
                  return (
                    <div key={idx} className="relative group">
                      {highlightPremCoins && isPrem && (
                        <div
                          className="pointer-events-none absolute inset-[-2px] rounded-full border-2 border-yellow-400 shadow-[0_0_10px_rgba(251,191,36,0.65)]"
                          aria-hidden="true"
                        />
                      )}
                      <img
                        src={`/eacoin/${coinName}`}
                        alt={ea.eaId}
                        className="relative z-10 object-contain drop-shadow cursor-pointer hover:scale-125 transition-transform duration-200"
                        style={{ width: `${coinSize}px`, height: `${coinSize}px` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {ea.eaId}
                      </div>
                    </div>
                  );
                })}
              </div>
              <StackedEnergyBar totalPercentage={item.percentage || 0} breakdown={item.eaBreakdown} className="w-full" skewClass="skew-x-[-20deg]" />
            </div>

            {/* 金額 */}
            <div className="flex-shrink-0 flex items-center justify-end" style={{ width: isMobile ? 'auto' : '200px', minWidth: isMobile ? '100px' : '200px' }}>
              <div className="font-black italic tracking-tighter whitespace-nowrap tabular-nums leading-none"
                style={{ fontSize: `${amountSize}px`, color: '#000080', WebkitTextStroke: isMobile ? '0.5px #000080' : '1px #000080', textShadow: 'none' }}>
                $ {isStatic ? item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : <AnimatedNumber value={item.amount} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const EARankingList = ({ rankings, isStatic = false, compact = false, showPercentage = false, shrinkRank7 = false }: { rankings: RankingItem[], isStatic?: boolean, compact?: boolean, showPercentage?: boolean, shrinkRank7?: boolean }) => {
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
          <div className={`flex justify-center items-center flex-shrink-0 ${compact ? 'w-12 sm:w-14 md:w-24' : 'w-20 sm:w-24 md:w-52'}`}>
            {item.rank <= 10 ? (
              <div className="relative flex items-center justify-center">
                {/* Glow effect for top 3 */}
                {!compact && item.rank === 1 && <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-60 rounded-full scale-[2.5] sm:scale-[3] md:scale-[4] animate-pulse"></div>}
                {!compact && item.rank === 2 && <div className="absolute inset-0 bg-slate-300 blur-lg opacity-60 rounded-full scale-[2] sm:scale-[2.5] md:scale-[3] animate-pulse"></div>}
                {!compact && item.rank === 3 && <div className="absolute inset-0 bg-amber-600 blur-lg opacity-60 rounded-full scale-[1.5] sm:scale-[2] md:scale-[2.5] animate-pulse"></div>}
                
                <img
                  src={`/bg/Number_A_PNG/A${item.rank}.png?v=1`}
                  alt={`Rank ${item.rank}`}
                  className={`relative z-10 object-contain drop-shadow-md transition-transform ${
                    compact
                      ? item.rank === 7 && shrinkRank7
                        ? 'w-6 h-6 sm:w-8 sm:h-8 scale-100'
                        : 'w-7 h-7 sm:w-9 sm:h-9 scale-100'
                      : item.rank === 1 ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 scale-[2] sm:scale-[2.5] md:scale-[3.5] drop-shadow-[0_0_20px_rgba(250,204,21,1)]' :
                        item.rank === 2 ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 scale-[1.6] sm:scale-[2] md:scale-[2.5] drop-shadow-[0_0_15px_rgba(148,163,184,0.9)]' :
                        item.rank === 3 ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 scale-[1.4] sm:scale-[1.6] md:scale-[2.0] drop-shadow-[0_0_15px_rgba(217,119,6,0.9)]' :
                        item.rank >= 4 && item.rank <= 6 ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 scale-[1.2] sm:scale-[1.4] md:scale-[1.7]' :
                        item.rank === 10 ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 scale-[1.2] sm:scale-[1.3] md:scale-[1.4]' :
                        'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'
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
            {item.rankChange === 'up' && (
              <span className="text-green-500 font-bold drop-shadow-sm text-sm sm:text-base md:text-lg">▲</span>
            )}
            {item.rankChange === 'down' && (
              <span className="text-red-500 font-bold drop-shadow-sm text-sm sm:text-base md:text-lg">▼</span>
            )}
          </div>
          <div className={`flex items-center pl-1 sm:pl-2 md:pl-4 min-w-0 ${compact ? 'gap-1 md:gap-2' : 'gap-2 sm:gap-3 md:gap-6'}`}>
            <span 
              className={`font-black text-slate-800 tracking-wider sm:tracking-widest uppercase text-left leading-none truncate ${compact ? 'text-sm sm:text-base md:text-2xl' : 'text-xl sm:text-2xl md:text-4xl'}`}
            >
              {item.eaId.toUpperCase()}
            </span>
          </div>
          {!showPercentage && (
            <span
              className={`font-black text-slate-800 leading-none text-right opacity-80 flex-shrink-0 ${compact ? 'text-sm sm:text-base md:text-xl' : 'text-lg sm:text-xl md:text-3xl'}`}
            >
              $
            </span>
          )}
          <span
            className={`font-black text-slate-900 tracking-tight text-right leading-none tabular-nums whitespace-nowrap flex-shrink-0 ${compact ? 'text-xs sm:text-sm md:text-xl w-[70px] sm:w-[90px] md:w-[140px]' : 'text-lg sm:text-xl md:text-3xl w-[100px] sm:w-[130px] md:w-[220px]'}`}
          >
            {showPercentage
              ? `${item.percentage.toFixed(1)}%`
              : (isStatic ? item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : <AnimatedNumber value={item.amount} />)
            }
          </span>
        </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const getSeedValue = (value: string) =>
  value.split('').reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);

const AceTesterBanner = () => {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <a
        href="https://www.ace-tester.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mb-5 block overflow-hidden rounded-[1.75rem] border-2 border-yellow-300/80 bg-gradient-to-r from-[#fff3a3] via-[#f59e0b] to-[#ef4444] p-[2px] shadow-[0_0_0_2px_rgba(255,255,255,0.08),0_18px_45px_rgba(239,68,68,0.32),0_0_45px_rgba(245,158,11,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
      >
        <div className="relative flex min-h-[96px] items-center overflow-hidden rounded-[calc(1.75rem-2px)] bg-[linear-gradient(115deg,rgba(124,10,10,0.98),rgba(30,41,59,0.95)_18%,rgba(3,7,18,0.96)_38%,rgba(2,132,199,0.95)_68%,rgba(245,158,11,0.95)_88%,rgba(239,68,68,0.96))] px-4 py-4 sm:min-h-[108px] sm:px-6 md:px-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(-55deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_12px,transparent_12px,transparent_28px)] opacity-20" />
            <div className="absolute -left-16 top-0 h-full w-24 -skew-x-12 bg-white/20 blur-md transition-transform duration-700 group-hover:translate-x-[190%]" />
            <div className="absolute left-1/3 top-0 h-full w-20 -skew-x-12 bg-yellow-200/20 blur-md transition-transform duration-700 group-hover:translate-x-[240%]" />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_68%)]" />
            <div className="absolute inset-y-0 left-0 w-28 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.18),transparent_72%)]" />
          </div>
          <div className="relative z-10 flex w-full items-center justify-between gap-3 sm:gap-4">
            <div className="hidden sm:flex shrink-0 items-center justify-center">
              <div className="rounded-2xl border border-white/25 bg-black/25 px-3 py-3 shadow-[inset_0_0_18px_rgba(255,255,255,0.08)] backdrop-blur-sm">
                <div className="text-center font-black italic leading-none text-yellow-300">
                  <div className="text-[11px] tracking-[0.35em]">HOT</div>
                  <div className="mt-1 text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">SETTING</div>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full border border-red-300/70 bg-red-500 px-2 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-[0_0_16px_rgba(239,68,68,0.75)] sm:text-[11px]">
                  爆推
                </span>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-yellow-200 sm:text-xs">
                  ACE TESTER
                </p>
              </div>
              <p className="text-sm font-black leading-snug text-white sm:text-base md:text-xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>
                唔知用咩Setting比賽好? 去 Ace Tester 尋寶啦! 海量Setting等緊你黎下載!
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-yellow-100/90 sm:text-xs">
                Download More Winning Setups Now
              </p>
            </div>
            <div className="shrink-0">
              <div className="rounded-full border-2 border-white/80 bg-[linear-gradient(135deg,#fef08a,#f59e0b,#ef4444)] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_20px_rgba(254,240,138,0.45),0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105 sm:px-5 sm:py-3 sm:text-sm">
                立即前往 {'>>'}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const generateProgramRankingsForPeriod = (charName: string, periodKey: string, annualMode = false): RankingItem[] => {
  const seed = getSeedValue(`${periodKey}-${charName}`);
  const rotatedUsers = DUMMY_USERS.map((_, index) => DUMMY_USERS[(index + (seed % DUMMY_USERS.length)) % DUMMY_USERS.length]);
  const baseAmount = annualMode ? 180000 : 52000;
  const gap = annualMode ? 3200 : 900;
  const variance = annualMode ? 9500 : 3200;
  const baselineAmount = annualMode ? 90000 : 40000;

  return rotatedUsers
    .map((user, index) => {
      const bonus = (seed * (index + 5) + charName.charCodeAt(0) * 23) % variance;
      const swing = ((seed + index * 37) % Math.max(1, Math.floor(variance / 2)));
      const amount = baseAmount + (DUMMY_USERS.length - index) * gap + bonus - swing;

      return {
        id: `${periodKey}-${charName.toLowerCase()}-${index + 1}`,
        rank: index + 1,
        playerName: user,
        eaId: user,
        amount,
        percentage: 0,
        rankChange: 'none' as 'up' | 'down' | 'none',
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
      percentage: Number(((item.amount / baselineAmount) * 100).toFixed(1)),
    }));
};

const ProgramRankingSection = ({
  title,
  subtitle,
  periodKey,
  annualMode = false,
}: {
  title: string,
  subtitle: string,
  periodKey: string,
  annualMode?: boolean,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0].name);
  const rankings = generateProgramRankingsForPeriod(selectedCharacter, periodKey, annualMode);
  const coinName = `${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1).toLowerCase()}Coin.png`;

  return (
    <section>
      <SectionTitle subtitle={subtitle}>{title}</SectionTitle>
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2 mb-4 px-1 sm:px-0">
          {characters.map((char) => {
            const isWizard = char.name === 'WIZARD';

            if (isWizard) {
              return (
                <div
                  key={char.name}
                  className="relative rounded-lg overflow-hidden border-2 border-slate-800 bg-white/80 shadow-lg min-h-[60px] sm:min-h-[80px] flex items-center justify-center cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-slate-400/60"></div>
                  <span className="relative text-slate-600 font-black text-[10px] sm:text-xs md:text-sm tracking-wider text-center px-1 leading-tight z-10">
                    New EA<br/>Coming<br/>Soon
                  </span>
                </div>
              );
            }

            return (
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
            );
          })}
        </div>

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
              <div>
                <div className="rounded-full border border-cyan-700/40 bg-white/25 p-[2px] shadow-sm">
                  <img
                    src={`/eacoin/${coinName}`}
                    alt={`${selectedCharacter} STD Coin`}
                    className="w-6 h-6 rounded-full object-contain drop-shadow-md sm:w-8 sm:h-8"
                  />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>{selectedCharacter}</h3>
              <div>
                <div className="rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600 p-[2px] shadow-[0_0_12px_rgba(251,191,36,0.55)]">
                  <img
                    src={`/eacoin/${coinName}`}
                    alt={`${selectedCharacter} PREM Coin`}
                    className="w-6 h-6 rounded-full object-contain bg-white/15 drop-shadow-md sm:w-8 sm:h-8"
                  />
                </div>
              </div>
              <div className="absolute left-0 flex items-center gap-1 sm:gap-2 bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-200">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                <span className="text-amber-700 font-bold text-[10px] sm:text-xs tracking-widest">FINAL</span>
              </div>
              <div className="absolute right-0">
                <span className="bg-blue-600/90 text-white font-bold text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1 rounded-lg border-2 border-blue-400 shadow-md">
                  Profit Percentage
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 px-0 md:px-2">
              <EARankingList rankings={rankings} compact={true} showPercentage={true} shrinkRank7={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
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
    const eaName = characters[index % characters.length].name;
    return {
      id: `annual-ea-${index}`,
      rank: index + 1,
      playerName: user,
      eaId: addEAVersion(eaName, index),
      amount: amount,
      percentage: Math.max(15, (amount / 800000) * 100),
      rankChange: ['up', 'down', 'none'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'none'
    };
  }).sort((a, b) => b.amount - a.amount).map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <>
      {/* Top Banner Image */}
      <div className="w-full bg-black pt-16 sm:pt-20 relative">
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
      <main className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4  pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        <div className="text-center mb-8 relative">
        <p className="text-xl md:text-2xl text-slate-300 font-bold tracking-widest">2026.05 - 2027.04</p>
      </div>

      {/* Total Profit Showcase */}
      <section className="mb-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 2025 Total Profit */}
          <div className="relative bg-gradient-to-r from-amber-900/80 via-yellow-700/80 to-amber-900/80 rounded-3xl p-6 sm:p-8 border-4 border-yellow-600/50 shadow-[0_0_50px_rgba(251,191,36,0.4)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-shimmer"></div>
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-4xl sm:text-5xl md:text-6xl">🏆</div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-yellow-300 tracking-wider">2025 年度總盈利</h3>
                  <p className="text-sm sm:text-base text-yellow-200/80 font-bold">Previous Year Total Profit</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight tabular-nums"
                  style={{
                    textShadow: '0 0 20px rgba(255,215,0,1), 0 0 40px rgba(255,215,0,0.6), 0 4px 8px rgba(0,0,0,0.9)',
                    WebkitTextStroke: '2px #D4AF37'
                  }}>
                  $ 10,832,016.85
                </div>
              </div>
            </div>
          </div>

          {/* 2026 Total Profit */}
          <div className="relative bg-gradient-to-r from-green-900/80 via-emerald-700/80 to-green-900/80 rounded-3xl p-6 sm:p-8 border-4 border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.4)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-shimmer"></div>
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-4xl sm:text-5xl md:text-6xl">💰</div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-green-300 tracking-wider">2026 年度總盈利</h3>
                  <p className="text-sm sm:text-base text-green-200/80 font-bold">Current Year Total Profit</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight tabular-nums"
                  style={{
                    textShadow: '0 0 20px rgba(34,197,94,1), 0 0 40px rgba(34,197,94,0.6), 0 4px 8px rgba(0,0,0,0.9)',
                    WebkitTextStroke: '2px #10B981',
                    animation: 'pulseNumber 2s ease-in-out infinite'
                  }}>
                  $ 15,247,893.42
                </div>
                <div className="text-green-300 text-sm sm:text-base md:text-lg font-bold mt-2 flex items-center justify-end gap-1">
                  <span>▲</span>
                  <span>+40.8% vs 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <AceTesterBanner />

      <ProgramRankingSection
        title="年度程式排名"
        subtitle="ANNUAL PROGRAM RANKING"
        periodKey="annual-2026-2027"
        annualMode={true}
      />

      {/* Ad Banner - Below ALL EA RANKING */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 sm:my-12">
        <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer" className="block w-full">
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
        <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer" className="block w-full">
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

  // Check if a month has ended (month is in the past)
  const isMonthEnded = (monthStr: string) => {
    // 2026-05 is always available as an exception
    if (monthStr === '2026-05') return true;

    const [year, month] = monthStr.split('-').map(Number);
    // month from string is 1-12, but Date constructor expects 0-11
    // Get the last moment of the month (last day at 23:59:59.999)
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
    const now = new Date();

    // Month has ended if current date is after the end of that month
    return now > endOfMonth;
  };

  // Set initial month to the latest ended month
  useEffect(() => {
    const latestEndedMonth = months.slice().reverse().find(month => isMonthEnded(month));
    if (latestEndedMonth && selectedMonth !== latestEndedMonth && !isMonthEnded(selectedMonth)) {
      setSelectedMonth(latestEndedMonth);
    }
  }, []);

  // Auto-scroll to Total Ranking when month changes
  useEffect(() => {
    const element = document.getElementById('monthly-total-ranking');
    if (element) {
      const NAVBAR_HEIGHT = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - NAVBAR_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [selectedMonth]);

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
    const eaName = characters[index % characters.length].name;
    return {
      id: `monthly-ea-${index}`,
      rank: index + 1,
      playerName: user,
      eaId: addEAVersion(eaName, index),
      amount: amount,
      percentage: Math.max(15, (amount / 100000) * 100),
      rankChange: ['up', 'down', 'none'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'none'
    };
  }).sort((a, b) => b.amount - a.amount).map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <>
      {/* Top Banner Image */}
      <div className="w-full bg-black pt-16 sm:pt-20 relative">
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
      <main className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4  pb-16 sm:pb-24 space-y-12 sm:space-y-16">
        <div className="text-center mb-8 relative">
        </div>

      {/* Month Selector */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-8 sm:mb-12 px-2">
        {months.map(month => {
          const monthEnded = isMonthEnded(month);
          return (
            <button
              key={month}
              onClick={() => monthEnded && setSelectedMonth(month)}
              disabled={!monthEnded}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 md:px-6 md:py-3 rounded-lg sm:rounded-xl font-bold tracking-wider sm:tracking-widest text-xs sm:text-sm md:text-base transition-all min-h-[40px] sm:min-h-[44px] ${
                !monthEnded
                  ? 'bg-slate-600 text-slate-500 cursor-not-allowed opacity-50'
                  : selectedMonth === month
                    ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-105'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer'
              }`}
            >
              {month}
            </button>
          );
        })}
      </div>

      {/* Monthly Champions Podium */}
      <div className="mb-12 sm:mb-16">
        <ChampionsPodium rankings={finalMonthlyRankings.slice(0, 3)} showPromotion={false} />
      </div>

      <section id="monthly-total-ranking">
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
          <TotalRankingList rankings={finalMonthlyRankings} isStatic={true} highlightPremCoins={true} />
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

      <AceTesterBanner />

      <ProgramRankingSection
        title="月度程式排名"
        subtitle={`MONTHLY PROGRAM RANKING - ${selectedMonth}`}
        periodKey={`monthly-${selectedMonth}`}
      />

      {/* Ad Banner - 1016x180 (Above Most Used Symbols) */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 sm:my-12">
        <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer" className="block w-full">
          <img 
            src="/ibpromotion/Static_20th_anniversery-1016x180-English-GOMU.jpg" 
            alt="20th Anniversary" 
            className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl hover:opacity-95 transition-opacity"
          />
        </a>
      </section>

      <SymbolsSection symbolsData={symbolsData} />

      {/* Ad Banner - 1490x350 (Below Marquee) */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer" className="block w-full">
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
  const [showPopup, setShowPopup] = useState(true);

  // Popup shows on every page refresh/navigation
  // No timer - user must close it manually

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

      // Use a fixed baseline for percentage calculation to allow values over 100%
      const baselineAmount = 40000; // Fixed baseline for profit percentage
      return generated.map((item, index) => ({
        ...item,
        rank: index + 1,
        percentage: (item.amount / baselineAmount) * 100
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

  // Auto-scroll to ranking list when character changes (mobile support)
  useEffect(() => {
    const element = document.getElementById('character-ranking-list');
    if (element) {
      const NAVBAR_HEIGHT = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - NAVBAR_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
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
      {/* Custom animation styles */}
      <style>{`
        @keyframes subtleBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(192,192,192,0.4));
          }
          50% {
            filter: drop-shadow(0 0 35px rgba(192,192,192,0.8));
          }
        }

        @keyframes pulseGlowGold {
          0%, 100% {
            filter: drop-shadow(0 0 40px rgba(255,215,0,0.7));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(255,215,0,1));
          }
        }

        @keyframes pulseGlowBronze {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(205,127,50,0.4));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(205,127,50,0.7));
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }

        @keyframes pulseNumber {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

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
          <div className="w-full bg-black pt-16 sm:pt-20 relative z-40">
            <img 
              src="/bg/ACE _topbanner.png" 
              alt="ACE Championship Banner" 
              className="w-full h-auto block"
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
          <main className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4  pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        
        {/* Leaderboard Section */}
        <section id="leaderboard" className="scroll-mt-20">
          <div className="text-center mb-16 relative">

            {/* Top 3 Champions - Component */}
            <ChampionsPodium rankings={initialRankings} />
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
                
                <TotalRankingList rankings={monthlyRankings} highlightPremCoins={true} />
              </div>
            </div>

            <div className="max-w-6xl mx-auto w-full">
              <a
                href="https://www.ace-tester.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mb-5 block overflow-hidden rounded-[1.75rem] border-2 border-yellow-300/80 bg-gradient-to-r from-[#fff3a3] via-[#f59e0b] to-[#ef4444] p-[2px] shadow-[0_0_0_2px_rgba(255,255,255,0.08),0_18px_45px_rgba(239,68,68,0.32),0_0_45px_rgba(245,158,11,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              >
                <div className="relative flex min-h-[96px] items-center overflow-hidden rounded-[calc(1.75rem-2px)] bg-[linear-gradient(115deg,rgba(124,10,10,0.98),rgba(30,41,59,0.95)_18%,rgba(3,7,18,0.96)_38%,rgba(2,132,199,0.95)_68%,rgba(245,158,11,0.95)_88%,rgba(239,68,68,0.96))] px-4 py-4 sm:min-h-[108px] sm:px-6 md:px-8">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(-55deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_12px,transparent_12px,transparent_28px)] opacity-20" />
                    <div className="absolute -left-16 top-0 h-full w-24 -skew-x-12 bg-white/20 blur-md transition-transform duration-700 group-hover:translate-x-[190%]" />
                    <div className="absolute left-1/3 top-0 h-full w-20 -skew-x-12 bg-yellow-200/20 blur-md transition-transform duration-700 group-hover:translate-x-[240%]" />
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_68%)]" />
                    <div className="absolute inset-y-0 left-0 w-28 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.18),transparent_72%)]" />
                  </div>
                  <div className="relative z-10 flex w-full items-center justify-between gap-3 sm:gap-4">
                    <div className="hidden sm:flex shrink-0 items-center justify-center">
                      <div className="rounded-2xl border border-white/25 bg-black/25 px-3 py-3 shadow-[inset_0_0_18px_rgba(255,255,255,0.08)] backdrop-blur-sm">
                        <div className="text-center font-black italic leading-none text-yellow-300">
                          <div className="text-[11px] tracking-[0.35em]">HOT</div>
                          <div className="mt-1 text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">SETTING</div>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-full border border-red-300/70 bg-red-500 px-2 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-[0_0_16px_rgba(239,68,68,0.75)] sm:text-[11px]">
                          爆推
                        </span>
                        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-yellow-200 sm:text-xs">
                          ACE TESTER
                        </p>
                      </div>
                      <p className="text-sm font-black leading-snug text-white sm:text-base md:text-xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>
                        唔知用咩Setting比賽好? 去 Ace Tester 尋寶啦! 海量Setting等緊你黎下載!
                      </p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-yellow-100/90 sm:text-xs">
                        Download More Winning Setups Now
                      </p>
                    </div>
                    <div className="shrink-0">
                      <div className="rounded-full border-2 border-white/80 bg-[linear-gradient(135deg,#fef08a,#f59e0b,#ef4444)] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_20px_rgba(254,240,138,0.45),0_8px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105 sm:px-5 sm:py-3 sm:text-sm">
                        立即前往 {'>>'}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="max-w-6xl mx-auto w-full">
              <div id="月程式排名"><SectionTitle subtitle="MONTHLY PROGRAM RANKING">月程式排名</SectionTitle></div>
              
              {/* 角色選擇器 - 8個橫向排列 */}
              <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2 mb-4 px-1 sm:px-0">
                {characters.map((char) => {
                  const isWizard = char.name === 'WIZARD';

                  if (isWizard) {
                    return (
                      <div
                        key={char.name}
                        className="relative rounded-lg overflow-hidden border-2 border-slate-800 bg-white/80 shadow-lg min-h-[60px] sm:min-h-[80px] flex items-center justify-center cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-slate-400/60"></div>
                        <span className="relative text-slate-600 font-black text-[10px] sm:text-xs md:text-sm tracking-wider text-center px-1 leading-tight z-10">
                          New EA<br/>Coming<br/>Soon
                        </span>
                      </div>
                    );
                  }

                  return (
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
                  );
                })}
              </div>
              
              {/* 排名列表 */}
              <div
                id="character-ranking-list"
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
                    <div>
                      <div className="rounded-full border border-cyan-700/40 bg-white/25 p-[2px] shadow-sm">
                        <img
                          src={`/eacoin/${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1).toLowerCase()}Coin.png`}
                          alt={`${selectedCharacter} STD Coin`}
                          className="w-6 h-6 rounded-full object-contain drop-shadow-md sm:w-8 sm:h-8"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>{selectedCharacter}</h3>
                    <div>
                      <div className="rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600 p-[2px] shadow-[0_0_12px_rgba(251,191,36,0.55)]">
                        <img
                          src={`/eacoin/${selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1).toLowerCase()}Coin.png`}
                          alt={`${selectedCharacter} PREM Coin`}
                          className="w-6 h-6 rounded-full object-contain bg-white/15 drop-shadow-md sm:w-8 sm:h-8"
                        />
                      </div>
                    </div>
                    <div className="absolute left-0 flex items-center gap-1 sm:gap-2 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-green-200">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <span className="text-green-600 font-bold text-[10px] sm:text-xs tracking-widest">LIVE</span>
                    </div>
                    <div className="absolute right-0">
                      <span className="bg-blue-600/90 text-white font-bold text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1 rounded-lg border-2 border-blue-400 shadow-md">
                        Profit Percentage
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 px-0 md:px-2">
                    <EARankingList rankings={characterRankings} compact={true} showPercentage={true} shrinkRank7={true} />
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </section>

        {/* Ad Banner - 1016x180 (Above Most Used Symbols) */}
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 sm:my-12">
          <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer" className="block w-full">
            <img 
              src="/ibpromotion/Static_20th_anniversery-1016x180-English-GOMU.jpg" 
              alt="20th Anniversary" 
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl hover:opacity-95 transition-opacity"
            />
          </a>
        </section>

        <SymbolsSection symbolsData={symbolsData} />

        {/* Ad Banner - 1490x350 (Below Marquee) */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
          <a href="https://app.gomarkets.mu/?Pcode=MLT6MDB&actype=2&s=r10" target="_blank" rel="noopener noreferrer" className="block w-full">
            <img 
              src="/ibpromotion/Static_catch_the_golden_opportunity-1490x350-English-GOMU.jpg" 
              alt="Catch the Golden Opportunity" 
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl hover:opacity-95 transition-opacity"
            />
          </a>
        </section>

        {/* Explore More Results -->
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
