---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Renderizado Estático vs Dinámico con i18n en Next.js
description: Aprende a usar renderizado estático vs dinámico con i18n en Next.js.
keywords:
  - estático
  - dinámico
  - renderizado
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - configuración
slugs:
  - doc
  - faq
  - static-rendering
---

# Renderizado Estático vs Dinámico con i18n en Next.js

## El problema con **next-intl**

- **¿Qué sucede?**
  Cuando usas `useTranslations`, `getTranslations` o cualquier helper de next-intl _dentro de un Componente del Servidor_ en una aplicación con rutas i18n (`/en/…`, `/fr/…`), Next.js marca toda la ruta como **dinámica**. ([Next Intl][1])

- **¿Por qué?**
  next-intl busca la configuración regional actual desde un encabezado exclusivo de la solicitud (`x-next-intl-locale`) a través de `headers()`. Debido a que `headers()` es una **API dinámica**, cualquier componente que la utilice pierde la optimización estática. ([Next Intl][1], [Next.js][2])

- **Solución oficial (boilerplate)**

  1. Exporta `generateStaticParams` con cada configuración regional soportada.
  2. Llama a `setRequestLocale(locale)` en **cada** layout/página _antes_ de llamar a `useTranslations`. ([Next Intl][1])
     Esto elimina la dependencia del encabezado, pero ahora tienes código extra que mantener y una API inestable en producción.

## Cómo **intlayer** evita el problema

**Decisiones de diseño**

1. **Solo parámetro de ruta** – La configuración regional proviene del segmento de URL `[locale]` que Next.js ya pasa a cada página.
2. **Paquetes en tiempo de compilación** – Las traducciones se importan como módulos ES regulares, por lo que se optimizan mediante tree-shaking e incrustan en el momento de la compilación.
3. **Sin APIs dinámicas** – `useT()` lee desde el contexto de React, no desde `headers()` o `cookies()`.
4. **Sin configuración adicional** – Una vez que tus páginas están bajo `app/[locale]/`, Next.js prerenderiza automáticamente un archivo HTML por cada configuración regional.
