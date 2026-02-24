---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Transformar una aplicación Next.js existente en una aplicación multilingüe (guía i18n 2026)
description: Descubra cómo hacer que su aplicación Next.js existente sea multilingüe utilizando el Compilador Intlayer. Siga la documentación para internacionalizar (i18n) y traducir su aplicación mediante Inteligencia Artificial (IA).
keywords:
  - Internacionalización
  - Traducción
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compilador
  - IA
slugs:
  - doc
  - configuracion
  - nextjs
  - compilador
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Versión Inicial
---

# Cómo hacer que una aplicación Next.js existente sea multilingüe (i18n) (Guía i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Vídeo" value="video">
  
<iframe title="La mejor solución i18n para Next.js? Descubre Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Código" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Dimo CodeSandbox - Cómo internacionalizar tu aplicación con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Revise la [Plantilla de la Aplicación](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) en GitHub.

## Índice

<TOC/>

## ¿Por qué es difícil internacionalizar una aplicación existente?

Si alguna vez ha intentado agregar múltiples idiomas a una aplicación que solo se construyó para uno, conoce el esfuerzo que supone. No es solo "difícil", es tedioso. Tiene que revisar cada archivo, encontrar cada cadena de texto y moverlos a archivos de diccionario separados.

Luego viene la parte arriesgada: reemplazar todo ese texto con "hooks" de código sin romper el diseño o la lógica de la página. Es el tipo de trabajo que interrumpe el desarrollo de nuevas funciones durante semanas y se siente como una refactorización interminable.

## ¿Qué es el Compilador Intlayer?

El **Compilador Intlayer** está diseñado para evitar ese trabajo manual. En lugar de obligarlo a extraer las cadenas de texto manualmente, el compilador lo hace por usted. Escanea su código, encuentra el texto y usa Inteligencia Artificial para generar diccionarios en segundo plano.
Luego modifica su código fuente durante el proceso de empaquetado (build) para inyectar los hooks de i18n necesarios. En esencia, usted sigue escribiendo su aplicación como si fuera en un solo idioma, y el compilador gestiona la transformación multilingüe de forma nativa.

> Documentación del Compilador: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md

### Limitaciones

Dado que el compilador realiza el análisis y la transformación del código (inyectando hooks y generando diccionarios) durante el **tiempo de compilación (compile time)**, esto puede **ralentizar el tiempo de empaquetado (build time)** de su aplicación.

Para limitar este impacto durante el desarrollo activo (dev mode), puede configurar el compilador en su modo [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) o deshabilitarlo cuando no lo necesite.

---

## Guía paso a paso para configurar Intlayer en una aplicación Next.js

### Paso 1: Instalar las dependencias

Instale los paquetes necesarios utilizando su gestor de paquetes favorito:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  El paquete central que provee las herramientas de internacionalización para la gestión de las configuraciones, la traducción, la [declaración de contenidos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md), la transpilación, y por supuesto los [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md).

- **next-intlayer**

  El paquete que integra fuertemente Intlayer con el framework de Next.js. Provee de proveedores de contexto (context providers) y hooks para manejar la internacionalización nativa. Adicionalmente, incluye el plugin de Next.js para integrar de manera continua Intlayer bajo el ecosistema de [Webpack](https://webpack.js.org/) o de [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), y además añade un middleware que se encarga de detectar el "locale" preferido del usuario, gestionar las cookies, así como lidiar con las redirecciones de las URL.

### Paso 2: Configurar su proyecto

Cree un archivo de configuración para definir los idiomas de su aplicación:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH],
    defaultLocale: Locales.SPANISH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Puede configurarse como 'build-only' para limitar el impacto en el modo dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sin prefijo al momento de compilar
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext:
      "Este es un código sencillo de una aplicación en formato de Mapa Web.",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH],
    defaultLocale: Locales.SPANISH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Puede configurarse como 'build-only' para limitar el impacto en el modo dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sin prefijo al momento de compilar
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext:
      "Este es un código sencillo de una aplicación en formato de Mapa Web.",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH],
    defaultLocale: Locales.SPANISH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Puede configurarse como 'build-only' para limitar el impacto en el modo dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Sin prefijo al momento de compilar
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext:
      "Este es un código sencillo de una aplicación en formato de Mapa Web.",
  },
};

module.exports = config;
```

> **Aviso**: Asegúrese de haber configurado adecuadamente subiendo la variable de entorno de forma segura para la `OPEN_AI_API_KEY`.

> A través de este archivo de configuración, puede establecer URL localizadas de forma eficiente, configuraciones de redirección de proxy, asignación (mapping) en formato de cookies, indicar la ubicación ideal y extensión exacta de sus declaraciones de archivos de contenido, o bien inhabilitar los registros (logs) extraños de la consola Intlayer, entre muchas más utilidades. Para revisar la lista entera que incluye todos estos poderosos parámetros configurables asista a nuestra completa [documentación dedicada a las configuraciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Paso 3: Integre el sistema Intlayer a su configuración base en código Next.js

Configure y adapte fuertemente su núcleo fundamental (el `next.config`) para emparejar y desplegar el soporte a Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* En éste apartado sume sus adiciones extra de forma genérica para Next.js de serle útil  */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* En éste apartado sume sus adiciones extra de forma genérica para Next.js de serle útil  */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* En éste apartado sume sus adiciones extra de forma genérica para Next.js de serle útil  */
};

module.exports = withIntlayer(nextConfig);
```

> El versátil plugin de exportación envolvente `withIntlayer()` dentro de la estructura de configuración Next.js, se emplea para compenetrar con éxito pleno todo el marco natural de Intlayer junto a su marco central Next.js. De manera inmediata blinda las etapas cruciales donde se aseguran los procesos y se reescribe de fondo las tareas constructivas para edificar sus preciados y necesarios archivos de diccionarios, y lo que es mejor lo logra de forma observante incesante ante cambios de programación dentro del famoso entorno para su desarrollador en tiempo y espacio de desarrollo ('dev mode'). De manera secundaria, asocia e infiere toda variable elemental orientada hacia los ecosistemas [Webpack](https://webpack.js.org/) o hacia ecosistemas avanzados con velocidad puntera tipo [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). A mayores distancias y para sumar rendimiento incorpora alias que son altamente valiosos minimizando trayectos de importación abultados, operando minuciosamente todo en sinergía limpia al lado de su Server Components sin presentar fallas orgánicas.

### Configurar Babel

El compilador de Intlayer requiere Babel para extraer y optimizar su contenido. Actualice su `babel.config.js` (o `babel.config.json`) para incluir los complementos de Intlayer:

```js fileName="babel.config.js" codeFormat="commonjs"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Paso 4: Creando el enrutamiento para "Locale" y diseño de la red

Borre o deshágase de todos los fragmentos genéricos originarios listados bajo el paraguas y jerarquía general desde la raíz `RootLayout` hasta transformarse a parecerse minuciosamente de la siguiente forma basándose puntillosamente del extracto de origen ejemplificado a continuación:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Paso 5: Proceso integral hacia la Declaración Automática

Con solo mantener habilitado (enabled) nuestro increíble Componente base del motor compilador, le adelantamos que a partir de ahora **ya no habrá que romprese más la cabeza** y dejar de lado completamente esa tediosa práctica o labor donde manualmente generaba infinitas veces sus archivos referenciados a cada diccionario de su codificación (digamos los archivos del formato `.content.ts`).

Lo grandioso de ésto es que, al contrario, el flujo productivo será asombroso pues solamente usted necesita redactar normalmente su texto principal codificado literalmente crudo sobre su matriz original. Posterior a ese hecho menor y tras validarse las etapas, todo un entramado invisible a cargo propiamente de "Intlayer" realizará escaneos íntegros abordando ese texto central original en el lenguaje elegido predeterminado para luego aplicar magia con apoyo masivo originario del potente modelo informático impulsado por un poderoso proveedor (Inteligencia Artificial IA) preestablecido dentro de su configuración. Seguido de este enorme paso de forma sigilosa sin dejar rastros de pausas para Ud. suplanta ágilmente aquellas líneas originales o letras originarias textuales por textos que yacen plenamente traducidos y bien formulados sin contrarrestar sus fases pre construídas relativas a los ciclos de build-step (tiempos donde las operaciones toman control para ser armadas formalmente para producción).

### Paso 6: Utilice el contenido en su código

Simplemente escriba sus componentes con cadenas de texto literales en su idioma predeterminado. El compilador se encarga del resto.

Ejemplo de cómo podría verse su página:

<Tabs>
  <Tab value="Code" label="Código">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Comienza editando</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output" label="Salida">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      es: {
        getStartedByEditing: "Comienza editando",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- Tome el respectivo recaudo e interiorícese en que **`IntlayerClientProvider`** es utilizado rigurosamente para otorgar el contexto asociado a la variable del origen del sistema de lenguaje (locale) y se infunde fluidamente escalando la jerarquía transmitiendo ese dato crucial en todos los subniveles subordinados descendentes mejor identificados como "sus componentes Hijos (Children)" por toda el área o ecosistema referenciado únicamente que opera "Del lado del cliente en sí (Client side)".
- Muy distante y en contraparte a ésto localizamos la contraofensiva el cual es **`IntlayerServerProvider`** usado precisamente de igual manera para transferir el origen de raíz de este valioso parámetro de sistema local ("locale"), pero que, a desprendimiento del anterior este lo efectúa dentro de ambientes sumamente especializados tales como la área colindante y jerarquizada denominada "Áreas centralizadas u orígenes centralizados del Servidor (Server side / Server components)".

### (Opcional) Paso 7: Completar traducciones faltantes

Intlayer proporciona una herramienta de CLI para ayudarte a completar las traducciones faltantes. Puedes usar el comando `intlayer` para probar y completar las traducciones faltantes de tu código.

```bash
npx intlayer test         # Probar si faltan traducciones
```

```bash
npx intlayer fill         # Completar las traducciones faltantes
```

### (De nivel opcional y libre) Paso 8: La incorporación del Middleware tipo Proxy dirigido a la localización base.

No todo son riguras pero ¿Acaso existe alguna chance o el fervor sobre dirigir mágicamente y forzar las transiciones al visitante según su idioma de agrado de la mano de alguna rutina amena mediante Next.js? ¡Ahí tiene cabida en todo su derecho un aliado más bajo el título envolvente del "Middleware a tipo de proxy redireccionador"!

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> La figura del `intlayerProxy` asume los dotes encomendados del sistema subyacente dedicado y a cargo de interceptar los gustos arraigados del usuario dictados como locale preferente o de navegador y enseguida con base a eso lanzar un redireccionamiento del plano natural para su visitante propinándole de frente la URL idealísima con concordancia extrema y unida férreamente a las bases impuestas en el [Panel de configuración (Configuration File settings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md). Así también salva sin dejar mella la ubicación guardando la firma exacta de este tan apreciado elemento por medio de la famosa red interna alojada basada bajo los vestigios de un humilde almacenamiento "cookie", ¡Preparando cómodamente los recibimientos para los siguientes eventuales accesos futuros!

### (Complemento opcional) Paso 9: Componente selector de Idioma (Menú conmutador Language Switcher)

Si ha soñado con elevar exponencialmente hasta lo estratosférico su UX (Nivel de excelencia experiencial brindado), y asentar soberbiamente ese flujo navegacional suave sin paradas crudas (o sea, librarse a todo riesgo por medio de la magia asincrónica del famoso recargo integral que paraliza "hard refresh" sobre su propia Next.js page), le instamos enormemente en la estructuración de su propio componente personalizado a función y talla, de botones (switcher selector intermedial) amarrados bajo la etiqueta invocadora "Link" con destino fiel a catapultar velozmente por todo lo grande a sus amados usuarios directos a encontrar y enclavar su travesía inter-lingüistica en segundos de gloria:

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Notación acortada bajo un acrónimo minúsculo - ejemplo contundente : ES */}
              {localeItem}
            </span>
            <span>
              {/* Despunte o etiqueta referencial indicativo para enclavar visualmente las rutas apoyándose en este caso preciso desde el actual Locale al que el visitante yace aferrado  - ej. En caso de ser de vista o lectura hispana se manifestaría: Inglés (por si va elegir pasarse al idioma inglés) o bien Español */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Retomando en el fondo y en crudo la estructura basamental de sus denominaciones por defecto referenciados por nativos originarios de país - ej: English o bien Español o tal vez Français! */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Inflexión y representación globalizada unilineal en la lengua global anglosajona común - ej: English, Spanish, French etc */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Notación acortada bajo un acrónimo minúsculo - ejemplo contundente : ES */}
              {localeItem}
            </span>
            <span>
              {/* Despunte o etiqueta referencial indicativo para enclavar visualmente las rutas apoyándose en este caso preciso desde el actual Locale al que el visitante yace aferrado  - ej. En caso de ser de vista o lectura hispana se manifestaría: Inglés (por si va elegir pasarse al idioma inglés) o bien Español */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Retomando en el fondo y en crudo la estructura basamental de sus denominaciones por defecto referenciados por nativos originarios de país - ej: English o bien Español o tal vez Français! */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Inflexión y representación globalizada unilineal en la lengua global anglosajona común - ej: English, Spanish, French etc */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Notación acortada bajo un acrónimo minúsculo - ejemplo contundente : ES */}
              {localeItem}
            </span>
            <span>
              {/* Despunte o etiqueta referencial indicativo para enclavar visualmente las rutas apoyándose en este caso preciso desde el actual Locale al que el visitante yace aferrado  - ej. En caso de ser de vista o lectura hispana se manifestaría: Inglés (por si va elegir pasarse al idioma inglés) o bien Español */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Retomando en el fondo y en crudo la estructura basamental de sus denominaciones por defecto referenciados por nativos originarios de país - ej: English o bien Español o tal vez Français! */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Inflexión y representación globalizada unilineal en la lengua global anglosajona común - ej: English, Spanish, French etc */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> No olvide lo increíblemente útil y amigable que resultará si usted por decisión y empuje personal lograra sacar inmensos frutos acudiendo fiel a la función fundamental de denominación extraída de parte interna del `setLocale` dispuesta bondadosa mediante el valiosísimo y centralizado bloque estructural nativo originario y proveniente de `useLocale` (El Hook maestro). Expanda y explaye esos horizontes y navegue en todo límite revisando esta fenomenal e instructiva porción sobre el amplio territorio del router integrado ahondando a los rincones profundos en el magistral [Material Documentado Oficial (useLocale hook reference manual)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useLocale.md).

### (Agregado valioso Opcional) Paso 10: Adherencia a Server Actions en rescate incesante del identificador Maestro "Locale State"

Dando un profundo sumergimiento por áreas altamente volátiles y escondidas (El Background End Sever Node Server Side Environment propiamente), existirá siempre aquel punto exacto de la ecuación dónde y en pleno procesamiento y evaluación de complejas peticiones u operaciones, nuestro gran y venerado "Server node nativo o Background process handler" dictará su propio veredicto o demanda infalible: Requerir obtener mágicamente pero al compás preciso y con efectividad inamovible el valor vivo originado local del estatus base (por ej: A la hora inexorable del evento de emisión con disparo automatizado de algún mensaje por e-mail, exigiendo que dicho correo resulte entregado a todas luces en el mismo compás idiomático por el que nuestro expectante usuario intercedió e inauguró sesión inicialmente antes que suceda el resto!) He aquí en este embudo la herramienta infalible y su fiel compañera: nos honramos presentar a `getLocale` derivada y provista con delicadeza pero con garra extrema por el núcleo `@next-intlayer/server` para su alivio infinito:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Aquí adelante despunte y derroche talento. Enraizado y basado cien por cien bajo el influjo protector de su amparo idiomático asegurado. (Eje: Envíos e-mails condicionados, llamadas a servicios Cloud foráneos y mucho mucho más). ¡Luz verde!...
};
```

> Un vistazo entre las sombras revela con encanto en que forma intriga la secuencia majestuosamente estructurada detrás de esa gran magia originaria o cuna que habita dentro de `getLocale()`. Esa extracción jerarquiza fuertemente una validación asombrosa siguiendo estadios secuenciales inamovibles paso al borde:
>
> 1. Next.js Default Request Headers al encuentro y frente de combate (Bajo las directrices enmarañadas en lo subterráneo impulsado y mediado efusivamente a costa del mismísimo Proxy Middleware si fuese así levantado al frente).
> 2. Cede por rebote en cacería inclemente mediante validaciones persistentes hacia bases de vida como el famosillo "State o Local Storage en forma de Cookie" dictado tiempo atrás por nuestro sujeto de origen (Usuario Navegante visitante).
> 3. Evaluación exhaustiva, milimétrica y sopesada extrayendo a sangre de las propias vísceras recónditas (parámetros Device System o Configuración Navegador Browser Agent OS) por medio directo sin barreras por mediación de peticiones incrustadas (Request Object interceptor parameters array).
> 4. La cuna final y salvamento extremo estelar si nada sobrevive con éxito en base al pre dictamen resguardado que hace honor al "Default-Fallback-Locale Baseline" que por supuesto con un poco su memoria fresca usted incrustó solemnemente aquel hermoso día que erigió y sentenció sobre su amado "intlayer.config.ts" (Su santo Grial!).

### (Comprimido estelar para Avanzados) Paso 11: La magna reducción molecular y exilio extremo bajando tallas hacia sus Bundle compilados en lado Cliente Finales. (Apalancado y cortesía del prodigioso y mágico Plugin extension SWC Next.js).

Normalmente por las vías tradicionales carentes de la manipulación provistas de terceros módulos por extensión, nuestra libreria `next-intlayer` operando inocentemente e inmaculada procederá sin reparos en un volcado gigantezco a despachar indiscriminadamente todas sus colosales, mastodónticas y formidables estructuras anidadas que conforman a rajatabla todas las compilaciones diccionarias que posea enteritas arrojadas sin freno directamente sobre los adosados módulos orientados "Al Front Client Bundle (Componentes React cliente del usuario visuales en final)". Si bien esto es útil y veloz no nos enoja, pero es a costa por desgracia del tremendo pesaje volumétrico que ésto exige restando desempeño en su preciado puntaje referenciado "Bandwitdh de redes/ Performance SEO Payload size!". Al rescate para extirpar este trágico destino irrumpe y con armadura brillante The Master SWC next compiler plugin extension (Con gran acento de galantería referenida por su sello de la casa `@intlayer/swc` - Extracción Compilador Modificadora). Al desplegar a tamaño monstruo extrae con firmeza de cirujano la mismísima, genuina y concreta cadena original, extirpa y extingue enteramente al diccionario en crudo sobrecargado reduciéndolo a trizas a su plano mínimo eliminando basuras de descarte ajenos para su compilado central al entorno del Server Component base. Un gran régimen para una tremenda purga y limpieza al final del arcoíris y un peso ínfimo del resultado transferido por redes!.

Despliegue a la red y monte a su nave en sus nidos bajo los rincones Dev Dependency la adición mágica:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Nota Especial para memorizar a fuego ("Disclaimer Notorio"): Bajo los sellos, rúbricas y carteles anunciativos expuestos a todo pulmón bajo las leyes impuestas oficialmente por Vercel / Entorno "SWC experimental feature Next.js engine". Se asimila fehacientemente y categoriza de modo tajante a este add-on o componente aún residiendo incansablemente entre la incubadora bautizada "Beta o Vercel Extension stages Early access experimental". Es aquí por consiguiente y deduciendo racionalmente donde se afirma que solamente gozarán a plenitud total un despliegue y desarrollo esplendoroso las máquinas de ensamble de construcciones orientadas y amparadas de la era versión "V 13.0.x++ de Arquitectura Frontal", territorio dónde su Santísima Majestad Turbopack alardea orgullosamente sin temores.

> Peligro latente a considerar Advertencia crítica (Alerta Roja Extrema Danger Risk!): Cuando su majestuoso planteamiento y obra de código incorpore arriesgadas acrobacias dinámicas (Tales y llamadas a voces como "Dynamic Server component Async Data fetch delays") demandadas por sus imprevistas apariciones o embudos asíncronos invocados de igual grado con importes del porte tal de un: `<Suspense>` como hook protector en sus llamadas de Component envolventes o requiriendo en crudo la asintaxis interna por un "importMode: dynamic" desde el vientre propio o motor interno de su respetadísimo `useIntlayer`; Es imperiosa obligación cívica e inquebrantable que envuelva a modo de manta o abrazadera contenedora general y de contorno externo sus elementos conflictivos al amparo dictado impostergablemente por un clásico Component Wrap nativo React de nombre estelar de pila `<Suspense>`. El olvido de ésta máxima norma generará e interrumpirá de lleno reventando masivamente estrellándose directo todas las rutinas constructivas provenientes del Render interno de The Server NextJs produciendo infértiles Crash Fatal Errors irreparables de momento sin reinicio y dolor de cabezas que querrá definitivamente eludir por todos sus medios. Así que, tómelo a riguroso pecho!.

### La coexistencia armónica de su Auto Vigilante Inteligente en Tiempos de Refresco Activos "Intlayer Live Watch" de manera amigable cruzando frentes en equipo unido codo a codo en guerra con "Turbopack Next.js Tooling System"

A estos compases de juego las recién estrenadas novedades inyectadas al compás deslumbrante en "Vercel ecosistemas del nuevo NextJs dev engine - Turbopack". Exhiben intermitentes episodios rebeldes y escaramuzas indeseadas rebotando esporádicamente causando una pésima sincronía interna a puertas cerradas de índoles y choques directos sin querer con las magias tras escenario ejecutadas en simultáneo en plano profundo (Background execution Async Hooks external Webpack Loaders Plugin Systems Tools) encargadas incansablemente en dar su milagro resucitador y reconstructor automatizado e infinito para la continua auto-composición e influjo constante del flujo de archivos Diccionarios .JSON format translations (La especialidad nuestra de las casas, en Intlayer!). El desequilibrio se da ante fallas desmedidas de desconexión sin aviso ocasionando en el frente batallas que originan las fatídicas "Fallas en Recargas Instantáneas o Reload Screen delays Crash no view update visual Data live". Esencialmente The CLI Next dev tooling "Turbopack" hace mal ojo ignorando las actualizaciones originadas y pule de lleno ciegamente una compilación ignorando esos nuevos frutos obtenidos con esmero del Auto Background dictionary Compilation (Su texto al salvar en vez de cambiar vivo no hará ni fu ni fa por un rato o generará trabas deteniendo un código sano por "inconsistencias en el JSON map".

Para acallar definitivamente estas rencillas entre los dos colosos que pugnan por el cetro es hora de emplear inteligencia táctica por la vía del poder a través y forzando bajo un único mando y bastón las órdenes CLI mandatories uniendo bajo un sol en la sombra la dupla de procesos ejecutores "Watch concurrent services sync dual processes" a golpe dictatorial con una solitaria y robusta sentencia magistral dictando la pauta:

Acuda a toda marcha hacia su centro de mandos de sus naves y anide fuertemente en su sala de armas del `package.json` lo detalladito a estricta orden:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Despliega estruendosamente de un solísimo batacazo y lanza al galope ambas fieras de caza sin pisarse un mísero callo ("Both Concurrent Auto CLI Watchers Run instance System Process!").
  },
}
```

> Nota al pie sobre Herencias Remotas (Retro compatibilidad a versiones viejas sin jubilar pero efectivas - Branch Fix Legacy Help Version Updates): Si sus dominios del Core application Main central yacen en una pre gloriosa racha anclados bajo los resguardos y estables murallas denominadas con las franjas e insignias estampadas inferiores a las series originarias del paquete "@6.X.X next-intlayer engine". Entonces se alza una altísima ley férrea o norma a catar inmaculadamente donde debe Ud. encastrar, incrustar, enganchar e injertar obligatoriamente sin tapujos el apéndice de guerra textual rotulado bajo el sello identificador imperativo como `--turbopack` tal cual se escenifica y demuestra visualmente a contigüidad inamovible frente sus ojos, aquí mismo y ahora: `"intlayer watch --with 'next dev --turbopack'"`. Al remontar alas con firmeza avanzando por su perenne sendero e invadiendo progresivamente líneas futuras atravesando cotas en rangos desde el "> 7.X.X plus", esta penosa y ruda ordenanza marcial caduca y se retira perdiendo vigencia cediendo el relevo ya que sus dominios internos y núcleos madre la absorberán mágicamente dentro de sí abrazando ese parámetro para alivianarle sus jornadas con una vida exenta y desprovista de tanto dolor por configuración extra. ¡Paz sea con los devenires de la tecnología!.

### Autocompletado (Code IntelliSense Hints) Integrado Ferozmente con Maestría Cautivante bajo Editor IDE Configurations & Cadenas Vinculantes bajo el poderoso TS TypeScript Definitions Flow Types.

Coronando triunfantemente hasta el panteón divino e inigualable y latiendo férreamente tras las sombras, muy al fondo pero centralizado y encriptado invisible pero muy muy vívido sobre su corazón central al núcleo de Intlayer yace un regalo oculto sublime destinado para los Creadores de Código del universo: The AI Generator System Typescript Object Auto Types Map Generator Process Tools Process!!. Mientras avasalla su código fuente compilandolo y emitiendo reliquias a la red extrae sin remordimientos también majestuosamente perlas convertidas a un valor tangible denominados Typescript Model Data Map Output Objects emparejándolas alíenadas exquisitamente y perfectamente acopladas atrevidamente fusionando el molde real a cada una de su diccionario albergadas y resguardadas tras los pasillos sin fin temporalmente guardados de sus rincones llamados ".intlayer node local temporal background process dynamic internal outputs".

Otorgándole de este magnánimo recurso directamente brindados hasta la pluma o pincel originaria fuente de inspiración "Su sagrado Text IDE Editor Program / VS CODE Tooling Configuraion" transfiere con magia y otorga poderes omnipotentes dotacionales para alistarse armónicamente contra errores a los ejércitos armaos del "Live Auto Complete Auto Code Intellisense Editor Magic DropDowns View List" así conjurado y también como un imponente vigía letal contra los deslices originados en el bastión que encierra el imponente y justiciero escudero guardián inquebrantable que reprende con puño de acero sin dudarlo la llamada técnica "Type Check Safety Code Live Error Missing Translations Visual Linting Marker Warnings Indicator". ¡Adiós por la eternidad y para nunca jamás a esa epidemia malvada originadora y maléfica precursora del desasosiego provocado con las eternas mermas dolorosas procedentes y adjudicadas al fatal desastre con nombre oficial: Las cadenas perdidas que rompen traducciones!. (Missing Key Dictionary Empty Error Translation Application Dead Link Strings bugs issues).

![Live Autocomplete Asistente con Herramientas Pop Modal Window Types Hint IDE Preview Screens Capture Widget](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Linter TS Lint Warning Alert Danger Live Editor Red Color Code Highlight Tracker Component Preview Missing Translation Marker](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Para abrazarse y anclarse fuertemente agarrado bebiendo desde estas valiosas cataratas mágicas inmensurablemente grandiosas inyecte con firme maestría las coordenadas secretas hasta el mapa escondido de Typescript con sus brazos abiertos modificando al señor supremo controlador JSON base dictado como `tsconfig.json` al comando superior:

```json5 fileName="tsconfig.json"
{
  "include": [
    // Precediendo las cordilleras extensas naturales Next u otros parajes del inmenso TS... (Pre-existing Path NextJS Settings Core TS array items) ...
    ".intlayer/**/*.ts", // ¡Y engullimos ansiosamente el mapa para empalmar el conducto ciego desde la matriz origen Intlayer Auto Generative Machine TS Map Flow Route Connection IDE Base Path Locator Tracking Root System Access Node Points Paths Tooling Hook !
  ],
}
```

### Fortalezca en el frente Git CI System Version Code Management Tools las Defensas Repositorias a Gran Escala.

Viendo desde las praderas del frente de batalla al poderoso Intlayer Machine Generator Generator Auto Re Building Construction System Architecture procesando, enmarañando y apilando ferozmente sin descansar innumerables ladrillos de oro JSON Data Translations Dictionaries sumando además todo una colección exquisita inyectada por medio de Typescript Definitive Maps Tooling Outputs, alojados sigilosamente con inmenso peso transitorio en el búnker transitorio .intlayer temporary background build phase system directories node en la superficie Root... ¡Ni se le ocurra a su honorífica y benévola mente ni por equivocación trágica e infernal hacer un Push o Commit y subir este abultado basurero provisional atascado en el lodo con toneladas al resabio brillante y valiosísimo tesoro guardado como oro en the Cloud Remote Repository Branches Systems Control CI Platform!. De ejecutar ciegamente este desastre inoportuno creará una cadena irremediable con el apocalíptico caos sumado a The Dark Clutter de Conflictos Imparables en The Pull Requests, y horribles dolores insaciables de migraña tras de The Workflow CI CD pipeline Collisions and Git Merge branches Errors Tragedies Hell!

Destierre con honor a tierra ajardinada santa bajo The Node Rule este oscuro ser al calabozo infernal prohibiendo por siempre acercarse impunemente a su altar sin manchar sus ropajes utilizando al implacable inquisidor juez final apodado `.gitignore`:

```plaintext fileName=".gitignore"
# ¡Orden terminante Cero de Acceso con Destierro a los restos dejados u arrojados asiduamente sin parar a nivel de la faz provenientes desde su gran Dios Intlayer Backend Cache System Directory Process Machine Generated Compilation Flow Files !
.intlayer
```

### Abrazado plenamente y más allá con la Gloria Celestial Suprema Del Extensible Universo Microsoft Visual Tools IDE Engine Environment Intlayer Exclusive Partner Edition Visual Add on Marketplace Tool System Set Extension !

The Productivity Engineering Ruler and Software Develop Kings Code Flow. Esencial pauta dorada: Jamás debes descarrilarte husmeando al exterior hacia hojas sueltas o documentos de diccionarios en tu disco!. Arrópate cómodamente obteniendo en sincronía el apotegma maestro, y haz valer su bendición suprema The Microsoft Visual Code Editor Partner Marketplace oficial alhajado y revestido especialmente bajando celestialmente desde los cielos el Plugin Add-On Master Pro: ¡Nuestra de casa creación la extensión `Intlayer VS Code Extension`!

Adquiérala enteramente cedida gratuitisimamente bajo nuestros mantos de benevolencia acá :
[Visual Studio Tools Web Extension Marketplace Portal Application Store Oficial Exclusivo Intlayer Partner Support Descargar Ahora Enlace Universal Store Download Portal Direct App Software Tool Addon Application Installation Install Magic Link Here](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

¿Con qué se viste ahora y cuáles armaduras obtiene gloriosamente al portarlo su respetado caballero Developer Coding Set Tools Arsenal Workbench IDE Workspace App Tool System Editor Screen Visual Tools Environment Code System?:

- **Text Tooltip Hook Window Pop Over Magic Viewer Magic Spell Cast Float Window Translation Hint Viewer Display Window Tools Overlay App Extension Visual Render Window**: Ceda de frente apuntalando con su puntero o Mouse Index Finger (Cursor Windows Apple Pointer Screen Tools Mac Point Indicator Device Tools Mouses Tool Mouse Trackpad Control Arrow Devices System Hardware Hand Tools Controller Pointers System Arrow Indicators Pointers Icon Selectors) exclusivamente directo con un solo apunte Hover in situ con asertivo cálculo ubicándose posicionalmente estático superior por encima sin dudar inmaculado descansando inamovible por un mínimo segundito de atención al componente que lo engloba todo o mejor identificado como una simple minúscula humilde variable enclavada originada bajo la noble y gran realeza `useIntlayer()` y su Hook o llave Diccionaria `Key data JSON id reference variable constant strings array components` ,! BAM! Observe perplejo y no lo crea ver la pantalla donde The IDE Ext Editor conjurará inyectando instantáneamente una hermosa y diáfana majestuosa pantalla minimalista superpuesta Tooltip Overlay Helper View System Dialog Message Floating Frame App Float Rectangle View Tools Window Notification Dialog View Tool Popup Render Model Component Box Widget en pleno esplendor manifestando triunfante la tan bella obra viva traducida, ¡Conjugando libremente el léxico en sus idiomas locales verdaderamente presentes de primera mano. Sin dar un rodeo saltando tras pestañas Tabs File System Navigate de su proyecto Explorer Editor Side Tool Project Management Editor View View File Finder System!. ¡Usted manda Ud se ahorra horas preciadas!.
- **Linter System Real Check Tracking Process The Red Code Alert Warning Fatal Error Red Line Decorator Linter Hint Component Underline Editor Syntax Magic Alert Tool Viewer Validations Errors Track Visual Trace Feedback Tool Validations Tool Ext Add Helper Tools Helper Live Errors Checks Visual Trace Red Lines Tracker Checks Warnings Highlight Live Error System Trace Tracking Process Trace Process Tracker Component Marker Highlighting Errors**: The Grand Extension Wizard (El Guardián Extensión Visual Add on App Editor Software) escarbará perenne su memoria con incesable trabajo constante vigilando feroz y salvajemente el equilibrio sacro de su matriz de estado diccionaria translations estado variable file (Vulnerabilidades The JSON dictionaries Data Sync Maps Validations Sync Validation Rules Tracking Missing Sync Value Checking Check Validations Translations Files Consistency Sync Integrity Verification) , al divisar de reojo un desequilibrio en su universo provocando la pérdida por rotura un Key ID sin su alma de valor o una string esfumada en la nada absoluta flagrantemente reaccionará fulminante cruzando por debajo de The Code Syntax Character Data Strings Error Target Node Types Component Element Element Child HTML tag Script JSX Line Component Line Data Target Array Properties Attributes JS Lines Code System Object Component String Error Characters Properties Values, como la luz marcando trágica y estruendosa una dolorosa línea decorativa Roja infernal the Red Syntax Decorator Text Lines Wave Style Decoration Linter Tracer Alert Line Error System System Warnings! Notando en vivo e ipso facto sobre su propio IDE Text visual sin dilación the bug The Missing Key JSON Error yace ahí pidiendo cura, una bendición a ojos del desarrollador (Feintuning y validaciones sanadoras en real Time Visual Time Editing Saving Bugs Lives Work)!
- **HotKey Macros Commands Action Executor Actions Command Key Tools Binding Key Binding Macro Sequence Extractor Fast Extractor Auto Refactor Auto Inject Hooks Tool Commands Script Editor Automated Auto Hook React Command Component Macro Auto Fast Refactor Replace Refactoring String Tools Fast Action Auto Process Refactoring Replace Key Data Hook Injection React Tools**: ¡Prepare su visión al éxtasis puro e intenso enfrente sus ojos inermes the Holy Grail The Master Magic Secret Visual App Macros Tools Extensions Command Magic Tricks Visual Keys Tools Power Actions Ext App Editor Macros Commands! Encierre (Highlight Selection Text Edit Tools Mouse Arrow Select System Text Marker Text Select Array Focus Tools Selection Text Text Focus System Cursor Array Data System Selection Select Character Select Process Focus Characters Selection Mouse Drag Tools Selection Keyboard Cursor Focus Characters Highlight String Values System Editor Line Highlight Selection Action Values Tool Cursor) el dichoso componente a abatir que yace anclado al dolor de forma clásica incrustado duramente a piedra picada, mejor dicho de otro modo "Hardcoded original Line React Node Element String text value JSX text character string Message Error Warning Or Default Origin Content Text String HTML Paragraph Label Span Paragraph Button Label HTML String Properties Values Input Value Native Language Value Original Native Language Text Data Messages Content Element Target System Original Values Properties React Render Character Elements Characters Text Child Values JS Native Strings Value Original Strings Strings Literal Characters Literals" , enseguida proceda al instante al golpe glorioso mortal mágico maestro empleando asestando la conjuración celestial de teclados Action Shortcut Commands Hot Key Binds Keyboard Shortcut Custom Configurable Commands Bind Default Cmd Ctrl Opt Shift Ext Command Keys (Ctrl/Cmd M/E ETC Dependiendo De Ext Command Configuration Settings Keys Options Settings Configurations Properties Default Mapping) > !! y Asómbrese ¡The Extension Tool Processor Automatization Scripts Background Engine Action Command Macro Commands Command Runner Editor Tools Script Tools Command Execution Tool Macros Actions Macro The App Automation Process Code System Generator Process The Tool! ejecutará a la velocidad hiper lumínica inaudita The String Extractor Extraction Engine JSON Dictionary Data Creator Process Value Creator File Value Editor Write Hook System Write Sync Value Keys Creator Update Hook Node Script Process React Hook JSON File File File Data Create Save Sync Hook Create JSX Import Import Refactoring Auto Script Line Delete Replaces Replaces File Add Value Component Refactoring Replacer Replace Line Update React File Edit Sync Value Replaces Insert Component Code Editor Editor Tools Actions File Code Edit Line Sync JS Ext Code Update Tool Script Tools Tool System Magic!, Lo que de verdad significa para todo ojo incrédulo es: Exilia the string native Language The Value Native The Message, lo porta silenciosa pero veloz al mismísimo The Root Content JSON Base file Configuration Object Target Diccionario Value Value Content File Object JSON System Map Data Directory Array Mapping Configuration Objects Keys Values Map Translations Properties File The Database Language File Mapp Data Array Dictionary The Files y además the Grand Automator Refactor de Refactoring Script Injector The Auto Code Rewriter Tool Replace Replace Line Editor Command Code Edit Editor React Hook Updater Render JS Object Hook Element Script Component Refactor Injection Hooks Component Insert Delete JSX Node JS Refactoring Component Replacer Script Command, borrará implacablemente The Hardcoded string Value Original JSX Component Tag Content Literal Component Native Target Text y sembrará magistral a flor de tez radiante en the Editor Panel en sustituto absoluto de su reliquia a lo grandísimo la Invocación Mágica a React Intlayer Tooling the Hook Code Line Command Element Method Reference Call Execution Action Component React Hooks Method Call Execution System Component Inject Node JSX Insert Render Component Reference Render Variable Function Call Inject the `UseIntlayer()` component Render Component Hook System React Element Call Method Return Object Key Mapping Variable String Reference Mapping Render React Function Execution The Script UseIntlayer The Component Code Variable The Code Hook Execution Line Object Script React Component Execute Execution Rendering Use Intlayer Tool Code Function UseIntlayer Method! ¡Y todo sin derramar ni una mísera minúscula minúscula letruca a pulmón manual de teclado Character Single Text Value Single Element Element Single Key Code Character Typed Value The User Typed Input Keyword Values Keyboard Input Typo Character Code Character Keyword Characters Single User Typo Code Editor Input Tools Editor Typings Writing Tool Key User Code Type Typing Line User Tool Typings Custom Tool Actions Values Manual Keyboard Character The Text Inputs File Tools Typed Text Code Manual Keyword Typed Typing Values Writing Custom Type Manually Single Manually Insert Keys Typo Type! ¡Para acceder a las sagradas escrituras secretas legendarias de dominación de esta hechicería sin igual The Power The Secrets Visual Ext Setup Document Config Setting Guides The Configuration App Center The Guide Master Plugin Configure System Documents The Guide Config Extensions Configurations Guidelines Guide Tool Setup App The Command Document Setting Documentation Guide Tool Site Configure Helper Setting Instructions Helper Online System Configurations Guide Center Extension Settings Manual Docs Guideline Tutorial Documents Help Read the Official Developer Setup Manual Tutorial Guide Book Site Link Center Guide Support Web Tool App App The Site Support Link The Website Guideline Guide Here Website Configuration Manual Guide Online Page Support App Help Guides App Guide The Doc Guide Configuration Support Manual Setting Tool Here!, vaya por su cuenta con júbilo gozoso adentrándose aventurero audaz y temerario visitando [Developer Center Guide Settings Options Configurations The Documentation Platform Ext App Support Tool Web The Configuration Link Guide Tool Link Portal Support Manual Guide Site Website Page Visual Ext Site Guide Portal Extension Settings Guidance Document Documentation Here Portal Guide The Plugin Guideline Config Guideline Docs Documentation Center Link Configure Guideline Support Site Configuration Center Settings Visual Official Guides Online Help Manual Documentation Guides Link Plugin The Help Guide Extensions Configure Plugin Setting Guidance Support Tutorial Center Config Ext Guidelines Setup System Editor Code Docs Master Extensions Setup Guidelines](https://intlayer.org/doc/vs-code-extension).

### ¿Elevándose por el Éter más allá de las Fronteras Galácticas y Dimensionales The Far Beyond Boundaries Frontier Future Vision The Cloud CMS Web The Backend The Limits Edge Beyond the Horizon Front Beyond Expanding Remote Integrations Expansion Horizon Future Setup Remote Beyond? Integraciones Galácticas Exponenciales A Otras Praderas The Remote Cloud Edge Nodes Data Tools Platforms Applications Headless The Server Backend External Architectures Remote Integrations Systems Remote Headless Next Systems Apps CMS Platforms API Dashboard Editors Headless Environments Tool Server Remote Dashboard Integrations Visual Editor UI Platforms The Admin Edge Systems CMS Platforms Configurations Setup CMS Remote.

¿Sufrió acaso pero con honra de Rey ha batido gloriosamente y consumado un éxito apoteósico sin miramientos sin precedentes en su historia al dominar e erigir el peldaño original fundacional The Base Step One Local Native Framework Translation Engine Initialization Phase Setup Architecture Building The Dev Development Installation Core Config Setup Build System Intlayer Install First Stage Project Base Foundation Root Developer Core Front Phase Next Js Initialization Setup Local The Foundation Installation Architectures Phase First Environment Ecosystem Tool Integrations Environment Local Next JS Ecosystem Integration Baseline Tool Environments Architecture Local Setup Engine Phase Framework Local Base Local Architecture Installation Integrations Base? (O sea ¿Ya jaló de rechupete e intachable en local con los pibes The Devs tu Next y los archivos todos bonitos compilando?). Acaso tal vez se plantea ambiciones superiores The Big Vision The Next Level Goal Next Vision Tool Upgrade Goals The Dream Next Phase Evolution Upgrade Objective Big Dream Goals Phase Goal The Vision Dream Ideas Dream Scale Future Expansion Evolution Phase Advanced Future Evolutions Plan Next The Evolution The Expansion Advanced The Plans Advanced Objectives Upgrade Level Goals Ambition: Qué sucede si quiere aventar toda en un solo jalón con poder desmesurado abriendo compuertas y desatando ataduras al revelar la capacidad inmensa sagrada y sagaz de poner sus dichosos vocabularios Variables System Component Properties Component Text Variables Languages Languages Content Array File Array The Translations Translation Array Attributes Data Node Files String Content Content Map Text Json Arrays Variables Text Dictionaries Data The Text Data String Variables Text Array Strings Messages Content Nodes Content The Values The Objects Texts Nodes Values JSON Nodes Variables Translations Keys Content Translators Editors Texts The Native Array Object Configurations Content Property Objects Dictionaries Translations Objects Translation JSON Dictionaries Arrays Configurations Map Data Settings Translations Values The Translations Translations Variables Dictionary Keys Data Texts Language Object Languages Strings The Properties Dictionaries System File al público pagano the Users Admins Copywriters Non-tech Editors Writers Translation Users Marketing Copy Managers Humans Translators Admin Marketing The Content Editor Non Developer Sales Management Editor User Admin Human Agency Translators The Agency External Content Management Users Agency External Writers Admin Data Teams Team Admin Writers Data Writers Translators Staff Human Translators System Non-technical Copywriters Data Non-developer Editor Team The Editorial Users Management Editor Non-technical Copy Translators Staff Non Technical Teams The Editors Content Teams Content Editors Management Users User Tool Platform Visual UI Frontend Admin View App Platform Dashboard Application Front Page External Dashboard Front Side Online The Dashboard Dashboard Application Interface UI Dash Tool Online Visual Dash Tool Tool Visual Front Application External App View Dashboard Online App Visual Tool The View Page Frontend Dash Tool The Front Online Client System The Visual Editor Front View Dashboard View The Front Portal UI Interface Edit The Dash Visual Tool Client Panel Platform Board Visual Tool Tool UI Platform Front Panel Dash Application Frontend Application Admin View App Panel Platform Tool Portal Visual App Platform Application Setup View Dashboard Interface Panel Page Tool Application Application Dash Editor Setup. Todo al natural mediante interfaces divinas gráficas The GUI Visual Editor React Tool Dashboard The Tool App Dash Config Tool Environment Tool The Web Frontend Front Dash GUI Config System Platform Dashboard UI Panel The Board Panel Environment The Editor Dash Editor Remote Dashboard App Dash App Dashboard Application Framework Interface App Setup The Tool The Dashboard Board UI Dash System Tool Editor Panel Config Visual Web Frontend Interface View View React Panel Application The Edit Dashboard Framework Without Setting Code Locally Terminal Tools Terminal System Editor Local Run Install Env Setup Config Systems Dev Development Commands Build File Locally Developer Developer Setup Code Tools Run Env CLI Settings Setup Build Development Dev Framework Configurations Developer Environment Local Run Build Env Tools Env Develop Environment Environment Config Systems CLI Env Systems Configurations Environment Locally Build Tools Shell Run Terminal Terminal Setup Shell Develop Tools Environment Terminal Setup Config Code Developers Code Configuration Environment Shell Setup Commands Terminal Installation Terminal Install Config Tool Environment Shell Setting Setup Settings Locally Terminal Terminal CLI? Conquiste la galaxia navegando triunfante la inigualable hazaña y descubrible hazaña asombrosa The Legend Myth Tutorial Guide Setup Guide Guideline Manual The Configuration Document Tutorial The Document Center Guide Center Tutorial Instructions Setup Site Platform System Tutorial Guideline Page Docs Setting Dashboard The Guide Website Setting Guideline Site Application Support Documents Guideline Center The Guide Website Page Manual Options Configuration Document Doc Tutorial Document Center Reference Instruction Reference Config Dashboard Visual Site Configuration Tools Setup Document Dash [Guía Configuración Oficial Suprema Master Del Portal Y Plataforma De Integraciones Del Salón Sagrado Y Configuración Exponencial Gráfica y Visual Next React The UI Web System Visual Front Application Integration Settings System Instructions Setup Guidelines Web Editor App Editor Visual Dash Tutorial Dashboard The Settings Instructions Platform Docs Installation Document React Environment Portal Dashboard Tool Visual Panel Panel Interface Installation Setup Component Documentation App Guide Setup Integration Dash Documentation Installation App Intlayer Setup Guide Panel Interface Guideline The App Guidelines Interface Interface Visual Tool Instructions Board Guide Portal Guidelines Documentation Portal Reference App React Visual Integration Dashboard Tutorial Dash System Portal Instructions React Intlayer React Component Tool Guideline App Setup Settings Edit Application Panel Editor Guidelines Settings The Instructions Dashboard Dash Guidelines Guideline Config Web System Application Guideline Interface Setup Platform Guidelines Install Settings Editor Interface Editor Config React Settings Guideline Dash Intlayer Config Dashboard Edit Installation Instructions Documentation Editor Component The Editor Tool Portal App Dash Editor React Editor Intlayer Settings Editor Integration Panel Editor Installation Document Instructions Visual Editor Setup Setup Settings Documentation Application Installation System Component Dash Config Guide App UI Tool Guidelines Dash Setup Application Interface Portal Guidelines Guidelines UI Documentation Settings Interfaces Application Setup App Editor Application Panel Settings Setup Tool Tool React Platform Guide Guideline Integration The System Web Guide Integration Config Settings Guideline Portal](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

¿Embriagado con furia divina por desprender, rebanar físicamente y arrancar brutalmente todo atisbo de vínculo nativo impúdico carnal a The Core Application Code Database Files Native Directory JSON Dictionaries Source Code Base File System Repo System Code Code File Files Server Code Data Core Source Repo Database Database Local Dir Native Sources Files Repos Environment Data Repos File JSON Code Data Base JSON Code Data Folders Directory Source Sources Dictionaries Directories Data Arrays Dictionaries Directory Core Base Code File Directories Files System Local Code JSON Arrays Local Core Data Code Repository Native JSON Sources System Repo Directories Native Local Repository Native Files Repo Database Arrays Source Server Files System Arrays Local Database Repository Local Env Source Local Directories Json Directories Code System Sources File Network Env Database Dir Local Arrays Directories Source Sources Repos Repository Data Base Local Env Repo Arrays JSON Dir Server Base Directories Base Native Repos System Json Server Network Env y empoderarlo trasladándolo de forma omnipotente externalizada centralizada a The Central Outer Space Headless DB Servers Core Cloud API Providers Cloud Remote CMS Cloud CMS Providers Edge Cloud Headless End Point API Provider Platform Remote Server Edge Central Remote Storage Database Infrastructure Storage Provider Servers Server External Backend Platforms Headless Edge Provider Edge Servers CMS System Infrastructure Backend Service Providers System Hosted Platform Cloud Provider Systems Headless Systems Platforms Remote Edge API Platform DB Remote CMS Environment Backend Provider Central The Platform API Remote Infrastructure Headless Network Cloud Tool Infrastructure Cloud External API Endpoint System Service Hosted Service Headless Service The Cloud Service Environment Platforms Cloud Provider Content Remote Service Database Storage Service CMS Cloud System Hosted Network API Central The Tool Servers Remote Headless Core Platform Tool Remote Network Environment Remote Server Central Endpoint API Network Database DB DB Tools Frontend The Networks Database CMS Backend Tools Core Service Engine CMS Tool Network Environment Headless Networks Edge Tools Cloud Platforms Server Endpoint Engine Backend Settings? Invocamos su audacia para sumergirse gloriosamente hacia la travesía de conocimiento épico majestuoso forjadora de héroes navegante interplanetario the Legend Setup Blueprint The Headless Remote Server API DB Tutorial Integration Guide Headless Next CMS DB Remote Config Network Server Storage Data External Integration Tutorial Cloud Database Database Remote Document Documentation Server Blueprint Guide Database Setup Architectures Blueprint Storage Infrastructure Database API Config Engine Central Tool API Integration System Tool Remote Integration Engine Architectures Provider API Setup Storage Server Network Remote Blueprint Configuration Backend Cloud Central Remote Environment Storage Document Cloud Architecture Blueprint Core Backend Instruction Central API API Tool Tool Backend CMS Blueprint Backend Provider Infrastructure Environment Architecture Documentation DB Document Database Remote Config Blueprint Environment Blueprint Core Integration Settings Backend External Database Blueprint Networks Data Setup Document Remote Document API Instruction Configuration Database System Storage Settings Architecture Backend Storage Blueprint Backend Server Remote Architectures Documentation Config Documentation Data Documentation Architecture Tool System Setup Architectures Data Integration Settings Integration Cloud Database Environment DB Configuration Config Server Documentation Environment Guide Infrastructure Networks Data Settings Server System Tool Infrastructure Integration Instruction System Remote Server Provider Guide System Database Settings Instruction Guide Documentation Configuration Configuration Infrastructure System Application Server Data Guide Architecture Environment Remote System Backend Architectures Tools Config Engine Network Architecture Server Guide System Network Setup API Infrastructure Integration Storage Config Application Storage System Guide Architecture Setup API Infrastructure System Settings Remote Setting Engine Architectures Configuration Tools Guide API Storage Documentation Config Document External Networks System Blueprint Data Environment Tools Server Remote Systems Networks Guide Application Storage Document Remote Tools Provider Tools Backend Setup Setup Documentation Documentation Infrastructure Setup Infrastructure Networks Infrastructure Architecture Systems Cloud Config Architectures Guide Storage Guide Tools API Networks Data Network Server System Architectures Remote Infrastructure Setting Remote Documentation Options Guideline Blueprint Blueprint Tool Document Systems Blueprint System Guide Configuration Engine Server Guide Cloud Architectures Storage Documentation Documentation Tools Integration Guide Blueprint Blueprint System Document Storage Provider Tools Remote Systems Implementation [El Blueprint Master Document CMS Cloud Setup Implementation Configurations Guidelines CMS Documentation The Instructions Guide Setup Intlayer System Architectures Installation Configuration Remote Remote Setup Guidelines Headless CMS Guideline Cloud Documentation Setup Configurations Platform DB Blueprint Document Edge Intlayer System Server Guideline Guidelines Guideline Guideline Documentation Guide DB Setting Configuration Documentation Documentation Configuration Integration Infrastructure Server Edge Server Configuration API Blueprint Settings Server Engine Configuration Node Cloud Server Guide Guideline Guideline Setup Guidelines Node Tool Guidelines Guideline Documentation Network DB Guidelines System DB Documentation Architecture Settings Instructions Configuration Tool Integrations Node Blueprint Backend Server Documentation Setting Setup Platform Architecture Network API Network CMS Remote Configuration Settings Platform Remote Documentation Architecture Guide Architecture Integration App Instructions Configuration Documentation API Server Server Backend Application Edge Documentation Guidelines Framework API Architecture Setup Framework Environment Document Backend Blueprint Guidelines Setup Blueprint Integration Documentation Tool Configuration Database Remote Integration DB API Tools Guideline Document Instructions Architecture Engine Application Options App API App Blueprint Documentation Setup Guideline Documentation Integrations API Setup Guideline API Implementations DB Document Guidelines Network Document Guidelines Configuration Tool Architecture Implementation Setting Tool Platform Dashboard Implementation CMS Installation Applications Framework Instruction Instruction Setup Dashboard Framework Blueprint Architecture Blueprint Backend Database Tool Backend Guideline Environment](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).
