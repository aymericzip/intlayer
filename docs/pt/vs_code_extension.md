---
docName: vscode_extension
url: /doc/vs-code-extension
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/vs_code_extension.md
createdAt: 2025-03-17
updatedAt: 2025-03-17
title: Extensão oficial do VS Code
description: Aprenda a usar a extensão Intlayer no VS Code para melhorar seu fluxo de trabalho de desenvolvimento. Navegue rapidamente entre conteúdos localizados e gerencie seus dicionários de forma eficiente.
keywords:
  - Extensão VS Code
  - Intlayer
  - Localização
  - Ferramentas de desenvolvimento
  - React
  - Next.js
  - JavaScript
  - TypeScript
---

# Extensão oficial do VS Code

## Visão Geral

**Intlayer** é a extensão oficial do Visual Studio Code para **Intlayer**, projetada para melhorar a experiência do desenvolvedor ao trabalhar com conteúdo localizado em projetos **React, Next.js e JavaScript**.

Com esta extensão, os desenvolvedores podem **navegar rapidamente** para seus dicionários de conteúdo, gerenciar arquivos de localização e otimizar seu fluxo de trabalho com comandos de automação poderosos.

Link da extensão: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

## Funcionalidades

### Navegação Instantânea

**Suporte a Ir para Definição** – Use `Cmd+Click` (Mac) ou `Ctrl+Click` (Windows/Linux) em uma chave `useIntlayer` para abrir instantaneamente o arquivo de conteúdo correspondente.  
**Integração Sem Esforço** – Funciona perfeitamente com projetos **react-intlayer** e **next-intlayer**.  
**Suporte Multilíngue** – Suporta conteúdo localizado em diferentes idiomas.  
**Integração com VS Code** – Integra-se suavemente com a navegação e o painel de comandos do VS Code.

### Comandos de Gerenciamento de Dicionários

Gerencie seus dicionários de conteúdo diretamente do VS Code:

- **Construir Dicionários** (`extension.buildDictionaries`) – Gere arquivos de conteúdo com base na estrutura do seu projeto.
- **Enviar Dicionários** (`extension.pushDictionaries`) – Faça upload do conteúdo mais recente do dicionário para o seu repositório.
- **Baixar Dicionários** (`extension.pullDictionaries`) – Sincronize o conteúdo mais recente do dicionário do seu repositório para o seu ambiente local.

### Gerador de Declaração de Conteúdo

Gere facilmente arquivos de dicionário estruturados em diferentes formatos:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Instalação

Você pode instalar o **Intlayer** diretamente do Marketplace do VS Code:

1. Abra o **VS Code**.
2. Vá para o **Marketplace de Extensões**.
3. Procure por **"Intlayer"**.
4. Clique em **Instalar**.

Alternativamente, instale via linha de comando:

```sh
code --install-extension intlayer
```

## Uso

### Navegação Rápida

1. Abra um projeto usando **react-intlayer**.
2. Localize uma chamada para `useIntlayer()`, como:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` no macOS) ou **Ctrl+Click** (no Windows/Linux) na chave (por exemplo, `"app"`).
4. O VS Code abrirá automaticamente o arquivo de dicionário correspondente, por exemplo, `src/app.content.ts`.

### Gerenciando Dicionários de Conteúdo

#### Construindo Dicionários

Gere todos os arquivos de conteúdo do dicionário com:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Procure por **Construir Dicionários** e execute o comando.

#### Enviando Dicionários

Faça upload do conteúdo mais recente do dicionário:

1. Abra o **Painel de Comandos**.
2. Procure por **Enviar Dicionários**.
3. Selecione os dicionários para enviar e confirme.

#### Baixando Dicionários

Sincronize o conteúdo mais recente do dicionário:

1. Abra o **Painel de Comandos**.
2. Procure por **Baixar Dicionários**.
3. Escolha os dicionários para baixar.

### Personalizando Caminhos de Arquivos de Dicionário

Por padrão, a extensão segue a estrutura padrão do projeto **Intlayer**. No entanto, você pode configurar caminhos personalizados:

1. Abra **Configurações (`Cmd + ,` no macOS / `Ctrl + ,` no Windows/Linux)`**.
2. Procure por `Intlayer`.
3. Ajuste a configuração do caminho do arquivo de conteúdo.

## Desenvolvimento e Contribuição

Quer contribuir? Agradecemos contribuições da comunidade!

URL do Repositório: https://github.com/aymericzip/intlayer-vs-code-extension

### Começando

Clone o repositório e instale as dependências:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Use o gerenciador de pacotes `npm` para compatibilidade com o pacote `vsce` para construir e publicar a extensão.

### Executar no Modo de Desenvolvimento

1. Abra o projeto no **VS Code**.
2. Pressione `F5` para iniciar uma nova janela **Extension Development Host**.

### Enviar um Pull Request

Se você melhorar a extensão, envie um PR no [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Feedback e Problemas

Encontrou um bug ou tem uma solicitação de recurso? Abra um problema no nosso **repositório do GitHub**:

[Problemas no GitHub](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licença

O Intlayer é lançado sob a **Licença MIT**.
