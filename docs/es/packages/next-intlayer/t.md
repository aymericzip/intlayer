# Documentación: Función `t` en `next-intlayer`

La función `t` en el paquete `next-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de tu aplicación Next.js. Permite definir traducciones directamente dentro de tus componentes, facilitando la visualización de contenido localizado según el idioma actual.

---

## Resumen

La función `t` se utiliza para proporcionar traducciones para diferentes idiomas directamente en tus componentes. Al pasar un objeto que contiene traducciones para cada idioma soportado, `t` devuelve la traducción apropiada basada en el contexto de idioma actual en tu aplicación Next.js.

---

## Características Principales

- **Traducciones en Línea**: Ideal para textos rápidos en línea que no requieren una declaración de contenido separada.
- **Selección Automática de Idioma**: Devuelve la traducción correspondiente al idioma actual automáticamente.
- **Soporte para TypeScript**: Proporciona seguridad de tipos y autocompletado cuando se usa con TypeScript.
- **Integración Fácil**: Funciona de manera fluida tanto en componentes cliente como servidor en Next.js.

---

## Firma de la Función

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de idioma (por ejemplo, `en`, `fr`, `es`) y los valores son las cadenas traducidas correspondientes.

### Retorna

- Una cadena que representa el contenido traducido para el idioma actual.

---

## Ejemplos de Uso

### Usando `t` en un Componente Cliente

Asegúrate de incluir la directiva `'use client';` en la parte superior de tu archivo de componente al usar `t` en un componente del lado del cliente.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "Este es el contenido de un ejemplo de componente cliente",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido de un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### Usando `t` en un Componente Servidor

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "Este es el contenido de un ejemplo de componente servidor",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### Traducciones en Línea en Atributos

La función `t` es particularmente útil para traducciones en línea en atributos JSX.
Al localizar atributos como `alt`, `title`, `href` o `aria-label`, puedes usar `t` directamente dentro del atributo.

```tsx
<button
  aria-label={t({
    en: "Enviar",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Enviar",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "Un paisaje hermoso",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Temas Avanzados

### Integración con TypeScript

La función `t` es segura en tipos cuando se usa con TypeScript, asegurando que se proporcionen todos los idiomas requeridos.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Bienvenido",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detección de Idioma y Contexto

En `next-intlayer`, el idioma actual se gestiona a través de proveedores de contexto: `IntlayerClientProvider` e `IntlayerServerProvider`. Asegúrate de que estos proveedores envuelvan tus componentes y que la propiedad `locale` se pase correctamente.

#### Ejemplo:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Tus componentes aquí */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Errores Comunes y Solución de Problemas

### `t` Devuelve Undefined o Traducción Incorrecta

- **Causa**: El idioma actual no está establecido correctamente, o falta la traducción para el idioma actual.
- **Solución**:
  - Verifica que `IntlayerClientProvider` o `IntlayerServerProvider` esté configurado correctamente con el `locale` apropiado.
  - Asegúrate de que tu objeto de traducciones incluya todos los idiomas necesarios.

### Falta de Traducciones en TypeScript

- **Causa**: El objeto de traducciones no satisface los idiomas requeridos, lo que provoca errores de TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para garantizar la completitud de tus traducciones.

```typescript
const translations: IConfigLocales<string> = {
  en: "Texto",
  fr: "Texte",
  // es: 'Texto', // Falta 'es' causará un error de TypeScript
};

const text = t(translations);
```

---

## Consejos para un Uso Efectivo

1. **Usa `t` para Traducciones Simples en Línea**: Ideal para traducir pequeñas porciones de texto directamente dentro de tus componentes.
2. **Prefiere `useIntlayer` para Contenido Estructurado**: Para traducciones más complejas y reutilización de contenido, define el contenido en archivos de declaración y usa `useIntlayer`.
3. **Provisión Consistente de Idioma**: Asegúrate de que tu idioma se provea de manera consistente en toda tu aplicación a través de los proveedores apropiados.
4. **Aprovecha TypeScript**: Usa tipos de TypeScript para detectar traducciones faltantes y asegurar la seguridad de tipos.

---

## Conclusión

La función `t` en `next-intlayer` es una herramienta poderosa y conveniente para gestionar traducciones en línea en tus aplicaciones Next.js. Al integrarla de manera efectiva, mejoras las capacidades de internacionalización de tu aplicación, proporcionando una mejor experiencia para usuarios en todo el mundo.

Para un uso más detallado y características avanzadas, consulta la [documentación de next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**Nota**: Recuerda configurar correctamente tus proveedores `IntlayerClientProvider` e `IntlayerServerProvider` para asegurar que el idioma actual se pase correctamente a tus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.
