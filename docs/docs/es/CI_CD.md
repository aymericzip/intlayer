---
createdAt: 2025-05-20
updatedAt: 2025-08-13
title: Integración CI/CD
description: Aprende cómo integrar Intlayer en tu pipeline CI/CD para la gestión y despliegue automatizado de contenido.
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
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Generación Automática de Traducciones en un Pipeline CI/CD

Intlayer permite la generación automática de traducciones para tus archivos de declaración de contenido. Existen múltiples formas de lograr esto dependiendo de tu flujo de trabajo.

## Uso del CMS

Con Intlayer, puedes adoptar un flujo de trabajo donde solo se declara un único locale localmente, mientras que todas las traducciones se gestionan de forma remota a través del CMS. Esto permite que el contenido y las traducciones estén completamente desacoplados del código base, ofreciendo más flexibilidad para los editores de contenido y habilitando la recarga en caliente del contenido (no es necesario reconstruir la aplicación para aplicar cambios).

### Configuración de Ejemplo

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
    applicationContext: "Esta es una aplicación de prueba", // Ayuda a asegurar una generación consistente de traducciones
  },
};

export default config;
```

Para aprender más sobre el CMS, consulta la [documentación oficial](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

## Uso de Husky

Puedes integrar la generación de traducciones en tu flujo de trabajo local de Git usando [Husky](https://typicode.github.io/husky/).

### Configuración de Ejemplo

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Los locales opcionales se manejan de forma remota
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Usa tu propia clave API

    applicationContext: "Esta es una aplicación de prueba", // Ayuda a asegurar una generación consistente de traducciones
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Para asegurar que los diccionarios estén actualizados
npx intlayer fill --unpushed --mode fill    # Solo rellena el contenido faltante, no actualiza los existentes
```

> Para más información sobre los comandos CLI de Intlayer y su uso, consulta la [documentación CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).

> Si tienes múltiples aplicaciones en tu repositorio usando instancias separadas de Intlayer, puedes usar el argumento `--base-dir` de esta manera:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Uso de GitHub Actions

Intlayer proporciona un comando CLI para rellenar automáticamente y revisar el contenido del diccionario. Esto se puede integrar en tu flujo de trabajo CI/CD usando GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Relleno Automático de Intlayer
# Condiciones para activar este flujo de trabajo
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Paso 1: Obtener el código más reciente del repositorio
      - name: ⬇️ Clonar repositorio
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Mantener credenciales para crear PRs
          fetch-depth: 0 # Obtener todo el historial git para análisis de diferencias

      # Paso 2: Configurar el entorno de Node.js
      - name: 🟢 Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Usar Node.js 20 LTS para estabilidad

      # Paso 3: Instalar dependencias del proyecto
      - name: 📦 Instalar dependencias
        run: npm install

      # Paso 4: Instalar Intlayer CLI globalmente para gestión de traducciones
      - name: 📦 Instalar Intlayer
        run: npm install -g intlayer-cli

      # Paso 5: Construir el proyecto Intlayer para generar archivos de traducción
      - name: ⚙️ Construir proyecto Intlayer
        run: npx intlayer build

      # Paso 6: Usar IA para rellenar automáticamente las traducciones faltantes
      - name: 🤖 Rellenar automáticamente las traducciones faltantes
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Paso 7: Verificar si hay cambios y confirmarlos
      - name: � Verificar cambios
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Paso 8: Confirmar y enviar cambios si existen
      - name: 📤 Confirmar y enviar cambios
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: auto-fill missing translations [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Para configurar las variables de entorno, vaya a GitHub → Configuración → Secrets and variables → Actions y agregue el secreto .

> Al igual que con Husky, en el caso de un monorepo, puede usar el argumento `--base-dir` para tratar secuencialmente cada aplicación.

> Por defecto, el argumento `--git-diff` filtra los diccionarios que incluyen cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).

> Para más información sobre los comandos de Intlayer CLI y su uso, consulte la [documentación del CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_cli.md).
