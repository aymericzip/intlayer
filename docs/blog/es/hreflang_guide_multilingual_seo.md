---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, guía para SEO multilingüe"
description: "Qué es hreflang, las reglas que aplican los motores de búsqueda, por qué x-default casi siempre está mal, y cómo generar etiquetas correctas en Next.js y TanStack Start."
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

# Hreflang: la guía para SEO multilingüe

Tradujiste tu aplicación. Desplegaste `/en`, `/fr`, `/es`. Y los usuarios franceses siguen llegando a la página en inglés.

Traducir es la mitad fácil. La mitad difícil es decirle a los motores de búsqueda que estas páginas son la **misma página en otro idioma**, no tres documentos compitiendo entre sí. Eso es lo que hace `hreflang`, y es donde la mayoría de los sitios multilingües pierden silenciosamente su tráfico.

---

## Qué es realmente hreflang

Una anotación en una página que dice: _esta URL tiene versiones equivalentes allá, para esos idiomas._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Te compra dos cosas: la versión correcta mostrada al usuario correcto, y tus locales consolidados en un clúster en lugar de canibalizarse entre sí como duplicados.

Es importante ser claro sobre lo que no es. **No es una redirección** — es una sugerencia, y Google puede ignorarla. **No es un impulso de clasificación** — cambia _qué_ versión se clasifica, no _si_ te clasificas. Y Bing la ignora completamente, confiando en `content-language` y geo-targeting en su lugar.

---

## Dónde declararlo

Tres ubicaciones, todas válidas. Elige una y mantente ahí — el mismo clúster declarado en dos lugares es cómo los conjuntos se desvinculan.

**HTML `<head>`** es la opción habitual. Una advertencia: las etiquetas inyectadas después de la hidratación no son confiables. Si tu framework solo las agrega del lado del cliente, el rastreador puede no verlas nunca.

**XML sitemap** es mejor a escala. Diez locales en 5 000 páginas significa 50 000 elementos `<link>` enviados a navegadores sin propósito; en un sitemap cuesta cero bytes a tus páginas.

**HTTP `Link` header** es la única opción para archivos que no son HTML como PDFs.

---

## Las reglas

### Auto-referencia y reciprocidad

El conjunto en `/fr/about` debe incluir `hreflang="fr"` apuntando a `/fr/about`. Y si `/about` apunta a `/fr/about`, `/fr/about` debe apuntar de vuelta. Google llama a una referencia unidireccional una "no return tag" y la descarta.

En la práctica esto significa que **cada página en un cluster envía el conjunto idéntico de links**. Generarlos desde una lista de locales compartida no es una conveniencia, es la única forma de mantenerse correcto una vez que tienes más de dos locales.

### URLs absolutas, siempre

```html
<!-- Silenciosamente ignorado -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Correcto -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

La razón vale la pena entender en lugar de memorizar. `hreflang` es una referencia entre documentos: los motores de búsqueda construyen un clúster identificado por URL, compartido en todas las páginas del mismo. Una ruta relativa solo tiene significado relativo al documento en el que se encuentra, por lo que no puede expresar eso. Tampoco puede cruzar un host — y un alternate muy a menudo lo hace, cuando una locale vive en `example.fr` o `fr.example.com`. En un sitemap o un encabezado HTTP no hay un documento base contra el cual resolver de ninguna manera.

Esto tiene una consecuencia directa en el código. `getLocalizedUrl("/about", "fr")` devuelve `/fr/about` — relativo adentro, relativo afuera. Para `hreflang` debes proporcionarle una URL absoluta:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ descartado
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

La única excepción es un framework que resuelve valores relativos por ti antes de renderizar: Next.js expande `alternates` relativos contra `metadataBase`. Bien — pero la regla se aplica al **HTML emitido**, así que verifica con `curl`, no con el inspector de DevTools.

### Códigos de idioma

ISO 639-1 para el idioma, ISO 3166-1 Alpha 2 para la región opcional: `fr`, `fr-CA`, `pt-BR`.

Dos trampas atrapan a casi todo el mundo. Una región sola es inválida — `hreflang="ca"` es catalán, no Canadá; necesitas `en-CA` o `fr-CA`. Y `en-UK` no existe: el código de país para el Reino Unido es `GB`, por lo que es `en-GB`.

Solo agrega una región cuando realmente sirvas contenido diferente en esa región — precios diferentes, avisos legales diferentes. `fr` y `fr-FR` en contenido idéntico es ruido.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Un concepto que se olvida con más frecuencia y se entiende mal es `x-default` — menos del 30% de las aplicaciones lo implementan correctamente.

Es el fallback para usuarios cuyo idioma no coincide con nada en tu conjunto. Un hablante holandés en un sitio que ofrece inglés, francés y español no coincide con ninguna entrada; sin `x-default`, Google elige por ti.

Lo que la gente se equivoca es qué significa. `x-default` **no es "la versión en inglés"** y **no es "la locale por defecto"**, aunque generalmente apunte allí. Significa _la página para usuarios que este conjunto no cubre_. Por eso es legítimo — y a menudo mejor — apuntarlo a una página de selector de idioma o redirección geográfica en lugar de a `/en`. Si no tienes tal página, tu idioma principal es la respuesta sensata.

Dos cosas que debes tener claras: `x-default` es una entrada extra en el conjunto, no un reemplazo de la auto-referencial, y como todas las demás entradas debe aparecer idénticamente en cada página del cluster.

---

## La trampa del canonical

Cada página localizada debe ser **su propio canonical**:

```html
<!-- En https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Apuntar el canonical de cada locale a la versión en inglés en su lugar:

```html
<!-- En https://example.com/fr/about — elimina la página -->
<link rel="canonical" href="https://example.com/about" />
```

dice que la página francesa es un duplicado que no debe indexarse, mientras que `hreflang` dice que es la página a servir a usuarios franceses. Las señales se contradicen, canonical gana, y tus páginas francesas caen fuera del índice.

**Canonical es auto-referencial por locale. `hreflang` describe el cluster.**

---

## Elegir una estructura de URL

`hreflang` anota URLs, así que la estructura viene primero.

| Estructura         | Ejemplo           | Compensación                                                                 |
| ------------------ | ----------------- | ---------------------------------------------------------------------------- |
| **Subdirectorios** | `example.com/fr/` | Un dominio, autoridad compartida — señal geo más débil                       |
| **Subdominios**    | `fr.example.com`  | Fácil de agregar o eliminar una locale — puede leerse como un sitio separado |
| **ccTLDs**         | `example.fr`      | Señal de país más fuerte — autoridad construida por dominio                  |

Los subdirectorios son la opción predeterminada correcta para la mayoría de los proyectos. Recurre a los ccTLDs solo cuando realmente operes como negocios de países separados.

La única estructura a evitar: servir diferentes idiomas en la **misma URL** basándose en `Accept-Language` o IP. Los rastreadores ven una versión e indexan una versión; todo lo demás es invisible.

> Intlayer cubre los tres casos a través de `routing.mode` y `routing.domains`. Consulta [dominios personalizados](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/custom_domains.md) y la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

---

## Implementación

Escribir manualmente estas etiquetas no sobrevive al contacto con una segunda locale. En su lugar, derívelas de su lista de locales.

<Steps>

<Step number={1} title="Emitir el cluster en cada página">

El mismo conjunto en todas partes, canónico por locale, URLs absolutas, `x-default` incluido.

<Tabs>

<Tab label="Next.js" value="nextjs">

La API de Metadata expone `alternates.languages`, y `getMultilingualUrls` construye el registro completo desde tus locales configuradas:

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

Configuración completa: [Guía de i18n de Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

La función `head` de la ruta construye los enlaces. `localeMap` itera sobre tus locales configuradas, por lo que agregar un locale a la configuración lo agrega en todas partes de una sola vez:

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

`head` se ejecuta en el servidor, por lo que las etiquetas llegan al HTML inicial. Configuración completa: [Guía de i18n de TanStack](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="O trasládalo todo al sitemap">

A escala, mantén las anotaciones fuera de tus páginas por completo. `generateSitemap` emite alternativas `xhtml:link` por entrada, leyendo las locales y el modo de routing de tu configuración:

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

Dos opciones que vale la pena conocer:

- `xhtmlLinks` (default `true`) — los alternates se emiten solo donde las URLs de locale realmente difieren. En modo `no-prefix` cada locale comparte una URL, por lo que se omiten a menos que `routing.domains` asigne a los locales sus propios nombres de host.
- `entryPerLocale` (valor predeterminado `false`) — de forma predeterminada, una entrada `<url>` lleva todos los alternates. Ambas formas son válidas, pero solo una URL listada como `<loc>` cuenta como _enviada_ en Search Console; las locales alternativas permanecen descubribles pero sin atribuirse a ningún sitemap. Al activar esto, cada URL localizada obtiene su propia entrada con el conjunto completo de alternates repetidos. Multiplica las entradas por el número de locales, así que ten cuidado con el límite de 50 000 URL / 50 MB y divide en un índice de sitemap si lo superas.

</Step>

<Step number={3} title="Verifica lo que recibe el crawler">

`hreflang` falla silenciosamente, así que verifica que no asumir que funciona.

Lee la fuente, no el inspector — `curl https://example.com/fr/about | grep hreflang` muestra lo que recibe un crawler; DevTools muestra el DOM después de que JavaScript se ejecutó. Luego sigue cada alternate y confirma que apunta hacia atrás con el conjunto idéntico, y que ninguno de ellos redirige. El informe de International Targeting de Search Console detecta el resto en todo el sitio.

Para un crawl específico multilingüe, el [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) verifica etiquetas faltantes, alternates rotos y conflictos canónicos en tus páginas localizadas.

</Step>

</Steps>

---

## Lista de verificación

- [ ] Cada locale tiene una URL distinta y rastreable
- [ ] Cada página se auto-referencia, y cada referencia es recíproca
- [ ] El mismo conjunto se envía en cada página del cluster
- [ ] Todos los valores de `href` son absolutos en el HTML emitido
- [ ] Los códigos son ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, no `en-UK`)
- [ ] `x-default` está presente y apunta a dónde deberían ir los usuarios no coincidentes
- [ ] El canonical es autorreferencial por locale
- [ ] Las etiquetas se renderizan del lado del servidor, no se inyectan después de la hidratación
- [ ] Declaradas en exactamente un lugar
- [ ] Sin redirecciones alternas

---

## Conclusión

`hreflang` es simple e implacable. Una etiqueta de retorno faltante, una URL relativa, un canonical entre locales, y el cluster se descarta sin ningún error en ningún lugar. Todos esos problemas provienen de escribir las etiquetas a mano.

Derive the set from a single locale list, render it server-side, keep canonical self-referential, and give `x-default` the thought it deserves. Do that once and correctness stops being something you maintain.

### Ir más allá

- [SEO e Internacionalización](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/internationalization_and_SEO.md) — la imagen más amplia del SEO multilingüe
- [SEO e i18n en Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Guía de i18n de Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md)
- [Guía de i18n de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_tanstack.md)
- [Dominios personalizados por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/custom_domains.md)
- [Referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
