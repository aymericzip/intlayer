---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote angular-intlayer
description: Integração específica para Angular do Intlayer, fornecendo providers e serviços para aplicações Angular.
keywords:
  - angular-intlayer
  - angular
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote angular-intlayer

O pacote `angular-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Angular. Inclui providers e serviços para gerir conteúdo multilíngue.

## Instalação

```bash
npm install angular-intlayer
```

## Exportações

### Configuração

| Função            | Descrição                                                 |
| ----------------- | --------------------------------------------------------- |
| `provideIntlayer` | Função para fornecer o Intlayer na sua aplicação Angular. |

### Serviços

| Serviço           | Descrição                                                                |
| ----------------- | ------------------------------------------------------------------------ |
| `IntlayerService` | Serviço que seleciona um dicionário pela sua chave e retorna o conteúdo. |
| `LocaleService`   | Serviço que retorna a localidade atual e uma função para defini-la.      |

### Componentes

| Componente                  | Descrição                                           |
| --------------------------- | --------------------------------------------------- |
| `IntlayerMarkdownComponent` | Componente Angular que renderiza conteúdo Markdown. |
