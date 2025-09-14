<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Logotipo Intlayer" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer: um kit de ferramentas i18n flexível e de código aberto com tradução alimentada por IA e CMS.</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">Documentação</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="versão npm" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="Estrelas no GitHub" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="downloads mensais" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="licença"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="último commit"/>
  </a>
</p>

![Assista ao vídeo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Iniciar-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## O que é o Intlayer?

A maioria das bibliotecas i18n são ou muito complexas, muito rígidas, ou não foram construídas para frameworks modernos.

Intlayer é uma **solução i18n moderna** para aplicativos web e móveis.  
É agnóstico em relação ao framework, **potencializado por IA**, e inclui um **CMS e editor visual** gratuitos.

Com **arquivos de conteúdo por localidade**, **autocompletar em TypeScript**, **dicionários tree-shakable** e **integração CI/CD**, o Intlayer torna a internacionalização **mais rápida, limpa e inteligente**.

## Principais benefícios do Intlayer:

| Recurso                                                                                                                                             | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **Suporte Multiplataformas**<br><br>Intlayer é compatível com todos os principais frameworks e bibliotecas, incluindo Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e muito mais.                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **Gestão de Conteúdo com JavaScript**<br><br>Aproveite a flexibilidade do JavaScript para definir e gerir o seu conteúdo de forma eficiente. <br><br> - [Declaração de conteúdo](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **Ficheiro de Declaração de Conteúdo por Localidade**<br><br>Acelere o seu desenvolvimento declarando o seu conteúdo uma única vez, antes da geração automática.<br><br> - [Ficheiro de Declaração de Conteúdo por Localidade](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                           |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **Ambiente com Tipagem Segura**<br><br>Aproveite o TypeScript para garantir que as suas definições de conteúdo e código estão livres de erros, beneficiando também da autocompletação no IDE.<br><br> - [Configuração do TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **Configuração Simplificada**<br><br>Comece rapidamente com uma configuração mínima. Ajuste facilmente as definições para internacionalização, roteamento, IA, build e manipulação de conteúdo.<br><br> - [Explore a integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **Recuperação de Conteúdo Simplificada**<br><br>Não é necessário chamar sua função `t` para cada conteúdo. Recupere todo o seu conteúdo diretamente usando um único hook.<br><br> - [Integração com React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **Implementação Consistente de Componentes de Servidor**<br><br>Perfeitamente adequado para componentes de servidor Next.js, use a mesma implementação tanto para componentes cliente quanto para componentes de servidor, sem necessidade de passar sua função `t` por cada componente de servidor. <br><br> - [Componentes de Servidor](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **Base de Código Organizada**<br><br>Mantenha sua base de código mais organizada: 1 componente = 1 dicionário na mesma pasta. Traduções próximas aos seus respectivos componentes, melhorando a manutenção e a clareza. <br><br> - [Como o Intlayer funciona](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **Roteamento Aprimorado**<br><br>Suporte completo ao roteamento de aplicativos, adaptando-se perfeitamente a estruturas complexas de aplicações, para Next.js, React, Vite, Vue.js, etc.<br><br> - [Explore a integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **Suporte a Markdown**<br><br>Importe e interprete arquivos de localidade e Markdown remoto para conteúdo multilíngue, como políticas de privacidade, documentação, etc. Interprete e torne os metadados do Markdown acessíveis no seu código.<br><br> - [Arquivos de conteúdo](https://intlayer.org/doc/concept/content/file)                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **Editor Visual Gratuito & CMS**<br><br>Um editor visual gratuito e CMS estão disponíveis para redatores de conteúdo, eliminando a necessidade de uma plataforma de localização. Mantenha seu conteúdo sincronizado usando Git, ou externalize-o total ou parcialmente com o CMS.<br><br> - [Editor Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS Intlayer](https://intlayer.org/doc/concept/cms)         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **Conteúdo Tree-shakable**<br><br>Conteúdo tree-shakable, reduzindo o tamanho do pacote final. Carrega o conteúdo por componente, excluindo qualquer conteúdo não utilizado do seu pacote. Suporta carregamento preguiçoso para melhorar a eficiência do carregamento do aplicativo. <br><br> - [Otimização da build do app](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **Renderização Estática**<br><br>Não bloqueia a Renderização Estática. <br><br> - [Integração com Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **Tradução com IA**<br><br>Transforme seu site em 231 idiomas com apenas um clique usando as avançadas ferramentas de tradução com IA da Intlayer, utilizando seu próprio provedor de IA / chave API. <br><br> - [Integração CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI do Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Preenchimento automático](https://intlayer.org/doc/concept/auto-fill)   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **Integração do Servidor MCP**<br><br>Fornece um servidor MCP (Model Context Protocol) para automação de IDE, permitindo um gerenciamento de conteúdo e fluxos de trabalho i18n contínuos diretamente dentro do seu ambiente de desenvolvimento. <br><br> - [Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **Extensão VSCode**<br><br>O Intlayer fornece uma extensão para VSCode para ajudar você a gerenciar seu conteúdo e traduções, construir seus dicionários, traduzir seu conteúdo e muito mais. <br><br> - [Extensão VSCode](https://intlayer.org/doc/pt/vs-code-extension)                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **Interoperabilidade**<br><br>Permite interoperabilidade com react-i18next, next-i18next, next-intl e react-intl. <br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                           |

---

## 📦 Instalação

Comece sua jornada com o Intlayer hoje e experimente uma abordagem mais suave e poderosa para internacionalização.

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ Início Rápido (Next.js)

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

<a href="https://intlayer.org/doc/environment/nextjs"> Obtenha o guia completo → </a>

## 🎥 Tutorial ao vivo no YouTube

[![Como Internacionalizar sua aplicação usando Intlayer](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Índice

Explore nossa documentação completa para começar com o Intlayer e aprender como integrá-lo em seus projetos.

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 Começando</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Por que Intlayer?</a></li>
  <li><a href="https://intlayer.org/doc">Introdução</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ Conceito</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Como o Intlayer Funciona</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">Configuração</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">Provedor de IA</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Editor Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">CMS Intlayer</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">Dicionário</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">Arquivo de Declaração de Conteúdo por Localidade</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">Tradução</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">Enumeração</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">Condição</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">Aninhamento</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">Markdown</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">Busca de Função</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">Inserção</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">Arquivo</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 Ambiente</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Intlayer com Next.js 15</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (App Router)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js Page Router</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">Início com Tanstack</a></li>
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
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/what_is_internationalization.md">O que é i18n</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n e SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">Intlayer e i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">Intlayer e react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">Intlayer e next-intl</a></li>
</ul>
</details>

## 🌐 Readme em outras línguas

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

## 🤝 Comunidade

O Intlayer é construído com e para a comunidade e adoraríamos receber sua contribuição!

- Tem uma sugestão? [Abra uma issue](https://github.com/aymericzip/intlayer/issues)
- Encontrou um bug ou uma melhoria? [Envie um PR](https://github.com/aymericzip/intlayer/pulls)
- Precisa de ajuda ou quer se conectar? [Junte-se ao nosso Discord](https://discord.gg/7uxamYVeCk)

Você também pode nos seguir em:

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
         alt="Facebook do Intlayer" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Instagram do Intlayer" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="X do Intlayer" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer YouTube" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer TikTok" height="30"/></a>
      <br>
    </p>
</div>

### Contribuição

Para diretrizes mais detalhadas sobre como contribuir para este projeto, por favor consulte o arquivo [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md). Ele contém informações essenciais sobre nosso processo de desenvolvimento, convenções para mensagens de commit e procedimentos de lançamento. Suas contribuições são valiosas para nós, e agradecemos seus esforços para tornar este projeto melhor!

### Obrigado pelo Apoio

Se você gosta do Intlayer, nos dê uma ⭐ no GitHub. Isso ajuda outras pessoas a descobrirem o projeto!

[![Gráfico do Histórico de Estrelas](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
