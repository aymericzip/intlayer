---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Як вибрати правильну бібліотеку i18n для Solid у 2026 році"
description: Практичний посібник з вибору інструментів інтернаціоналізації для SolidJS та SolidStart. На які запитання відповісти перед порівнянням @solid-primitives/i18n, solid-i18next, Paraglide, Lingui та Intlayer, і скільки кожен варіант коштує у плані реактивності, розміру bundle та типізації.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid інтернаціоналізація
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - порівняння бібліотек i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# Як вибрати правильну бібліотеку i18n для Solid

Модель реактивності Solid змінює вимоги до бібліотеки i18n. Компоненти виконуються лише один раз, тому переклад, збережений у `const` під час setup, стає замороженим рядком. Бібліотека, яка повертає звичайні рядки замість accessors, призведе до появи сторінки, де мова перемикається скрізь, окрім трьох компонентів, де хтось так зробив. Вибір бібліотеки для Solid, це частково питання API, а частково питання того, яка з них заважає зробити таку помилку.

Цей посібник перелічує запитання, на які слід відповісти спочатку, а потім зіставляє відповіді з `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid` та Intlayer для Vite + Solid і для SolidStart.

![Екосистема бібліотек i18n для Solid](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Шість запитань перед порівнянням бібліотек

1. **Vite SPA чи SolidStart?** В SPA локаль може жити виключно в signal. У SolidStart локаль має визначатися на сервері з URL, а все, що пошуковий робот повинен бачити без JavaScript (`<html lang>`, `hreflang`), має знаходитися в `entry-server.tsx`.
2. **Наскільки реактивною має бути зміна локалі?** Повне перезавантаження сторінки під час перемикання є прийнятним для деяких застосунків. Якщо ні, значення бібліотеки мають бути signals або accessors, а їхнє читання має відстежуватися, а не копіюватися.
3. **Хто пише переклади?** Розробники, TMS, агенція, що надає рядки ICU, або AI-пайплайн. `solid-i18next` підтримує формат i18next. `@solid-primitives/i18n` використовує будь-який ваш об'єкт словника. Обирайте відповідно до постачальника.
4. **Скільки локалей і сторінок?** Дві локалі та п'ять сторінок можуть надсилати все одразу. Десять локалей і сорок маршрутів не можуть, тому lazy каталоги та scoping стають головною статтею витрат.
5. **Чи потрібні типи для ключів?** `@solid-primitives/i18n` виводить їх із вихідного словника. `solid-i18next` потребує ручного оголошення. Бібліотеки часу компіляції генерують їх автоматично.
6. **Який обсяг функціональності вам потрібен?** Керування cookie, маршрутизація з префіксами локалей, перенаправлення, форматувальники. Найлегший варіант не має нічого з цього, і це нормально, поки не виникне реальна потреба.

Запишіть відповіді. Усе викладене нижче посилатиметься на них.

## Загальна картина

Solid, наймолодша екосистема серед розглянутих, яка має найменше варіантів, розподілених за трьома хвилями.

![Історія бібліотек i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Словники під час виконання: solid-i18next">

Обгортка i18next для Solid. Namespaces, backends, детектори та десятиліття плагінів. Найважчий варіант із усіх, що несе ті самі витрати на `t("a.b")`, що й у React.

</Accordion>
<Accordion header="Мінімальні примітиви (2022): @solid-primitives/i18n">

Плоский словник під вашим контролем, `translator()`, що повертає accessors, типи, виведені з вихідного об'єкта. Дуже компактний, без scoping, без маршрутизації, без форматувальників. Вибір спільноти за замовчуванням.

</Accordion>
<Accordion header="Компілятор та колокований контент (2024–2026): Paraglide, Intlayer, @lingui/solid">

Paraglide генерує одну функцію на повідомлення. Intlayer оголошує контент для кожного компонента у файлах `.content.ts` і повертає вузли на основі signal. Інтеграція Lingui для Solid з'явилася у 2026 році та принесла вилучення на основі макросів.

</Accordion>
</AccordionGroup>

Стаття про [історію i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md) детально розглядає кожну хвилю.

## Найважливіше рішення: де зберігається контент і коли він завантажується

Два структурні вибори пояснюють більшу частину різниці у розмірі bundle між конфігураціями:

- **Централізований або scoped контент.** Один словник для всього застосунку або окреме оголошення для кожного компонента.
- **Статичний або динамічний імпорт.** Усе під час запуску або активна локаль (в ідеалі, і активний маршрут), що завантажується за вимогою.

Графік оцінює обсяг даних для теоретичного застосунку від 1 до 10 сторінок, перекладеного від 1 до 10 мовами, з приблизно 30 КБ тексту на сторінку.

![Теоретичний витік контенту залежно від архітектури](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n` не вирішує жодної з цих проблем: ви робите `createResource` для словника на кожну локаль, що дає динамічне завантаження, а решта залишається за вами. `solid-i18next` має namespaces та lazy backends, але ніщо не контролює зв'язки, тому спільний компонент, який імпортує `common`, робить його залежністю для кожного маршруту. Paraglide оптимізує сторінки за допомогою tree-shaking, хоча це не спрацювало в реалізації для [бенчмарку Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/solid.md). Intlayer досягає цього завдяки оголошенням на рівні компонентів.

Якщо ваша відповідь на запитання 4 була "багато сторінок", зверніть на цей розділ більше уваги, ніж на будь-які вподобання щодо API. Стаття про [покомпонентний та централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md) розглядає аспекти підтримки цього компромісу.

## Кандидати

Розміри бібліотек взяті з [бенчмарку Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/solid.md): provider разом із accessor у порожньому компоненті після bundling, tree-shaking та мініфікації для застосунку на 10 сторінок та 10 локалей. Контент вимірюється окремо.

| Бібліотека               | Модель контенту                               | Реактивність при зміні локалі                             | Типобезпечність                               | Scoping та lazy loading       | Розмір бібліотеки                                        |
| :----------------------- | :-------------------------------------------- | :-------------------------------------------------------- | :-------------------------------------------- | :---------------------------- | :------------------------------------------------------- |
| `@solid-primitives/i18n` | Плоский власний словник                       | Signal, accessors від translator                          | 3/5 — Виводяться з вихідного словника         | Немає вбудованого             | ~0.6 kB                                                  |
| `solid-i18next`          | Каталоги та namespaces i18next                | Store, повторний рендеринг через provider                 | 2/5 — Ручне оголошення                        | Namespaces, lazy backends     | ~14.9 кБ                                                 |
| Paraglide                | Проєкт inlang, згенеровані функції            | Читання при кожному виклику з cookie/storage              | 3.5/5 — Згенеровані                           | Tree-shaking (не в бенчмарку) | Майже нульовий (за рахунок згенерованого коду в проєкті) |
| `@lingui/solid`          | Вихідний текст у коді, скомпільовані каталоги | На основі signal                                          | 2/5 — Від компілятора                         | Для кожного каталогу          | ~11.8 kB                                                 |
| Intlayer                 | Один `.content.ts` на компонент               | Вузли на основі signal, без повторного запуску компонента | 5/5 — Згенеровані, увімкнені за замовчуванням | Так, на компонент             | ~4.3 kB                                                  |

> Числа відображають стан на момент версій бенчмарку. Розмір `@lingui/solid` взято з бенчмарку TanStack Start. Перевірте показники на власному застосунку, перш ніж приймати рішення лише на основі розміру.
> Типобезпечність: 5/5 означає, що ключі, параметри та кожна локаль перевіряються без ручного налаштування, включаючи форматувальники URL та хелпери.

Майже нульовий розмір бібліотеки Paraglide досягається конструктивно: runtime генерується прямо у ваш репозиторій. Intlayer потребує `vite-intlayer`, тому він не може працювати без build step.

## Зіставте ваші відповіді з бібліотекою

<AccordionGroup>
<Accordion header="Vite SPA, малий каталог, ви не хочете нічого зайвого">

`@solid-primitives/i18n`. Плоский словник, `translator()`, що повертає accessors, типи, які виводяться без додаткових налаштувань. Це правильний вибір для невеликого застосунку, а читання вихідного коду займає десять хвилин. Що вам доведеться написати власноруч: збереження локалі, маршрутизацію, форматувальники та розділення за маршрутами. Якщо цей список зростає, це сигнал до переходу.

</Accordion>
<Accordion header="Перехід із React із кодовою базою на i18next">

`solid-i18next` дозволяє повторно використовувати каталоги, namespaces, backends та детектори у незмінному вигляді. Це найважчий варіант, який несе ті самі витрати, що й `react-i18next`: ручне оголошення типів, оптимізації, які можливі, але вимагають багато часу, і функція `t()`, що повертає рядок, через що легко припуститися помилки із замороженим перекладом. Обгортайте виклики в JSX або memo і ніколи не зберігайте їх під час setup.

</Accordion>
<Accordion header="SolidStart із префіксами локалей у маршрутах та SSR">

Локаль має надходити з URL на сервері, щоб обидві сторони були узгоджені; визначати її на клієнті вже запізно. `@solid-primitives/i18n` та `solid-i18next` залишають маршрут `[[locale]]`, `matchFilters`, редирект та теги в `entry-server.tsx` на ваш розсуд. Paraglide має Vite плагін для маршрутизації. Intlayer містить middleware та помічники маршрутизації. Що б ви не обрали, додавайте `<html lang>` та `hreflang` до `entry-server.tsx`; `@solidjs/meta` застосовується на клієнті після гідратації у SolidStart v2. Стаття про [i18n у Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/solid.md) детально описує це налаштування.

</Accordion>
<Accordion header="Зміна локалі має бути миттєвою та точковою">

Обирайте бібліотеку, чиї значення є signals або accessors, а звернення до них відстежуються. Accessors у `@solid-primitives/i18n` та вузли Intlayer оновлюють лише ті DOM-вузли, які їх читають, без повторного запуску компонента. `solid-i18next` виконує рендеринг через provider. Paraglide зчитує локаль із cookie або storage під час кожного виклику повідомлення замість signal, що працює, але виконує більше роботи для кожного вузла, ніж потрібно.

</Accordion>
<Accordion header="Великий застосунок, багато маршрутів, обмеження на розмір bundle">

Scoped контент, скомпільований під час збірки. Intlayer надсилає лише те, що рендерить конкретний маршрут. Paraglide має досягати цього за допомогою tree-shaking; перевірте це у своїй конфігурації, оскільки в бенчмарку цього не відбулося. З `solid-i18next` плануйте стратегію namespaces та lazy loading з першого дня і контролюйте її під час code review.

</Accordion>
<Accordion header="Типобезпека є обов'язковою вимогою">

`@solid-primitives/i18n` надає виведені типи без додаткових зусиль, що більше, ніж пропонує більшість бібліотек React. Для згенерованих типів, які зберігаються при lazy loading та розділенні за маршрутами, Paraglide, `@lingui/solid` та Intlayer генерують їх із вмісту. Стаття про [виявлення відсутніх перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/detecting_missing_translations.md) порівнює, що кожна бібліотека виявляє під час збірки.

</Accordion>
<Accordion header="Переклади створюватимуться за допомогою AI">

Тоді централізований словник втрачає сенс. Колокований контент разом із CLI, що заповнює відсутні локалі, це коротший шлях. Команда `fill` в Intlayer працює з вашим власним API-ключем (OpenAI, Anthropic, Mistral, Gemini) і перекладає заново лише те, що змінилося.

</Accordion>
</AccordionGroup>

## Слабкі сторони кожної бібліотеки

- **`@solid-primitives/i18n`**: відсутні lazy loading або scoping крім того, що ви напишете самі, немає маршрутизації, обробки cookie та форматувальників. Відмінно для невеликих застосунків, але швидко стає недостатнім для професійних проєктів.
- **`solid-i18next`**: найважча з усіх, ручні типи, власний формат множини, а `t()` повертає рядок, через що переклади зависають, якщо їх зберегти під час setup.
- **Paraglide**: згенеровані файли фіксуються в репозиторії та перегенеровуються перед кожним push, tree-shaking не спрацював у бенчмарку Solid, а локаль зчитується зі storage під час кожного виклику замість signal.
- **`@lingui/solid`**: нова бібліотека у 2026 році, тому реального виробничого досвіду поки мало. Успадковує build step `extract` / `compile` від Lingui та кілька синтаксисів, що перетинаються.
- **Intlayer**: обов'язковий build плагін, менша екосистема, часткова підтримка ICU та контент, розподілений по кодовій базі за задумом, тому експорт єдиного JSON для перекладача потребує tooling.

## Як кожен варіант виглядає в коді

Один і той самий компонент, підсумок кошика із заголовком та формою множини, написаний для кожного кандидата. Зверніть увагу, де зчитується переклад: у JSX він відстежується, у тілі setup це заморожений рядок.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="Англійська">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export type Dict = typeof en;
```

  </Tab>
  <Tab value="fr" label="Французька">

```ts fileName="src/i18n/fr.ts"
import type { Dict } from "./en";

export const fr: Dict = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="Іспанська">

```ts fileName="src/i18n/es.ts"
import type { Dict } from "./en";

export const es: Dict = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import { createSignal } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";

const dictionaries = {
  en: i18n.flatten(en),
  fr: i18n.flatten(fr),
  es: i18n.flatten(es),
};

export const [locale, setLocale] = createSignal<Locale>("en");
export const dictionary = () => dictionaries[locale()];
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

Ключі типізуються з англійського об'єкта без кодогенерації. Немає правил для множини, lazy loading та маршрутизації; усе це потрібно додавати самостійно.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="Англійська">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="Французька">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="Іспанська">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

Каталоги, namespaces та плагіни i18next у звичному вигляді. `t` повертає рядок, тому `const title = t("cart:title")` під час setup заморожує його; залишайте виклик всередині JSX.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="Англійська">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="Французька">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="Іспанська">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

Кожне повідомлення є згенерованою типізованою функцією. Локаль зчитується з cookie або storage при кожному виклику замість signal, тому реактивність під час перемикання потрібно налаштовувати самостійно.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      uk: "Ваш кошик",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        uk: "{{count}} товар",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        uk: "{{count}} товарів",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

Усі локалі в одному файлі поруч із компонентом. `useIntlayer` повертає вузли на основі signal, тому зміна локалі оновлює лише ті DOM-вузли, які їх читають. `{content.title}` у JSX відстежується; `content.title.value` у тілі setup, ні.

  </Tab>
</Tabs>

Для наявної кодової бази на i18next [адаптер сумісності i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/i18next.md) створює alias пакета на рівні збирача, тому каталоги та `t()` продовжують працювати, поки Intlayer надає контент, а [посібник з міграції](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md) описує решту кроків.

## Перш ніж зробити вибір

Таблиця функцій показує, що бібліотека робить сьогодні. Ці пункти показують, як виглядатиме робота з нею на практиці.

**Перевірте активність репозиторію.**

Коміти, час відповіді на issues та чи був останній мінорний реліз цього року. Гарний дизайн без мейнтейнера, це міграція, що чекає свого часу.

**Не обирайте за кількістю завантажень в npm.**

Найчастіше встановлюють бібліотеку, яка з'явилася першою, а не ту, що найкраще підходить для кодової бази Solid у 2026 році. Кількість завантажень відображає історію, а не відповідність потребам.

![Рейтинг бібліотек i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Дізнайтеся, хто фінансує підтримку і що вони продають.**

`i18next` (основа `solid-i18next`) підтримується Locize. `next-intl`, `vue-i18n`, `svelte-i18n` та Lingui підтримуються Crowdin. Tolgee, Paraglide (inlang) та Intlayer мають власні платформи. Постачальник, чий дохід базується на платному хостингу перекладів, навряд чи зацікавлений у тому, щоб зробити переклад безкоштовним всередині вашого інструментарію. Intlayer, єдиний із переліку, що пропонує AI-переклад через CLI з вашим власним API-ключем та CMS, яку можна хостити самостійно.

**Чи готовий інструмент до роботи з AI-агентами?**

Агенти досі відчувають труднощі з i18n: вони забувають локалі, вигадують неіснуючі ключі та плутають синтаксис повідомлень. Чи надає бібліотека [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md) або [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md), щоб агент міг переглядати, заповнювати та тестувати контент? І чи оптимізовано завантаження контенту за замовчуванням, або комусь доведеться щокварталу переглядати namespaces та lazy імпорти?

**Типобезпека з коробки.**

Не "можна типізувати з додатковими налаштуваннями", а "неправильний ключ викликає помилку `tsc` на щойно встановленому проєкті". Перевірте, що відбувається з неіснуючим ключем та з локаллю, де пропущено один переклад.

**Виявлення невикористаного контенту.**

Каталоги мають властивість лише розростатися. Збірка Intlayer видаляє невикористані поля та логує їх (`build.purge`). Paraglide досягає цього завдяки архітектурі, оскільки невикликана функція повідомлення видаляється через tree-shaking. Решта бібліотек залишають це очищення на вас.

**Досвід розробника (Developer Experience).**

Час від налаштування до першого перекладеного рядка, наявність [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md) або [розширення для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md), яке показує переклад при наведенні та переходить до оголошення, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для заповнення, тестування і відправки, [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) або екстрактор, який витягує захардкоджені рядки з компонентів, щоб не керувати кожним рядком ключ за ключем, а також можливість редагування контенту без участі розробників ([візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)) без відкриття pull request.

## Часті запитання

<FAQ>

<Question title="Чи достатньо @solid-primitives/i18n для робочого продакшн-застосунку?">

Для невеликого, так, і це найлегший доступний варіант. Його перестає вистачати, коли вам потрібні lazy каталоги для кожного маршруту, маршрутизація локалей у SolidStart, збереження в cookie або форматувальники, оскільки все це доведеться створювати самостійно.

</Question>

<Question title="Чому мій переклад не оновлюється при зміні локалі?">

Тому що компоненти Solid виконуються лише один раз. Переклад, прочитаний у `const` під час setup, є звичайним рядком, а не підпискою на зміни. Зчитуйте його всередині JSX, effect або memo, або оберіть бібліотеку, чиї значення є accessors, щоб ускладнити написання помилкового коду.

</Question>

<Question title="Чи потрібна мені бібліотека на основі компілятора?">

Лише якщо розмір bundle, згенеровані типи або перевірка відсутніх ключів під час збірки є реальними вимогами. Стаття про [компіляторний та декларативний i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md) пояснює, що дають компілятори і де вони можуть помилятися.

</Question>

<Question title="Чи впливає вибір бібліотеки на SEO?">

Опосередковано. Пошукових роботів цікавить маршрутизація, `hreflang`, `<html lang>` та наявність тексту в HTML, що відрендерений на сервері, що в SolidStart означає `entry-server.tsx`. Дивіться [посібник з hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Додаткові матеріали

- [Бенчмарк Solid i18n: розмір bundle, витік пам'яті та час перемикання локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/solid.md)
- [Solid i18n: чому зависають переклади при зміні локалі](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/solid.md)
- [Готовий адаптер сумісності з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/i18next.md) та [посібник з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md)
- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)
- [Компіляторний та декларативний i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md)
- [Покомпонентний та централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md)
- [Як працює оптимізація bundle під час збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)
- [Налаштування i18n у застосунку Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+solid.md) та у [застосунку SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_solid_start.md)
- Аналогічний посібник для [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_vue_i18n_library.md) та [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_svelte_i18n_library.md)
