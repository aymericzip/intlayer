---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Roteiro
description: Descubra o roteiro do Intlayer. Veja todos os recursos que o Intlayer implementou e que está planejando implementar.
keywords:
  - Roteiro
  - Intlayer
  - Internacionalização
  - CMS
  - Sistema de Gestão de Conteúdo
  - Editor Visual
slugs:
  - doc
  - roadmap
---

# Intlayer: Visão Geral dos Recursos & Roteiro

Intlayer é uma solução de gestão de conteúdo e internacionalização projetada para simplificar a forma como você declara, gerencia e atualiza conteúdo em suas aplicações. Ela oferece recursos poderosos, como declaração de conteúdo centralizada ou distribuída, amplas opções de internacionalização, suporte a Markdown, renderização condicional, integração com TypeScript/JavaScript/JSON, e muito mais. Abaixo está uma visão geral abrangente do que o Intlayer oferece atualmente, seguida pelos recursos planejados no roteiro.

---

## Recursos Atuais

### 1. Declaração de Conteúdo

#### Centralizado ou Distribuído

- **Centralizado**: Declare todo o seu conteúdo em um único arquivo grande na base da sua aplicação, semelhante ao i18next, para que você possa gerenciar tudo em um só lugar.
- **Distribuído**: Alternativamente, divida seu conteúdo em arquivos separados no nível do componente ou funcionalidade para melhor manutenção. Isso mantém seu conteúdo próximo ao código relevante (componentes, testes, Storybook, etc.). Remover um componente garante que qualquer conteúdo associado também seja removido, evitando dados residuais que possam poluir sua base de código.

> Recursos:
>
> - [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md)

### 2. Internacionalização

- Suporte para **230 idiomas e localidades** (incluindo variantes regionais como Francês (França), Inglês (Canadá), Inglês (Reino Unido), Português (Portugal), etc.).
- Gerencie facilmente traduções para todas essas localidades a partir de um único lugar.

> Recursos:
>
> - [Internacionalização](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)

### 3. Suporte a Markdown

- Declare conteúdo usando **Markdown**, permitindo formatar automaticamente o texto com parágrafos, títulos, links e mais.
- Ideal para posts de blog, artigos, páginas de documentação ou qualquer cenário onde seja necessário formatação rica de texto.

> Recursos:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md)

### 4. Suporte a arquivos externos

- Importe conteúdo de arquivos externos em formato de texto, como TXT, HTML, JSON, YAML ou CSV.
- Use a função `file` no Intlayer para incorporar o conteúdo de arquivos externos em um dicionário, garantindo integração perfeita com o Editor Visual e CMS do Intlayer.
- Suporta atualizações dinâmicas de conteúdo, significando que quando o arquivo fonte é modificado, o conteúdo é atualizado automaticamente dentro do Intlayer.
- Permite o gerenciamento de conteúdo multilíngue vinculando arquivos Markdown específicos para cada idioma de forma dinâmica.

> Recursos:
>
> - [Incorporação de Conteúdo de Arquivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/file.md)

### 5. Conteúdo Dinâmico e Recuperação de Funções

O Intlayer oferece vários métodos para inserir e gerenciar conteúdo dinâmico, garantindo flexibilidade e adaptabilidade na entrega de conteúdo. Isso inclui funções para inserção de conteúdo dinâmico, renderização condicional, enumeração, aninhamento e recuperação de funções.

1. Inserção de Conteúdo Dinâmico

   Use a função insert para definir conteúdo com espaços reservados ({{name}}, {{age}}, etc.).

   Permite conteúdo no estilo template que se adapta com base na entrada do usuário, respostas de API ou outras fontes de dados dinâmicas.

   Funciona perfeitamente com configurações TypeScript, ESM, CommonJS e JSON.

   Integra-se facilmente com React Intlayer e Next Intlayer usando useIntlayer.

2. Renderização Condicional

   Defina conteúdo que se adapta com base em condições específicas do usuário, como idioma ou status de autenticação.

   Personalize experiências sem duplicar conteúdo em vários arquivos.

3. Enumeração e Pluralização

   Use a função enu para definir variações de conteúdo baseadas em valores numéricos, intervalos ou chaves personalizadas.

   Garante a seleção automática da frase correta com base em um valor dado.

   Suporta regras de ordenação, assegurando comportamento previsível.

4. Aninhamento e Referência a Sub-Conteúdos

   Use a função nest para referenciar e reutilizar conteúdo de outro dicionário, reduzindo a duplicação.

   Suporta gerenciamento de conteúdo estruturado e hierárquico para melhor manutenção.

5. Recuperação por Função

   O Intlayer permite que o conteúdo seja declarado como funções, possibilitando a recuperação de conteúdo tanto síncrona quanto assíncrona.

   Funções Síncronas: O conteúdo é gerado dinamicamente em tempo de build.

   Funções Assíncronas: Busca dados de fontes externas (ex.: APIs, bancos de dados) dinamicamente.

   Integração: Funciona com TypeScript, ESM e CommonJS, mas não é suportado em arquivos JSON ou de conteúdo remoto.

### 6. Formatos de Declaração de Conteúdo

O Intlayer suporta **TypeScript** (também JavaScript) e **JSON** para declarar conteúdo.

- **TypeScript**:
  - Garante que a estrutura do seu conteúdo está correta e que nenhuma tradução está faltando.
  - Oferece modos de validação rigorosos ou mais flexíveis.
  - Permite a busca dinâmica de dados a partir de variáveis, funções ou APIs externas.

- **JSON**:
  - Facilita a integração com ferramentas externas (como editores visuais) devido ao seu formato padronizado.

  > Recursos:
  >
  > - [Formatos de Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)

### 7. Purga, otimização de bundle e importações dinâmicas

- O Intlayer integra plugins `Babel` e `SWC` para otimizar seu bundle e melhorar o desempenho. Ele substitui importações, permitindo importar apenas os dicionários que são usados no bundle.
- Ao ativar a opção, o Intlayer também permite importar dinamicamente o conteúdo do dicionário apenas para o idioma atual.

> Recursos:
>
> - [Configuração de Build](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Integração com Frameworks e Ambientes

### 1. Next.js

#### a. Componentes de Servidor e Cliente

- Fornece uma **abordagem unificada de gerenciamento de conteúdo** para componentes de servidor e cliente.
- Oferece um contexto embutido para componentes de servidor, simplificando a implementação em comparação com outras soluções.

#### b. Metadados, Sitemaps e robots.txt

- Busca e injeta conteúdo dinamicamente para gerar metadados, sitemaps ou arquivos `robots.txt`.

#### c. Middleware

- Adicione um middleware para **redirecionar usuários** para o conteúdo baseado em seu idioma preferido.

#### d. Compatibilidade com Turbopack e Webpack

- Totalmente compatível com o novo Turbopack do Next.js, assim como com o Webpack tradicional.

> Recursos:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)

### 2. Vite

- Semelhante ao Next.js, você pode integrar o Intlayer com Vite e usar um **middleware** para redirecionar os usuários para o conteúdo baseado em seu idioma preferido.

> Recursos:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)

### 3. Express

- Gerencie conteúdo e internacionalize serviços backend construídos com Express.
- Personalize e-mails, mensagens de erro, notificações push e mais com texto localizado.

> Recursos:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_express.md)

### 4. React Native

- Integre o Intlayer com React Native para gerenciar conteúdo e internacionalizar suas aplicações móveis.
- Suporta as plataformas iOS e Android.

> Recursos:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_react_native.md)

### 5. Lynx

- Integre o Intlayer com Lynx para gerenciar conteúdo e internacionalizar suas aplicações móveis.
- Suporta as plataformas iOS e Android.

> Recursos:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_lynx.md)

### 6. Vue

- Integre o Intlayer com Vue para gerenciar conteúdo e internacionalizar suas aplicações Vite / Vue.js.

> Recursos:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vue.md)

### 7. Nuxt

- Integre o Intlayer com Nuxt para gerenciar conteúdo e internacionalizar suas aplicações Nuxt / Vue.js.
- Suporta componentes tanto do servidor quanto do cliente.
- Integra roteamento e middleware para redirecionar usuários ao conteúdo baseado em sua língua preferida.

> Recursos:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nuxt.md)

### 8. Preact

- Integre o Intlayer com Preact para gerenciar conteúdo e internacionalizar suas aplicações Preact.

> Recursos:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_preact.md)

---

## Editores Visuais e CMS

### 1. Editor Visual Local

- Um **editor visual local e gratuito** que permite editar o conteúdo da sua aplicação selecionando diretamente os elementos na página.
- Integra recursos de IA para ajudar a:
  - Gerar ou corrigir traduções
  - Verificar sintaxe e ortografia
  - Sugerir melhorias
- Pode ser hospedado localmente ou implantado em um servidor remoto.

> Recursos:
>
> - [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remoto)

- Uma solução de **CMS hospedada** que permite gerenciar o conteúdo da aplicação online, sem precisar alterar seu código-fonte.
- Fornece recursos assistidos por IA para declarar conteúdo, gerenciar traduções e corrigir erros de sintaxe ou ortografia.
- Interaja com seu conteúdo através da interface da sua aplicação em tempo real.

> Recursos:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

---

## Extensões para IDE

- Extensões para as principais IDEs que fornecem uma **interface gráfica** para gerenciar traduções locais e remotas.
- Os recursos podem incluir a geração automática de arquivos de declaração de conteúdo para componentes, integração direta com o Intlayer CMS e validação em tempo real.

---

## Servidor MCP

- Um **servidor MCP** que permite gerenciar seu conteúdo e traduções usando uma ferramenta integrada na sua IDE.

---

## Intlayer CLI

- **Tradução e geração de arquivos**: Execute auditorias nos seus arquivos de conteúdo para gerar traduções faltantes e revisar inconsistências.
- **Interação remota**: Envie seu conteúdo local para o CMS remoto ou puxe conteúdo remoto para integrar na sua aplicação local.
- **Tradução e revisão de documentos**: Traduza e revise sua documentação / arquivos, etc.

> Recursos:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md)

---

## Ambientes

- Use **variáveis de ambiente** para configurar o Intlayer de forma diferente entre produção, teste e ambientes locais.
- Defina qual editor visual ou projeto CMS remoto deve ser usado dependendo do seu ambiente.

---

## Atualizações Dinâmicas de Conteúdo

- Ao usar dicionários remotos e o Intlayer CMS, você pode **atualizar o conteúdo da sua aplicação em tempo real**, sem necessidade de redeploy.

> Recursos:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)

---

## Funcionalidades Futuras

### 1. Testes A/B e Personalização

- **Teste Multivariado**: Teste diferentes versões de um determinado conteúdo para ver qual tem melhor desempenho (por exemplo, maior taxa de cliques).
- **Personalização Baseada em Dados**: Exiba conteúdos diferentes com base em dados demográficos do usuário (gênero, idade, localização, etc.) ou outros padrões de comportamento.
- **Iteração Automatizada**: Permita que a IA teste automaticamente várias versões e escolha a que teve melhor desempenho ou recomende opções para aprovação do administrador.

### 2. Versionamento

- Restaure versões anteriores do seu conteúdo com **versionamento de conteúdo**.
- Acompanhe as alterações ao longo do tempo e reverta para estados anteriores, se necessário.

### 3. Tradução Automática

- Para usuários do CMS remoto, **geração de tradução com um clique** para qualquer idioma suportado.
- O sistema geraria traduções em segundo plano e, em seguida, solicitariam sua validação ou edição.

### 4. Melhorias de SEO

- Ferramentas para **analisar palavras-chave**, intenção de busca do usuário e tendências emergentes.
- Sugerir conteúdo aprimorado para melhores classificações e acompanhar o desempenho a longo prazo.

### 5. Compatibilidade com Mais Frameworks

- Estão em andamento esforços para suportar **Solid, Svelte, Angular** e outros.
- O objetivo é tornar o Intlayer compatível com **qualquer aplicação baseada em JavaScript**.

---

## Conclusão

Intlayer tem como objetivo ser uma solução completa para gestão de conteúdo e internacionalização. Foca na flexibilidade (arquivos centralizados ou distribuídos), amplo suporte a idiomas, fácil integração com frameworks modernos e bundlers, e recursos poderosos impulsionados por IA. À medida que novas funcionalidades, como testes A/B, versionamento e traduções automáticas, estiverem disponíveis, o Intlayer continuará a simplificar os fluxos de trabalho de conteúdo e a elevar a experiência do usuário em diferentes plataformas.

Fique atento às próximas versões e sinta-se à vontade para explorar os recursos existentes para ver como o Intlayer pode ajudar a centralizar e otimizar seus processos de gestão de conteúdo hoje mesmo!

---

## Histórico da Documentação

- 5.5.10 - 2025-06-30: Adicionado suporte a Preact e Nuxt, Servidor MCP, atualização do CLI
- 5.5.10 - 2025-06-29: Histórico inicial
