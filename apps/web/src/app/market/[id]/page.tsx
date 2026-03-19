"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Market = {
  id: string;
  question: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  endTime: string;
  priceHistory: { t: string; p: number }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function MarketPage({ params }: { params: { id: string } }) {
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/markets/${params.id}`)
      .then((r) => r.json())
      .then(setMarket)
      .catch(() => setMarket(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;
  if (!market) return <div className="p-8 text-rose-400">Market not found</div>;

  const chartData = market.priceHistory ?? [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            QuantumBets
          </Link>
          <nav className="flex gap-6">
            <Link href="/terminal" className="text-slate-300 hover:text-white">
              Terminal
            </Link>
            <Link href="/markets" className="text-slate-300 hover:text-white">
              Markets
            </Link>
          </nav>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-6">
          <span className="text-xs text-slate-500">{market.category}</span>
          <h1 className="mt-1 text-2xl font-bold">{market.question}</h1>
          <div className="mt-2 flex gap-6 text-sm text-slate-400">
            <span>Ends: {new Date(market.endTime).toLocaleDateString()}</span>
            <span>Vol: {market.volume.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <h2 className="mb-4 text-sm font-medium text-slate-400">
                Price History
              </h2>
              <div className="h-64">
                <div className="flex h-full items-end gap-0.5">
                  {chartData.map((d, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-emerald-500/60 transition hover:bg-emerald-500/80"
                      style={{ height: `${d.p * 100}%` }}
                      title={`${d.t}: ${d.p}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>{chartData[0]?.t}</span>
                <span>{chartData[chartData.length - 1]?.t}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <h2 className="mb-4 text-sm font-medium text-slate-400">
                Order Ticket
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between rounded bg-slate-800/50 p-3">
                  <span className="text-slate-400">Yes</span>
                  <span className="text-emerald-400 font-bold">{market.yesPrice}</span>
                </div>
                <div className="flex justify-between rounded bg-slate-800/50 p-3">
                  <span className="text-slate-400">No</span>
                  <span className="text-rose-400 font-bold">{market.noPrice}</span>
                </div>
                <div className="mt-4 rounded border border-slate-600 bg-slate-800/30 p-3 text-center text-sm text-slate-500">
                  Connect wallet to trade
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
