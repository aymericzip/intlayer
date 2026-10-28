---
createdAt: 2025-03-01
updatedAt: 2026-10-27
priority: 8
title: "Тестирование переводов с Intlayer"
description: "Тестируйте контент Intlayer: находите недостающие переводы, проверяйте словари в CI и рендерьте компоненты по локалям в модульных тестах."
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
history:
  - version: 6.1.0
    date: 2026-10-27
    changes: "Уточнение, что content test завершается с ненулевым кодом при отсутствии обязательных локалей"
  - version: 6.0.0
    date: 2025-09-20
    changes: "Введение тестирования"
author: aymericzip
---

# Тестирование вашего контента

Это руководство показывает, как автоматически проверять полноту ваших словарей, выявлять отсутствующие переводы до выпуска и тестировать локализованный пользовательский интерфейс в вашем приложении.

## Что вы можете тестировать

- **Отсутствующие переводы**: провалить CI, если для любого словаря отсутствуют обязательные локали.
- **Отрисовка локализованного UI**: рендерить компоненты с провайдером конкретной локали и проверять видимый текст/атрибуты.
- **Аудиты во время сборки (build time)**: запустить `npx intlayer content test` локально или в CI; команда завершается с ненулевым кодом, если отсутствуют обязательные переводы.

## Быстрый старт: аудит через CLI

Запустите аудит из корня вашего проекта:

```bash packageManager="npm"
npx intlayer content test
```

```bash packageManager="yarn"
yarn intlayer content test
```

```bash packageManager="pnpm"
pnpm intlayer content test
```

```bash packageManager="bun"
bun x intlayer content test
```

Полезные флаги:

- `--env-file [path]`: загрузить переменные окружения из файла.
- `-e, --env [name]`: выбрать профиль окружения.
- `--base-dir [path]`: задать базовую директорию приложения для разрешения путей.
- `--verbose`: показывать подробные логи.
- `--prefix [label]`: добавлять префикс к строкам логов.

Команда завершается с кодом `1`, если отсутствует любая обязательная локаль (см. `requiredLocales` в вашей конфигурации), и с кодом `0` в противном случае. Её можно использовать напрямую, чтобы проваливать CI-задачи или хуки коммитов. Программный тест ниже является необязательной альтернативой.

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

## Непрерывная интеграция

Запустите аудит CLI в CI. Он проваливает задачу, если отсутствуют обязательные переводы.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "npx intlayer content test"
  }
}
```

Альтернатива: Vitest

```json
{
  "scripts": {
    "test:i18n": "vitest run"
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
      - run: npx intlayer content test
```

Опционально: запустите аудит CLI для получения удобочитаемого отчёта вместе с тестами:

```bash packageManager="npm"
npx intlayer content test --verbose
```

```bash packageManager="yarn"
yarn intlayer content test --verbose
```

```bash packageManager="pnpm"
pnpm intlayer content test --verbose
```

```bash packageManager="bun"
bun x intlayer content test --verbose
```

## Устранение неполадок

- Убедитесь, что ваша конфигурация Intlayer определяет `locales` и (опционально) `requiredLocales`.
- Если ваше приложение использует динамические или удалённые словари, запускайте тесты в среде, где эти словари доступны.
- Для смешанных монорепозиториев используйте `--base-dir`, чтобы указать CLI правильный корень приложения.

---
