---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: Extensão Oficial do VS Code
description: Aprenda a usar a extensão Intlayer no VS Code para aprimorar seu fluxo de trabalho de desenvolvimento. Navegue rapidamente entre conteúdos localizados e gerencie seus dicionários de forma eficiente.
keywords:
  - Extensão VS Code
  - Intlayer
  - Localização
  - Ferramentas de Desenvolvimento
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Extensão Oficial do VS Code

## Visão Geral

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) é a extensão oficial do Visual Studio Code para **Intlayer**, projetada para melhorar a experiência do desenvolvedor ao trabalhar com conteúdo localizado em seus projetos.

![Extensão Intlayer para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Link da extensão: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funcionalidades

### Navegação Instantânea

**Suporte a Ir para Definição** – Use `⌘ + Clique` (Mac) ou `Ctrl + Clique` (Windows/Linux) em uma chave `useIntlayer` para abrir instantaneamente o arquivo de conteúdo correspondente.  
**Integração Fluida** – Funciona perfeitamente com projetos **react-intlayer** e **next-intlayer**.  
**Suporte Multilíngue** – Suporta conteúdo localizado em diferentes idiomas.  
**Integração com VS Code** – Integra-se suavemente com a navegação e a paleta de comandos do VS Code.

### Comandos de Gerenciamento de Dicionários

Gerencie seus dicionários de conteúdo diretamente do VS Code:

- **Construir Dicionários** – Gere arquivos de conteúdo com base na estrutura do seu projeto.
- **Enviar Dicionários** – Faça upload do conteúdo mais recente do dicionário para o seu repositório.
- **Puxar Dicionários** – Sincronize o conteúdo mais recente do dicionário do seu repositório para o seu ambiente local.
- **Preencher Dicionários** – Popule os dicionários com conteúdo do seu projeto.
- **Testar Dicionários** – Identifique traduções faltantes ou incompletas.

### Gerador de Declaração de Conteúdo

Gere facilmente arquivos de dicionário estruturados em diferentes formatos:

Se você estiver trabalhando em um componente, ele gerará o arquivo `.content.{ts,tsx,js,jsx,mjs,cjs,json}` para você.

Exemplo de componente:

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

Arquivo gerado no formato TypeScript:

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

Formatos disponíveis:

- **TypeScript (`.ts`)**
- **ES Module (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Aba Intlayer (Barra de Atividades)

Abra a aba Intlayer clicando no ícone do Intlayer na Barra de Atividades do VS Code. Ela contém duas visualizações:

- **Pesquisar**: Uma barra de pesquisa ao vivo para filtrar rapidamente os dicionários e seu conteúdo. Digitar atualiza os resultados instantaneamente.
- **Dicionários**: Uma visualização em árvore dos seus ambientes/projetos, chaves dos dicionários e os arquivos que contribuem com entradas. Você pode:
  - Clicar em um arquivo para abri-lo no editor.
  - Usar a barra de ferramentas para executar ações: Build, Pull, Push, Fill, Refresh, Test e Create Dictionary File.
  - Usar o menu de contexto para ações específicas do item:
    - Em um dicionário: Pull ou Push
    - Em um arquivo: Fill Dictionary
  - Quando você alternar de editor, a árvore revelará o arquivo correspondente se ele pertencer a um dicionário.

## Instalação

Você pode instalar o **Intlayer** diretamente no Marketplace do VS Code:

1. Abra o **VS Code**.
2. Vá para o **Marketplace de Extensões**.
3. Pesquise por **"Intlayer"**.
4. Clique em **Instalar**.

## Uso

### Navegação Rápida

1. Abra um projeto que utilize **react-intlayer**.
2. Localize uma chamada para `useIntlayer()`, como:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` no macOS) ou **Ctrl+Click** (no Windows/Linux) na chave (ex.: `"app"`).
4. O VS Code abrirá automaticamente o arquivo de dicionário correspondente, por exemplo, `src/app.content.ts`.

### Gerenciando Dicionários de Conteúdo

### Aba Intlayer (Barra de Atividades)

Use a aba lateral para navegar e gerenciar os dicionários:

- Abra o ícone do Intlayer na Barra de Atividades.
- Em **Pesquisar**, digite para filtrar dicionários e entradas em tempo real.
- Em **Dicionários**, navegue por ambientes, dicionários e arquivos. Use a barra de ferramentas para Construir, Puxar, Enviar, Preencher, Atualizar, Testar e Criar Arquivo de Dicionário. Clique com o botão direito para ações de contexto (Puxar/Enviar em dicionários, Preencher em arquivos). O arquivo atual do editor é revelado automaticamente na árvore quando aplicável.

#### Construindo Dicionários

Gere todos os arquivos de conteúdo dos dicionários com:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Pesquise por **Construir Dicionários** e execute o comando.

#### Enviando Dicionários

Envie o conteúdo mais recente dos dicionários:

1. Abra a **Paleta de Comandos**.
2. Pesquise por **Enviar Dicionários**.
3. Selecione os dicionários para enviar e confirme.

#### Puxando Dicionários

Sincronize o conteúdo mais recente do dicionário:

1. Abra a **Paleta de Comandos**.
2. Procure por **Puxar Dicionários**.
3. Escolha os dicionários para puxar.

#### Preenchendo Dicionários

Preencha os dicionários com conteúdo do seu projeto:

1. Abra a **Paleta de Comandos**.
2. Procure por **Preencher Dicionários**.
3. Execute o comando para popular os dicionários.

#### Testando Dicionários

Valide os dicionários e encontre traduções faltantes:

1. Abra a **Paleta de Comandos**.
2. Procure por **Testar Dicionários**.
3. Revise os problemas relatados e corrija conforme necessário.

## Histórico do Documento

| Versão | Data       | Alterações        |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Histórico inicial |
