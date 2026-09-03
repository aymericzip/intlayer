---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Cómo detectar traducciones faltantes antes de que lo hagan tus usuarios"
description: Las traducciones faltantes fallan en silencio. Por qué el fallback las oculta, las cuatro capas de detección efectivas y cómo bloquear una compilación por una clave no traducida.
keywords:
  - encontrar traducciones faltantes
  - claves de traducción faltantes
  - auditoría i18n
  - cadenas no traducidas
  - cobertura de traducción
  - lint i18n
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Cómo detectar traducciones faltantes antes de que lo hagan tus usuarios

Una traducción faltante casi nunca genera una excepción explícita. Según tu configuración, le muestra el texto en inglés a un usuario en Japón, o imprime `checkout.summary.total` en plena pantalla en producción. Ambos problemas se despliegan, ambos pasan la revisión de código sin alertas, y ambos terminan siendo descubiertos por un cliente antes que por ti.

## Tabla de contenidos

<TOC/>

## Esto aplica sin importar la biblioteca que utilices

Nada de lo expuesto aquí depende de una tecnología en particular. Las capas de detección funcionan igual en i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate o Lingui, porque todas resuelven las claves y fallan bajo la misma lógica.

Las herramientas también son portables. Si tus mensajes están hoy en catálogos JSON, el [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) conecta Intlayer a esos archivos para que obtengas los comandos de auditoría, autocompletado y pruebas sin mover tu contenido ni alterar un solo import:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // o "icu" para next-intl / react-intl
    }),
  ],
};

export default config;
```

Si prefieres mantener idéntica la API en tiempo de ejecución, los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) crean alias para `useTranslation`, `$t` y similares en el empaquetador. En cualquier caso, toma los comandos siguientes como una implementación concreta de la idea, no como una imposición.

## Por qué son invisibles

Cada biblioteca de i18n resuelve una clave mediante la misma cadena: buscar en el locale activo, recurrir a un valor predeterminado por fallback y, si eso falla, devolver la clave literal. Este último paso es el verdadero problema. No hay error, no hay advertencia en producción y ningún test falla, porque nada en la canalización considera anormal una clave no traducida.

El fallback empeora las cosas en lugar de solucionarlas. Una página que se muestra silenciosamente en inglés luce impecable para un desarrollador que habla inglés y para cada verificación automatizada de tu CI. El error solo es perceptible para la persona que no comprende el resultado.

Así que la pregunta no es "cómo manejo las traducciones faltantes en tiempo de ejecución". Es "cómo hago que sea imposible hacer merge de una traducción faltante".

## Los cuatro lugares donde puedes detectarlas

Cada capa detecta situaciones que las otras ignoran. Necesitas más de una.

| Capa            | Detecta                                      | Pasa por alto                                  |
| :-------------- | :------------------------------------------- | :--------------------------------------------- |
| Tipos           | Claves que no existen en absoluto            | Clave existente pero sin traducir en `ja`      |
| Linter          | Cadenas fijas nunca enviadas a traducir      | Claves omitidas de un catálogo                 |
| Auditoría       | Cobertura de locales en cada clave declarada | Textos que nunca se prepararon para traducir   |
| Tests de render | Claves que se resuelven pero se muestran mal | Todo lo no cubierto explícitamente por un test |

La brecha habitual en la mayoría de los equipos está en la tercera fila: saben que sus claves son válidas, pero nada comprueba que los dieciocho idiomas cuenten efectivamente con un valor.

## Capa 1: haz que la clave sea un tipo, no un string

`t("checkout.summry.total")` es un simple error tipográfico que compila sin problemas. Si tus claves son cadenas planas, cada cambio de nombre es un riesgo en producción y cada eliminación deja una clave huérfana.

Las claves tipadas convierten ese error en un fallo de compilación. `react-i18next` lo soporta mediante declaration merging, `next-intl` lo infiere de la estructura de mensajes, Lingui deriva identificadores del texto de origen e Intlayer genera tipos a partir de los archivos de declaración. Todos cumplen su propósito; lo que cambia es la cantidad de código de configuración que debes escribir.

Esta capa es necesaria pero no suficiente. Los tipos describen la estructura del catálogo por defecto. No dicen nada sobre si el coreano tiene un valor asignado para esa clave.

## Capa 2: inspecciona con linter las cadenas que nunca llegaron a ser claves

La traducción que no encuentras suele ser la que nunca se externalizó. Un texto hardcodeado dentro de un componente es invisible para cualquier auditoría de catálogo, porque para las herramientas simplemente no existe.

El plugin de ESLint de Intlayer cubre esto con `no-raw-text`, sumado a `no-unused-content` para el caso inverso: contenido declarado que ya no se utiliza en ninguna parte.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` evita que los catálogos crezcan descontroladamente. Las claves muertas no rompen la aplicación, pero engrosan innecesariamente las facturas de traducción. Revisa la lista de reglas en la [documentación del plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md).

## Capa 3: audita la cobertura de locales

Esta capa responde directamente a la pregunta principal. Intlayer la incluye como comando de CLI:

```bash packageManager="npm"
npx intlayer content test
```

Lee los idiomas configurados y los diccionarios declarados, e informa con precisión qué claves faltan en qué idiomas y en qué archivo.

Un detalle crucial antes de incorporarlo en tus pipelines: **el CLI imprime un reporte pero devuelve código de salida cero.** Si lo agregas esperando que bloquee un build defectuoso, obtendrás una ejecución verde con un informe que nadie leerá. Para bloquear builds, utiliza la API programática que se detalla a continuación.

## Capa 4: compruébalo mediante aserciones en la suite de pruebas

`listMissingTranslations()` te devuelve la misma auditoría estructurada como datos, ideal para crear una barrera de compilación.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("no tiene locales requeridos faltantes", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Se devuelven tres campos y la distinción es importante:

- `missingTranslations`: por cada clave, qué idiomas faltan y en qué archivo se encuentran. Esto es lo que imprimes si la prueba falla.
- `missingLocales`: la unión de idiomas faltantes en todas las claves.
- `missingRequiredLocales`: limitado a los `requiredLocales` de tu configuración, o todos si no definiste la propiedad.

## `requiredLocales` es el parámetro que hace viable el control

Soportar dieciocho idiomas no significa que todos deban estar completos al 100% para poder desplegar. Casi todos los equipos tienen un nivel crítico que bloquea el lanzamiento y otro nivel que se completa progresivamente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Sin `requiredLocales`, cada idioma configurado se vuelve obligatorio y tu build permanecerá roto hasta que llegue la última traducción. Esa es la razón por la que los equipos terminan desactivando el chequeo por completo, lo cual es peor que no tenerlo.

## Encontrar las omisiones que ya están en producción

Las capas anteriores evitan nuevas omisiones. Para una aplicación que ya está en vivo, dos estrategias resultan muy útiles.

**Pseudolocalización.** Ejecuta un idioma ficticio donde cada cadena se modifique, por ejemplo `[!!! Ĉĥéçķöũţ !!!]`. Cualquier texto que permanezca en inglés normal está hardcodeado. Descubre en diez minutos lo que una auditoría de catálogo no puede ver por diseño, ya que analiza la página renderizada y no los archivos de datos.

**Rastrea tu propio sitio.** Si manejas URLs localizadas, haz peticiones a páginas de muestra por cada idioma y busca en el HTML las cadenas de tu idioma base. Una página en `/ja/` que contiene "Add to cart" es una traducción faltante o un fallback no planificado.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Llenar los vacíos

Cuando sabes qué falta, `intlayer fill` autocompleta las entradas vacías, y la opción `autoFill` genera archivos por idioma al declarar contenido. Consulta [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md).

Conviene ser realistas: las traducciones generadas automáticamente convierten una falta _visible_ en una falta _invisible_. La clave ahora tiene contenido, la auditoría se pone en verde y nadie ha revisado el texto. Úsalo para desbloquear entregas y luego envía las salidas a revisión humana en todo texto crítico para la toma de decisiones. Es una ayuda inicial, no un reemplazo.

## Errores comunes

- **Tratar el fallback como una funcionalidad de protección.** Es solo una estrategia de renderizado de emergencia, no una red de seguridad. Una página que calladamente sale en inglés es un bug que nadie reporta.
- **Confiar en el reporte de CLI para bloquear CI.** `intlayer content test` sale con código cero. Usa una aserción en tests.
- **Exigir todos los idiomas.** La comprobación se desactiva en cuanto frena una entrega por una traducción parcial.
- **Auditar catálogos pero nunca la pantalla renderizada.** Las cadenas hardcodeadas son invisibles en los catálogos por definición.
- **Comprobar únicamente el idioma por defecto.** Es el único que nunca va a faltar.
- **Dar por cerrado el ciclo solo con autocompletado de IA.** Auditoría en verde con textos jamás revisados.

## Para profundizar

- [Probar el contenido: auditoría CLI, API programática y aserciones UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md)
- [Reglas del plugin ESLint, incluyendo `no-raw-text` y `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)
- [autoFill: generación de archivos de declaración por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md)
- [Referencia de configuración: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Informes de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [Adaptador de compatibilidad i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18next.md)
- [Qué abarca realmente la internacionalización](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/what_is_internationalization.md)
- [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)
