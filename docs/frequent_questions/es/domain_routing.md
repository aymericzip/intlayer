---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ¿Cómo configurar el enrutamiento basado en dominios?
description: Aprende cómo configurar el enrutamiento basado en dominios.
keywords:
  - dominio
  - enrutamiento
  - intlayer
  - configuración
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
---

# ¿Cómo configuro el **enrutamiento basado en dominios** con Intlayer en lugar de rutas `/[locale]/`?

## Respuesta corta

El enrutamiento basado en dominios es más sencillo que el enrutamiento basado en rutas (`example.com/[locale]/`) porque puedes omitir todo el middleware y la configuración de enrutamiento. Solo despliega tu aplicación en cada dominio de idioma y configura una variable de entorno por dominio.

## Paso a paso

1. **Despliega una vez por dominio** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. Para cada despliegue, configura `LOCALE` (y las variables de entorno habituales de Intlayer) al idioma que ese dominio debe servir.
3. Referencia esa variable como `defaultLocale` en tu archivo `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 el dominio decide el idioma
  },
  // ... resto de tu configuración
};

export default config;
```

Eso es todo-funciona igual para **Next.js**, **Vite + React**, **Vite + Vue**, etc.

## ¿Qué pasa si todos los dominios apuntan al **mismo** despliegue?

Si todos los dominios apuntan al mismo paquete de la aplicación, necesitarás detectar el host en tiempo de ejecución y pasar el idioma manualmente a través del proveedor.

### Para Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 👈 obtener el idioma desde el nombre del host si no está definido
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Para Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // 👈 reemplaza con tu propia lógica de búsqueda
app.mount("#app");
```

Reemplaza `getLocaleFromHostname()` con tu propia lógica de búsqueda.

## Actualiza tu selector de idioma

Cuando usas enrutamiento basado en dominios, cambiar de idioma significa navegar a otro dominio:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Beneficios del enrutamiento basado en dominios

1. **Configuración más sencilla**: No es necesario configurar `intlayerProxy`, `generateStaticParams`, `react-router` o `vue-router`
2. **Mejor SEO**: Cada idioma tiene su propio dominio
3. **URLs más limpias**: No hay prefijo de idioma en la ruta
4. **Mantenimiento más sencillo**: Cada despliegue de idioma es independiente
