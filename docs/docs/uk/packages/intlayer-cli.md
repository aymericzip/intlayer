---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета intlayer-cli
description: CLI-інструмент для Intlayer, що надає команди для збірки та аудиту словників.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Пакет intlayer-cli

Пакет `intlayer-cli` надає набір команд для керування словниками Intlayer та конфігурацією.

## Встановлення

```bash
npm install intlayer-cli
```

## Експорти

### Команди CLI (функції)

Пакет експортує функції, які забезпечують роботу команд CLI.

| Функція    | Опис                                        |
| ---------- | ------------------------------------------- |
| `build`    | Будує словники Intlayer.                    |
| `audit`    | Перевіряє словники на відсутні переклади.   |
| `liveSync` | Синхронізує словники в реальному часі.      |
| `pull`     | Завантажує словники з віддаленого джерела.  |
| `push`     | Відправляє словники до віддаленого джерела. |
| `test`     | Запускає тести для словників.               |
| `extract`  | Перетворює словники між форматами.          |
