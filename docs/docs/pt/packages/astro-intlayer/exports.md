---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote astro-intlayer
description: Integração do Astro para o Intlayer, fornecendo configuração para roteamento baseado em locale e gerenciamento de dicionários.
keywords:
  - astro-intlayer
  - astro
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote astro-intlayer

O pacote `astro-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Astro. Ele configura o roteamento baseado em locale e o gerenciamento de dicionários.

## Instalação

```bash
npm install astro-intlayer
```

## Exportações

### Integração

O pacote `astro-intlayer` fornece uma integração para Astro para configurar o Intlayer no seu projeto.

Importe:

```tsx
import "astro-intlayer";
```

ou adicionando ao arquivo `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Função     | Descrição                                                    |
| ---------- | ------------------------------------------------------------ |
| `intlayer` | Integração do Astro que configura o Intlayer no seu projeto. |
