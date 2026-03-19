import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">QuantumBets</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Prediction terminal — trading-style event markets.
      </p>
      <div className="mt-6 flex gap-4">
        <Link
          href="/terminal"
          className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
        >
          Terminal
        </Link>
        <Link
          href="/markets"
          className="rounded border border-slate-600 px-4 py-2 hover:bg-slate-800"
        >
          Markets
        </Link>
        <Link
          href="/venues"
          className="rounded border border-slate-600 px-4 py-2 hover:bg-slate-800"
        >
          External Venues
        </Link>
      </div>
    </main>
  );
}
