# Generación Automática de Traducciones en un Pipeline CI/CD

Intlayer permite la generación automática de traducciones para tus archivos de declaración de contenido. Hay múltiples formas de lograr esto dependiendo de tu flujo de trabajo.

## Usando el CMS

Con Intlayer, puedes adoptar un flujo de trabajo donde solo se declara un único locale localmente, mientras que todas las traducciones se gestionan de forma remota a través del CMS. Esto permite que el contenido y las traducciones estén completamente desvinculados del código, ofreciendo más flexibilidad para los editores de contenido y habilitando la recarga en caliente del contenido (sin necesidad de reconstruir la aplicación para aplicar cambios).

### Ejemplo de Configuración

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

    applicationURL: process.env.APPLICATION_URL, // URL de la aplicación utilizada por el CMS

    clientId: process.env.INTLAYER_CLIENT_ID, // Credenciales del CMS
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Esta es una aplicación de prueba", // Ayuda a garantizar la generación consistente de traducciones
  },
};

export default config;
```

Para obtener más información sobre el CMS, consulta la [documentación oficial](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_CMS.md).

## Usando Husky

Puedes integrar la generación de traducciones en tu flujo de trabajo local de Git utilizando [Husky](https://typicode.github.io/husky/).

### Ejemplo de Configuración

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

    applicationContext: "Esta es una aplicación de prueba", // Ayuda a garantizar la generación consistente de traducciones
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Para asegurar que los diccionarios estén actualizados
npx intlayer fill --unpushed --mode fill    # Solo llena contenido faltante, no actualiza los existentes
```

> Para más información sobre los comandos de Intlayer CLI y su uso, consulta la [documentación CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).

> Si tienes múltiples aplicaciones en tu repositorio usando instancias separadas de Intlayer, puedes usar el argumento `--base-dir` de esta manera:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Usando GitHub Actions

Intlayer proporciona un comando CLI para autofill y revisar el contenido de los diccionarios. Esto puede integrarse en tu flujo de trabajo CI/CD utilizando GitHub Actions.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
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
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Install dependencies
        run: npm ci

      - name: ⚙️ Build Intlayer project
        run: npx intlayer build

      - name: 🤖 Auto-fill missing translations
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Create or update translation PR
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Al igual que con Husky, en el caso de un monorepo, puedes usar el argumento `--base-dir` para tratar secuencialmente cada aplicación.

> Por defecto, el argumento `--git-diff` filtra los diccionarios que incluyen cambios desde la base (por defecto `origin/main`) hasta la rama actual (por defecto: `HEAD`).

> Para más información sobre los comandos de Intlayer CLI y su uso, consulta la [documentación CLI](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_cli.md).
