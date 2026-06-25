---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Relleno Automático
description: Aprende a usar la funcionalidad de relleno automático en Intlayer para poblar contenido automáticamente basado en patrones predefinidos. Sigue esta documentación para implementar funciones de relleno automático de manera eficiente en tu proyecto.
keywords:
  - Relleno Automático
  - Automatización de Contenido
  - Contenido Dinámico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "Añadir configuración global"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Añadir variable `{{fileName}}`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Rellenar Traducciones de Archivos de Declaración de Contenido

**Rellenar automáticamente archivos de declaración de contenido** en tu CI es una forma de acelerar tu flujo de trabajo de desarrollo.

## Entendiendo el comportamiento

El comando `fill` incluye dos modos:

- **Complete**: Completa automáticamente todo el contenido faltante para cada locale y edita el archivo actual, u otro archivo si se especifica. Es decir, el modo complete omitirá la traducción del contenido existente, si ya está traducido.
- **Review**: Completa automáticamente **todo** el contenido para cada locale y genera para un archivo específico, u otro archivo si se especifica.

El comando will procesará todos tus archivos de declaración de contenido por locale. Es decir, no procesará tu contenido remoto del CMS. El CMS incluye su propia gestión de traducciones.
Si utilizas plugins como `@intlayer/sync-json-plugin`, Intlayer transformará los archivos JSON en archivos de declaración de contenido por locale. Es decir, serán procesados por el comando `fill`.

Los archivos generados recientemente incluyen una instrucción `filled` como metadatos del diccionario. Esta instrucción será utilizada por Intlayer para saber si el archivo ha sido rellenado automáticamente o no, y omitirá este archivo de ser traducido nuevamente si está presente.

Intlayer también considerará la siguiente instrucción para rellenado automático:

- De tu `.content.{ts|js|json}` → instrucción `fill`
- De tu archivo de configuración `.intlayer.config.ts` → instrucción `dictionary.fill`
- Se establecerá en `true` por defecto de lo contrario

Para archivos de declaración de contenido por locale, la instrucción `true` será reemplazada por `./{{fileName}}.fill.content.json`. Esto es porque un archivo de declaración de contenido por locale no puede recibir contenido localizado adicional. Por lo tanto, generará un nuevo archivo para no sobrescribir el archivo existente.

## Comportamiento Predeterminado

Por defecto, `fill` está establecido en `true` globalmente, lo que significa que Intlayer rellenará automáticamente todos los archivos de contenido y editará el archivo en sí. Este comportamiento se puede personalizar de varias formas:

### Opciones de Configuración Global

1. **`fill: true` (default)** - Rellenar automáticamente todos los locales y editar el archivo actual
2. **`fill: false`** - Desactivar el relleno automático para este archivo de contenido
3. **`fill: "./relative/path/to/file"`** - Crear/actualizar el archivo especificado sin editar el actual señalando una ruta relativa resuelta basada en la ubicación del archivo actual
4. **`fill: "/absolute/path/to/file"`** - Crear/actualizar el archivo especificado sin editar el actual señalando una ruta relativa resuelta basada en la ubicación del directorio base (campo `baseDir` en el archivo de configuración `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Crear/actualizar el archivo especificado sin editar el actual señalando una ruta absoluta resuelta basada en tu sistema operativo
6. **`fill: { [key in Locales]?: string }`** - Crear/actualizar el archivo especificado para cada locale

### Cambios de comportamiento en v7

En v7, el comportamiento del comando `fill` ha sido actualizado:

- **`fill: true`** - Reescribe el archivo actual con contenido completado para todos los locales
- **`fill: "path/to/file"`** - Completa el archivo especificado sin modificar el archivo actual
- **`fill: false`** - Desactiva la completación automática completamente

Cuando se utiliza una opción de ruta para escribir en otro archivo, el mecanismo de completación funciona a través de una relación _maestro-esclavo_ entre archivos de declaración de contenido. El archivo principal (maestro) sirve como la fuente de verdad, y cuando se actualiza, Intlayer aplicará automáticamente esos cambios a los archivos de declaración completados (derivados) especificados por la ruta.

# Traducciones de Archivos de Declaración de Contenido con Relleno Automático

**Los archivos de declaración de contenido con relleno automático** son una forma de acelerar tu flujo de trabajo de desarrollo.

El mecanismo de relleno automático funciona mediante una relación _maestro-esclavo_ entre archivos de declaración de contenido. Cuando el archivo principal (maestro) se actualiza, Intlayer aplicará automáticamente esos cambios a los archivos de declaración derivados (rellenados automáticamente).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Este es un ejemplo de contenido",
  },
} satisfies Dictionary;

export default exampleContent;
```

Aquí hay un [archivo de declaración de contenido por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) que usa la instrucción `autoFill`.

Luego, cuando ejecutes el siguiente comando:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer generará automáticamente el archivo de declaración derivado en `src/components/example/example.content.json`, completando todos los locales que no estén ya declarados en el archivo principal.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Después, ambos archivos de declaración se fusionarán en un único diccionario, accesible mediante el hook estándar `useIntlayer("example")` (react) / composable (vue).

## Configuración Global

Puedes configurar la configuración global de auto fill en el archivo `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Auto-generar traducciones faltantes para todos los diccionarios
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // auto-generar traducciones faltantes para todos los diccionarios como usar "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Aún puedes ajustar finamente por diccionario usando el campo `fill` en archivos de contenido. Intlayer primero considerará la configuración por diccionario y luego recurrirá a la configuración global.

## Formato del Archivo Rellenado Automáticamente

El formato recomendado para los archivos de declaración autocompletados es **JSON**, lo que ayuda a evitar restricciones de formato. Sin embargo, Intlayer también soporta `.ts`, `.js`, `.mjs`, `.cjs` y otros formatos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Tu contenido
  },
};
```

Esto generará el archivo en:

```
src/components/example/example.filled.content.ts
```

> La generación de archivos `.js`, `.ts` y similares funciona de la siguiente manera:
>
> - Si el archivo ya existe, Intlayer lo analizará usando el AST (Árbol de Sintaxis Abstracta) para localizar cada campo e insertar las traducciones faltantes.
> - Si el archivo no existe, Intlayer lo generará usando la plantilla predeterminada de archivo de declaración de contenido.

## Rutas Absolutas

El campo `autoFill` también soporta rutas absolutas.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Tu contenido
  },
};
```

Esto generará el archivo en:

```
/messages/example.content.json
```

## Autogenerar Archivos de Declaración de Contenido Por Localidad

El campo `autoFill` también soporta la generación de archivos de declaración de contenido **por localidad**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Tu contenido
  },
};
```

Esto generará dos archivos separados:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> En este caso, si el objeto no contiene todos los locales, Intlayer omitirá la generación de los locales restantes.

## Filtrar Autocompletado para Locales Específicos

Usar un objeto para el campo `autoFill` te permite aplicar filtros y generar solo archivos para locales específicos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Tu contenido
  },
};
```

Esto solo generará el archivo de traducción en francés.

## Variables de Ruta

Puedes usar variables dentro de la ruta `autoFill` para resolver dinámicamente las rutas destino de los archivos generados.

**Variables disponibles:**

- `{{locale}}` – Código de la localidad (por ejemplo, `fr`, `es`)
- `{{fileName}}` – Nombre del archivo (por ejemplo, `index`)
- `{{key}}` – Clave del diccionario (por ejemplo, `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Tu contenido
  },
};
```

Esto generará:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Tu contenido
  },
};
```

Esto generará:

- `./index.content.json`
- `./index.content.json`
