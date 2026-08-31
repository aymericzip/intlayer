---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: Intlayer визуальный редактор | Изменяйте свой контент, используя визуальный редактор
description: Узнайте, как использовать редактор Intlayer для управления вашим многоязычным веб-сайтом. Следуйте шагам в этой онлайн-документации, чтобы настроить ваш проект за несколько минут.
keywords:
  - Редактор
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Документация по Intlayer Visual Editor

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor - это инструмент, который оборачивает ваш веб-сайт для взаимодействия с файлами декларации контента с использованием визуального редактора.

![Интерфейс Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Пакет `intlayer-editor` основан на Intlayer и доступен для JavaScript-приложений, таких как React (Create React App), Vite + React и Next.js.

## Визуальный редактор vs CMS

Intlayer Visual Editor - это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для локальных словарей. После внесения изменений контент будет заменён в кодовой базе. Это означает, что приложение будет пересобрано, и страница будет перезагружена для отображения нового контента.

В отличие от этого, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) - это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для удалённых словарей. После внесения изменений контент **не** повлияет на вашу кодовую базу. И веб-сайт автоматически отобразит изменённый контент.

## Интеграция Intlayer в ваше приложение

Для получения более подробной информации о том, как интегрировать Intlayer, см. соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md).

## Как работает Intlayer Editor

Визуальный редактор в приложении включает в себя две вещи:

- Фронтенд-приложение, которое отображает ваш веб-сайт в iframe. Если ваш веб-сайт использует Intlayer, визуальный редактор автоматически обнаружит ваш контент и позволит вам взаимодействовать с ним. После внесения изменений вы сможете скачать изменения.

- После нажатия кнопки загрузки визуальный редактор отправит запрос на сервер для замены ваших файлов декларации контента новым контентом (где бы эти файлы ни были объявлены в вашем проекте).

> Обратите внимание, что на данный момент Intlayer Editor записывает ваши файлы декларации контента в формате JSON.

## Установка

После настройки Intlayer в вашем проекте просто установите `intlayer-editor` как зависимость для разработки:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

С флагом `--with` вы можете запустить редактор параллельно с другой командой:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Конфигурация

В вашем файле конфигурации Intlayer вы можете настроить параметры редактора:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Обязательно
     * URL приложения.
     * Это URL, на который нацелен визуальный редактор.
     * Пример: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Необязательно
     * По умолчанию `true`. Если `false`, редактор неактивен и недоступен.
     * Может использоваться для отключения редактора в определённых средах по соображениям безопасности, например, в продакшене.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Необязательно
     * По умолчанию `8000`.
     * Порт сервера редактора.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Необязательно
     * По умолчанию "http://localhost:8000"
     * URL сервера редактора.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование редактора

1. После установки редактора вы можете запустить его с помощью следующей команды:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Обратите внимание, что ваше приложение должно работать параллельно.** URL приложения должен совпадать с тем, который вы указали в конфигурации редактора (`applicationURL`).

> **Учтите, что команда переэкспортируется пакетом `intlayer`. Вместо этого вы можете использовать `npx intlayer editor start`.**

2. Затем откройте предоставленный URL. По умолчанию `http://localhost:8000`.

   Вы можете просмотреть каждое поле, индексированное Intlayer, наведя курсор на ваш контент.

   ![Наведение на контент](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Если ваш контент выделен, вы можете долго нажимать на него, чтобы отобразить панель редактирования.

## Конфигурация окружения

Редактор можно настроить на использование конкретного файла окружения. Это полезно, когда вы хотите использовать один и тот же файл конфигурации для разработки и продакшена.

Чтобы использовать конкретный файл окружения, вы можете использовать флаг `--env-file` или `-f` при запуске редактора:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Обратите внимание, что файл окружения должен находиться в корневой директории вашего проекта.

Или вы можете использовать флаг `--env` или `-e`, чтобы указать окружение:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Отладка

Если вы столкнулись с какими-либо проблемами с визуальным редактором, проверьте следующее:

- Визуальный редактор и приложение работают.

- Конфигурация [`editor`](https://intlayer.org/ru/doc/concept/configuration#editor-configuration) правильно настроена в вашем файле конфигурации Intlayer.
  - Обязательные поля:
    - URL приложения должен совпадать с тем, который вы указали в конфигурации редактора (`applicationURL`).

- Визуальный редактор использует iframe для отображения вашего сайта. Убедитесь, что политика безопасности контента (Content Security Policy, CSP) вашего сайта разрешает URL CMS в качестве `frame-ancestors` (по умолчанию 'http://localhost:8000'). Проверьте консоль редактора на наличие ошибок.

## Часто задаваемые вопросы

<FAQ>

<Question title="В чём разница между визуальным редактором и CMS?">

Визуальный редактор редактирует локальные словари и записывает изменение обратно в вашу кодовую базу, поэтому оно проходит через ваш обычный процесс проверки и развёртывания. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) редактирует удалённые словари, которые меняются на работающем сайте без развёртывания. Редактор подходит для контента, которым владеют разработчики; CMS подходит для контента, которым владеет маркетинговая команда.

</Question>

<Question title="Насколько i18n увеличивает размер моего бандла?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Разметка, отрендеренная на сервере, разрешает свой контент на сервере, и компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются. [Динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md).

</Question>

<Question title="Могу ли я мигрировать с `i18next`, `next-intl` или `react-i18next`, не переписывая свои компоненты?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md) или [руководства по миграции с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` и `Lingui`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код компонентов — нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки на исходном коде JSX, TSX, Vue и Svelte, генерируя словари при каждом изменении, поэтому нет ключей, которые нужно поддерживать вручную. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, остаются недоступными, и ему нужно несколько аннотаций, чтобы отличать текст, видимый пользователю, от логики приложения.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Где выполняется визуальный редактор?">

На вашей собственной инфраструктуре. Он загружает ваше приложение в iframe и общается с локальным сервером редактора, поэтому ваш контент никогда не покидает вашу среду. Именно это делает его пригодным для проектов, которые не могут отправлять текст в размещённый сервис.

</Question>

<Question title="Нужно ли редакторам уметь программировать?">

Нет. Они открывают сайт, кликают на фрагмент текста и редактируют его на месте. Редактор определяет, какая запись словаря стоит за этим текстом, и записывает изменение в правильный файл контента, поэтому переводчику не нужно искать файл или знать ключ.

</Question>

<Question title="Изменяет ли редактирование через визуальный редактор мои исходные файлы?">

Да, таков замысел. Изменение попадает в файл объявления контента в вашей кодовой базе, поэтому оно отображается как обычный diff, который вы можете просмотреть и закоммитить, и приложение пересобирается, чтобы его показать.

</Question>

<Question title="Редактор показывает пустую страницу или отказывается загружать мой сайт. Что мне проверить?">

Редактор отображает ваше приложение в iframe, поэтому ваша Content Security Policy должна разрешать источник редактора как `frame-ancestors`, что по умолчанию `http://localhost:8000`. Также убедитесь, что `applicationURL` в вашей конфигурации редактора совпадает с URL, с которого ваше приложение действительно обслуживается. Консоль редактора сообщает об обоих сбоях.

</Question>

<Question title="Могу ли я использовать визуальный редактор в продакшене?">

Он предназначен для разработки и staging, где пересборка после правки приемлема. Для редактирования контента на живом сайте без развёртывания используйте вместо этого [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) и её удалённые словари.

</Question>

<Question title="Бесплатен ли визуальный редактор?">

Да. Визуальный редактор является частью проекта с открытым исходным кодом, по лицензии Apache 2.0, включая коммерческое использование. Только размещённая [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) является платным сервисом, и её также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
