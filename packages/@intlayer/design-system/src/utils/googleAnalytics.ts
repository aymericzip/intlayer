/** Fallback delay after which gtag.js loads even if the page is still busy. */
const GOOGLE_ANALYTICS_MAX_DELAY_MS = 1000;

/** Upper bound on the idle wait that follows the `load` event. */
const GOOGLE_ANALYTICS_IDLE_TIMEOUT_MS = 2000;

/** Inline `<script>` descriptor accepted by TanStack Router `head().scripts`. */
export type GoogleAnalyticsHeadScript = {
  children: string;
  nonce?: string;
};

/**
 * Builds the inline gtag bootstrap that keeps gtag.js off the hydration window.
 *
 * Commands are queued in `dataLayer` immediately, and gtag.js is injected on
 * the first of: `load` + idle, first user interaction, or a fixed timeout. The
 * landing `page_view` is sent explicitly with the URL and referrer captured at
 * page start, so a client-side navigation before gtag.js arrives cannot
 * misattribute it. Later navigations are reported by GA4 enhanced measurement
 * ("page changes based on browser history events").
 *
 * @param measurementId - GA4 measurement id (e.g. `G-XXXXXXXXXX`).
 * @returns The bootstrap source, ready to inline in a `<script>`.
 */
export const buildGoogleAnalyticsBootstrap = (
  measurementId: string
): string => {
  const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;

  return `(() => {
window.dataLayer = window.dataLayer || [];
window.gtag = function () { dataLayer.push(arguments); };
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)}, { send_page_view: false });
gtag('event', 'page_view', { page_location: location.href, page_referrer: document.referrer });
const nonce = document.currentScript && document.currentScript.nonce;
const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
const listenerOptions = { capture: true, passive: true };
let isLoaded = false;
const loadGoogleAnalytics = () => {
  if (isLoaded) return;
  isLoaded = true;
  interactionEvents.forEach((eventName) => removeEventListener(eventName, loadGoogleAnalytics, listenerOptions));
  const script = document.createElement('script');
  script.async = true;
  script.src = ${JSON.stringify(scriptUrl)};
  if (nonce) script.nonce = nonce;
  document.head.appendChild(script);
};
const loadWhenIdle = () => 'requestIdleCallback' in window
  ? requestIdleCallback(loadGoogleAnalytics, { timeout: ${GOOGLE_ANALYTICS_IDLE_TIMEOUT_MS} })
  : setTimeout(loadGoogleAnalytics, 1);
interactionEvents.forEach((eventName) => addEventListener(eventName, loadGoogleAnalytics, listenerOptions));
setTimeout(loadGoogleAnalytics, ${GOOGLE_ANALYTICS_MAX_DELAY_MS});
if (document.readyState === 'complete') loadWhenIdle();
else addEventListener('load', loadWhenIdle, { once: true });
})();`;
};

/**
 * Head scripts for deferred Google Analytics, or none when no measurement id is
 * configured (local dev, previews).
 *
 * @param measurementId - GA4 measurement id, usually `VITE_GOOGLE_ANALYTICS_ID`.
 * @param nonce - CSP nonce for the inline bootstrap, when the app uses one.
 */
export const getGoogleAnalyticsHeadScripts = (
  measurementId: string | undefined,
  nonce?: string
): GoogleAnalyticsHeadScript[] =>
  measurementId
    ? [{ children: buildGoogleAnalyticsBootstrap(measurementId), nonce }]
    : [];
