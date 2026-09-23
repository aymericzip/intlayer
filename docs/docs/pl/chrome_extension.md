---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Rozszerzenie Chrome i Firefox, skaner i18n i SEO
description: Sprawdź konfigurację i18n dowolnej witryny za pomocą rozszerzenia Intlayer dla Chrome. Wykrywaj framework, bibliotekę i18n, ustawienia regionalne, tagi hreflang i SEO oraz przeprowadzaj pełny audyt i18n SEO.
keywords:
  - Rozszerzenie Chrome
  - Skaner i18n
  - Kontroler hreflang
  - Wielojęzyczne SEO
  - Intlayer
  - Lokalizacja
  - Narzędzia programistyczne
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Rozszerzenie Chrome i Firefox: skaner i18n i SEO

## Przegląd

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) to oficjalne rozszerzenie Chrome dla **Intlayer**. Otwórz je na dowolnej stronie internetowej, aby sprawdzić, jak witryna obsługuje internacjonalizację: jakiego frameworka i biblioteki i18n używa, jakie wersje językowe (locale) udostępnia oraz czy jej wielojęzyczne tagi SEO są poprawnie skonfigurowane.

Działa na każdej stronie internetowej, niezależnie od tego, czy używa Intlayer.

![Rozszerzenie Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[Link do rozszerzenia dla Chrome](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

[Link do dodatku dla Firefoksa](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)

## Funkcje

- **Wykrywanie technologii**: identyfikuje framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) oraz bibliotekę i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Każde wykrycie pokazuje dowody, które je wywołały, takie jak zmienna globalna, plik cookie lub znacznik DOM.
- **Wersje językowe (Locales)**: wyświetla listę wersji językowych znalezionych w atrybucie `lang`, tagach hreflang i `og:locale`, prefiksie URL oraz plikach cookie lub pamięci lokalnej.
- **Tagi SEO i18n**: sprawdza `html lang`, `html dir`, link kanoniczny, tagi hreflang, `x-default`, `og:locale` oraz stosunek zlokalizowanych linków wewnętrznych.
- **Przechodzenie między lokalizacjami**: jednym kliknięciem przełącza bieżącą stronę na dowolną z jej wersji zlokalizowanych, na podstawie tagów hreflang.
- **Wyszukiwanie w mapie witryny**: przeszukuje wszystkie strony wymienione w mapie witryny i otwiera je w bieżącej karcie.
- **Pełny audyt**: przeprowadza ten sam audyt, co [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner), i wyświetla wynik na żywo.

## Instalacja

<Tabs group="browser">
  <Tab label="Chrome" value="chrome">

Zainstaluj [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) z Chrome Web Store, a następnie przypnij go do paska narzędzi.

Rozszerzenie działa w przeglądarce Chrome oraz we wszystkich przeglądarkach opartych na Chromium, które obsługują rozszerzenia z Chrome Web Store (Edge, Brave, Arc, Opera).

  </Tab>
  <Tab label="Firefox" value="firefox">

Zainstaluj [**Intlayer i18n Scanner**](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/) z serwisu Dodatki do Firefoksa, a następnie przypnij go do paska narzędzi.

  </Tab>
</Tabs>

## Użycie

### Sprawdzanie strony

1. Otwórz stronę internetową, którą chcesz sprawdzić.
2. Kliknij ikonę **Intlayer i18n Scanner** na pasku narzędzi.
3. W wyskakującym okienku pojawią się sekcje **Wykryte technologie**, **Locales** oraz **Tagi SEO i18n** dla bieżącej strony.

Wykrywanie działa lokalnie w Twojej przeglądarce, tylko na aktywnej karcie.

### Przechodzenie między lokalizacjami

![Nawigacja rozszerzenia Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

Sekcja **Nawigacja** wyświetla **Wersje zlokalizowane** bieżącej strony, odczytane z jej tagów hreflang. Kliknij lokalizację, aby otworzyć tę wersję w bieżącej karcie.

W **Strony z mapy witryny** wpisz frazę, aby przeszukać adresy URL z mapy witryny, a następnie kliknij wynik, aby go otworzyć.

### Przeprowadzanie pełnego audytu

![Wynik audytu rozszerzenia Chrome Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Przewiń do sekcji **Pełny audyt** i kliknij **Uruchom pełny audyt i18n**. Wyniki pojawiają się na bieżąco w miarę kończenia poszczególnych testów, pogrupowane w:

- **Strona**: atrybuty `html lang` i `dir`, bieżąca wersja językowa, tagi hreflang, `x-default`, link kanoniczny, zlokalizowane linki wewnętrzne, selektor języka, ikony flag oraz nieużywana treść językowa dołączona do bundle'a JavaScript.
- **Robots.txt**: obecność pliku oraz informacja, czy ścieżki językowe są dostępne dla robotów indeksujących.
- **Sitemap**: obecność mapy witryny, lista wszystkich wersji językowych, linki alternatywne oraz `x-default`.
- **Domena**: liczba wersji językowych znalezionych w całej witrynie.

Każdy test jest oznaczany jako zaliczony, ostrzeżenie lub niezaliczony, a ogólny wynik podsumowuje stan SEO i18n strony.

## Prywatność i uprawnienia

Rozszerzenie wymaga minimalnych uprawnień:

- **activeTab** i **scripting**: detektor działa tylko na aktualnie przeglądanej karcie i tylko wtedy, gdy otworzysz wyskakujące okienko.
- **back.intlayer.org**: używane wyłącznie podczas uruchamiania pełnego audytu. Adres URL bieżącej strony jest wysyłany do API Intlayer w celu przeskanowania.

Historia przeglądania nie jest gromadzona, a w tle nic nie działa.

## FAQ

<FAQ>

<Question title="Czy strona internetowa musi używać Intlayer?">

Nie. Rozszerzenie sprawdza każdą stronę internetową, bez względu na używany framework czy bibliotekę i18n.

</Question>
<Question title="Dlaczego dana technologia nie została wykryta?">

Wykrywanie opiera się na informacjach, które strona ujawnia w przeglądarce: zmiennych globalnych, plikach cookie, tagach meta i znacznikach DOM. Niektóre kompilacje produkcyjne usuwają te znaczniki, dlatego biblioteka może być używana bez pozostawiania widocznego śladu.

</Question>
<Question title="Jak naprawić problemy znalezione podczas audytu?">

Większość testów odnosi się do ustawień routingu lub metadanych. W Intlayer hreflang, link kanoniczny, `x-default`, zlokalizowane linki, sitemap oraz robots.txt są generowane na podstawie [konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md). Zobacz przewodnik integracji dla swojego frameworka, na przykład [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nuxt.md) lub [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Powiązane narzędzia

- [Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- [Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)
- [Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)
