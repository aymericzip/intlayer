# Documentación: `t` Función en `react-intlayer`

La función `t` en el paquete `react-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de su aplicación React. Le permite definir traducciones directamente dentro de sus componentes, facilitando la visualización de contenido localizado basado en el locale actual.

---

## Descripción General

La función `t` se utiliza para proporcionar traducciones para diferentes locales directamente en sus componentes. Al pasar un objeto que contiene traducciones para cada locale admitido, `t` devuelve la traducción apropiada según el contexto del locale actual en su aplicación React.

---

## Características Clave

- **Traducciones en Línea**: Ideal para texto rápido en línea que no requiere una declaración de contenido separada.
- **Selección Automática de Locale**: Devuelve la traducción correspondiente al locale actual de forma automática.
- **Soporte de TypeScript**: Proporciona seguridad de tipo y autocompletado al usarse con TypeScript.
- **Fácil Integración**: Funciona sin problemas dentro de los componentes de React.

---

## Firma de la Función

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de locale (por ejemplo, `en`, `fr`, `es`) y los valores son las cadenas traducidas correspondientes.

### Retornos

- Una cadena que representa el contenido traducido para el locale actual.

---

## Ejemplos de Uso

### Uso Básico de `t` en un Componente

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### Traducciones en Línea en Atributos

La función `t` es particularmente útil para traducciones en línea en atributos JSX. Al localizar atributos como `alt`, `title`, `href` o `aria-label`, puede usar `t` directamente dentro del atributo.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Temas Avanzados

### Integración con TypeScript

La función `t` es segura en tipos cuando se usa con TypeScript, asegurando que se proporcionen todos los locales requeridos.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detección de Locales y Contexto

En `react-intlayer`, el locale actual se gestiona a través del `IntlayerProvider`. Asegúrate de que este proveedor envuelva tus componentes y que la propiedad `locale` se pase correctamente.

#### Ejemplo:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Sus componentes aquí */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Sus componentes aquí */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Sus componentes aquí */}
  </IntlayerProvider>
);
```

---

## Errores Comunes y Soluciones

### `t` Retorna Indefinido o Traducción Incorrecta

- **Causa**: El locale actual no está configurado correctamente, o falta la traducción para el locale actual.
- **Solución**:
  - Verifica que el `IntlayerProvider` esté configurado correctamente con el `locale` apropiado.
  - Asegúrate de que tu objeto de traducciones incluya todos los locales necesarios.

### Traducciones Faltantes en TypeScript

- **Causa**: El objeto de traducciones no satisface los locales requeridos, lo que lleva a errores de TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para hacer cumplir la completitud de tus traducciones.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltante 'es' causará un error de TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltante 'es' causará un error de TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltante 'es' causará un error de TypeScript
};

const text = t(translations);
```

---

## Consejos para un Uso Efectivo

1. **Usa `t` para Traducciones Simples en Línea**: Ideal para traducir pequeñas piezas de texto directamente dentro de sus componentes.
2. **Prefiere `useIntlayer` para Contenido Estructurado**: Para traducciones más complejas y reutilización de contenido, define el contenido en archivos de declaración y usa `useIntlayer`.
3. **Provisión Consistente de Locales**: Asegúrate de que tu locale se proporcione de manera consistente en toda tu aplicación a través del `IntlayerProvider`.
4. **Aprovecha TypeScript**: Usa tipos de TypeScript para detectar traducciones faltantes y asegurar la seguridad de tipos.

---

## Conclusión

La función `t` en `react-intlayer` es una herramienta poderosa y conveniente para gestionar traducciones en línea en sus aplicaciones React. Al integrarla de manera efectiva, mejora las capacidades de internacionalización de su aplicación, proporcionando una mejor experiencia para usuarios de todo el mundo.

Para un uso más detallado y características avanzadas, consulta la [documentación de react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**Nota**: Recuerda configurar adecuadamente tu `IntlayerProvider` para asegurarte de que el locale actual se pase correctamente a tus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.
