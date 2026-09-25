---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: Intlayer легче, чем Paraglide?
description: Paraglide кажется практически невесомым в бенчмарках i18n, поскольку его код генерируется прямо в ваш репозиторий. Разбираемся, куда на самом деле уходит этот вес, почему чтение локали для каждого узла обходится дорого и как динамическая загрузка Intlayer отправляет одну локаль вместо всех.
keywords:
  - Paraglide
  - Intlayer
  - Интернационализация
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Intlayer легче, чем Paraglide?

Да.

У `Paraglide` сложилась отличная репутация самого легкого решения для i18n, и на первый взгляд [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) с этим согласен: размер его библиотеки близок к нулю. Однако нулевой размер библиотеки вовсе не означает нулевое количество отправленных байтов. Это лишь говорит о том, что байты находятся там, куда эта метрика не заглядывает.

<TOC/>

## Ключевые выводы

**Размер библиотеки скрыт, а не устранен:**

Paraglide генерирует рантайм и функции сообщений непосредственно в вашу кодовую базу. Этот код отправляется в браузер, но учитывается как _ваш_ код, а не код библиотеки.

**Отсутствие провайдера - это не бесплатный выигрыш:**

Каждый вызов `m.my_key()` самостоятельно определяет локаль, считывая cookie или хранилище для каждого отрисованного узла, вместо того чтобы прочитать ее один раз из контекста.

**Нет динамической загрузки:**

Paraglide импортирует все локали сообщения в клиентский бандл. Intlayer с `importMode: 'dynamic'` или `'fetch'` загружает только ту локаль, которая сейчас отображается.

**Tree shaking не гарантирован:**

В некоторых наших тестах заявленный Paraglide tree shaking не сработал. Обязательно проверьте собственный бандл.

## Куда уходит вес Paraglide?

В отчетах бенчмарков метрика «размер библиотеки» измеряет провайдер и хуки каждой библиотеки i18n в пустом компоненте, до добавления какого-либо контента.

| Библиотека (TanStack Start)   | Размер либы (gz) | Размер либы (min) |
| ----------------------------- | ---------------- | ----------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB           | 4.5 KB            |
| `react-intlayer@9.5.1`        | 5.0 KB           | 15.2 KB           |

В отрыве от контекста Paraglide выигрывает. Но Paraglide - это компилятор: он читает ваши файлы `messages/*.json` и записывает папку `paraglide/` в ваш репозиторий. Она содержит `runtime.js` (определение локали, стратегии cookie и storage, локализация URL) и по одной JavaScript-функции на каждое сообщение.

```bash
src/paraglide/
├── runtime.js      # определение локали, стратегии, URL-хелперы
├── server.js
├── messages.js     # реэкспорт всех сообщений
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Поскольку этот код находится в папке `src/` и вы импортируете его по относительному пути, сборщик приписывает его вашему приложению, а не пакету из `node_modules`. Колонка размера библиотеки почти ничего не показывает, хотя та же самая логика по-прежнему отправляется в бандле вашей страницы.

Генерация кода сама по себе неплоха: сгенерированный рантайм содержит только ту логику, которая нужна вашей конфигурации (стратегия префиксов, cookie или local storage и т. д.). Intlayer достигает того же результата иначе, внедряя переменные окружения на этапе сборки, благодаря чему бандлер удаляет ветви кода, не используемые вашей конфигурацией. Оба подхода оказываются в 3–10 раз легче, чем `i18next` или `next-intl`.

Поэтому честное сравнение - это не размер библиотеки. Это **JavaScript, фактически отправляемый на каждую страницу**.

## Измеренный вес страницы

Приложение TanStack Start, 10 страниц, измерения на маршрутах `en` и `fr`, сжатие gzip:

| Конфигурация                       | Средний JS стр (gz) | Выше базы   | Утечка локали | Утечка других страниц |
| ---------------------------------- | ------------------- | ----------- | ------------- | --------------------- |
| Базовая (без i18n)                 | 111.0 KB            | -           | 0.0%          | 0.0%                  |
| `paraglide` (любая стратегия)      | 125.1 KB            | +14.1 KB    | 49.7%         | 0.0%                  |
| `intlayer` (`importMode: static`)  | 125.8 KB            | +14.8 KB    | 50.0%         | 0.0%                  |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**        | **+7.6 KB** | **0.0%**      | **0.0%**              |

Next.js 16 App Router, то же приложение:

| Конфигурация       | Средний JS стр (gz) | Выше базы   |
| ------------------ | ------------------- | ----------- |
| Базовая (без i18n) | 141.0 KB            | -           |
| `paraglide-next`   | 155.3 KB            | +14.3 KB    |
| `next-intlayer`    | **141.3 KB**        | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> Полные данные приведены в [отчете о бенчмарке TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) и в [отчете о бенчмарке Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md). Каждый бандл можно изучить в [репозитории бенчмарка](https://github.com/intlayer-org/benchmark-i18n).

Два момента бросаются в глаза:

- В режиме `static` Intlayer отправляет практически тот же объем данных, что и Paraglide (125.8 KB против 125.1 KB). Это ожидаемо: оба включают все локали сообщений, используемых страницей.
- Paraglide остается на уровне 125.1 KB при любой стратегии, поскольку в нем нет динамического режима. Каждая строка в таблице выше соответствует статической конфигурации.

## Отсутствие Provider: идея, кажущаяся хорошей лишь на первый взгляд

У Paraglide нет провайдера. Вы импортируете сообщение и вызываете его:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Ни контекста, ни обертки, ни хука. Это кажется проще. Но локаль все равно нужно откуда-то получать. Каждая сгенерированная функция сообщения выглядит приблизительно так (упрощенно):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // вычисляется при каждом вызове

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...по одной ветке на каждую локаль
};
```

А `getLocale()` проходит по всем настроенным стратегиям (cookie, local storage, URL, базовая локаль), чтобы определить текущую локаль. Таким образом, каждый отрисовываемый текстовый узел (`<>{m.my_key()}</>`) выполняет собственное определение локали, включая чтение `document.cookie` в браузере. Страница с 200 переведенными строками вычисляет локаль 200 раз за один рендер, и затем повторно при каждом перерендере.

Библиотека с провайдером считывает локаль **один раз**, сохраняет ее в контексте (или сигнале, или сторе), и каждый узел читает значение, уже находящееся в оперативной памяти. Провайдер весит всего несколько сотен байт. Отказ от него нагружает процессор при каждом рендере, что наглядно отражается в бенчмарке: время загрузки страницы и скорость смены языка у Paraglide стабильно уступают Intlayer на TanStack Start (22.1 мс против 14.6 мс при загрузке страницы, 4.3 мс против 3.2 мс при реактивности E2E).

## Удобство разработки (DX)

Источником истины для Paraglide является JSON, но вы никогда не импортируете сам JSON. Вы импортируете сгенерированный файл `.js`:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/ru.json"
{
  "hero_title": "Публикуйте ваше приложение на всех языках"
}
```

```tsx fileName="Hero.tsx"
// Существует только после перегенерации компилятором из JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      ru: "Публикуйте ваше приложение на всех языках",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Такой рабочий процесс влечет за собой издержки:

- Любое изменение в файле JSON требует перегенерации, прежде чем импорт заработает или обновятся типы.
- Сгенерированную папку `paraglide/` приходится либо коммитить в репозиторий (что приводит к конфликтам слияния при каждом PR с правками текста), либо добавлять в игнорируемые файлы (что требует шага генерации перед каждой проверкой типов, тестом и задачей CI).
- Каждая строка превращается в вызов функции. Константы становятся `m.key()` абсолютно везде, даже там, где подошло бы обычное статическое значение.

## Tree Shaking: проверьте свой бандл

Главное обещание Paraglide заключается в том, что неиспользуемые сообщения удаляются с помощью tree shaking, поскольку каждое сообщение является отдельным экспортом. В бенчмарке Svelte + Vite это работает именно так, как заявлено.

В других окружениях этого не произошло. В нашем тесте на [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md) страницы Paraglide весят на 14 KB больше базового приложения, тогда как `next-intlayer` добавляет лишь 0.3 KB. Предыдущие тесты на TanStack Start также показали, что сообщения с других страниц попадали в бандл текущего маршрута.

Tree shaking зависит от вашего сборщика (Turbopack, Rolldown, Rollup), способа импорта сообщений (`import { m }` против `import * as m`) и анализа сайд-эффектов. Если вы выбираете Paraglide из-за размера, откройте анализатор бандла и убедитесь, что это действительно работает в вашем приложении.

## Нет динамической загрузки

Это фундаментальное структурное ограничение. В Paraglide нет способа загружать по одной локали за раз: каждая функция сообщения статически импортирует реализацию каждого языка, поэтому абсолютно все языки попадают в ваш клиентский бандл.

При 2 языках половина трафика на переводы тратится впустую, что соответствует утечке локали около ~50%, измеренной выше. При 10 языках бесполезны 90% объема. При 30 языках - 97%.

Переход на динамическую загрузку также не решил бы проблему: при наличии отдельной функции на каждое сообщение ленивая загрузка каждой из них привела бы к тысячам сетевых запросов.

Intlayer позволяет выбирать стратегию как глобально, так и для каждого словаря отдельно:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Что отправляется клиенту                                     | vs. Paraglide                    |
| ------------ | ------------------------------------------------------------ | -------------------------------- |
| `static`     | Все локали словарей, которые использует страница             | Теоретически тот же объем        |
| `dynamic`    | Только активная локаль, ленивая загрузка для каждого словаря | **В N раз меньше** при N локалях |
| `fetch`      | Только активная локаль, получаемая через Live Sync API       | **В N раз меньше** при N локалях |

Благодаря [трансформации на этапе сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и режиму `importMode: 'static'`, Intlayer теоретически загружает ровно тот же объем данных, что и Paraglide. А в режимах `'dynamic'` или `'fetch'` он загружает только то, что требуется текущей локали: для приложения на N языках объем передаваемых переводов оказывается в N раз меньше, чем у Paraglide.

## Где Paraglide все еще уместен

<AccordionGroup>
<Accordion header="Svelte + Vite с небольшим количеством языков">

Если ваш стек - это Svelte с Vite и вы поддерживаете два или три языка, tree shaking работает как заявлено, а накладные расходы на лишние локали остаются незначительными.

</Accordion>
<Accordion header="Существующий рабочий процесс с inlang">

Если ваша команда уже использует экосистему inlang (Fink, Sherlock, плагины форматов сообщений), Paraglide нативно интегрируется в этот процесс.

</Accordion>
</AccordionGroup>

## Проверьте на своем приложении

Проверьте объем бандла и утечки локалей вашего рабочего приложения с помощью бесплатного инструмента [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Установка Intlayer:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

## Дополнительные материалы

- [Бенчмарк i18n в TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md)
- [Бенчмарк i18n в Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md)
- [Оптимизация бандла и `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)
- [Как выбрать библиотеку i18n для React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_react_i18n_library.md)
- [Аргументы в пользу компиляторного подхода к интернационализации](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md)
