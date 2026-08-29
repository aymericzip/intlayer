---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, guia para SEO multilíngue"
description: "O que é hreflang, as regras que os mecanismos de busca aplicam, por que x-default é quase sempre errado, e como gerar tags corretas em Next.js e TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: o guia para SEO multilíngue

Você traduziu seu app. Você fez deploy de `/en`, `/fr`, `/es`. E usuários franceses ainda caem na página em inglês.

Traduzir é a metade fácil. A metade difícil é dizer aos search engines que essas páginas são a **mesma página em outro idioma**, não três documentos competindo entre si. É isso que `hreflang` faz, e é onde a maioria dos sites multilíngues perde silenciosamente seu tráfego.

---

## O que hreflang realmente é

Uma anotação em uma página dizendo: _esta URL tem versões equivalentes ali, para esses idiomas._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Isso oferece duas coisas: a versão correta mostrada ao usuário certo, e suas locales consolidadas em um cluster em vez de canibalizarem uma à outra como duplicatas.

É importante ser claro sobre o que não é. Não é um **redirecionamento** — é uma dica, e o Google pode sobrescrevê-la. Não é um **aumento de ranking** — muda _qual_ versão classifica, não _se_ você classifica. E o Bing ignora completamente, confiando em `content-language` e geolocalização em vez disso.

---

## Onde declarar

Três posicionamentos, todos válidos. Escolha um e mantenha-se — o mesmo cluster declarado em dois lugares é como os conjuntos divergem.

**HTML `<head>`** é a escolha usual. Uma ressalva: tags injetadas após hidratação são não confiáveis. Se seu framework apenas as adiciona do lado do cliente, o rastreador pode nunca vê-las.

**XML sitemap** é melhor em escala. Dez locales em 5 000 páginas significa 50 000 elementos `<link>` enviados para browsers desnecessariamente; em um sitemap custa zero bytes nas suas páginas.

**HTTP `Link` header** é a única opção para arquivos não-HTML como PDFs.

---

## As regras

### Auto-referência e reciprocidade

O conjunto em `/fr/about` deve incluir `hreflang="fr"` apontando para `/fr/about`. E se `/about` aponta para `/fr/about`, `/fr/about` deve apontar de volta. Google chama uma referência unidirecional de "no return tag" e a descarta.

Na prática isto significa **cada página em um cluster envia o conjunto idêntico de links**. Gerá-los a partir de uma lista de locale compartilhada não é uma conveniência, é a única forma de manter-se correto uma vez que você tenha mais de dois locales.

### URLs absolutas, sempre

```html
<!-- Silenciosamente ignorado -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Correto -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

A razão vale a pena ser compreendida em vez de memorizada. `hreflang` é uma referência entre documentos: os mecanismos de busca constroem um cluster codificado por URL, compartilhado em todas as páginas nele. Um caminho relativo só tem significado em relação ao documento em que está, portanto não pode expressar isso. Também não pode cruzar um host — e uma alternativa muito frequentemente faz isso, quando uma localidade vive em `example.fr` ou `fr.example.com`. Em um sitemap ou em um cabeçalho HTTP não há documento base para resolver.

Isso tem uma consequência direta no código. `getLocalizedUrl("/about", "fr")` retorna `/fr/about` — relativo dentro, relativo fora. Para `hreflang` você deve fornecer uma URL absoluta:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ descartado
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

A única exceção é um framework que resolve valores relativos para você antes de renderizar: Next.js expande `alternates` relativos contra `metadataBase`. Tudo bem — mas a regra se aplica ao **HTML emitido**, então verifique com `curl`, não com o inspetor DevTools.

### Códigos de idioma

ISO 639-1 para o idioma, ISO 3166-1 Alpha 2 para a região opcional: `fr`, `fr-CA`, `pt-BR`.

Duas armadilhas pegam quase todo mundo. Uma região sozinha é inválida — `hreflang="ca"` é catalão, não Canadá; você precisa de `en-CA` ou `fr-CA`. E `en-UK` não existe: o código de país para o Reino Unido é `GB`, então é `en-GB`.

Adicione uma região apenas quando você realmente servir a essa região conteúdo diferente — preços diferentes, avisos legais diferentes. `fr` e `fr-FR` em conteúdo idêntico é ruído.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Um conceito que é o mais frequentemente esquecido, e mal compreendido, é `x-default` — menos de 30% das apps o implementam corretamente.

É o fallback para usuários cuja língua não corresponde a nada em seu conjunto. Um falante de holandês em um site oferecendo inglês, francês e espanhol não corresponde a nenhuma entrada; sem `x-default`, o Google escolhe por você.

O que as pessoas entendem errado é o que significa. `x-default` **não é "a versão em inglês"** e **não é "a locale padrão"**, mesmo que geralmente aponte para lá. Significa _a página para usuários que este conjunto não cobre_. É por isso que é legítimo — e frequentemente melhor — apontá-lo para um seletor de idioma ou uma página de destino com redirecionamento geográfico em vez de para `/en`. Se você não tem tal página, seu idioma principal é a resposta sensata.

Duas coisas para esclarecer: `x-default` é uma entrada extra no conjunto, não uma substituição para a auto-referenciada, e como todas as outras entradas, deve aparecer identicamente em todas as páginas do cluster.

---

## A armadilha do canonical

Cada página localizada deve ser **seu próprio canonical**:

```html
<!-- Em https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Apontando o canonical de todas as locales para a versão em inglês:

```html
<!-- Em https://example.com/fr/about — mata a página -->
<link rel="canonical" href="https://example.com/about" />
```

diz que a página francesa é uma duplicata que não deve ser indexada, enquanto `hreflang` diz que é a página a servir para usuários franceses. Os sinais se contradizem, canonical vence, e suas páginas em francês caem do índice.

**Canonical é auto-referencial por locale. `hreflang` descreve o cluster.**

---

## Escolhendo uma estrutura de URL

`hreflang` anota URLs, então a estrutura vem em primeiro lugar.

| Structure          | Example           | Trade-off                                                            |
| ------------------ | ----------------- | -------------------------------------------------------------------- |
| **Subdirectories** | `example.com/fr/` | Um domínio, autoridade compartilhada — sinal geográfico mais fraco   |
| **Subdomains**     | `fr.example.com`  | Fácil adicionar ou remover um locale — pode parecer um site separado |
| **ccTLDs**         | `example.fr`      | Sinal de país mais forte — autoridade construída por domínio         |

Subdirectórios são a escolha padrão correta para a maioria dos projetos. Recorra a ccTLDs apenas quando você realmente operar como negócios separados por país.

A única estrutura a evitar: servir diferentes idiomas na **mesma URL** com base em `Accept-Language` ou IP. Os crawlers veem uma versão e indexam uma versão; tudo o mais é invisível.

> Intlayer cobre todos os três através de `routing.mode` e `routing.domains`. Veja [custom domains](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/custom_domains.md) e a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

---

## Implementação

Escrever essas tags manualmente não sobrevive ao contato com um segundo locale. Derive-as da sua lista de locales em vez disso.

<Steps>

<Step number={1} title="Emitir o cluster em cada página">

Mesmo conjunto em todos os lugares, canonical por locale, URLs absolutas, `x-default` incluído.

<Tabs>

<Tab label="Next.js" value="nextjs">

A Metadata API expõe `alternates.languages`, e `getMultilingualUrls` constrói todo o registro a partir dos seus locales configurados:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) retorna:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Setup completo: [Guia i18n Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

A função `head` da rota constrói os links. `localeMap` itera sobre as localizações configuradas, portanto adicionar uma localização à configuração a adiciona em todos os lugares de uma vez:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` executa no servidor, então as tags chegam no HTML inicial. Setup completo: [guia i18n do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Ou mova tudo para o sitemap">

Em larga escala, mantenha as anotações fora de suas páginas completamente. `generateSitemap` emite alternates `xhtml:link` por entrada, lendo locales e modo de roteamento de sua config:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Duas opções que vale a pena conhecer:

- `xhtmlLinks` (padrão `true`) — alternates são emitidos apenas onde as URLs de locale realmente diferem. No modo `no-prefix` cada locale compartilha uma URL, então são ignorados a menos que `routing.domains` dê aos locales seus próprios hostnames.
- `entryPerLocale` (padrão `false`) — por padrão uma entrada `<url>` carrega todos os alternates. Ambas as formas são válidas, mas apenas uma URL listada como `<loc>` conta como _enviada_ no Search Console; locales alternativas permanecem descobríveis mas atribuídas a nenhum sitemap. Ativar isso dá a cada URL localizada sua própria entrada com o conjunto completo de alternates repetido. Multiplica as entradas pela contagem de locale, então fique atento ao limite de 50 000 URLs / 50 MB e divida em um índice de sitemap se ultrapassar.

</Step>

<Step number={3} title="Verifique o que o crawler recebe">

`hreflang` falha silenciosamente, então verifique-o em vez de assumir.

Leia a fonte, não o inspector — `curl https://example.com/fr/about | grep hreflang` mostra o que um crawler recebe; DevTools mostra o DOM após JavaScript ser executado. Em seguida, siga cada alternativa e confirme que ela aponta de volta com o mesmo conjunto, e que nenhuma delas redireciona. O relatório de Direcionamento Internacional do Search Console captura o resto em todo o site.

Para um crawl específico multilíngue, o [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) verifica tags ausentes, alternativas quebradas e conflitos canônicos em suas páginas localizadas.

</Step>

</Steps>

---

## Lista de verificação

- [ ] Cada locale possui uma URL distinta e rastreável
- [ ] Toda página se auto-referencia, e toda referência é recíproca
- [ ] O mesmo conjunto é entregue em todas as páginas do cluster
- [ ] Todos os valores `href` são absolutos no HTML emitido
- [ ] Os códigos são ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, não `en-UK`)
- [ ] `x-default` está presente e aponta para onde os usuários não correspondidos devem ir
- [ ] Canonical é autorreferencial por locale
- [ ] Tags são renderizadas no servidor, não injetadas após hidratação
- [ ] Declaradas em exatamente um lugar
- [ ] Sem redirecionamentos alternados

---

## Finalizando

`hreflang` é simples e implacável. Uma tag de retorno ausente, uma URL relativa, um canonical entre locales, e o cluster é descartado sem nenhum erro em lugar nenhum. Cada um desses problemas vem de escrever as tags manualmente.

Derive the set from a single locale list, render it server-side, keep canonical self-referential, and give `x-default` the thought it deserves. Do that once and correctness stops being something you maintain.

### Going further

- [SEO and Internationalization](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/internationalization_and_SEO.md) — the broader multilingual SEO picture
- [SEO and i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_16.md)
- [Guia i18n do TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_tanstack.md)
- [Domínios personalizados por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/custom_domains.md)
- [Referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
