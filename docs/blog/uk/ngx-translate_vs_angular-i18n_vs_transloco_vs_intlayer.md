---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco чи Intlayer? Порівняння i18n-бібліотек для Angular: перемикання мови в runtime, типобезпека, лінива підгрузка, множина та SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - інтернаціоналізація angular
  - ngx-translate vs transloco
  - Intlayer
  - порівняння i18n-бібліотек
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular є єдиним великим фреймворком, який постачає власний i18n, і його підхід протилежний до того, що спільнота збудувала навколо нього. `@angular/localize` перекладає під час збірки й створює по одному застосунку на кожну мову. `ngx-translate` і Transloco перекладають у runtime з JSON-файлів. Intlayer компілює контент під час збірки, але зберігає один застосунок, який перемикає мову в runtime.

Ця стаття порівнює всі чотири за тим, що на практиці визначає вибір: як перемикається локаль, де живе контент, що ловить компілятор і що завантажується в браузері.

## Зміст

<TOC/>

## Коротко

- **`@angular/localize`** (Angular i18n): нульові витрати в runtime та нативний ICU, але по одній збірці й одному деплою на локаль, а зміна мови перезавантажує застосунок.
- **`ngx-translate`**: найстаріший і найпростіший runtime-варіант. Один JSON-файл на локаль, що завантажується через HTTP, нетипізовані ключі, множина через плагін.
- **Transloco**: runtime-варіант для більших застосунків. Scopes завантажують переклади по функціональності, а екосистема плагінів охоплює ICU, форматування за локаллю та вилучення ключів.
- **Intlayer**: контент оголошується поруч із кожним компонентом, типізується під час збірки, ділиться за компонентами та за локалями, мова перемикається в runtime. Потребує кастомного esbuild-білдера.

> Щоб зрозуміти, звідки походить кожна бібліотека, прочитайте [історію i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md).

- [історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)

## Збірка чи runtime: рішення, що розділяє ринок

**`@angular/localize`** вбудовує переклади у скомпільовані шаблони. `ng build --localize` створює `dist/app/en`, `dist/app/fr` тощо, і в кожній теці лише своя мова. Нічого не завантажується й нічого не інтерпретується в runtime, тож після завантаження це найшвидший варіант. Ціна операційна: N збірок для тестування, N тек для деплою, правило на сервері чи CDN для маршрутизації `/fr/` до потрібної збірки та повне перезавантаження сторінки, коли користувач змінює мову. `ng serve` також запускає лише одну локаль за раз.

**`ngx-translate` і Transloco** зберігають одну збірку. Сервіс завантажує `fr.json` при зміні локалі, і кожен pipe чи директива перемальовується. Перемикання миттєве, але перший рендер чекає на HTTP-запит, ключі є простими рядками, а з SSR завантажувач має працювати й на сервері (абсолютні URL або файловий завантажувач, плюс `TransferState`, щоб не завантажувати двічі).

**Intlayer** також зберігає одну збірку, але контент компілюється в бандл, а не завантажується як сирий JSON. `useIntlayer()` повертає Signal, тому зміна локалі оновлює компоненти, що його читають, без перезавантаження.

Одну деталь Angular легко пропустити з runtime-бібліотеками: `DatePipe`, `CurrencyPipe` і `DecimalPipe` читають `LOCALE_ID`, який фіксується під час bootstrap. Зміна мови в `ngx-translate` не змінює формат дат і цін. Transloco розв'язує це через `@jsverse/transloco-locale`, Intlayer через `useDate`, `useNumber` і `useCurrency`, які слідують за активною локаллю. У `@angular/localize` цієї проблеми немає, бо кожна збірка має свій `LOCALE_ID`. [Посібник із форматування дат, часу та чисел](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/date_time_number_formatting_locales.md) охоплює сторону `Intl`.

- [посібник із форматування дат, часу та чисел](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/date_time_number_formatting_locales.md)

## Порівняння можливостей

|                                  | `@angular/localize`                                                | `ngx-translate`                                    | Transloco                                              | Intlayer                                                                       |
| :------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------- | :----------------------------------------------------- | :----------------------------------------------------------------------------- |
| **Коли застосовується переклад** | Під час збірки, вбудовується                                       | Runtime                                            | Runtime                                                | Компілюється під час збірки, розв'язується в runtime                           |
| **Збірок на реліз**              | По одній на локаль                                                 | Одна                                               | Одна                                                   | Одна                                                                           |
| **Зміна мови**                   | Перезавантаження в іншу збірку                                     | Миттєво                                            | Миттєво                                                | Миттєво                                                                        |
| **Де живе контент**              | Вихідний текст у шаблонах, переклади в XLIFF/JSON                  | Один JSON на локаль                                | Один JSON на локаль плюс по одному на scope            | `.content.ts` (або JSON) поруч із кожним компонентом чи централізовано         |
| **Множина / ICU**                | ✅ Нативний ICU в шаблонах                                         | ⚠️ Плагін (`ngx-translate-messageformat-compiler`) | ⚠️ Плагін (`@jsverse/transloco-messageformat`)         | ✅ `plural()` з правилами CLDR, ⚠️ ICU-рядки частково                          |
| **Типізовані ключі**             | Незастосовно, повідомленням є вихідний текст                       | ❌ Ні                                              | ❌ Ні, Keys Manager знаходить відсутні ключі через CLI | ✅ Генеруються, хибний ключ ламає `ng build`                                   |
| **Відсутні переклади**           | Попередження під час збірки або помилка з `i18nMissingTranslation` | Показує сирий ключ у runtime                       | Резервна мова в runtime, перевірка через CLI           | Позначаються TypeScript, `intlayer test` у CI                                  |
| **Лінива підгрузка**             | Не потрібна, кожна збірка містить одну локаль                      | Увесь файл локалі, поділ вручну                    | ✅ За scope (маршрут або компонент)                    | ✅ За компонентом і за локаллю                                                 |
| **Signals**                      | Незастосовно, текст статичний                                      | Pipe та Observables                                | `translateSignal()`                                    | `useIntlayer()` повертає Signal                                                |
| **Налаштування збірки**          | `ng add @angular/localize`, локалі в `angular.json`                | Немає                                              | Немає                                                  | `@angular-builders/custom-esbuild` і плагін esbuild                            |
| **Процес для перекладачів**      | ✅ XLIFF, формат, якого очікують TMS-інструменти                   | JSON                                               | JSON                                                   | `.content.ts`/JSON, sync-плагіни, візуальний редактор, ШІ-заповнення через CLI |

Деяким рядкам потрібен контекст.

**ID повідомлень у `@angular/localize`.** Без власного ID (`i18n="@@cartTitle"`) ID кожного повідомлення є хешем його вихідного тексту. Виправте одруківку в англійському тексті, і всі переклади цього повідомлення стануть осиротілими, доки перекладачі не зроблять їх знову. Задавайте власні ID з першого дня.

**Поділ у `ngx-translate`.** Завантажувач за замовчуванням тягне весь `fr.json`, тож кожна сторінка несе рядки всіх інших. Можна ділити за функціональністю кастомним завантажувачем або кількома екземплярами `TranslateService`, але ніщо цього не вимагає. Стаття [i18n за компонентами та централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md) розглядає цей компроміс.

- [i18n за компонентами та централізований i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md)

**Scopes у Transloco.** Scope це тека з JSON-файлами (`i18n/cart/en.json`), яка завантажується, коли її надає маршрут чи компонент. Це найближче до контенту за компонентами, що дають runtime-бібліотеки, і воно добре працює, доки спільні компоненти не лізуть у scope іншої функціональності.

**Білдер Intlayer.** Angular CLI не відкриває плагіни esbuild, тому Intlayer потребує `@angular-builders/custom-esbuild` в `angular.json`. Це невелика зміна, але це сторонній білдер, який треба синхронізувати з оновленнями Angular. [Посібник із налаштування Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md) показує повну конфігурацію.

- [посібник із налаштування Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md)

## Активність комітів

`@angular/localize` живе в монорепозиторії `angular/angular`, тому кількість його комітів непорівнянна й не наводиться.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Завантаження npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Завантаження відображають скоріше історію, ніж поточний вибір: `ngx-translate` досі встановлено в кожному застосунку, початому до появи Transloco, а ШІ-асистенти продовжують його радити, бо він домінує в коді, на якому вони навчалися. У 2024 році Transloco перейшов із `@ngneat/transloco` на `@jsverse/transloco`, і старий scope досі завантажують.

## Той самий компонент у кожній бібліотеці

Підсумок кошика із заголовком і множиною. Шаблон майже не змінюється, змінюється те, де живуть рядки та що про них знає компілятор.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

Англійський текст залишається в шаблоні. Перекладачі працюють із витягнутим XLIFF, і кожна локаль стає окремою збіркою. Рядки в TypeScript використовують тег `$localize`.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

ICU-множина працює лише з `ngx-translate-messageformat-compiler`, парсер за замовчуванням лише замінює `{{count}}`. `"cart.titel"` компілюється й у runtime показує сирий ключ.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

Scope `cart` завантажується під час першого рендеру компонента. Для ICU-множини потрібен `@jsverse/transloco-messageformat`. Ключі не типізовані, `transloco-keys-manager` повідомляє про відсутні й невикористані.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ uk: "Ваш кошик", en: "Your cart", fr: "Votre panier" }),
    items: t({
      uk: plural({
        one: "{{count}} товар",
        few: "{{count}} товари",
        many: "{{count}} товарів",
        other: "{{count}} товару",
      }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

Усі локалі лежать в одному файлі поруч із компонентом. Типи генеруються під час збірки, тому `content().titel` ламає `ng build`, а локаль, пропущена в `t()`, підсвічується в редакторі.

  </Tab>
</Tabs>

## Що підходить вашому застосунку

<AccordionGroup>
<Accordion header="Публічний сайт, мало інтерактиву, SEO насамперед">

`@angular/localize`. Кожна локаль це окрема збірка зі своєю URL-адресою, пререндерені сторінки приходять уже перекладеними, а i18n-runtime завантажувати не потрібно. Ціна у вигляді однієї збірки на локаль невелика, коли застосунок переважно складається з контенту, а зміна мови трапляється рідко. Поєднуйте його з правильними тегами `hreflang`, див. [посібник із hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md).

- [посібник із hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Дашборд або SaaS, де користувачі змінюють мову всередині застосунку">

Runtime-варіант. Перезавантаження в іншу збірку втрачає стан у пам'яті, а мовне меню, що перезавантажує застосунок, виглядає зламаним. `ngx-translate` вистачить для невеликого застосунку з двома-трьома локалями. Transloco надійніший вибір, коли функціональностей понад десяток, завдяки scopes.

</Accordion>
<Accordion header="Переклади надходять із TMS або від агенції">

`@angular/localize` експортує XLIFF, який читає будь-яка TMS, а вихідний текст у шаблоні дає перекладачам справжній контекст. JSON у `ngx-translate` і Transloco також широко підтримується. Переконайтеся, що ваш постачальник працює з ICU-множиною, перш ніж обирати runtime-бібліотеку, бо обом для цього потрібен плагін.

</Accordion>
<Accordion header="Великий застосунок, багато лінивих маршрутів, бюджет бандла">

Scopes Transloco або Intlayer. Обидва уникають надсилання рядків кожної функціональності на кожен маршрут. Різниця в примусовості: scope Transloco це конвенція, а словник Intlayer потрапляє в бандл лише там, де його імпортує `useIntlayer()`. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md).

- [оптимізація бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)
- [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Типобезпека є вимогою">

Типізує ключі з коробки лише Intlayer. У `ngx-translate` і Transloco одруківка в ключі компілюється й у продакшені відображається як сирий ключ. Transloco Keys Manager може зловити її в CI, що краще, ніж нічого, але не дорівнює помилці компіляції. Стаття [виявлення відсутніх перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/detecting_missing_translations.md) порівнює підходи.

- [виявлення відсутніх перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/detecting_missing_translations.md)

</Accordion>
<Accordion header="Переклади створюватиме ШІ">

Контент поруч із кодом плюс CLI, що заповнює відсутні локалі, це найкоротший шлях. [Команда `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) Intlayer працює з вашим власним API-ключем і перекладає наново лише те, що змінилося. З каталогами XLIFF чи JSON цей самий цикл доведеться писати самим.

- [команда `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md)

</Accordion>
</AccordionGroup>

## Де кожна з них поступається

- **`@angular/localize`**: одна збірка й один деплой на локаль, перезавантаження при зміні мови, хешовані ID, через які переклади осиротіють при зміні вихідного тексту, та неможливість завантажити переклади з CMS після збірки без хитрощів під час bootstrap.
- **`ngx-translate`**: нетипізовані ключі, множина та ICU через плагін, повний файл локалі на кожній сторінці, нечистий pipe, що переобчислюється при кожній перевірці змін, та відсутність обробки `LOCALE_ID` для дат і чисел.
- **Transloco**: нетипізовані ключі, ICU через плагін і scopes, які є конвенцією, а не гарантією. Кілька плагінів, які треба збирати, заради того, що `@angular/localize` дає нативно.
- **Intlayer**: сторонній білдер в `angular.json`, менша спільнота Angular, ніж в інших трьох, часткова підтримка ICU та контент, за задумом розкиданий по codebase, тому вивантаження одного файлу для перекладача потребує [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) або CLI.

- [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)

## Міграція з ngx-translate

[Адаптер сумісності `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate.md) зберігає працездатність `TranslateService`, pipe `translate` та директиви `[translate]`, поки контент віддає Intlayer, тож шаблони можна переносити по одному. [Посібник із міграції](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_ngx-translate_to_intlayer.md) розбирає це крок за кроком. Для Transloco чи `@angular/localize` [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) може залишати наявні JSON-каталоги джерелом істини на час переходу.

- [адаптер сумісності `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate.md)
- [посібник із міграції](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_ngx-translate_to_intlayer.md)
- [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)

## Поширені запитання

<FAQ>

<Question title="Чи досі підтримується ngx-translate?">

Так. Після років низької активності проєкт у 2024 році отримав нового мейнтейнера, і відтоді вийшли standalone API, як-от `provideTranslateService`. Його будова не змінилася: JSON у runtime, рядкові ключі, множина через плагін.

</Question>

<Question title="ngx-translate чи Transloco для нового застосунку на Angular?">

Transloco, якщо застосунок не маленький. Він покриває те, що робить `ngx-translate`, і додає scopes, помічники для signals, рекомендації щодо SSR та інструменти для ключів. API двох бібліотек досить близькі, щоб перехід пізніше був здебільшого механічним, але немає причин починати з простішої, якщо застосунок зростатиме.

</Question>

<Question title="Чи може @angular/localize перемикати мову без перезавантаження?">

Не так, як задумано. Переклади вбудовуються під час збірки, тому інша мова означає іншу збірку. Можна викликати `loadTranslations()` перед bootstrap, щоб завантажити переклади в runtime, але для зміни мови все одно доведеться перезапускати застосунок.

</Question>

<Question title="Який варіант найкращий для SEO в Angular?">

Бібліотека важить менше, ніж маршрутизація: по одній URL-адресі на локаль, теги `hreflang`, `<html lang>` і перекладений HTML, відрендерений на сервері. `@angular/localize` отримує все це майже безкоштовно, бо кожна локаль це окрема збірка. Runtime-бібліотекам для цього потрібні SSR і локалізовані маршрути. Див. [інтернаціоналізація та SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md).

- [інтернаціоналізація та SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md)

</Question>

<Question title="Чи працює Intlayer з Analog?">

Так, через Vite. Див. [посібник з Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_analog.md).

- [посібник з Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_analog.md)

</Question>

</FAQ>

## Що почитати далі

- [Налаштування Intlayer в Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md)
- [Налаштування Intlayer в Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_19.md)
- [Бенчмарки i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md)
- [Компілятор і декларативний i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/compiler_vs_declarative_i18n.md)
- [Формат повідомлень ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/icu_message_format.md)
- [Адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

Те саме порівняння для

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/how_to_pick_solid_i18n_library.md)
