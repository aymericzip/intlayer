---
createdAt: 2026-10-03
updatedAt: 2026-10-03
priority: 8
title: Por qué ICU MessageFormat no está hecho para JavaScript
description: "ICU MessageFormat fue diseñado para Java y C++. En el navegador, el soporte completo incluye unos 10 KB de código de parser. De dónde proviene ese coste y las alternativas."
keywords:
  - icu message format
  - icu messageformat
  - icu messageformat javascript
  - tamaño de bundle icu
  - bundle size
  - intl-messageformat
  - next-intl precompile
  - pluralización i18n
  - Intl.PluralRules
  - Blog
slugs:
  - blog
  - why-icu-is-not-made-for-js
author: aymericzip
---

# Por qué ICU MessageFormat no está hecho para JavaScript

ICU MessageFormat es un estándar sólido. Es completo, los traductores lo conocen y la mayoría de los sistemas de gestión de traducciones (TMS) pueden leerlo. El inconveniente radica en el entorno de ejecución para el que fue creado. ICU proviene de C++ y Java, donde un parser y formateador de mensajes completo supone un coste ínfimo frente al resto del programa. En el bundle del navegador, ese coste se asume en cada carga de página.

Este artículo analiza el origen de ICU, por qué su sintaxis resulta pesada para plurales y por qué la compatibilidad completa añade peso a cualquier biblioteca de i18n para JavaScript. Si buscas la sintaxis en detalle, consulta primero la [referencia de ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/icu_message_format.md).

- [Referencia de ICU Message Format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/icu_message_format.md)

<TOC/>

## De IBM al Consorcio Unicode

ICU son las siglas de _International Components for Unicode_. Su sintaxis de mensajes nació en Java: Taligent, una empresa conjunta de Apple e IBM, desarrolló las clases de internacionalización de JDK 1.1 (1997), incluyendo `java.text.MessageFormat`. IBM continuó su evolución bajo el nombre de ICU4J, las adaptó a C/C++ como ICU4C y liberó el código fuente en 1999. En 2016, ICU pasó a estar bajo el amparo del Consorcio Unicode, que también mantiene CLDR, el repositorio de datos lingüísticos del que depende.

### Para qué se utilizaba originalmente

El destino principal eran las aplicaciones para servidores y entornos de escritorio: software empresarial en Java, soluciones de IBM y, con el tiempo, sistemas operativos. Los mensajes se guardaban en archivos `.properties` de Java gestionados con `ResourceBundle`, o en el formato propio de bundles de recursos de ICU para C/C++:

```properties fileName="messages_fr.properties"
inbox.unread={count, plural, one {# message non lu} other {# messages non lus}}
```

```java
String pattern = bundle.getString("inbox.unread");
String text = new MessageFormat(pattern, Locale.FRENCH)
    .format(Map.of("count", 5)); // "5 messages non lus"
```

La versión inicial del JDK carecía de la directiva `plural`. Empleaba `choice`, basada en rangos numéricos (`{0,choice,0#no files|1#one file|1<{0} files}`), lo cual únicamente se adapta a idiomas cuya pluralización coincide con el inglés. ICU incorporó `plural` basado en las reglas CLDR en 2008 (ICU 4.0) y `select` en 2010 (ICU 4.4).

### La diferencia con `.po`

Es habitual confundir ICU con gettext, aunque representan tradiciones distintas. Los archivos `.po` proceden de GNU gettext (C, Linux, y más adelante PHP y Python). Una entrada `.po` contiene pares sencillos de `msgid` / `msgstr`, y los plurales se evalúan mediante una expresión en C en la cabecera del archivo (`Plural-Forms: nplurals=2; plural=(n > 1);`). No existen ramificaciones lógicas dentro del mensaje. Por el contrario, ICU integra las ramificaciones en la propia cadena, lo que permite que un único mensaje combine `plural`, `select` y formateo numérico.

### Dónde se ejecuta ICU en la actualidad

ICU4C se distribuye en Android, iOS, macOS, Windows, Node.js y los motores de JavaScript de Chrome y Firefox. Las API `Intl` de los navegadores están construidas sobre este soporte. Por tanto, el navegador ya incluye internamente las reglas de plurales y el formateo de números y fechas de ICU. Lo que no incorpora es el parser del mensaje: `Intl.MessageFormat` se mantiene como una propuesta en fases tempranas en TC39, articulada sobre la nueva sintaxis MessageFormat 2 y sin compatibilidad con ICU MessageFormat 1.

Este recorrido histórico explica su diseño:

- **Está orientado a runtimes de servidor y escritorio.** Parsear una cadena en tiempo de ejecución resulta económico allí, y la biblioteca se instala de forma centralizada en el sistema operativo, no la descarga cada usuario visitante.
- **Constituye un DSL dentro de un string.** Ramificaciones, formatos numéricos, fechas y anidamientos residen en una sintaxis única que un traductor puede modificar sin tocar código.
- **Busca la exhaustividad.** Dispone de operadores para resolver cada caso gramatical posible.

Ninguna de estas decisiones es un error. Simplemente parten de premisas que no coinciden con las particularidades del navegador web.

## Los plurales resultan verbosos

La estructura más habitual en ICU es a la vez la más recargada. Un contador que incluya el caso cero se define así:

```text
{count, plural,
  =0 {No unread messages}
  one {# unread message}
  other {# unread messages}
}
```

Esto requiere el nombre del argumento, la palabra clave `plural`, una etiqueta para cada caso, llaves anidadas y el carácter `#`, que actúa como un token especial operativo únicamente dentro de las ramas de plural. Si añadimos un sujeto con género gramatical, la estructura se anida todavía más:

```text
{gender, select,
  female {{count, plural,
    one {She has # unread message}
    other {She has # unread messages}
  }}
  male {{count, plural,
    one {He has # unread message}
    other {He has # unread messages}
  }}
  other {{count, plural,
    one {They have # unread message}
    other {They have # unread messages}
  }}
}
```

Nueve de las quince líneas se limitan a definir la sintaxis. El polaco exige cuatro ramas de plural por cada una de esas tres variantes de género, convirtiendo la cadena traducida en un entramado de llaves donde una sola llave de cierre que falte rompe todo el mensaje, muchas veces detectándose sólo en runtime.

En JavaScript, esta estructura puede representarse como datos puros: un objeto cuyas claves coinciden con las categorías de plural, validado directamente por el sistema de tipos y el editor, sin ningún parser intermedio entre el archivo y el valor final.

## Completo, y ese es precisamente el coste

ICU cubre un abanico muy amplio:

- `plural` con coincidencias exactas (`=0`) y modificadores (`offset:`)
- `selectordinal`, con su propia tabla ordinal en CLDR
- `select`, con anidamiento ilimitado
- Argumentos `number`, `date` y `time`, tanto en formato clásico (`number, currency`) como mediante skeletons (`::currency/EUR compact-short`)
- Reglas de escape y comillas (`'{'`, `''`)
- Etiquetas de texto enriquecido en diversas implementaciones (`<b>…</b>`)

Una biblioteca que prometa compatibilidad 1:1 con ICU se ve obligada a empaquetarlo todo, ya que no puede prever en build-time qué funciones utilizarán tus mensajes. En la práctica, esto requiere:

1. **Un parser** que transforme la cadena en un AST, gestionando posibles fallos por llaves mal cerradas.
2. **Un parser de skeletons** para la sintaxis `::` de números y fechas, que conforma un pequeño lenguaje independiente.
3. **Un formateador** que recorra el AST y vincule cada nodo con `Intl.PluralRules`, `Intl.NumberFormat` e `Intl.DateTimeFormat`.

El tercer componente es liviano, dado que JavaScript ya incluye toda la lógica de CLDR mediante `Intl`. En cambio, los dos primeros existen con el único fin de interpretar una sintaxis en cadena. En `intl-messageformat` de FormatJS, la referencia sobre la que se asientan `react-intl` y `next-intl`, esto equivale a cerca de **10 KB de JavaScript comprimido** entregados a cada visitante, antes de incluir tus propios mensajes.

La gran mayoría de aplicaciones únicamente consumen una mínima parte: interpolaciones `{name}` y algunas ramas `plural`. Sin embargo, siguen descargando el parser para skeletons, números ordinales y offsets, debido a que una cadena evaluada en runtime no permite al empaquetador deducir qué partes pueden eliminarse.

## next-intl llegó a la misma conclusión

No se trata de una reflexión exclusivamente teórica. `next-intl`, una de las bibliotecas basadas en ICU de mayor adopción, llegó a la misma conclusión. En su versión 4.8 (enero de 2026) incorporó la opción experimental `precompile`, que procesa los mensajes de ICU durante el build para generar un AST optimizado y sustituye el parser en runtime por un evaluador compacto. El proyecto documenta que esta optimización logra **eliminar aproximadamente 9 KB de JavaScript comprimido**.

Este balance deja al descubierto los límites de este modelo: `t.raw` deja de funcionar con precompilación, puesto que la cadena de texto original de ICU deja de existir en runtime. En el momento en que prescindes del parseo en el navegador, ya no estás enviando ICU real. Envías una representación precompilada, y la sintaxis de texto pasa a ser un simple formato de autoría inicial.

Llegados a ese punto, la pregunta es natural: si el navegador nunca procesa la cadena original, ¿por qué desarrolladores y traductores tendrían que escribirla en ese formato?

## Cómo es un enfoque nativo en JavaScript

JavaScript ya resuelve internamente la parte más compleja. `Intl.PluralRules` comprende que el polaco posee cuatro categorías cardinales y el inglés cuatro ordinales. `Intl.NumberFormat` e `Intl.DateTimeFormat` gestionan monedas, unidades, notaciones compactas y calendarios. La tarea restante consiste únicamente en elegir una rama e insertar valores, lo que apenas requiere unas pocas líneas de código cuando la estructura se modela como datos en lugar de texto.

Ese es el modelo adoptado por Intlayer. Las ramificaciones se definen mediante funciones dentro de una declaración de contenido con tipado fuerte, donde cada idioma especifica estrictamente las categorías que su gramática demanda:

```typescript fileName="**/*.content.ts"
import { gender, plural, t, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox",
  content: {
    unread: t({
      es: plural({
        one: "{{count}} mensaje no leído",
        other: "{{count}} mensajes no leídos",
      }),
      en: plural({
        one: "{{count}} unread message",
        other: "{{count}} unread messages",
      }),
      pl: plural({
        one: "{{count}} nieprzeczytana wiadomość",
        few: "{{count}} nieprzeczytane wiadomości",
        many: "{{count}} nieprzeczytanych wiadomości",
        other: "{{count}} nieprzeczytanej wiadomości",
      }),
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx"
const { unread } = useIntlayer("inbox");

unread(5); // Locale en polaco → "5 nieprzeczytanych wiadomości"
```

Ventajas diferenciales frente a ICU:

- **Sin parser en el bundle.** La estructura ya es un objeto nativo al llegar al navegador. `plural` selecciona la clave adecuada valiéndose de `Intl.PluralRules`, disponible de fábrica en el entorno.
- **Detección de errores en build-time.** Una categoría omitida o un error tipográfico en una propiedad provoca un fallo de compilación en tipos, impidiendo roturas imprevistas en producción.
- **El formateo permanece fuera del mensaje.** Números, fechas y divisas se procesan mediante [hooks de formateo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) que conectan directamente con `Intl`, evitando parseadores de skeletons.
- **Lo que no se utiliza no añade peso.** Si ningún mensaje recurre a `gender`, el bundler lo descarta mediante tree-shaking.

- [Hooks de formateo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md)

Este modelo también implica ciertas contrapartidas: precisa de un paso de build, los archivos de contenido constituyen código en vez de textos planos, y algunas plataformas TMS preparadas exclusivamente para ICU no procesan directamente declaraciones de contenido en TypeScript.

## Cuándo ICU sigue siendo la elección indicada

ICU continúa siendo la mejor alternativa cuando:

- **Tu flujo de traducción depende completamente de él.** Múltiples herramientas TMS importan y exportan cadenas ICU, y el equipo de traductores domina esta sintaxis.
- **Los mensajes se comparten entre múltiples plataformas.** Suministrar traducciones a una app iOS, una app Android y una aplicación web desde un único catálogo común es una razón de peso para unificar el formato.
- **Cuentas previamente con un catálogo voluminoso en ICU.** Reescribir miles de mensajes raramente compensa el esfuerzo de forma aislada.

Para este último caso, no es necesario elegir entre una reescritura total o mantener un runtime pesado. El [adaptador de compatibilidad con react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-intl.md) de Intlayer procesa cadenas ICU existentes (`plural`, `select`, `selectordinal`, `#`, formatos clásicos `number` / `date` / `time`), facilitando una migración gradual donde el sobrecoste de ICU se reserve únicamente para los mensajes que todavía lo necesiten.

- [Adaptador de compatibilidad con react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-intl.md)

## Conclusión

ICU MessageFormat resolvió una necesidad real: la gramática pertenece a los traductores y no a sentencias condicionales como `if (count === 1)` en el código del software. Resolvió este reto en ecosistemas donde procesar un DSL en cadena no genera impacto de rendimiento. En el navegador web, asegurar compatibilidad total exige empaquetar un parser para opciones que la mayoría de desarrollos no utilizan, empujando a las propias librerías de ICU a recurrir a la precompilación para evitar este problema.

JavaScript ya incorpora las definiciones CLDR en `Intl`. Lo que requiere de un formato de i18n es su capacidad estructural de selección, y esa lógica puede modelarse directamente como datos tipados.

## Para profundizar

- [ICU Message Format: sintaxis, plurales y select](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/icu_message_format.md)
- [Contenido plural en Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md)
- [Contenido basado en select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/select.md)
- [Benchmark de librerías de i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [¿Está desactualizado next-intl?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/is_next-intl_outdated.md)
