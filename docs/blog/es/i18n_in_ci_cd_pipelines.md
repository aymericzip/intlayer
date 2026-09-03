---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Automatizar traducciones en CI/CD sin enviar textos defectuosos"
description: Tres puntos clave para automatizar i18n, pre-push, pull request y runtime. Cómo bloquear una compilación por cobertura, autocompletar de forma segura y evitar el bucle infinito de commits.
keywords:
  - automatizar traducciones ci
  - i18n ci cd
  - github actions traducciones
  - husky pre-push
  - localización continua
  - pipeline de traducción
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# Automatizar traducciones en CI/CD sin enviar textos defectuosos

La traducción manual no sobrevive al ritmo ágil de despliegues. Alguien añade una cadena el viernes, la exportación se retrasa al siguiente sprint, y para entonces tres idiomas más están desactualizados. Automatizarlo es sencillo. Automatizarlo sin publicar silenciosamente contenido generado por máquinas a los usuarios es la parte que requiere verdadera atención.

## Tabla de contenidos

<TOC/>

## No necesitas migrar para automatizar

Los esquemas de pipeline descritos a continuación son independientes de la biblioteca utilizada, al igual que las herramientas. Si tus textos son catálogos JSON para i18next, next-intl, react-intl, vue-i18n o next-translate, el [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) lee y escribe esos archivos directamente en su lugar:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // o "icu" para next-intl / react-intl
    }),
  ],
};

export default config;
```

Tu aplicación sigue importando lo mismo de siempre. Los procesos de CI completan y protegen tus catálogos existentes, y el diff que el revisor ve es una simple actualización en `locales/fr/checkout.json`, no una migración de arquitectura. Existe un [plugin Sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) para flujos gettext, y [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) para mantener la API en tiempo de ejecución sin cambios.

## Separa el control de bloqueo (gate) del llenado (fill)

Dos tareas distintas se confunden continuamente.

Un **gate** es una verificación que falla. Establece que esta compilación no debe desplegarse porque faltan idiomas requeridos. No escribe ningún archivo.

Un **fill** es una mutación. Genera las traducciones faltantes y realiza un commit con ellas. Nunca hace fallar una compilación.

Ejecutar únicamente un fill implica que nada se bloquea jamás y las traducciones generadas por máquina llegan a producción sin revisión. Ejecutar únicamente un gate hace que el build se ponga rojo y un humano tenga que intervenir cada vez. La mayoría de los equipos necesitan ambos vinculados a disparadores diferentes: fill en un pull request, gate al fusionar en la rama de lanzamiento.

## Dónde ubicar la automatización

| Etapa         | Disparador | Ideal para                                | Costo                                        |
| :------------ | :--------- | :---------------------------------------- | :------------------------------------------- |
| Hook pre-push | Git local  | Feedback rápido, cero minutos de CI       | Se ejecuta en la máquina y clave API del dev |
| Pull request  | Job de CI  | Revisión previa al merge, un lugar seguro | Minutos de CI más llamadas al modelo por PR  |
| Rama release  | Job de CI  | Bloqueo estricto por cobertura            | Económico, sin llamadas a modelos            |
| Runtime       | CMS        | Cambios de contenido sin recompilar       | Dependencia de servicio alojado              |

## Pre-push: el ciclo más rápido

Husky ejecuta el llenado antes de que el código salga de la máquina, permitiendo que las traducciones lleguen en el mismo push que introdujo las nuevas cadenas.

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` limita el trabajo al contenido que aún no ha sido enviado, evitando esperas innecesarias en cada push. `--mode complete` rellena únicamente lo que falta sin reescribir entradas que ya tienen valor, garantizando que una traducción revisada nunca sea reemplazada en silencio.

En un monorepo, delimita cada aplicación:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

La desventaja es real: cada desarrollador requiere una clave de API, y el costo recae sobre quien envía el push. Por eso la mayoría de los equipos trasladan esto a la CI cuando crecen.

## Pull request: generar donde se realiza la revisión

El mismo trabajo en GitHub Actions, enfocado en el diff:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

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
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

Cuatro detalles son fundamentales aquí:

- **`fetch-depth: 0`** es obligatorio para que funcione `--git-diff`. Un clon superficial no tiene una base contra la cual calcular el diff, por lo que el proceso no genera nada silenciosamente.
- **`[skip ci]` en el mensaje de commit** evita que el flujo de trabajo se reactive a sí mismo en bucle infinito. Sin él, el commit inicia una ejecución que vuelve a hacer commit, agotando el presupuesto de CI en una noche.
- **`concurrency` con `cancel-in-progress`** impide que dos pushes concurrentes compitan intentando escribir los mismos archivos a la vez.
- **`--git-diff`** limita el autocompletado a lo modificado en el PR. Si lo omites, retraduces todo el catálogo en cada ejecución.

Las traducciones se incorporan como un commit en la rama del PR, lo que significa que el revisor las ve en el diff. Ese es el beneficio principal de hacerlo aquí en lugar de después del merge.

## Rama de release: el control de bloqueo (gate)

El gate no requiere acceso a modelos y debe ser sumamente rápido.

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

Respaldado por una prueba que realiza aserciones sobre la cobertura en lugar del simple reporte de la terminal:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("no tiene locales requeridos faltantes", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` imprime un informe pero devuelve código de salida cero, por lo que solo informa sin bloquear. Úsalo en local; usa la aserción en CI. Más detalles en [detectar traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md).

## `requiredLocales` hace viable el gate

Un gate que exija dieciocho idiomas completos bloquea cada despliegue hasta que el idioma más rezagado esté listo, terminando por ser desactivado en menos de un mes.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Declara los locales que soportas y exige como obligatorios solo aquellos que deben bloquear un lanzamiento. El resto se completa de forma asíncrona sin frenar tus entregas.

## Desacoplar las traducciones del repositorio

El otro enfoque consiste en declarar un idioma base en código y gestionar el resto de forma remota a través del CMS con Live Sync. Las modificaciones de contenido ya no requieren recompilación, separando el ritmo editorial del ciclo de despliegue técnico.

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

Esto se adapta a equipos donde personas no técnicas gestionan los textos. Es un intercambio: ganas autonomía editorial y pierdes la propiedad de que un checkout de git describa con exactitud todo lo que la app renderiza. Detalles en la [documentación del CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md).

Ten en cuenta que `clientSecret` es una credencial sensible de servidor. Pertenece a los secretos de CI y al entorno de tu servidor, nunca a nada que llegue al cliente.

## La limitación honesta

Todo lo anterior automatiza la _cobertura_, no la _calidad_. Un autocompletado por máquina convierte una ausencia visible en una invisible: la auditoría se vuelve verde porque la clave ya tiene un valor, pero nadie la ha leído.

Esto es aceptable para herramientas internas, notas de versiones o locales en fase beta. No es aceptable para páginas de precios, avisos legales, mensajes de error de pago o cualquier texto que el usuario lea antes de tomar una decisión. En esos casos, canaliza el contenido mediante revisión humana y usa `--mode complete` para no sobrescribir cadenas ya revisadas.

Proporciona contexto al modelo para que la salida sea consistente:

```ts
ai: {
  applicationContext: "Aplicación de facturación B2B. Tono formal. Nunca traducir el nombre del producto.",
}
```

## Errores comunes

- **Omitir `[skip ci]` en el auto-commit.** El flujo se reactiva en un bucle sin fin.
- **Clonado superficial con `--git-diff`.** No hay base para calcular diferencias, no se llena nada y no se genera aviso.
- **Llenar todo el catálogo en cada ejecución.** Limita el alcance con `--git-diff` o `--unpushed` para controlar costos.
- **Usar el reporte de CLI como gate.** Devuelve código de salida 0.
- **Exigir todos los locales como requeridos.** El control se desactiva en el primer lanzamiento bloqueado.
- **Un job de fill sin ningún gate.** Nada falla nunca, y textos no revisados van a producción.
- **Claves de API de modelos en el repositorio.** Deben estar en secretos de CI, al igual que `clientSecret`.

## Para profundizar

- [CI/CD: autogeneración de traducciones con Husky, GitHub Actions y el CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/CI_CD.md)
- [Probar el contenido y bloquear compilaciones por cobertura](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/testing.md)
- [autoFill: generación de archivos de declaración por locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md)
- [Referencia de configuración: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Informes de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [Adaptador de compatibilidad i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18next.md)
- [Cómo detectar traducciones faltantes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/detecting_missing_translations.md)
- [Cómo probar traducciones sin pruebas frágiles](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/i18n_testing_strategies.md)
