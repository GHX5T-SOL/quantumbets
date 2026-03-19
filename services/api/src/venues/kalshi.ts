/**
 * Kalshi API adapter (read-only, public market data)
 * Docs: https://docs.kalshi.com
 * Note: Trading requires Developer Agreement and API credentials
 */

const KALSHI_BASE = "https://trading-api.kalshi.com/trade-api/v2";

export interface KalshiMarket {
  event_ticker: string;
  ticker: string;
  title: string;
  yes_bid: number;
  yes_ask: number;
  no_bid: number;
  no_ask: number;
  volume: number;
  close_time: string;
}

export interface NormalizedMarket {
  id: string;
  venue: "kalshi";
  question: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  endTime: string;
  category?: string;
}

export async function fetchKalshiMarkets(limit = 10): Promise<NormalizedMarket[]> {
  const res = await fetch(
    `${KALSHI_BASE}/markets?limit=${limit}&status=open`
  );
  if (!res.ok) throw new Error(`Kalshi API error: ${res.status}`);
  const data = await res.json();
  const markets: KalshiMarket[] = data.markets ?? [];

  return markets.map((m) => ({
    id: `kalshi-${m.ticker}`,
    venue: "kalshi" as const,
    question: m.title ?? m.ticker,
    yesPrice: (Number(m.yes_bid ?? 50) + Number(m.yes_ask ?? 50)) / 200,
    noPrice: (Number(m.no_bid ?? 50) + Number(m.no_ask ?? 50)) / 200,
    volume: m.volume ?? 0,
    endTime: m.close_time ?? "",
    category: m.event_ticker,
  }));
}
