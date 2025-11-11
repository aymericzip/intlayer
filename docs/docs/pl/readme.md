<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer: otwarte, elastyczne narzędzie i18n z tłumaczeniami wspieranymi przez AI oraz CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Dokumentacja</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="wersja npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Gwiazdy GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="miesięczne pobrania" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="licencja"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="ostatni commit"/>
  </a>
</p>

![Obejrzyj wideo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Czym jest Intlayer?

Większość bibliotek i18n jest albo zbyt skomplikowana, zbyt sztywna, albo nie została stworzona z myślą o nowoczesnych frameworkach.

Intlayer to **nowoczesne rozwiązanie i18n** dla aplikacji webowych i mobilnych.  
Jest niezależny od frameworka, **wspierany przez AI** i zawiera darmowy **CMS oraz edytor wizualny**.

Dzięki **plikom z treścią dla każdego języka**, **autouzupełnianiu w TypeScript**, **słownikom możliwym do tree-shakingu** oraz **integracji CI/CD**, Intlayer sprawia, że internacjonalizacja jest **szybsza, czystsza i inteligentniejsza**.

## Kluczowe zalety Intlayer:

| Funkcja                                                                                                                                             | Opis                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Funkcja" width="700">                          | **Wsparcie dla wielu frameworków**<br><br>Intlayer jest kompatybilny ze wszystkimi głównymi frameworkami i bibliotekami, w tym Next.js, React, Vite, Vue.js, Nuxt, Preact, Express i wieloma innymi.                                                                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Funkcja" width="700">       | **Zarządzanie treścią oparte na JavaScript**<br><br>Wykorzystaj elastyczność JavaScript do efektywnego definiowania i zarządzania swoją treścią. <br><br> - [Deklaracja treści](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Funkcja" width="700"> | **Plik deklaracji treści dla każdego języka**<br><br>Przyspiesz swój rozwój, deklarując treść raz, przed automatycznym generowaniem.<br><br> - [Plik deklaracji treści dla każdego języka](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Funkcja" width="700">                      | **Środowisko z bezpiecznym typowaniem**<br><br>Wykorzystaj TypeScript, aby zapewnić, że definicje treści i kod są wolne od błędów, a także skorzystaj z autouzupełniania w IDE.<br><br> - [Konfiguracja TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                     |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Funkcja" width="700">                         | **Uproszczona konfiguracja**<br><br>Rozpocznij pracę szybko przy minimalnej konfiguracji. Łatwo dostosuj ustawienia dotyczące internacjonalizacji, routingu, AI, budowania oraz obsługi treści. <br><br> - [Poznaj integrację z Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Funkcja" width="700">                   | **Uproszczone pobieranie treści**<br><br>Nie musisz wywoływać funkcji `t` dla każdej części treści. Pobierz całą swoją zawartość bezpośrednio za pomocą jednego hooka.<br><br> - [Integracja z React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Funkcja" width="700">                    | **Spójna implementacja komponentów serwerowych**<br><br>Idealnie dopasowana do komponentów serwerowych Next.js, używaj tej samej implementacji zarówno dla komponentów klienta, jak i serwera, bez potrzeby przekazywania funkcji `t` przez każdy komponent serwerowy. <br><br> - [Komponenty serwerowe](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Funkcja" width="700">                           | **Zorganizowana baza kodu**<br><br>Utrzymuj swoją bazę kodu w lepszym porządku: 1 komponent = 1 słownik w tym samym folderze. Tłumaczenia blisko odpowiednich komponentów, co zwiększa łatwość utrzymania i przejrzystość. <br><br> - [Jak działa Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Funkcja" width="700">                         | **Ulepszone routowanie**<br><br>Pełne wsparcie routingu aplikacji, płynnie dostosowujące się do złożonych struktur aplikacji, dla Next.js, React, Vite, Vue.js itp.<br><br> - [Poznaj integrację z Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Funkcja" width="700">                            | **Wsparcie Markdown**<br><br>Importuj i interpretuj pliki lokalizacyjne oraz zdalne pliki Markdown dla wielojęzycznych treści, takich jak polityki prywatności, dokumentacja itp. Interpretuj i udostępniaj metadane Markdown w swoim kodzie.<br><br> - [Pliki treści](https://intlayer.org/doc/concept/content/file)                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Funkcja" width="700">                       | **Bezpłatny Edytor Wizualny i CMS**<br><br>Dostępny jest bezpłatny edytor wizualny i CMS dla twórców treści, eliminując potrzebę korzystania z platformy lokalizacyjnej. Utrzymuj synchronizację treści za pomocą Git lub zewnętrznie zarządzaj nią całkowicie lub częściowo za pomocą CMS.<br><br> - [Edytor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Funkcja" width="700">                              | **Treść możliwa do tree-shakingu**<br><br>Treść możliwa do tree-shakingu, zmniejszająca rozmiar finalnego bundla. Ładuje treść na poziomie komponentu, wykluczając nieużywaną zawartość z bundla. Obsługuje lazy loading, aby zwiększyć efektywność ładowania aplikacji. <br><br> - [Optymalizacja budowania aplikacji](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Funkcja" width="700">                    | **Renderowanie statyczne**<br><br>Nie blokuje renderowania statycznego. <br><br> - [Integracja z Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Funkcja" width="700">                      | **Tłumaczenie wspomagane AI**<br><br>Przekształć swoją stronę internetową na 231 języków za pomocą jednego kliknięcia, korzystając z zaawansowanych narzędzi tłumaczeniowych Intlayer opartych na AI, używając własnego dostawcy AI / klucza API. <br><br> - [Integracja CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Automatyczne wypełnianie](https://intlayer.org/doc/concept/auto-fill) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Funkcja" width="700">                                 | **Integracja serwera MCP**<br><br>Udostępnia serwer MCP (Model Context Protocol) do automatyzacji IDE, umożliwiając płynne zarządzanie treścią i przepływy pracy i18n bezpośrednio w Twoim środowisku programistycznym. <br><br> - [Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **Rozszerzenie VSCode**<br><br>Intlayer dostarcza rozszerzenie do VSCode, które pomaga zarządzać Twoimi treściami i tłumaczeniami, budować słowniki, tłumaczyć zawartość i nie tylko. <br><br> - [Rozszerzenie VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperacyjność**<br><br>Umożliwia interoperacyjność z react-i18next, next-i18next, next-intl oraz react-intl. <br><br> - [Intlayer i react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer i next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer i next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                                                 |

---

## 📦 Instalacja

Rozpocznij swoją przygodę z Intlayer już dziś i doświadcz płynniejszego, bardziej zaawansowanego podejścia do internacjonalizacji.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Szybki start (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Pobierz pełny przewodnik → </a>

## 🎥 Tutorial na żywo na YouTube

[![Jak internacjonalizować swoją aplikację za pomocą Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Spis treści

Poznaj naszą obszerną dokumentację, aby rozpocząć pracę z Intlayer i dowiedzieć się, jak zintegrować go ze swoimi projektami.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Zacznij</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Dlaczego Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Wprowadzenie</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Koncepcja</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Jak działa Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Konfiguracja</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Dostawca AI</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Edytor Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">CMS Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Słownik</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Plik deklaracji treści na lokalizację</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Tłumaczenie</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Enumeracja</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Warunek</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Zagnieżdżanie</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Pobieranie funkcji</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Wstawianie</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Plik</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Środowisko</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer z Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Tanstack start</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">Lynx + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">Angular</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">Express</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">NestJS</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/what_is_internationalization.md">Czym jest i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n i SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer i i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer i react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer i next-intl</a></li>
</ul>
</details>

## 🌐 Readme w innych językach

[English](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[Français](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[한국어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[Español](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[Deutsch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[العربية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[Italiano](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[English (UK)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[Português](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[Türkçe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 Społeczność

Intlayer jest tworzony z myślą o społeczności i dla niej, dlatego bardzo cenimy Twoje uwagi!

- Masz sugestię? [Otwórz zgłoszenie](https://github.com/aymericzip/intlayer/issues)
- Znalazłeś błąd lub masz propozycję ulepszenia? [Prześlij PR](https://github.com/aymericzip/intlayer/pulls)
- Potrzebujesz pomocy lub chcesz się połączyć? [Dołącz do naszego Discorda](https://discord.gg/7uxamYVeCk)

Możesz także śledzić nas na:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer Facebook" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Wkład w projekt

Aby uzyskać bardziej szczegółowe wytyczne dotyczące wkładu w ten projekt, prosimy o zapoznanie się z plikiem [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Zawiera on istotne informacje na temat naszego procesu rozwoju, konwencji komunikatów commitów oraz procedur wydawniczych. Twoje wkłady są dla nas cenne i doceniamy Twoje starania w ulepszaniu tego projektu!

### Dziękujemy za wsparcie

Jeśli podoba Ci się Intlayer, daj nam ⭐ na GitHub. To pomaga innym odkryć projekt!

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
