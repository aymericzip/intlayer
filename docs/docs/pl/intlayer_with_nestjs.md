---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Jak przetłumaczyć backend Nest – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swój backend vite wielojęzycznym. Postępuj zgodnie z dokumentacją, aby internacjonalizować (i18n) i tłumaczyć.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: Dokumentacja początkowa
---

# Tłumaczenie backendu Nest za pomocą Intlayer | Internacjonalizacja (i18n)

`express-intlayer` to potężne middleware do internacjonalizacji (i18n) dla aplikacji Express, zaprojektowane tak, aby uczynić Twoje usługi backendowe globalnie dostępnymi poprzez dostarczanie spersonalizowanych odpowiedzi w oparciu o preferencje klienta. Ponieważ NestJS jest zbudowany na bazie Express, możesz bezproblemowo zintegrować `express-intlayer` ze swoimi aplikacjami NestJS, aby skutecznie obsługiwać wielojęzyczne treści.

Praktyczne przypadki użycia

- **Wyświetlanie błędów backendu w języku użytkownika**: Gdy wystąpi błąd, wyświetlanie komunikatów w ojczystym języku użytkownika poprawia zrozumienie i zmniejsza frustrację. Jest to szczególnie przydatne dla dynamicznych komunikatów o błędach, które mogą być wyświetlane w komponentach front-end, takich jak toasty czy modale.

- **Pobieranie wielojęzycznych treści**: Dla aplikacji pobierających treści z bazy danych, internacjonalizacja zapewnia możliwość serwowania tych treści w wielu językach. Jest to kluczowe dla platform takich jak sklepy e-commerce czy systemy zarządzania treścią, które muszą wyświetlać opisy produktów, artykuły i inne treści w języku preferowanym przez użytkownika.

- **Wysyłanie wielojęzycznych e-maili**: Niezależnie od tego, czy są to e-maile transakcyjne, kampanie marketingowe czy powiadomienia, wysyłanie wiadomości w języku odbiorcy może znacząco zwiększyć zaangażowanie i skuteczność.

- **Wielojęzyczne powiadomienia push**: W przypadku aplikacji mobilnych, wysyłanie powiadomień push w preferowanym przez użytkownika języku może zwiększyć interakcję i retencję. Ten osobisty akcent sprawia, że powiadomienia wydają się bardziej istotne i angażujące.

- **Inne formy komunikacji**: Każda forma komunikacji z backendu, taka jak wiadomości SMS, alerty systemowe czy aktualizacje interfejsu użytkownika, zyskuje na tym, że jest w języku użytkownika, co zapewnia jasność przekazu i poprawia ogólne doświadczenie użytkownika.

Dzięki internacjonalizacji backendu Twoja aplikacja nie tylko szanuje różnice kulturowe, ale także lepiej dostosowuje się do potrzeb globalnego rynku, co jest kluczowym krokiem w skalowaniu usług na całym świecie.

## Pierwsze kroki

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nestjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-nestjs-template) na GitHub.

### Utwórz nowy projekt NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Instalacja

Aby rozpocząć korzystanie z `express-intlayer`, zainstaluj pakiet za pomocą npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Konfiguracja tsconfig.json

Aby używać Intlayer z TypeScript, upewnij się, że twój plik `tsconfig.json` jest skonfigurowany do obsługi modułów ES. Możesz to zrobić, ustawiając opcje `module` oraz `moduleResolution` na `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... inne opcje
  },
}
```

### Konfiguracja

Skonfiguruj ustawienia internacjonalizacji, tworząc plik `intlayer.config.ts` w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Zadeklaruj swoją zawartość

Twórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że znajdują się w katalogu `contentDir` (domyślnie `./src`). I mają rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](/doc/concept/content).

### Konfiguracja middleware Express

Zintegruj middleware `express-intlayer` ze swoją aplikacją NestJS, aby obsługiwać internacjonalizację:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Zastosuj do wszystkich tras
  }
}
```

### Używanie tłumaczeń w usługach lub kontrolerach

Możesz teraz użyć funkcji `getIntlayer`, aby uzyskać dostęp do tłumaczeń w swoich usługach lub kontrolerach:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // pobierz tłumaczenie "greet" z przestrzeni "app"
  }
}
```

### Kompatybilność

`express-intlayer` jest w pełni kompatybilny z:

- [`react-intlayer`](/doc/packages/react-intlayer) dla aplikacji React
- [`next-intlayer`](/doc/packages/next-intlayer) dla aplikacji Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) dla aplikacji Vite

Działa również bezproblemowo z dowolnym rozwiązaniem do internacjonalizacji w różnych środowiskach, w tym w przeglądarkach i zapytaniach API. Możesz dostosować middleware, aby wykrywać lokalizację za pomocą nagłówków lub ciasteczek:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Inne opcje konfiguracji
  middleware: {
    headerName: "my-locale-header", // nazwa nagłówka do wykrywania lokalizacji
    cookieName: "my-locale-cookie", // nazwa ciasteczka do wykrywania lokalizacji
  },
};

export default config;
```

Domyślnie `express-intlayer` interpretuje nagłówek `Accept-Language`, aby określić preferowany język klienta.

> Aby uzyskać więcej informacji na temat konfiguracji i zaawansowanych zagadnień, odwiedź naszą [dokumentację](/doc/concept/configuration).

### Konfiguracja TypeScript

`express-intlayer` wykorzystuje solidne możliwości TypeScript, aby usprawnić proces internacjonalizacji. Statyczne typowanie w TypeScript zapewnia, że każdy klucz tłumaczenia jest uwzględniony, co zmniejsza ryzyko brakujących tłumaczeń i poprawia utrzymanie kodu.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że autogenerowane typy (domyślnie w ./types/intlayer.d.ts) są uwzględnione w pliku tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  include: [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Rozszerzenie VS Code

Aby poprawić doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji o korzystaniu z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```
