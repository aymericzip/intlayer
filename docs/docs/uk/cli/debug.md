---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Налагодження команди Intlayer
description: Дізнайтеся, як налагоджувати та усувати неполадки в Intlayer CLI.
keywords:
  - Налагодження
  - Усунення неполадок
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
author: aymericzip
---

# Налагодження команди Intlayer

## 1. **Переконайтеся, що ви використовуєте останню версію**

Виконайте:

```bash packageManager="npm"
npx intlayer --version                  # поточна локальна версія intlayer
npx intlayer@latest --version           # остання доступна версія intlayer
```

```bash packageManager="yarn"
yarn intlayer --version                  # поточна локальна версія intlayer
yarn intlayer@latest --version           # остання доступна версія intlayer
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # поточна локальна версія intlayer
pnpm intlayer@latest --version           # остання доступна версія intlayer
```

```bash packageManager="bun"
bun x intlayer --version                  # поточна локальна версія intlayer
bun x intlayer@latest --version           # остання доступна версія intlayer
```

## 2. **Перевірте, чи команда зареєстрована**

Перевірити можна за допомогою:

```bash packageManager="npm"
npx intlayer --help                     # Показує список доступних команд та інформацію про використання
npx intlayer dictionary build --help    # Показує список доступних опцій для команди
```

```bash packageManager="yarn"
yarn intlayer --help                     # Показує список доступних команд та інформацію про використання
yarn intlayer dictionary build --help    # Показує список доступних опцій для команди
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # Показує список доступних команд та інформацію про використання
pnpm intlayer dictionary build --help    # Показує список доступних опцій для команди
```

```bash packageManager="bun"
bun x intlayer --help                     # Показує список доступних команд та інформацію про використання
bun x intlayer dictionary build --help    # Показує список доступних опцій для команди
```

## 3. **Перезапустіть термінал**

Іноді потрібно перезапустити термінал, щоб він розпізнав нові команди.

## 4. **Очистіть кеш npx (якщо ви застрягли на старішій версії)**

```bash
npx clear-npx-cache
```
