---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: Тестирование вашего контента
description: Узнайте, как тестировать ваш контент с помощью Intlayer.
keywords:
  - Тестирование
  - Intlayer
  - Интернационализация
  - CMS
  - Система управления контентом
  - Визуальный редактор
slugs:
  - doc
  - testing
---

# Тестирование вашего контента

Это руководство показывает, как автоматически проверять полноту ваших словарей, выявлять отсутствующие переводы до выпуска и тестировать локализованный пользовательский интерфейс в вашем приложении.

---

## Что вы можете тестировать

- **Отсутствующие переводы**: провалить CI, если для любого словаря отсутствуют обязательные локали.
- **Отрисовка локализованного UI**: рендерить компоненты с провайдером конкретной локали и проверять видимый текст/атрибуты.
- **Аудиты во время сборки**: запускать быстрый аудит локально через CLI.

---

## Быстрый старт: аудит через CLI

Запустите аудит из корня вашего проекта:

```bash
npx intlayer content test
```

Полезные флаги:

- `--env-file [path]`: загрузить переменные окружения из файла.
- `-e, --env [name]`: выбрать профиль окружения.
- `--base-dir [path]`: задать базовую директорию приложения для разрешения путей.
- `--verbose`: показывать подробные логи.
- `--prefix [label]`: добавлять префикс к строкам логов.

Примечание: CLI выводит подробный отчет, но не завершает работу с ошибкой при обнаружении проблем. Для контроля в CI добавьте юнит-тест (ниже), который проверяет отсутствие отсутствующих обязательных локалей.

---

## Программное тестирование (Vitest/Jest)

Используйте API Intlayer CLI, чтобы проверить, что отсутствующих переводов для обязательных локалей нет.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("переводы", () => {
  it("отсутствуют обязательные локали", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Полезно, когда тест не проходит локально или в CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Эквивалент для Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("отсутствуют обязательные локали", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Как это работает:

- Intlayer читает вашу конфигурацию (locales, requiredLocales) и объявленные словари, затем сообщает:
  - `missingTranslations`: для каждого ключа, какие локали отсутствуют и из какого файла.
  - `missingLocales`: объединение всех отсутствующих локалей.
  - `missingRequiredLocales`: подмножество, ограниченное `requiredLocales` (или все локали, если `requiredLocales` не установлены).

---

## Тестирование локализованного UI (React / Next.js)

Рендерьте компоненты под провайдером Intlayer и проверяйте видимый контент.

Пример для React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(
    screen.getByText("Ожидаемый английский заголовок")
  ).toBeInTheDocument();
});
```

Пример для Next.js (App Router): используйте обертку фреймворка:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("отображает локализованный заголовок на французском", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Советы:

- Когда вам нужны необработанные строковые значения для атрибутов (например, `aria-label`), обращайтесь к полю `.value`, возвращаемому `useIntlayer` в React.
- Храните словари рядом с компонентами для упрощения модульного тестирования и очистки.

---

## Непрерывная интеграция

Добавьте тест, который будет прерывать сборку, если отсутствуют необходимые переводы.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Пример GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Опционально: запустите аудит CLI для получения удобочитаемого отчёта вместе с тестами:

```bash
npx intlayer content test --verbose
```

---

## Устранение неполадок

- Убедитесь, что ваша конфигурация Intlayer определяет `locales` и (опционально) `requiredLocales`.
- Если ваше приложение использует динамические или удалённые словари, запускайте тесты в среде, где эти словари доступны.
- Для смешанных монорепозиториев используйте `--base-dir`, чтобы указать CLI правильный корень приложения.

---

## История документации

| Версия | Дата       | Изменения             |
| ------ | ---------- | --------------------- |
| 6.0.0  | 2025-09-20 | Введение тестирования |
