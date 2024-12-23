# Документация: Функция `t` в `react-intlayer`

Функция `t` в пакете `react-intlayer` является основным инструментом для встроенной интернационализации в вашем приложении React. Она позволяет вам определять переводы непосредственно в ваших компонентах, упрощая отображение локализованного контента в зависимости от текущей локали.

---

## Обзор

Функция `t` используется для предоставления переводов для различных локалей непосредственно в ваших компонентах. Передавая объект, содержащий переводы для каждой поддерживаемой локали, `t` возвращает соответствующий перевод на основе текущего контекста локали в вашем приложении React.

---

## Основные Функции

- **Встроенные Переводы**: Идеально подходит для быстрого текста, не требующего отдельного объявления контента.
- **Автоматический Выбор Локали**: Автоматически возвращает перевод, соответствующий текущей локали.
- **Поддержка TypeScript**: Обеспечивает типобезопасность и автозаполнение при использовании с TypeScript.
- **Легкая Интеграция**: Работает без швов внутри компонентов React.

---

## Подпись Функции

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметры

- `translations`: Объект, где ключи - это коды локалей (например, `en`, `fr`, `es`), а значения - соответствующие переведенные строки.

### Возвращает

- Строку, представляющую собой переведенный контент для текущей локали.

---

## Примеры Использования

### Основное Использование `t` в Компоненте

```tsx
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Встроенные Переводы в Атрибутах

Функция `t` особенно полезна для встроенных переводов в JSX атрибутах. При локализации атрибутов, таких как `alt`, `title`, `href` или `aria-label`, вы можете использовать `t` непосредственно внутри атрибута.

```tsx
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

## Расширенные Темы

### Интеграция с TypeScript

Функция `t` типобезопасна при использовании с TypeScript, что гарантирует, что все требуемые локали предоставлены.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Обнаружение Локали и Контекст

В `react-intlayer` текущая локаль управляется через `IntlayerProvider`. Убедитесь, что этот провайдер обертывает ваши компоненты и что свойство `locale` правильно передается.

#### Пример:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ваши компоненты здесь */}
  </IntlayerProvider>
);
```

---

## Общие Ошибки и Устранение Неполадок

### `t` Возвращает Неопределенное или Неправильное Перевод

- **Причина**: Текущая локаль не установлена должным образом, или перевод для текущей локали отсутствует.
- **Решение**:
  - Убедитесь, что `IntlayerProvider` правильно настроен с соответствующей `locale`.
  - Убедитесь, что ваш объект переводов включает все необходимые локали.

### Отсутствие Переводов в TypeScript

- **Причина**: Объект переводов не удовлетворяет требуемым локалям, что приводит к ошибкам TypeScript.
- **Решение**: Используйте тип `IConfigLocales`, чтобы обеспечить полноту ваших переводов.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствующий 'es' приведет к ошибке TypeScript
};

const text = t(translations);
```

---

## Советы Для Эффективного Использования

1. **Используйте `t` Для Простых Встроенных Переводов**: Идеально подходит для перевода небольших фрагментов текста непосредственно в ваших компонентах.
2. **Предпочитайте `useIntlayer` Для Структурированного Контента**: Для более сложных переводов и повторного использования контента определите контент в декларативных файлах и используйте `useIntlayer`.
3. **Согласованная Передача Локали**: Убедитесь, что ваша локаль последовательно предоставляется по всему приложению через `IntlayerProvider`.
4. **Используйте TypeScript**: Используйте типы TypeScript, чтобы выявлять отсутствующие переводы и обеспечивать типобезопасность.

---

## Заключение

Функция `t` в `react-intlayer` является мощным и удобным инструментом для управления встроенными переводами в ваших приложениях React. Эффективно интегрируйте её, чтобы улучшить возможности интернационализации вашего приложения, предоставляя лучший опыт для пользователей по всему миру.

Для более подробного использования и расширенных функций смотрите [документацию react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

---

**Примечание**: Не забудьте правильно настроить ваш `IntlayerProvider`, чтобы гарантировать, что текущая локаль будет корректно передана вашим компонентам. Это необходимо для того, чтобы функция `t` возвращала правильные переводы.
