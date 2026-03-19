/**
 * Polymarket Gamma API adapter (read-only)
 * Docs: https://docs.polymarket.com/developers/gamma-markets-api/overview
 */

const GAMMA_BASE = "https://gamma-api.polymarket.com";

export interface PolymarketEvent {
  id: string;
  title: string;
  slug: string;
  markets: Array<{
    id: string;
    question: string;
    outcomePrices: string;
    volume: number;
    endDate: string;
  }>;
}

export interface NormalizedMarket {
  id: string;
  venue: "polymarket";
  question: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  endTime: string;
  category?: string;
}

export async function fetchPolymarketEvents(limit = 10): Promise<NormalizedMarket[]> {
  const res = await fetch(`${GAMMA_BASE}/events?limit=${limit}&active=true`);
  if (!res.ok) throw new Error(`Polymarket API error: ${res.status}`);
  const events: PolymarketEvent[] = await res.json();

  const normalized: NormalizedMarket[] = [];
  for (const ev of events) {
    for (const m of ev.markets ?? []) {
      const prices = parseOutcomePrices(m.outcomePrices);
      normalized.push({
        id: `poly-${m.id}`,
        venue: "polymarket",
        question: m.question || ev.title,
        yesPrice: prices.yes,
        noPrice: prices.no,
        volume: m.volume ?? 0,
        endTime: m.endDate ?? "",
        category: ev.title,
      });
    }
  }
  return normalized;
}

function parseOutcomePrices(outcomePrices: string): { yes: number; no: number } {
  try {
    const arr = JSON.parse(outcomePrices || "[]") as string[];
    const yes = parseFloat(arr[0] ?? "0.5");
    const no = parseFloat(arr[1] ?? "0.5");
    return { yes, no };
  } catch {
    return { yes: 0.5, no: 0.5 };
  }
}
