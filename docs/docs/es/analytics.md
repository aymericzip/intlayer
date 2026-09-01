---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Seguimiento de la exposición del contenido y pruebas A/B
description: Descubre cómo @intlayer/analytics rastrea las vistas de páginas/configuraciones regionales y la exposición del contenido, y cómo usarlo para ejecutar pruebas A/B en tu contenido de Intlayer.
keywords:
  - Analítica
  - Pruebas A/B
  - Audiencia
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Habilitar las analíticas de forma predeterminada cuando `@intlayer/analytics` está instalado"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — paquete @intlayer/analytics, seguimiento a nivel de proveedor/nodo, pruebas A/B, panel de control"
author: aymericzip
---

# Documentación de Intlayer Analytics

`@intlayer/analytics` es un paquete complementario opcional que te indica **qué contenido se muestra realmente** a tus visitantes — qué página, en qué configuración regional (locale) y qué fragmento específico de contenido traducido — para que puedas entender a tu audiencia y ejecutar **pruebas A/B en el contenido**.

## Tabla de Contenidos

<TOC/>

---

## Qué rastrea

`@intlayer/analytics` agrupa tres tipos de eventos anónimos:

| Evento             | Dónde se captura                           | Qué te indica                                                                                                                 |
| ------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Nivel de proveedor (`IntlayerProvider`)    | Qué página y locale vio una sesión, en la carga inicial, cambio de ruta o cambio de locale.                                   |
| `content_exposure` | Nivel de nodo (`useIntlayer` / plugins)    | Qué clave de diccionario / ruta de clave se resolvió y mostró realmente — y, si es parte de un experimento, qué **variante**. |
| `conversion`       | Dondequiera que llames a `useConversion()` | Un objetivo alcanzado (registro, clic, compra...) atribuido a la variante A/B a la que se expuso la sesión.                   |

Los eventos se recopilan en memoria y se envían como una **sola solicitud por lotes aproximadamente cada 20 segundos** — nunca en cada pulsación de tecla o renderizado — por lo que la analítica nunca afecta el tiempo de primer renderizado ni añade una solicitud por cada interacción.

## Cómo impulsa las pruebas A/B en el contenido

Intlayer ya te permite declarar [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) de contenido (por ejemplo, un diccionario `hero-banner` con una variante `control` y una `black_friday`). `@intlayer/analytics` cierra el ciclo:

1. `getVariant(experimentKey, variants)` asigna de manera determinista cada sesión anónima a una variante — una función pura del id de sesión y la clave del experimento, por lo que la asignación es **estable durante toda la sesión** y no requiere **ida y vuelta al servidor** antes del primer renderizado (sin parpadeos, sin cambios de diseño).
2. Cada evento de `content_exposure` lleva la `variant` que se mostró.
3. `useConversion()` te permite atribuir un objetivo (por ejemplo, `"cta_click"`) a esa variante.
4. El endpoint de resultados de experimentos del panel de control compara las tasas de conversión por variante, incluyendo la significancia estadística (una prueba z).

## Instalación

`@intlayer/analytics` es una **dependencia opcional** de todos los paquetes de framework (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), por lo que la mayoría de los proyectos ya la tienen. Instálala explícitamente si tu configuración omite las dependencias opcionales (`npm install --no-optional`, …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Instalar el paquete es todo lo que hace falta para activar las analíticas: `analytics.enabled` es `true` de forma predeterminada, y `@intlayer/config` lo resuelve a `false` cuando no encuentra el paquete en tu proyecto. Si no lo instalas, todos los puntos de integración se resuelven como una operación nula (no-op) — consulta [Costo cero cuando no está instalado](#costo-cero-cuando-no-esta-instalado) a continuación.

## Configuración

Las analíticas no necesitan configuración para empezar: están **habilitadas de forma predeterminada** y **reutilizan el bloque de configuración `editor` existente** para su endpoint y su clave de proyecto.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // También usado como endpoint de ingesta de analíticas
    clientId: "your-client-id", // También usado como clave de proyecto de analíticas
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — la URL base a la que se envían los eventos de analíticas (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — la clave pública del proyecto atribuida a cada evento ingerido. También actúa como el **interruptor de encendido**: las analíticas permanecen totalmente desactivadas (y eliminadas del código final) hasta que se configura el `clientId`.

Si autoalojas Intlayer, las analíticas apuntan automáticamente a tu propia instancia, ya que comparte `editor.backendURL`.

### Llamar a la API desde el navegador

El mismo token respalda un pequeño cliente sin credenciales, de modo que un sitio estático o una SPA puede leer su contenido del CMS en tiempo de ejecución sin servidor, sin acción de servidor y sin ningún secreto en el bundle:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

Se autentica a partir de `editor.clientId`: el intercambio, el almacenamiento en caché y la renovación se gestionan internamente. Los alcances (scopes) limitan lo que puede alcanzar: contenido de diccionario publicado e ingesta de analíticas. Cualquier otra cosa (subir diccionarios, leer un proyecto, gastar créditos de IA) necesita una credencial real y, por lo tanto, un servidor o un usuario autenticado.

### Cómo desactivarlas

El bloque opcional `analytics` ajusta —o desactiva— la recopilación:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Predeterminado: true — excluye toda la integración del bundle
    flushInterval: 20_000, // Milisegundos entre dos envíos por lotes
    sampleRate: 1, // Fracción de sesiones a registrar, de 0 (ninguna) a 1 (todas)
  },
};

export default config;
```

Desinstalar `@intlayer/analytics` tiene el mismo efecto que `enabled: false`. Consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md) para ver la lista completa de campos.

## Uso

### Seguimiento automático a nivel de proveedor

No se requieren cambios en el código. Una vez que `@intlayer/analytics` está instalado y `editor.clientId` está configurado, `IntlayerProvider` automáticamente:

- inicializa el cliente de analíticas al montarse,
- registra un `page_view` en la carga inicial,
- registra un `page_view` en cada cambio de locale,
- inicia el ciclo de vaciado (flush) de ~20s y envía cualquier evento restante al desmontar / cerrar pestaña (vía `navigator.sendBeacon`, con respaldo a `fetch(..., { keepalive: true })`).

El punto de entrada difiere según el framework, pero en todos los casos es el mismo que ya usas para configurar Intlayer, así que no hay nada más que añadir:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` monta internamente el proveedor de analíticas.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` reexporta el `IntlayerProvider` de React, por lo que las analíticas se conectan de la misma manera.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    El plugin `intlayer` registra los hooks de analíticas en el ciclo de vida del componente raíz.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > Con Nuxt, `nuxt-intlayer` instala el plugin por ti: no hay nada que hacer.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` inicia las analíticas desde el componente que configura Intlayer.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` monta internamente el proveedor de analíticas.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` monta el proveedor de analíticas de forma diferida (lazy), de modo que el chunk queda fuera de la ruta crítica.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` ya incluye `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Usa `provideIntlayerAnalytics()` por separado solo si gestionas los proveedores de forma individual.

  </Tab>
</Tabs>

### Seguimiento automático a nivel de nodo

Cada vez que `useIntlayer` resuelve un fragmento de contenido para mostrar, el intérprete reporta un evento de `content_exposure` para esa exacta `dictionaryKey` + ruta de clave + locale — de nuevo, no se requieren cambios en el código. Las exposiciones repetidas del mismo nodo dentro de una ventana de vaciado se fusionan en un solo evento con un contador (`count`), por lo que una lista que se vuelve a renderizar 50 veces no envía 50 eventos.

### Seguimiento de conversiones para pruebas A/B

Usa `useConversion()` para atribuir un objetivo a la variante que vio una sesión:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "react-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Empezar
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Empezar
        </button>
      );
    };
    ```

    > `useConversion` es un hook de cliente: marca el componente como `"use client"`.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        Empezar
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      Empezar
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Empezar
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Empezar
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">Empezar</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### Resolución de una variante en el lado del cliente

`useExperiment()` asigna la sesión a una variante y registra la exposición que se convierte en el denominador de la tasa de conversión. Condiciona el subárbol que depende de la variante a `isAssigned` para que ningún visitante vea el destello del control antes de que se resuelva la asignación:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` es una cadena de texto simple.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` es una cadena de texto simple. La asignación ocurre en el navegador, por lo que el componente debe ser un componente de cliente.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` e `isAssigned` son `Ref`s.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` e `isAssigned` son stores: léelos con el prefijo `$`.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` es una cadena de texto simple.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` e `isAssigned` son `Accessor`s: invócalos para leer el valor.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` e `isAssigned` son `Signal`s: invócalos para leer el valor.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Los pesos son opcionales — pasa uno por variante para sesgar la división, por ejemplo `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

El hijo entonces lee la [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md) del diccionario que coincide:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Leer la variante en un **componente hijo** es lo que hace que esto funcione fuera de React: en Vue, Svelte, Solid y Angular, el selector pasado a `useIntlayer` se captura cuando el componente se configura, por lo que la lectura debe ocurrir en un componente que solo se monta una vez que se conoce la variante.

Si el experimento cubre una página completa en lugar de un único diccionario, eleva la variante al proveedor en su lugar — consulta [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md#ambient-variant). Cada `useIntlayer` debajo se resuelve contra él sin cambios en el sitio de llamada.

Si necesitas la asignación sin procesar fuera de un componente, accede al cliente directamente:

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

> `getVariant` solo asigna — no registra la exposición. Prefiere `useExperiment()`, de lo contrario la tasa de conversión no tiene denominador.

## Privacidad y rendimiento

- **Anónimo por diseño**: las sesiones se identifican mediante una ID rotatoria; el backend solo almacena un **hash SHA-256** de esa ID — nunca la ID en crudo, nunca una dirección IP.
- **La ubicación es aproximada**: solo un código de país, derivado de las cabeceras de geolocalización del CDN (`cf-ipcountry`, `x-vercel-ip-country`, ...) — no se lee ni almacena ninguna IP.
- **Las URLs excluyen los parámetros de búsqueda** por defecto, por lo que las cadenas de consulta nunca se capturan.
- **Muestreo**: `sampleRate` te permite conservar solo una fracción de los eventos de exposición de contenido en aplicaciones con mucho tráfico.
- **Por lotes**: una solicitud aproximadamente cada 20 segundos (`flushInterval`), o antes si el búfer se llena (`maxBufferSize`) — nunca una solicitud por evento.

### Costo cero cuando no está instalado

`@intlayer/analytics` sigue exactamente el mismo patrón de dependencia opcional que `@intlayer/editor`:

- cada punto de integración carga el paquete a través de un **`import()` dinámico envuelto en `try/catch`** — una app que nunca instala `@intlayer/analytics` nunca paga un costo de tamaño de bundle o tiempo de ejecución, y nunca ve un error;
- una variable de entorno en tiempo de compilación (`INTLAYER_ANALYTICS_ENABLED`), establecida automáticamente en `'false'` por `@intlayer/config` cuando el paquete no está instalado, `analytics.enabled` es `false` o `editor.clientId` no está configurado, permite a los bundlers **eliminar como código muerto (dead-code-eliminate)** toda la integración;
- las analíticas se desactivan dentro del iframe de vista previa del editor/CMS de Intlayer, por lo que las sesiones de edición nunca se cuentan como tráfico real.

## Panel de control: Página de Analíticas

Una vez que tu proyecto haya recopilado eventos, la página de **Analytics** en el [panel de control de Intlayer](https://app.intlayer.org/analytics) (visible en la barra lateral una vez que se selecciona un proyecto) muestra:

- **Usuarios activos** — visitantes únicos durante el período móvil seleccionado (7 / 30 / 90 días).
- **Usuarios hoy** y **usuarios en los últimos 7 días**.
- **Vistas de página** durante el período seleccionado.
- Un **gráfico de evolución** de visitantes únicos diarios.
- Pestañas de desglose de **Configuraciones regionales (Locales)** y **Ubicación**, clasificando tu audiencia por locale y por país.

## Referencia de la API del Backend

Todos los endpoints de lectura requieren autenticación; la ingesta es pública y se atribuye por el `clientId`.

| Método | Endpoint                                    | Descripción                                                                           |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Ingerir un lote de eventos (público, atribuido por `clientId` en el cuerpo).          |
| `GET`  | `/api/analytics/overview`                   | Totales de páginas/locales para el proyecto autenticado.                              |
| `GET`  | `/api/analytics/audience?days=30`           | Visitantes únicos, vistas de página, serie diaria, desgloses por locale + país.       |
| `GET`  | `/api/analytics/content-stats`              | Totales de exposición por contenido, agrupados por clave de diccionario/ruta/locale.  |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Tasas de conversión por variante y significancia estadística para un experimento A/B. |

También puedes llamar a estos programáticamente con el [SDK del CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **Solo en el servidor.** `createIntlayerCMS()` se autentica con `clientId` + `clientSecret`, y el secreto nunca está disponible en el navegador: este fragmento emitiría solicitudes no autenticadas si se ejecutara allí. Mantenlo en un controlador de rutas, una acción del servidor o un script.

## Enlaces útiles

- [Diccionarios Dinámicos - Colecciones y Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md)
- [CMS de Intlayer - SDK del CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)
- [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
- [Referencia de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Guía de Autoalojamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md)
