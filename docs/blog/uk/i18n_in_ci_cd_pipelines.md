---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Автоматизація перекладів у CI/CD без випуску некоректних текстів"
description: Три точки для автоматизації i18n, pre-push, pull request та runtime. Як блокувати збірку за покриттям, безпечно автозаповнювати переклади та уникати нескінченного циклу комітів.
keywords:
  - автоматизація перекладів ci
  - i18n ci cd
  - github actions переклади
  - husky pre-push
  - безперервна локалізація
  - пайплайн перекладу
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Автоматизація перекладів у CI/CD без випуску некоректних текстів

Ручний переклад не витримує темпів сучасних релізів. Розробник додає рядок у п'ятницю, експорт відбувається лише в наступному спринті, і на той час ще три мови відстають від актуального стану. Автоматизувати це просто. Зробити це так, щоб ненароком не опублікувати сирий машинний переклад користувачам, ось що дійсно потребує уваги.

## Зміст

<TOC/>

## Для автоматизації не потрібно проводити міграцію

Наведені нижче схеми пайплайнів не залежать від бібліотеки, як і самі інструменти. Якщо ваші повідомлення зберігаються у JSON-каталогах для i18next, next-intl, react-intl, vue-i18n або next-translate, [плагін Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) читає та записує ці файли прямо на місці:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // або "icu" для next-intl / react-intl
    }),
  ],
};

export default config;
```

Ваш додаток продовжує імпортувати те, що імпортував раніше. Завдання CI потім заповнюють та перевіряють наявні каталоги, а різниця (diff), яку бачить рецензент, це звичайна зміна файлу `locales/fr/checkout.json`, а не складна міграція архітектури. Також є [плагін Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) для робочих процесів gettext та [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) для збереження незмінного runtime API.

## Розділяйте блокувальний бар'єр (gate) та заповнення (fill)

Два абсолютно різні завдання постійно плутають між собою.

**Бар'єр (gate)** — це перевірка, яка зупиняє процес із помилкою. Вона визначає, що збірка не повинна потрапити в реліз через відсутність обов'язкових локалей. Вона нічого не записує у файли.

**Заповнення (fill)** — це операція мутації даних. Вона генерує відсутні переклади та фіксує їх комітом. Вона ніколи не ламає збірку.

Запуск лише fill означає, що ніщо ніколи не блокується, і непрорецензований машинний текст потрапляє в продакшен. Запуск лише gate означає, що збірка постійно стає червоною і людині щоразу доводиться вручну втручатися. Більшості команд потрібні обидва інструменти, прив'язані до різних тригерів: fill при відкритті pull request, gate при злитті в релізну гілку.

## Де розміщувати автоматизацію

| Етап          | Тригер    | Для чого підходить                        | Вартість                                      |
| :------------ | :-------- | :---------------------------------------- | :-------------------------------------------- |
| Pre-push хук  | Git local | Швидкий зворотний зв'язок, нуль хвилин CI | Працює на машині розробника з його API-ключем |
| Pull request  | CI job    | Перевірка перед злиттям, безпечні секрети | Хвилини CI плюс виклики моделей на кожен PR   |
| Релізна гілка | CI job    | Суворий бар'єр за покриттям               | Недорого, без викликів моделей                |
| Runtime       | CMS       | Зміни контенту без повторної збірки       | Залежність від зовнішнього хостингу           |

## Pre-push: найшвидший цикл

Husky запускає заповнення до того, як код залишить локальну машину, тому переклади потрапляють у той самий пуш, що й рядки, які їх потребували.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` обмежує роботу контентом, який ще не було відправлено, що запобігає затримкам під час кожного пушу. `--mode complete` заповнює лише те, чого не вистачає, не перезаписуючи записи, які вже мають значення, захищаючи вичитані переклади від випадкової заміни.

Для монорепозиторію вказуйте межі кожного додатку:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

Недолік очевидний: кожному розробнику потрібен API-ключ, а витрати лягають на того, хто робить пуш. Тому зі зростанням команди більшість переносить цей етап у CI.

## Pull request: заповнення там, де відбувається код-рев'ю

Та сама робота в GitHub Actions, обмежена лише diff:

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

Чотири моменти тут є ключовими:

- **`fetch-depth: 0`** обов'язковий для коректної роботи `--git-diff`. Неглибокий клон (shallow clone) не має базової гілки для обчислення diff, і заповнення без попереджень нічого не зробить.
- **`[skip ci]` у повідомленні коміту** запобігає нескінченному перезапуску воркфлоу. Без нього коміт запускає нове виконання, яке комітить знову, спалюючи ліміти CI за ніч.
- **`concurrency` із `cancel-in-progress`** блокує одночасні пуші від конфліктів під час запису тих самих файлів.
- **`--git-diff`** обмежує операцію лише змінами в PR. Якщо пропустити цей прапорець, весь каталог перекладатиметься наново під час кожного запуску.

Переклади фіксуються комітом у гілці PR, що дозволяє рецензенту побачити їх у diff. У цьому полягає сенс виконання процедури на етапі PR, а не після злиття.

## Релізна гілка: бар'єр (gate)

Бар'єр не потребує звернення до моделей штучного інтелекту і повинен працювати швидко.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Підкріплений тестом, що перевіряє покриття за допомогою assertion, а не простим звітом у консоль:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Команда `npx intlayer content test` друкує звіт, але повертає код виходу 0, тому вона лише інформує, не блокуючи збірку. Використовуйте її локально, а в CI запускайте перевірку через assertion. Більше деталей у статті [як виявляти відсутні переклади](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/detecting_missing_translations.md).

## `requiredLocales` робить перевірку життєздатною

Бар'єр, що вимагає стовідсоткової повноти всіх вісімнадцяти мов, блокує кожен реліз доти, доки не буде готова найповільніша мова, і врешті-решт вимикається командою протягом місяця.

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

Оголошуйте всі підтримувані локалі, але обов'язковими для блокування релізу позначайте лише критичні. Решта заповнюється асинхронно та не затримує процес розгортання.

## Повний виніс перекладів за межі репозиторію

Інший підхід полягає в оголошенні однієї базової мови в коді та дистанційному керуванні рештою через CMS із підтримкою Live Sync. Зміни контенту в такому разі взагалі не потребують повторної збірки, що відокремлює темп редагування текстів від циклу випуску коду.

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

Це чудово підходить командам, де текстами займаються не-розробники. Це компроміс: ви отримуєте свободу редагування, але втрачаєте властивість, за якої стан git checkout повністю визначає відображення додатка. Детальніше в [документації до CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

Зверніть увагу, що `clientSecret` є конфіденційним сервером ключем. Його місце виключно в секретах CI та змінних середовища сервера, він ніколи не повинен потрапляти в клієнтські бандли.

## Реальні обмеження

Усе вищезазначене автоматизує _покриття_, а не _якість_. Автозаповнення перетворює помітну прогалину на непомітну: аудит стає зеленим, тому що ключ отримав значення, але ніхто з людей його не вичитував.

Це прийнятно для внутрішніх інструментів, списків змін або бета-локалей. Це неприпустимо для тарифів, юридичних документів, повідомлень про помилки оплати чи важливих текстів, які користувач читає перед прийняттям рішень. Спрямовуйте такі матеріали через рецензування людиною і завжди використовуйте `--mode complete`, щоб перевірені рядки не були випадково перезаписані.

Надавайте моделі контекст для досягнення стабільного результату:

```ts
ai: {
  applicationContext: "B2B-додаток для виставлення рахунків. Офіційний стиль. Ніколи не перекладати назву продукту.",
}
```

## Поширені помилки

- **Відсутність `[skip ci]` в автокоміті.** Пайплайн перезапускається по колу, вичерпуючи ресурси.
- **Неглибокий клон з `--git-diff`.** Немає бази для порівняння diff, нічого не заповнюється і жодних помилок не виникає.
- **Переклад усього каталогу щоразу.** Обмежуйте запуск прапорцями `--git-diff` або `--unpushed`.
- **Використання звіту CLI як блокувального бар'єра.** Команда завершується з кодом 0.
- **Обов'язковість кожної локалі.** Бар'єр скасовують після першого ж зірваного деплою.
- **Запуск заповнення без жодного перевірочного бар'єра.** Нічого не ламається, і непротестований машинний текст йде клієнтам.
- **Збереження ключів API моделі в репозиторії.** Вони повинні зберігатися виключно в секретах CI, як і `clientSecret`.

## Корисні матеріали

- [CI/CD: автоматична генерація перекладів з Husky, GitHub Actions та CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md)
- [Тестування контенту та блокування збірки за покриттям](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md)
- [autoFill: створення файлів декларацій для кожної локалі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md)
- [Довідник конфігурації: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [Звіти про продуктивність між різними фреймворками](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md)
- [Адаптер сумісності з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/i18next.md)
- [Як виявляти відсутні переклади](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/detecting_missing_translations.md)
- [Як тестувати переклади без створення крихких тестів](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_testing_strategies.md)
