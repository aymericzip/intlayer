---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "Як правильно обрати бібліотеку Vue i18n у 2026 році"
description: Посібник із прийняття рішень для інтернаціоналізації Vue та Nuxt. На які запитання відповісти перед порівнянням vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide та Intlayer, і скільки кожен вибір коштує з точки зору розміру bundle, типізації та SSR payload.
keywords:
  - vue i18n
  - інтернаціоналізація vue
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - порівняння бібліотек i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# Як правильно обрати бібліотеку Vue i18n

"Vue i18n" є як загальним терміном, так і назвою бібліотеки, яку встановлюють майже всі. Це водночас зручно та оманливо: `vue-i18n` — хороший варіант за замовчуванням, але це не єдиний вибір, і питання, які мали б визначати рішення (наявність SSR, кількість сторінок, хто саме пише переклади), рідко ставлять перед виконанням `npm install`.

Цей посібник спочатку розглядає ці запитання, а потім зіставляє відповіді з відповідними бібліотеками як для звичайного Vite + Vue, так і для Nuxt.

![Екосистема бібліотек Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Зміст

<TOC/>

## Шість запитань, на які варто відповісти перед порівнянням бібліотек

1. **Vite SPA чи Nuxt?** У SPA вартість каталогу є проблемою JS bundle. У Nuxt це також проблема розміру HTML payload, оскільки повідомлення серіалізуються в стан SSR та гідратуються. Більшість скарг на те, що "vue-i18n працює повільно", надходять саме від додатків на Nuxt з цієї причини.
2. **Хто пише переклади?** Розробники, TMS, агентство, що надає рядки у форматі ICU, або AI pipeline. `vue-i18n` використовує власний синтаксис множини з роздільником pipe, а не ICU. Це має значення, якщо рядки надходять ззовні.
3. **Скільки локалей і сторінок?** Дві локалі та п'ять сторінок дозволяють завантажувати все одразу. Десять локалей і сорок маршрутів цього не дозволяють, і стратегія завантаження стає головною статтею витрат.
4. **Чи потрібні типи для ключів?** `t("cart.totl")` компілюється у `vue-i18n`, якщо ви не передасте generic для схеми повідомлень, і ця схема конфліктує з каталогами з lazy loading.
5. **Що містить контент?** Лише мітки інтерфейсу (UI labels), чи markdown, посилання всередині речень і блоки для окремих локалей. Складний багатий контент (rich content) — це саме те, де використання `t()`, що повертає звичайний рядок, стає незручним.
6. **Чи є CSP обмеженням?** Збірка `vue-i18n` за замовчуванням компілює повідомлення в браузері за допомогою `new Function`. Збірки runtime-only потребують `@intlify/unplugin-vue-i18n` для попередньої компіляції під час build time.

Запишіть відповіді. Усе викладене нижче посилається на них.

## Загальна картина в одній ілюстрації

Екосистема Vue має менше бібліотек i18n, ніж React, і вони походять з різних архітектурних хвиль.

![Історія бібліотек JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Словники часу виконання (2015–2019): vue-i18n, @nuxt/i18n">

`vue-i18n` з'явився у 2015 році та відтоді залишається вибором за замовчуванням. `@nuxt/i18n` обгортає його, додаючи маршрутизацію локалей, SEO-теги та lazy loading для кожної локалі. Повідомлення компілюються у render functions: під час build time, якщо ви додаєте unplugin, або безпосередньо в браузері в іншому випадку.

</Accordion>
<Accordion header="Альтернативні формати (2020): fluent-vue">

Файли Mozilla Fluent `.ftl` запропонували зручніший синтаксис повідомлень із граматичними варіантами. Типізація ключів відсутня, а плагін для Vite завантажує всі локалі на кожну сторінку.

</Accordion>
<Accordion header="Компілятор і колокований контент (2024–2026): Paraglide, Intlayer">

Paraglide генерує окрему функцію для кожного повідомлення та дозволяє бандлеру виконати tree-shaking для решти. Intlayer декларує контент для кожного компонента у файлах `.content.ts`, генерує типи та відправляє клієнту лише те, що рендерить конкретний маршрут.

</Accordion>
</AccordionGroup>

Стаття про [історію JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md) детально розглядає кожну хвилю.

## Рішення, яке має найбільше значення: де зберігається контент і коли він завантажується

Два структурні рішення визначають більшу частину різниці в розмірі bundle між підходами:

- **Централізований або ізольований (scoped) контент.** Один спільний файл `locales/en.json` для всього додатку або окрема декларація для кожного компонента.
- **Статичний чи динамічний імпорт.** Усе завантажується під час старту, або активна локаль (і в ідеалі активний маршрут) завантажується за запитом.

Графік оцінює payload для теоретичного додатку від 1 до 10 сторінок, перекладеного на кількість локалей від 1 до 10, із приблизно 30 КБ тексту на сторінку.

![Теоретичний витік контенту за архітектурою](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` підтримує динамічну вісь: виклик `setLocaleMessage` після `import()` дозволяє припинити завантаження дев'яти локалей, які ніхто не читає. Проте він не надає оптимізації за віссю сторінок. Каталог локалі є єдиним об'єктом, і його завантаження підтягує тексти для кожної сторінки. У SPA цього ніхто не помічає. У Nuxt з `@nuxtjs/i18n` за наявності понад десяти сторінок кожен маршрут тягне за собою тексти всіх інших маршрутів двічі: у JS chunk та в SSR payload.

[Бенчмарк Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/vue.md) вимірює це як "витік з інших маршрутів" (leakage from other routes) та "витік з інших локалей" (leakage from other locales). Якщо вашою відповіддю на запитання 3 було "багато сторінок", цей розділ важливіший за будь-які переваги API. Стаття про [покомпонентний та централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md) розглядає аспект підтримки цього ж компромісу.

## Кандидати

Розміри бібліотек наведено на основі [бенчмарку Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/vue.md): плагін плюс composable у порожньому компоненті після збирання, tree-shaking та мініфікації в додатку на 10 сторінок і 10 локалей. Обсяг контенту вимірюється окремо.

| Бібліотека     | Модель контенту                                               | Типобезпечність                              | Формат повідомлень                  | Розділення за маршрутами | Розмір бібліотеки                                    |
| :------------- | :------------------------------------------------------------ | :------------------------------------------- | :---------------------------------- | :----------------------- | :--------------------------------------------------- |
| `vue-i18n`     | Центральні каталоги на локаль, опціональні блоки SFC `<i18n>` | 2/5 — Опціонально через generic схеми        | Власний (множина через pipe)        | Ні                       | ~24.3 kB                                             |
| `@nuxtjs/i18n` | Як у `vue-i18n`, плюс маршрутизація та SEO-теги               | 2/5 — Так само                               | Так само                            | Ні, лише за локалями     | ~24.3 kB                                             |
| `fluent-vue`   | Файли `.ftl` (Mozilla Fluent)                                 | 1/5 — Відсутні                               | Fluent                              | Ні                       | ~29.7 kB                                             |
| Paraglide      | Проєкт inlang, згенеровані функції                            | 3.5/5 — Згенеровані                          | Власний                             | Через tree-shaking       | Майже нуль (за рахунок згенерованого коду в проєкті) |
| Intlayer       | Один `.content.ts` на компонент                               | 5/5 — Згенеровані, включені за замовчуванням | Intlayer (+ ICU, i18next, vue-i18n) | Так, на компонент        | ~3.9 kB                                              |

> Цифри є знімком стану версій із бенчмарку. Протестуйте їх на власному додатку, перш ніж приймати рішення виключно на основі розміру.
> Типобезпечність: 5/5 означає, що ключі, параметри та кожна локаль перевіряються без ручного налаштування, включаючи форматувальники URL та хелпери.

Майже нульовий розмір бібліотеки Paraglide досягається за рахунок її структури: runtime генерується безпосередньо у ваш репозиторій, що вимагає кроку регенерації перед кожним push та спричиняє merge conflicts у згенерованих файлах. Intlayer потребує `vite-intlayer` (або модуля Nuxt), тому він не може працювати без етапу збирання.

## Зіставте свої відповіді з бібліотекою

<AccordionGroup>
<Accordion header="Vite SPA, невелика команда, мало локалей">

`vue-i18n` у режимі Composition mode (`legacy: false`), разом із `@intlify/unplugin-vue-i18n` для надсилання runtime-only збірки. Використовуйте lazy loading для локалей через `import()`. Це покриває більшість невеликих додатків, а відповіді спільноти можна легко знайти всюди. Блоки SFC `<i18n>` розміщують повідомлення поруч із компонентом, що допомагає, але інструменти екстракції та інтеграції з TMS для них розвинені слабше, ніж для JSON каталогів, тому варто заздалегідь визначитися з вибором у команді.

</Accordion>
<Accordion header="Nuxt із локалізованою маршрутизацією, sitemap та hreflang">

`@nuxtjs/i18n` надає стратегію маршрутизації, теги `hreflang` та визначення локалі без додаткового коду, і тільки це виправдовує його використання для сайтів із контентом на кілька сторінок. Його обмеження полягає в каталогах на рівні локалей: якщо сторінок більше десяти, SSR payload несе тексти кожного маршруту. Якщо це ваш випадок, налаштуйте `vue-i18n` вручну з повідомленнями для окремих маршрутів або перейдіть на ізольований контент. Стаття про [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/nuxt.md) у першу чергу розглядає вибір стратегії маршрутизації.

</Accordion>
<Accordion header="Переклади надходять з TMS або агентства, що надає ICU">

Синтаксис множини у `vue-i18n` (`"no item | one item | {count} items"`) не є ICU і не є портативним. Перекладачів потрібно окремо попереджати про це, а експорт із TMS не згенерує такого формату. Погодьте формат до створення першого каталогу або оберіть бібліотеку, формат якої відповідає вашому постачальнику перекладів. Підтримка ICU в Intlayer є частковою, тому якщо ви вже отримуєте рядки в ICU, враховуйте це як блокуючий фактор.

</Accordion>
<Accordion header="Великий додаток, багато маршрутів, обмежений бюджет на bundle або SSR payload">

Надавайте перевагу ізольованому контенту, скомпільованому під час build time. Paraglide досягає цього за допомогою tree-shaking, який працює у Vite належним чином. Intlayer досягає цього завдяки деклараціям на рівні компонентів і завантажує лише те, що рендерить маршрут. У `vue-i18n` ви можете розділяти повідомлення за маршрутами вручну, проте ніщо не гарантує дотримання цього правила, і спільний компонент, що імпортує глобальний namespace, непомітно зведе зусилля нанівець.

</Accordion>
<Accordion header="Типобезпека є обов'язковою вимогою">

`vue-i18n` можна типізувати, передавши generic схеми до `createI18n`. Це працює, але ламається, щойно каталоги починають завантажуватися через lazy loading, оскільки схема описує повідомлення, які ще можуть бути не завантажені. Якщо ви не хочете підтримувати це вручну, оберіть бібліотеку, чиї типи генеруються з контенту: Paraglide або Intlayer. Публікація про [виявлення відсутніх перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/detecting_missing_translations.md) порівнює, які помилки кожен інструмент виявляє на етапі збирання.

</Accordion>
<Accordion header="Контент містить більше, ніж прості мітки UI">

Сторінки markdown, речення з компонентом `<RouterLink>` посередині, компоненти під конкретні локалі. `vue-i18n` має `<i18n-t>` для інтерполяції компонентів, що працює, але є досить громіздким. Вузли контенту Intlayer напряму приймають markdown, HTML та вкладені об'єкти, що значно зручніше для додатків із великим обсягом контенту.

</Accordion>
<Accordion header="Переклади створюватимуться за допомогою AI">

У такому разі централізований JSON більше не має користувача, який би виправдовував його існування. Колокований контент у поєднанні з CLI, який заповнює відсутні локалі, є коротшим шляхом. Команда `fill` в Intlayer виконується з використанням вашого власного API key (OpenAI, Anthropic, Mistral, Gemini) і перекладає лише змінені фрагменти.

</Accordion>
</AccordionGroup>

## Слабкі місця кожної бібліотеки

- **`vue-i18n`**: найважча з представлених, власний формат множини, типізація є опціональною та вразливою за використання lazy loading, відсутня ізоляція за маршрутами, невикористовувані ключі непомітно накопичуються. Збереження `legacy: true` у додатку на Vue 3 залишає шар сумісності з Vue 2 і позбавляє типізації `useI18n()`.
- **`@nuxtjs/i18n`**: успадковує всі перераховані недоліки, а SSR payload містить тексти кожної сторінки, якщо кількість маршрутів перевищує десяток.
- **`fluent-vue`**: чудовий синтаксис повідомлень, відсутність типізації ключів, а плагін для Vite завантажує весь контент усіма мовами на кожну сторінку. Найважча бібліотека в бенчмарку.
- **Paraglide**: згенеровані файли додаються до репозиторію, регенерація перед кожним push, а локаль зчитується з cookie або storage при кожному виклику повідомлення, а не з реактивного сховища, що створює додаткове навантаження під час зміни локалі.
- **Intlayer**: обов'язковий плагін для збирання, менша екосистема, часткова підтримка ICU та контент, розподілений по кодовій базі за дизайном, тому експорт єдиного JSON для перекладача потребує додаткових інструментів.

## Як кожен варіант виглядає в коді

Один і той самий компонент, підсумок кошика із заголовком та формою множини, написаний для кожного кандидата. Найцікавіша частина полягає не в шаблоні, а в тому, де зберігається контент і що про нього відомо `vue-tsc`.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="Англійська">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="Французька">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="Іспанська">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

Форми множини з роздільником pipe є власним форматом vue-i18n, а не ICU. `t` приймає будь-який рядок, якщо ви не передасте generic схеми повідомлень до `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="Англійська">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="Французька">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="Іспанська">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Синтаксис Fluent добре підтримує множину та граматичні варіанти. Ідентифікатори повідомлень є нетипізованими рядками, а плагін для Vite додає всі локалі в бандл кожної сторінки.

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

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

Кожне повідомлення є згенерованою типізованою функцією, тому відсутній ключ спричиняє помилку імпорту. Папка `paraglide/` генерується у вашому репозиторії та оновлюється під час кожної зміни.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

Усі локалі в одному файлі поруч із компонентом. Типи генеруються під час збирання, тому для `title` працює автодоповнення, а друкарська помилка призведе до збою `vue-tsc`. `<title />` рендерить вузол, доступний для візуального редактора; `{{ items(props.count) }}` повертає звичайний рядок.

  </Tab>
</Tabs>

Вже використовуєте `vue-i18n`? [Адаптер сумісності `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/vue-i18n.md) створює alias для пакета на рівні бандлера, тому `useI18n()`, `$t`, множина через pipe та `v-t` продовжують працювати, поки Intlayer надає контент. [Посібник із міграції](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_vue-i18n_to_intlayer.md) пояснює подальшу відмову від адаптера, також є [окремий посібник для Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_nuxtjs_i18n_to_intlayer.md).

## Перш ніж зробити вибір

Таблиця функціоналу показує, що бібліотека вміє сьогодні. Наведені нижче пункти описують, яким буде її щоденне використання.

**Перевірте активність репозиторію.**

Коміти, час реакції на issues та наявність мінорного релізу в поточному році. Продумана архітектура без супроводу — це неминуча майбутня міграція.

**Не обирайте за кількістю завантажень в npm.**

Найчастіше встановлюють бібліотеку, яка з'явилася першою, а не ту, що найкраще підходить для кодової бази Vue у 2026 році. Завантаження відображають історію, а не відповідність вимогам.

![Рейтинг бібліотек JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Дізнайтеся, хто фінансує розробку та що вони продають.**

`vue-i18n` підтримується Crowdin, як і `next-intl` та `svelte-i18n`. `i18next` підтримується Locize. Tolgee, Paraglide (inlang) та Intlayer розвивають власні платформи. Постачальник, чий дохід базується на платному хостингу перекладів, має мало стимулів робити переклад безкоштовним всередині вашого інструментарію. Intlayer є єдиним серед них, хто надає AI-переклад через CLI з використанням вашого власного API key, а також CMS, яку можна хостити самостійно.

**Чи готова бібліотека до взаємодії з AI-агентами?**

Агенти все ще стикаються з труднощами в i18n: вони забувають локалі, вигадують неіснуючі ключі та плутають синтаксис повідомлень. Чи надає бібліотека [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md) або [сервер MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md), щоб агент міг переглядати, заповнювати та тестувати контент? І чи оптимізовано завантаження контенту за замовчуванням, чи комусь доведеться щокварталу перевіряти namespaces та lazy imports?

**Типобезпека з коробки.**

Не "можна типізувати за допомогою додаткового коду", а "неправильний ключ призводить до помилки `tsc` одразу після встановлення". Перевірте поведінку з ключем, якого не існує, та з локаллю, де відсутній один переклад.

**Виявлення невикористовуваного контенту.**

Каталоги лише розростаються. Збірка Intlayer видаляє невикористовувані поля та записує їх у логи (`build.purge`). Paraglide досягає цього завдяки архітектурі, оскільки невикликана функція повідомлення видаляється через tree-shaking. Усі інші рішення залишають очищення на вас.

**Досвід розробника (Developer Experience).**

Час від налаштування до першого перекладеного рядка, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md) або [розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md), яке показує переклад при наведенні курсору та переходить до декларації, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для заповнення, тестування та відправки, [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) або екстрактор, який витягує захардкоджені рядки з компонентів, щоб не керувати кожним рядком ключ за ключем, а також можливість редагування контенту без участі розробників ([візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)) без відкриття pull request.

## Часті запитання

<FAQ>

<Question title="Чи залишається vue-i18n правильним вибором за замовчуванням у 2026 році?">

Для більшості додатків на Vue — так. У неї найбільша екосистема, вичерпна документація та передбачувані компроміси: важкий runtime, власний формат множини та ізоляція за маршрутами, яку вам потрібно налаштовувати та контролювати самостійно.

</Question>

<Question title="Чи варто використовувати @nuxtjs/i18n, чи налаштувати vue-i18n власноруч у Nuxt?">

Використовуйте модуль, якщо тільки ваша маршрутизація не є нестандартною або додаток не має всього кілька сторінок. Ручне налаштування означає самостійну реалізацію локалізованих маршрутів, middleware, `hreflang` та sitemap, що вимагає більше зусиль, ніж здається.

</Question>

<Question title="Чи потрібна мені бібліотека на основі компілятора?">

Лише якщо розмір bundle, SSR payload, згенеровані типи або перевірка відсутніх ключів під час збирання є критичними вимогами. Стаття про [компіляторний та декларативний i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md) пояснює можливості компіляторів і випадки, де вони можуть бути неоптимальними.

</Question>

<Question title="Чи впливає вибір бібліотеки на SEO?">

Опосередковано. Пошукові роботи аналізують маршрутизацію, `hreflang`, `<html lang>` і наявність тексту у відрендереному на сервері HTML. Перегляньте [посібник із hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Додаткові матеріали

- [Бенчмарк Vue i18n: розмір bundle, витоки та час перемикання локалі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/vue.md)
- [Vue i18n: як працює vue-i18n та де виникають проблеми](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/vue.md) та [публікація про Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n проти Intlayer: детальне порівняння функцій](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer.md) та [бенчмарк vue-i18n проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/vue-i18n_vs_intlayer_benchmark.md)
- [Чи застарів vue-i18n?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/is_vue-i18n_outdated.md)
- [Історія JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)
- [Компіляторний чи декларативний i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md)
- [Покомпонентний чи централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md)
- [Налаштування i18n у додатку Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md) та в [додатку Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nuxt.md)
- Аналогічні посібники для [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_svelte_i18n_library.md) та [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_solid_i18n_library.md)
