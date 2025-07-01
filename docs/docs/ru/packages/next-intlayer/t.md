---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции t | next-intlayer
description: Узнайте, как использовать функцию t в пакете next-intlayer
keywords:
  - t
  - перевод
  - Intlayer
  - next-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
---

# Документация: функция `t` в `next-intlayer`

Функция `t` в пакете `next-intlayer` является основным инструментом для встроенной интернационализации в вашем приложении Next.js. Она позволяет определять переводы непосредственно внутри компонентов, что упрощает отображение локализованного контента в зависимости от текущей локали.

---

## Обзор

Функция `t` используется для предоставления переводов для разных локалей прямо в ваших компонентах. Передавая объект, содержащий переводы для каждой поддерживаемой локали, `t` возвращает соответствующий перевод на основе текущего контекста локали в вашем приложении Next.js.

---

## Основные возможности

- **Встроенные переводы**: Идеально подходит для быстрого, встроенного текста, который не требует отдельного объявления контента.
- **Автоматический выбор локали**: Автоматически возвращает перевод, соответствующий текущей локали.
- **Поддержка TypeScript**: Обеспечивает типобезопасность и автозаполнение при использовании с TypeScript.
- **Легкая интеграция**: Бесшовно работает как в клиентских, так и в серверных компонентах Next.js.

---

## Сигнатура функции

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметры

- `translations`: Объект, где ключами являются коды локалей (например, `en`, `fr`, `es`), а значениями — соответствующие переведённые строки.

### Возвращает

- Строку, представляющую переведённый контент для текущей локали.

---

## Примеры использования

### Использование `t` в клиентском компоненте

Убедитесь, что вы включили директиву `'use client';` в начале файла вашего компонента при использовании `t` в клиентском компоненте.

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
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

###Встроенные переводы в атрибутах

Функция `t` особенно полезна для встроенных переводов в атрибутах JSX.
При локализации атрибутов, таких как `alt`, `title`, `href` или `aria-label`, вы можете использовать `t` непосредственно внутри атрибута.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Расширенные темы

### Интеграция с TypeScript

Функция `t` является типобезопасной при использовании с TypeScript, гарантируя, что все необходимые локали предоставлены.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
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
// Переводы для разных локалей
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
// Переводы для разных локалей
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Обнаружение локали и контекст

В `next-intlayer` текущая локаль управляется через провайдеры контекста: `IntlayerClientProvider` и `IntlayerServerProvider`. Убедитесь, что эти провайдеры оборачивают ваши компоненты и что проп `locale` передается корректно.

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

## Распространённые ошибки и устранение неполадок

### `t` Возвращает undefined или неправильный перевод

- **Причина**: Текущая локаль неправильно установлена или отсутствует перевод для текущей локали.
- **Решение**:
  - Проверьте, что `IntlayerClientProvider` или `IntlayerServerProvider` корректно настроены с соответствующим `locale`.
  - Убедитесь, что ваш объект переводов включает все необходимые локали.

### Отсутствие переводов в TypeScript

- **Причина**: Объект переводов не удовлетворяет требуемым локалям, что приводит к ошибкам TypeScript.
- **Решение**: Используйте тип `IConfigLocales` для обеспечения полноты ваших переводов.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
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
};

const text = t(translations);
```

---

## Советы по эффективному использованию

1. **Используйте `t` для простых встроенных переводов**: Идеально подходит для перевода небольших фрагментов текста непосредственно внутри ваших компонентов.
2. **Предпочитайте `useIntlayer` для структурированного контента**: Для более сложных переводов и повторного использования контента определяйте содержимое в декларационных файлах и используйте `useIntlayer`.
3. **Последовательное предоставление локали**: Убедитесь, что локаль последовательно передается по всему вашему приложению через соответствующие провайдеры.
4. **Используйте TypeScript**: Применяйте типы TypeScript для обнаружения отсутствующих переводов и обеспечения типобезопасности.

---

## Заключение

Функция `t` в `next-intlayer` — это мощный и удобный инструмент для управления встроенными переводами в ваших приложениях Next.js. Эффективно интегрируя её, вы улучшаете возможности интернационализации вашего приложения, обеспечивая лучший опыт для пользователей по всему миру.

Для более подробного использования и расширенных возможностей обратитесь к [документации next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

---

**Примечание**: Не забудьте правильно настроить `IntlayerClientProvider` и `IntlayerServerProvider`, чтобы текущая локаль корректно передавалась вашим компонентам. Это важно для того, чтобы функция `t` возвращала правильные переводы.

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
