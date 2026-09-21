---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: Бенчмарк 2026"
description: vue-i18n и Intlayer измерены на одном приложении Vite + Vue 3. Размер библиотеки, JavaScript на странице, утечка контента, размер компонента и реактивность переключения локали, с объяснением цифр.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Бенчмарк интернационализации Vue (i18n)

`vue-i18n` — справочная библиотека i18n для Vue. Intlayer — альтернатива на основе компилятора с областью действия компонента и интеграцией Vue (`vue-intlayer`). Мы уже сравнивали их [функции и опыт разработчика](https://intlayer.org/blog/vue-i18n-vs-intlayer). Эта статья рассматривает, во что обходится каждый из них после сборки приложения.

Данные получены из [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), открытого набора, который собирает одно и то же приложение с каждой библиотекой и записывает то, что браузер фактически загружает и выполняет.

<TOC/>

> **tl;dr**: На том же приложении Vite + Vue 3 `vue-i18n` отправляет **134.9 KB** сжатого JavaScript на страницу по сравнению с **41.3 KB** для приложения без i18n. Intlayer отправляет **57.1 KB**. Сам runtime `vue-i18n` весит **24.3 KB gzip** (в 6 раз больше, чем **3.9 KB** Intlayer), каждая страница содержит **90% строк иностранных страниц**, и компонент, скомпилированный в изоляции, притягивает **196 KB**, потому что он привязан к глобальному дереву сообщений. Адаптер `@intlayer/vue-i18n` сохраняет API `vue-i18n` и измеряется **47.0 KB** на страницу.

## Вкратце

- **vue-i18n** - Библиотека i18n де-факто для Vue 2 / Vue 3 и ядро `@nuxtjs/i18n`. ICU-style сообщения, SFC блоки `<i18n>`, директива `v-t`, форматеры `d()` / `n()`, большая экосистема. Сообщения регистрируются на глобальном экземпляре в `createI18n()`; ленивая загрузка по локали — это ручной паттерн `setLocaleMessage()`, а разделение по маршрутам вы строите сами.
- **Intlayer** - Компонент-центричная модель контента. Словари `.content.ts` находятся рядом с компонентом, который они обслуживают, компилятор времени сборки (`vite-intlayer`) удаляет неиспользуемый код и выполняет ленивую загрузку по компоненту и по локали, строгие типы TypeScript генерируются из вашего контента, и отсутствующие переводы приводят к ошибке на этапе сборки. Поставляется с помощниками маршрутизатора / SEO, Visual Editor / CMS и AI-ассистентом перевода.

| Библиотека            | GitHub звёзд                                                                                                                                                                   | Всего коммитов                                                                                                                                                                     | Последний коммит                                                                                                                                    | Первая версия | NPM версия                                                                                                  | Загрузки NPM                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Апрель 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Дек 2016      | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> Значки обновляются автоматически. Снимки будут отличаться со временем.

## Сравнение функций рядом

| Функция                                        | `vue-intlayer` (Intlayer)                                    | `vue-i18n`                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Переводы рядом с компонентами**              | ✅ Да, `.content.ts` расположен вместе с каждым компонентом  | ✅ Через блоки SFC `<i18n>` (опционально); глобальные каталоги — это обычная настройка |
| **Интеграция TypeScript**                      | ✅ Строгие типы автоматически генерируются из контента       | ✅ Хорошая типизация; строгая безопасность ключей требует типизации схемы и дисциплины |
| **Обнаружение отсутствующих переводов**        | ✅ Ошибка TypeScript + ошибка/предупреждение во время сборки | ⚠️ Fallback во время выполнения + предупреждение в консоли                             |
| **Богатое содержимое (компоненты / Markdown)** | ✅ Прямая поддержка                                          | ⚠️ Интерполяция компонента `<i18n-t>`; Markdown через внешние плагины                  |
| **Поддержка ICU**                              | ⚠️ WIP                                                       | ✅ Да                                                                                  |
