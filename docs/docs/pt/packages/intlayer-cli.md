---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote intlayer-cli
description: Ferramenta de linha de comando (CLI) para o Intlayer, fornecendo comandos para construir e auditar dicionários.
keywords:
  - intlayer-cli
  - cli
  - ferramentas
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote intlayer-cli

O pacote `intlayer-cli` fornece um conjunto de comandos para gerenciar dicionários e a configuração do Intlayer.

## Instalação

```bash
npm install intlayer-cli
```

## Exportações

### Comandos CLI (Funções)

O pacote exporta funções que alimentam os comandos da CLI.

| Função     | Descrição                                             |
| ---------- | ----------------------------------------------------- |
| `build`    | Constrói os dicionários do Intlayer.                  |
| `audit`    | Audita os dicionários em busca de traduções em falta. |
| `liveSync` | Sincroniza os dicionários em tempo real.              |
| `pull`     | Obtém dicionários de uma origem remota.               |
| `push`     | Envia os dicionários para uma origem remota.          |
| `test`     | Executa testes nos dicionários.                       |
| `extract`  | Transforma dicionários entre formatos.                |
