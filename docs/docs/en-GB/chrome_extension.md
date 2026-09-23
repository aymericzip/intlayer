---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Chrome Extension, i18n & SEO Scanner
description: Inspect the i18n setup of any website with the Intlayer Chrome extension. Detect the framework, i18n library, locales, hreflang and SEO tags, and run a full i18n SEO audit.
keywords:
  - Chrome Extension
  - i18n Scanner
  - hreflang Checker
  - Multilingual SEO
  - Intlayer
  - Localisation
  - Development Tools
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Initial history"
author: aymericzip
---

# Chrome Extension: i18n & SEO Scanner

## Overview

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) is the official Chrome extension for **Intlayer**. Open it on any website to see how the site handles internationalisation: which framework and i18n library it uses, which locales it exposes, and whether its multilingual SEO tags are set up correctly.

It works on every website, whether or not it uses Intlayer.

![Intlayer Chrome Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

Extension link: [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Features

- **Technology detection**: identifies the framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) and the i18n library (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Each detection shows the evidence that triggered it, such as a global variable, a cookie or a DOM marker.
- **Locales**: lists the locales found in the `lang` attribute, hreflang and `og:locale` tags, the URL locale prefix, and locale cookies or storage entries.
- **SEO i18n tags**: checks `html lang`, `html dir`, the canonical link, hreflang tags, `x-default`, `og:locale` and the ratio of localised internal links.
- **Full audit**: runs the same audit as the [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) and shows a live score.

## Installation

Install [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) from the Chrome Web Store, then pin it to your toolbar.

The extension works in Chrome and in any Chromium based browser that supports Chrome Web Store extensions (Edge, Brave, Arc, Opera).

## Usage

### Inspect a page

1. Open the website you want to inspect.
2. Click the **Intlayer i18n Scanner** icon in the toolbar.
3. The popup shows the **Detected technologies**, **Locales** and **SEO i18n tags** sections for the current page.

Detection runs locally in your browser, on the current tab only.

### Run a full audit

![Intlayer Chrome Extension audit score](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Scroll to the **Full audit** section and click **Run full i18n audit**. Results stream in as each check completes, grouped into:

- **Page**: `html lang` and `dir` attributes, current locale, hreflang tags, `x-default`, canonical link, localised internal links, language selector, flag icons, and unused locale content shipped in the JavaScript bundle.
- **Robots.txt**: presence, and whether locale paths stay crawlable.
- **Sitemap**: presence, every locale listed, alternate links and `x-default`.
- **Domain**: number of locales discovered across the site.

Each check is marked as passed, warning or failed, and the score summarises the overall i18n SEO health of the page.

## Privacy and permissions

The extension requests minimal permissions:

- **activeTab** and **scripting**: the detector runs only on the tab you are viewing, and only when you open the popup.
- **back.intlayer.org**: used only when you run a full audit. The URL of the current page is sent to the Intlayer API to be scanned.

No browsing history is collected and nothing runs in the background.

## FAQ

<FAQ>

<Question title="Does the website need to use Intlayer?">

No. The extension inspects any website, whatever framework or i18n library it uses.

</Question>
<Question title="Why is a technology not detected?">

Detection relies on what the page exposes in the browser: global variables, cookies, meta tags and DOM markers. Some production builds strip these markers, so a library can be in use without leaving a visible trace.

</Question>
<Question title="How do I fix the issues found by the audit?">

Most checks map to a routing or metadata setting. With Intlayer, hreflang, canonical, `x-default`, localised links, sitemap and robots.txt are generated from your [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md). See the integration guide for your framework, for example [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nuxt.md) or [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Related tools

- [VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)
- [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)
- [LSP Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)
