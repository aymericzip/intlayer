import cookieParser from 'cookie-parser';
import express, { type Express, type Response } from 'express';
import { intlayer } from 'express-intlayer';
import { isDeclaredLocale, type Locale } from 'intlayer';
import { renderBody, renderCart, renderPage } from './views';

const PORT = Number(process.env['PORT'] ?? 3000);
const LOCALE_COOKIE = 'INTLAYER_LOCALE';

const app: Express = express();

// `express-intlayer` reads the locale cookie through `req.cookies`, so the
// cookie parser has to run before the middleware.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());

/**
 * The locale the middleware resolved for this request: the `INTLAYER_LOCALE`
 * cookie or the `x-intlayer-locale` header when the client set one, otherwise
 * the `Accept-Language` negotiation.
 */
const getRequestLocale = (res: Response): Locale => res.locals.locale;

/** The cart size travels with the request, so the demo needs no session store. */
const parseItemCount = (value: unknown): number => {
  const itemCount = Number(value);

  return Number.isFinite(itemCount) && itemCount >= 0
    ? Math.floor(itemCount)
    : 0;
};

app.get('/', (_req, res) => {
  res.type('html').send(renderPage(getRequestLocale(res), 0));
});

// htmx fragment: adding an item re-renders the cart alone, in the locale of
// this request rather than the one the page was first served in.
app.post('/cart/items', (req, res) => {
  const itemCount = parseItemCount(req.body?.itemCount) + 1;

  res.type('html').send(renderCart(getRequestLocale(res), itemCount));
});

app.delete('/cart/items', (_req, res) => {
  res.type('html').send(renderCart(getRequestLocale(res), 0));
});

// Switching the language stores the choice in the cookie the middleware reads,
// then returns the whole `<body>` re-rendered in the new locale.
app.post('/locale', (req, res) => {
  const requestedLocale = String(req.body?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    res.status(400).send('Unknown locale');
    return;
  }

  res.cookie(LOCALE_COOKIE, requestedLocale, {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
  });

  res
    .type('html')
    .send(renderBody(requestedLocale, parseItemCount(req.body?.itemCount)));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
