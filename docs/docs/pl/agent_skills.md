---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Umiejętności agenta
description: Dowiedz się, jak używać Intlayer Agent Skills, aby poprawić zrozumienie Twojego projektu przez agenta AI, w tym kompleksowe przewodniki konfiguracji dla metadanych, map witryn i akcji serwera.
keywords:
  - Intlayer
  - Agent Skills
  - Agent AI
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Historia początkowa
---

# Umiejętności agenta

## Konfiguracja

### Użycie interfejsu CLI

Polecenie `intlayer init skills` to najprostszy sposób na skonfigurowanie umiejętności agenta w Twoim projekcie. Wykrywa Twoje środowisko i instaluje niezbędne pliki konfiguracyjne dla preferowanych platform.

```bash
npx intlayer init skills
```

### Użycie zestawu SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Użycie rozszerzenia VS Code

1. Otwórz Paletę Poleceń (Ctrl+Shift+P lub Cmd+Shift+P).
2. Wpisz `Intlayer: Setup AI Agent Skills`
3. Wybierz platformę, której używasz (np. `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace` itp.).
4. Wybierz Umiejętności, które chcesz zainstalować (np. `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Naciśnij Enter.

## Lista umiejętności

**intlayer-config**

- Umożliwia agentowi zrozumienie specyficznych ustawień i18n Twojego projektu, pozwalając mu na dokładne skonfigurowanie lokalizacji, wzorców routingu i strategii wycofywania.

**intlayer-cli**

- Umożliwia agentowi samodzielnie zarządzanie cyklem życia tłumaczeń, w tym audyt brakujących tłumaczeń, budowanie słowników i synchronizację treści za pomocą wiersza poleceń.

**intlayer-angular**

- Wyposaża agenta w wiedzę specyficzną dla frameworka w celu poprawnej implementacji reaktywnych wzorców i18n i sygnałów zgodnie z najlepszymi praktykami Angulara.

**intlayer-astro**

- Zapewnia agentowi wiedzę niezbędną do obsługi tłumaczeń po stronie serwera i zlokalizowanych wzorców routingu unikalnych dla ekosystemu Astro.

**intlayer-content**

- Uczy agenta, jak korzystać z zaawansowanych węzłów treści — takich jak liczba mnoga, warunki i markdown — w celu tworzenia bogatych, dynamicznych i zlokalizowanych słowników.

**intlayer-next-js**

- Daje agentowi wiedzę niezbędną do wdrożenia i18n w komponentach serwerowych i klienckich Next.js, zapewniając optymalizacji SEO i bezproblemowy zlokalizowany routing.

**intlayer-react**

- Zapewnia agentowi specjalistyczną wiedzę w celu wydajnego wdrażania deklaratywnych komponentów i hooków i18n deklaratywnych w dowolnym środowisku opartym na React.

**intlayer-preact**

- Optymalizuje zdolność agenta do implementacji i18n dla Preact, umożliwiając mu pisanie lekkich, zlokalizowanych komponentów przy użyciu sygnałów i wydajnych wzorców reaktywnych.

**intlayer-solid**

- Umożliwia agentowi wykorzystanie drobnoziarnistej reaktywności SolidJS do wysokowydajnego zarządzania zlokalizowaną treścią.

**intlayer-svelte**

- Uczy agenta korzystania ze store'ów Svelte i idiomatycznej składni dla reaktywnych i bezpiecznych typowo zlokalizowanych treści w aplikacjach Svelte i SvelteKit.

**intlayer-cms**

- Pozwala agentowi na integrację i zarządzanie zdalną treścią, umożliwiając mu obsługę synchronizacji na żywo i przepływów pracy zdalnego tłumaczenia za pośrednictwem Intlayer CMS.

**intlayer-usage**

- Standaryzuje podejście agenta do struktury projektu i deklaracji treści, zapewniając, że postępuje on zgodnie z najskuteczniejszymi procesami dla Twojego projektu i18n.

**intlayer-vue**

- Wyposaża agenta we wzorce specyficzne dla Vue — w tym Composable i wsparcie dla Nuxt — w celu budowania nowoczesnych, zlokalizowanych aplikacji internetowych.

**intlayer-compiler**

- Upraszcza przepływ pracy agenta poprzez umożliwienie automatycznej ekstrakcji treści, pozwalając mu na pisanie tłumaczywalnych ciągów znaków bezpośrednio w kodzie bez konieczności ręcznego tworzenia plików słownika.
