---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Benchmark bibliotek i18n
description: Dowiedz się, jak Intlayer wypada na tle innych bibliotek i18n pod względem wydajności i rozmiaru pakietu.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inicjalizacja benchmarka"
---

# Benchmark Bloom — Raport

Benchmark Bloom to zestaw testów wydajnościowych mierzących rzeczywisty wpływ bibliotek i18n (internacjonalizacji) w różnych frameworkach React i strategiach ładowania.

Szczegółowe raporty oraz dokumentację techniczną dla każdego frameworka znajdziesz poniżej:

- [**Raport Benchmark Next.js**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md)
- [**Raport Benchmark TanStack Start**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

---

## Aktualne Wyniki

Odwiedź [**interaktywny panel benchmarka**](https://intlayer.org/benchmark), aby zobaczyć porównania na żywo i dane podsumowujące.
| `scoped-dynamic` | Wysoka (wyciek bliski zeru) | Wysoka |

Przejście ze strategii `static` na `scoped-dynamic` zazwyczaj redukuje nieużywaną treść o 60–90%, ale wymaga znacznie większej konfiguracji. Biblioteki takie jak Intlayer automatyzują wzorzec scoped-dynamic, dzięki czemu programiści zyskują wydajność bez pisania powtarzalnego kodu.

### Jak czytać liczby dotyczące wycieków (leakage)

Wyciek strony na poziomie **35%** oznacza, że 35% kodu JavaScript pobranego dla danej strony zawiera ciągi znaków z innych stron — treści, których użytkownik nie widzi na tej stronie. Na stronie o rozmiarze 400 KB to ~140 KB danych, których można uniknąć.

Wyciek lokalizacji (locale leakage) na poziomie **10%** oznacza, że 10% pakietu zawiera tłumaczenia w językach, których bieżący użytkownik nie używa.

### Reaktywność a czas renderowania

- **Reaktywność E2E**: mierzy pełne doświadczenie użytkownika: sieć, narzut frameworka, aktualizację DOM.
- **Czas React Profilera**: izoluje koszt ponownego renderowania drzewa React.

Biblioteka może mieć niski czas Profilera, ale wysoki czas E2E, jeśli przełączanie języka wiąże się z żądaniem sieciowym (pobieraniem nowego pliku lokalizacji). I odwrotnie, biblioteka może mieć wysoki czas Profilera, ale nadal wydawać się szybka, jeśli wydajnie grupuje aktualizacje.
