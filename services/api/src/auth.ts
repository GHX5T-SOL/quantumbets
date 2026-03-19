import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export async function login(req: Request, res: Response) {
  const { email } = req.body as { email?: string };
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "email required" });
  }

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { email, role: "user" },
    });
  }

  const token = randomUUID();
  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "login",
      resource: "session",
      details: { email },
      ip: req.ip,
    },
  });

  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
}

export async function logout(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(400).json({ error: "token required" });

  await prisma.session.deleteMany({ where: { token } });
  res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "unauthorized" });

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ error: "unauthorized" });
  }

  res.json({ user: session.user });
}

export function requireAuth(
  req: Request,
  res: Response,
  next: (err?: unknown) => void
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  (req as Request & { token?: string }).token = token;
  next();
}

export function requireRole(role: string) {
  return async (
    req: Request,
    res: Response,
    next: (err?: unknown) => void
  ) => {
    const token = (req as Request & { token?: string }).token;
    if (!token) {
      res.status(401).json({ error: "unauthorized" });
      return;
    }
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!session || session.expiresAt < new Date()) {
      res.status(401).json({ error: "unauthorized" });
      return;
    }
    if (session.user.role !== role && session.user.role !== "admin") {
      res.status(403).json({ error: "forbidden" });
      return;
    }
    (req as Request & { user?: { id: string; email: string; role: string } }).user = session.user;
    next();
  };
}
