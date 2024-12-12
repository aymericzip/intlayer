# Интеграция с React: Документация по хуку `useLocale`

Этот раздел предоставляет полные сведения о хуке `useLocale` из библиотеки `react-intlayer`, предназначенной для управления локализацией в приложениях React.

## Импортирование `useLocale` в React

Чтобы интегрировать хук `useLocale` в ваше приложение React, импортируйте его из соответствующего пакета:

```javascript
import { useLocale } from "react-intlayer"; // Используется в компонентах React для управления локализацией
```

## Обзор

Хук `useLocale` предлагает простой способ доступа и манипуляции настройками локализации в компонентах React. Он предоставляет доступ к текущей локали, умолчательной локали, всем доступным локалям и функциям для обновления настроек локали.

## Использование

Вот как вы можете использовать хук `useLocale` внутри компонента React:

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Текущая локаль: {locale}</h1>
      <p>Умолчательная локаль: {defaultLocale}</p>
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
- **`setLocale`**: Функция для обновления текущей локали в контексте приложения.

## Пример

Этот пример показывает компонент, который использует хук `useLocale`, чтобы отобразить переключатель локали, позволяя пользователям динамически изменять локаль приложения:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}

export default LocaleSelector;
```

## Заключение

Хук `useLocale` из `react-intlayer` является важным инструментом для управления локалями в ваших приложениях React, предоставляя функциональность, необходимую для адаптации вашего приложения к различным международным пользователям эффективно.
