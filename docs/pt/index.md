# Intlayer Documentation

Bem-vindo à documentação oficial do **Intlayer**! Aqui, você encontrará tudo o que precisa para integrar, configurar e dominar o Intlayer para todas as suas necessidades de internacionalização (i18n)—se você estiver trabalhando com **Next.js**, **React**, **Vite**, **Express** ou outro ambiente JavaScript.

O Intlayer oferece uma abordagem flexível e moderna para traduzir seu aplicativo. Nossos documentos o guiarão desde a instalação e configuração até recursos avançados como **tradução impulsionada por IA**, **definições em TypeScript**, e suporte a **componentes de servidor**—capacitando você a criar uma experiência multilíngue e perfeita.

---

## Começando

- **[Introdução](https://github.com/aymericzip/intlayer/blob/main/docs/pt/introduction.md)**  
  Obtenha uma visão geral de como o Intlayer funciona, suas características principais e por que é um divisor de águas para i18n.

- **[Como o Intlayer Funciona](https://github.com/aymericzip/intlayer/blob/main/docs/pt/how_works_intlayer.md)**  
  Mergulhe no design arquitetônico e aprenda como o Intlayer lida com tudo, desde a declaração de conteúdo até a entrega de tradução.

- **[Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md)**  
  Personalize o Intlayer para atender às necessidades do seu projeto. Explore opções de middleware, estruturas de diretório e configurações avançadas.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)**  
  Gerencie conteúdo e traduções usando nossa ferramenta de linha de comando. Descubra como enviar e receber conteúdo, automatizar traduções e mais.

- **[Editor do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md)**  
  Simplifique a colaboração com não desenvolvedores e potencialize suas traduções com IA—diretamente em nosso CMS gratuito e intuitivo.

---

## Conceitos Básicos

### Declaração de Conteúdo

Organize seu conteúdo multilíngue próximo do seu código para manter tudo consistente e fácil de manter.

- **[Começando](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md)**  
  Aprenda o básico sobre como declarar seu conteúdo no Intlayer.

- **[Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/translation.md)**  
  Entenda como as traduções são geradas, armazenadas e utilizadas no seu aplicativo.

- **[Enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/enumeration.md)**  
  Gerencie facilmente conjuntos de dados repetidos ou fixos em vários idiomas.

- **[Busca de Função](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/function_fetching.md)**  
  Veja como buscar dinamicamente conteúdo com lógica personalizada para corresponder ao fluxo de trabalho do seu projeto.

---

## Ambientes e Integrações

Construímos o Intlayer com flexibilidade em mente, oferecendo integração perfeita em frameworks e ferramentas de construção populares:

- **[Intlayer com Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)**
- **[Intlayer com Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_14.md)**
- **[Intlayer com Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_page_router.md)**
- **[Intlayer com React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)**
- **[Intlayer com Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md)**
- **[Intlayer com Express](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_express.md)**

Cada guia de integração inclui melhores práticas para utilizar os recursos do Intlayer—como **renderização do lado do servidor**, **roteamento dinâmico** ou **renderização do lado do cliente**—para que você possa manter um aplicativo rápido, amigável ao SEO e altamente escalável.

---

## Pacotes

O design modular do Intlayer oferece pacotes dedicados para ambientes e necessidades específicas:

### `intlayer`

Funções utilitárias principais para configurar e gerenciar sua configuração de i18n.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

Aproveite o Intlayer dentro de aplicativos baseados em **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/express-intlayer/t.md)**  
  Um helper de tradução minimalista e direto para suas rotas e visões de servidor.

### `react-intlayer`

Melhore seus aplicativos **React** com hooks poderosos:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Integre perfeitamente com **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/next-intlayer/useLocale.md)**

---

## Recursos Adicionais

- **[Blog: Intlayer e i18next](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_i18next.md)**  
  Aprenda como o Intlayer complementa e se compara à popular biblioteca **i18next**.

- **[Tutorial Ao Vivo no YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Assista a uma demonstração abrangente e aprenda como integrar o Intlayer em tempo real.

---

## Contribuindo e Feedback

Valorizamos o poder do desenvolvimento open-source e orientado pela comunidade. Se você gostaria de propor melhorias, adicionar um novo guia ou corrigir quaisquer problemas em nossa documentação, sinta-se à vontade para enviar um Pull Request ou abrir um problema em nosso [repositório do GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Pronto para traduzir seu aplicativo de forma mais rápida e eficiente?** Mergulhe em nossa documentação para começar a usar o Intlayer hoje. Experimente uma abordagem robusta e simplificada para internacionalização que mantém seu conteúdo organizado e sua equipe mais produtiva.

Boa tradução!  
— A equipe do Intlayer
