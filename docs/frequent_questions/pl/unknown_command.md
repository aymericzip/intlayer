---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Nieznane polecenie
description: Dowiedz się, jak naprawić błąd nieznanego polecenia.
keywords:
  - nieznane
  - polecenie
  - błąd
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - restart
  - lokalny
slugs:
  - frequent-questions
  - unknown-command
---

# błąd: nieznane polecenie fill / build / itp.

Jeśli `npx intlayer fill --verbose` zwraca:

```
error: unknown command 'fill'
```

ale jesteś pewien, że polecenie `fill` _powinno_ istnieć, oto kroki, aby to rozwiązać:

## 1. **Upewnij się, że używasz najnowszej wersji**

Uruchom:

```bash
npx intlayer --version                  # aktualna lokalna wersja intlayer
npx intlayer@latest --version           # aktualna najnowsza wersja intlayer
```

To wymusza na `npx` pobranie najnowszej wersji. Następnie spróbuj ponownie:

```bash
npx intlayer@latest build --verbose
```

## 2. **Sprawdź, czy polecenie jest zarejestrowane**

Możesz to sprawdzić za pomocą:

```bash
npx intlayer --help                     # wyświetla informacje dotyczące poleceń
```

Sprawdź, czy polecenie pojawia się na liście poleceń.

Przejdź do repozytorium i potwierdź, że Twoje polecenie jest eksportowane i zarejestrowane w punkcie wejścia CLI. Intlayer używa frameworka `commander`.

Kod dotyczący CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Uruchom ponownie terminal**

Czasami konieczne jest ponowne uruchomienie terminala, aby rozpoznał nowe polecenia.

## 5. **Jeśli rozwijasz `intlayer`, przebuduj i połącz go**

Jeśli rozwijasz `intlayer` lokalnie:

```bash
# W katalogu intlayer
npm install
npm run build
npm link
```

Następnie w innym terminalu:

```bash
intlayer fill --verbose
```

To używa lokalnej wersji nad którą pracujesz.

## 6. **Wyczyść pamięć podręczną npx (jeśli utknąłeś na starszej wersji)**

```bash
npx clear-npx-cache
```

Lub ręcznie usuń pamięć podręczną pakietów intlayer:

```bash
rm -rf ~/.npm/_npx
```

Sprawdź odpowiednik, jeśli używasz pnpm, yarn, bun lub innego menedżera pakietów
