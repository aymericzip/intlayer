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
---

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

Después, ambos archivos de declaración se fusionarán en un único diccionario, accesible mediante el hook estándar `useIntlayer("example")` (react) / composable (vue).

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

## Historial de Documentación

| Versión | Fecha      | Cambios                        |
| ------- | ---------- | ------------------------------ |
| 6.0.0   | 2025-09-20 | Añadir configuración global    |
| 6.0.0   | 2025-09-17 | Añadir variable `{{fileName}}` |
| 5.5.10  | 2025-06-29 | Historial inicial              |
