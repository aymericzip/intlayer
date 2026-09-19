---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документация хука useLocale | astro-intlayer
description: Узнайте, как использовать хук useLocale в приложениях Astro для доступа к текущей локали и управления ею.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - интернационализация
  - документация
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация"
author: aymericzip
---

# Документация хука useLocale

Хук `useLocale` из `astro-intlayer` предоставляет доступ к текущей локали запроса, настроенной локали по умолчанию и всем доступным локалям в приложениях Astro.

Он ведет себя согласованно как во frontmatter компонентов `.astro`, рендеримых на сервере, так и в клиентских блоках `<script>`.

## Использование

### Во frontmatter компонентов (Серверный рендеринг)

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
      <span>Текущая: {locale}</span>
      <span>По умолчанию: {defaultLocale}</span>
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

### В клиентском `<script>` (Интерактивно)

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

## Возвращаемые значения

Хук возвращает объект типа `UseLocaleResult`:

| Свойство           | Тип                                    | Описание                                                                                              |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | Активная локаль.                                                                                      |
| `defaultLocale`    | `DeclaredLocales`                      | Резервная локаль по умолчанию, настроенная в `intlayer.config.ts`.                                    |
| `availableLocales` | `DeclaredLocales[]`                    | Массив всех поддерживаемых локалей, настроенных для проекта.                                          |
| `setLocale`        | `(locale: LocalesValues) => void`      | Функция для обновления локали. (Интерактивна в клиентском `<script>`, выдает предупреждение при SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Подписывается на изменения локали на стороне клиента.                                                 |

## Поведение на сервере и клиенте

- **Во время SSR / Серверного рендеринга**: Запрос рендерится один раз с фиксированными параметрами. Вызов `setLocale()` во время серверного рендеринга не имеет эффекта и выдает предупреждение; переключение локали должно выполняться на клиенте или путем перехода по URL-адресу целевой локали.
- **В клиентских скриптах**: `setLocale` обновляет клиентское хранилище и сохраняет файлы cookie или данные в локальном хранилище в соответствии с конфигурацией Intlayer.

## Связанная документация

- [Интеграция `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useIntlayer.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useDictionary.md)
