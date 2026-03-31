const { getLocaleName } = window.Intlayer;
const { installIntlayer, useLocale, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

const { locale, availableLocales, setLocale, subscribe } = useLocale();

// Fetch the dictionary using the reactive hook
const appContent = useIntlayer('app');

// Define the render logic, extracting text with String()
const render = (content) => {
  document.getElementById('title').textContent = content.title;
  document.getElementById('description').textContent = content.description;
};

// Bind the reactivity: this fires every time setLocale is called
appContent.onChange((newContent) => render(newContent));

// Initial render
render(appContent);

const setupLocaleSwitcher = () => {
  const container = document.getElementById('locale-switcher');
  const label = document.createElement('label');
  label.htmlFor = 'lang-select';

  const select = document.createElement('select');
  select.id = 'lang-select';

  const updateOptions = (currentLocale) => {
    // Extract langLabel safely
    const labelText = appContent.langLabel
      ? String(appContent.langLabel)
      : 'Language';
    label.textContent = `${labelText}: `;

    select.innerHTML = availableLocales
      .map(
        (locale) =>
          `<option value="${locale}"${locale === currentLocale ? ' selected' : ''}>${getLocaleName(locale, currentLocale)}</option>`
      )
      .join('');
  };

  updateOptions(locale);
  select.addEventListener('change', () => setLocale(select.value));

  // Update the dropdown UI when the locale changes
  subscribe((newLocale) => {
    updateOptions(newLocale);
  });

  container.appendChild(label);
  container.appendChild(select);
};

setupLocaleSwitcher();
