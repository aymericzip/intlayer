---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete intlayer-cli
description: Herramienta CLI para Intlayer, que proporciona comandos para compilar y auditar diccionarios.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete intlayer-cli

El paquete `intlayer-cli` proporciona un conjunto de comandos para gestionar diccionarios y la configuración de Intlayer.

## Instalación

```bash
npm install intlayer-cli
```

## Exportaciones

### Comandos CLI (Funciones)

El paquete exporta funciones que respaldan los comandos CLI.

| Función    | Descripción                                                 |
| ---------- | ----------------------------------------------------------- |
| `build`    | Construye los diccionarios de Intlayer.                     |
| `audit`    | Audita los diccionarios en busca de traducciones faltantes. |
| `liveSync` | Sincroniza los diccionarios en tiempo real.                 |
| `pull`     | Descarga los diccionarios desde una fuente remota.          |
| `push`     | Sube los diccionarios a una fuente remota.                  |
| `test`     | Ejecuta pruebas en los diccionarios.                        |
| `extract`  | Transforma los diccionarios entre formatos.                 |
