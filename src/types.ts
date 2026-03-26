export interface EARevenue {
  eaId: string;
  percentage: number;
  color: string;
}

export interface PlayerRankingItem {
  id: string;
  rank: number;
  prevRank?: number;
  rankChange?: 'up' | 'down' | 'none';
  playerName: string;
  amount: number;
  percentage?: number;
  eaBreakdown: EARevenue[];
}

export interface RankingItem {
  id: string;
  rank: number;
  prevRank?: number;
  rankChange?: 'up' | 'down' | 'none';
  eaId: string;
  amount: number;
  percentage?: number;
}

export interface SymbolItem {
  symbol: string;
  percentage: number;
}

export interface CharacterItem {
  name: string;
  imageUrl: string;
}
