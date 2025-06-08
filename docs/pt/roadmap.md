# Intlayer: Visão Geral de Recursos e Roteiro

Intlayer é uma solução de gerenciamento de conteúdo e internacionalização projetada para simplificar como você declara, gerencia e atualiza conteúdo em suas aplicações. Ele oferece recursos poderosos, como declaração de conteúdo centralizada ou distribuída, amplas opções de internacionalização, suporte a Markdown, renderização condicional, integração com TypeScript/JavaScript/JSON e muito mais. Abaixo está uma visão geral abrangente do que o Intlayer atualmente fornece, seguida pelos recursos futuros no roteiro.

---

## Recursos Atuais

### 1. Declaração de Conteúdo

#### Centralizada ou Distribuída

- **Centralizada**: Declare todo o seu conteúdo em um único arquivo grande na base da sua aplicação, semelhante ao i18next, para que você possa gerenciar tudo em um só lugar.
- **Distribuída**: Alternativamente, divida seu conteúdo em arquivos separados no nível do componente ou recurso para melhor manutenção. Isso mantém seu conteúdo próximo ao código relevante (componentes, testes, Storybook, etc.). Remover um componente garante que qualquer conteúdo associado também seja removido, evitando dados residuais que possam sobrecarregar sua base de código.

> Recursos:

> - [Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md)

### 2. Internacionalização

- Suporte para **230 idiomas e locais** (incluindo variantes regionais como Francês (França), Inglês (Canadá), Inglês (Reino Unido), Português (Portugal), etc.).
- Gerencie facilmente traduções para todos esses locais em um único lugar.

> Recursos:

> - [Internacionalização](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/translation.md)

### 3. Suporte a Markdown

- Declare conteúdo usando **Markdown**, permitindo que você formate automaticamente o texto com parágrafos, cabeçalhos, links e muito mais.
- Ideal para postagens de blog, artigos, páginas de documentação ou qualquer cenário onde seja necessário formatação de texto rica.

> Recursos:

> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/markdown.md)

### 4. Renderização Condicional

- Defina conteúdo que se adapta com base em condições específicas, como idioma do usuário, status de login do usuário ou qualquer outra variável relacionada ao contexto.
- Ajuda a personalizar experiências sem duplicar conteúdo em vários arquivos.

> Recursos:

> - [Renderização Condicional](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/condition.md)

### 5. Formatos de Declaração de Conteúdo

O Intlayer suporta **TypeScript** (também JavaScript) e **JSON** para declarar conteúdo.

- **TypeScript**:

  - Garante que a estrutura do seu conteúdo esteja correta e que nenhuma tradução esteja faltando.
  - Oferece modos de validação rigorosos ou mais flexíveis.
  - Permite a busca dinâmica de dados a partir de variáveis, funções ou APIs externas.

- **JSON**:

  - Facilita a integração com ferramentas externas (como editores visuais) devido ao seu formato padronizado.

  > Recursos:
  >
  > - [Formatos de Declaração de Conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/content_extention_customization.md)

---

## Integração com Frameworks e Ambientes

### 1. Next.js

#### a. Componentes do Servidor e Cliente

- Fornece uma **abordagem unificada de gerenciamento de conteúdo** para componentes do servidor e cliente.
- Oferece um contexto integrado para componentes do servidor, simplificando a implementação em comparação com outras soluções.

#### b. Metadados, Sitemaps e robots.txt

- Busque e injete conteúdo dinamicamente para gerar metadados, sitemaps ou arquivos `robots.txt`.

#### c. Middleware

- Adicione um middleware para **redirecionar usuários** para o conteúdo com base no idioma preferido.

#### d. Compatibilidade com Turbopack e Webpack

- Totalmente compatível com o novo Turbopack do Next.js, bem como com o Webpack tradicional.

> Recursos:

> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)

### 2. Vite

- Semelhante ao Next.js, você pode integrar o Intlayer com o Vite e usar um **middleware** para redirecionar usuários para o conteúdo com base no idioma preferido.

> Recursos:

> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md)

### 3. Express

- Gerencie conteúdo e internacionalize serviços de backend construídos no Express.
- Personalize e-mails, mensagens de erro, notificações push e muito mais com texto localizado.

> Recursos:

> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_express.md)

---

## Editores Visuais e CMS

### 1. Editor Visual Local

- Um **editor visual local gratuito** que permite editar o conteúdo da sua aplicação selecionando diretamente os elementos na página.
- Integra recursos de IA para ajudar:
  - Gerar ou corrigir traduções
  - Verificar sintaxe e ortografia
  - Sugerir melhorias
- Pode ser hospedado localmente ou implantado em um servidor remoto.

> Recursos:

> - [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remoto)

- Uma solução de **CMS hospedado** que permite gerenciar o conteúdo da aplicação online, sem tocar na base de código.
- Fornece recursos assistidos por IA para declarar conteúdo, gerenciar traduções e corrigir erros de sintaxe ou ortografia.
- Interaja com seu conteúdo por meio da interface ao vivo da sua aplicação.

> Recursos:

> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md)

---

## Intlayer CLI

- **Auditoria e Geração de Traduções**: Execute auditorias nos arquivos de conteúdo para gerar traduções ausentes ou identificar traduções não utilizadas.
- **Interação Remota**: Publique seu conteúdo local no CMS remoto ou busque conteúdo remoto para integrar na sua aplicação local.
- Útil para **pipelines CI/CD**, garantindo que seu conteúdo esteja sempre sincronizado com seu código.

> Recursos:

> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)

---

## Ambientes

- Use **variáveis de ambiente** para configurar o Intlayer de forma diferente em ambientes de produção, teste e local.
- Defina qual editor visual ou projeto CMS remoto direcionar dependendo do seu ambiente.

---

## Atualizações de Conteúdo em Tempo Real

- Ao usar dicionários remotos e o Intlayer CMS, você pode **atualizar o conteúdo da sua aplicação em tempo real**, sem necessidade de reimplantação.

> Recursos:

> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md)

---

## Roteiro: Recursos Futuros

### 1. Testes A/B e Personalização

- **Testes Multivariados**: Teste diferentes versões de um determinado conteúdo para ver qual tem melhor desempenho (por exemplo, maior taxa de cliques).
- **Personalização Baseada em Dados**: Exiba conteúdo diferente com base em dados demográficos do usuário (gênero, idade, localização, etc.) ou outros padrões de comportamento.
- **Iteração Automatizada**: Permita que a IA teste automaticamente várias versões e escolha a de melhor desempenho ou recomende opções para aprovação do administrador.

### 2. Controle de Versões

- Restaure versões anteriores do seu conteúdo com **controle de versões de conteúdo**.
- Acompanhe mudanças ao longo do tempo e reverta para estados anteriores, se necessário.

### 3. Tradução Automática

- Para usuários do CMS remoto, **geração de tradução com um clique** para qualquer idioma suportado.
- O sistema geraria traduções em segundo plano e, em seguida, solicitaria validação ou edições.

### 4. Melhorias de SEO

- Ferramentas para **analisar palavras-chave**, intenção de busca do usuário e tendências emergentes.
- Sugira melhorias no conteúdo para melhores classificações e acompanhe o desempenho a longo prazo.

### 5. Compatibilidade com Mais Frameworks

- Esforços estão em andamento para suportar **Vue, Solid, Svelte, Angular** e mais.
- Objetivo de tornar o Intlayer compatível com **qualquer aplicação baseada em JavaScript**.

### 6. Extensões para IDEs

- Extensões para principais IDEs para fornecer uma **interface gráfica** para gerenciar traduções locais e remotas.
- Recursos podem incluir geração automática de arquivos de declaração de conteúdo para componentes, integração direta com o Intlayer CMS e validação em tempo real.

---

## Conclusão

O Intlayer tem como objetivo ser uma solução completa para gerenciamento de conteúdo e internacionalização. Ele se concentra em flexibilidade (arquivos centralizados ou distribuídos), amplo suporte a idiomas, fácil integração com frameworks e empacotadores modernos, e recursos poderosos impulsionados por IA. À medida que novas capacidades, como testes A/B, controle de versões e traduções automatizadas, se tornarem disponíveis, o Intlayer continuará simplificando fluxos de trabalho de conteúdo e elevando experiências de usuário em diferentes plataformas.

Fique atento aos próximos lançamentos e sinta-se à vontade para explorar os recursos existentes para ver como o Intlayer pode ajudar a centralizar e otimizar seus processos de gerenciamento de conteúdo hoje!
