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
      <div className="separator flex gap-4 min-w-[100px] mt-10 items-end divide-y divide-dashed p-1">
        {availableLocales.map((lang) => (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            aria-label={`${content.langButtonLabel} ${lang}`}
            data-mode="system"
            disabled={!(availableLocales ?? []).includes(lang)}
            className="focus:outline-hidden w-full cursor-pointer text-center rounded-lg p-2 hover:bg-white/10 focus:bg-white/10 disabled:text-white/25"
          >
            {getLocaleName(lang)}
          </button>
        ))}
      </div>
    </div>
  );
};
