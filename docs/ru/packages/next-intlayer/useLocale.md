# Интеграция Next.js: Документация по хуку `useLocale` для `next-intlayer`

Этот раздел предлагает подробную документацию по хуку `useLocale`, предназначенному для приложений Next.js в библиотеке `next-intlayer`. Он разработан для эффективного управления изменением локали и маршрутизацией.

## Импортирование `useLocale` в Next.js

Чтобы использовать хук `useLocale` в вашем приложении Next.js, импортируйте его следующим образом:

```javascript
import { useLocale } from "next-intlayer"; // Используется для управления локалями и маршрутизацией в Next.js
```

## Использование

Вот как реализовать хук `useLocale` внутри компонента Next.js:

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Текущая локаль: {locale}</h1>
      <p>Стандартная локаль: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Параметры и возвращаемые значения

Когда вы вызываете хук `useLocale`, он возвращает объект, содержащий следующие свойства:

- **`locale`**: Текущая локаль, установленная в контексте React.
- **`defaultLocale`**: Основная локаль, определенная в конфигурации.
- **`availableLocales`**: Список всех доступных локалей, определенных в конфигурации.
- **`setLocale`**: Функция для изменения локали приложения и обновления URL соответственно. Она заботится о правилах префикса, добавлять ли локаль в путь или нет в зависимости от конфигурации. Использует `useRouter` из `next/navigation` для навигационных функций, таких как `push` и `refresh`.
- **`pathWithoutLocale`**: Вычисляемое свойство, которое возвращает путь без локали. Это полезно для сравнения URL. Например, если текущая локаль `fr`, и URL `fr/my_path`, путь без локали будет равен `/my_path`. Использует `usePathname` из `next/navigation` для получения текущего пути.

## Заключение

Хук `useLocale` из `next-intlayer` является важным инструментом для управления локалями в приложениях Next.js. Он предлагает интегрированный подход к адаптации вашего приложения для нескольких локалей, обеспечивая бесперебойное управление локалями, состоянием и модификацией URL.
