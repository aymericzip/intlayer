---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Como configurar roteamento baseado em domínio?
description: Aprenda como configurar roteamento baseado em domínio.
keywords:
  - domínio
  - roteamento
  - intlayer
  - configuração
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
---

# Como configurar **roteamento baseado em domínio** com Intlayer em vez de caminhos `/[locale]/`?

## Resposta rápida

O roteamento baseado em domínio é mais simples do que o roteamento baseado em caminho (`example.com/[locale]/`) porque você pode pular toda a configuração de middleware e roteamento. Basta implantar seu app em cada domínio de idioma e definir uma variável de ambiente por domínio.

## Passo a passo

1. **Implante uma vez por domínio** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Para cada implantação, defina `LOCALE` (e as variáveis de ambiente usuais do Intlayer) para o idioma que aquele domínio deve servir.
3. Referencie essa variável como `defaultLocale` no seu `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 o domínio decide o idioma
  },
  // ... resto da sua configuração
};

export default config;
```

É só isso - funciona da mesma forma para **Next.js**, **Vite + React**, **Vite + Vue**, etc.

## E se todos os domínios acessarem a **mesma** implantação?

Se todos os domínios apontarem para o mesmo pacote de aplicação, você precisará detectar o host em tempo de execução e passar o idioma manualmente através do provedor.

### Para Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname();
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Para Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname());
app.mount("#app");
```

Substitua `getLocaleFromHostname()` pela sua própria lógica de busca.

## Atualize seu seletor de idioma

Ao usar roteamento baseado em domínio, mudar de idioma significa navegar para outro domínio:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Benefícios do roteamento baseado em domínio

1. **Configuração mais simples**: Não é necessário configurar `intlayerProxy`, `generateStaticParams`, `react-router` ou `vue-router`
2. **Melhor SEO**: Cada idioma possui seu próprio domínio
3. **URLs mais limpas**: Sem prefixo de localidade no caminho
4. **Manutenção mais fácil**: Cada implantação de idioma é independente
