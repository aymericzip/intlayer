---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete intlayer-cli
description: Herramienta CLI para Intlayer, proporcionando comandos para construir y auditar diccionarios.
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete intlayer-cli

El paquete `intlayer-cli` proporciona un conjunto de comandos para gestionar los diccionarios y la configuración de Intlayer.

## Instalación

```bash
npm install intlayer-cli
```

## Exportaciones

### Comandos CLI (Funciones)

El paquete exporta funciones que impulsan los comandos CLI, permitiéndote desencadenar operaciones de Intlayer de forma programática.

Import:

```tsx
import "intlayer-cli";
```

| Función        | Descripción                                                    |
| -------------- | -------------------------------------------------------------- |
| `build`        | Construye los diccionarios de Intlayer.                        |
| `audit`        | Audita los diccionarios en busca de traducciones faltantes.    |
| `liveSync`     | Sincroniza los diccionarios en tiempo real.                    |
| `pull`         | Extrae diccionarios desde una fuente remota.                   |
| `push`         | Envía diccionarios a una fuente remota.                        |
| `test`         | Ejecuta pruebas en los diccionarios.                           |
| `transform`    | Transforma diccionarios entre formatos.                        |
| `fill`         | Rellena los diccionarios con traducciones faltantes usando IA. |
| `reviewDoc`    | Revisa la documentación para la internacionalización.          |
| `translateDoc` | Traduce la documentación usando IA.                            |
