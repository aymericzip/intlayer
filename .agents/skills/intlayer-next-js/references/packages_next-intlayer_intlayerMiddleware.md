---
createdAt: 2026-01-21
updatedAt: 2026-02-25
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
  - version: 8.1.7
    date: 2026-02-25
    changes: Rename intlayerMiddleware to intlayerProxy
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# intlayerProxy (intlayerMiddleware) Documentation

The `intlayerProxy` (`intlayerMiddleware` for nextjs < 16) function is a Next.js middleware that handles locale-based routing and redirects. It automatically detects the user's preferred locale and redirects them to the appropriate localized path if necessary.

## Usage

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Description

The middleware performs the following tasks:

1. **Locale Detection**: It checks the URL path, cookies, and `Accept-Language` header to determine the user's locale.
2. **Redirection**: If the URL does not contain a locale prefix and the configuration requires one (or based on the user's preferences), it redirects to the localized URL.
3. **Cookie Management**: It can store the detected locale in a cookie for future requests.

## Parameters

The function takes the standard Next.js `NextRequest` as a parameter when used directly, or it can be exported as shown above.

## Configuration

To configure the middleware, you can set up the `routing` option in the `intlayer.config.ts` file. See [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) for more details.
