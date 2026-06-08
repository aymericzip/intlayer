import { getLocaleName } from 'intlayer';
import { useLocale } from 'vanilla-intlayer';

/**
 * Mounts a locale-switcher <select> element inside the given container.
 *
 * Uses `useLocale` from vanilla-intlayer:
 * - `setLocale` changes the active locale for the whole app.
 * - `subscribe` keeps the selected <option> in sync when another part of the
 *   app triggers a locale change.
 */
export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  // Build the <select> element
  const select = document.createElement('select');
  select.setAttribute('aria-label', 'Language');
  select.style.cssText =
    'font:inherit;font-size:14px;padding:4px 8px;border-radius:6px;' +
    'border:1px solid var(--border,#e5e4e7);background:transparent;' +
    'color:inherit;cursor:pointer;';

  const render = (currentLocale: string) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? ' selected' : ''}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join('');
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener('change', () => {
    setLocale(select.value);
  });

  // Keep the selected option in sync when locale changes externally
  const unsubscribe = subscribe((newLocale) => render(newLocale));

  return unsubscribe;
}
