import { getLocaleName, getLocalizedUrl } from 'intlayer';
import type { FunctionComponent } from 'preact';
import { useIntlayer, useLocale } from 'preact-intlayer';
import { useLocation } from 'preact-iso';

export const LocaleSwitcher: FunctionComponent = () => {
  const location = useLocation();
  const content = useIntlayer('lang-switcher');
  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso provides the full url
      // Construct the URL with the updated locale
      // Example: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Update the URL path
      location.route(pathWithLocale, true); // true for replace
    },
  });

  return (
    <div aria-label={content.langSwitcherLabel.value}>
      <div className="separator mt-10 flex min-w-[100px] items-end gap-4 divide-y divide-dashed p-1">
        {availableLocales.map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            aria-label={`${content.langButtonLabel} ${lang}`}
            data-mode="system"
            disabled={!(availableLocales ?? []).includes(lang)}
            className="w-full cursor-pointer rounded-lg p-2 text-center hover:bg-white/10 focus:bg-white/10 focus:outline-hidden disabled:text-white/25"
          >
            {getLocaleName(lang)}
          </button>
        ))}
      </div>
    </div>
  );
};
