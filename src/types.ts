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
