---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do componente IntlayerProvider | react-intlayer
description: Veja como usar o componente IntlayerProvider do pacote react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Doc inicial
---

# Documentação do componente IntlayerProvider

O componente `IntlayerProvider` é o provider principal do Intlayer em aplicações React. Ele fornece o contexto do Intlayer para todos os seus filhos.

## Uso

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Propriedades

| Propriedade       | Tipo                              | Descrição                                                        |
| ----------------- | --------------------------------- | ---------------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | O locale inicial a usar.                                         |
| `defaultLocale`   | `LocalesValues`                   | O locale padrão a usar como fallback.                            |
| `setLocale`       | `(locale: LocalesValues) => void` | Uma função personalizada para definir o locale.                  |
| `disableEditor`   | `boolean`                         | Indica se o editor deve ser desativado.                          |
| `isCookieEnabled` | `boolean`                         | Indica se os cookies devem ser ativados para armazenar o locale. |
