---
createdAt: 2025-01-02
updatedAt: 2025-11-06
title: Як автоматизувати ваші JSON-переклади для react-i18next за допомогою Intlayer
description: Автоматизуйте свої JSON-переклади за допомогою Intlayer та react-i18next для покращеної інтернаціоналізації у React-додатках.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Інтернаціоналізація
  - i18n
  - Блог
  - React
  - JavaScript
  - TypeScript
  - Управління контентом
slugs:
  - blog
  - intlayer-with-react-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.7
    date: 2025-11-06
    changes: Додано документацію щодо підтримки AI-провайдерів
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано плагін loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Перехід на плагін syncJSON
---

# Як автоматизувати JSON-переклади react-i18next за допомогою Intlayer

<iframe title="Як автоматизувати JSON-переклади react-i18next за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Що таке Intlayer?

**Intlayer** — інноваційна відкрита бібліотека для інтернаціоналізації, створена для вирішення недоліків традиційних i18n-рішень. Вона пропонує сучасний підхід до управління контентом в React-додатках.

Дивіться конкретне порівняння з react-i18next у нашому дописі в блозі [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/react-i18next_vs_react-intl_vs_intlayer.md).

## Чому варто поєднувати Intlayer з react-i18next?

Хоча Intlayer забезпечує відмінне самостійне рішення для i18n (див. наше [керівництво з інтеграції з React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)), ви можете захотіти поєднати його з react-i18next з кількох причин.

Intlayer пропонує широкий набір **просунутих функцій**, які виходять за межі традиційних i18n-інструментів. Воно допомагає вам:

- **Автоматично виявляти та заповнювати відсутні переклади**, щоб спростити локалізацію.
- **Тестуйте та перевіряйте свої переклади** безпосередньо у своїх робочих процесах розробки або CI/CD.
- **Керуйте контентом на рівні компонентів**, що дозволяє мати чисту, масштабовану та підтримувану структуру по всьому застосунку.
- **Винесіть контент назовні**, щоб його могли легко редагувати вся команда (розробники, перекладачі та контент-менеджери).

Однак **i18next** залишається відмінним і широко використовуваним рішенням для i18n завдяки своїй **зрілої екосистемі**, **широкій підтримці спільноти** та **широкій сумісності з плагінами**.

Поєднавши **Intlayer** з **i18next**, ви отримаєте найкраще з обох світів — стабільність та зрілість екосистеми i18next разом із сучасним content management, automation та покращеним developer experience від Intlayer.

Цей посібник пояснює, як використовувати Intlayer як **адаптер для i18next**, що дозволяє вам:

- Поступово переходити з i18next на Intlayer.
- Зберегти існуючі плагіни та робочі процеси i18next.
- Автоматизувати ваші JSON-переклади в CLI або в конвеєрах CI/CD.
- Ефективніше тестувати, синхронізувати та керувати перекладами.

## Зміст

<TOC/>

## Покроковий посібник із налаштування Intlayer з react-i18next

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

- **intlayer**: Базова бібліотека для керування інтернаціоналізацією, декларації контенту та збірки
- **@intlayer/sync-json-plugin**: Плагін для експорту декларацій контенту Intlayer у JSON-формат, сумісний з react-i18next

### Крок 2: Реалізуйте плагін Intlayer для обгортання JSON

Створіть файл конфігурації Intlayer, щоб визначити підтримувані локалі:

**Якщо ви також хочете експортувати JSON-словники для react-i18next**, додайте плагін `syncJSON`:

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

Плагін `syncJSON` автоматично обгортатиме JSON. Він читатиме та записуватиме JSON-файли, не змінюючи архітектуру вмісту.

Якщо ви хочете, щоб цей JSON співіснував із файлами декларації вмісту Intlayer (`.content` файли), Intlayer виконуватиме наступні кроки:

    1. завантажити як JSON-файли, так і файли декларації вмісту та перетворити їх на словник Intlayer.
    2. якщо виникнуть конфлікти між JSON та файлами декларації контенту, Intlayer виконає злиття всіх словників. Порядок злиття залежатиме від пріоритету плагінів та пріоритету файлу декларації контенту (усі ці параметри конфігуруються).

Якщо зміни вносяться через CLI для перекладу JSON або через CMS, Intlayer оновить JSON-файл новими перекладами.

Щоб дізнатися більше про плагін `syncJSON`, будь ласка, див. [документацію плагіна syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

### Крок 4: Налаштування AI-провайдера

Intlayer відкриває набір просунутих автоматизацій і функцій, орієнтованих на розробника, для вашого i18next workflow.

- **Автоматичне виявлення та заповнення відсутніх перекладів**: Intlayer сканує ваші JSON-словники, знаходить неперекладені або відсутні ключі та перекладає лише їх, тож 99% вашого JSON залишається незмінним.
- **Чанкований переклад для великих JSON-файлів**: Коли ваші файли перекладу дуже великі, Intlayer автоматично розбиває обробку на керовані частини (chunks), перекладаючи їх незалежно, щоб уникнути обмежень API та проблем з пам'яттю.
- **Паралелізація namespace-ів**: Якщо у вас сотні namespace-ів (або файлів), Intlayer паралелізує завдання перекладу, ефективно пришвидшуючи ваші CI/CD або масові операції перекладу.
- **Гнучка підтримка постачальників AI**: Вибирайте бажаного постачальника AI (наприклад, OpenAI, Claude, Gemini), просто налаштувавши облікові дані. Використовуйте власний API-ключ і перемикайте постачальників за потреби.
- **Надійна обробка відповідей AI**: Intlayer може обробляти крайові випадки, коли ваш постачальник AI повертає текст або як рядок, або як об'єкт, навіть автоматично повторюючи запит, якщо формат непослідовний.
- **Готово до CLI та CI/CD**: Виконуйте перевірки Intlayer і автоматичне заповнення безпосередньо в тестах або пайплайнах, роблячи процес локалізації надійним та автоматизованим.
- **Інтегрується поверх вашої існуючої конфігурації**: Не потрібно змінювати вашу основу на i18next або Next.js. Intlayer працює як додатковий плагін до вашої поточної конфігурації, надаючи всі ці переваги з мінімальною міграцією.

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

Потім ви можете виконати наступну команду, щоб заповнити ваші переклади:

```bash
npx intlayer fill
```

Це заповнить ваші переклади за допомогою AI-провайдера, якого ви налаштували.

> Перегляньте всі доступні AI-провайдери в [документації конфігурації Intlayer AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#ai-configuration).
> Перегляньте всі доступні команди в [документації CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

## Налаштування Git

Рекомендується ігнорувати автоматично згенеровані файли Intlayer:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

Ці файли можуть бути відновлені під час процесу збірки й їх не потрібно додавати до системи контролю версій.

### Розширення для VS Code

Для покращення досвіду розробника встановіть офіційне **Intlayer VS Code Extension**:

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
