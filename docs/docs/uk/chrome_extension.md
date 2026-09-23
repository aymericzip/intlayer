---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Розширення Chrome, сканер i18n та SEO
description: Перевіряйте налаштування i18n будь-якого вебсайту за допомогою розширення Intlayer для Chrome. Виявляйте фреймворк, бібліотеку i18n, локалі, теги hreflang та SEO, а також запускайте повний аудит i18n SEO.
keywords:
  - Розширення Chrome
  - Сканер i18n
  - Перевірка hreflang
  - Багатомовне SEO
  - Intlayer
  - Локалізація
  - Інструменти розробки
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Ініціалізація історії"
author: aymericzip
---

# Розширення Chrome: сканер i18n та SEO

## Огляд

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) — офіційне розширення Chrome для **Intlayer**. Відкрийте його на будь-якому вебсайті, щоб дізнатися, як сайт обробляє інтернаціоналізацію: який фреймворк і бібліотеку i18n він використовує, які локалі надає та чи правильно налаштовані його багатомовні SEO-теги.

Воно працює на будь-якому вебсайті, незалежно від того, чи використовує він Intlayer.

![Розширення Intlayer для Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

Посилання на розширення: [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Можливості

- **Визначення технологій**: визначає фреймворк (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) та бібліотеку i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Кожне визначення показує ознаки, що його викликали, такі як глобальна змінна, cookie або маркер DOM.
- **Локалі**: перелічує локалі, знайдені в атрибуті `lang`, тегах hreflang та `og:locale`, префіксі локалі в URL, а також cookie або записах сховища.
- **SEO-теги i18n**: перевіряє `html lang`, `html dir`, канонічне посилання, теги hreflang, `x-default`, `og:locale` та співвідношення локалізованих внутрішніх посилань.
- **Повний аудит**: запускає той самий аудит, що й [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner), і відображає оцінку в реальному часі.

## Встановлення

Встановіть [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) з веб-магазину Chrome, а потім закріпіть його на панелі інструментів.

Розширення працює в Chrome та в будь-якому браузері на базі Chromium, що підтримує розширення з веб-магазину Chrome (Edge, Brave, Arc, Opera).

## Використання

### Перевірка сторінки

1. Відкрийте вебсайт, який ви хочете перевірити.
2. Натисніть піктограму **Intlayer i18n Scanner** на панелі інструментів.
3. У спливаючому вікні відобразяться розділи **Виявлені технології**, **Локалі** та **SEO-теги i18n** для поточної сторінки.

Визначення виконується локально у вашому браузері, лише на активній вкладці.

### Запуск повного аудиту

![Оцінка аудиту розширення Intlayer для Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Прокрутіть до розділу **Повний аудит** і натисніть **Запустити повний аудит i18n**. Результати надходять по мірі завершення кожної перевірки, згруповані за категоріями:

- **Сторінка**: атрибути `html lang` і `dir`, поточна локаль, теги hreflang, `x-default`, канонічне посилання, локалізовані внутрішні посилання, перемикач мови, піктограми прапорів та невикористаний контент локалі, переданий у JavaScript-бандлі.
- **Robots.txt**: наявність файлу та доступність шляхів локалей для сканування пошуковими роботами.
- **Карта сайту (Sitemap)**: наявність файлу, список усіх локалей, альтернативні посилання та `x-default`.
- **Домен**: кількість локалей, виявлених на всьому сайті.

Кожна перевірка позначається як пройдена, попередження або не пройдена, а підсумкова оцінка відображає загальний стан i18n SEO сторінки.

## Конфіденційність та дозволи

Розширення запитує мінімальні дозволи:

- **activeTab** та **scripting**: детектор працює лише на вкладці, яку ви переглядаєте, і лише тоді, коли ви відкриваєте спливаюче вікно.
- **back.intlayer.org**: використовується лише тоді, коли ви запускаєте повний аудит. URL-адреса поточної сторінки надсилається до API Intlayer для сканування.

Історія перегляду не збирається, і у фоновому режимі нічого не виконується.

## Часті запитання (FAQ)

<FAQ>

<Question title="Чи повинен сайт обов'язково використовувати Intlayer?">

Ні. Розширення перевіряє будь-який вебсайт, незалежно від того, який фреймворк чи бібліотеку i18n він використовує.

</Question>
<Question title="Чому технологія не виявляється?">

Виявлення спирається на те, що сторінка розкриває в браузері: глобальні змінні, cookies, метатеги та маркери DOM. Деякі виробничі збірки видаляють ці маркери, тому бібліотека може використовуватися без видимих слідів.

</Question>
<Question title="Як виправити проблеми, виявлені аудитом?">

Більшість перевірок відповідають налаштуванням маршрутизації або метаданих. З Intlayer теги hreflang, канонічне посилання, `x-default`, локалізовані посилання, sitemap та robots.txt генеруються автоматично з вашої [конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Перегляньте посібник з інтеграції для вашого фреймворку, наприклад [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nuxt.md) або [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Пов'язані інструменти

- [Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- [Сервер MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)
- [Сервер LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)
