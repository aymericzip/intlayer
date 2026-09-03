---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: ¿Está next-intl obsoleto en 2026?
description: next-intl se convirtió en la elección predominante para Next.js App Router. Sin embargo, aún acarrea sobrecarga de bundle en runtime y la carga de gestionar namespaces manualmente.
keywords:
  - next-intl
  - Intlayer
  - Internacionalización
  - i18n
  - Next.js
  - Tamaño de bundle
  - Blog
  - JavaScript
slugs:
  - blog
  - is-next-intl-outdated
author: aymericzip
---

# ¿Está next-intl obsoleto en 2026?

Cuando Vercel introdujo App Router y descontinuó la i18n integrada de Pages Router, `next-intl` cubrió el vacío rápidamente. Jan Amann ofreció una documentación clara y un soporte ágil para App Router, consolidándolo como la solución estándar de la comunidad.

¿Por qué plantearse entonces si muestra síntomas de obsolescencia?

**La arquitectura web ha evolucionado sustancialmente en los últimos tres años, pero la base operativa de `next-intl` apenas ha cambiado.**

Mientras Next.js se orientó hacia los React Server Components (RSC), el streaming y las optimizaciones de compilador, `next-intl` sigue gestionando la internacionalización en el navegador: enviando grandes estructuras JSON mediante proveedores cliente, ejecutando formateadores ICU en el navegador y dependiendo de la división manual de namespaces para frenar el crecimiento del bundle.

<TOC/>

## Puntos clave

**Ritmo de desarrollo contenido:**

Durante los últimos 12 meses, `next-intl` registró ~187 commits, centrados mayormente en compatibilidad con Next.js y resolución de errores puntuales.

**Sobrecarga del cliente en tiempo de ejecución:**

Montar `NextIntlClientProvider` junto con `useTranslations()` añade ~12.8 KB gzipped (51 KB minificados) antes de imprimir una sola palabra, casi el triple que `next-intlayer` (4.3 KB).

**Fuga de textos del 90%:**

En configuraciones convencionales, **el 89.8% del volumen de traducción descargado en una página corresponde a otras pantallas**. Acceder a `/contact` implica descargar el contenido de `/pricing` y `/dashboard`.

**Mantenimiento manual de namespaces:**

Para evitar bundles inflados es imprescindible segmentar los namespaces ruta por ruta manualmente, elevando el riesgo de errores en producción.

**Acuerdo comercial:**

Al ser partner oficial de Crowdin, la biblioteca tiene pocos incentivos para incorporar un comando de traducción local y gratuita por IA en la CLI.

## Mantenimiento frente a herramientas actuales

Actividad de commits durante el último año:

| Repositorio           | Estrellas                                                                                                                                              | Commits totales                                                                                                                                                     | Commits / año                                                                                                                                                      | Último commit                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `amannn/next-intl`    | [![stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=stars)](https://github.com/amannn/next-intl/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/amannn/next-intl?style=for-the-badge&label=%2Fyear)](https://github.com/amannn/next-intl/commits)       | [![last](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Historial de los últimos 12 meses:

- `amannn/next-intl`: **187 commits** (actualizaciones de dependencias y pequeñas correcciones).
- `aymericzip/intlayer`: **4.343 commits** (desarrollo continuado en compiladores, extensiones de IDE, servidores MCP y motores de traducción).

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#amannn/next-intl&aymericzip/intlayer)

Una librería específica puede ser estable. No obstante, las prácticas de i18n han progresado: los compiladores descartan textos no referenciados al construir el paquete, los LLM traducen en los pipelines de CI y los editores se coordinan con Language Servers (LSP) y agentes inteligentes. Un modelo centrado en el cliente encuentra dificultades para asumir estas mejoras.

## Rendimiento en Next.js 16 App Router

Evaluación comparativa sobre una aplicación App Router estándar con 10 rutas y 10 idiomas:

<I18nBenchmark framework="nextjs" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Medido en navegadores reales bajo compresión gzip de producción. Datos completos en el [informe del benchmark Next.js](https://intlayer.org/es/doc/benchmark/nextjs).

### Peso esencial de la librería

Carga del cliente previa a incorporar cualquier texto:

| Librería               | Gzipped    | Minificado  |
| ---------------------- | ---------- | ----------- |
| `next-intl@4.9.1`      | 12.8 KB    | 51.0 KB     |
| `next-intlayer@8.7.12` | **4.3 KB** | **13.3 KB** |

### Peso por página y dispersión de datos

| Configuración          | JS medio / pág (gz) | Fuga idiomas | Fuga otras págs | Componente medio (gz) |
| ---------------------- | ------------------- | ------------ | --------------- | --------------------- |
| Base (sin i18n)        | 150.8 KB            | 0.0%         | 0.0%            | 0.7 KB                |
| `next-intl` (estático) | 163.5 KB            | 4.2%         | **89.8%**       | 20.5 KB               |
| `next-intl` (dinámico) | 163.4 KB            | 9.7%         | **89.9%**       | 20.5 KB               |
| `next-intlayer`        | **152.1 KB**        | **0.0%**     | **0.0%**        | **7.2 KB**            |

### Causa de las fugas entre rutas

En los proyectos típicos con `next-intl`, el layout principal carga todos los mensajes de golpe:

```tsx fileName="app/[locale]/layout.tsx"
export default async function RootLayout({ children, params }) {
  const messages = await getMessages();

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Al suministrar `messages` en el provider raíz, el navegador descarga la totalidad del catálogo en cada página. Un usuario en `/login` termina descargando secciones de ayuda, guías y paneles internos.

Esto puede solventarse fraccionando archivos JSON y cargándolos según la ruta. Sin embargo, configurar y mantener esas listas a mano es una tarea tediosa y fuente recurrente de errores.

Intlayer soluciona esto con análisis estático: el [compilador de Intlayer](https://intlayer.org/es/doc/compiler) incluye únicamente los textos referenciados en cada ruta, reduciendo la fuga entre páginas al **0.0%**.

## Por qué next-intl no admite tree-shaking

Su API se apoya en resoluciones dinámicas mediante cadenas de texto en runtime:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```tsx fileName="UserProfile.tsx"
"use client";

import { useTranslations } from "next-intl";

export function UserProfile() {
  const t = useTranslations("UserProfile");

  return <h2>{t("heading")}</h2>;
}
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```tsx fileName="UserProfile.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function UserProfile() {
  const { heading } = useIntlayer("user-profile");

  return <h2>{heading}</h2>;
}
```

  </Tab>
</Tabs>

Turbopack y Webpack no pueden comprobar qué claves de `UserProfile` se ejecutan realmente. Para prevenir fallos de claves ausentes, **el empaquetador se ve obligado a enviar todo el namespace al bundle del cliente**. Gracias a las propiedades desestructuradas de Intlayer, el compilador rastrea los accesos reales y purga las propiedades superfluas. Consulta [optimización de bundle](https://intlayer.org/es/doc/concept/bundle-optimization) para conocer más.

## Experiencia del desarrollador

### Archivos JSON aislados frente a co-ubicación

Con `next-intl`, las cadenas residen en ficheros JSON dentro de una carpeta externa `messages/`. Intlayer agrupa las declaraciones de contenido junto a sus componentes:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "authModal": {
    "title": "Sign in to your account",
    "submitButton": "Continue"
  }
}
```

```json fileName="messages/es.json"
{
  "authModal": {
    "title": "Inicia sesión en tu cuenta",
    "submitButton": "Continuar"
  }
}
```

```tsx fileName="AuthModal.tsx"
import { useTranslations } from "next-intl";

export const AuthModal = () => {
  const t = useTranslations("authModal");
  return (
    <form>
      <h2>{t("title")}</h2>
      <button type="submit">{t("submitButton")}</button>
    </form>
  );
};
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="AuthModal.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "auth-modal",
  content: {
    title: t({
      en: "Sign in to your account",
      es: "Inicia sesión en tu cuenta",
    }),
    submitButton: t({
      en: "Continue",
      es: "Continuar",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="AuthModal.tsx"
import { useIntlayer } from "next-intlayer";

export const AuthModal = () => {
  const { title, submitButton } = useIntlayer("auth-modal");
  return (
    <form>
      <h2>{title}</h2>
      <button type="submit">{submitButton}</button>
    </form>
  );
};
```

  </Tab>
</Tabs>

Al renombrar o descartar `AuthModal.tsx`, sus declaraciones de contenido se ajustan o borran de forma paralela.

### Autocompletado frente a verificación estricta de tipos

Ampliar `IntlMessages` en `next-intl` aporta sugerencias en el editor basadas en el idioma primario:

```ts fileName="global.d.ts"
import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

No obstante, solo comprueba el idioma base. Si se omite una clave en `es.json`, TypeScript no notificará ninguna alerta, manteniendo tu pipeline en verde mientras los usuarios encuentran textos vacíos.

Intlayer deduce los tipos de cada bloque de contenido. El uso de [`strictMode`](https://intlayer.org/es/doc/concept/configuration) detiene la compilación ante cualquier traducción incompleta.

### Comparativa de herramientas y soporte IA

| Característica             | `next-intl` | Intlayer                                                                |
| -------------------------- | ----------- | ----------------------------------------------------------------------- |
| **Extensión VS Code**      | ❌ Ninguna  | ✅ [Extensión oficial](https://intlayer.org/es/doc/vs-code-extension)   |
| **Language Server (LSP)**  | ❌ Ninguno  | ✅ [LSP integrado](https://intlayer.org/es/doc/lsp)                     |
| **Servidor MCP (para IA)** | ❌ Ninguno  | ✅ [Servidor MCP incorporado](https://intlayer.org/es/doc/mcp-server)   |
| **Habilidades de Agente**  | ❌ Ninguna  | ✅ [Skills operativas](https://intlayer.org/es/doc/agent_skills)        |
| **CMS Visual en contexto** | ❌ Ninguno  | ✅ [Gratuito y Open Source](https://intlayer.org/es/doc/concept/editor) |

Disponer de servidores LSP y MCP propios permite a los asistentes de desarrollo comprender el mapa de contenido del proyecto y sugerir o actualizar traducciones con exactitud.

## El vínculo con Crowdin y el ecosistema

`next-intl` colabora formalmente con Crowdin. Los patrocinios sustentan el ecosistema libre, pero esta relación condiciona las metas del proyecto: al estar enfocado en servicios TMS externos, un comando libre y local de traducción por IA no forma parte de las prioridades de `next-intl`.

Intlayer integra estas herramientas de serie:

**Comando de relleno por IA local (`intlayer fill`):**

Revisa y traduce claves faltantes empleando tus credenciales personales de OpenAI, Anthropic, Mistral o Gemini.

**CMS visual desplegable:**

Utiliza el [CMS Intlayer](https://intlayer.org/es/doc/concept/cms) para facilitar la edición visual al equipo no técnico integrando cambios directamente en Git.

**Licencia de código abierto permisiva:**

Todo el código se distribuye bajo licencia Apache 2.0.

## ¿En qué escenarios sigue encajando next-intl?

<AccordionGroup>
<Accordion header="Requisitos avanzados de ICU MessageFormat">

Si tu sistema utiliza de forma intensiva selecciones complejas, reglas ordinales intrincadas y formatos anidados, la integración ICU de `next-intl` es robusta.

</Accordion>
<Accordion header="Procesos consolidados con Crowdin">

Para equipos que ya coordinan sus traducciones a través de Crowdin, `next-intl` encaja con naturalidad.

</Accordion>
<Accordion header="Sistemas en producción estables">

Si tu plataforma responde adecuadamente y la carga del bundle respeta tus objetivos, migrar no es una prioridad inmediata.

</Accordion>
</AccordionGroup>

## ¿Cómo mejorar mi configuración de next-intl existente?

Intlayer proporciona un paquete de compatibilidad directa que replica con exactitud las firmas de funciones y hooks de `next-intl` (como `useTranslations`, `getTranslations` y asistentes de enrutamiento). No necesitas reescribir tus componentes para beneficiarte de las optimizaciones a nivel de compilador.

La configuración se completa con un único comando:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

Esta CLI interactiva:

1. Instala el paquete de compatibilidad `@intlayer/next-intl`.
2. Configura los alias del empaquetador para que tus importaciones (`next-intl`, `next-intl/server`) se redirijan directamente a Intlayer, permitiendo remover la biblioteca antigua de tu `package.json`.
3. Activa de inmediato el soporte de Language Server (LSP), la eliminación de fugas de datos entre páginas (tree-shaking completo) y las herramientas locales de traducción por IA sin requerir una refactorización masiva.

Para conocer el proceso paso a paso, explora nuestras guías:

- **Compatibilidad inmediata:** Conserva tus llamadas a `useTranslations` mediante el [adaptador de compatibilidad para next-intl](https://intlayer.org/es/doc/compatibility/next-intl).
- **Migración guiada:** Transforma archivos JSON antiguos a diccionarios organizados siguiendo la [guía de migración de next-intl](https://intlayer.org/es/doc/migration/next-intl).
- **Solución híbrida:** Mantén `next-intl` en la visualización mientras [aprovechas Intlayer con next-intl](https://intlayer.org/es/blog/intlayer-with-next-intl) para traducir localmente con IA.

Verifica el volumen de transferencia y fugas de tu aplicación Next.js con el [escáner SEO i18n gratuito](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Lecturas adicionales

- [Benchmark Next.js i18n: análisis completo de rendimiento](https://intlayer.org/es/doc/benchmark/nextjs)
- [next-i18next vs next-intl vs Intlayer: comparación a fondo](https://intlayer.org/es/blog/next-i18next-vs-next-intl-vs-intlayer)
- [¿Está i18next obsoleto en 2026?](https://intlayer.org/es/blog/is-i18next-outdated)
- [El valor de una internacionalización orientada a la compilación](https://intlayer.org/es/blog/compiler-vs-declarative-i18n)
