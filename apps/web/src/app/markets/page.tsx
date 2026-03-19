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
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/markets`)
      .then((r) => r.json())
      .then((d) => setMarkets(d.markets ?? []))
      .catch(() => setMarkets([]))
      .finally(() => setLoading(false));
  }, []);

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
            <Link href="/markets" className="text-white">
              Markets
            </Link>
          </nav>
        </div>
      </header>

      <main className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Markets</h1>
        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <Link
                key={m.id}
                href={`/market/${m.id}`}
                className="block rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition hover:border-slate-600"
              >
                <div className="font-medium text-slate-100">{m.question}</div>
                <div className="mt-2 flex gap-4 text-sm">
                  <span className="text-emerald-400">Yes {m.yesPrice}</span>
                  <span className="text-rose-400">No {m.noPrice}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {m.category} · Vol {m.volume.toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
