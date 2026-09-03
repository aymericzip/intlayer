---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: ¿Está vue-i18n obsoleto en 2026?
description: vue-i18n ha sido el estándar para aplicaciones Vue y Nuxt durante una década. Sin embargo, en nuestros benchmarks resultó ser el runtime de i18n más pesado de la web. Descubre por qué.
keywords:
  - vue-i18n
  - Intlayer
  - Internacionalización
  - i18n
  - Vue
  - Nuxt
  - Tamaño de bundle
  - Blog
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# ¿Está vue-i18n obsoleto en 2026?

En el entorno de Vue, pocas soluciones disfrutan de tanta presencia como `vue-i18n`. Conducido por Kazupon desde la época de Vue 2, sustenta `@nuxtjs/i18n` y representa la opción predeterminada para casi cualquier desarrollo multilingüe en Vue.

Aun así, nuestros benchmarks de 2026 revelaron un hallazgo llamativo: **`vue-i18n` resultó ser el runtime de localización más pesado entre todos los frameworks frontend evaluados.**

Partiendo de una base limpia de Vite + Vue de 31.5 KB, incorporar `vue-i18n` incrementó el JavaScript medio por página hasta los **136.4 KB**, más que cuadruplicando la carga inicial.

¿Cómo es posible que un framework conocido por su ligereza acabe requiriendo un paquete de internacionalización tan abultado? ¿Y sigue teniendo sentido su modelo centrado en tiempo de ejecución?

<TOC/>

## Puntos clave

**El runtime más voluminoso evaluado:**

Con **24.3 KB gzipped (83.2 KB minificados)** antes de incluir un solo texto traducido, `vue-i18n` es unas **9 veces más pesado** que el runtime de `intlayer` (2.7 KB).

**Un sobrecoste del 330% en la carga útil:**

`vue-i18n` disparó una página Vue de 31.5 KB hasta 136.4 KB. Intlayer la mantuvo en 59.3 KB, lo que supone una **carga útil un 56% más reducida**.

**Un compilador oculto en el navegador:**

De forma predeterminada, a menos que se ajusten alias concretos en el empaquetador, `vue-i18n` envía un compilador de mensajes íntegro al navegador para procesar textos al vuelo.

**Frecuencia de mantenimiento:**

A lo largo del último año, `vue-i18n` acumuló ~259 commits, orientados a resolver incidencias y preservar la compatibilidad con Vue.

**Carencia de herramientas modernas integradas:**

No dispone de soporte oficial para servidores de lenguaje (LSP), servidores MCP de IA ni comandos de traducción automática en CLI.

## Mantenimiento frente a herramientas actuales

| Repositorio           | Estrellas                                                                                                                                              | Commits totales                                                                                                                                                     | Commits / año                                                                                                                                                      | Último commit                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

Historial del último año:

- `intlify/vue-i18n`: **259 commits** (mantenimiento regular para Vue 3 y Nuxt).
- `aymericzip/intlayer`: **4.343 commits** (mejoras continuas en optimizaciones de compilación, LSP y herramientas de IA).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

Una librería madura puede ser estable. No obstante, las aplicaciones contemporáneas aprovechan el procesado AST durante el build, la eliminación de código en desuso y la traducción con IA. Un esquema vinculado exclusivamente al runtime no asimila fácilmente estas posibilidades.

## Rendimiento práctico en Vite + Vue

Evaluamos una aplicación de 10 páginas y 10 idiomas desarrollada con Vite y Vue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pruebas realizadas en entornos de navegador reales con compresión gzip. Información completa en la [documentación del benchmark Vue](https://intlayer.org/es/doc/benchmark/vue).

### Sobrecarga base de cada librería

Impacto inicial antes de cargar cualquier texto traducido:

| Librería          | Gzipped    | Minificado |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

Solo el runtime de `vue-i18n` ocupa **24.3 KB gzipped**, prácticamente lo mismo que el núcleo de Vue. Intlayer añade únicamente **2.7 KB**.

### Peso por página y fuga de contenido

| Configuración   | JS medio / pág (gz) | Fuga idiomas | Fuga otras págs | Componente medio (gz) |
| --------------- | ------------------- | ------------ | --------------- | --------------------- |
| Base (sin i18n) | 31.5 KB             | 0.0%         | 90.0%           | 0.9 KB                |
| `vue-i18n`      | **136.4 KB**        | 50.2%        | 90.0%           | 196.0 KB              |
| Intlayer        | **59.3 KB**         | 51.1%        | **0.0%**        | **6.5 KB**            |

### Conclusiones destacadas

**Sobrecarga proporcional notable:**

Dado que la base de Vue es extremadamente reducida (~31 KB), la inclusión de `vue-i18n` cuadruplica la carga total de la aplicación.

**Fuga hacia otras rutas:**

Por defecto, el **90% del contenido traducido** enviado a una página pertenece a otras secciones. Intlayer suprime esta fuga por completo, bajándola al **0.0%**.

**Peso de componentes aislados:**

Los componentes compilados con ámbitos de localización registraron una media de 196 KB en `vue-i18n` debido a la duplicación de catálogos, en comparación con los **6.5 KB** de Intlayer.

## ¿Por qué vue-i18n es pesado?

### Un compilador AST incluido en el navegador

`vue-i18n` lleva un compilador de formato de mensajes propio. Las reglas de plurales y las interpolaciones se interpretan como árboles de sintaxis abstracta (AST) en el navegador en tiempo de ejecución.

Para evitarlo, es necesario crear alias específicos en el empaquetador hacia `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` y precompilar los catálogos con `@intlify/unplugin-vue-i18n`. Muchos proyectos pasan esto por alto y entregan un compilador completo a sus visitantes.

### Conjunto de utilidades monolítico

`vue-i18n` agrupa formateadores numéricos y temporales, resolutores de mensajes encadenados, puentes para la Options API clásica (`$t`, `v-t`) y proxys reactivos. Aunque solo precises textos sencillos en `<script setup>`, estás forzado a cargar el paquete entero.

### Las claves dinámicas bloquean el tree-shaking

Al ser `"home.hero.title"` una clave resuelta dinámicamente, las herramientas de build no pueden determinar qué textos se emplean. Por ello, las cadenas en desuso permanecen en el bundle.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

El [compilador de Intlayer](https://intlayer.org/es/doc/compiler) rastrea con exactitud las propiedades invocadas y suprime el contenido sin uso antes de ensamblar los paquetes del cliente. Consulta [optimización de bundle](https://intlayer.org/es/doc/concept/bundle-optimization) para profundizar.

## Experiencia de desarrollo

### Catálogos dispersos frente a co-ubicación

En `vue-i18n`, las traducciones se gestionan en una carpeta `locales/` aislada. Intlayer organiza los ficheros de contenido directamente junto a los componentes:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/es.json"
{
  "hero": {
    "title": "Lanza en todos los idiomas"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      es: "Lanza en todos los idiomas",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

Al retirar o reorganizar `Hero.vue`, su fichero de contenido se traslada o descarta a la vez.

### Autocompletado frente a exhaustividad rigurosa

`DefineLocaleMessage` ofrece autocompletado en el IDE tomando como base el esquema de referencia. Sin embargo, no comprueba la cobertura total. Si se omite una clave en `es.json`, TypeScript no generará ninguna alerta durante la compilación.

Intlayer evalúa los diccionarios con rigidez. Activar [`strictMode`](https://intlayer.org/es/doc/concept/configuration) detiene el build si falta cualquier texto en cualquier idioma.

### Herramientas para IDEs y agentes IA

| Característica             | `vue-i18n`           | Intlayer                                                                    |
| -------------------------- | -------------------- | --------------------------------------------------------------------------- |
| **Extensión VS Code**      | Terceros (i18n Ally) | ✅ [Extensión oficial](https://intlayer.org/es/doc/vs-code-extension)       |
| **Language Server (LSP)**  | ❌ Ninguno           | ✅ [LSP dedicado](https://intlayer.org/es/doc/lsp)                          |
| **Servidor MCP para IA**   | ❌ Ninguno           | ✅ [Servidor MCP integrado](https://intlayer.org/es/doc/mcp-server)         |
| **Habilidades de Agente**  | ❌ Ninguna           | ✅ [Skills listas](https://intlayer.org/es/doc/agent_skills)                |
| **CMS Visual en contexto** | ❌ Ninguno           | ✅ [CMS gratuito y Open Source](https://intlayer.org/es/doc/concept/editor) |

## Vías de traducción

`vue-i18n` no cuenta con comandos de traducción propios. Los equipos suelen exportar archivos a herramientas como Crowdin o Phrase.

Intlayer brinda estos flujos de forma integrada:

**Auto-completado por IA local (`intlayer fill`):**

Rellena las claves pendientes mediante tus claves API de OpenAI, Anthropic, Mistral o Gemini.

**CMS visual autoalojable:**

Habilita el [CMS Intlayer](https://intlayer.org/es/doc/concept/cms) para que editores no técnicos adapten textos con confirmación directa en Git.

**Licencia de código abierto:**

Todo el instrumental se proporciona bajo licencia Apache 2.0.

## ¿Cuándo sigue teniendo sentido vue-i18n?

<AccordionGroup>
<Accordion header="Bases de código consolidadas en Nuxt 2 o 3">

Si tu enrutamiento depende estrechamente de `@nuxtjs/i18n`, un rediseño puede no ser prioritario.

</Accordion>
<Accordion header="Usos complejos de ICU">

Si empleas ampliamente mensajes encadenados o reglas plurales y temporales intrincadas.

</Accordion>
<Accordion header="Proyectos personales pequeños">

Si las dimensiones finales del bundle no suponen un factor crítico.

</Accordion>
</AccordionGroup>

## ¿Cómo mejorar mi configuración de vue-i18n existente?

Intlayer ofrece paquetes de compatibilidad directa que replican las firmas de funciones de `vue-i18n` y `@nuxtjs/i18n` (`useI18n`, `$t`, `<i18n-t>`). No necesitas reescribir tus plantillas ni tus composables para beneficiarte de una arquitectura optimizada por compilador.

La instalación se realiza con un único comando:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Esta CLI interactiva:

1. Instala el paquete de compatibilidad `@intlayer/vue-i18n` o `@intlayer/nuxt-i18n`.
2. Configura los alias en Vite o Nuxt para que tus importaciones y etiquetas habituales apunten directamente a Intlayer, permitiendo desinstalar `vue-i18n` de `package.json`.
3. Activa al instante el soporte del Language Server (LSP), elimina el analizador AST de 24 KB del bundle de cliente y desbloquea flujos locales de traducción por IA sin necesidad de una refactorización profunda.

Para consultar los detalles paso a paso, explora nuestras guías:

- **Capa de compatibilidad:** Conserva tus plantillas con la [capa de compatibilidad de `vue-i18n`](https://intlayer.org/es/doc/compatibility/vue-i18n) o [`@nuxtjs/i18n`](https://intlayer.org/es/doc/compatibility/nuxtjs-i18n).
- **Guías de migración paso a paso:** Transforma archivos JSON tradicionales en diccionarios estructurados: [desde vue-i18n](https://intlayer.org/es/doc/migration/vue-i18n) o [desde @nuxtjs/i18n](https://intlayer.org/es/doc/migration/nuxtjs-i18n).
- **Estrategia híbrida:** Conserva `vue-i18n` para la renderización mientras [usas Intlayer con vue-i18n](https://intlayer.org/es/blog/intlayer-with-vue-i18n) para ganar tipado seguro y autotraducción local por IA.

Evalúa el volumen y las fugas de tu aplicación con el [escáner SEO i18n gratuito](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## Lecturas recomendadas

- [Benchmark Vue & Vite i18n: análisis detallado de prestaciones](https://intlayer.org/es/doc/benchmark/vue)
- [vue-i18n frente a Intlayer: comparativa técnica completa](https://intlayer.org/es/blog/vue-i18n-vs-intlayer)
- [¿Está next-intl obsoleto en 2026?](https://intlayer.org/es/blog/is-next-intl-outdated)
- [Internacionalización basada en compilación frente a declarativa](https://intlayer.org/es/blog/compiler-vs-declarative-i18n)
