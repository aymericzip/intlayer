---
createdAt: 2026-03-20
updatedAt: 2026-05-06
title: Cómo configurar Intlayer con Storybook
description: Aprenda a hacer que su sistema de diseño sea multilingüe usando Intlayer con Storybook — compile declaraciones de contenido, agregue un selector de idioma y previsualice sus componentes en cualquier idioma.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Actualizar el uso de la API useIntlayer de Solid para el acceso directo a las propiedades"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer con Storybook

## Tabla de Contenidos

<TOC/>

## ¿Qué es Intlayer?

**Intlayer** es una biblioteca de internacionalización (i18n) innovadora y de código abierto diseñada para simplificar el soporte multilingüe en aplicaciones web modernas. Funciona a **nivel de componente**: cada componente posee sus propias declaraciones de contenido, manteniendo las traducciones ubicadas junto al código que las utiliza.

Con Intlayer puedes:

- **Gestionar traducciones de forma declarativa** con archivos de contenido por componente.
- **Obtener soporte completo de TypeScript** a través de tipos generados automáticamente y autocompletado en el IDE.
- **Cambiar de idioma en tiempo de ejecución** sin recargar la página.
- **Traducir automáticamente** con integraciones integradas de proveedores de IA.

---

## ¿Por qué usar Intlayer con Storybook?

Storybook es la herramienta estándar de la industria para desarrollar y documentar componentes de interfaz de usuario de forma aislada. Combinarlo con Intlayer te permite:

- **Previsualizar cada idioma** directamente dentro del canvas de Storybook usando un selector en la barra de herramientas.
- **Detectar traducciones faltantes** antes de que lleguen a producción.
- **Documentar componentes multilingües** con contenido real y seguro en cuanto a tipos, en lugar de cadenas de texto codificadas permanentemente.

---

## Configuración Paso a Paso

<Tabs>
<Tab value="Vite Setup">

### Paso 1: Instalar Dependencias

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Paquete          | Rol                                                          |
| ---------------- | ------------------------------------------------------------ |
| `intlayer`       | Núcleo — configuración, compilación de contenido, CLI        |
| `react-intlayer` | Enlaces para React — `IntlayerProvider`, hook `useIntlayer`  |
| `vite-intlayer`  | Complemento de Vite — vigila y compila archivos de contenido |

---

### Paso 2: Crear una Configuración de Intlayer

Crea `intlayer.config.ts` en la raíz de tu proyecto (o dentro de tu paquete de sistema de diseño):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // agrega más idiomas según sea necesario
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // donde viven tus archivos *.content.ts
  },
};

export default config;
```

> Para obtener la lista completa de opciones, consulta la [referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

---

### Paso 3: Agregar el Complemento de Vite a Storybook

El hook `viteFinal` de Storybook te permite extender la configuración interna de Vite. Importa y agrega el complemento `intlayer()` allí:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …otros complementos
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

El complemento `intlayer()` vigila tus archivos `*.content.ts` y vuelve a generar los diccionarios automáticamente cada vez que cambian durante el desarrollo de Storybook.

---

### Paso 4: Agregar el Decorador `IntlayerProvider` y una Barra de Herramientas de Idioma

El archivo `preview` de Storybook es el lugar adecuado para envolver cada historia con el `IntlayerProvider` y exponer un selector de idioma en la barra de herramientas:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Envolver cada historia dentro del IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Exponer un selector de idioma en la barra de herramientas de Storybook
  globalTypes: {
    locale: {
      description: "Idioma activo",
      defaultValue: "en",
      toolbar: {
        title: "Idioma",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> Los valores de `locale` deben coincidir con los idiomas declarados en tu `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Paso 1: Instalar Dependencias

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

### Paso 2: Crear una Configuración de Intlayer

Crea `intlayer.config.ts` en la raíz de tu proyecto:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

### Paso 3: Configurar el Webpack de Storybook

Para configuraciones de Storybook basadas en Webpack (por ejemplo, `@storybook/react-webpack5`), extiende la configuración de webpack a través de `webpackFinal` para agregar los alias y el cargador de Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

---

### Paso 4: Agregar el Decorador `IntlayerProvider` y una Barra de Herramientas de Idioma

Igual que en la configuración de Vite: agrega el decorador y el tipo de idioma global en `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Idioma activo",
      defaultValue: "en",
      toolbar: {
        title: "Idioma",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

## Declaración de Contenido

Crea un archivo `*.content.ts` al lado de cada componente. Intlayer lo detecta automáticamente durante la compilación.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

> Para obtener más formatos y funciones de declaración de contenido, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

---

## Uso de `useIntlayer` en un Componente

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Copiar
    </button>
  );
};
```

`useIntlayer` devuelve el diccionario compilado para el idioma actual proporcionado por el `IntlayerProvider` más cercano. Cambiar el idioma en la barra de herramientas de Storybook vuelve a renderizar automáticamente la historia con las traducciones actualizadas.

---

## Escritura de Historias para Componentes Internacionalizados

Con el decorador `IntlayerProvider` en su lugar, tus historias funcionan exactamente como antes. La barra de herramientas de idioma controla el idioma activo para todo el canvas:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Historia predeterminada — cambia el idioma en la barra de herramientas para previsualizar las traducciones. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Renderiza el botón dentro de un bloque de código, un caso de uso común en el mundo real. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Cada historia hereda el global `locale` de la barra de herramientas, por lo que puedes verificar cada idioma sin cambiar ningún código de historia.

---

## Prueba de Traducciones en Historias

Usa las funciones `play` de Storybook para asegurar que se renderice el texto traducido correctamente para un idioma determinado:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Verificar que el botón tenga un nombre accesible no vacío
    await expect(button).toHaveAccessibleName();
    // Verificar que el botón no esté deshabilitado
    await expect(button).not.toBeDisabled();
    // Verificar la accesibilidad del teclado
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Recursos Adicionales

- [Referencia de configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md)
- [Documentación de la CLI de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- [Documentación de Storybook](https://storybook.js.org/docs)
