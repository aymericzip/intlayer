# Archivos de Declaración de Contenido Autocompletados

Los **archivos de declaración de contenido autocompletados** son una forma de acelerar tu flujo de trabajo de desarrollo.

El mecanismo de autocompletado funciona a través de una relación _maestro-esclavo_ entre los archivos de declaración de contenido. Cuando el archivo principal (maestro) se actualiza, Intlayer aplicará automáticamente esos cambios a los archivos de declaración derivados (autocompletados).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Aquí hay un [archivo de declaración de contenido por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/es/per_locale_file.md) usando la instrucción `autoFill`.

Luego, cuando ejecutes el siguiente comando:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer generará automáticamente el archivo de declaración derivado en `src/components/example/example.content.json`, completando todos los idiomas que aún no están declarados en el archivo principal.

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

Posteriormente, ambos archivos de declaración se fusionarán en un solo diccionario, accesible usando el hook estándar `useIntlayer("example")` (react) / composable (vue).

## Formato de Archivos Autocompletados

El formato recomendado para los archivos de declaración autocompletados es **JSON**, lo que ayuda a evitar restricciones de formato. Sin embargo, Intlayer también admite formatos `.ts`, `.js`, `.mjs`, `.cjs` y otros.

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
> - Si el archivo no existe, Intlayer lo generará usando la plantilla predeterminada para archivos de declaración de contenido.

## Rutas Absolutas

El campo `autoFill` también admite rutas absolutas.

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

## Generación Automática de Archivos de Declaración de Contenido por Idioma

El campo `autoFill` también admite la generación de archivos de declaración de contenido **por idioma**.

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

## Filtrar Autocompletado por Idioma Específico

El uso de un objeto para el campo `autoFill` te permite aplicar filtros y generar solo archivos de idioma específicos.

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

Esto solo generará el archivo de traducción francés.

## Variables de Ruta

Puedes usar variables dentro de la ruta `autoFill` para resolver dinámicamente las rutas objetivo de los archivos generados.

**Variables disponibles:**

- `{{locale}}` – Código de idioma (ej. `fr`, `es`)
- `{{key}}` – Clave del diccionario (ej. `example`)

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
