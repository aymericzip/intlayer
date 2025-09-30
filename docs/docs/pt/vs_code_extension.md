---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Extensão Oficial do VS Code
description: Aprenda a usar a extensão Intlayer no VS Code para melhorar seu fluxo de trabalho de desenvolvimento. Navegue rapidamente entre conteúdos localizados e gerencie seus dicionários de forma eficiente.
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

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) é a extensão oficial do Visual Studio Code para o **Intlayer**, projetada para melhorar a experiência do desenvolvedor ao trabalhar com conteúdo localizado em seus projetos.

![Extensão Intlayer para VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Link da extensão: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funcionalidades

![Preencher dicionários](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Navegação Instantânea** – Vá rapidamente para o arquivo de conteúdo correto ao clicar em uma chave `useIntlayer`.
- **Preencher Dicionários** – Preencha dicionários com conteúdo do seu projeto.

![Listar comandos](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Acesso fácil aos comandos do Intlayer** – Construir, enviar, puxar, preencher e testar dicionários de conteúdo com facilidade.

![Criar arquivo de conteúdo](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Gerador de Declaração de Conteúdo** – Criar arquivos de conteúdo de dicionário em vários formatos (`.ts`, `.esm`, `.cjs`, `.json`).

![Testar dicionários](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Testar Dicionários** – Testar dicionários para traduções ausentes.

![Reconstruir dicionário](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Mantenha seus dicionários atualizados** – Mantenha seus dicionários atualizados com o conteúdo mais recente do seu projeto.

![Aba Intlayer (Barra de Atividades)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Aba Intlayer (Barra de Atividades)** – Navegue e pesquise dicionários em uma aba lateral dedicada com barra de ferramentas e ações de contexto (Construir, Puxar, Enviar, Preencher, Atualizar, Testar, Criar Arquivo).

## Uso

### Navegação Rápida

1. Abra um projeto que utilize **react-intlayer**.
2. Localize uma chamada para `useIntlayer()`, como:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Clique com comando** (`⌘+Clique` no macOS) ou **Ctrl+Clique** (no Windows/Linux) na chave (por exemplo, `"app"`).
4. O VS Code abrirá automaticamente o arquivo de dicionário correspondente, por exemplo, `src/app.content.ts`.

### Aba Intlayer (Barra de Atividades)

Use a aba lateral para navegar e gerenciar dicionários:

- Abra o ícone do Intlayer na Barra de Atividades.
- Em **Pesquisar**, digite para filtrar dicionários e entradas em tempo real.
- Em **Dicionários**, navegue por ambientes, dicionários e arquivos. Use a barra de ferramentas para Construir, Puxar, Enviar, Preencher, Atualizar, Testar e Criar Arquivo de Dicionário. Clique com o botão direito para ações de contexto (Puxar/Enviar em dicionários, Preencher em arquivos). O arquivo atual do editor é revelado automaticamente na árvore quando aplicável.

### Acessando os comandos

Você pode acessar os comandos a partir da **Paleta de Comandos**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Construir Dicionários**
- **Enviar Dicionários**
- **Puxar Dicionários**
- **Preencher Dicionários**
- **Testar Dicionários**
- **Criar Arquivo de Dicionário**

### Carregando Variáveis de Ambiente

O Intlayer recomenda armazenar suas chaves de API de IA, assim como o ID e o segredo do cliente Intlayer, em variáveis de ambiente.

A extensão pode carregar variáveis de ambiente do seu espaço de trabalho para executar comandos do Intlayer com o contexto correto.

- **Ordem de carregamento (por prioridade)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Não destrutivo**: valores existentes em `process.env` não são sobrescritos.
- **Escopo**: os arquivos são resolvidos a partir do diretório base configurado (padrão é a raiz do espaço de trabalho).

#### Selecionando o ambiente ativo

- **Paleta de Comandos**: abra a paleta e execute `Intlayer: Select Environment`, depois escolha o ambiente (por exemplo, `development`, `staging`, `production`). A extensão tentará carregar o primeiro arquivo disponível na lista de prioridade acima e mostrará uma notificação como “Loaded env from .env.<env>.local”.
- **Configurações**: vá para `Settings → Extensions → Intlayer` e defina:
  - **Environment**: o nome do ambiente usado para resolver arquivos `.env.<env>*`.
  - (Opcional) **Env File**: um caminho explícito para um arquivo `.env`. Quando fornecido, ele tem precedência sobre a lista inferida.

#### Monorepos e diretórios personalizados

Se os seus arquivos `.env` estiverem fora da raiz do espaço de trabalho, defina o **Diretório Base** em `Configurações → Extensões → Intlayer`. O carregador irá procurar arquivos `.env` relativos a esse diretório.

## Histórico do Documento

| Versão | Data       | Alterações                                 |
| ------ | ---------- | ------------------------------------------ |
| 6.1.5  | 2025-09-30 | Adicionado gif de demonstração             |
| 6.1.0  | 2025-09-24 | Adicionada seção de seleção de ambiente    |
| 6.0.0  | 2025-09-22 | Aba Intlayer / Comandos Preencher & Testar |
| 5.5.10 | 2025-06-29 | Histórico inicial                          |
