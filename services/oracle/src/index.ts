import cron from "node-cron";

const DISPUTE_WINDOW_HOURS = 4;

interface SourceBundle {
  sourceId: string;
  value: number;
  timestamp: string;
  raw?: unknown;
}

interface Attestation {
  marketId: string;
  outcome: boolean;
  confidence: number;
  sources: SourceBundle[];
  reasoning?: string;
  createdAt: string;
}

const attestations: Attestation[] = [];

function ingestSources(marketId: string): SourceBundle[] {
  // Stub: in production, fetch from APIs (e.g. news, sports, election feeds)
  return [
    { sourceId: "stub-1", value: 1, timestamp: new Date().toISOString() },
    { sourceId: "stub-2", value: 1, timestamp: new Date().toISOString() },
  ];
}

function produceAttestation(marketId: string): Attestation {
  const sources = ingestSources(marketId);
  const outcome = sources.filter((s) => s.value === 1).length >= sources.length / 2;
  const confidence = Math.min(95, 50 + sources.length * 15);

  const att: Attestation = {
    marketId,
    outcome,
    confidence,
    sources,
    reasoning: "Stub attestation; replace with AI/human consensus",
    createdAt: new Date().toISOString(),
  };
  attestations.push(att);
  return att;
}

function isDisputeWindowOpen(att: Attestation): boolean {
  const created = new Date(att.createdAt).getTime();
  const windowEnd = created + DISPUTE_WINDOW_HOURS * 60 * 60 * 1000;
  return Date.now() < windowEnd;
}

// Cron: every 5 minutes, process pending markets (stub: single mock market)
cron.schedule("*/5 * * * *", () => {
  const marketId = "m1";
  const att = produceAttestation(marketId);
  console.log(
    `[${new Date().toISOString()}] Attestation: market=${att.marketId} outcome=${att.outcome} confidence=${att.confidence}%`
  );
});

// HTTP stub for operator dashboard
const port = Number(process.env.ORACLE_PORT) || 4001;
const http = await import("http");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }
  if (req.url === "/attestations") {
    res.writeHead(200);
    res.end(
      JSON.stringify(
        attestations.map((a) => ({
          ...a,
          disputeWindowOpen: isDisputeWindowOpen(a),
        }))
      )
    );
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: "not found" }));
});
server.listen(port, () => {
  console.log(`Oracle worker listening on http://localhost:${port}`);
});
