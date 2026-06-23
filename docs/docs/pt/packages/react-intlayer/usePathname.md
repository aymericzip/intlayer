---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação do Hook usePathname | react-intlayer
description: Aprenda como usar o hook usePathname do pacote react-intlayer para obter o pathname da URL atual sem o segmento de localidade.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internacionalização
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Adicionado o utilitário usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicializar histórico"
author: aymericzip
---

# Integração React: Documentação do Hook `usePathname`

O hook `usePathname` do `react-intlayer` retorna o pathname atual do navegador com o segmento de localidade removido. Ele conta com a propriedade nativa `window.location.pathname` e reage aos eventos de navegação do navegador por meio de `popstate`.

## Importando `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Visão Geral

Diferentemente dos hooks de roteamento específicos de um framework (como aqueles no `next-intlayer` ou `react-router`), este hook é uma solução leve e independente de framework para aplicativos React puros. Ele extrai a URL atual e remove qualquer prefixo de localidade correspondente (por exemplo, `/pt/about` torna-se `/about`).

## Uso

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Início
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Sobre
      </a>
    </nav>
  );
};

export default Navigation;
```

## Valor de Retorno

| Tipo     | Descrição                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `string` | O pathname atual do navegador com o prefixo de localidade removido (ex: `/pt/dashboard` → `/dashboard`). |

## Comportamento

- **Remoção de Locale**: Usa a utilidade `getPathWithoutLocale` internamente para detectar e remover automaticamente a localidade do pathname com base na configuração Intlayer do aplicativo.
- **Reatividade**: Ouve o evento `popstate`. Quando o usuário navega usando os botões de voltar/avançar do navegador ou quando `pushState`/`replaceState` é chamado, o hook atualiza o pathname retornado.
- **Fallback SSR**: No servidor (onde `window` é indefinido), o padrão é retornar `/` pois ele não tem acesso à URL da solicitação por padrão em um contexto React puro.

## Documentação Relacionada

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md)
