# Documentación: Función `t` en `react-intlayer`

La función `t` en el paquete `react-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de tu aplicación React. Permite definir traducciones directamente en tus componentes, facilitando la visualización de contenido localizado según el idioma actual.

---

## Descripción general

La función `t` se utiliza para proporcionar traducciones para diferentes idiomas directamente en tus componentes. Al pasar un objeto que contiene traducciones para cada idioma soportado, `t` devuelve la traducción adecuada según el contexto de idioma actual en tu aplicación React.

---

## Características principales

- **Traducciones en línea**: Ideal para textos rápidos y en línea que no requieren una declaración de contenido separada.
- **Selección automática del idioma**: Devuelve automáticamente la traducción correspondiente al idioma actual.
- **Compatibilidad con TypeScript**: Ofrece seguridad de tipos y autocompletado cuando se usa con TypeScript.
- **Integración fácil**: Funciona de manera fluida dentro de los componentes React.

---

## Firma de la función

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parámetros

- `translations`: Un objeto donde las claves son los códigos de idioma (por ejemplo, `en`, `fr`, `es`) y los valores son las cadenas traducidas correspondientes.

### Devuelve

- Una cadena que representa el contenido traducido para el idioma actual.

---

## Ejemplos de uso

### Uso básico de `t` en un componente

```tsx
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

### Traducciones en línea en atributos

La función `t` es especialmente útil para traducciones en línea en atributos JSX. Cuando localizas atributos como `alt`, `title`, `href` o `aria-label`, puedes usar `t` directamente dentro del atributo.

```tsx
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

## Temas avanzados

### Integración con TypeScript

La función `t` es segura para tipos cuando se usa con TypeScript, asegurando que se proporcionen todos los idiomas requeridos.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detección y contexto del idioma

En `react-intlayer`, el idioma actual se gestiona a través del `IntlayerProvider`. Asegúrate de que este proveedor envuelva tus componentes y que la propiedad `locale` se pase correctamente.

#### Ejemplo:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Tus componentes aquí */}
  </IntlayerProvider>
);
```

---

## Errores comunes y solución de problemas

### `t` devuelve un valor indefinido o incorrecto

- **Causa**: El idioma actual no está configurado correctamente, o falta la traducción para el idioma actual.
- **Solución**:
  - Verifica que el `IntlayerProvider` esté configurado correctamente con el idioma adecuado.
  - Asegúrate de que tu objeto de traducciones incluya todos los idiomas necesarios.

### Faltan traducciones en TypeScript

- **Causa**: El objeto de traducciones no satisface los idiomas requeridos, lo que provoca errores en TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para garantizar la completitud de tus traducciones.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltar 'es' provocará un error en TypeScript
};

const text = t(translations);
```

---

## Consejos para un uso efectivo

1. **Usa `t` para traducciones simples en línea**: Ideal para traducir pequeños fragmentos de texto directamente dentro de tus componentes.
2. **Prefiere `useIntlayer` para contenido estructurado**: Para traducciones más complejas y reutilización de contenido, define el contenido en archivos de declaración y usa `useIntlayer`.
3. **Consistencia en la provisión del idioma**: Asegúrate de que el idioma se proporcione de manera consistente en tu aplicación a través del `IntlayerProvider`.
4. **Aprovecha TypeScript**: Usa tipos de TypeScript para detectar traducciones faltantes y garantizar la seguridad de tipos.

---

## Conclusión

La función `t` en `react-intlayer` es una herramienta potente y práctica para gestionar traducciones en línea en tus aplicaciones React. Integrándola de manera efectiva, mejoras las capacidades de internacionalización de tu aplicación, ofreciendo una mejor experiencia a usuarios de todo el mundo.

Para un uso más detallado y características avanzadas, consulta la [documentación de react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**Nota**: Recuerda configurar correctamente tu `IntlayerProvider` para garantizar que el idioma actual se pase correctamente a tus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.
