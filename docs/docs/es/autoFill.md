---
docName: autoFill
url: https://intlayer.org/doc/concept/auto-fill
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Autocompletar
description: Aprende cómo usar la funcionalidad de autocompletar en Intlayer para poblar automáticamente contenido basado en patrones predefinidos. Sigue esta documentación para implementar funciones de autocompletar de manera eficiente en tu proyecto.
keywords:
  - Autocompletar
  - Automatización de Contenido
  - Contenido Dinámico
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Archivos de Declaración de Contenido con Autocompletar

**Los archivos de declaración de contenido con autocompletar** son una forma de acelerar tu flujo de trabajo de desarrollo.
El mecanismo de autocompletar funciona a través de una relación _maestro-esclavo_ entre los archivos de declaración de contenido. Cuando el archivo principal (maestro) se actualiza, Intlayer aplicará automáticamente esos cambios a los archivos de declaración derivados (autocompletados).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

// Contenido de ejemplo con autocompletar configurado
const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content", // Este es un ejemplo de contenido
  },
} satisfies Dictionary;

export default exampleContent;
```

Aquí tienes un [archivo de declaración de contenido por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) que utiliza la instrucción `autoFill`.

Luego, cuando ejecutes el siguiente comando:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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

Después, ambos archivos de declaración se fusionarán en un solo diccionario, accesible usando el hook estándar `useIntlayer("example")` (react) / composable (vue).

## Formato del Archivo Autocompletado

El formato recomendado para los archivos de declaración autofillados es **JSON**, lo que ayuda a evitar restricciones de formato. Sin embargo, Intlayer también soporta formatos `.ts`, `.js`, `.mjs`, `.cjs` y otros.

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
> - Si el archivo ya existe, Intlayer lo analizará usando el AST (Árbol de Sintaxis Abstracta) para localizar cada campo e insertar las traducciones que falten.
> - Si el archivo no existe, Intlayer lo generará usando la plantilla de archivo de declaración de contenido predeterminada.

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

## Generar Automáticamente Archivos de Declaración de Contenido Por Localización

El campo `autoFill` también soporta la generación de archivos de declaración de contenido **por localización**.

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

## Filtrar Auto-relleno por Localización Específica

Usar un objeto para el campo `autoFill` te permite aplicar filtros y generar solo archivos para localizaciones específicas.

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

## Variables en la Ruta

Puedes usar variables dentro de la ruta `autoFill` para resolver dinámicamente las rutas destino de los archivos generados.

**Variables disponibles:**

- `{{locale}}` – Código de localización (por ejemplo, `fr`, `es`)
- `{{key}}` – Clave del diccionario (por ejemplo, `example`)

```ts fileName="src/components/example/example.content.ts"
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

## Historial de Documentación

- 5.5.10 - 2025-06-29: Inicio del historial
