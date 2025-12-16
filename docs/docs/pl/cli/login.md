---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Logowanie
description: Dowiedz się, jak użyć polecenia login w Intlayer CLI, aby uwierzytelnić się w Intlayer CMS i uzyskać dane dostępowe.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
---

# Polecenie logowania Intlayer CLI

---

## Opis

Polecenie `login` w Intlayer CLI umożliwia uwierzytelnienie w Intlayer CMS. Polecenie to automatycznie otwiera domyślną przeglądarkę, aby dokończyć proces uwierzytelniania i otrzymać niezbędne dane dostępowe (Client ID i Client Secret) do korzystania z usług Intlayer.

## Użycie

```bash
npx intlayer login [options]
```

or

```bash
intlayer login [options]
```

## Opcje

### `--cms-url <url>`

Określa URL Intlayer CMS, z którym należy się połączyć w celu uwierzytelnienia.

- **Typ**: `string`
- **Domyślnie**: Wartość skonfigurowana w `intlayer.config.*` lub `https://intlayer.org`
- **Przykład**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Opcje konfiguracji

Możesz także użyć standardowych opcji konfiguracji:

- `--env-file <path>`: Ścieżka do pliku środowiskowego
- `-e, --env <env>`: Środowisko wykonawcze
- `--base-dir <dir>`: Katalog bazowy projektu
- `--verbose`: Włącz szczegółowe logowanie (domyślnie: true)
- `--prefix <prefix>`: Prefiks dla logów

## Jak to działa

1. **Uruchomienie serwera lokalnego**: Polecenie uruchamia lokalny serwer HTTP na losowym porcie, aby odebrać poświadczenia z CMS

Określ URL Intlayer CMS, z którym należy się połączyć w celu uwierzytelnienia.

- **Typ**: `string`
- **Domyślna wartość**: Wartość skonfigurowana w `intlayer.config.*` lub `https://intlayer.org`
- **Przykład**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Opcje konfiguracyjne

Możesz również użyć ogólnych opcji konfiguracyjnych:

- `--env-file <path>`: Ścieżka do pliku środowiskowego
- `-e, --env <env>`: Środowisko wykonawcze
- `--base-dir <dir>`: Katalog główny projektu
- `--verbose`: Włącz szczegółowe wyjście (domyślnie: true)
- `--prefix <prefix>`: Prefiks dla logów

## Jak to działa

1. **Uruchomienie lokalnego serwera**: Polecenie uruchamia lokalny serwer HTTP na losowym porcie, aby odebrać dane dostępowe od CMS
2. **Otwieranie przeglądarki**: Polecenie automatycznie otworzy domyślną przeglądarkę do adresu logowania CMS
3. **Uwierzytelnianie**: Ukończ proces uwierzytelniania w przeglądarce, używając konta Intlayer
4. **Odbiór poświadczeń**: Serwer lokalny otrzymuje Client ID i Client Secret od CMS
5. **Instrukcje**: Polecenie wyświetla instrukcje konfiguracji poświadczeń w Twoim projekcie

## Wyjście

Po pomyślnym logowaniu polecenie wyświetli:

1. **Otrzymane poświadczenia** (Client ID i Client Secret)
2. **Instrukcje dla pliku `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Instrukcje dla pliku konfiguracyjnego Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Ręczna konfiguracja

Jeśli przeglądarka nie otworzy się automatycznie, możesz ręcznie odwiedzić URL wyświetlony w terminalu.

## Przykłady

### Logowanie z niestandardowym URL CMS

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Logowanie z określonym plikiem środowiskowym

```bash
npx intlayer login --env-file .env.production
```

### Logowanie w trybie verbose

```bash
npx intlayer login --verbose
```

## Rozwiązywanie problemów

### Przeglądarka się nie otwiera

Jeśli przeglądarka nie otworzy się automatycznie, skopiuj URL wyświetlony w terminalu i otwórz go ręcznie w przeglądarce.

### Problemy z połączeniem

Jeśli wystąpią problemy z połączeniem, sprawdź:

1. Czy adres URL CMS jest poprawny
2. Czy połączenie internetowe działa poprawnie
3. Czy żadne zapory sieciowe (firewalle) nie blokują połączenia
4. Że Twoje połączenie z internetem działa poprawnie
5. Że żadne zapory sieciowe nie blokują połączenia

### Nie otrzymano poświadczeń

Jeśli poświadczenia nie zostały otrzymane:

1. Upewnij się, że zakończyłeś proces uwierzytelniania w przeglądarce
2. Sprawdź, czy lokalny port nie jest zablokowany
3. Spróbuj ponownie uruchomić polecenie

## Następne kroki

Po zakończeniu logowania:

1. Dodaj poświadczenia do pliku `.env`
2. Skonfiguruj plik `intlayer.config.*`, używając tych poświadczeń
3. Użyj poleceń CLI do zarządzania słownikami:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/push.md) - Prześlij słowniki do CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/pull.md) - Pobierz słowniki z CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) - Wypełnij brakujące tłumaczenia

## Zobacz także

- [Dokumentacja CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
- [Konfiguracja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
