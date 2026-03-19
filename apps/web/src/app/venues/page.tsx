"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Market = {
  id: string;
  venue: string;
  question: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  category?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function VenuesPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/venues/external`)
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
            <Link href="/markets" className="text-slate-300 hover:text-white">
              Markets
            </Link>
            <Link href="/venues" className="text-white">
              External Venues
            </Link>
          </nav>
        </div>
      </header>

      <main className="p-6">
        <h1 className="mb-2 text-2xl font-bold">External Venues</h1>
        <p className="mb-6 text-slate-400">
          Read-only aggregation from Polymarket and Kalshi. Trading not available.
        </p>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : markets.length === 0 ? (
          <p className="text-slate-500">
            No external markets. Ensure API is running and feature flags are enabled.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <div
                key={m.id}
                className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
              >
                <span className="text-xs text-slate-500 uppercase">{m.venue}</span>
                <div className="mt-1 font-medium text-slate-100">{m.question}</div>
                <div className="mt-2 flex gap-4 text-sm">
                  <span className="text-emerald-400">Yes {m.yesPrice.toFixed(2)}</span>
                  <span className="text-rose-400">No {m.noPrice.toFixed(2)}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {m.category ?? ""} · Vol {m.volume.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
