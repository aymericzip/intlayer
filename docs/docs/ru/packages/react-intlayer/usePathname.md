---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация хука usePathname | react-intlayer
description: Узнайте, как использовать хук usePathname из пакета react-intlayer для получения текущего пути (pathname) URL без сегмента локали.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - маршрутизация
  - интернационализация
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Добавлена утилита usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Инициализация истории"
author: aymericzip
---

# Интеграция с React: Документация хука `usePathname`

Хук `usePathname` из `react-intlayer` возвращает текущий путь (pathname) браузера с удаленным сегментом локали. Он опирается на нативное свойство `window.location.pathname` и реагирует на события навигации браузера через `popstate`.

## Импорт `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Обзор

В отличие от специфичных для фреймворков хуков маршрутизации (таких как в `next-intlayer` или `react-router`), этот хук является легковесным решением, независимым от фреймворков, для обычных React-приложений. Он извлекает текущий URL и удаляет любой совпадающий префикс локали (например, `/ru/about` становится `/about`).

## Использование

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Главная
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        О нас
      </a>
    </nav>
  );
};

export default Navigation;
```

## Возвращаемое значение

| Тип      | Описание                                                                                                  |
| -------- | --------------------------------------------------------------------------------------------------------- |
| `string` | Текущий путь (pathname) браузера с удаленным префиксом локали (например, `/ru/dashboard` → `/dashboard`). |

## Поведение

- **Удаление локали**: Под капотом использует утилиту `getPathWithoutLocale` для автоматического определения и удаления локали из пути на основе конфигурации Intlayer приложения.
- **Реактивность**: Слушает событие `popstate`. Когда пользователь осуществляет навигацию с помощью кнопок браузера «назад»/«вперед» или когда вызывается `pushState`/`replaceState`, хук обновляет возвращаемый путь.
- **SSR Фолбэк**: На сервере (где `window` не определено), по умолчанию возвращает `/`, так как в чистом контексте React у него по умолчанию нет доступа к запрашиваемому URL.

## Связанная документация

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md)
