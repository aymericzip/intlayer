---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comando desconocido
description: Aprende cómo solucionar el error de comando desconocido.
keywords:
  - desconocido
  - comando
  - error
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - reiniciar
  - local
slugs:
  - frequent-questions
  - unknown-command
---

# error: comando desconocido fill / build / etc

Si `npx intlayer fill --verbose` muestra:

```
error: unknown command 'fill'
```

pero estás seguro de que el comando `fill` _debería_ existir, aquí están los pasos para resolverlo:

## 1. **Asegúrate de estar usando la última versión**

Ejecuta:

```bash
npx intlayer --version                  # versión actual local de intlayer
npx intlayer@latest --version           # versión más reciente de intlayer
```

Esto fuerza a `npx` a descargar la versión más reciente. Luego intenta de nuevo:

```bash
npx intlayer@latest build --verbose
```

## 2. **Verifica si el comando está registrado**

Puedes comprobarlo con:

```bash
npx intlayer --help                     # proporciona información relacionada con los comandos
```

Revisa si el comando aparece en la lista de comandos.

Ve al repositorio y confirma que tu comando está exportado y registrado en el punto de entrada de la CLI. Intlayer utiliza `commander` como framework.

Código relacionado con la CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Reinicia tu terminal**

A veces es necesario reiniciar el terminal para que reconozca nuevos comandos.

## 5. **Si estás desarrollando `intlayer`, recompílalo y enlázalo**

Si estás desarrollando `intlayer` localmente:

```bash
# En el directorio de intlayer
npm install
npm run build
npm link
```

Luego, en otro terminal:

```bash
intlayer fill --verbose
```

Esto utiliza la versión local en la que estás trabajando.

## 6. **Limpia la caché de npx (si estás atascado con una versión antigua)**

```bash
npx clear-npx-cache
```

O elimina manualmente los paquetes intlayer en caché:

```bash
rm -rf ~/.npm/_npx
```

Consulta el equivalente si usas pnpm, yarn, bun u otro gestor de paquetes
