# Build instructions for Mozilla Add-ons reviewers

The uploaded add-on (`intlayer-chrome-extension.zip`) is bundled and minified
by Vite. The attached source archive (`intlayer-extension-source.zip`) is a
`git archive` of the full Intlayer monorepo
(<https://github.com/aymericzip/intlayer>); the add-on lives in
`packages/@intlayer/chrome-extension` and depends on other workspace packages
of the same repository.

## Requirements

- macOS, Linux or Windows (WSL)
- [Bun](https://bun.sh) **1.4.2** (`curl -fsSL https://bun.sh/install | bash -s "bun-v1.4.2"`)
- Node.js **22+** (used by some build tools)
- `zip` command-line tool

## Steps

One command, from the root of the extracted source archive:

```sh
bash packages/@intlayer/chrome-extension/build-for-review.sh
```

It runs these steps:

```sh
# 1. Install dependencies (exact versions from bun.lock)
bun install --frozen-lockfile

# 2. Build the extension and every workspace package it depends on
bun run turbo build --filter=@intlayer/chrome-extension...

# 3. Package the build output
cd packages/@intlayer/chrome-extension
bun run zip
```

The build output is in `packages/@intlayer/chrome-extension/dist/`, and
`intlayer-chrome-extension.zip` holds the same files as the uploaded add-on.

## Notes

- **No remote code.** Everything the popup runs is bundled into
  `assets/popup-*.js`. `chrome.scripting.executeScript` only injects the
  bundled `detectPage` function (`src/detector/detectPage.ts`) into the active
  tab, and only after the user opens the popup (`activeTab`).
- **Network.** There are two kinds of request, and both start when the user acts:
  - The **Run full audit** button sends the active tab URL to
    `https://back.intlayer.org/api/scan` (`src/scan/scanClient.ts`). This is
    why the manifest declares the `browsingActivity` data collection
    permission.
  - The page navigator fetches the site's own `robots.txt` and sitemaps from inside the
    page (`src/navigation/fetchTextInPage.ts`).
- **`innerHTML` lint warning.** The single `UNSAFE_VAR_ASSIGNMENT` warning from
  `web-ext lint` is inside Preact's DOM diffing (`dangerouslySetInnerHTML`
  support). The only caller is the design-system `ThemeProvider`, which
  renders a static theme bootstrap script built from a constant storage key.
  No page or network data ever reaches it.
