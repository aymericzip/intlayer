---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Static vs Dynamic Rendering with i18n in Next.js
description: Learn how to use static vs dynamic rendering with i18n in Next.js.
keywords:
  - static
  - dynamic
  - rendering
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - configuration
slugs:
  - doc
  - faq
  - static-rendering
---

# Static vs Dynamic Rendering with i18n in Next.js

## The issue with **next-intl**

- **What happens?**
  When you use `useTranslations`, `getTranslations`, or any next-intl helper _inside a Server Component_ on an i18n-routed app (`/en/…`, `/fr/…`), Next.js marks the whole route as **dynamic**. ([Next Intl][1])

- **Why?**
  next-intl looks up the current locale from a request-only header (`x-next-intl-locale`) via `headers()`. Because `headers()` is a **dynamic API**, any component that touches it loses static optimisation. ([Next Intl][1], [Next.js][2])

- **Official workaround (boilerplate)**

  1. Export `generateStaticParams` with every supported locale.
  2. Call `setRequestLocale(locale)` in **every** layout/page _before_ you call `useTranslations`. ([Next Intl][1])
     This removes the header dependency, but you now have extra code to maintain and an unstable API in production.

## How **intlayer** sidesteps the problem

**Design choices**

1. **Route-param only** – The locale comes from the `[locale]` URL segment that Next.js already passes to every page.
2. **Compile-time bundles** – Translations are imported as regular ES modules, so they’re tree-shaken and embedded at build-time.
3. **No dynamic APIs** – `useT()` reads from React context, not from `headers()` or `cookies()`.
4. **Zero extra config** – Once your pages live under `app/[locale]/`, Next.js prerenders one HTML file per locale automatically.
