---
createdAt: 2024-12-24
updatedAt: 2025-11-06
title: Як автоматизувати JSON-переклади i18next за допомогою Intlayer
description: Автоматизуйте ваші JSON-переклади за допомогою Intlayer та i18next для покращеної інтернаціоналізації в JavaScript-додатках.
keywords:
  - Intlayer
  - i18next
  - Інтернаціоналізація
  - i18n
  - Локалізація
  - Переклад
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Міграція
  - Інтеграція
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Додано підтримку формату i18next
  - version: 7.0.7
    date: 2025-11-06
    changes: Додано документацію щодо підтримки AI-провайдера
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано плагін loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Change to syncJSON plugin
---

# Як автоматизувати ваші JSON-переклади i18next за допомогою Intlayer

<iframe title="Як автоматизувати ваші JSON-переклади i18next за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна open-source бібліотека для інтернаціоналізації, створена для вирішення недоліків традиційних i18n-рішень. Вона пропонує сучасний підхід до керування контентом у JavaScript-додатках.

Дивіться конкретне порівняння з i18next у нашому дописі в блозі «next-i18next vs. next-intl vs. Intlayer»: https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md

## Чому поєднувати Intlayer з i18next?

Хоча Intlayer пропонує відмінне автономне i18n-рішення (див. наш посібник з інтеграції Next.js: https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md), ви можете захотіти поєднати його з i18next з кількох причин.

Intlayer пропонує широкий набір розширених функцій, що виходять за межі традиційних i18n-інструментів. Він допомагає вам:

- **Автоматично виявляти та заповнювати відсутні переклади**, щоб спростити локалізацію.
- **Тестувати та перевіряти ваші переклади** безпосередньо у ваших робочих процесах розробки або CI/CD.
- **Керувати контентом на рівні компонентів**, що дозволяє отримати чисту, масштабовану та легку в підтримці структуру в усьому вашому додатку.
- **Виносити контент за межі коду**, роблячи його простим для редагування всією вашою командою (розробники, перекладачі та контент-менеджери).

Однак, **i18next** залишається відмінним і широко застосовуваним рішенням для i18n завдяки своїй **дозрілій екосистемі**, **широкій підтримці спільноти** та **широкій сумісності з плагінами**.

Поєднавши **Intlayer** з **i18next**, ви отримуєте найкраще з обох світів — стабільність і зрілість екосистеми i18next разом із сучасним керуванням контентом, автоматизацією та покращенням developer experience від Intlayer.

Цей посібник пояснює, як використовувати Intlayer як **адаптер для i18next**, що дозволяє вам:

- Поступово мігрувати з i18next на Intlayer.
- Зберігайте існуючі плагіни та робочі процеси i18next.
- Автоматизуйте ваші JSON-переклади у CLI або в CI/CD конвеєрах.
- Тестуйте, синхронізуйте та керуйте перекладами ефективніше.

## Зміст

<TOC/>

## Покроковий посібник із налаштування Intlayer з i18next

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

- **intlayer**: Базова бібліотека для управління інтернаціоналізацією, декларації контенту та побудови
- **@intlayer/sync-json-plugin**: Плагін для експорту декларацій контенту Intlayer у формат JSON, сумісний з i18next

### Крок 2: Реалізуйте плагін Intlayer для обгортання JSON

Створіть файл конфігурації Intlayer, щоб визначити підтримувані локалі:

**Якщо ви також хочете експортувати JSON-словники для i18next**, додайте плагін `syncJSON`:

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагін `syncJSON` автоматично обгортає JSON. Він читає та записує JSON-файли, не змінюючи архітектуру їхнього вмісту.

Якщо ви хочете, щоб ці JSON-файли співіснували з файлами декларацій контенту Intlayer (`.content` файли), Intlayer оброблятиме їх таким чином:

    1. завантажить як JSON, так і файли декларацій контенту і перетворить їх на словник Intlayer.
    2. якщо виникають конфлікти між JSON та файлами декларацій контенту, Intlayer виконає злиття всіх словників. Результат залежатиме від пріоритету плагінів і пріоритету файлів декларацій контенту (усі параметри можна налаштувати).

Якщо зміни вносяться за допомогою CLI для перекладу JSON або через CMS, Intlayer оновить JSON-файл з новими перекладами.

Щоб дізнатися більше про плагін `syncJSON`, див. [документацію плагіна syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

### Крок 4: Налаштування AI-провайдера

Intlayer надає набір просунутих автоматизаційних та дружніх до розробника функцій для вашого робочого процесу i18next.

- **Автоматичне виявлення та заповнення відсутніх перекладів**: Intlayer сканує ваші JSON-словники, знаходить неперекладені або відсутні ключі і перекладає лише їх, тож 99% вашого JSON залишається незмінним.
- **Поблочний переклад великих JSON-файлів**: Коли ваші файли перекладу дуже великі, Intlayer автоматично розбиває обробку на керовані блоки, перекладаючи їх незалежно, щоб уникнути обмежень API та проблем з пам’яттю.
- **Паралелізація просторів імен (namespaces)**: Якщо у вас сотні просторів імен (або файлів), Intlayer паралелізує задачі перекладу, ефективно прискорюючи ваші CI/CD або масові операції перекладу.
- **Гнучка підтримка AI-провайдерів**: Обирайте улюбленого AI-провайдера (наприклад, OpenAI, Claude, Gemini), просто налаштувавши облікові дані. Використовуйте власний API-ключ і за потреби перемикайте провайдерів.
- **Стійка обробка відповідей AI**: Intlayer може обробляти крайові випадки, коли ваш AI-провайдер повертає текст або як рядок, або як об’єкт, навіть автоматично повторюючи спроби, якщо формат є непослідовним.
- Готовий для CLI та CI/CD: запускайте перевірки Intlayer і автозаповнення безпосередньо у ваших тестах або пайплайнах, роблячи процес локалізації надійним та автоматизованим.
- Інтегрується поверх наявної конфігурації: вам не потрібно змінювати i18next або основу Next.js. Intlayer працює як додатковий плагін до вашої поточної установки, надаючи всі ці переваги з мінімальною міграцією.

Ось приклад того, як налаштувати AI-провайдера:

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
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Потім ви можете виконати наступну команду, щоб заповнити переклади:

```bash
npx intlayer fill
```

Це заповнить ваші переклади за допомогою AI-провайдера, якого ви налаштували.

> Перегляньте всіх доступних AI-провайдерів у [документації з конфігурації Intlayer AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#ai-configuration).
> Перегляньте всі доступні команди в [документації Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

---

## Налаштування Git

Рекомендується ігнорувати автоматично згенеровані файли Intlayer:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

Ці файли можуть бути повторно згенеровані під час збірки і їх не потрібно додавати до системи контролю версій.

### Розширення для VS Code

Для покращення досвіду розробника встановіть офіційне **Intlayer VS Code Extension**:

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
