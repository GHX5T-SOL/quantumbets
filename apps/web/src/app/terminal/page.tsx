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

export default function TerminalPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/markets`)
      .then((r) => r.json())
      .then((d) => {
        setMarkets(d.markets ?? []);
        setWatchlist((prev) => prev.length ? prev : (d.markets ?? []).slice(0, 2).map((m: Market) => m.id));
      })
      .catch(() => setMarkets([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const watchlistMarkets = markets.filter((m) => watchlist.includes(m.id));

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
        <h2 className="mb-4 text-lg font-medium text-slate-300">Watchlist</h2>
        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : watchlistMarkets.length === 0 ? (
          <p className="text-slate-500">Add markets from Markets to your watchlist.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {watchlistMarkets.map((m) => (
              <div
                key={m.id}
                className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
              >
                <div className="flex items-start justify-between">
                  <Link
                    href={`/market/${m.id}`}
                    className="font-medium text-slate-100 hover:underline"
                  >
                    {m.question}
                  </Link>
                  <button
                    onClick={() => toggleWatchlist(m.id)}
                    className="text-slate-500 hover:text-amber-400"
                    aria-label="Remove from watchlist"
                  >
                    ★
                  </button>
                </div>
                <div className="mt-2 flex gap-4 text-sm">
                  <span className="text-emerald-400">Yes {m.yesPrice}</span>
                  <span className="text-rose-400">No {m.noPrice}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {m.category} · Vol {m.volume.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="mb-4 mt-8 text-lg font-medium text-slate-300">
          All Markets
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => (
            <div
              key={m.id}
              className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
            >
              <div className="flex items-start justify-between">
                <Link
                  href={`/market/${m.id}`}
                  className="font-medium text-slate-100 hover:underline"
                >
                  {m.question}
                </Link>
                <button
                  onClick={() => toggleWatchlist(m.id)}
                  className={
                    watchlist.includes(m.id)
                      ? "text-amber-400"
                      : "text-slate-500 hover:text-amber-400"
                  }
                  aria-label={watchlist.includes(m.id) ? "In watchlist" : "Add to watchlist"}
                >
                  {watchlist.includes(m.id) ? "★" : "☆"}
                </button>
              </div>
              <div className="mt-2 flex gap-4 text-sm">
                <span className="text-emerald-400">Yes {m.yesPrice}</span>
                <span className="text-rose-400">No {m.noPrice}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {m.category} · Vol {m.volume.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
