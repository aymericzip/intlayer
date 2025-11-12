---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Otrzymuję błąd związany z sub-pakietami `@intlayer/*`
description: Napraw błąd związany z sub-pakietami `@intlayer/*`.
keywords:
  - @intlayer/*
  - sub-pakiety
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Otrzymuję błąd związany z sub-pakietami `@intlayer/*`

Ten problem zwykle występuje po aktualizacji pakietów Intlayer.

Przykład komunikatu o błędzie:

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

✖ BŁĄD  Brak odpowiedniego eksportu w "node_modules/@intlayer/config/dist/esm/client.mjs" dla importu "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Powód

Podstawowe pakiety takie jak `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` ponownie wykorzystują te same sub-pakiety jak `@intlayer/config`, `@intlayer/core`, `@intlayer/types`, aby uniknąć duplikacji kodu.

Między dwiema wersjami eksporty sub-pakietów nie są gwarantowane jako identyczne. Aby ograniczyć ten problem, intlayer przypisuje wersję sub-pakietów do wersji głównego pakietu.

> Przykład: `intlayer@1.0.0` używa `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Z wyjątkiem `@intlayer/swc`), sub-pakiety `@intlayer/*` nie są przeznaczone do bezpośredniego użycia. Dlatego zalecamy, aby ich nie instalować bezpośrednio.

## Rozwiązanie

1. Upewnij się, że wersje głównego pakietu i sub-pakietów są takie same.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Nieprawidłowa wersja, powinna być 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Spróbuj usunąć plik blokady (lockfile) oraz folder node_modules i ponownie zainstalować zależności.

Czasami menedżer pakietów przechowuje starą wersję sub-pakietów w pliku blokady w pamięci podręcznej. Aby to naprawić, możesz spróbować usunąć plik blokady oraz folder node_modules i ponownie zainstalować zależności.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Sprawdź instalację globalną

Zalecamy zainstalowanie `intlayer` lub `intlayer-cli` globalnie, aby mieć dostęp do poleceń CLI. Jeśli wersja globalna różni się od wersji lokalnej, menedżer pakietów może uznać niewłaściwą wersję.

**Sprawdź, czy pakiet jest zainstalowany globalnie**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Napraw potencjalne konflikty zależności globalnych**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Spróbuj wyczyścić pamięć podręczną

W niektórych środowiskach, takich jak docker, github actions czy platformy hostingowe jak Vercel, może istnieć pamięć podręczna. Możesz spróbować wyczyścić pamięć podręczną i ponowić instalację.

Możesz także spróbować wyczyścić pamięć podręczną menedżera pakietów za pomocą następującego polecenia:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
