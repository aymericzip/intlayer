---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Statyczne vs dynamiczne renderowanie z i18n w Next.js
description: Dowiedz się, jak używać statycznego i dynamicznego renderowania z i18n w Next.js.
keywords:
  - statyczne
  - dynamiczne
  - renderowanie
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - konfiguracja
slugs:
  - frequent-questions
  - static-rendering
---

# Statyczne vs dynamiczne renderowanie z i18n w Next.js

## Problem z **next-intl**

- **Co się dzieje?**
  Gdy używasz `useTranslations`, `getTranslations` lub jakiegokolwiek helpera next-intl _wewnątrz komponentu serwerowego_ w aplikacji z trasowaniem i18n (`/en/…`, `/fr/…`), Next.js oznacza całą trasę jako **dynamiczną**. ([Next Intl][1])

- **Dlaczego?**
  next-intl odczytuje bieżący locale z nagłówka dostępnego tylko w żądaniu (`x-next-intl-locale`) za pomocą `headers()`. Ponieważ `headers()` jest **dynamicznym API**, każdy komponent, który z niego korzysta, traci optymalizację statyczną. ([Next Intl][1], [Next.js][2])

- **Oficjalne obejście (boilerplate)**
  1. Eksportuj `generateStaticParams` dla każdego obsługiwanego locale.
  2. Wywołaj `setRequestLocale(locale)` w **każdym** layoucie/stronie _przed_ wywołaniem `useTranslations`. ([Next Intl][1])
     To usuwa zależność od nagłówka, ale teraz masz dodatkowy kod do utrzymania oraz niestabilne API w produkcji.

## Jak **intlayer** omija ten problem

**Wybory projektowe**

1. **Tylko parametr trasy** – Locale pochodzi z segmentu URL `[locale]`, który Next.js już przekazuje do każdej strony.
2. **Pakiety w czasie kompilacji** – Tłumaczenia są importowane jako zwykłe moduły ES, dzięki czemu są poddawane tree-shakingowi i osadzane podczas budowania.
3. **Brak dynamicznych API** – `useT()` odczytuje dane z kontekstu React, a nie z `headers()` czy `cookies()`.
4. **Zero dodatkowej konfiguracji** – Gdy Twoje strony znajdują się pod `app/[locale]/`, Next.js automatycznie prerenderuje jeden plik HTML na locale.
