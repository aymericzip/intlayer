---
createdAt: 2025-08-23
updatedAt: 2025-11-06
title: Intlayer та next-i18next
description: Інтегруйте Intlayer з next-i18next для комплексного рішення інтернаціоналізації в Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Інтернаціоналізація
  - Блог
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.7
    date: 2025-11-06
    changes: Додано документацію про підтримку AI-провайдерів
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано плагін loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Заміна на плагін syncJSON та повний перепис
---

# Як автоматизувати JSON-переклади next-i18next за допомогою Intlayer

<iframe title="Як автоматизувати JSON-переклади next-i18next за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна open-source бібліотека для інтернаціоналізації, створена для усунення недоліків традиційних i18n-рішень. Вона пропонує сучасний підхід до управління контентом у додатках Next.js.

Перегляньте конкретне порівняння з next-intl у нашому дописі в блозі [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md).

## Чому поєднувати Intlayer з next-i18next?

Хоча **Intlayer** є відмінним самостійним i18n-рішенням (див. наш [гайд по інтеграції з Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)), ви можете захотіти поєднати його з next-i18next з кількох причин:

Intlayer пропонує широкий набір **розширених можливостей**, що виходять за рамки традиційних i18n-інструментів. Воно допомагає вам:

- **Автоматично виявляти та заповнювати відсутні переклади**, щоб спростити локалізацію.
- **Тестувати та валідувати ваші переклади** безпосередньо у ваших workflow для розробки або CI/CD.
- **Керуйте контентом на рівні компонентів**, що забезпечує чисту, масштабовану та підтримувану структуру в усьому вашому додатку.
- **Виносьте контент зовні**, роблячи його легко редагованим для всієї вашої команди (розробників, перекладачів та контент-менеджерів).

Однак **i18next** залишається відмінним та широко застосовуваним рішенням для i18n завдяки своїй **зрілій екосистемі**, **широкій підтримці спільноти** та **великій сумісності з плагінами**.

Поєднавши **Intlayer** з **i18next**, ви отримуєте найкраще з обох світів — стабільність та зрілість екосистеми i18next разом із сучасним керуванням контентом, автоматизацією та покращеним досвідом розробника від Intlayer.

Цей посібник пояснює, як використовувати Intlayer як **адаптер для i18next**, що дозволяє вам:

- Поступово мігрувати з i18next на Intlayer.
- Зберігайте наявні плагіни та робочі процеси i18next.
- Автоматизуйте переклади JSON через CLI або CI/CD конвеєри.
- Тестуйте, синхронізуйте та керуйте перекладами ефективніше.

---

## Покроковий посібник із налаштування Intlayer з next-i18next

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети, використовуючи ваш улюблений пакетний менеджер:

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

**Пояснення пакетів:**

- **intlayer**: Основна бібліотека для декларації та управління контентом
- **@intlayer/sync-json-plugin**: Плагін для синхронізації декларацій контенту Intlayer у формат JSON для i18next

### Крок 2: Реалізація плагіна Intlayer для обгортання JSON

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагін `syncJSON` автоматично обгортає JSON. Він читає та записує JSON-файли без зміни архітектури контенту.

Якщо ви хочете, щоб ці JSON-файли співіснували з файлами декларації контенту Intlayer (`.content` файли), Intlayer працюватиме таким чином:

    1. завантажити як JSON-файли, так і файли декларації контенту й перетворити їх на словник Intlayer.
    2. якщо виникають конфлікти між JSON та файлами декларації контенту, Intlayer виконає злиття всіх словників. Результат залежить від пріоритету плагінів та пріоритету файлу декларації контенту — обидва параметри конфігуровані.

Якщо зміни вносяться за допомогою CLI для перекладу JSON або через CMS, Intlayer оновить JSON-файл новими перекладами.

Щоб дізнатися більше про плагін `syncJSON`, див. [документацію плагіна syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

### Крок 4: Налаштування AI-провайдера

Intlayer відкриває набір розширених автоматизацій та зручних для розробника функцій для вашого робочого процесу i18next.

- **Автоматичне виявлення та заповнення відсутніх перекладів**: Intlayer сканує ваші JSON-словники, знаходить неперекладені або відсутні ключі й перекладає лише їх, тож 99% вашого JSON залишається незмінним.
- **Порційний (chunked) переклад для великих JSON-файлів**: Коли ваші файли перекладу дуже великі, Intlayer автоматично розбиває обробку на керовані порції, перекладаючи їх незалежно, щоб уникнути лімітів API та проблем із пам'яттю.
- **Паралелізація namespace-ів**: Якщо у вас сотні namespace-ів (або файлів), Intlayer паралелізує задачі перекладу, ефективно прискорюючи ваші CI/CD або масові операції перекладу.
- **Гнучка підтримка AI-провайдерів**: Оберіть бажаного AI-провайдера (наприклад, OpenAI, Claude, Gemini), просто налаштувавши облікові дані. Використовуйте власний API-ключ і перемикайте провайдерів за потреби.
- **Стійка обробка відповідей AI**: Intlayer вміє обробляти крайові випадки, коли ваш AI-провайдер повертає текст або як рядок, або як об'єкт, навіть автоматично повторюючи запит, якщо формат непослідовний.
- **Готовий для CLI та CI/CD**: Запускайте перевірки Intlayer та автоматичне заповнення безпосередньо у ваших тестах або пайплайнах, роблячи процес локалізації надійним та автоматизованим.
- **Інтегрується поверх вашої існуючої конфігурації**: Вам не потрібно змінювати ваш i18next або Next.js фундамент. Intlayer працює як додатковий плагін до вашої поточної конфігурації, надаючи всі ці переваги з мінімальною міграцією.

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Тоді ви можете виконати наступну команду, щоб заповнити ваші переклади:

```bash
npx intlayer fill
```

Це заповнить ваші переклади за допомогою AI-провайдера, який ви налаштували.

> Дивіться всіх доступних AI-провайдерів у [документації Intlayer щодо конфігурації AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#ai-configuration).
> Дивіться всі доступні команди у [документації Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

---

## Конфігурація Git

Виключити згенеровані файли з контролю версій:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

Ці файли автоматично генеруються під час процесу збірки й не потребують коміту у ваш репозиторій.

### Розширення для VS Code

Для покращення досвіду розробника встановіть офіційне розширення **Intlayer для VS Code**:

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
