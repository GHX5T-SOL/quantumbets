import { fetchPolymarketEvents } from "./polymarket.js";
import { fetchKalshiMarkets } from "./kalshi.js";

export type NormalizedMarket = {
  id: string;
  venue: "polymarket" | "kalshi";
  question: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  endTime: string;
  category?: string;
};

const FEATURE_FLAGS = {
  polymarket: process.env.FEATURE_POLYMARKET !== "false",
  kalshi: process.env.FEATURE_KALSHI !== "false",
};

export async function getExternalMarkets(): Promise<NormalizedMarket[]> {
  const results: NormalizedMarket[] = [];

  if (FEATURE_FLAGS.polymarket) {
    try {
      const poly = await fetchPolymarketEvents(5);
      results.push(...poly);
    } catch (e) {
      console.warn("Polymarket fetch failed:", e);
    }
  }

  if (FEATURE_FLAGS.kalshi) {
    try {
      const kalshi = await fetchKalshiMarkets(5);
      results.push(...kalshi);
    } catch (e) {
      console.warn("Kalshi fetch failed:", e);
    }
  }

  return results;
}
