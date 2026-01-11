---
createdAt: 2025-01-02
updatedAt: 2025-11-06
title: Як автоматизувати JSON-переклади react-intl за допомогою Intlayer
description: Автоматизуйте свої JSON-переклади за допомогою Intlayer та react-intl для покращеної інтернаціоналізації в React-додатках.
keywords:
  - react-intl
  - Intlayer
  - Internationalization
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.7
    date: 2025-11-06
    changes: Додано документацію щодо підтримки AI-провайдера
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано плагін loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Змінено на плагін syncJSON
---

# Як автоматизувати JSON-переклади react-intl за допомогою Intlayer

<iframe title="Як автоматизувати JSON-переклади react-intl за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна відкрита бібліотека для інтернаціоналізації, створена щоб усунути недоліки традиційних i18n-рішень. Вона пропонує сучасний підхід до управління контентом у React-застосунках.

Перегляньте конкретне порівняння з react-intl у нашому дописі в блозі [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/react-i18next_vs_react-intl_vs_intlayer.md).

## Чому поєднувати Intlayer з react-intl?

Хоча Intlayer надає відмінне самостійне рішення для i18n (див. наш [керівництво з інтеграції з React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)), ви можете захотіти поєднати його з react-intl з кількох причин:

Intlayer пропонує багатий набір **розширених функцій**, що виходять за межі традиційних i18n-інструментів. Він допомагає вам:

- **Автоматично виявляти та заповнювати відсутні переклади**, щоб спростити локалізацію.
- **Тестувати та перевіряти ваші переклади** безпосередньо у ваших робочих процесах розробки або CI/CD.
- **Керуйте контентом на рівні компонентів**, що забезпечує чисту, масштабовану та підтримувану структуру всього вашого додатку.
- **Виносьте контент зовні**, щоб його могли легко редагувати вся ваша команда (розробники, перекладачі та контент-менеджери).

Проте **react-intl** залишається відмінним і широко використовуваним рішенням для i18n завдяки своїй **зрілій екосистемі**, **широкій підтримці спільноти** та **великій сумісності з плагінами**.

Комбінуючи **Intlayer** з **react-intl**, ви отримуєте найкраще з обох світів — стабільність і зрілість екосистеми react-intl разом із сучасним управлінням контентом, автоматизацією та покращенням developer experience від Intlayer.

У цьому посібнику пояснюється, як використовувати Intlayer як **адаптер для react-intl**, що дозволяє вам:

- Поступово мігрувати з react-intl на Intlayer.
- Зберігайте існуючі плагіни та робочі процеси react-intl.
- Автоматизуйте свої JSON-переклади в CLI або CI/CD конвеєрах.
- Тестуйте, синхронізуйте та ефективніше керуйте перекладами.

## Покроковий посібник з налаштування Intlayer з react-intl

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

- **intlayer**: Ядро бібліотеки для управління інтернаціоналізацією, декларації контенту та збірки
- **@intlayer/sync-json-plugin**: Плагін для експорту декларацій контенту Intlayer у формат JSON, сумісний з react-intl

### Крок 2: Реалізація плагіна Intlayer для обгортання JSON

Створіть файл конфігурації Intlayer, щоб визначити підтримувані локалі:

**Якщо ви також хочете експортувати JSON-словники для react-intl**, додайте плагін `syncJSON`:

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагін `syncJSON` автоматично обгортає JSON. Він читатиме та записуватиме JSON-файли, не змінюючи архітектуру вмісту.

Якщо ви хочете, щоб ці JSON-файли співіснували з деклараційними файлами Intlayer (`.content` files), Intlayer виконає це таким чином:

    1. завантажить як JSON-файли, так і файли декларацій вмісту та перетворить їх на словник Intlayer.
    2. якщо виникнуть конфлікти між JSON та файлами декларацій вмісту, Intlayer виконає злиття всіх цих словників. Порядок злиття залежатиме від пріоритету плагінів та пріоритету файлу декларації вмісту (усі параметри конфігуровані).

Якщо зміни вносяться за допомогою CLI для перекладу JSON або через CMS, Intlayer оновить JSON-файл новими перекладами.

Щоб дізнатися більше про плагін `syncJSON`, будь ласка, перегляньте [документацію плагіна `syncJSON`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

### Крок 4: Налаштування AI-провайдера

Intlayer відкриває набір розширених можливостей автоматизації та дружніх до розробників функцій для вашого робочого процесу i18next.

- **Автоматичне виявлення та заповнення відсутніх перекладів**: Intlayer сканує ваші JSON-словники, знаходить неперекладені або відсутні ключі та перекладає лише їх, тож 99% вашого JSON залишається незмінним.
- **Переклад по частинах (chunked) для великих JSON-файлів**: Коли ваші файли перекладу дуже великі, Intlayer автоматично розбиває обробку на керовані частини, перекладаючи їх окремо, щоб уникнути обмежень API та проблем з пам'яттю.
- **Паралелізація namespace**: Якщо у вас сотні namespaces (або файлів), Intlayer паралелізує завдання перекладу, ефективно прискорюючи ваші CI/CD або масові операції перекладу.
- **Гнучка підтримка AI-провайдерів**: Обирайте бажаного AI-провайдера (наприклад, OpenAI, Claude, Gemini), просто налаштувавши облікові дані. Використовуйте свій API-ключ і перемикайте провайдерів за потреби.
- **Надійна обробка відповідей AI**: Intlayer вміє обробляти крайні випадки, коли провайдер AI повертає текст як рядок або як об'єкт, і навіть автоматично повторює запити, якщо формат є непослідовним.
- **Готово для CLI та CI/CD**: Запускайте перевірки Intlayer та автоматичне заповнення безпосередньо у ваших тестах або пайплайнах, роблячи процес локалізації надійним та автоматизованим.
- **Інтегрується поверх вашої існуючої конфігурації**: Вам не потрібно змінювати i18next або Next.js. Intlayer працює як плагін-додаток до вашої поточної конфігурації, надаючи всі ці переваги з мінімальною міграцією.

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

Потім ви можете виконати наступну команду, щоб заповнити ваші переклади:

```bash
npx intlayer fill
```

Це заповнить ваші переклади за допомогою AI-провайдера, якого ви налаштували.

> Перегляньте всі доступні AI-провайдери в [документації конфігурації Intlayer AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#ai-configuration).
> Перегляньте всі доступні команди в [документації Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

---

## Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

Ці файли можуть бути перегенеровані під час процесу збірки і їх не потрібно комітити у систему контролю версій.

### Розширення VS Code

Для покращення досвіду розробника встановіть офіційне **розширення Intlayer для VS Code**:

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
