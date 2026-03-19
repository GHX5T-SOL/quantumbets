import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuantumBets — Prediction Terminal",
  description: "Trading-terminal-style prediction markets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
