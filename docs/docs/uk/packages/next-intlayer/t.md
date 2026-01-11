---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація функції t | next-intlayer
description: Дізнайтеся, як використовувати функцію t у пакеті next-intlayer
keywords:
  - t
  - переклад
  - Intlayer
  - next-intlayer
  - інтернаціоналізація
  - документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Документація: `t` Функція в `next-intlayer`

Функція `t` у пакеті `next-intlayer` є базовим інструментом для вбудованої інтернаціоналізації у вашому додатку Next.js. Вона дозволяє визначати переклади безпосередньо в компонентах, що спрощує відображення локалізованого вмісту залежно від поточної локалі.

---

## Огляд

Функція `t` використовується для надання перекладів для різних локалей безпосередньо у ваших компонентах. Передаючи об'єкт, що містить переклади для кожної підтримуваної локалі, `t` повертає відповідний переклад на основі поточного контексту локалі у вашому застосунку Next.js.

---

## Ключові можливості

- **Вбудовані переклади**: Ідеально підходить для швидкого, вбудованого тексту, який не потребує окремого оголошення контенту.
- **Автоматичний вибір локалі**: Автоматично повертає переклад, що відповідає поточній локалі.
- **Підтримка TypeScript**: Забезпечує типобезпеку та автозаповнення при використанні з TypeScript.
- **Легка інтеграція**: Працює безшовно як у клієнтських, так і в серверних компонентах Next.js.

---

## Сигнатура функції

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметри

- `translations`: Об'єкт, де ключі — коди локалей (наприклад, `en`, `fr`, `es`), а значення — відповідні перекладені рядки.

### Повертає

- Рядок, що представляє перекладений вміст для поточної локалі.

---

## Приклади використання

### Використання `t` у клієнтському компоненті

Переконайтесь, що у верхній частині файлу компонента зазначено директиву `'use client';` при використанні `t` у клієнтському компоненті.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      uk: "Це вміст прикладу клієнтського компонента",
      en: "This is the content of a client component example",
      uk: "Це вміст прикладу клієнтського компонента",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      uk: "Це вміст прикладу клієнтського компонента",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      uk: "Це вміст прикладу клієнтського компонента",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Використання `t` у серверному компоненті

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      uk: "Це вміст прикладу серверного компонента",
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      uk: "Це вміст прикладу серверного компонента",
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      uk: "Це вміст прикладу серверного компонента",
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Вбудовані переклади в атрибутах

Функція `t` особливо корисна для вбудованих перекладів у JSX-атрибутах.
При локалізації атрибутів, таких як `alt`, `title`, `href` або `aria-label`, ви можете використовувати `t` безпосередньо в атрибуті.

```jsx
<button
  aria-label={t({
    uk: "Відправити",
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    uk: "Надіслати",
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      uk: "Прекрасний пейзаж",
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Додаткові теми

### Інтеграція з TypeScript

Функція `t` є типобезпечною при використанні з TypeScript і гарантує, що всі необхідні локалі вказані.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  uk: "Ласкаво просимо",
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Виявлення локалі та контекст

У `next-intlayer` поточна локаль керується через контекстні провайдери: `IntlayerClientProvider` та `IntlayerServerProvider`. Переконайтеся, що ці провайдери обгортають ваші компоненти і що проп `locale` передається правильно.

#### Приклад:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Тут ваші компоненти */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Тут ваші компоненти */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ваші компоненти тут */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Загальні помилки та усунення несправностей

### `t` повертає undefined або неправильний переклад

- **Причина**: Поточна локаль неправильно встановлена, або переклад для поточної локалі відсутній.
- **Рішення**:
  - Переконайтеся, що `IntlayerClientProvider` або `IntlayerServerProvider` правильно налаштовані з відповідною `locale`.
  - Переконайтеся, що ваш об'єкт translations містить усі необхідні локалі.

### Відсутні переклади в TypeScript

- **Причина**: Об'єкт translations не відповідає вимогам щодо локалей, що призводить до помилок TypeScript.
- **Рішення**: Використовуйте тип `IConfigLocales`, щоб забезпечити повноту ваших перекладів.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // Відсутній 'es' спричинить помилку TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // Відсутній 'es' спричинить помилку TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Відсутній 'es' спричинить помилку TypeScript [!code error]
};

const text = t(translations);
```

---

## Поради щодо ефективного використання

1. **Використовуйте `t` для простих inline-перекладів**: Ідеально підходить для перекладу невеликих фрагментів тексту безпосередньо у ваших компонентах.
2. **Віддавайте перевагу `useIntlayer` для структурованого контенту**: Для складніших перекладів і повторного використання контенту визначайте його в declaration-файлах і використовуйте `useIntlayer`.
3. **Послідовне надання локалі**: Переконайтеся, що ваша локаль послідовно передається в усьому додатку через відповідні провайдери.
4. **Використовуйте TypeScript**: Використовуйте типи TypeScript, щоб виявляти відсутні переклади та забезпечувати типобезпеку.

---

## Висновок

Функція `t` у `next-intlayer` — потужний і зручний інструмент для керування вбудованими перекладами у ваших додатках Next.js. Ефективно інтегрувавши її, ви розширюєте можливості інтернаціоналізації вашого застосунку та забезпечуєте кращий досвід для користувачів по всьому світу.

Для детальнішого опису використання та просунутих можливостей див. документацію [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

///

---

**Примітка**: Не забудьте правильно налаштувати ваші `IntlayerClientProvider` та `IntlayerServerProvider`, щоб поточна локаль коректно передавалася вашим компонентам. Це критично для того, щоб функція `t` повертала правильні переклади.
