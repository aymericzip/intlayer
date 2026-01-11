---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next проти next-intl проти Intlayer
description: Порівняйте next-i18next з next-intl та Intlayer для інтернаціоналізації (i18n) додатку Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Інтернаціоналізація
  - Блог
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Інтернаціоналізація Next.js (i18n)

![next-i18next проти next-intl та intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Розглянемо схожості та відмінності між трьома варіантами i18n для Next.js: next-i18next, next-intl та Intlayer.

Це не повний посібник. Це порівняння, яке допоможе вам обрати.

Ми зосереджуємось на **Next.js 13+ App Router** (з **React Server Components**) і оцінюємо:

<TOC/>

> **tl;dr**: Усі три можуть локалізувати Next.js додаток. Якщо вам потрібні **контент, прив'язаний до компонентів**, **строгі TypeScript-типи**, **перевірка відсутніх ключів на етапі збірки**, **tree-shaken словники** та **першокласна підтримка App Router + SEO-хелперів**, **Intlayer** — найповніший, сучасний вибір.
>
> Частою помилкою розробників є думка, що `next-intl` — це версія `react-intl` для Next.js. Це не так: `next-intl` підтримується [Amann](https://github.com/amannn), тоді як `react-intl` підтримується [FormatJS](https://github.com/formatjs/formatjs).

---

## Коротко

- **next-intl** - Легкий, простий механізм форматування повідомлень із надійною підтримкою Next.js. Центральні каталоги є поширеними; DX простий, але безпека та масштабне обслуговування переважно залишаються вашою відповідальністю.
- **next-i18next** - i18next у варіанті для Next.js. Зріла екосистема та функціональність через плагіни (наприклад, ICU), але конфігурація може бути громіздкою, а каталоги мають тенденцію централізуватися в міру зростання проєкту.
- **Intlayer** - Компонентно-орієнтована модель контенту для Next.js, **строга типізація TS**, **перевірки на етапі збірки**, **tree-shaking**, **вбудовані middleware і SEO-помічники**, опційний **візуальний редактор/CMS** та **AI-підтримані переклади**.

---

| Бібліотека             | Зірки GitHub                                                                                                                                                                            | Загальна кількість комітів                                                                                                                                                              | Останній коміт                                                                                                                                           | Перша версія  | Версія NPM                                                                                                          | Завантаження з NPM                                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`  | [![Зірки репозиторію GitHub](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![Активність комітів GitHub](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Останній коміт](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | квітень 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![завантаження npm](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![Зірки репозиторію на GitHub](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)      | [![Активність комітів на GitHub](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)      | [![Останній коміт](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Листопад 2020 | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![Завантаження npm](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![Зірки репозиторію GitHub](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![Активність комітів на GitHub](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)        | [![Останній коміт](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | січ 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![Завантаження npm](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![Зірки репозиторія GitHub](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![Активність комітів GitHub](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Останній коміт](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Листопад 2018 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![Завантаження npm](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> Значки оновлюються автоматично. Знімки можуть змінюватися з часом.

---

## Порівняння функцій бок-о-бок (орієнтовано на Next.js)

| Функція                                                         | `next-intlayer` (Intlayer)                                                                                                                         | `next-intl`                                                                                                                   | `next-i18next`                                                                                                                |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Переклади поруч з компонентами**                              | ✅ Так, вміст розміщено поряд із кожним компонентом                                                                                                | ❌ Ні                                                                                                                         | ❌ Ні                                                                                                                         |
| **Інтеграція з TypeScript**                                     | ✅ Просунута, автогенеровані суворі типи                                                                                                           | ✅ Добре                                                                                                                      | ⚠️ Базовий                                                                                                                    |
| **Виявлення відсутніх перекладів**                              | ✅ Підсвітка помилок TypeScript та помилки/попередження на етапі збірки                                                                            | ⚠️ fallback під час виконання                                                                                                 | ⚠️ fallback під час виконання                                                                                                 |
| **Багатий контент (JSX/Markdown/components)**                   | ✅ Пряма підтримка                                                                                                                                 | ❌ Не призначено для багатих вузлів                                                                                           | ⚠️ Обмежено                                                                                                                   |
| **Переклад із використанням ШІ**                                | ✅ Так, підтримує кількох постачальників ШІ. Можна використовувати з власними API-ключами. Бере до уваги контекст вашого додатка та обсяг контенту | ❌ Ні                                                                                                                         | ❌ Ні                                                                                                                         |
| **Візуальний редактор**                                         | ✅ Так, локальний Visual Editor + опційний CMS; можливість винести контент codebase; може вбудовуватись                                            | ❌ Ні / доступно через зовнішні платформи локалізації                                                                         | ❌ Ні / доступно через зовнішні платформи локалізації                                                                         |
| **Локалізована маршрутизація**                                  | ✅ Так, підтримує локалізовані шляхи з коробки (працює з Next.js та Vite)                                                                          | ✅ Вбудовано, App Router підтримує сегмент `[locale]`                                                                         | ✅ Вбудовано                                                                                                                  |
| **Динамічна генерація маршрутів**                               | ✅ Так                                                                                                                                             | ✅ Так                                                                                                                        | ✅ Так                                                                                                                        |
| **Плюралізація**                                                | ✅ Шаблони на основі перелічення                                                                                                                   | ✅ Добре                                                                                                                      | ✅ Добре                                                                                                                      |
| **Форматування (дати, числа, валюти)**                          | ✅ Оптимізовані форматери (Intl під капотом)                                                                                                       | ✅ Добре (Intl helpers)                                                                                                       | ✅ Добре (Intl helpers)                                                                                                       |
| **Формат вмісту**                                               | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                   | ✅ .json, .js, .ts                                                                                                            | ⚠️ .json                                                                                                                      |
| **Підтримка ICU**                                               | ⚠️ У розробці (WIP)                                                                                                                                | ✅ Так                                                                                                                        | ⚠️ Через плагін (`i18next-icu`)                                                                                               |
| **SEO-інструменти (hreflang, sitemap)**                         | ✅ Вбудовані інструменти: помічники для sitemap, robots.txt та метаданих                                                                           | ✅ Добре                                                                                                                      | ✅ Добре                                                                                                                      |
| **Екосистема / Спільнота**                                      | ⚠️ Менша, але швидко зростає та реактивна                                                                                                          | ✅ Добре                                                                                                                      | ✅ Добре                                                                                                                      |
| **Server-side Rendering & Server Components**                   | ✅ Так, оптимізовано для SSR / React Server Components                                                                                             | ⚠️ Підтримується на рівні сторінки, але потрібно передавати t-функції через дерево компонентів для дочірніх Server Components | ⚠️ Підтримується на рівні сторінки, але потрібно передавати t-функції через дерево компонентів для дочірніх Server Components |
| **Tree-shaking (завантаження лише використовуваного контенту)** | ✅ Так, по компоненту під час збірки через плагіни Babel/SWC                                                                                       | ⚠️ Частково                                                                                                                   | ⚠️ Частково                                                                                                                   |
| **Ліниве завантаження**                                         | ✅ Так, за локаллю / за словником                                                                                                                  | ✅ Так (за маршрутом/за локаллю), потребує управління просторами імен                                                         | ✅ Так (за маршрутом/за локаллю), потребує управління просторами імен                                                         |
| **Очищення невикористовуваного вмісту**                         | ✅ Так, для кожного словника під час збірки                                                                                                        | ❌ Ні, може керуватися вручну за допомогою управління просторами імен                                                         | ❌ Ні, може керуватися вручну за допомогою управління просторами імен                                                         |
| **Управління великими проєктами**                               | ✅ Заохочує модульність, підходить для дизайн-систем                                                                                               | ✅ Модульний за умови налаштування                                                                                            | ✅ Модульний за умови налаштування                                                                                            |
| **Тестування відсутніх перекладів (CLI/CI)**                    | ✅ CLI: `npx intlayer content test` (аудит, придатний для CI)                                                                                      | ⚠️ Не вбудовано; у документації радять `npx @lingual/i18n-check`                                                              | ⚠️ Не вбудовано; покладається на інструменти i18next або runtime `saveMissing`                                                |

---

## Вступ

Next.js надає вбудовану підтримку інтернаціоналізованої маршрутизації (наприклад, locale segments). Але ця функція сама по собі не виконує переклади. Вам все одно потрібна бібліотека, щоб відображати локалізований контент користувачам.

Існує багато i18n-бібліотек, але в екосистемі Next.js сьогодні три з них набувають популярності: next-i18next, next-intl та Intlayer.

---

## Архітектура та масштабованість

/// **next-intl / next-i18next**: За замовчуванням використовують **централізовані каталоги** для кожної локалі (плюс **namespaces** у i18next). Добре працює на початкових етапах, але часто перетворюється на велику спільну поверхню зі зростаючою зв’язністю та хаотичністю ключів.
/// **Intlayer**: Заохочує **per-component** (або **per-feature**) словники, **розміщені поруч** із кодом, який вони обслуговують. Це зменшує когнітивне навантаження, полегшує дублювання/міграцію UI-блоків і знижує конфлікти між командами. Невикористаний контент природно легше помітити й видалити.
///
/// **Чому це важливо:** У великих кодових базах або при роботі з design-system **модульний контент** масштабується краще, ніж монолітні каталоги.
///
/// ---
///
/// ## Розміри бандлів та залежності

Після збірки застосунку, bundle — це JavaScript, який браузер завантажує для відображення сторінки. Тому розмір bundle важливий для продуктивності застосунку.

У контексті багатомовного застосунку важливі два складники bundle:

- Код застосунку
- Контент, який завантажує браузер

## Код застосунку

Важливість коду застосунку в цьому випадку мінімальна. Усі три рішення є tree-shakable, тобто невикористані частини коду не включаються до bundle.

Нижче — порівняння розміру JavaScript-бандла, який завантажує браузер для багатомовного застосунку з трьома рішеннями.

Якщо в застосунку нам не потрібен жоден formatter, список експортованих функцій після tree-shaking буде:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Розмір бандла 180.6 kB -> 78.6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Розмір бандла 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Розмір бандла 80.7 kB -> 25.5 kB (gzip))

Ці функції — лише обгортки над React context/state, тому загальний вплив бібліотеки i18n на розмір бандла мінімальний.

> Intlayer трохи більший, ніж `next-intl` та `next-i18next`, оскільки він містить більше логіки в функції `useIntlayer`. Це пов'язано з інтеграцією markdown та `intlayer-editor`.

## Контент та переклади

Цей аспект часто ігнорують розробники, але розгляньмо випадок застосунку, що складається з 10 сторінок у 10 мовах. Припустимо для спрощення розрахунків, що кожна сторінка містить 100% унікального контенту (на практиці багато контенту дублюється між сторінками, наприклад заголовок сторінки, header, footer тощо).

Користувач, який хоче відвідати сторінку `/fr/about`, завантажить контент однієї сторінки певною мовою. Ігнорування оптимізації контенту призведе до зайвого завантаження 8,200% `((1 + (((10 pages - 1) × (10 languages - 1)))) × 100)` контенту застосунку. Чи бачите проблему? Навіть якщо цей контент — лише текст, і хоча ви, ймовірно, більше зосереджені на оптимізації зображень сайту, ви передаєте непотрібний контент по всьому світу й змушуєте пристрої користувачів обробляти його даремно.

Дві важливі проблеми:

- **Розбиття за маршрутом:**

  > Якщо я на сторінці `/about`, я не хочу завантажувати вміст сторінки `/home`

- **Розбиття за локаллю:**

  > Якщо я на сторінці `/fr/about`, я не хочу завантажувати вміст сторінки `/en/about`

Знову ж таки, усі три рішення усвідомлюють ці проблеми та дозволяють керувати цими оптимізаціями. Різниця між ними — це DX (Developer Experience).

`next-intl` та `next-i18next` використовують централізований підхід для керування перекладами, дозволяючи розбивати JSON за локаллю й на підфайли. У `next-i18next` ми називаємо JSON-файли 'namespaces'; `next-intl` дозволяє оголошувати messages. В `intlayer` ми називаємо JSON-файли 'dictionaries'.

- У випадку `next-intl`, як і у `next-i18next`, контент завантажується на рівні сторінки/макета, а потім цей контент передається в context provider. Це означає, що розробник має вручну керувати JSON-файлами, які будуть завантажені для кожної сторінки.

> На практиці це означає, що розробники часто пропускають цю оптимізацію, віддаючи перевагу завантаженню всього контенту в context provider сторінки заради простоти.

- У випадку `intlayer`, увесь контент завантажується в застосунок. Далі плагін (`@intlayer/babel` / `@intlayer/swc`) піклується про оптимізацію bundle, завантажуючи лише той контент, що використовується на сторінці. Отже, розробнику не потрібно вручну керувати словниками, які будуть завантажені. Це дозволяє кращу оптимізацію, кращу maintainability та зменшує час розробки.

У міру зростання додатка (особливо коли над ним працюють кілька розробників) часто забувають видаляти з JSON-файлів контент, який більше не використовується.

> Примітка: у всіх випадках завантажуються всі JSON-файли (next-intl, next-i18next, intlayer).

Ось чому підхід Intlayer є більш продуктивним: якщо компонент більше не використовується, його dictionary не завантажується в bundle.

Також важливо, як бібліотека обробляє fallback. Припустімо, що додаток за замовчуванням англійською, і користувач відкриває сторінку /fr/about. Якщо переклади французькою відсутні, буде використано англійський fallback.

У випадку `next-intl` та `next-i18next` бібліотека вимагає завантаження JSON, пов'язаних не лише з поточною локаллю, але й з fallback-локаллю. Тому, якщо весь контент перекладено, кожна сторінка завантажуватиме 100% непотрібного вмісту. **На відміну від цього, `intlayer` обробляє fallback під час побудови словників. Отже, кожна сторінка завантажує лише використовуваний вміст.**

> Примітка: Щоб оптимізувати бандл за допомогою `intlayer`, потрібно встановити опцію `importMode: 'dynamic'` у файлі `intlayer.config.ts`. Також переконайтесь, що плагін `@intlayer/babel` / `@intlayer/swc` встановлено (встановлюється за замовчуванням при використанні `vite-intlayer`).

Нижче приклад впливу оптимізації розміру бандла за допомогою `intlayer` у застосунку на vite + react:

| Оптимізований бандл                                                                                      | Неоптимізований бандл                                                                                                      |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![оптимізований бандл](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![неоптимізований бандл](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

## TypeScript і безпека

<Columns>
  <Column>

**next-i18next**

- Базові типи для хуків. **строга типізація ключів вимагає додаткових інструментів/конфігурації**.

  </Column>
  <Column>

**next-intl**

- Надійна підтримка TypeScript, але **ключі за замовчуванням не є строго типізованими**. вам доведеться підтримувати шаблони безпеки вручну.

  </Column>
  <Column>

**intlayer**

- **Генерує строгі типи** з вашого контенту. **Автодоповнення IDE** та **помилки на етапі компіляції** виявляють опечатки та відсутні ключі перед деплоєм.

  </Column>
</Columns>

**Чому це важливо:** Сильна типізація зміщує помилки вліво (CI/build) замість вправо (runtime).

---

## Обробка відсутніх перекладів

<Columns>
  <Column>

**next-i18next**

- Залежить від **runtime fallbacks**. Збірка не завершується з помилкою.

  </Column>
  <Column>

**next-intl**

- Залежить від **runtime fallbacks**. Збірка не завершується з помилкою.

  </Column>
  <Column>

**intlayer**

- **Виявлення під час збірки** з **попередженнями/помилками** для відсутніх локалей або ключів.

  </Column>
</Columns>

**Чому це важливо:** Виявлення прогалин під час збірки запобігає появі 'undefined' рядків у продакшені.

---

## Маршрутизація, middleware та стратегія URL

<Columns>
  <Column>

**next-i18next**

- Дозволяє локалізовану маршрутизацію. Але middleware не вбудовано.

  </Column>
  <Column>

**next-intl**

- Дозволяє локалізовану маршрутизацію.
- Надає middleware.

  </Column>
  <Column>

**intlayer**

- Дозволяє локалізовану маршрутизацію.
- Надає middleware.

  </Column>
</Columns>

**Чому це важливо:** Допомагає для SEO, покращує видимість і досвід користувача.

---

## Узгодження із Server Components (RSC)

<Columns>
  <Column>

**next-i18next**

- Підтримує server components для сторінок і layout.
- Не надавати синхронний API для дочірніх серверних компонент.

  </Column>
  <Column>

**next-intl**

- Підтримує сторінкові та layout серверні компоненти.
- Не надавати синхронний API для дочірніх серверних компонент.

  </Column>
  <Column>

**intlayer**

- Підтримує сторінкові та layout серверні компоненти.
- Надає синхронний API для дочірніх серверних компонент.

  </Column>
</Columns>

**Чому це важливо:** Підтримка серверних компонент — ключова особливість Next.js 13+, що покращує продуктивність. Передача через props `locale` або функції `t` від батьківської до дочірньої серверної компоненти робить ваші компоненти менш повторно використовуваними.

---

## Інтеграція з платформами локалізації (TMS)

Великі організації часто покладаються на системи керування перекладами (TMS), такі як **Crowdin**, **Phrase**, **Lokalise**, **Localizely** або **Localazy**.

- **Чому компаніям це важливо**
  - **Співпраця та ролі**: у процесі задіяні різні учасники: розробники, продакт-менеджери, перекладачі, рецензенти, маркетингові команди.
  - **Масштаб і ефективність**: безперервна локалізація, перегляд у контексті.

- **next-intl / next-i18next**
  - Зазвичай використовують **централізовані JSON-каталоги**, тож експорт/імпорт у TMS є простим.
  - Високорозвинені екосистеми та приклади/інтеграції для вказаних платформ.

- **Intlayer**
  - Заохочує **децентралізовані словники на рівні компонентів** та підтримує **TypeScript/TSX/JS/JSON/MD** контент.
  - Це покращує модульність у коді, але може ускладнити plug‑and‑play інтеграцію з TMS, коли інструмент очікує централізовані плоскі JSON-файли.
  - Intlayer пропонує альтернативи: **AI‑асистовані переклади** (використовуючи ваші власні ключі провайдера), **Visual Editor/CMS**, та робочі процеси **CLI/CI** для виявлення й попереднього заповнення прогалин.

> Примітка: `next-intl` та `i18next` також підтримують TypeScript-каталоги. Якщо ваша команда зберігає повідомлення в файлах `.ts` або децентралізує їх за функціоналом, ви можете зіштовхнутися з подібними проблемами інтеграції з TMS. Однак багато налаштувань `next-intl` залишаються централізованими в папці `locales/`, що трохи простіше перетворити в JSON для TMS.

---

## Досвід розробника

У цій частині виконується детальне порівняння трьох рішень. Замість розгляду простих випадків, як описано в розділі 'Початок роботи' для кожного рішення, ми розглянемо реальний сценарій використання, ближчий до справжнього проєкту.

### Структура додатку

Структура додатку важлива для забезпечення доброї підтримуваності вашого codebase.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── i18n.ts
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
└── src
    ├── middleware.ts
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── home
    │           ├── index.tsx
    │           └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### Порівняння

- **next-intl / next-i18next**: Централізовані каталоги (JSON; namespaces/messages). Чітка структура, добре інтегрується з платформами перекладів, але може призводити до більшої кількості змін у різних файлах у міру зростання застосунку.
- **Intlayer**: Словники `.content.{ts|js|json}` для кожного компонента, розміщені поруч із компонентами. Полегшує повторне використання компонентів і локальне розуміння; додає файли та покладається на інструменти на етапі збірки.

#### Налаштування та завантаження контенту

Як зазначалося раніше, потрібно оптимізувати спосіб імпортування кожного JSON-файлу у ваш код.
Важливо, як бібліотека обробляє завантаження контенту.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Завантаження JSON-ресурсів із src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: пакет }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Примусове статичне рендерення сторінки
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Завантажуйте лише ті неймспейси, які потрібні вашим layout/pages
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Встановлює активну локаль запиту для цього серверного рендерингу (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Повідомлення завантажуються на сервері. Надсилайте на клієнт лише те, що потрібно.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Переклади/форматування, що виконуються виключно на сервері
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### Порівняння

Усі три рішення підтримують завантаження контенту для кожної локалі та використання провайдерів.

- У **next-intl/next-i18next** зазвичай завантажують вибрані повідомлення/простори імен (namespaces) для кожного маршруту та розміщують провайдери там, де це потрібно.

- **Intlayer** додає аналіз під час збірки для виявлення використання, що може зменшити ручне підключення провайдерів і дозволити використання одного кореневого провайдера.

Вибирайте між явним контролем та автоматизацією залежно від уподобань команди.

### Використання в клієнтському компоненті

Розглянемо приклад клієнтського компонента, що рендерить лічильник.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Переклади (по одному JSON на простір імен у `src/locales/...`)**

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Клієнтський компонент (завантажує лише необхідний простір імен)**

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Переконайтеся, що сторінка/провайдер включає лише ті namespaces, які вам потрібні (наприклад, `about`).
> Якщо ви використовуєте React < 19, memoize важкі форматери, такі як `Intl.NumberFormat`.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Переклади (структура збережена; завантажуйте їх у messages next-intl як вам зручніше)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Клієнтський компонент**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Обмежити область безпосередньо на вкладений об'єкт
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Не забудьте додати повідомлення "about" у клієнтські повідомлення сторінки

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Контент**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ uk: "Лічильник", en: "Counter", fr: "Compteur" }),
    increment: t({ uk: "Збільшити", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Клієнтський компонент**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // returns strings
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### Порівняння

- **Форматування чисел**
  - **next-i18next**: немає `useNumber`; використовуйте `Intl.NumberFormat` (або i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: вбудований `useNumber()`.

- **Ключі**
  - Зберігайте вкладену структуру (`about.counter.label`) і налаштовуйте область дії вашого hook відповідно (`useTranslation("about")` + `t("counter.label")` або `useTranslations("about.counter")` + `t("label")`).

- **File locations**
  - **next-i18next** очікує JSON у `public/locales/{lng}/{ns}.json`.
  - **next-intl** гнучкий; завантажуйте повідомлення так, як ви налаштуєте.
  - **Intlayer** зберігає контент у словниках TS/JS та звертається по ключу.

---

### Використання в server component

Розглянемо випадок UI-компонента. Цей компонент — server component, і він повинен мати можливість бути вставленим як дочірній елемент client component. (page (server component) -> client component -> server component). Оскільки цей компонент може бути вставлений як дочірній елемент client component, він не може бути async.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
  formatter: Intl.NumberFormat;
};

const ServerComponent = ({
  t,
  locale,
  count,
  formatter,
}: ServerComponentProps) => {
  const formatted = formatter.format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

> Оскільки серверний компонент не може бути async, вам потрібно передати переклади та функцію форматування як пропси.
>
> На вашій сторінці / layout:
>
> - `import { getTranslations, getFormatter } from "next-intl/server";`
> - `const t = await getTranslations("about.counter");`
> - `const formatter = await getFormatter().then((formatter) => formatter.number());`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer надає **безпечні для сервера** хуки через `next-intlayer/server`. Для роботи `useIntlayer` і `useNumber` використовують синтаксис, схожий на клієнтські хуки, але під капотом залежать від серверного контексту (`IntlayerServerProvider`).

### Метадані / Sitemap / Robots

Перекладати контент — це чудово. Але люди зазвичай забувають, що головна мета інтернаціоналізації — зробити ваш вебсайт більш помітним для світу. I18n — надзвичайно ефективний важіль для покращення видимості вашого сайту.

Ось перелік кращих практик щодо багатомовного SEO.

- встановлюйте мета-теги hreflang у тегу `<head>`
  > Це допомагає пошуковим системам зрозуміти, які мови доступні на сторінці
- перераховуйте всі переклади сторінок у sitemap.xml, використовуючи XML-схему `http://www.w3.org/1999/xhtml`
  >
- не забудьте виключити префіксовані сторінки з robots.txt (наприклад `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
  >
- використовуйте кастомний компонент Link, щоб перенаправляти на максимально локалізовану версію сторінки (наприклад французькою `<a href="/fr/about">A propos</a>` )
  >

Розробники часто забувають правильно посилатися на свої сторінки в різних локалях.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;

  // Імпортувати правильний JSON-бандл з src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};

export default async function AboutPage() {
  return <h1>Про нас</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export const sitemap = (): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
};
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

const localizedPath = (locale: string, path: string) => {
  return locale === defaultLocale ? path : "/" + locale + path;
};

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
};

// ... Решта коду сторінки
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export const sitemap = (): MetadataRoute.Sitemap => {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
};
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Решта коду сторінки
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
ts;
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer надає функцію `getMultilingualUrls` для генерації багатомовних URL-адрес для вашого sitemap.

### Middleware для маршрутизації локалі

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

Додайте middleware для обробки визначення локалі та маршрутизації:

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // виключити файли з розширеннями

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (l) => pathname === "/" + l || pathname.startsWith("/" + l + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Відповідає всім шляхам, крім тих, що починаються з наведених, та файлів з розширенням
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

Додайте middleware для визначення локалі та маршрутизації:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Пропустити API, внутрішні ресурси Next та статичні ресурси
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

Intlayer забезпечує вбудовану підтримку middleware через конфігурацію пакета `next-intlayer`.

```ts fileName="src/middleware.ts"
import { intlayerProxy } from "next-intlayer/proxy";

export const middleware = intlayerProxy();

// застосовує цей middleware лише до файлів у директорії app
export const config = {
  matcher: "/((?!api|_next|static|.*\\..*).*)",
};
```

Налаштування middleware централізовано в файлі `intlayer.config.ts`.

  </TabItem>
</Tab>

### Контрольний список налаштувань та найкращі практики

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

- Переконайтеся, що `lang` і `dir` встановлені на кореневому `<html>` у `src/app/[locale]/layout.tsx`.
- Розділяйте переклади за просторами імен (наприклад `common.json`, `about.json`) у `src/locales/<locale>/`.
- Завантажуйте у клієнтських компонентах лише необхідні простори імен, використовуючи `useTranslation('<ns>')` та обмежуючи `I18nProvider` тими ж просторами імен.
- Зберігайте сторінки статичними, коли це можливо: експортуйте `export const dynamic = 'force-static'` у сторінках; встановіть `dynamicParams = false` та реалізуйте `generateStaticParams`.
- Використовуйте синхронні серверні компоненти, вкладені під client boundaries, передаючи вже обчислені рядки або функцію `t` і `locale`.
- Для SEO встановіть `alternates.languages` у metadata, перелічіть локалізовані URL у `sitemap.ts` та забороніть дублювання локалізованих маршрутів у `robots.ts`.
- Віддавайте перевагу форматувальникам, що враховують локаль (наприклад, `Intl.NumberFormat(locale)`), і мемоізуйте їх на клієнті, якщо використовуєте React < 19.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

- **Встановіть html `lang` і `dir`**: У `src/app/[locale]/layout.tsx` обчисліть `dir` за допомогою `getLocaleDirection(locale)` і встановіть `<html lang={locale} dir={dir}>`.
- **Розділяйте повідомлення за namespace**: Організуйте JSON за локаллю та namespace (наприклад, `common.json`, `about.json`).
- **Мінімізуйте навантаження на клієнт**: На сторінках надсилайте в `NextIntlClientProvider` лише потрібні namespace (наприклад, `pick(messages, ['common', 'about'])`).
- **Віддавайте перевагу статичним сторінкам**: Експортуйте `export const dynamic = 'force-static'` і згенеруйте статичні params для всіх `locales`.
- **Синхронні серверні компоненти**: Тримайте серверні компоненти синхронними, передаючи попередньо обчислені рядки (перекладені підписи, відформатовані числа) замість асинхронних викликів або несеріалізованих функцій.

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

- **Модульний контент**: Розміщуйте словники контенту разом з компонентами, використовуючи файли `.content.{ts|js|json}`.
- **Безпека типів**: Використовуйте інтеграцію з TypeScript для перевірки контенту під час компіляції.
- **Оптимізація під час збірки**: Використовуйте інструменти збірки Intlayer для автоматичного tree-shaking та оптимізації бандлів.
- **Вбудовані інструменти**: Скористайтеся вбудованим роутингом, допоміжними інструментами для SEO та підтримкою візуального редактора.

  </TabItem>
</Tab>

---

## А переможець…

Це не просто. Кожен варіант має свої компроміси. Ось як я це бачу:

<Columns>
  <Column>

**next-i18next**

- зріла, багатофункціональна, має безліч плагінів від спільноти, але з вищими витратами на налаштування. Якщо вам потрібна **екосистема плагінів i18next** (наприклад, розширені правила ICU через плагіни) і ваша команда вже знає i18next, готові прийняти **більше налаштувань** заради гнучкості.

  </Column>
  <Column>

**next-intl**

- найпростіше, легке, менше нав'язаних рішень. Якщо ви хочете **мінімальне** рішення, вам зручно працювати з централізованими каталогами, і ваш додаток **малий або середнього розміру**.

  </Column>
  <Column>

**Intlayer**

- створений для сучасного Next.js, з модульним контентом, type safety, інструментами та меншим boilerplate. Якщо ви цінуєте **component-scoped content**, **strict TypeScript**, **build-time guarantees**, **tree-shaking**, і **batteries-included** інструменти для маршрутизації/SEO/редакторів — особливо для **Next.js App Router**, design-systems та **великих, модульних codebases**.

  </Column>
</Columns>

Якщо ви віддаєте перевагу мінімальній конфігурації і готові до деякої ручної інтеграції, next-intl — хороший вибір. Якщо вам потрібні всі функції і вас не лякає складність, next-i18next теж підходить. Але якщо ви хочете сучасне, масштабоване, модульне рішення з готовими інструментами, Intlayer прагне надати це "з коробки".

> **Альтернатива для корпоративних команд**: Якщо вам потрібне перевірене рішення, яке відмінно працює з усталеними платформами локалізації, такими як **Crowdin**, **Phrase** або іншими професійними системами управління перекладами, розгляньте **next-intl** або **next-i18next** через їхню зрілу екосистему та перевірені інтеграції.

> **Майбутній роадмап**: Intlayer також планує розробляти плагіни, які працюватимуть поверх рішень **i18next** та **next-intl**. Це дасть вам переваги Intlayer у сфері автоматизації, синтаксису та управління контентом, зберігаючи при цьому безпеку й стабільність, які надають ці усталені рішення у вашому коді застосунку.

## GitHub зірки

Зірки на GitHub є потужним індикатором популярності проєкту, довіри спільноти та його довгострокової значущості. Хоча це не прямий показник технічної якості, вони відображають, скільки розробників вважають проєкт корисним, стежать за його розвитком і, ймовірно, приймуть його у використання. Для оцінки цінності проєкту зірки допомагають порівнювати залученість між альтернативами та дають уявлення про зростання екосистеми.

[![Графік історії зірок](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Висновок

Усі три бібліотеки успішно справляються з базовою локалізацією. Різниця полягає в тому, **скільки роботи вам доведеться виконати**, щоб досягти надійної, масштабованої конфігурації в **сучасному Next.js**:

- З **Intlayer**, **модульний контент**, **строгий TS**, **безпека на етапі збірки**, **tree-shaken bundles**, і **first-class App Router + SEO tooling** — це **за замовчуванням**, а не обов'язок.
- Якщо ваша команда цінує **підтримуваність і швидкість** у багатомовному, орієнтованому на компоненти додатку, Intlayer сьогодні пропонує **найповніший** досвід.

Зверніться до документа ['Чому Intlayer?'](https://intlayer.org/doc/why) для детальнішої інформації.
