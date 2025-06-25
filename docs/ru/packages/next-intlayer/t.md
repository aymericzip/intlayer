---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация функции t | next-intlayer
description: Узнайте, как использовать функцию t для пакета next-intlayer
keywords:
  - t
  - перевод
  - Intlayer
  - next-intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# Документация: Функция `t` в `next-intlayer`

Функция `t` в пакете `next-intlayer` является основным инструментом для встроенной интернационализации в вашем приложении Next.js. Она позволяет определять переводы непосредственно в компонентах, упрощая отображение локализованного контента в зависимости от текущей локали.

---

## Обзор

Функция `t` используется для предоставления переводов для различных локалей прямо в компонентах. Передавая объект, содержащий переводы для каждой поддерживаемой локали, `t` возвращает соответствующий перевод на основе текущего контекста локали в вашем приложении Next.js.

---

## Основные возможности

- **Встроенные переводы**: Идеально подходит для быстрого, встроенного текста, который не требует отдельного объявления контента.
- **Автоматический выбор локали**: Автоматически возвращает перевод, соответствующий текущей локали.
- **Поддержка TypeScript**: Обеспечивает безопасность типов и автозаполнение при использовании с TypeScript.
- **Простая интеграция**: Бесшовно работает как в клиентских, так и в серверных компонентах Next.js.

---

## Сигнатура функции

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметры

- `translations`: Объект, где ключи , это коды локалей (например, `en`, `fr`, `es`), а значения , соответствующие переведенные строки.

### Возвращает

- Строку, представляющую переведенный контент для текущей локали.

---

## Примеры использования

### Использование `t` в клиентском компоненте

Убедитесь, что вы включили директиву `'use client';` в начале файла компонента при использовании `t` в клиентском компоненте.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
      ru: "Это содержимое примера клиентского компонента",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
      ru: "Это содержимое примера клиентского компонента",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
      ru: "Это содержимое примера клиентского компонента",
    })}
  </p>
);
```

### Использование `t` в серверном компоненте

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      ru: "Это содержимое примера серверного компонента",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente сервер",
      ru: "Это содержимое примера серверного компонента",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente сервер",
      ru: "Это содержимое примера серверного компонента",
    })}
  </p>
);
```

### Встроенные переводы в атрибутах

Функция `t` особенно полезна для встроенных переводов в атрибутах JSX. При локализации атрибутов, таких как `alt`, `title`, `href` или `aria-label`, вы можете использовать `t` непосредственно в атрибуте.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ru: "Отправить",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ru: "Отправить",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
      ru: "Красивый пейзаж",
    })}
  />
</button>
```

---

## Продвинутые темы

### Интеграция с TypeScript

Функция `t` безопасна для типов при использовании с TypeScript, гарантируя, что все необходимые локали предоставлены.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ru: "Добро пожаловать",
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
  ru: "Добро пожаловать",
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
  ru: "Добро пожаловать",
};

const greeting = t(translations);
```

### Обнаружение локали и контекст

В `next-intlayer` текущая локаль управляется через провайдеры контекста: `IntlayerClientProvider` и `IntlayerServerProvider`. Убедитесь, что эти провайдеры оборачивают ваши компоненты, и свойство `locale` передается правильно.

#### Пример:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ваши компоненты здесь */}
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
      {/* Ваши компоненты здесь */}
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
      {/* Ваши компоненты здесь */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Частые ошибки и их устранение

### `t` возвращает undefined или неправильный перевод

- **Причина**: Текущая локаль не установлена должным образом или перевод для текущей локали отсутствует.
- **Решение**:
  - Убедитесь, что `IntlayerClientProvider` или `IntlayerServerProvider` настроены правильно с соответствующей локалью.
  - Убедитесь, что ваш объект переводов включает все необходимые локали.

### Отсутствие переводов в TypeScript

- **Причина**: Объект переводов не удовлетворяет требованиям локалей, что приводит к ошибкам TypeScript.
- **Решение**: Используйте тип `IConfigLocales`, чтобы обеспечить полноту переводов.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
  ru: "Текст",
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
  ru: "Текст",
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
  ru: "Текст",
};

const text = t(translations);
```

---

## Советы по эффективному использованию

1. **Используйте `t` для простых встроенных переводов**: Идеально подходит для перевода небольших текстов прямо в компонентах.
2. **Предпочитайте `useIntlayer` для структурированного контента**: Для более сложных переводов и повторного использования контента определяйте контент в файлах деклараций и используйте `useIntlayer`.
3. **Последовательное предоставление локали**: Убедитесь, что локаль последовательно предоставляется через соответствующие провайдеры.
4. **Используйте TypeScript**: Используйте типы TypeScript, чтобы выявлять отсутствующие переводы и обеспечивать безопасность типов.

---

## Заключение

Функция `t` в `next-intlayer` , это мощный и удобный инструмент для управления встроенными переводами в ваших приложениях Next.js. Эффективно интегрируя её, вы улучшаете возможности интернационализации вашего приложения, обеспечивая лучший опыт для пользователей по всему миру.

Для более детального использования и продвинутых функций обратитесь к [документации next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md).

---

**Примечание**: Не забудьте правильно настроить ваши `IntlayerClientProvider` и `IntlayerServerProvider`, чтобы текущая локаль корректно передавалась вашим компонентам. Это важно для того, чтобы функция `t` возвращала правильные переводы.
