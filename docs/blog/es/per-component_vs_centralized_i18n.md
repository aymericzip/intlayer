---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: i18n por componente vs. centralizado: Un nuevo enfoque con Intlayer
description: Un análisis profundo de las estrategias de internacionalización en React, comparando enfoques centralizados, por clave y por componente, e introduciendo Intlayer.
keywords:
  - i18n
  - React
  - Internacionalización
  - Intlayer
  - Optimización
  - Tamaño del bundle
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# i18n por componente vs. centralizado

El enfoque por componente no es un concepto nuevo. Por ejemplo, en el ecosistema Vue, `vue-i18n` admite [i18n SFC (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). Nuxt también ofrece [traducciones por componente](https://i18n.nuxtjs.org/docs/guide/per-component-translations), y Angular emplea un patrón similar a través de sus [Feature Modules](https://v17.angular.io/guide/feature-modules).

Incluso en una app Flutter, a menudo encontramos este patrón:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Las traducciones residen aquí
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

Sin embargo, en el mundo React, principalmente vemos diferentes enfoques, que agruparé en tres categorías:

<Columns>
  <Column>

**Enfoque centralizado** (i18next, next-intl, react-intl, lingui)

- (sin namespaces) considera una única fuente para obtener el contenido. Por defecto, cargas el contenido de todas las páginas cuando tu app se inicia.

  </Column>
  <Column>

**Enfoque granular** (intlayer, inlang)

- afina la recuperación de contenido por clave o por componente.

  </Column>
</Columns>

> En este blog, no me centraré en soluciones basadas en compiladores, que ya cubrí aquí: [Compilador vs i18n declarativa](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md).
> Ten en cuenta que la i18n basada en compiladores (por ejemplo, Lingui) simplemente automatiza la extracción y la carga de contenido. Bajo el capó, a menudo comparten las mismas limitaciones que otros enfoques.

> Ten en cuenta que cuanto más granularices la forma en que recuperas tu contenido, mayor es el riesgo de introducir estado y lógica adicional en tus componentes.

Los enfoques granulares son más flexibles que los centralizados, pero a menudo implican un compromiso. Incluso si esas bibliotecas publicitan "tree shaking", en la práctica frecuentemente terminarás cargando una página en cada idioma.

Entonces, en términos generales, la decisión se desglosa así:

- Si tu aplicación tiene más páginas que idiomas, deberías favorecer un enfoque granular.
- Si tienes más idiomas que páginas, deberías inclinarte por un enfoque centralizado.

Por supuesto, los autores de las librerías son conscientes de estas limitaciones y ofrecen soluciones alternativas.
Entre ellas: dividir en namespaces, cargar dinámicamente archivos JSON (`await import()`), o purgar el contenido en tiempo de compilación.

Al mismo tiempo, debes saber que cuando cargas tu contenido dinámicamente, introduces solicitudes adicionales a tu servidor. Cada `useState` adicional o hook significa una solicitud extra al servidor.

> Para solucionar este punto, Intlayer sugiere agrupar múltiples definiciones de contenido bajo la misma clave; Intlayer luego fusionará ese contenido.

Pero de entre todas esas soluciones, está claro que el enfoque más popular es el centralizado.

### ¿Por qué es tan popular el enfoque centralizado?

- Primero, i18next fue la primera solución en volverse ampliamente usada, siguiendo una filosofía inspirada en arquitecturas PHP y Java (MVC), que se basan en una estricta separación de responsabilidades (mantener el contenido separado del código). Llegó en 2011, estableciendo sus estándares incluso antes del gran cambio hacia arquitecturas basadas en componentes (como React).
- Luego, una vez que una librería se adopta ampliamente, se vuelve difícil mover el ecosistema a otros patrones.
- Usar un enfoque centralizado también facilita las cosas en Sistemas de Gestión de Traducciones como Crowdin, Phrase o Localized.
- La lógica detrás de un enfoque por componente es más compleja que la de uno centralizado y requiere más tiempo para desarrollarse, especialmente cuando hay que resolver problemas como identificar dónde está ubicado el contenido.

### Ok, ¿pero por qué no optar simplemente por un enfoque centralizado?

Déjame explicarte por qué puede ser problemático para tu app:

- **Datos no usados:** Cuando se carga una página, a menudo se carga el contenido de todas las demás páginas. (En una app de 10 páginas, eso supone un 90% de contenido cargado que no se usa). ¿Haces lazy load de un modal? A la biblioteca i18n no le importa: de todas formas carga las cadenas primero.
- **Rendimiento:** En cada re-renderizado, todos y cada uno de tus componentes se hidratan con una enorme carga JSON, lo que afecta la reactividad de tu app conforme crece.
- **Mantenimiento:** Mantener archivos JSON grandes es doloroso. Tienes que saltar entre archivos para insertar una traducción, asegurándote de que no falten traducciones y de que no queden **claves huérfanas**.
- **Sistema de diseño:**
  Crea incompatibilidades con los design systems (por ejemplo, un componente `LoginForm`) y limita la duplicación de componentes entre distintas aplicaciones.

**"¡Pero inventamos los Namespaces!"**

Claro, y eso es un gran avance. Veamos la comparación del tamaño del bundle principal de una configuración Vite + React + React Router v7 + Intlayer. Simulamos una aplicación de 20 páginas.

El primer ejemplo no incluye traducciones lazy-loaded por locale ni separación de namespaces. El segundo incluye purgado de contenido + carga dinámica de traducciones.

| Bundle optimizado                                                                                                         | Bundle no optimizado                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ![bundle no optimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![bundle optimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Así que, gracias a los namespaces, pasamos de esta estructura:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

A esta:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Ahora tienes que gestionar con precisión qué parte del contenido de tu aplicación debe cargarse y dónde. En conclusión, la gran mayoría de proyectos simplemente omite esta parte debido a la complejidad (véase la [guía de next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_using_next-i18next.md) por ejemplo para comprobar los retos que supone (solo) seguir las buenas prácticas).
En consecuencia, esos proyectos acaban con el problema de la carga masiva de JSON explicado anteriormente.

> Ten en cuenta que este problema no es específico de i18next, sino de todos los enfoques centralizados mencionados arriba.

Sin embargo, quiero recordarte que no todos los enfoques granulares solucionan esto. Por ejemplo, los enfoques `vue-i18n SFC` o `inlang` no realizan de forma inherente lazy load de las traducciones por locale, por lo que simplemente cambias el problema del tamaño del bundle por otro.

Además, sin una separación adecuada de responsabilidades, se vuelve mucho más difícil extraer y proporcionar tus traducciones a los traductores para su revisión.

### Cómo el enfoque por componente de Intlayer resuelve esto

Intlayer procede en varios pasos:

1. **Declaración:** Declara tu contenido en cualquier parte de tu codebase usando archivos `*.content.{ts|jsx|cjs|json|json5|...}`. Esto asegura la separación de responsabilidades mientras mantiene el contenido co-localizado. Un archivo de contenido puede ser por-locale o multilingüe.
2. **Procesamiento:** Intlayer ejecuta un paso de build para procesar la lógica JS, gestionar los fallbacks de traducción faltantes, generar tipos de TypeScript, manejar contenido duplicado, obtener contenido desde tu CMS, y más.
3. **Purgado:** Cuando tu app se builda, Intlayer purga el contenido no usado (un poco como Tailwind gestiona tus clases) reemplazando el contenido de la siguiente manera:

**Declaración:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    es: { title: "Mi título" },
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Procesamiento:** Intlayer construye el diccionario basado en el archivo `.content` y genera:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json
{
  "key": "my-key",
  "content": { "title": "Mi título" },
}
```

**Reemplazo:** Intlayer transforma tu componente durante la compilación de la aplicación.

**- Modo de importación estática:**

```tsx
// Representación del componente en sintaxis similar a JSX
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        en: { title: "Mi título" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Modo de importación dinámica:**

```tsx
// Representación del componente en sintaxis similar a JSX
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Same for other languages
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` utiliza un mecanismo similar a Suspense para cargar el JSON localizado únicamente cuando es necesario.

**Beneficios clave de este enfoque por componente:**

- Mantener la declaración de tu contenido cerca de tus componentes permite una mejor mantenibilidad (p. ej., mover un componente a otra app o design system. Eliminar la carpeta del componente también elimina el contenido relacionado, como probablemente ya haces con tus `.test`, `.stories`)

- Un enfoque por componente evita que los agentes de IA tengan que saltar entre todos tus distintos archivos. Trata todas las traducciones en un solo lugar, limitando la complejidad de la tarea y la cantidad de tokens utilizados.

### Limitaciones

Por supuesto, este enfoque conlleva compromisos:

- Es más difícil conectarlo con otros sistemas de l10n y herramientas adicionales.
- Quedas atado a la solución (lock-in), que básicamente ya ocurre con cualquier solución i18n debido a su sintaxis específica.

Esa es la razón por la que Intlayer intenta proporcionar un conjunto de herramientas completo para i18n (100% gratuito y OSS), incluyendo traducción por IA usando tu propio AI Provider y claves de API. Intlayer también ofrece herramientas para sincronizar tus JSON, funcionando como formateadores de mensajes de ICU / vue-i18n / i18next para mapear el contenido a sus formatos específicos.
