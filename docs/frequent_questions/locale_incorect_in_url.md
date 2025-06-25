# Incorrect Locale Retrieved from URL

## Problem Description

When trying to access the locale parameter from the URL, you might encounter an issue where the locale value is incorrect:

```js
const { locale } = await params;
console.log(locale); // returns "about" instead of the expected locale
```

## Solution

### 1. Verify File Structure

Ensure your Next.js app router path follows this structure:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Check Middleware Configuration

The issue often occurs when the middleware is not present or not triggered. The middleware file should be located at:

```bash
src/middleware.ts
```

This middleware is responsible for rewriting routes when `prefixDefault` is set to `false`. For example, it rewrites `/en/about` into `/about`.

### 3. URL Patterns Based on Configuration

#### Default Configuration (`prefixDefault: false`, `noPrefix: false`)

- English: `/about`
- French: `/fr/about`
- Spanish: `/es/about`

#### With `prefixDefault: true`

- English: `/en/about`
- French: `/fr/about`
- Spanish: `/es/about`

#### With `noPrefix: true`

- English: `/about`
- French: `/about`
- Spanish: `/about`

For more details about these configuration options, see the [Configuration Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
