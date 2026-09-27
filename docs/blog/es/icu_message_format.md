---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "Formato de Mensajes ICU: Sintaxis, Plurales y Select"
description: Una referencia práctica sobre ICU MessageFormat, interpolación de argumentos, ramas plural y select, categorías de plural CLDR por idioma y errores habituales.
keywords:
  - formato de mensaje icu
  - icu messageformat
  - reglas de plural cldr
  - categorias de plural
  - selectordinal
  - pluralizacion i18n
  - sintaxis de mensajes
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# Formato de Mensajes ICU: la sintaxis y los puntos conflictivos

ICU MessageFormat es una sintaxis de cadenas que permite que una traducción contenga su propia lógica condicional: plurales, formas según el género, formato de números y fechas. Existe porque la gramática pertenece al traductor, no al desarrollador que escribe `if (count === 1)`. Este artículo cubre la sintaxis, las partes dependientes del idioma que rompen las implementaciones ingenuas y cómo el ecosistema JS lo gestiona.

## Tabla de contenidos

<TOC/>

## El problema, en concreto

Este es el código que casi todo el mundo escribe primero:

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

Esto funciona en inglés y falla en prácticamente todos los demás idiomas:

- **Ruso y polaco** necesitan tres o cuatro formas, no dos.
- **Japonés** solo necesita una, y el espacio concatenado es incorrecto.
- **Árabe** necesita seis formas, y el número mismo debe mostrarse en el sistema numérico de la locale.
- **Francés** coloca un espacio de no separación antes de cierta puntuación, que tu `+ " "` acaba de romper.

El problema de fondo es que la oración se ha dividido en fragmentos. Un traductor ve `item` e `items` sin contexto y sin la capacidad de reordenar la frase. ICU MessageFormat soluciona esto manteniendo la oración completa en una sola cadena traducible y proporcionando al traductor operadores condicionales.

## Argumentos simples

La unidad básica es un marcador de posición entre llaves simples:

```text
Hello, {name}!
```

Pasas `{ name: "Alice" }` al formatear y obtienes `Hello, Alice!`. Las llaves son los únicos caracteres especiales; para imprimir una llave literal, debes envolverla entre comillas simples: `'{'`.

Esa es toda la funcionalidad de "interpolación". Todo lo demás en ICU se construye sobre ella.

## Plural

`plural` selecciona una rama según un valor numérico:

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

Tres aspectos fundamentales que debes conocer:

- **`#`** se reemplaza por el valor formateado de `count`, adaptado a la locale, por lo que `1234` se convierte en `1,234` en `en-US` y `1.234` en `es-ES`.
- **`other` es obligatorio.** Toda implementación de ICU lanzará un error o fallará en la validación sin él. Es el valor de respaldo cuando ninguna categoría coincide.
- **`=0`, `=1`, … coinciden con valores exactos** y se evalúan _antes_ de las categorías CLDR. Úsalos para textos especiales ("No hay mensajes"), no como un sustituto de `one`.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n` resta `n` del valor antes de seleccionar la categoría y sustituir `#`. Sirve para patrones como "A Alice y a otras 3 personas les gustó esto":

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

Con `count: 4`, `#` renderiza `3`. `offset` es muy útil pero no todos los entornos lo soportan igual de bien, así que conviene verificar tu runtime antes de depender de él.

## Las categorías de plural dependen del idioma

Aquí es donde la gente suele equivocarse. Los nombres de categoría `zero`, `one`, `two`, `few`, `many`, `other` no son casillas universales que se completan para cada idioma. Cada locale utiliza un _subconjunto_, definido por las [reglas de plural CLDR](https://cldr.unicode.org/index/cldr-spec/plural-rules), y las reglas son gramaticales, no intuitivas.

| Idioma  | Tag  | Categorías utilizadas            | Total |
| ------- | ---- | -------------------------------- | ----- |
| Japonés | `ja` | other                            | 1     |
| Chino   | `zh` | other                            | 1     |
| Inglés  | `en` | one, other                       | 2     |
| Alemán  | `de` | one, other                       | 2     |
| Francés | `fr` | one, many, other                 | 3     |
| Checo   | `cs` | one, few, many, other            | 4     |
| Polaco  | `pl` | one, few, many, other            | 4     |
| Ruso    | `ru` | one, few, many, other            | 4     |
| Árabe   | `ar` | zero, one, two, few, many, other | 6     |
| Galés   | `cy` | zero, one, two, few, many, other | 6     |

Dos consecuencias que suelen sorprender:

- **`one` no significa "1".** En ruso, `one` cubre 1, 21, 31, 101: cualquier número que termine en 1 excepto los terminados en 11. En francés, `0` entra dentro de `one`.
- **Añadir una categoría al texto original en inglés no tiene efecto alguno.** El mensaje en inglés solo necesita `one` y `other`; la traducción al polaco necesita cuatro ramas, y esa estructura reside en la cadena polaca, no en la inglesa. Cualquier formato que obligue a todas las locales a compartir la misma estructura de claves causará fricción aquí.

Puedes comprobar el comportamiento de tu runtime sin instalar nada:

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

`Intl.PluralRules` incluye datos CLDR en todos los navegadores modernos y en Node. Cualquier biblioteca que ofrezca pluralización CLDR casi con certeza está llamando a esta API por debajo.

## select y selectordinal

`select` permite ramificar en función de una cadena de texto arbitraria: un género, un rol, un estado o un nivel de plan.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

Las claves se comparan literalmente y `other` también es obligatorio aquí. `select` es la herramienta idónea cuando la estructura de una oración depende de un valor enumerado, ya que los idiomas discrepan sobre qué valores afectan su gramática.

`selectordinal` tiene la misma forma que `plural` pero utiliza las reglas de plurales **ordinales**, que corresponden a una tabla diferente de las cardinales:

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

El inglés utiliza cuatro categorías ordinales (1st, 2nd, 3rd, 4th) a pesar de utilizar solo dos cardinales. Esa asimetría es la razón exacta por la que ambos operadores están separados.

## Argumentos de números, fechas y horas

ICU puede formatear el valor que interpola:

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

La forma moderna es el **skeleton**, introducido con ICU 60 y marcado por el prefijo `::`. Los skeletons son mucho más expresivos que los nombres de estilo tradicionales:

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

El soporte de skeletons varía según el runtime. FormatJS los implementa al completo, mientras que otros entornos solo aceptan las formas clásicas `number, currency` o `date, long`. Verifica la compatibilidad de `::` en tu entorno antes de pasar a producción.

## Anidamiento y límites de legibilidad

ICU es componible. Una rama de plural puede contener un select, que a su vez puede contener otro plural:

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

Este es el ejemplo clásico de ICU y también el principal argumento contra el anidamiento profundo. A partir de dos niveles, los traductores empiezan a cometer errores de llaves y los editores TMS dejan de ser útiles. Anida como máximo dos niveles; si necesitas un tercero, divide la frase en dos mensajes independientes.

## Cómo gestionan ICU las bibliotecas de JS

| Biblioteca            | Soporte ICU      | Lo que realmente escribes                                                    |
| --------------------- | ---------------- | ---------------------------------------------------------------------------- |
| react-intl (FormatJS) | Nativo, completo | Cadenas ICU, incluyendo skeletons y etiquetas de texto enriquecido           |
| next-intl             | Nativo           | Cadenas ICU, mediante `intl-messageformat` de FormatJS                       |
| i18next               | Requiere plugin  | Sufijos de clave `key_one` / `key_other` y `{{name}}`; ICU vía `i18next-icu` |
| vue-i18n              | Parcial / propio | Interpolación `{name}` y ramas de plural separadas por barras                |
| Angular (`$localize`) | Subconjunto      | ICU `plural` / `select` dentro de plantillas, extraído a XLIFF               |

Algunas aclaraciones para interpretar la tabla con precisión:

- **La sintaxis predeterminada de i18next no es ICU**, y no por ello es peor. Los sufijos (`item_one`, `item_few`) se corresponden con las categorías de `Intl.PluralRules` y son a menudo más fáciles de editar para los traductores en JSON plano. Pero `select` y el anidamiento complejo no forman parte de este modelo, por lo que requieres `i18next-icu` o gestionar la lógica en el código.
- **Los plurales con barras de vue-i18n** utilizan por defecto una función de reglas por locale, no las categorías CLDR. Funciona, pero la regla vive en la configuración de la app en vez de en los datos.
- **FormatJS es la implementación de referencia** en JS. Cuando se menciona "ICU MessageFormat" en un contexto de JavaScript, normalmente se alude a lo que FormatJS acepta.

## Cómo lo resuelve Intlayer

Intlayer no utiliza un DSL en cadenas de texto. Los operadores condicionales son funciones dentro de un archivo de declaración de contenido, por lo que la estructura está tipada y cada locale declara únicamente las categorías que su gramática necesita:

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      es: plural({
        one: "{{count}} vacante",
        other: "{{count}} vacantes",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // Locale polaca → "5 ofert"
```

La correspondencia con los conceptos de ICU es directa:

| Concepto ICU                  | Intlayer                                     |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")` o autodetección   |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| rama de género en `select`    | `gender({ male, female, fallback })`         |
| rama booleana en `select`     | `cond({ true, false })`                      |
| rangos numéricos (no-CLDR)    | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

`plural` delega la selección de categorías en `Intl.PluralRules`, por lo que la tabla CLDR anterior se aplica sin modificaciones. El formateo se mantiene independiente: números, fechas, monedas y listas se manejan mediante [hooks de formato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md) en lugar de incrustarse en el mensaje.

- [hooks de formato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md)

Límites transparentes:

- Intlayer requiere un paso de compilación: el compilador extrae las declaraciones durante el build. Si buscas JSON plano cargado en tiempo de ejecución, se trata de un modelo diferente.
- `plural` no admite anidar un `t()` dentro de sus ramas por el momento: envuelves `plural` dentro de `t()`, y no al revés.
- El ecosistema es más reciente que el de i18next, con menos integraciones directas con TMS o respuestas en foros.

Si provienes de una base de código que ya contiene cadenas ICU reales, el [adaptador de compatibilidad react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-intl.md) las analiza directamente: `plural`, `select`, `selectordinal`, `#` y los argumentos tradicionales `number`, `date`, `time`. Los skeletons y la opción `offset:` no están cubiertos por ese analizador, así que conviene revisar esos mensajes al migrar. El [adaptador de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18next.md) resuelve la forma con sufijos (`key_one`, `key_male`) mediante `Intl.PluralRules`.

- [adaptador de compatibilidad react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-intl.md)
- [adaptador de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18next.md)

## Errores habituales

- **Codificar la lógica de plural en JS.** `count === 1 ? a : b` produce resultados incorrectos para 8 de los 10 idiomas de la tabla anterior. Una vez que el operador ternario está en el código, ningún traductor puede arreglarlo.
- **Concatenar fragmentos traducidos.** El orden de las palabras, las concordancias gramaticales y la separación antes de los signos de puntuación dependen de la locale. Mantén la oración completa.
- **Omitir `other`.** Es obligatorio según la especificación, no una convención optativa. La mayoría de los analizadores rechazarán el mensaje y el resto no mostrará nada.
- **Asumir que tus categorías se extrapolan.** Que el archivo original en inglés use `one` y `other` no implica que el polaco tenga dos ramas. Deja que cada locale declare las suyas. Consulta la [declaración de contenido por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md).
- **Usar `=1` donde correspondía `one`.** `=1` coincide solo con el número 1 exacto. En ruso, 21 necesita `one`, y `=1` nunca se activará para ese caso.
- **Colocar `#` fuera de una rama de plural.** Solo tiene un significado especial dentro de `plural` o `selectordinal`. En cualquier otro lugar es una simple almohadilla.
- **Olvidar que `#` ya está formateado.** Si necesitas el número sin formato, interpola el argumento por su nombre.

## Para profundizar

- [Contenido de plural en Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/plurial.md)
- [Contenido basado en select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/select.md)
- [Marcadores de inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion.md)
- [Benchmark de bibliotecas i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/react-i18next_vs_react-intl_vs_intlayer.md)
- [¿Qué es la internacionalización?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/what_is_internationalization.md)
