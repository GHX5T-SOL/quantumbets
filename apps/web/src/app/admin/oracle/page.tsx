"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Attestation = {
  marketId: string;
  outcome: boolean;
  confidence: number;
  disputeWindowOpen: boolean;
  createdAt: string;
};

const ORACLE_URL = process.env.NEXT_PUBLIC_ORACLE_URL ?? "http://localhost:4001";

export default function OracleDashboardPage() {
  const [attestations, setAttestations] = useState<Attestation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${ORACLE_URL}/attestations`)
      .then((r) => r.json())
      .then(setAttestations)
      .catch(() => setAttestations([]))
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
            <Link href="/admin/oracle" className="text-white">
              Admin · Oracle
            </Link>
          </nav>
        </div>
      </header>

      <main className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Oracle Operator Dashboard</h1>
        <p className="mb-6 text-slate-400">
          Stub: attestations from oracle worker. Dispute window = 4h after attestation.
        </p>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : attestations.length === 0 ? (
          <p className="text-slate-500">
            No attestations yet. Start the oracle worker: <code className="rounded bg-slate-800 px-2 py-1">cd services/oracle && npm run dev</code>
          </p>
        ) : (
          <div className="space-y-4">
            {attestations.map((a, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
              >
                <div className="flex justify-between">
                  <span className="font-mono text-slate-400">Market {a.marketId}</span>
                  <span
                    className={
                      a.disputeWindowOpen
                        ? "text-amber-400"
                        : "text-slate-500"
                    }
                  >
                    {a.disputeWindowOpen ? "Dispute window open" : "Finalized"}
                  </span>
                </div>
                <div className="mt-2 flex gap-4">
                  <span>Outcome: {a.outcome ? "Yes" : "No"}</span>
                  <span>Confidence: {a.confidence}%</span>
                  <span className="text-slate-500">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
