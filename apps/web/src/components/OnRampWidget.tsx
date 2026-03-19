"use client";

/**
 * On-ramp widget placeholder.
 * Configure NEXT_PUBLIC_ONRAMP_PROVIDER (moonpay|transak|ramp) and provider-specific keys.
 * Docs: MoonPay https://www.moonpay.com/developers, Transak https://docs.transak.com, Ramp https://docs.ramp.network
 */
export function OnRampWidget() {
  const provider = process.env.NEXT_PUBLIC_ONRAMP_PROVIDER ?? "none";

  if (provider === "none") {
    return (
      <div className="rounded border border-slate-600 bg-slate-800/30 p-4 text-center text-sm text-slate-500">
        On-ramp not configured. Set NEXT_PUBLIC_ONRAMP_PROVIDER and provider keys.
      </div>
    );
  }

  return (
    <div className="rounded border border-slate-600 bg-slate-800/30 p-4 text-center text-sm text-slate-400">
      On-ramp: {provider} (sandbox). Add widget script per provider docs.
    </div>
  );
}
