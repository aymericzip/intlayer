---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco или Intlayer? Сравнение i18n-библиотек для Angular: переключение языка в runtime, типобезопасность, ленивая загрузка, множественное число и SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - интернационализация angular
  - ngx-translate vs transloco
  - Intlayer
  - сравнение i18n-библиотек
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular остаётся единственным крупным фреймворком со своим собственным i18n, и подход у него противоположен тому, что сообщество построило вокруг него. `@angular/localize` переводит на этапе сборки и создаёт по одному приложению на каждый язык. `ngx-translate` и Transloco переводят в runtime из JSON-файлов. Intlayer компилирует контент на этапе сборки, но сохраняет единое приложение, которое переключает язык в runtime.

В этой статье все четыре сравниваются по тому, что на практике определяет выбор: как переключается локаль, где хранится контент, что ловит компилятор и что загружается в браузере.

## Содержание

<TOC/>

## Коротко

- **`@angular/localize`** (Angular i18n): нулевые затраты в runtime и нативный ICU, но по одной сборке и одному деплою на локаль, а смена языка перезагружает приложение.
- **`ngx-translate`**: самый старый и простой runtime-вариант. Один JSON-файл на локаль, загружаемый по HTTP, нетипизированные ключи, множественное число через плагин.
- **Transloco**: runtime-вариант для крупных приложений. Scopes подгружают переводы по функциональности, а экосистема плагинов покрывает ICU, форматирование по локали и извлечение ключей.
- **Intlayer**: контент объявляется рядом с каждым компонентом, типизируется на этапе сборки, разбивается по компонентам и по локалям, язык переключается в runtime. Требует кастомный esbuild-билдер.

> Чтобы понять, откуда взялась каждая библиотека, прочитайте [историю i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md).

- [история i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)

## Сборка или runtime: решение, которое делит рынок

**`@angular/localize`** встраивает переводы в скомпилированные шаблоны. `ng build --localize` создаёт `dist/app/en`, `dist/app/fr` и так далее, и в каждой папке только свой язык. Ничего не загружается и ничего не интерпретируется в runtime, поэтому после загрузки это самый быстрый вариант. Цена операционная: N сборок для тестирования, N папок для деплоя, правило на сервере или CDN для маршрутизации `/fr/` в нужную сборку и полная перезагрузка страницы, когда пользователь меняет язык. `ng serve` тоже запускает только одну локаль за раз.

**`ngx-translate` и Transloco** сохраняют одну сборку. Сервис загружает `fr.json` при смене локали, и каждый pipe или директива перерисовывается. Переключение мгновенное, но первый рендер ждёт HTTP-запрос, ключи являются простыми строками, а при SSR загрузчик должен работать и на сервере (абсолютные URL или файловый загрузчик плюс `TransferState`, чтобы не загружать дважды).

**Intlayer** тоже сохраняет одну сборку, но контент компилируется в бандл, а не загружается как сырой JSON. `useIntlayer()` возвращает Signal, поэтому смена локали обновляет компоненты, которые его читают, без перезагрузки.

Одну деталь Angular легко упустить при использовании runtime-библиотек: `DatePipe`, `CurrencyPipe` и `DecimalPipe` читают `LOCALE_ID`, который фиксируется при bootstrap. Смена языка в `ngx-translate` не меняет формат дат и цен. Transloco решает это через `@jsverse/transloco-locale`, Intlayer через `useDate`, `useNumber` и `useCurrency`, которые следуют активной локали. У `@angular/localize` этой проблемы нет, поскольку у каждой сборки свой `LOCALE_ID`. [Руководство по форматированию дат, времени и чисел](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/date_time_number_formatting_locales.md) охватывает сторону `Intl`.

- [руководство по форматированию дат, времени и чисел](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/date_time_number_formatting_locales.md)

## Сравнение возможностей

|                               | `@angular/localize`                                             | `ngx-translate`                                    | Transloco                                                | Intlayer                                                                       |
| :---------------------------- | :-------------------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **Когда применяется перевод** | При сборке, встраивается                                        | Runtime                                            | Runtime                                                  | Компилируется при сборке, разрешается в runtime                                |
| **Сборок на релиз**           | По одной на локаль                                              | Одна                                               | Одна                                                     | Одна                                                                           |
| **Смена языка**               | Перезагрузка в другую сборку                                    | Мгновенно                                          | Мгновенно                                                | Мгновенно                                                                      |
| **Где хранится контент**      | Исходный текст в шаблонах, переводы в XLIFF/JSON                | Один JSON на локаль                                | Один JSON на локаль плюс по одному на scope              | `.content.ts` (или JSON) рядом с каждым компонентом либо централизованно       |
| **Plurals / ICU**             | ✅ Нативный ICU в шаблонах                                      | ⚠️ Плагин (`ngx-translate-messageformat-compiler`) | ⚠️ Плагин (`@jsverse/transloco-messageformat`)           | ✅ `plural()` с правилами CLDR, ⚠️ ICU-строки частично                         |
| **Типизированные ключи**      | Неприменимо, сообщением служит исходный текст                   | ❌ Нет                                             | ❌ Нет, Keys Manager находит пропущенные ключи через CLI | ✅ Генерируются, неверный ключ ломает `ng build`                               |
| **Отсутствующие переводы**    | Предупреждение при сборке или ошибка с `i18nMissingTranslation` | Показывает сырой ключ в runtime                    | Резервный язык в runtime, проверка через CLI             | Подсвечиваются TypeScript, `intlayer test` в CI                                |
| **Ленивая загрузка**          | Не нужна, каждая сборка содержит одну локаль                    | Весь файл локали, разбиение вручную                | ✅ По scope (маршрут или компонент)                      | ✅ По компоненту и по локали                                                   |
| **Signals**                   | Неприменимо, текст статичен                                     | Pipe и Observables                                 | `translateSignal()`                                      | `useIntlayer()` возвращает Signal                                              |
| **Настройка сборки**          | `ng add @angular/localize`, локали в `angular.json`             | Нет                                                | Нет                                                      | `@angular-builders/custom-esbuild` и плагин esbuild                            |
| **Процесс для переводчиков**  | ✅ XLIFF, формат, которого ждут TMS-инструменты                 | JSON                                               | JSON                                                     | `.content.ts`/JSON, sync-плагины, визуальный редактор, ИИ-заполнение через CLI |

Некоторым строкам нужен контекст.

**ID сообщений в `@angular/localize`.** Без собственного ID (`i18n="@@cartTitle"`) ID каждого сообщения является хешем его исходного текста. Исправьте опечатку в английском тексте, и все переводы этого сообщения станут осиротевшими, пока переводчики не сделают их заново. Задавайте собственные ID с первого дня.

**Разбиение в `ngx-translate`.** Загрузчик по умолчанию скачивает весь `fr.json`, так что каждая страница несёт строки всех остальных. Можно разбить по функциональности с помощью кастомного загрузчика или нескольких экземпляров `TranslateService`, но ничто этого не обеспечивает. Статья [i18n по компонентам и централизованный i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md) разбирает этот компромисс.

- [i18n по компонентам и централизованный i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md)

**Scopes в Transloco.** Scope это папка с JSON-файлами (`i18n/cart/en.json`), которая загружается, когда её предоставляет маршрут или компонент. Это самое близкое к контенту по компонентам, что дают runtime-библиотеки, и оно хорошо работает, пока общие компоненты не лезут в scope другой функциональности.

**Билдер Intlayer.** Angular CLI не предоставляет плагины esbuild, поэтому Intlayer требует `@angular-builders/custom-esbuild` в `angular.json`. Это небольшое изменение, но это сторонний билдер, который нужно синхронизировать с обновлениями Angular. [Руководство по настройке Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_angular_21.md) показывает полную конфигурацию.

- [руководство по настройке Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_angular_21.md)

## Активность коммитов

`@angular/localize` живёт в монорепозитории `angular/angular`, поэтому число его коммитов несопоставимо и не приводится.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## Загрузки npm

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Загрузки отражают скорее историю, чем текущий выбор: `ngx-translate` до сих пор установлен в каждом приложении, начатом до появления Transloco, а ИИ-ассистенты продолжают его советовать, потому что он доминирует в коде, на котором они обучались. В 2024 году Transloco перешёл с `@ngneat/transloco` на `@jsverse/transloco`, и старый scope по-прежнему скачивают.

## Один и тот же компонент в каждой библиотеке

Сводка корзины с заголовком и множественным числом. Шаблон почти не меняется, меняется то, где живут строки и что о них знает компилятор.

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

Английский текст остаётся в шаблоне. Переводчики работают с извлечённым XLIFF, и каждая локаль становится отдельной сборкой. Строки в TypeScript используют тег `$localize`.

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

ICU-plural работает только с `ngx-translate-messageformat-compiler`, парсер по умолчанию лишь заменяет `{{count}}`. `"cart.titel"` компилируется и в runtime отображает сырой ключ.

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

Scope `cart` загружается при первом рендере компонента. Для ICU-plurals нужен `@jsverse/transloco-messageformat`. Ключи не типизированы, `transloco-keys-manager` сообщает о пропущенных и неиспользуемых.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ ru: "Ваша корзина", en: "Your cart", fr: "Votre panier" }),
    items: t({
      ru: plural({
        one: "{{count}} товар",
        few: "{{count}} товара",
        many: "{{count}} товаров",
        other: "{{count}} товара",
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

Все локали лежат в одном файле рядом с компонентом. Типы генерируются при сборке, поэтому `content().titel` ломает `ng build`, а локаль, пропущенная в `t()`, подсвечивается в редакторе.

  </Tab>
</Tabs>

## Что подходит вашему приложению

<AccordionGroup>
<Accordion header="Публичный сайт, мало интерактива, SEO в приоритете">

`@angular/localize`. Каждая локаль это отдельная сборка со своим URL, пререндеренные страницы приходят уже переведёнными, а i18n-runtime загружать не нужно. Цена в виде одной сборки на локаль невелика, когда приложение в основном состоит из контента, а смена языка бывает редко. Сочетайте его с правильными тегами `hreflang`, см. [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

- [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Дашборд или SaaS, где пользователи переключают язык внутри приложения">

Runtime-вариант. Перезагрузка в другую сборку теряет состояние в памяти, а языковое меню, которое перезагружает приложение, выглядит сломанным. `ngx-translate` достаточно для небольшого приложения с двумя-тремя локалями. Transloco надёжнее выбирать, когда функциональностей больше десятка, благодаря scopes.

</Accordion>
<Accordion header="Переводы приходят из TMS или от агентства">

`@angular/localize` экспортирует XLIFF, который читает любая TMS, а исходный текст в шаблоне даёт переводчикам реальный контекст. JSON у `ngx-translate` и Transloco тоже широко поддерживается. Убедитесь, что ваш подрядчик умеет работать с ICU-plurals, прежде чем выбирать runtime-библиотеку, поскольку обеим для этого нужен плагин.

</Accordion>
<Accordion header="Крупное приложение, много ленивых маршрутов, бюджет на бандл">

Scopes Transloco или Intlayer. Оба избегают отправки строк каждой функциональности на каждый маршрут. Разница в принудительности: scope Transloco это соглашение, а словарь Intlayer попадает в бандл только там, где его импортирует `useIntlayer()`. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md).

- [оптимизация бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)
- [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Типобезопасность обязательна">

Ключи из коробки типизирует только Intlayer. В `ngx-translate` и Transloco опечатка в ключе компилируется и в продакшене показывается как сырой ключ. Transloco Keys Manager может поймать её в CI, что лучше, чем ничего, но не равно ошибке компиляции. Статья [обнаружение отсутствующих переводов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md) сравнивает подходы.

- [обнаружение отсутствующих переводов](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/detecting_missing_translations.md)

</Accordion>
<Accordion header="Переводы будет делать ИИ">

Контент рядом с кодом плюс CLI, заполняющий недостающие локали, это кратчайший путь. [Команда `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) Intlayer работает с вашим собственным API-ключом и переводит заново только то, что изменилось. С каталогами XLIFF или JSON этот же цикл придётся писать самим.

- [команда `fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md)

</Accordion>
</AccordionGroup>

## Где каждая из них уступает

- **`@angular/localize`**: одна сборка и один деплой на локаль, перезагрузка при смене языка, хешированные ID, из-за которых переводы становятся осиротевшими при изменении исходного текста, и невозможность загрузить переводы из CMS после сборки без хитростей при bootstrap.
- **`ngx-translate`**: нетипизированные ключи, plurals и ICU через плагин, полный файл локали на каждой странице, нечистый pipe, пересчитываемый при каждой проверке изменений, и отсутствие работы с `LOCALE_ID` для дат и чисел.
- **Transloco**: нетипизированные ключи, ICU через плагин и scopes, которые являются соглашением, а не гарантией. Несколько плагинов, которые нужно собирать, ради того, что `@angular/localize` даёт нативно.
- **Intlayer**: сторонний билдер в `angular.json`, более малочисленное сообщество Angular, чем у остальных трёх, частичная поддержка ICU и контент, по замыслу разбросанный по codebase, поэтому выгрузка одного файла для переводчика требует [sync JSON плагин](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) или CLI.

- [sync JSON плагин](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md)

## Миграция с ngx-translate

[Адаптер совместимости `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/ngx-translate.md) сохраняет работоспособность `TranslateService`, pipe `translate` и директивы `[translate]`, пока контент отдаёт Intlayer, поэтому шаблоны можно переносить по одному. [Руководство по миграции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_ngx-translate_to_intlayer.md) разбирает это по шагам. Для Transloco или `@angular/localize` [sync JSON плагин](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) может сохранять существующие JSON-каталоги источником истины на время перехода.

- [адаптер совместимости `@intlayer/ngx-translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/ngx-translate.md)
- [руководство по миграции](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_ngx-translate_to_intlayer.md)
- [sync JSON плагин](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md)

## Часто задаваемые вопросы

<FAQ>

<Question title="Поддерживается ли ещё ngx-translate?">

Да. После лет низкой активности у проекта в 2024 году появился новый мейнтейнер, и с тех пор вышли standalone API, такие как `provideTranslateService`. Его устройство не изменилось: JSON в runtime, строковые ключи, plurals через плагин.

</Question>

<Question title="ngx-translate или Transloco для нового приложения на Angular?">

Transloco, если только приложение не маленькое. Он покрывает то, что делает `ngx-translate`, и добавляет scopes, помощники для signals, рекомендации по SSR и инструменты для ключей. API двух библиотек достаточно близки, чтобы переход позже был в основном механическим, но нет причин начинать с более простой, если приложение будет расти.

</Question>

<Question title="Может ли @angular/localize переключать язык без перезагрузки?">

Не так, как задумано. Переводы встраиваются при сборке, поэтому другой язык означает другую сборку. Можно вызвать `loadTranslations()` перед bootstrap, чтобы загрузить переводы в runtime, но для смены языка всё равно придётся перезапускать приложение.

</Question>

<Question title="Какой вариант лучше для SEO в Angular?">

Библиотека важна меньше, чем маршрутизация: по одному URL на локаль, теги `hreflang`, `<html lang>` и переведённый HTML, отрендеренный на сервере. `@angular/localize` получает всё это почти бесплатно, поскольку каждая локаль это отдельная сборка. Runtime-библиотекам для этого нужны SSR и локализованные маршруты. См. [интернационализация и SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md).

- [интернационализация и SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md)

</Question>

<Question title="Работает ли Intlayer с Analog?">

Да, через Vite. См. [руководство по Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_analog.md).

- [руководство по Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_analog.md)

</Question>

</FAQ>

## Что почитать дальше

- [Настройка Intlayer в Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_angular_21.md)
- [Настройка Intlayer в Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_angular_19.md)
- [Бенчмарки i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md)
- [Компилятор и декларативный i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/compiler_vs_declarative_i18n.md)
- [Формат сообщений ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/icu_message_format.md)
- [Адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md)

То же сравнение для

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/how_to_pick_solid_i18n_library.md)
