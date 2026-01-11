---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація: функція `t` у `react-intlayer`
description: Дивіться, як використовувати функцію t у пакеті react-intlayer
keywords:
  - t
  - переклад
  - Intlayer
  - Інтернаціоналізація
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `t` у `react-intlayer`

Функція `t` у пакеті `react-intlayer` — це базовий інструмент для вбудованої інтернаціоналізації у вашому React-додатку. Вона дозволяє визначати переклади безпосередньо в компонентах, що спрощує відображення локалізованого контенту залежно від поточної локалі.

---

## Огляд

Функція `t` використовується для надання перекладів для різних локалей безпосередньо у ваших компонентах. Передаючи об'єкт, що містить переклади для кожної підтримуваної локалі, `t` повертає відповідний переклад на основі поточного контексту локалі у вашій React-аплікації.

---

## Основні можливості

- **Вбудовані переклади**: Ідеально підходить для швидкого, вбудованого тексту, який не вимагає окремого оголошення контенту.
- **Автоматичний вибір локалі**: Автоматично повертає переклад, що відповідає поточній локалі.
- **Підтримка TypeScript**: Забезпечує типобезпеку та автодоповнення при використанні з TypeScript.
- **Легка інтеграція**: Працює безшовно в React-компонентах.

---

## Сигнатура функції

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметри

- `translations`: Об'єкт, де ключі — коди локалей (наприклад, `en`, `fr`, `es`), а значення — відповідні перекладені рядки.

### Повертає

- Рядок, що містить перекладений контент для поточної локалі.

---

## Приклади використання

### Базове використання `t` в компоненті

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          uk: "Це приклад компонента",
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          uk: "Це приклад компонента",
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          uk: "Це приклад компонента",
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Вбудовані переклади в атрибутах

Функція `t` особливо корисна для вбудованих перекладів у JSX-атрибутах. При локалізації атрибутів, таких як `alt`, `title`, `href` або `aria-label`, ви можете використовувати `t` безпосередньо в атрибуті.

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
    uk: "Відправити",
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      uk: "Чудовий пейзаж",
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Розширені теми

### Інтеграція з TypeScript

Функція `t` є типобезпечною при використанні з TypeScript, що гарантує наявність усіх необхідних локалей.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  uk: "Ласкаво просимо",
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  uk: "Ласкаво просимо",
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  uk: "Ласкаво просимо",
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Визначення локалі та контекст

У `react-intlayer` поточна локаль керується через `IntlayerProvider`. Переконайтеся, що цей провайдер обгортає ваші компоненти та що проп `locale` передається правильно.

#### Приклад:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ваші компоненти тут */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ваші компоненти тут */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ваші компоненти тут */}
  </IntlayerProvider>
);
```

---

## Поширені помилки та усунення несправностей

### `t` повертає undefined або неправильний переклад

- **Причина**: Поточна локаль неправильно встановлена або для поточної локалі відсутній переклад.
- **Рішення**:
  - Переконайтеся, що `IntlayerProvider` правильно налаштований з відповідною `locale`.
  - Переконайтеся, що ваш об'єкт перекладів містить усі необхідні локалі.

### Відсутні переклади в TypeScript

- **Причина**: Об'єкт перекладів не відповідає вимогам необхідних локалей, що призводить до помилок TypeScript.
- **Рішення**: Використовуйте тип `IConfigLocales` для забезпечення повноти ваших перекладів.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Відсутність 'es' спричинить помилку TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Відсутність 'es' спричинить помилку TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Відсутність 'es' спричинить помилку TypeScript
};

const text = t(translations);
```

---

## Поради для ефективного використання

1. **Використовуйте `t` для простих вбудованих перекладів**: Ідеально підходить для перекладу невеликих фрагментів тексту безпосередньо в ваших компонентах.
2. **Віддавайте перевагу `useIntlayer` для структурованого контенту**: Для складніших перекладів та повторного використання контенту визначайте його в declaration files і використовуйте `useIntlayer`.
3. **Послідовне передавання локалі**: Переконайтеся, що локаль послідовно передається по всьому застосунку через `IntlayerProvider`.
4. **Використовуйте TypeScript**: Застосовуйте типи TypeScript, щоб виявляти відсутні переклади та гарантувати типобезпеку.

---

## Висновок

Функція `t` у `react-intlayer` — потужний і зручний інструмент для керування вбудованими перекладами у ваших React-застосунках. Ефективно інтегруючи її, ви розширюєте можливості інтернаціоналізації свого додатка та забезпечуєте кращий досвід для користувачів по всьому світу.

Для докладнішого опису використання та просунутих можливостей зверніться до [документації react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

---

**Примітка**: Не забудьте належним чином налаштувати `IntlayerProvider`, щоб поточна локаль правильно передавалася вашим компонентам. Це критично важливо для того, щоб функція `t` повертала коректні переклади.
