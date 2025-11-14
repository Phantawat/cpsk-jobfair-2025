# Logo Fetching Script

## Automatic Download

Run this to automatically fetch company logos:

```bash
node scripts/fetch-logos.js
```

This will attempt to download logos from multiple sources:
- Clearbit Logo API
- Google Favicons (high-res)
- Unavatar

## Manual Upload

If automatic fetching doesn't work well, you can:

1. Manually upload logos to `public/logos/` folder
2. Use the filenames listed in `public/logos/README.md`
3. Recommended format: PNG, 512x512px, transparent background

## Update Domains

If you know the correct website domains for companies, edit the `companies` array in `fetch-logos.js` to improve logo quality.
