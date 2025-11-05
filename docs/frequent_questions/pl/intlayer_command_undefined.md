---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Komenda Intlayer niezdefiniowana
description: Dowiedz się, jak naprawić błąd niezdefiniowanej komendy intlayer.
keywords:
  - intlayer
  - komenda
  - niezdefiniowana
  - błąd
  - vscode
  - rozszerzenie
  - wtyczka
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - intlayer-command-undefined
---

# Komenda Intlayer niezdefiniowana

## Przegląd

CLI Intlayer zapewnia wygodny sposób zarządzania zawartością intlayer, w tym budowanie słowników, przesyłanie tłumaczeń i inne. Jednak nie jest to niezbędne do działania Twojego projektu. Jeśli używasz wtyczki bundlera (takiej jak `withIntlayer()` dla Next.js lub `intlayer()` dla Vite), Intlayer automatycznie zbuduje słowniki podczas budowania aplikacji lub uruchamiania serwera deweloperskiego. W trybie deweloperskim będzie również monitorować zmiany i automatycznie przebudowywać pliki deklaracji zawartości.

Możesz uzyskać dostęp do poleceń intlayer na różne sposoby:

- Używając bezpośrednio polecenia CLI `intlayer`
- Korzystając z [rozszerzenia VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- Używając SDK `@intlayer/cli`

## Problem

Podczas próby użycia polecenia `intlayer` możesz napotkać ten błąd:

```bash
'intlayer' nie jest rozpoznawany jako polecenie wewnętrzne lub zewnętrzne,
program wykonywalny lub plik wsadowy.
```

## Rozwiązania

Wypróbuj te rozwiązania w kolejności:

1. **Sprawdź, czy polecenie jest zainstalowane**

```bash
npx intlayer -h
```

Oczekiwany wynik:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            wyświetl numer wersji
    -h, --help               wyświetl pomoc dla polecenia

Commands:
    dictionary|dictionaries  operacje na słownikach
    configuration|config     operacje konfiguracyjne
    help [command]           wyświetl pomoc dla polecenia
```

2. **Zainstaluj globalnie pakiet intlayer-cli**

```bash
npm install intlayer-cli -g -g
```

> Nie powinno to być konieczne, jeśli już zainstalowałeś pakiet `intlayer`

3. **Zainstaluj pakiet globalnie**

```bash
npm install intlayer -g
```

4. **Uruchom ponownie terminal**  
   Czasami konieczne jest ponowne uruchomienie terminala, aby rozpoznał nowe polecenia.

5. **Wyczyść i zainstaluj ponownie**  
   Jeśli powyższe rozwiązania nie działają:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Zweryfikuj pliki instalacyjne**  
   Jeśli problem nadal występuje, sprawdź, czy istnieją następujące pliki:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (powinien zawierać pole `bin` wskazujące na `./dist/cjs/cli.cjs`)

7. **Sprawdź zmienną środowiskową PATH**  
   Upewnij się, że globalny katalog binarny npm jest w Twojej zmiennej PATH:

```bash
# Dla systemów Unix (macOS/Linux)
echo $PATH
# Powinno zawierać coś w stylu /usr/local/bin lub ~/.npm-global/bin

# Dla Windows
echo %PATH%
# Powinno zawierać katalog globalny bin npm
```

8. **Użyj npx z pełną ścieżką**  
   Jeśli polecenie nadal nie jest znalezione, spróbuj użyć npx z pełną ścieżką:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Sprawdź konflikty instalacji**

```bash
# Wyświetl wszystkie globalnie zainstalowane pakiety
npm list -g --depth=0

# Usuń wszelkie konfliktujące globalne instalacje
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Następnie zainstaluj ponownie
npm install -g intlayer
```

10. **Zweryfikuj wersje Node.js i npm**  
    Upewnij się, że używasz kompatybilnych wersji:

```bash
node --version
npm --version
```

    Jeśli używasz przestarzałej wersji, rozważ aktualizację Node.js i npm.

11. **Sprawdź problemy z uprawnieniami**  
    Jeśli pojawiają się błędy związane z uprawnieniami:

    ```bash
    # Dla systemów opartych na Unix
    sudo npm install -g intlayer

    # Lub zmień domyślny katalog npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Dodaj do swojego ~/.profile lub ~/.bashrc:
    export PATH=~/.npm-global/bin:$PATH
    ```
