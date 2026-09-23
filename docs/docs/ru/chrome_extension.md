---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Расширение Chrome, сканер i18n и SEO
description: Проверяйте настройку i18n любого веб-сайта с помощью расширения Intlayer для Chrome. Определяйте фреймворк, библиотеку i18n, локали, теги hreflang и SEO, а также запускайте полный аудит i18n SEO.
keywords:
  - Расширение Chrome
  - Сканер i18n
  - Проверка hreflang
  - Многоязычное SEO
  - Intlayer
  - Локализация
  - Инструменты разработки
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Инициализация истории"
author: aymericzip
---

# Расширение Chrome: сканер i18n и SEO

## Обзор

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) — официальное расширение Chrome для **Intlayer**. Откройте его на любом веб-сайте, чтобы узнать, как сайт обрабатывает интернационализацию: какой фреймворк и библиотеку i18n он использует, какие локали предоставляет и правильно ли настроены его многоязычные SEO-теги.

Оно работает на любом веб-сайте, независимо от того, использует ли он Intlayer.

![Расширение Intlayer для Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

Ссылка на расширение: [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Возможности

- **Определение технологий**: определяет фреймворк (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) и библиотеку i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Каждое определение показывает признаки, вызвавшие его, такие как глобальная переменная, cookie или DOM-маркер.
- **Локали**: выводит список локалей, найденных в атрибуте `lang`, тегах hreflang и `og:locale`, префиксе локали в URL, а также cookie или записях локального хранилища.
- **SEO-теги i18n**: проверяет `html lang`, `html dir`, каноническую ссылку, теги hreflang, `x-default`, `og:locale` и соотношение локализованных внутренних ссылок.
- **Полный аудит**: запускает тот же аудит, что и [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner), и отображает оценку в реальном времени.

## Установка

Установите [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) из интернет-магазина Chrome, затем закрепите его на панели инструментов.

Расширение работает в Chrome и в любом браузере на базе Chromium, поддерживающем расширения интернет-магазина Chrome (Edge, Brave, Arc, Opera).

## Использование

### Проверка страницы

1. Откройте веб-сайт, который хотите проверить.
2. Нажмите на значок **Intlayer i18n Scanner** на панели инструментов.
3. Во всплывающем окне отобразятся разделы **Обнаруженные технологии**, **Локали** и **SEO-теги i18n** для текущей страницы.

Определение выполняется локально в вашем браузере, только для текущей вкладки.

### Запуск полного аудита

![Оценка аудита расширения Intlayer для Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Прокрутите до раздела **Полный аудит** и нажмите **Запустить полный аудит i18n**. Результаты поступают по мере завершения каждой проверки, сгруппированные по категориям:

- **Страница**: атрибуты `html lang` и `dir`, текущая локаль, теги hreflang, `x-default`, каноническая ссылка, локализованные внутренние ссылки, переключатель языка, значки флагов и неиспользуемый контент локали, переданный в JavaScript-бандле.
- **Robots.txt**: наличие файла и доступность путей локалей для сканирования поисковыми роботами.
- **Sitemap**: наличие файла, список всех локалей, альтернативные ссылки и `x-default`.
- **Домен**: количество локалей, обнаруженных на всем сайте.

Каждая проверка помечается как пройденная, предупреждение или ошибка, а итоговая оценка отражает общее состояние i18n SEO страницы.

## Конфиденциальность и разрешения

Расширение запрашивает минимальные разрешения:

- **activeTab** и **scripting**: детектор работает только на просматриваемой вами вкладке и только при открытии всплывающего окна.
- **back.intlayer.org**: используется только при запуске полного аудита. URL-адрес текущей страницы отправляется в API Intlayer для сканирования.

История просмотров не собирается, и в фоновом режиме ничего не работает.

## FAQ

<FAQ>

<Question title="Нужно ли, чтобы сайт использовал Intlayer?">

Нет. Расширение проверяет любой веб-сайт, независимо от используемого фреймворка или библиотеки i18n.

</Question>
<Question title="Почему технология не обнаружена?">

Обнаружение основывается на том, что страница раскрывает в браузере: глобальных переменных, cookies, метатегах и маркерах DOM. Некоторые производственные сборки удаляют эти маркеры, поэтому библиотека может использоваться без видимых следов.

</Question>
<Question title="Как исправить проблемы, обнаруженные аудитом?">

Большинство проверок соответствуют настройкам маршрутизации или метаданных. В Intlayer теги hreflang, каноническая ссылка, `x-default`, локализованные ссылки, sitemap и robots.txt генерируются из вашей [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Ознакомьтесь с руководством по интеграции для вашего фреймворка, например [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nuxt.md) или [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Связанные инструменты

- [Расширение VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)
- [Сервер MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)
- [Сервер LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)
