---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Отримую помилку, пов'язану з підпакетами `@intlayer/*`
description: Виправлення помилки, пов'язаної з підпакетами @intlayer/*.
keywords:
  - @intlayer/*
  - підпакети
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Отримую помилку, пов'язану з підпакетами `@intlayer/*`

Ця проблема зазвичай виникає після оновлення пакетів Intlayer.

Приклад повідомлення про помилку:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Причина

Базові пакети, такі як `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer`, повторно використовують ті самі суб-пакети `@intlayer/config`, `@intlayer/core`, `@intlayer/types`, щоб уникнути дублювання коду.

Між двома версіями експорти підпакетів не обов'язково збігаються. Щоб зменшити цю проблему, intlayer прив'язує версії підпакетів до версії головного пакета.

> Наприклад: `intlayer@1.0.0` використовує `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (За винятком `@intlayer/swc`), підпакети `@intlayer/*` не призначені для прямого використання. Тому рекомендується не встановлювати їх безпосередньо.

## Вирішення

1. Переконайтеся, що версії головного пакета та підпакетів однакові.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Неправильна версія, має бути 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Спробуйте видалити lockfile та папку node_modules і перевстановити залежності.

Інколи пакетний менеджер зберігає стару версію sub-packages у lockfile або в кеші. Щоб виправити це, можна спробувати видалити lockfile та папку node_modules і перевстановити залежності.

```bash
rm -rf package-lock.json node_modules

npm install # або yarn install або pnpm install або bun pm install
```

3. Перевірте версії локальних залежностей

Може статися, що ваш пакетний менеджер зберігає стару версію sub-packages у lockfile або в кеші.

Приклад `intlayer@7.0.0` > `@intlayer/config@7.0.0` > `@intlayer/dictionary-entry@6.0.0`.

Щоб виявити невідповідність між версіями локальних залежностей і версіями sub-packages, ви можете використати наступну команду:

```bash
npm list --depth=3 | grep intlayer
```

```bash
yarn list --depth=3 | grep intlayer
```

```bash
pnpm list --depth=3 | grep intlayer
```

```bash
bun pm ls --depth=3 | grep intlayer
```

> На Windows замініть `| grep intlayer` на `| findstr intlayer` або використайте PowerShell з `Select-String -Pattern "intlayer"`.

4. Перевірте глобальну інсталяцію

Ми рекомендуємо встановити `intlayer` або `intlayer-cli` глобально, щоб мати доступ до CLI-команд. Якщо глобальна версія відрізняється від локальної версії, пакетний менеджер може обрати невірну версію.

**Перевірити, чи пакет встановлено глобально**

```bash
npm list -g --depth=3 | grep intlayer
```

```bash
yarn global list --depth=3 | grep intlayer
```

```bash
pnpm list -g --depth=3 | grep intlayer
```

```bash
bun pm ls -g --depth=3 | grep intlayer
```

> На Windows замініть `| grep intlayer` на `| findstr intlayer` або використовуйте PowerShell з `Select-String -Pattern "intlayer"`.

**Виправте потенційні конфлікти глобальних залежностей**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

```bash
bun pm rm -g intlayer intlayer-cli
```

5. Спробуйте очистити кеш

У деяких середовищах, таких як Docker, GitHub Actions або хостинг-платформи на зразок Vercel, може бути задіяний кеш. Спробуйте очистити кеш і повторити встановлення.

Ви також можете очистити кеш вашого пакетного менеджера за допомогою наступних команд:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```

```bash
bun pm cache clean
```

6. Спробуйте видалити папку `.intlayer`

Intlayer кешує зібрану версію самої себе в папці `.intlayer/cache`.

Цей кеш може бути пошкоджений, якщо версія intlayer відрізняється від версії, збереженої в кеші.

Ви можете спробувати видалити папку `.intlayer` і повторити збірку.

```bash
rm -rf .intlayer
```
