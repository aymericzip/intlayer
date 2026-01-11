---
createdAt: 2025-01-02
updatedAt: 2025-11-06
title: Як автоматизувати JSON-переклади next-intl за допомогою Intlayer
description: Автоматизуйте ваші JSON-переклади за допомогою Intlayer і next-intl для покращеної інтернаціоналізації у застосунках Next.js.
keywords:
  - Intlayer
  - next-intl
  - Інтернаціоналізація
  - Блог
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.7
    date: 2025-11-06
    changes: Додано документацію про підтримку AI-провайдера
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано плагін loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Перехід на плагін syncJSON
---

# Як автоматизувати JSON-переклади next-intl за допомогою Intlayer

<iframe title="Як автоматизувати JSON-переклади next-intl за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

# Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна open-source бібліотека для інтернаціоналізації, створена щоб вирішити обмеження традиційних i18n-рішень. Вона пропонує сучасний підхід до управління контентом у додатках Next.js.

Перегляньте конкретне порівняння з next-intl у нашому дописі в блозі [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md).

## Чому поєднувати Intlayer з next-intl?

Intlayer пропонує широкий набір **розширених можливостей**, які виходять за межі традиційних інструментів i18n. Він допомагає вам:

- **Автоматично визначати й заповнювати відсутні переклади** для спрощення локалізації.
- **Тестувати й перевіряти ваші переклади** безпосередньо в робочих процесах розробки або CI/CD.
- **Керувати контентом на рівні компонентів**, що забезпечує чисту, масштабовану та зручну для підтримки структуру в додатку.
- **Виносити контент зовні**, роблячи його зручним для редагування всією командою (розробники, перекладачі та контент-менеджери).

Однак **next-intl** залишається відмінним і широко поширеним рішенням для i18n завдяки своїй **зрілій екосистемі**, **широкій підтримці спільноти** та **великий сумісності з плагінами**.

Поєднавши **Intlayer** з **next-intl**, ви отримуєте найкраще з обох світів — стабільність і зрілість екосистеми next-intl разом із сучасним управлінням контентом, автоматизацією та покращенням developer experience від Intlayer.

Цей посібник пояснює, як використовувати Intlayer як **адаптер для next-intl**, що дозволяє вам:

- Поступово мігрувати з next-intl на Intlayer.
- Зберігати існуючі плагіни та робочі процеси next-intl.
- Автоматизувати ваші JSON-переклади в CLI або конвеєрах CI/CD.
- Тестувати, синхронізувати та ефективніше керувати перекладами.

## Зміст

<TOC/>

## Крок за кроком: налаштування Intlayer з next-intl

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Опис пакетів:**

- **intlayer**: Основна бібліотека для управління інтернаціоналізацією, декларації контенту та побудови
- **@intlayer/sync-json-plugin**: Плагін для експорту декларацій контенту Intlayer у JSON-формат, сумісний з next-intl

### Крок 2: Реалізуйте плагін Intlayer для обгортання JSON

Створіть конфігураційний файл Intlayer, щоб визначити ваші підтримувані локалі:

**Якщо ви також хочете експортувати JSON-словники для next-intl**, додайте плагін `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагін `syncJSON` автоматично обгортає JSON. Він читатиме та записуватиме JSON-файли, не змінюючи архітектуру вмісту.

Якщо ви хочете співіснування цих JSON разом із файлами декларації вмісту Intlayer (`.content` файли), Intlayer працюватиме таким чином:

    1. завантажити як JSON, так і файли декларації вмісту та перетворити їх на словник Intlayer.
    2. якщо існують конфлікти між JSON і файлами декларації вмісту, Intlayer виконає злиття всіх цих словників. Це залежатиме від пріоритету плагінів і пріоритету файлу декларації вмісту (усе можна налаштувати).

Якщо зміни внесені через CLI для перекладу JSON або через CMS, Intlayer оновить JSON-файл новими перекладами.

Щоб дізнатися більше про плагін `syncJSON`, будь ласка, зверніться до [документації плагіна syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

### Крок 4: Налаштування AI-провайдера

Intlayer відкриває набір розширених автоматизаційних та зручних для розробника можливостей для вашого i18next workflow.

- **Автоматичне виявлення та заповнення відсутніх перекладів**: Intlayer сканує ваші JSON-словники, знаходить неперекладені або відсутні ключі й перекладає лише їх, тож 99% вашого JSON залишається незмінним.
- **Переклад чанками для великих JSON-файлів**: коли ваші файли перекладів дуже великі, Intlayer автоматично розбиває обробку на керовані частини (chunks), перекладаючи їх окремо, щоб уникнути обмежень API та проблем із пам'яттю.
- **Паралелізація неймспейсів**: Якщо у вас сотні неймспейсів (або файлів), Intlayer паралелізує завдання перекладу, ефективно пришвидшуючи ваші CI/CD або масові операції перекладу.
- **Гнучка підтримка AI-провайдерів**: Оберіть бажаного AI-провайдера (наприклад, OpenAI, Claude, Gemini), просто налаштувавши облікові дані. Використовуйте власний API-ключ і за потреби змінюйте провайдерів.
- **Надійна обробка відповідей AI**: Intlayer може обробляти крайові випадки, коли ваш AI-провайдер повертає текст або як рядок, або як об'єкт, навіть автоматично повторюючи запит, якщо формат непослідовний.
- **Готово для CLI та CI/CD**: Запускайте перевірки Intlayer і автоматичне заповнення безпосередньо у ваших тестах або pipelines, роблячи процес локалізації надійним і автоматизованим.
- **Інтегрується поверх вашої існуючої конфігурації**: Вам не потрібно змінювати вашу основу i18next або Next.js. Intlayer працює як додатковий плагін до вашої поточної конфігурації, надаючи всі ці переваги з мінімальною міграцією.

Ось приклад налаштування AI-провайдера:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Тоді ви можете виконати наступну команду, щоб заповнити ваші переклади:

```bash
npx intlayer fill
```

Це заповнить ваші переклади за допомогою AI-провайдера, якого ви налаштували.

> Див. усіх доступних AI-провайдерів у [документації конфігурації AI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#ai-configuration).
> Див. усі доступні команди в [документації Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

---

## Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

Ці файли можуть бути згенеровані під час процесу збірки й їх не потрібно додавати до системи контролю версій.

### Розширення для VS Code

Для покращення досвіду розробника встановіть офіційне **Intlayer VS Code Extension**:

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
