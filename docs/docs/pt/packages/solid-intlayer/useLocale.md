---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Hook useLocale | solid-intlayer
description: Veja como usar o hook useLocale para o pacote solid-intlayer
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Documentação do Hook useLocale

O hook `useLocale` permite gerir a locale atual na sua aplicação Solid. Ele fornece acesso à locale atual (como um accessor), à locale padrão, às locales disponíveis e a uma função para atualizar a locale.

## Uso

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Descrição

O hook retorna um objeto com as seguintes propriedades:

1. **locale**: Um accessor do Solid (`() => string`) que retorna a locale atual.
2. **defaultLocale**: A locale padrão definida no seu `intlayer.config.ts`.
3. **availableLocales**: Um array com todas as locales suportadas pela sua aplicação.
4. **setLocale**: Uma função para atualizar a locale da aplicação. Também lida com persistência (cookies/armazenamento local) se habilitada.

## Parâmetros

- **props** (opcional):
  - **onLocaleChange**: Uma função callback chamada sempre que a locale mudar.
  - **isCookieEnabled**: Indica se a locale será persistida em um cookie.
