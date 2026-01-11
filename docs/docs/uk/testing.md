---
createdAt: 2025-03-01
updatedAt: 2025-10-05
title: Тестування вашого контенту
description: Дізнайтеся, як тестувати ваш контент за допомогою Intlayer.
keywords:
  - Тестування
  - Intlayer
  - Інтернаціоналізація
  - CMS
  - Система управління контентом
  - Візуальний редактор
slugs:
  - doc
  - testing
history:
  - version: 6.0.1
    date: 2025-10-05
    changes: Зробити тест асинхронним і додати опцію build
  - version: 6.0.0
    date: 2025-09-20
    changes: Впровадження тестування
---

# Тестування вашого контенту

Цей посібник показує, як автоматично перевіряти повноту ваших словників, виявляти відсутні переклади до релізу та тестувати локалізований UI у вашому додатку.

---

## Що ви можете перевірити

- **Відсутні переклади**: провалювати CI, якщо для будь-якого словника відсутні обов'язкові локалі.
- **Локалізований рендер UI**: відрендерити компоненти з провайдером конкретної локалі та перевірити видимий текст/атрибути.
- **Перевірки під час збірки**: швидко виконати аудит локально через CLI.

---

## Швидкий старт: аудит через CLI

Запустіть аудит з кореня вашого проєкту:

```bash
npx intlayer content test
```

Корисні прапорці:

- `--env-file [path]`: завантажити змінні середовища з файлу.
- `-e, --env [name]`: вибрати профіль середовища.
- `--base-dir [path]`: встановити базову директорію додатку для вирішення шляхів.
- `--verbose`: показувати детальні логи.
- `--prefix [label]`: додавати префікс до рядків логу.
- `--build [build]`: збирати словники перед тестуванням, щоб переконатися, що вміст актуальний. True примусово виконає збірку, false пропустить збірку, undefined дозволить використовувати кеш збірки.

Примітка: CLI виводить детальний звіт, але не завершує виконання з ненульовим кодом при помилках. Для контролю в CI додайте модульний тест (нижче), який перевіряє, що кількість відсутніх обов'язкових локалей дорівнює нулю.

---

## Програмний тест (Vitest/Jest)

Використайте API Intlayer CLI, щоб переконатися, що для обов'язкових локалей немає відсутніх перекладів.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Корисно, коли тест не проходить локально або в CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Jest еквівалент:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // Корисно, коли тест не проходить локально або в CI
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Як це працює:

- Intlayer читає вашу конфігурацію (locales, requiredLocales) та оголошені словники, а потім звітує:
  - `missingTranslations`: по‑ключу — які локалі відсутні та з якого файлу.
  - `missingLocales`: об'єднання всіх відсутніх локалей.
  - `missingRequiredLocales`: підмножина, обмежена `requiredLocales` (або всі локалі, якщо `requiredLocales` не встановлено).

---

## Тестування локалізованого інтерфейсу (React / Next.js)

Рендерте компоненти під провайдером Intlayer та перевіряйте видимий вміст.

Приклад для React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("рендерить локалізований заголовок англійською", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(
    screen.getByText("Очікуваний заголовок англійською")
  ).toBeInTheDocument();
});
```

Next.js (App Router) example: use the framework wrapper:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("відображає локалізований заголовок французькою", () => {
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

Поради:

- Коли потрібні сирі рядкові значення для атрибутів (наприклад, `aria-label`), отримуйте поле `.value`, яке повертає `useIntlayer` в React.
- Тримайте словники поруч з компонентами для спрощення юніт-тестування та очищення.

---

## Неперервна інтеграція

Додайте тест, який завершуватиме збірку з помилкою, коли відсутні обов'язкові переклади.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Приклад GitHub Actions:

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

Необов'язково: запустіть аудит CLI, щоб отримати зрозумілий для людини підсумок разом із тестами:

```bash
npx intlayer content test --verbose
```

---

## Усунення неполадок

- Переконайтеся, що ваша конфігурація Intlayer визначає `locales` і (за потреби) `requiredLocales`.
- Якщо ваш застосунок використовує динамічні або віддалені словники, запускайте тести в середовищі, де ці словники доступні.
- Для змішаних монорепозиторіїв використовуйте `--base-dir`, щоб вказати CLI правильний корінь застосунку.

---
