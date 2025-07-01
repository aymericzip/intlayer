---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Cómo recuperar la configuración regional desde las cookies / encabezados
description: Aprende cómo recuperar la configuración regional desde las cookies / encabezados.
keywords:
  - cookie
  - encabezados
  - intlayer
  - configuración regional
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - doc
  - faq
  - obtener-configuracion-regional-cookie
---

# Cómo recuperar la configuración regional desde las cookies / encabezados

## Uso de Hooks (Recomendado)

Para la mayoría de los casos, se recomienda recuperar la configuración regional actual usando el hook `useLocale` porque se resuelve automáticamente. Esto funciona de manera similar al composable `useLocale` en Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// or import { useLocale } from "vue-intlayer";

// Uso en el lado del cliente
const { locale } = useLocale();
```

Para componentes del servidor, puedes importarlo desde:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

También existe un hook `useLocaleCookie` que solo resuelve el valor de la cookie.

## Configuración manual de la cookie

Puedes declarar un nombre personalizado para la cookie como

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // el valor por defecto es 'intlayer-locale'
  },
};

export default config;
```

recuperarlo como

### Lado del cliente

```ts
// Usando el nombre de cookie por defecto
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Usando un nombre de cookie personalizado
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### Lado del servidor (Next.js)

```ts
import { cookies } from "next/headers";

// Usando el nombre de cookie por defecto
const locale = cookies().get("intlayer-locale")?.value;

// Usando un nombre de cookie personalizado
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Si la locale aún no está establecida

La locale se establece como una cookie solo una vez que el usuario selecciona explícitamente la locale. Por defecto, para nuevos visitantes, la locale se interpreta a partir de los campos de los encabezados.

Puedes detectar la configuración regional preferida del usuario a partir de las cabeceras de la solicitud. Aquí tienes un ejemplo de cómo manejar esto:

```ts
/**
 * Detecta la configuración regional a partir de las cabeceras de la solicitud
 *
 * La cabecera accept-language es la más importante para la detección de la configuración regional.
 * Contiene una lista de códigos de idioma con valores de calidad (q-values) que indican
 * los idiomas preferidos por el usuario en orden de preferencia.
 *
 * Ejemplo: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US es el idioma principal (q=1.0 está implícito)
 * - en es la segunda opción (q=0.9)
 * - fr es la tercera opción (q=0.8)
 * - es es la cuarta opción (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Ejemplo de cabeceras negociadoras que los navegadores suelen enviar
 * Estas cabeceras ayudan a determinar el idioma preferido del usuario
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Ejemplo de uso:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
