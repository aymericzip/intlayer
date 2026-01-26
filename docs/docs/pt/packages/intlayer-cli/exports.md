---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote intlayer-cli
description: Ferramenta CLI para o Intlayer, fornecendo comandos para construir e auditar dicionários.
keywords:
  - cli
  - ferramentas
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todos os exports
---

# Pacote intlayer-cli

O pacote `intlayer-cli` fornece um conjunto de comandos para gerenciar dicionários do Intlayer e a configuração.

## Instalação

```bash
npm install intlayer-cli
```

## Exportações

### Comandos CLI (Funções)

O pacote exporta funções que alimentam os comandos da CLI, permitindo que você acione operações do Intlayer programaticamente.

Importação:

```tsx
import "intlayer-cli";
```

| Function       | Description                                            |
| -------------- | ------------------------------------------------------ |
| `build`        | Constrói os dicionários do Intlayer.                   |
| `audit`        | Audita os dicionários em busca de traduções em falta.  |
| `liveSync`     | Sincroniza os dicionários em tempo real.               |
| `pull`         | Puxa dicionários de uma fonte remota.                  |
| `push`         | Envia dicionários para uma fonte remota.               |
| `test`         | Executa testes nos dicionários.                        |
| `transform`    | Transforma dicionários entre formatos.                 |
| `fill`         | Preenche dicionários com traduções em falta usando IA. |
| `reviewDoc`    | Revisa a documentação para internacionalização.        |
| `translateDoc` | Traduz a documentação usando IA.                       |
