import {
  currency,
  getHTMLTextDir,
  getIntlayer,
  getLocaleName,
  type Locale,
  locales,
} from 'intlayer';

/** Unit price of a cart item, in the currency below. */
const ITEM_PRICE = 12.5;
const ITEM_CURRENCY = 'EUR';

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapes the characters that would let a translated value break out of the
 * markup it is interpolated into.
 */
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) => HTML_ENTITIES[character] ?? character
  );

/**
 * The cart fragment. Every htmx swap re-renders it for the locale of the
 * request that triggered the swap, so a fragment never keeps the language of
 * the page it was first rendered into.
 */
export const renderCart = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer('app', locale);

  return `<section id="cart">
  <p class="summary">${escapeHtml(String(content.cartSummary({ count: itemCount })))}</p>
  <p class="total">
    ${escapeHtml(String(content.totalLabel))}:
    ${escapeHtml(currency(itemCount * ITEM_PRICE, { locale, currency: ITEM_CURRENCY }))}
  </p>
  <button
    hx-post="/cart/items"
    hx-vals='{"itemCount": ${itemCount}}'
    hx-target="#cart"
    hx-swap="outerHTML"
  >${escapeHtml(String(content.addItem))}</button>
  <button
    hx-delete="/cart/items"
    hx-target="#cart"
    hx-swap="outerHTML"
  >${escapeHtml(String(content.emptyCart))}</button>
</section>`;
};

/**
 * The locale switcher. Posting it swaps the whole `<body>`, which is what makes
 * the static labels around the cart change language too.
 */
const renderLocaleSwitcher = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer('app', locale);

  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? ' selected' : ''}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join('');

  return `<form class="locale-switcher">
  <label for="locale">${escapeHtml(String(content.localeLabel))}</label>
  <select
    id="locale"
    name="locale"
    hx-post="/locale"
    hx-trigger="change"
    hx-vals='{"itemCount": ${itemCount}}'
    hx-target="body"
    hx-swap="outerHTML"
  >${options}</select>
</form>`;
};

/**
 * The `<body>` element, rendered on its own so the locale switcher can swap it
 * whole. `lang` and `dir` are repeated here because a swap cannot reach the
 * `<html>` element; the script in the head copies them back up after the swap.
 */
export const renderBody = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer('app', locale);

  return `<body lang="${locale}" dir="${getHTMLTextDir(locale)}">
  <main>
    <h1>${escapeHtml(String(content.pageTitle))}</h1>
    <p>${escapeHtml(String(content.heading))}</p>
    <p>${escapeHtml(String(content.greeting({ name: 'Ada' })))}</p>
    ${renderLocaleSwitcher(locale, itemCount)}
    ${renderCart(locale, itemCount)}
  </main>
</body>`;
};

/** The full document, served on a normal navigation. */
export const renderPage = (locale: Locale, itemCount: number): string =>
  `<!doctype html>
<html lang="${locale}" dir="${getHTMLTextDir(locale)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(String(getIntlayer('app', locale).pageTitle))}</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
  <script>
    // A swap replaces the <body>, never the <html>, so mirror the language
    // attributes back onto the root element after each swap.
    document.addEventListener('htmx:afterSwap', () => {
      document.documentElement.lang = document.body.lang;
      document.documentElement.dir = document.body.dir;
    });
  </script>
</head>
${renderBody(locale, itemCount)}
</html>`;
