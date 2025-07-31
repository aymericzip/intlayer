---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Integración CI/CD
description: Aprende cómo integrar Intlayer en tu pipeline de CI/CD para la gestión y despliegue automatizado de contenido.
keywords:
  - CI/CD
  - Integración Continua
  - Despliegue Continuo
  - Automatización
  - Internacionalización
  - Documentación
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
---

# Generación Automática de Traducciones en un Pipeline CI/CD

Intlayer permite la generación automática de traducciones para tus archivos de declaración de contenido. Existen varias formas de lograr esto dependiendo de tu flujo de trabajo.

## Uso del CMS

Con Intlayer, puedes adoptar un flujo de trabajo donde solo se declara un único locale localmente, mientras que todas las traducciones se gestionan de forma remota a través del CMS. Esto permite que el contenido y las traducciones estén completamente desacoplados de la base de código, ofreciendo mayor flexibilidad para los editores de contenido y habilitando la recarga dinámica del contenido (sin necesidad de reconstruir la aplicación para aplicar cambios).

### Configuración de ejemplo

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Los locales opcionales se gestionarán de forma remota
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // El contenido remoto tiene prioridad

    applicationURL: process.env.APPLICATION_URL, // URL de la aplicación usada por el CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Credenciales del CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "This is a test application", // Ayuda a asegurar la generación consistente de traducciones
  },
};

export default config;
```

Para aprender más sobre el CMS, consulta la [documentación oficial](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

## Uso de Husky

Puedes integrar la generación de traducciones en tu flujo de trabajo local de Git usando [Husky](https://typicode.github.io/husky/).

### Configuración de ejemplo

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Los locales opcionales se gestionan de forma remota
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Usa tu propia clave API

    applicationContext: "This is a test application", // Ayuda a asegurar la generación consistente de traducciones
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Para asegurar que los diccionarios estén actualizados
npx intlayer fill --unpushed --mode fill    # Solo rellena el contenido faltante, no actualiza los existentes
```

> Para más información sobre los comandos CLI de Intlayer y su uso, consulta la [documentación CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

> Si tienes múltiples aplicaciones en tu repositorio usando instancias separadas de Intlayer, puedes usar el argumento `--base-dir` así:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Uso de GitHub Actions

Intlayer proporciona un comando CLI para auto-rellenar y revisar el contenido del diccionario. Esto puede integrarse en tu flujo de trabajo CI/CD usando GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Auto-Relleno Intlayer
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ Clonar repositorio
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Instalar dependencias
        run: npm ci

      - name: ⚙️ Construir proyecto Intlayer
        run: npx intlayer build

      - name: 🤖 Auto-rellenar traducciones faltantes
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Crear o actualizar PR de traducción
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-rellenar traducciones faltantes [skip ci]
          branch: auto-translations
          title: chore: actualizar traducciones faltantes
          labels: translation, automated
```

> Igual que con Husky, en el caso de un monorepo, puedes usar el argumento `--base-dir` para tratar secuencialmente cada aplicación.

> Por defecto, el argumento `--git-diff` filtra los diccionarios que incluyen cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).

> Para más información sobre los comandos de la CLI de Intlayer y su uso, consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

## Historial del documento

- 5.5.10 - 2025-06-29: Historial inicial
