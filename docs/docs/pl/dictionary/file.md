---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Plik
description: Dowiedz się, jak osadzić zewnętrzne pliki w słowniku treści za pomocą funkcji `file`. Ta dokumentacja wyjaśnia, jak Intlayer dynamicznie łączy i zarządza zawartością plików.
keywords:
  - Plik
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Zawartość pliku / Osadzanie plików w Intlayer

W Intlayer funkcja `file` pozwala na osadzenie zawartości zewnętrznego pliku w słowniku. Takie podejście zapewnia, że Intlayer rozpoznaje plik źródłowy, umożliwiając płynną integrację z Intlayer Visual Editor i CMS.

## Dlaczego używać `file` zamiast `import`, `require` lub `fs`?

W przeciwieństwie do metod odczytu plików takich jak `import`, `require` czy `fs`, użycie `file` wiąże plik ze słownikiem, co pozwala Intlayer na śledzenie i dynamiczną aktualizację zawartości po edycji pliku. W efekcie użycie `file` zapewnia lepszą integrację z Intlayer Visual Editor i CMS.

## Konfiguracja zawartości pliku

Aby osadzić zawartość pliku w projekcie Intlayer, użyj funkcji `file` w module zawartości. Poniżej znajdują się przykłady różnych implementacji.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Typ słownika importowany z Intlayer
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // osadzenie pliku
  },
};

export default myFileContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Typ słownika importowany z Intlayer
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // osadzenie pliku
  },
};

module.exports = myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Używanie zawartości pliku w React Intlayer

Aby użyć osadzonej zawartości pliku w komponencie React, zaimportuj i użyj hooka `useIntlayer` z pakietu `react-intlayer`. Pozwala to na pobranie zawartości z określonego klucza i dynamiczne jej wyświetlenie.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Przykład wielojęzycznego Markdown

Aby obsługiwać wielojęzyczne edytowalne pliki Markdown, możesz użyć `file` w połączeniu z `t()` i `md()`, aby zdefiniować różne wersje językowe pliku z zawartością Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Ta konfiguracja pozwala na dynamiczne pobieranie zawartości w oparciu o preferencje językowe użytkownika. Gdy jest używana w Intlayer Visual Editor lub CMS, system rozpozna, że zawartość pochodzi z określonych plików Markdown i zapewni, że pozostaną one edytowalne.

## Różne typy ścieżek

Podczas używania funkcji `file` można stosować różne typy ścieżek do określenia pliku do osadzenia.

- `file("./path/to/file.txt")` - Ścieżka względna względem bieżącego pliku
- `file("path/to/file.txt")` - Ścieżka względna względem katalogu głównego projektu
- `file("/users/username/path/to/file.txt")` - Ścieżka absolutna

## Jak Intlayer obsługuje zawartość plików

Funkcja `file` opiera się na module `fs` Node.js, aby odczytać zawartość określonego pliku i wstawić ją do słownika. Używana w połączeniu z Intlayer Visual Editor lub CMS, Intlayer może śledzić relację między słownikiem a plikiem. Pozwala to Intlayer na:

- Rozpoznanie, że zawartość pochodzi z określonego pliku.
- Automatyczną aktualizację zawartości słownika, gdy powiązany plik zostanie edytowany.
- Zapewnić synchronizację między plikiem a słownikiem, zachowując integralność zawartości.

## Dodatkowe zasoby

Aby uzyskać więcej informacji na temat konfigurowania i używania osadzania plików w Intlayer, zapoznaj się z następującymi zasobami:

- [Dokumentacja Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md)
- [Dokumentacja React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_create_react_app.md)
- [Dokumentacja Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md)
- [Dokumentacja zawartości Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md)
- [Dokumentacja zawartości tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)

Te zasoby dostarczają dodatkowych informacji na temat osadzania plików, zarządzania zawartością oraz integracji Intlayer z różnymi frameworkami.
