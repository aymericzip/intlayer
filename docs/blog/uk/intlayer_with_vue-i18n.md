---
createdAt: 2025-08-23
updatedAt: 2025-11-06
title: Intlayer та vue-i18n
description: Інтеграція Intlayer з vue-i18n для комплексного рішення інтернаціоналізації Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Інтернаціоналізація
  - Блог
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.7
    date: 2025-11-06
    changes: Додано документацію щодо підтримки провайдерів ШІ
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано плагін loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Перехід на плагін syncJSON та комплексний перепис
---

# Інтернаціоналізація (i18n) у Vue.js за допомогою vue-i18n та Intlayer

<iframe title="Як автоматизувати ваші JSON-переклади vue-i18n за допомогою Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна відкрита бібліотека для інтернаціоналізації, створена для вирішення недоліків традиційних i18n-рішень. Вона пропонує сучасний підхід до управління контентом у застосунках на Vue.js та Nuxt.

Див. конкретне порівняння з vue-i18n у нашому дописі в блозі [vue-i18n проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer.md).

## Чому поєднувати Intlayer з vue-i18n?

Хоча Intlayer забезпечує відмінне автономне рішення для i18n (див. наш [посібник з інтеграції для Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md)), ви можете захотіти поєднати його з vue-i18n з кількох причин:

Intlayer пропонує широкий набір **розширених можливостей**, які виходять за межі традиційних i18n-інструментів. Він допомагає вам:

- **Автоматично виявляти та заповнювати відсутні переклади**, щоб спростити локалізацію.
- **Тестувати та валідувати ваші переклади** безпосередньо у процесах розробки або CI/CD.
- **Керувати вмістом на рівні компонентів**, забезпечуючи чисту, масштабовану та зручну для підтримки структуру додатка.
- **Виносьте ваш контент у зовнішні файли**, роблячи його легко редагованим для всієї вашої команди (розробників, перекладачів та контент-менеджерів).

Однак **vue-i18n** залишається відмінним і широко використовуваним рішенням для i18n завдяки його **зрілій екосистемі**, **широкій підтримці спільноти** та **великій сумісності з плагінами**.

Поєднавши **Intlayer** з **vue-i18n**, ви отримаєте найкраще з обох світів — стабільність і зрілість екосистеми vue-i18n разом із сучасним управлінням контентом, автоматизацією та покращеним досвідом розробника, які надає Intlayer.

Цей посібник пояснює, як використовувати Intlayer як **адаптер для vue-i18n**, що дозволяє вам:

- Поступово мігрувати з vue-i18n на Intlayer.
- Зберегти існуючі плагіни та робочі процеси vue-i18n.
- Автоматизувати ваші JSON-переклади у CLI або CI/CD пайплайнах.
- Тестуйте, синхронізуйте та керуйте перекладами ефективніше.

---

## Покроковий посібник з налаштування Intlayer з vue-i18n

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети, використовуючи бажаний пакетний менеджер:

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
- **@intlayer/sync-json-plugin**: Плагін для синхронізації декларацій контенту Intlayer у формат JSON для vue-i18n

### Крок 2: Реалізуйте плагін Intlayer для обгортання JSON

Створіть файл конфігурації Intlayer, щоб визначити підтримувані локалі:

**Якщо ви також хочете експортувати JSON-словники для vue-i18n**, додайте плагін `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

// Налаштування Intlayer
const config: IntlayerConfig = {
  internationalization: {
    // Підтримувані локалі та локаль за замовчуванням
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Плагін `syncJSON` автоматично обгортає JSON. Він читає та записує JSON-файли, не змінюючи архітектуру вмісту.

Якщо ви хочете, щоб ці JSON-файли співіснували з файлами декларацій вмісту Intlayer (`.content` файли), Intlayer працюватиме таким чином:

    1. завантажити як JSON-файли, так і файли декларацій вмісту та перетворити їх в словник Intlayer.
    2. якщо виникають конфлікти між JSON та файлами декларацій вмісту, Intlayer виконає злиття всіх словників. Порядок застосування значень залежить від пріоритету плагінів та пріоритету файлу декларації вмісту (усі ці параметри можна налаштувати).

Якщо зміни вносяться через CLI для перекладу JSON або через CMS, Intlayer оновить JSON-файл новими перекладами.

Щоб побачити докладніші відомості про плагін `syncJSON`, зверніться до [документації плагіна syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

### Крок 4: Налаштування AI-провайдера

Intlayer відкриває низку просунутих автоматизаційних і зручних для розробника функцій для вашого робочого процесу i18next.

- **Автоматичне виявлення та заповнення відсутніх перекладів**: Intlayer сканує ваші JSON-словники, знаходить неперекладені або відсутні ключі й перекладає лише їх, тому 99% вашого JSON залишається без змін.
- **Покроковий (chunked) переклад для великих JSON-файлів**: коли ваші файли перекладів дуже великі, Intlayer автоматично розбиває обробку на керовані частини (chunks) і перекладає їх окремо, щоб уникнути лімітів API та проблем з пам’яттю.
- **Паралелізація неймспейсів**: Якщо у вас сотні неймспейсів (або файлів), Intlayer паралелізує завдання перекладу, ефективно прискорюючи ваші CI/CD або масові операції перекладу.
- **Гнучка підтримка AI-провайдерів**: Вибирайте бажаного провайдера AI (наприклад OpenAI, Claude, Gemini), просто налаштувавши облікові дані. Використовуйте власний API-ключ і перемикайте провайдерів за потреби.
- **Надійна обробка відповідей AI**: Intlayer може обробляти крайові випадки, коли ваш провайдер AI повертає текст або як рядок, або як об'єкт, навіть автоматично повторюючи запити, коли формат непослідовний.
- **Готовність до CLI та CI/CD**: Запускайте перевірки Intlayer і автоматичне заповнення безпосередньо у ваших тестах або пайплайнах, роблячи процес локалізації надійним та автоматизованим.
- **Інтегрується поверх вашої існуючої конфігурації**: Вам не потрібно змінювати основу i18next або Next.js. Intlayer працює як додатковий плагін до вашої поточної конфігурації, забезпечуючи всі ці переваги з мінімальною міграцією.

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
      format: "vue-i18n",
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Потім ви можете виконати наступну команду, щоб заповнити ваші переклади:

```bash
npx intlayer fill
```

Ця команда заповнить ваші переклади за допомогою AI-провайдера, якого ви налаштували.

> Див. усіх доступних AI-провайдерів у [документації Intlayer щодо конфігурації AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#ai-configuration).
> Див. усі доступні команди у [документації Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

---

## Конфігурація Git

Виключіть згенеровані файли з контролю версій:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

Ці файли автоматично регенеруються під час процесу збірки і їх не потрібно додавати до вашого репозиторію.

### Розширення для VS Code

Для покращення досвіду розробника встановіть офіційне **розширення Intlayer для VS Code**:

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
