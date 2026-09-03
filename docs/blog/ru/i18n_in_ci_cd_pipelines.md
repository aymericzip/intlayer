---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Автоматизация переводов в CI/CD без отправки некорректных текстов"
description: Три точки для автоматизации i18n, pre-push, pull request и runtime. Как заблокировать сборку по покрытию, безопасно автозаполнять переводы и избежать бесконечного цикла коммитов.
keywords:
  - автоматизация переводов ci
  - i18n ci cd
  - github actions переводы
  - husky pre-push
  - непрерывная локализация
  - translation pipeline
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Автоматизация переводов в CI/CD без отправки некорректных текстов

Ручной перевод не выдерживает темпов современной разработки. Разработчик добавляет строку в пятницу, экспорт происходит только в следующем спринте, и к этому моменту еще три языка отстают от актуальной версии. Автоматизировать этот процесс просто. Сложнее сделать это так, чтобы случайно не выкатить сырой машинный перевод клиентам.

## Содержание

<TOC/>

## Для автоматизации не нужно мигрировать

Приведенные ниже схемы пайплайнов не зависят от используемой библиотеки, как и инструменты. Если ваши переводы хранятся в JSON-каталогах для i18next, next-intl, react-intl, vue-i18n или next-translate, [плагин Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) читает и обновляет эти файлы прямо на месте:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // или "icu" для next-intl / react-intl
    }),
  ],
};

export default config;
```

Ваше приложение продолжает импортировать то, что импортировало раньше. CI-задачи затем заполняют и проверяют существующие каталоги, а в ревью будет виден обычный diff в `locales/fr/checkout.json`, а не глобальная миграция кодовой базы. Также есть [плагин Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) для gettext и [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) для сохранения runtime API без изменений.

## Разделяйте блокировку (gate) и заполнение (fill)

Две совершенно разные задачи постоянно путают между собой.

**Gate (барьер)** — это проверка, которая падает с ошибкой. Она указывает, что сборка не должна попасть в релиз из-за отсутствия обязательных переводов. Gate ничего не записывает.

**Fill (заполнение)** — это мутация данных. Команда генерирует недостающие переводы и коммитит их. Fill никогда не роняет сборку.

Запуск только fill означает, что ничто никогда не блокируется, и непроверенный машинный текст попадает напрямую в продакшен. Запуск только gate означает, что билд становится красным и человеку приходится вмешиваться каждый раз. Большинству команд нужны оба механизма, привязанные к разным триггерам: fill на этапе pull request, gate при слиянии в релизную ветку.

## Где размещать автоматизацию

| Этап          | Триггер   | Для чего подходит                           | Затраты                                          |
| :------------ | :-------- | :------------------------------------------ | :----------------------------------------------- |
| Pre-push хук  | Git local | Быстрая обратная связь, не тратит минут CI  | Работает на машине разработчика с его API-ключом |
| Pull request  | CI job    | Ревью до слияния, единое место для секретов | Минуты CI плюс запросы к модели на каждый PR     |
| Release ветка | CI job    | Жесткая блокировка по покрытию              | Дешево, без вызовов нейросетей                   |
| Runtime       | CMS       | Правки контента без пересборки приложения   | Зависимость от внешнего сервиса                  |

## Pre-push: самый быстрый цикл

Husky запускает заполнение до того, как код покинет рабочую станцию, поэтому переводы отправляются в том же пуше, что и новые строки.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

Флаг `--unpushed` ограничивает работу только тем контентом, который еще не был отправлен в удаленный репозиторий, поэтому пуш не зависает на минуту. `--mode complete` заполняет только пропущенные ключи и не перезаписывает уже существующие переводы, гарантируя сохранность вычитанного текста.

В монорепозитории изолируйте приложения:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Минус очевиден: каждому разработчику нужен API-ключ, и расходы ложатся на того, кто делает пуш. Поэтому команды обычно переносят этот этап в CI по мере роста.

## Pull request: автозаполнение на этапе ревью

Тот же процесс в GitHub Actions с ограничением по diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Четыре детали здесь имеют решающее значение:

- **`fetch-depth: 0`** необходим для работы `--git-diff`. У поверхностного клона нет базовой ветки для построения diff, и заполнение молча ничего не сделает.
- **`[skip ci]` в сообщении коммита** предотвращает зацикливание воркфлоу. Без него коммит инициирует новый запуск, который коммитит снова, сжигая баланс CI за ночь.
- **`concurrency` с `cancel-in-progress`** защищает от гонки двух одновременных пушей при записи файлов.
- **`--git-diff`** ограничивает обработку только тем, что изменилось в PR. Без него весь каталог будет переводиться заново при каждом запуске.

Переводы фиксируются коммитом прямо в ветку PR, что дает возможность ревьюеру проверить их в diff. В этом и заключается смысл выполнения шага на этапе PR, а не после слияния.

## Релизная ветка: блокирующий барьер (gate)

Барьер не требует доступа к моделям и должен выполняться быстро.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

С проверкой через тест, проверяющий покрытие ассертами:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("не содержит пропусков в обязательных локалях", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Команда `npx intlayer content test` выводит отчет в консоль, но завершается с кодом 0, поэтому она только информирует, но не блокирует сборку. Используйте ее локально, а в CI запускайте тест с ассертом. Подробнее в статье [как находить недостающие переводы](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md).

## `requiredLocales` делает барьер жизнеспособным

Барьер, требующий полноты всех восемнадцати языков, блокирует релиз до тех пор, пока не будет готов самый медленный перевод, и в итоге отключается командой через месяц.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Объявляйте все поддерживаемые языки, но обязательными делайте только те, которые действительно критичны для релиза. Остальные локали наполняются асинхронно и не задерживают выпуск версий.

## Вынос переводов за пределы репозитория

Второй подход заключается в объявлении одного базового языка в коде и управлении остальными через CMS с Live Sync. Правки контента в таком случае не требуют пересборки проекта, отделяя работу редакторов от цикла релизов кода.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Это удобно командам, где текстами занимаются не-разработчики. Это осознанный компромисс: вы получаете независимость редакторов, но теряете гарантию того, что git-checkout полностью описывает состояние интерфейса. Подробнее в [документации по CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

Помните, что `clientSecret` является серверным секретом. Он должен храниться в переменных окружения сервера и CI, и ни при каких условиях не попадать в клиентский бандл.

## Реальные ограничения

Все описанное выше автоматизирует _покрытие_, а не _качество_. Автозаполнение превращает заметный пробел в незаметный: проверки проходят успешно, потому что у ключа есть значение, но текст никто не вычитывал.

Это допустимо для внутренних инструментов, списков изменений или бета-локалей. Это категорически недопустимо для тарифов, юридических документов, сообщений об ошибках оплаты и любых конверсионных экранов. Для таких разделов привлекайте людей и используйте `--mode complete`, чтобы нейросеть не перетерла проверенный текст.

Передавайте контекст модели для получения стабильных формулировок:

```ts
ai: {
  applicationContext: "B2B-приложение для выставления счетов. Официальный стиль. Никогда не переводить название продукта.",
}
```

## Распространенные ошибки

- **Отсутствие `[skip ci]` в автокоммите.** Пайплайн запускается по кругу до исчерпания лимитов.
- **Поверхностный клон при использовании `--git-diff`.** Нет базы для сравнения, ничего не заполняется и ошибок не возникает.
- **Перевод всего каталога при каждом прогоне.** Ограничивайте запуск флагами `--git-diff` или `--unpushed`.
- **Использование отчета CLI в качестве барьера.** Он завершается с кодом 0.
- **Требование обязательности всех локалей сразу.** Барьер отключают после первой же сорванной доставки релиза.
- **Пайплайн с автозаполнением, но без проверочного барьера.** Ничего не падает, и сырой машинный текст уходит клиентам.
- **API-ключи моделей в репозитории.** Они должны храниться только в секретах CI.

## Полезные материалы

- [CI/CD: автогенерация переводов с Husky, GitHub Actions и CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md)
- [Тестирование контента и блокировка сборки по покрытию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md)
- [autoFill: создание файлов деклараций для каждой локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md)
- [Справочник конфигурации: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [Отчеты производительности фреймворков](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md)
- [Адаптер совместимости с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/i18next.md)
- [Как находить недостающие переводы](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md)
- [Как тестировать переводы без хрупких тестов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_testing_strategies.md)
