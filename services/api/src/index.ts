import express from "express";
import cors from "cors";
import { login, logout, me, requireAuth } from "./auth.js";

const app = express();

// Auth routes require DB; skip if DATABASE_URL not set
const hasDb = !!process.env.DATABASE_URL;
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

if (hasDb) {
  app.post("/api/auth/login", login);
  app.post("/api/auth/logout", logout);
  app.get("/api/auth/me", requireAuth, me);
}

// Mock market data
const MOCK_MARKETS = [
  {
    id: "m1",
    question: "Will ANC win majority in 2024 SA election?",
    category: "Politics",
    yesPrice: 0.42,
    noPrice: 0.58,
    volume: 125000,
    endTime: "2024-05-29T00:00:00Z",
    priceHistory: generatePriceHistory(0.42, 30),
  },
  {
    id: "m2",
    question: "Will Springboks win Rugby World Cup 2027?",
    category: "Sports",
    yesPrice: 0.28,
    noPrice: 0.72,
    volume: 89000,
    endTime: "2027-10-31T00:00:00Z",
    priceHistory: generatePriceHistory(0.28, 30),
  },
  {
    id: "m3",
    question: "Will load shedding end by Dec 2025?",
    category: "Local",
    yesPrice: 0.65,
    noPrice: 0.35,
    volume: 210000,
    endTime: "2025-12-31T00:00:00Z",
    priceHistory: generatePriceHistory(0.65, 30),
  },
];

function generatePriceHistory(seed: number, days: number): { t: string; p: number }[] {
  const out: { t: string; p: number }[] = [];
  let p = seed;
  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    p = Math.max(0.05, Math.min(0.95, p + (Math.random() - 0.5) * 0.08));
    out.push({ t: d.toISOString().slice(0, 10), p: Math.round(p * 100) / 100 });
  }
  return out;
}

app.get("/api/markets", (_req, res) => {
  res.json({ markets: MOCK_MARKETS });
});

app.get("/api/markets/:id", (req, res) => {
  const m = MOCK_MARKETS.find((x) => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: "Market not found" });
  res.json(m);
});

app.get("/api/venues/external", async (_req, res) => {
  try {
    const { getExternalMarkets } = await import("./venues/index.js");
    const markets = await getExternalMarkets();
    res.json({ markets });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch external venues" });
  }
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
