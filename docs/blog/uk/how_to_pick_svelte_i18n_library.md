---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "Як вибрати правильну бібліотеку i18n для Svelte у 2026 році"
description: Практичний посібник з інтернаціоналізації для Svelte та SvelteKit. На які запитання відповісти перед порівнянням svelte-i18n, Paraglide, typesafe-i18n, wuchale та Intlayer, і скільки кожен вибір коштує у плані розміру bundle, типізації та безпеки SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte інтернаціоналізація
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - порівняння бібліотек i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# Як вибрати правильну бібліотеку i18n для Svelte

У Svelte немає вбудованих інструментів для i18n. Жодного `$t`, жодного примітиву локалі, жодного формату повідомлень. Кожен варіант, це стороннє рішення, і саме в екосистемі Svelte інтернаціоналізація часу компіляції (compile-time i18n) просунулася найдалі, тому кандидати відрізняються один від одного сильніше, ніж у React або Vue.

Цей посібник перелічує запитання, на які слід відповісти спочатку, а потім зіставляє відповіді з `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale` та Intlayer для Vite + Svelte і для SvelteKit.

![Екосистема бібліотек i18n для Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## Table of Contents

<TOC/>

## Шість запитань перед порівнянням бібліотек

1. **Vite SPA чи SvelteKit?** В SPA модуль-рівневий store (module-level store) є правильним рішенням: одна вкладка, один користувач, одна локаль. У SvelteKit той самий singleton розділяється між паралельними запитами на сервері, і запит B відрендериться мовою запиту A. Бібліотека або надає вам ізольовану структуру на рівні запиту (context, `locals`), або залишає це вам.
2. **Хто пише переклади?** Розробники, TMS, агенція, що надає рядки ICU, або AI-пайплайн. `svelte-i18n` підтримує ICU. Paraglide та `typesafe-i18n` використовують власний синтаксис. Обирайте відповідно до постачальника.
3. **Скільки локалей і сторінок?** Дві локалі та п'ять сторінок можуть надсилати все одразу. Десять локалей і сорок маршрутів не можуть, і різниця між runtime-каталогами та скомпільованими повідомленнями стає головною статтею витрат.
4. **Чи потрібна типізація ключів?** `$_("cart.totl")`, це помилка під час виконання в `svelte-i18n`. Бібліотеки часу компіляції роблять це помилкою типів за своєю структурою.
5. **Svelte 4 stores чи Svelte 5 runes?** Runes змінюють синтаксис стану локалі, але не проблему розділення стану. Проте `$state` у файлі `.ts` компілюється у звичайну змінну, тому runtime бібліотеки має підтримувати runes, якщо ви використовуєте Svelte 5.
6. **Чи готові ви до згенерованих файлів у репозиторії?** Paraglide та `typesafe-i18n` генерують JavaScript або TypeScript безпосередньо у ваше дерево сирцевого коду. Для деяких команд це прийнятно, інші ж отримують конфлікти злиття (merge conflicts) у кожній паралельній гілці.

Запишіть відповіді. Усе викладене нижче посилатиметься на них.

## Загальна картина

i18n для Svelte з'явився пізніше, ніж для React або Vue, і одразу перейшов до хвиль часу компіляції.

![Історія бібліотек i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="Словники під час виконання (2019–2020): svelte-i18n, sveltekit-i18n">

JSON-каталоги, ICU парситься у браузері через `intl-messageformat`, локаль у stores на рівні модулів (`$locale`, `$_`). Найбільш поширений підхід, гарна документація, налаштування SSR залишається за вами.

</Accordion>
<Accordion header="Згенеровані типи (2020–2022): typesafe-i18n">

Генератор відстежує ваші каталоги та створює типізовані аксесори (`$LL.cart.total()`). Надійна модель, згенеровані файли в репозиторії, але репозиторій останнім часом розвивається повільно.

</Accordion>
<Accordion header="Компілятор і колокований контент (2022–2026): Paraglide, wuchale, Intlayer">

Paraglide компілює кожне повідомлення в окремо експортовану функцію, завдяки чому збирач через tree-shaking видаляє все, що маршрут ніколи не викликає. `wuchale` витягує рядки з розмітки під час збирання. Intlayer оголошує контент для кожного компонента окремо та генерує типи й словники на рівні компонентів.

</Accordion>
</AccordionGroup>

[Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md) детально розглядає кожну хвилю.

## Рішення, яке має найбільше значення: де живе контент і коли він завантажується

Два структурні вибори пояснюють більшу частину різниці в розмірі bundle між конфігураціями:

- **Централізований або ізольований (scoped) контент.** Один `locales/en.json` на весь застосунок або окреме оголошення для кожного компонента.
- **Статичний чи динамічний імпорт.** Усе на старті або активна локаль (а в ідеалі й активний маршрут), завантажена за вимогою.

Графік оцінює обсяг переданих даних для теоретичного застосунку від 1 до 10 сторінок, перекладеного на 1–10 локалей, з приблизно 30 КБ тексту на сторінку.

![Теоретичний витік контенту за архітектурою](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n` за замовчуванням розташовується у верхньому лівому куті: `register("fr", () => import("./fr.json"))` забезпечує динамічне завантаження для кожної локалі, але каталог локалі є єдиним об'єктом, і його завантаження підтягує тексти кожної сторінки. Paraglide є цікавим випадком: оскільки кожне повідомлення є окремим експортом, tree-shaking дає оптимізацію за сторінками безкоштовно, і [бенчмарк Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/svelte.md) підтверджує, що це працює, як заявлено, на Vite + Svelte (на відміну від бенчмарків React і Next.js). Intlayer досягає того ж результату завдяки оголошенням на рівні компонентів.

Якщо вашою відповіддю на запитання 3 було «багато сторінок», надайте цьому розділу більшої ваги, ніж будь-яким уподобанням щодо API. Стаття про [покомпонентний та централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md) розглядає аспект підтримки цього ж компромісу.

## Кандидати

Розміри бібліотек взяті з [бенчмарку Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/svelte.md): store плюс аксесор у порожньому компоненті після бандлінгу, tree-shaking та мініфікації для застосунку на 10 сторінок і 10 локалей. Контент вимірюється окремо.

| Бібліотека      | Де зберігаються повідомлення            | Стан локалі                                            | Типобезпечність                     | Формат повідомлень            | Розділення за маршрутами (Per-route) | Розмір бібліотеки                                        |
| :-------------- | :-------------------------------------- | :----------------------------------------------------- | :---------------------------------- | :---------------------------- | :----------------------------------- | :------------------------------------------------------- |
| `svelte-i18n`   | JSON-каталоги для кожної локалі         | Svelte store на рівні модуля                           | 2/5 — Ручне union-оголошення        | ICU                           | Ні                                   | ~16.6 кБ                                                 |
| `typesafe-i18n` | Згенеровані TS-модулі                   | Store-адаптер                                          | 4/5 — Згенеровані                   | Власний                       | Частково                             | Невеликий                                                |
| Paraglide       | Проєкт inlang, скомпільований у функції | Читається при кожному виклику з cookie, URL чи storage | 3.5/5 — Згенеровані                 | Власний                       | Так, через tree-shaking              | Майже нульовий (за рахунок згенерованого коду в проєкті) |
| `wuchale`       | Витягується з розмітки під час збирання | Store                                                  | Н/Д (без ключів)                    | Власний                       | Так                                  | ~30.7 kB                                                 |
| Intlayer        | `.content.ts` поруч із компонентом      | Context плюс store, підтримка runes                    | 5/5 — Згенеровані, за замовчуванням | Intlayer (+ ICU, i18next, PO) | Так, для кожного компонента          | ~3.6 kB                                                  |

> Показники є зрізом для версій із бенчмарку. Запустіть його на власному застосунку, перш ніж приймати рішення лише на основі розміру.
> Типобезпечність: 5/5 означає, що ключі, параметри та кожна локаль перевіряються без ручного налаштування, включаючи форматувальники URL та хелпери.

Майже нульовий розмір бібліотеки Paraglide досягається конструктивно: runtime генерується безпосередньо у ваш репозиторій. Intlayer потребує `vite-intlayer`, тому він не може працювати без етапу збирання (build step).

## Зіставте ваші відповіді з бібліотекою

<AccordionGroup>
<Accordion header="Vite SPA, невелика команда, кілька локалей">

`svelte-i18n`. Це найбільш задокументований варіант, `$_` природно виглядає в розмітці, а `register` разом із `waitLocale()` забезпечує ліниве завантаження (lazy loading) для кожної локалі. Заблокуйте перший рендеринг за допомогою `isLoading`, інакше користувачі побачать сирі ключі. Якщо в майбутньому в застосунку може з'явитися серверний рендеринг, помістіть локаль у контекст Svelte із самого початку замість використання module store; зараз це нічого не коштує, але позбавить від помилки, яка проявляється лише в production.

</Accordion>
<Accordion header="SvelteKit з маршрутизацією локалей та SSR">

Проблема розділення стану вирішує цей вибір. `svelte-i18n` працює на SvelteKit, але налаштування для кожного запиту (`hooks.server.ts`, `locals`, `load`, потім `setContext`) вам доведеться писати самостійно, і тут легко припуститися непомітної помилки. Paraglide постачається з інтеграцією для SvelteKit, яка керує маршрутизацією та зчитує локаль під час кожного виклику, уникаючи singleton. Intlayer встановлює локаль із даних `load` у context. Стаття про [SvelteKit i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/sveltekit.md) пояснює вибір між `[[lang]]` та `reroute`, який варто зробити до вибору бібліотеки.

</Accordion>
<Accordion header="Переклади надходять від TMS або агенції у форматі ICU">

`svelte-i18n` нативно підтримує ICU через `intl-messageformat`, тому безпосередньо інтегрується з більшістю сервісів. Paraglide та `typesafe-i18n` використовують власний синтаксис і потребують конвертації. Підтримка ICU в Intlayer є частковою, тому якщо ви вже отримуєте ICU-рядки, вважайте це блокуючим фактором.

</Accordion>
<Accordion header="Розмір bundle є головним обмеженням">

Рішення часу компіляції (Compile-time). Tree-shaking у Paraglide працює на Vite + Svelte, а витрати на бібліотеку майже нульові. Словники Intlayer на рівні компонентів дають такий самий результат без згенерованих файлів у репозиторії. `svelte-i18n` постачає парсер ICU разом із повним каталогом і займає приблизно в 4.5 раза більше місця, ніж `svelte-intlayer` у бенчмарку, ще до додавання контенту.

</Accordion>
<Accordion header="Типобезпека є обов'язковою">

Будь-який варіант, крім чистого `svelte-i18n`, де єдиною типізацією є написане вручну union-оголошення, яке миттєво втрачає синхронізацію з JSON. `typesafe-i18n`, Paraglide та Intlayer генерують типи з контенту. Перевірте активність репозиторію `typesafe-i18n` перед тим, як переводити на нього кодову базу. Стаття про [виявлення відсутніх перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/detecting_missing_translations.md) порівнює, що кожен інструмент відловлює під час збирання.

</Accordion>
<Accordion header="Ви не хочете бачити згенеровані файли в репозиторії">

Це виключає Paraglide та `typesafe-i18n`. `svelte-i18n` та Intlayer зберігають свій результат у `node_modules` або в директорії збирання; з Intlayer файли `.content.ts` є написаним вручну сирцевим кодом, а скомпільовані словники та типи зберігаються в `.intlayer/` та ігноруються системою контролю версій.

</Accordion>
<Accordion header="Переклади створюватимуться за допомогою AI">

У такому разі централізований JSON більше не має споживача, який би його виправдовував. Колокований контент разом із CLI, що заповнює відсутні локалі, є коротшим шляхом. Команда `fill` в Intlayer працює з вашим власним API-ключем (OpenAI, Anthropic, Mistral, Gemini) і повторно перекладає лише те, що змінилося. Екосистема inlang у Paraglide пропонує хмарні аналоги за власними тарифними планами.

</Accordion>
</AccordionGroup>

## Слабкі сторони кожної бібліотеки

- **`svelte-i18n`**: найважча серед усіх, відсутність типів для ключів, відсутність розділення за маршрутами (per-route splitting), store на рівні модуля, що призводить до витоку стану між запитами на SvelteKit, якщо ви не налаштуєте context власноруч.
- **`typesafe-i18n`**: фоновий процес відстеження (watcher), згенеровані файли в репозиторії та репозиторій, який останнім часом розвивається повільно.
- **Paraglide**: згенеровані файли фіксуються в репозиторії та перегенеровуються перед кожним push, конфлікти злиття в паралельних гілках, а локаль зчитується з cookie або storage при кожному виклику повідомлення, а не зі store, що створює зайве навантаження при зміні локалі.
- **`wuchale`**: цікава ідея вилучення рядків, але проєкт ще на ранній стадії. У бенчмарку React виникли проблеми з реактивністю, які вимагали примусового ререндерингу провайдера, а документація є досить лаконічною.
- **Intlayer**: обов'язковий плагін для збирання, менша екосистема, часткова підтримка ICU та контент, розподілений по кодовій базі за дизайном, тому експорт єдиного JSON для перекладача потребує додаткових інструментів.

## Як кожен варіант виглядає в коді

Один і той самий компонент, підсумок кошика із заголовком і формою множини, написаний для кожного кандидата. Найцікавіше тут не розмітка, а те, де живе контент, як зберігається локаль і що відомо системі перевірки типів.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

ICU через `intl-messageformat`, локаль у store на рівні модуля. `$_` приймає будь-який рядок; єдина типізація, це union-тип, написаний власноруч.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

Кожне повідомлення, це згенерована типізована функція, яка видаляється через tree-shaking, якщо не викликається. Папка `paraglide/` генерується у ваш репозиторій, а локаль зчитується при кожному виклику, а не зі store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Типізовані аксесори, згенеровані процесом watcher. Модель надійна; згенеровані файли живуть у репозиторії, а розвиток проєкту останнім часом сповільнився.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

Усі локалі в одному файлі поруч із компонентом. `useIntlayer` повертає readable store, тому `$content`, це звична автоматична підписка (auto-subscription), а локаль зберігається в context (безпечно для SSR), а не в глобальному module singleton.

  </Tab>
</Tabs>

Вже використовуєте `svelte-i18n`? [Адаптер сумісності `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/svelte-i18n.md) створює аліас для пакета на рівні збирача, тому `$_`, `$date`, `$number` та ваші плоскі ключі продовжують працювати, поки Intlayer надає контент.

## Перед тим як зробити вибір

Таблиця функцій показує, що бібліотека робить сьогодні. Ці пункти підкажуть, як виглядатиме робота з нею на практиці.

**Перевірте активність репозиторію.**

Коміти, час відповіді на issue та те, чи виходив останній мінорний реліз цього року. Гарна архітектура без супроводу авторів, це майбутня міграція.

**Не обирайте за кількістю завантажень з npm.**

Найчастіше встановлюють ту бібліотеку, яка з'явилася першою, а не ту, яка підходить для кодової бази Svelte у 2026 році. Кількість завантажень вимірює історію, а не відповідність вимогам.

![Рейтинг бібліотек i18n для JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**Дізнайтеся, хто фінансує підтримку і що вони продають.**

`svelte-i18n` підтримується Crowdin, як і `next-intl` та `vue-i18n`. `i18next` підтримується Locize. Tolgee, Paraglide (inlang) та Intlayer розвивають власні платформи. Постачальник, чий дохід базується на платному хостингу перекладів, мало зацікавлений у тому, щоб переклади були безкоштовними всередині вашого інструментарію. Intlayer, єдиний з усіх, хто пропонує AI-переклад через CLI з вашим власним API-ключем, а також CMS, яку можна розгорнути самостійно (self-host).

**Чи готовий інструмент до роботи з AI-агентами?**

Агенти все ще відчувають труднощі з i18n: вони забувають локалі, вигадують ключі та плутають синтаксис повідомлень. Чи надає бібліотека [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md) або [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md), щоб агент міг переглядати, заповнювати та тестувати контент? І чи оптимізовано завантаження контенту за замовчуванням, чи комусь доводиться щокварталу переглядати namespaces та lazy imports?

**Типобезпека «з коробки».**

Не «можна типізувати додатковими зусиллями», а «неправильний ключ викликає помилку `tsc` одразу після встановлення». Перевірте, що відбувається з неіснуючим ключем та з локаллю, у якій пропущено один переклад.

**Виявлення невикористаного контенту.**

Каталоги лише зростають. Збирання в Intlayer видаляє невикористані поля та записує їх у лог (`build.purge`). Paraglide досягає цього за рахунок архітектури, оскільки невикликана функція повідомлення видаляється через tree-shaking. Усі інші рішення залишають очищення на вас.

**Досвід розробника (Developer experience).**

Час налаштування до першого перекладеного рядка, [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md) або [розширення для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md), які показують переклад при наведенні та переходять до оголошення, [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md) для заповнення, тестування й публікації (push), [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) або екстрактор, який витягує захардкоджені рядки з компонентів, щоб не керувати кожним рядком ключ за ключем, а також можливість для нетехнічних спеціалістів редагувати контент ([візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)) без створення pull request.

## Часті запитання

<FAQ>

<Question title="Чи залишається svelte-i18n правильним вибором за замовчуванням у 2026 році?">

Для Vite SPA з невеликим каталогом, так. Це найбільш задокументований варіант, і сумісність з ICU важлива для багатьох команд. На SvelteKit або за наявності понад кількох десятків сторінок його недоліки (відсутність типів, відсутність ізоляції, спільний store) починають накопичуватися.

</Question>

<Question title="Чи справді працює tree-shaking у Paraglide?">

На Vite + Svelte, так, бенчмарк це підтверджує. На React з TanStack Start або Next.js це не спрацювало в тому ж бенчмарку. Перевірте це на власному стеку, замість того щоб довіряти будь-якому з результатів.

</Question>

<Question title="Чи впливають runes на вибір бібліотеки?">

Вони змінюють синтаксис вашого власного стану локалі, а не проблему розділення стану. Важливо те, чи підтримує runtime бібліотеки runes у Svelte 5 і чи використовує вона context замість module store. Перевірте обидва аспекти.

</Question>

<Question title="Чи впливає вибір бібліотеки на SEO?">

Опосередковано. Для пошукових роботів важливі маршрутизація, `hreflang`, `<html lang>` і те, чи присутній текст у відрендереному сервером HTML. Дивіться [посібник з hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## Додаткові матеріали

- [Бенчмарк Svelte i18n: розмір bundle, витік та час перемикання локалі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/svelte.md)
- [Svelte i18n: stores, runes та пастка рівня модуля](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/svelte.md) і [SvelteKit i18n: маршрутизація, SSR та спільний стан](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/list_i18n_technologies/frameworks/sveltekit.md)
- [Готовий адаптер сумісності для `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/svelte-i18n.md)
- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)
- [Компілятор проти декларативного i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md)
- [Покомпонентний та централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md)
- [Як працює оптимізація bundle під час збирання](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)
- [Налаштування i18n у застосунку Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+svelte.md) та в [застосунку SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_svelte_kit.md)
- Аналогічні посібники для [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_vue_i18n_library.md) та [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_solid_i18n_library.md)
