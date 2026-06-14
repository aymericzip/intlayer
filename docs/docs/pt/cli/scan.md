---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Escanear Website
description: Saiba como usar o comando scan do CLI Intlayer para medir o tamanho da página e auditar a saúde de i18n/SEO de qualquer website.
keywords:
  - Scan
  - SEO
  - i18n
  - Auditoria
  - CLI
  - Intlayer
  - Tamanho de página
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.0.0
    date: 2026-06-11
    changes: "Adicionar comando scan"
author: aymericzip
---

# Escanear Website

O comando `scan` obtém um URL público, mede o tamanho total da página e audita a saúde de i18n e SEO da página. Produz um relatório com pontuação (0–100) que cobre atributos HTML, links canónicos, tags hreflang, robots.txt, sitemap.xml, links internos localizados e o peso de cada idioma no bundle JavaScript.

Não são necessárias dependências adicionais. Quando o [puppeteer](https://pptr.dev/) está instalado, o scan pode capturar partes de JavaScript carregadas dinamicamente (lazy-loaded) para uma análise de bundle mais precisa; caso contrário, recorre à inspeção dos scripts carregados diretamente declarados no HTML.

## Utilização

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Exemplo

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Exemplo de saída:

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Opções

### `<url>` (obrigatório)

O URL completo a escanear (por exemplo, `https://example.com`).

### `--no-deep`

Desativa o scan profundo baseado em renderização.

Por padrão, o comando tenta utilizar o [puppeteer](https://pptr.dev/) para renderizar a página num navegador headless, capturar as partes de JavaScript carregadas de forma diferida e medir o tamanho real de transferência. Se o puppeteer não estiver instalado, o comando recorre automaticamente ao modo básico.

Passe `--no-deep` para forçar o modo básico mesmo quando o puppeteer estiver disponível.

> Exemplo: `npx intlayer scan https://example.com --no-deep`

### `--json`

Apresenta o resultado completo do scan como um objeto JSON em vez de um relatório formatado. Útil para consumo programático ou pipelines de CI.

> Exemplo: `npx intlayer scan https://example.com --json`

### Opções de configuração padrão

- **`--base-dir`** — Diretório base utilizado para localizar o ficheiro `intlayer.config.*`.
- **`-e, --env`** — Ambiente de destino (por exemplo, `development`, `production`).
- **`--env-file`** — Caminho para um ficheiro `.env` personalizado.
- **`--no-cache`** — Desativar cache de configuração.
- **`--verbose`** — Ativar logs detalhados (padrão no modo CLI).
- **`--prefix`** — Prefixo de log personalizado.

## O que é verificado

| Verificação               | Descrição                                                         | Peso da pontuação |
| ------------------------- | ----------------------------------------------------------------- | ----------------- |
| `html lang`               | O atributo `<html lang="…">` está presente                        | 9                 |
| `html dir`                | O atributo `<html dir="…">` está presente                         | 3                 |
| `canonical`               | `<link rel="canonical">` está presente                            | 10                |
| `hreflang`                | As tags `<link rel="alternate" hreflang="…">` estão presentes     | 9                 |
| `x-default hreflang`      | Existe uma alternativa hreflang `x-default`                       | 7                 |
| `localized links`         | Pelo menos um link interno inclui um segmento de idioma           | 5                 |
| `all links localized`     | Cada link interno inclui um segmento de idioma                    | 5                 |
| `current locale`          | O idioma da página pode ser detetado                              | 3                 |
| `robots.txt present`      | `/robots.txt` devolve uma resposta 200                            | 10                |
| `robots.txt locale paths` | Nenhum caminho de idioma está bloqueado no robots.txt             | 10                |
| `sitemap.xml present`     | `/sitemap.xml` devolve uma resposta 200                           | 10                |
| `sitemap locale coverage` | Cada idioma detetado aparece no sitemap                           | 10                |
| `sitemap alternates`      | O sitemap contém links alternativos `hreflang`                    | 5                 |
| `sitemap x-default`       | O sitemap contém um hreflang `x-default`                          | 5                 |
| `unused bundle content`   | O bundle JS não contém dados excessivos de idiomas não utilizados | 9                 |

A pontuação final é a soma ponderada de todas as verificações bem-sucedidas expressa em percentagem (0–100).

## Utilização programática da função de scan

A função `scan` também é exportada a partir de `@intlayer/cli` para que possa ser chamada nos seus próprios scripts:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Para acesso de nível inferior, `scanWebsite` de `@intlayer/chokidar/scan` devolve um objeto `ScanResult` estruturado:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
