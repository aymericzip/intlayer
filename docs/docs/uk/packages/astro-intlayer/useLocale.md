---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документація хука useLocale | astro-intlayer
description: Дізнайтеся, як використовувати хук useLocale у додатках Astro для доступу до поточної локалі та керування нею.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Ініціалізація документації"
author: aymericzip
---

# Документація хука useLocale

Хук `useLocale` з `astro-intlayer` надає доступ до поточної локалі запиту, налаштованої локалі за замовчуванням та всіх доступних локалей у додатках Astro.

Він працює однаково як у frontmatter компонентів `.astro`, що рендеряться на сервері, так і в клієнтських блоках `<script>`.

## Використання

### У Frontmatter компонента (рендер на сервері)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Поточна: {locale}</span>
      <span>За замовчуванням: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### У клієнтському `<script>` (інтерактивність)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## Значення, що повертаються

Хук повертає об'єкт типу `UseLocaleResult`:

| Властивість        | Тип                                    | Опис                                                                                                       |
| ------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | Активна локаль.                                                                                            |
| `defaultLocale`    | `DeclaredLocales`                      | Локаль за замовчуванням, налаштована в `intlayer.config.ts`.                                               |
| `availableLocales` | `DeclaredLocales[]`                    | Масив усіх підтримуваних локалей, налаштованих для проекту.                                                |
| `setLocale`        | `(locale: LocalesValues) => void`      | Функція для оновлення локалі. (Інтерактивна в клієнтському `<script>`, виводить попередження під час SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Підписується на зміни локалі на стороні клієнта.                                                           |

## Поведінка на сервері та на клієнті

- **Під час SSR / рендерингу на сервері**: Запит рендериться один раз із фіксованими параметрами. Виклик `setLocale()` під час рендерингу на сервері не діє і виводить попередження; перемикання локалей слід виконувати на клієнті або шляхом переходу за потрібною локалізованою URL-адресою.
- **У клієнтських скриптах**: `setLocale` оновлює клієнтське сховище та оновлює збережені кукі або локальне сховище відповідно до вашої конфігурації Intlayer.

## Пов'язана документація

- [Інтеграція `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useIntlayer.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useDictionary.md)
