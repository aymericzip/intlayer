---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Express Middleware Documentation | express-intlayer
description: See how to use the intlayer middleware for the express-intlayer package
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initial documentation
---

# intlayer Express Middleware Documentation

The `intlayer` middleware for Express detects the user's locale and provides translation functions via the `res.locals` object. It also enables the use of the `t` and `getIntlayer` functions throughout your request handlers.

## Usage

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    "en-GB": "Hello",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Description

The middleware performs the following tasks:

1. **Locale Detection**: It checks cookies, headers (such as `Accept-Language`), and URL parameters to determine the user's locale.
2. **Context Setup**: It populates `res.locals` with:
   - `locale`: The detected locale.
   - `t`: A translation function bound to the detected locale.
   - `getIntlayer`: A function to retrieve dictionaries bound to the detected locale.
3. **Async Local Storage**: It sets up a context that allows the use of global `t` and `getIntlayer` functions imported from `express-intlayer` within the request flow.
