---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerMiddleware Documentation | next-intlayer
description: See how to use the intlayerMiddleware function for next-intlayer package
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayerMiddleware Documentation

The `intlayerMiddleware` function is a Next.js middleware that handles locale-based routing and redirects. It automatically detects the user's preferred locale and redirects them to the appropriate localized path if necessary.

## Usage

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Description

The middleware performs the following tasks:

1. **Locale Detection**: It checks the URL path, cookies, and `Accept-Language` header to determine the user's locale.
2. **Redirection**: If the URL does not contain a locale prefix and the configuration requires one (or based on the user's preferences), it redirects to the localized URL.
3. **Cookie Management**: It can store the detected locale in a cookie for future requests.

## Parameters

The function takes the standard Next.js `NextRequest` as a parameter when used directly, or it can be exported as shown above.
