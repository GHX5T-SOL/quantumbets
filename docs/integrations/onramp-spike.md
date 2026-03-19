# On-Ramp Integration Spike

**Status:** Spike complete. Production integration pending.

## Providers Compared

| Provider | Base support | Sandbox | Docs |
|----------|--------------|---------|------|
| MoonPay | Yes | Yes | https://www.moonpay.com/developers |
| Transak | Yes | Yes | https://docs.transak.com |
| Ramp | Yes | Yes | https://docs.ramp.network |

## Recommended: MoonPay

- Widely used, good Base support
- Sandbox: `NEXT_PUBLIC_MOONPAY_SDK_URL` with test key
- Widget: `<script src="https://static.moonpay.com/moonpay.umd.js">` + `window.MoonPay.init({...})`

## Env Vars (when integrating)

```
NEXT_PUBLIC_ONRAMP_PROVIDER=moonpay
NEXT_PUBLIC_MOONPAY_PUBLIC_KEY=pk_test_...
MOONPAY_SECRET_KEY=sk_test_...  # server-side for webhooks
```

## Next Steps

1. Create MoonPay account, get sandbox keys
2. Add widget to `/wallet` page
3. Configure webhook for completion events (optional)
4. Add treasury runbook sweep logic
