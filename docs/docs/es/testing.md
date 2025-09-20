---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: Probando tu contenido
description: Descubre cómo probar tu contenido con Intlayer.
keywords:
  - Pruebas
  - Intlayer
  - Internacionalización
  - CMS
  - Sistema de Gestión de Contenidos
  - Editor Visual
slugs:
  - doc
  - testing
---

# Probando tu contenido

Esta guía muestra cómo verificar automáticamente que tus diccionarios estén completos, detectar traducciones faltantes antes de lanzar y probar la interfaz localizada en tu aplicación.

---

## Qué puedes probar

- **Traducciones faltantes**: falla en CI si faltan locales requeridos en cualquier diccionario.
- **Renderizado de UI localizada**: renderiza componentes con un proveedor de locales específico y verifica el texto/atributos visibles.
- **Auditorías en tiempo de compilación**: ejecuta una auditoría rápida localmente vía CLI.

---

## Inicio rápido: auditoría vía CLI

Ejecuta la auditoría desde la raíz de tu proyecto:

```bash
npx intlayer content test
```

Flags útiles:

- `--env-file [ruta]`: carga variables de entorno desde un archivo.
- `-e, --env [nombre]`: selecciona un perfil de entorno.
- `--base-dir [ruta]`: establece el directorio base de la aplicación para la resolución.
- `--verbose`: muestra registros detallados.
- `--prefix [etiqueta]`: prefija las líneas de registro.

Nota: la CLI imprime un informe detallado pero no termina con un código distinto de cero en caso de fallos. Para control en CI, añade una prueba unitaria (más abajo) que verifique que no hay locales requeridos faltantes.

---

## Prueba programática (Vitest/Jest)

Usa la API CLI de Intlayer para asegurar que no falten traducciones en tus locales requeridos.

```ts fileName=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("traducciones", () => {
  it("no tiene locales requeridos faltantes", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Útil cuando la prueba falla localmente o en CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Equivalente en Jest:

```ts fileName=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("no tiene locales requeridos faltantes", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Cómo funciona:

- Intlayer lee tu configuración (locales, requiredLocales) y los diccionarios declarados, luego informa:
  - `missingTranslations`: por clave, qué locales faltan y de qué archivo.
  - `missingLocales`: unión de todos los locales faltantes.
  - `missingRequiredLocales`: subconjunto limitado a `requiredLocales` (o todos los locales si `requiredLocales` no está definido).

---

## Pruebas de UI localizada (React / Next.js)

Renderiza componentes bajo un proveedor de Intlayer y verifica el contenido visible.

Ejemplo en React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Título esperado en inglés")).toBeInTheDocument();
});
```

Ejemplo en Next.js (App Router): usa el envoltorio del framework:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("renderiza encabezado localizado en francés", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Consejos:

- Cuando necesites valores de cadena sin procesar para atributos (por ejemplo, `aria-label`), accede al campo `.value` que devuelve `useIntlayer` en React.
- Mantén los diccionarios junto con los componentes para facilitar las pruebas unitarias y la limpieza.

---

## Integración Continua

Agrega una prueba que falle la compilación cuando falten traducciones requeridas.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Ejemplo de GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Opcional: ejecuta la auditoría CLI para un resumen legible por humanos junto con las pruebas:

```bash
npx intlayer content test --verbose
```

---

## Solución de Problemas

- Asegúrate de que tu configuración de Intlayer defina `locales` y (opcionalmente) `requiredLocales`.
- Si tu aplicación usa diccionarios dinámicos o remotos, ejecuta las pruebas en un entorno donde los diccionarios estén disponibles.
- Para monorepos mixtos, usa `--base-dir` para apuntar la CLI a la raíz correcta de la aplicación.

---

## Historial de la Documentación

| Versión | Fecha      | Cambios                 |
| ------- | ---------- | ----------------------- |
| 6.0.0   | 2025-09-20 | Introducción de pruebas |
