---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Validar diccionarios con esquemas (Zod)"
description: "Declara esquemas Zod en intlayer.config.ts y adjúntalos a tus diccionarios para validar cada locale en el build y tipar el contenido en tu editor."
keywords:
  - Esquema
  - Zod
  - Validación
  - Diccionario
  - Declaración de contenido
  - Seguridad de tipos
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Inicialización de la doc"
author: aymericzip
---

# Validar diccionarios con esquemas

Un esquema describe la forma esperada del contenido de un diccionario. Lo declaras una sola vez en `intlayer.config.ts`, le das un nombre y luego adjuntas ese nombre a cualquier diccionario con el campo `schema`.

Intlayer entonces:

- **Valida** el diccionario para cada locale cuando construye los diccionarios, e informa de cada error con su locale y la ruta del campo.
- **Tipa** el contenido del diccionario en tu editor, para que un campo ausente o mal tipado se detecte antes del build.

Los esquemas son útiles cuando varios diccionarios deben compartir la misma estructura (metadatos SEO, fichas de producto, entradas tipo CMS), o cuando el contenido debe respetar restricciones que TypeScript no puede expresar, como una longitud máxima en cada traducción.

<Steps>
<Step number={1} title="Declarar los esquemas en la configuración">

Instala [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Luego declara tus esquemas bajo la clave `schemas`. Cada clave es el nombre que referenciarás desde tus diccionarios.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Adjuntar un esquema a un diccionario">

Asigna al campo `schema` de un diccionario uno de los nombres declarados en la configuración.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Un mismo esquema puede adjuntarse a tantos diccionarios como necesites.

</Step>
<Step number={3} title="Hacer el build y leer el informe">

La validación se ejecuta cada vez que Intlayer construye los diccionarios: con `npx intlayer build`, o a través del plugin de tu bundler en modo dev y build. Si una traducción no respeta el esquema, Intlayer muestra el locale, la ruta del campo y el mensaje de Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Una ejecución puntual de `intlayer build` falla si el esquema es desconocido o si la validación falla. En modo watch, Intlayer excluye el diccionario inválido hasta que se corrija su contenido.

</Step>
</Steps>

<AccordionGroup>
<Accordion header="Frontmatter de Markdown">

Valida los campos del frontmatter, como `title`, `description`, `date` y `tags`, antes de renderizar Markdown. Durante la compilación de los diccionarios se comprueban los campos obligatorios y sus tipos. Los metadatos incorrectos se notifican con su idioma y la ruta del campo.

</Accordion>
<Accordion header="Metadatos SEO de página">

Valida los metadatos que generan los títulos y descripciones de página, las URL canónicas, las imágenes para redes sociales y las directivas de indexación. Un esquema puede exigir títulos de entre 1 y 60 caracteres, limitar las descripciones a 160 caracteres y comprobar que las URL sean válidas. El contenido no válido de un idioma se rechaza antes de provocar errores al mostrar la página.

</Accordion>
<Accordion header="Contenido estructurado compartido">

Asocia un mismo esquema a diccionarios con una estructura compartida, como productos, elementos de navegación o plantillas de correo electrónico. Si falta un campo o tiene un tipo incorrecto, el diccionario no supera la validación durante la compilación, lo que ayuda a evitar que llegue contenido incoherente a la aplicación.

</Accordion>
</AccordionGroup>

## Tipar el contenido a partir del esquema

Los parámetros genéricos de `Dictionary` controlan el nivel de comprobación de TypeScript sobre un diccionario:

| Declaración                                             | Campo `schema`                                    | Campo `content`                          |
| ------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| `satisfies Dictionary`                                  | Autocompletado, un nombre desconocido es un error | No comprobado por TypeScript             |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Debe ser `"seo-metadata"`                         | Tipado desde el esquema                  |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Debe ser `"seo-metadata"`                         | Tipado desde el esquema y tu propio tipo |

Con un esquema tipado, cada campo acepta un valor simple o un nodo de contenido que produce ese valor, por lo que `t()` sigue estando permitido:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer genera estos tipos a partir de tus esquemas Zod en `.intlayer/types` cada vez que construye los diccionarios. Solo se tipa la forma: las restricciones como `.min()`, `.max()` o `.regex()` se comprueban en el build.

## Qué se valida

Para cada locale listado en `internationalization.locales`, Intlayer resuelve el contenido del diccionario para ese locale y luego valida el resultado. Por tanto, el esquema describe el valor final de un campo (`title: string`), no el nodo `t()` que contiene las traducciones.

- **Traducciones ausentes**: con el `strictMode` por defecto, una traducción ausente recurre al locale por defecto antes de la validación. Con `strictMode: "strict"`, una traducción ausente hace fallar un campo obligatorio.
- **Otros nodos de contenido**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` e `insert()` se resuelven en funciones, y `md()` o `html()` en nodos. Declara estos campos con `z.any()` y mantén las restricciones en los campos que se resuelven en valores simples.
- **No validado**: el contenido proporcionado por una función o una Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md)), y los diccionarios obtenidos desde el [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

## Usar otra librería de validación

Las entradas de `schemas` no están ligadas a Zod. Funciona cualquier objeto que exponga un método `safeParse(data)` compatible con Zod, siempre que devuelva `{ success: true }` o `{ success: false, error: { issues } }`, donde cada issue tiene un array `path` y un `message`. El tipado del contenido solo se genera a partir de esquemas Zod: con otra librería, el contenido de los diccionarios adjuntos se tipa como `any`.

## Preguntas frecuentes

<FAQ>

<Question title="¿Un error de esquema detiene mi build?">

Una ejecución puntual de `intlayer build` falla si el diccionario no cumple su esquema. En modo watch, Intlayer registra los errores y excluye el diccionario inválido hasta que lo corrijas y lo guardes.

</Question>
<Question title="¿Pueden varios diccionarios compartir el mismo esquema?">

Sí. Un esquema se referencia por su nombre, así que cualquier número de diccionarios puede apuntar a él. Es el caso de uso principal: imponer una misma estructura a todos los metadatos de página, fichas de producto o plantillas de email.

</Question>
<Question title="¿Qué pasa si el nombre del esquema no existe?">

TypeScript lo señala en cuanto se declara al menos un esquema, porque el campo `schema` solo acepta los nombres declarados. En un archivo JSON, Intlayer informa del nombre de esquema desconocido durante la compilación y rechaza el diccionario.

</Question>
<Question title="¿Se validan todos los locales o solo el predeterminado?">

Todos los locales listados en `internationalization.locales`. El informe indica el locale que falla, así que es fácil detectar una traducción demasiado larga solo en alemán.

</Question>

</FAQ>

## Relacionado

- [Archivos de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)
- [CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
