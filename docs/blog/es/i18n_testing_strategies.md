---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Cómo probar traducciones sin escribir pruebas frágiles"
description: Qué vale la pena probar en una aplicación i18n y qué no. Pruebas de renderizado con provider, pseudolocalización, cobertura RTL y plurales, y la trampa de los snapshots.
keywords:
  - probar traducciones
  - pruebas i18n
  - testing library i18n
  - pseudolocalización
  - prueba provider locale
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Cómo probar traducciones sin escribir pruebas frágiles

La mayoría de las suites de pruebas i18n fallan de dos formas. O bien realizan aserciones sobre el texto literal, de modo que cada cambio de redacción rompe cincuenta pruebas y el equipo termina eliminándolas. O bien renderizan todo en el locale predeterminado, sin verificar nada sobre los otros diecisiete. Ambos caminos conducen al mismo destino, una suite en la que nadie confía.

## Tabla de contenidos

<TOC/>

## Los patrones son independientes de la biblioteca

Cada patrón a continuación funciona en cualquier stack i18n. Cambia el provider por `I18nextProvider`, `NextIntlClientProvider` o `IntlProvider` y las pruebas permanecerán idénticas, ya que validan el resultado renderizado en lugar de una API de biblioteca.

El soporte de cobertura también se adapta: con el [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) apuntando a tus catálogos actuales, o un [adaptador de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) creando alias sobre tus imports actuales, la aserción de cobertura se ejecuta sobre el JSON que ya tienes.

## Decide qué estás probando en realidad

La calidad de la traducción no se comprueba con una aserción de código. Ninguna aserción puede validar si el alemán suena natural, y asumir lo contrario llena la suite de cadenas hardcodeadas.

Lo que sí vale la pena probar es mecánico:

| Vale la pena probar                         | No vale la pena probar           |
| :------------------------------------------ | :------------------------------- |
| Cada locale requerido tiene un valor        | Si la redacción suena bien       |
| El locale correcto llega al componente      | El texto exacto de cada etiqueta |
| Los plurales resuelven cada categoría       | Si el traductor hizo su trabajo  |
| Locales RTL configuran dirección y espejo   | Cada cadena en cada locale       |
| Fechas y números formateados usan el locale | La precisión interna de `Intl`   |

La cobertura pertenece a una prueba orientada a datos, no a las pruebas de componentes. Eso se detalla en [cómo detectar traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md); este artículo se enfoca en el resto.

## Renderiza dentro de un provider y busca por rol

El patrón principal consiste en montar el componente dentro de un provider de locale y consultar por rol o identificador de prueba en lugar de por texto.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("renderiza el encabezado del resumen en francés", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Consultar `getByRole("heading")` sobrevive a un cambio de texto. `getByText("Récapitulatif")` no lo hace. Usa la cadena literal únicamente cuando el texto en sí sea el objeto de prueba, lo cual ocurre raramente.

Para atributos como `aria-label`, necesitas la cadena sin procesar en lugar de un nodo renderizable. En React, las entradas de `useIntlayer` exponen un campo `.value` para este propósito.

## Parametriza las pruebas entre locales

Un único cuerpo de prueba evaluado en cada locale aporta mucho más valor que una prueba separada por locale.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("renderiza sin recurrir a la clave sin traducir", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Una clave renderizada significa que la resolución falló.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("establece la dirección de texto correcta", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

La primera aserción es una ventaja genérica económica: si la resolución falla y tu biblioteca imprime la clave, el DOM contendrá un formato similar a `cart.summary.title`. Esto detecta una clase completa de errores sin evaluar una sola cadena.

## La pseudolocalización revela lo que los catálogos no detectan

Añade un locale ficticio que transforme cada texto, por ejemplo convirtiendo `Checkout` en `[!!! Çĥéçķöũţ !!!]`. Luego renderiza la página en ese locale.

Cualquier elemento que permanezca en inglés estándar está hardcodeado en el código, y ninguna auditoría basada en catálogos puede percibirlo, ya que para las herramientas la cadena no existe. Los corchetes cumplen una segunda función: expanden el texto cerca de un 30 por ciento, exponiendo desbordes de interfaz antes de que ocurran en alemán.

Conviene ejecutar esto como un paso visual o end-to-end antes que como una prueba unitaria, ya que el fallo se detecta visualmente.

## Los plurales requieren una prueba por categoría, no por idioma

Los errores de plurales pasan desapercibidos porque el inglés solo maneja dos formas y muchos desarrolladores se limitan a ellas. El polaco tiene cuatro, el árabe seis.

```ts fileName="plural.test.ts"
// El árabe evalúa zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("cantidad %i", (count) => {
  it("produce una cadena no vacía en árabe", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Elige cantidades que cubran cada categoría CLDR para el idioma más complejo en lugar de verificar 1 y 2 en todas partes. `Intl.PluralRules` indica en qué categoría encaja un número, de modo que puedes deducir los valores de prueba en lugar de adivinarlos. Más detalles sobre las categorías en el [artículo sobre el formato de mensajes ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/icu_message_format.md).

## La trampa de los snapshots

Los snapshots y la internacionalización son una mala combinación. Un snapshot de un componente localizado almacena cada cadena en su interior, de modo que un traductor corrigiendo un error ortográfico en portugués convierte una suite en verde en rojo, dentro de un archivo que ningún revisor puede evaluar. Tras varias falsas alarmas, alguien ejecuta `-u` sin revisar el diff y los snapshots pierden toda utilidad.

Si deseas utilizar snapshots, captúralos en un solo locale y considéralos como una comprobación estructural y no de contenido. Todo lo específico de cada locale debe verificarse con aserciones explícitas.

## Prueba la negociación de locale, no solo el renderizado

El error de i18n más habitual en producción no es una cadena faltante. Es la selección de un locale incorrecto: una URL marca `/fr/`, el cliente lee `navigator.language`, y no coinciden.

Prueba la lógica de resolución directamente, como una función pura independiente de los componentes:

```ts fileName="locale-resolution.test.ts"
it("prefiere la URL sobre la preferencia guardada", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("usa el header cuando la URL carece de prefijo", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

Esta es la prueba de i18n de mayor valor que suele faltar en los proyectos, y no requiere DOM.

## Qué ejecutar y dónde

- **Unitaria**: negociación de locales, formateadores, categorías de plurales. Rápida, sin DOM.
- **Componente**: un renderizado con provider por locale, verificando roles y la ausencia de claves sin resolver.
- **Cobertura**: una prueba basada en datos que garantice la ausencia de locales requeridos faltantes.
- **Visual o end-to-end**: pase de pseudolocalización y una página RTL, pues esos fallos son visuales.

Mantén las tres primeras en la integración continua en cada commit. La última es económica en ejecuciones nocturnas y costosa en cada push.

## Errores comunes

- **Aserciones sobre texto literal en todas partes.** Garantiza el abandono de la suite en pocos meses.
- **Crear snapshots de componentes localizados.** Los traductores rompen el build y los revisores aprueban sin mirar.
- **Probar únicamente el locale predeterminado.** El único locale que nunca puede faltar.
- **Probar 1 y 2 para los plurales.** Pasa por alto las categorías que el inglés no posee.
- **Crear mocks de la librería i18n.** En ese punto solo estás probando que el mock devuelve cadenas.
- **No probar nunca la negociación de locales.** El fallo más común en entornos reales y el más sencillo de comprobar.

## Para profundizar

- [Probar tu contenido: auditoría CLI, API programática y aserciones UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md)
- [Plugin de ESLint: detección de texto hardcodeado y contenido no utilizado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)
- [Formateadores y utilidades de locale, incluyendo `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/formatters.md)
- [Informes de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [Adaptador de compatibilidad react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/react-i18next.md)
- [Cómo detectar traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md)
- [Formato de mensajes ICU: plurales, select y esqueletos](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/icu_message_format.md)
