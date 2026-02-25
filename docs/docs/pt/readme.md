<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logotipo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong>i18n por componente</strong>
</h1>
<h2 align="center">
  <strong>Tradução assistée por IA. Editor visual. CMS multilíngue.</strong>
</h2>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="versão npm" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Estrellas no GitHub" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="downloads mensais" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="licença"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="último commit"/>
  </a>
</p>

![Assista ao vídeo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Iniciar-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## O que é o Intlayer?

A maioria das bibliotecas i18n são ou muito complexas, ou muito rígidas, ou não foram projetadas para frameworks modernos.

Intlayer é uma **solução i18n moderna** para aplicações web e móveis.  
É agnóstico em relação ao framework, **baseado em IA**, e inclui um **CMS e um editor visual** gratuitos.

Com **ficheiros de conteúdo por localidade**, **autocompletar em TypeScript**, **dicionários tree-shakable** e **integração CI/CD**, o Intlayer torna a internacionalização **mais rápida, limpa e inteligente**.

## Principais benefícios do Intlayer:

| Funcionalidade                                                                                                                                      | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Suporte multi-framework**<br><br>O Intlayer é compatível com todos os principais frameworks e bibliotecas, incluindo Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e muito mais.                                                                                                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true" alt="Feature" width="700">       | **Gestão de conteúdo baseada em JavaScript**<br><br>Aproveite a flexibilidade do JavaScript para definir e gerir o seu conteúdo de forma eficiente. <br><br> - [Declaração de conteúdo](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Ficheiro de declaração de conteúdo por localidade**<br><br>Acelere o seu desenvolvimento declarando o seu conteúdo uma única vez, antes da geração automática.<br><br> - [Ficheiro de declaração de conteúdo por localidade](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">                            | **Compilador**<br><br>O compilador Intlayer extrai automaticamente o conteúdo dos componentes e gera os ficheiros de dicionário.<br><br> - [Compilador](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Ambiente tipado seguro**<br><br>Utilize o TypeScript para garantir que as suas definições de conteúdo e código estão livres de erros, beneficiando também da autocompletação no IDE.<br><br> - [Configuração do TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Configuração simplificada**<br><br>Comece rapidamente com uma configuração mínima. Ajuste facilmente definições para internacionalização, roteamento, IA, build e gestão de conteúdo. <br><br> - [Explore a integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Recuperação de conteúdo simplificada**<br><br>Não é necessário chamar a sua função `t` para cada elemento de conteúdo. Recupere todo o seu conteúdo diretamente utilizando um único hook.<br><br> - [Integração com React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                      |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Implementação consistente de componentes de servidor**<br><br>Perfeitamente adequado para componentes de servidor Next.js, utilize a mesma implementação tanto para componentes de cliente como de servidor, sem necessidade de passar a sua função `t` por cada componente de servidor. <br><br> - [Componentes de Servidor](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Base de código organizada**<br><br>Mantenha a sua base de código organizada: 1 componente = 1 dicionário na mesma pasta. Traduções próximas dos seus respectivos componentes melhoram a manutenção e a clareza. <br><br> - [Como o Intlayer funciona](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Roteamento aprimorado**<br><br>Suporte completo ao roteamento de aplicações, adaptando-se perfeitamente a estruturas complexas de aplicações, para Next.js, React, Vite, Vue.js, etc.<br><br> - [Explore a integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Suporte a Markdown**<br><br>Importe e interprete ficheiros locais e Markdown remoto para conteúdo multilíngue, como políticas de privacidade, documentação, etc. Interprete e torne os metadados do Markdown acessíveis no seu código.<br><br> - [Ficheiros de conteúdo](https://intlayer.org/doc/concept/content/file)                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Editor visual e CMS gratuitos**<br><br>Um editor visual e um CMS gratuitos estão disponíveis para redatores de conteúdo, eliminando a necessidade de uma plataforma de localização. Mantenha o seu conteúdo sincronizado utilizando Git, ou externalize-o total ou parcialmente com o CMS.<br><br> - [Editor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Conteúdo tree-shakable**<br><br>Conteúdo tree-shakable, reduzindo o tamanho do pacote final. Carrega o conteúdo por componente, excluindo qualquer conteúdo não utilizado do seu pacote. Suporta carregamento preguiçoso para melhorar a eficiência do carregamento da aplicação. <br><br> - [Otimização da build da app](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Renderização estática**<br><br>Não bloqueia a renderização estática. <br><br> - [Integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **Tradução baseada em IA**<br><br>Transforme o seu site em 231 idiomas com apenas um clique utilizando as avançadas ferramentas de tradução baseadas em IA da Intlayer, utilizando o seu próprio provedor de IA / chave API. <br><br> - [Integração CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI do Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Preenchimento automático](https://intlayer.org/doc/concept/auto-fill)                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **Integração do servidor MCP**<br><br>Fornece um servidor MCP (Model Context Protocol) para automação de IDE, permitindo uma gestão de conteúdo e fluxos de trabalho i18n contínuos diretamente dentro do seu ambiente de desenvolvimento. <br><br> - [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **Extensão VSCode**<br><br>O Intlayer fornece uma extensão para VSCode para ajudar você a gerir o seu conteúdo e traduções, construir os seus dicionários, traduzir o seu conteúdo e muito mais. <br><br> - [Extensão VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperabilidade**<br><br>Permite interoperabilidade com react-i18next, next-i18next, next-intl, react-intl, vue-i18n. <br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer e vue-i18n](https://intlayer.org/blog/intlayer-with-vue-i18n) |

---

## 📦 Instalação

Comece hoje a sua jornada com o Intlayer e experimente uma abordagem mais suave e poderosa para internacionalização.

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Iniciar-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Início rápido (Next.js)

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

```ts
// app/home.content.ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "home",
  content: {
    title: t({
      en: "Home",
      fr: "Accueil",
      es: "Inicio",
    }),
  },
} satisfies Dictionary;

export default content;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const HomePage = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> Obtenha o guia completo → </a>

## 🎥 Tutorial ao vivo no YouTube

[![How to Internationalize your application using Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content" rel="">
  <img src="https://img.shields.io/badge/Iniciar-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Índice

Explore a nossa documentação completa para começar com o Intlayer e aprender como integrá-lo nos seus projetos.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Começar</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why" rel=''>Porquê o Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc" rel=''>Introdução</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Conceito</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer" rel=''>Como o Intlayer funciona</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration" rel=''>Configuração</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli" rel=''>Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/compiler" rel=''>Compilador</a></li>

  <li><a href="https://intlayer.org/doc/concept/editor" rel=''>Editor Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms" rel=''>CMS Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/content" rel=''>Dicionário</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file" rel=''>Ficheiro de declaração de conteúdo por localidade</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation" rel=''>Tradução</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration" rel=''>Enumeração</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition" rel=''>Condição</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting" rel=''>Aninhamento</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown" rel=''>Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching" rel=''>Busca de funções</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion" rel=''>Inserção</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file" rel=''>Ficheiro</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Ambiente</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs" rel=''>Intlayer com Next.js 16</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/15" rel=''>Next.js 15</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14" rel=''>Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router" rel=''>Next.js Page Router</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/compiler" rel=''>Next.js utilizando o compilador</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app" rel=''>React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react" rel=''>Vite + React utilizando o compilador</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/compiler" rel=''>React-router-v7</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start" rel=''>Tanstack start</a></li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo" rel=''>React Native</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte" rel=''>Vite + Svelte</a></li>
  <li><a href="https://intlayer.org/doc/environment/sveltekit" rel=''>SvelteKit</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact" rel=''>Vite + Preact</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue" rel=''>Vite + Vue</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt" rel=''>Vite + Nuxt</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid" rel=''>Vite + Solid</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular" rel=''>Angular</a></li>
  <li>
     <a href="https://intlayer.org/doc/environment/express" rel=''>Backend</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/express" rel=''>Express</a></li>
      <li><a href="https://intlayer.org/doc/environment/nest" rel=''>NestJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/fastify" rel=''>Fastify</a></li>
      <li><a href="https://intlayer.org/doc/environment/adonisjs" rel=''>AdonisJS</a></li>
      <li><a href="https://intlayer.org/doc/environment/hono" rel=''>Hono</a></li>
    </ul>
  </li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 Blog</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/what_is_internationalization.md" rel=''>O que é i18n ?</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n" rel=''>i18n e SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next" rel=''>Intlayer e i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next" rel=''>Intlayer e react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl" rel=''>Intlayer e next-intl</a></li>
</ul>
</details>

## 🌐 Readme noutros idiomas

<p align="center">
  <a href="https://github.com/aymericzip/intlayer/blob/main/readme.md">English</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md">Русский</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md">日本語</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md">한국어</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md">Español</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md">Deutsch</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md">العربية</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md">Italiano</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md">English (UK)</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md">Português</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md">हिन्दी</a> •
  <a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md">Türkçe</a>
</p>

## 🤝 Comunidade

O Intlayer é construído com e para a comunidade e adoraríamos receber o seu feedback!

- Uma sugestão? [Abra uma issue](https://github.com/aymericzip/intlayer/issues)
- Um bug ou uma melhoria? [Envie uma PR](https://github.com/aymericzip/intlayer/pulls)
- Precisa de ajuda ou quer conectar-se? [Junte-se ao nosso Discord](https://discord.gg/7uxamYVeCk)

Você também pode seguir-nos em:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer Instagram" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer X" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank" rel='noopener noreferrer nofollow'><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Contribuição

Para diretrizes mais detalhadas sobre como contribuir para este projeto, por favor consulte o ficheiro [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Ele contém informações essenciais sobre o nosso processo de desenvolvimento, convenções para mensagens de commit e procedimentos de lançamento. As suas contribuições são valiosas para nós e agradecemos os seus esforços para melhorar este projeto!

Contribua em [GitHub](https://github.com/aymericzip/intlayer), [GitLab](https://gitlab.com/ay.pineau/intlayer) ou [Bitbucket](https://bitbucket.org/intlayer/intlayer/).

### Obrigado pelo apoio

Se gosta do Intlayer, dê-nos uma ⭐ no GitHub. Ajuda outras pessoas a descobrirem o projeto! [Saiba por que as estrelas do GitHub contam](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md#why-github-stars-matter-).

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
