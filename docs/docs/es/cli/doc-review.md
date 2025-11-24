---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Revisar Documento
description: Aprende cómo revisar archivos de documentación para calidad, consistencia y completitud en diferentes locales.
keywords:
  - Revisión
  - Documento
  - Documentación
  - IA
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Revisar Documento

El comando `doc review` analiza archivos de documentación para calidad, consistencia y completitud en diferentes locales.

```bash
npx intlayer doc review
```

Se puede usar para revisar archivos que ya están traducidos y para verificar si la traducción es correcta.

Para la mayoría de los casos de uso,

- prefiere usar `doc translate` cuando la versión traducida de este archivo no está disponible.
- prefiere usar `doc review` cuando la versión traducida de este archivo ya existe.

> Ten en cuenta que el proceso de revisión consume más tokens de entrada que el proceso de traducción para revisar el mismo archivo en su totalidad. Sin embargo, el proceso de revisión optimizará los fragmentos a revisar y omitirá las partes que no hayan cambiado.

## Argumentos:

El comando `doc review` acepta los mismos argumentos que `doc translate`, permitiéndote revisar archivos de documentación específicos y aplicar controles de calidad.

Si activaste una de las opciones de git, el comando solo revisará la parte de los archivos que están siendo modificados. El script procesará el archivo dividiéndolo en fragmentos y revisará cada fragmento. Si no hay cambios en el fragmento, el script lo omitirá para acelerar el proceso de revisión y limitar el costo de la API del proveedor de IA.

Para una lista completa de argumentos, consulta la documentación del comando [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/doc-translate.md).
