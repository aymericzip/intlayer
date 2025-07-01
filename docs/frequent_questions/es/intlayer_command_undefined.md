---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comando Intlayer indefinido
description: Aprende cómo solucionar el error de comando intlayer indefinido.
keywords:
  - intlayer
  - comando
  - indefinido
  - error
  - vscode
  - extensión
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - doc
  - faq
  - comando-intlayer-indefinido
---

# Comando Intlayer indefinido

## Resumen

La CLI de Intlayer proporciona una forma conveniente de controlar tu contenido intlayer, incluyendo la construcción de diccionarios, el envío de traducciones y más. Sin embargo, no es esencial para que tu proyecto funcione. Si estás utilizando el plugin del empaquetador (como `withIntlayer()` para Next.js o `intlayerPlugin()` para Vite), Intlayer construirá automáticamente los diccionarios durante la compilación de la aplicación o el inicio del servidor de desarrollo. En modo desarrollo, también observará los cambios y reconstruirá automáticamente los archivos de declaración de contenido.

Puedes acceder a los comandos de intlayer de diferentes maneras:

- Usando el comando CLI `intlayer` directamente
- Usando la [extensión de VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)
- Usando el SDK `@intlayer/cli`

## Problema

Al intentar usar el comando `intlayer`, podrías encontrar este error:

```bash
'intlayer' no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.
```

## Soluciones

Prueba estas soluciones en orden:

1. **Verifica que el comando esté instalado**

```bash
npx intlayer -h
```

Salida esperada:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            output the version number
    -h, --help               display help for command

Commands:
    dictionary|dictionaries  Dictionaries operations
    configuration|config     Configuration operations
    help [command]           display help for command
```

2. **Instala el paquete intlayer-cli globalmente**

```bash
npm install intlayer-cli -g -g
```

> No debería ser necesario si ya has instalado el paquete `intlayer`

3. **Instala el paquete globalmente**

```bash
npm install intlayer -g
```

4. **Reinicia tu terminal**
   A veces es necesario reiniciar el terminal para que reconozca nuevos comandos.

5. **Limpia y reinstala**
   Si las soluciones anteriores no funcionan:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Verifica los archivos de instalación**
   Si el problema persiste, verifica que estos archivos existan:

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (debería tener un campo `bin` que referencia a `./dist/cjs/cli.cjs`)

7. **Verifica la variable de entorno PATH**
   Asegúrate de que el directorio global bin de npm esté en tu PATH:

```bash
# Para sistemas basados en Unix (macOS/Linux)
echo $PATH
# Debería incluir algo como /usr/local/bin o ~/.npm-global/bin

# Para Windows
echo %PATH%
# Debería incluir el directorio bin global de npm
```

8. **Usa npx con la ruta completa**
   Si el comando aún no se encuentra, intenta usar npx con la ruta completa:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Verifica instalaciones conflictivas**

```bash
# Lista todos los paquetes instalados globalmente
npm list -g --depth=0

# Elimina cualquier instalación global conflictiva
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Luego reinstala
npm install -g intlayer
```

10. **Verifica las versiones de Node.js y npm**
    Asegúrate de usar versiones compatibles:

```bash
node --version
npm --version
```

    Si estás usando una versión desactualizada, considera actualizar Node.js y npm.

11. **Verifica problemas de permisos**  
    Si estás obteniendo errores de permisos:

    ```bash
    # Para sistemas basados en Unix
    sudo npm install -g intlayer

    # O cambia el directorio predeterminado de npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Agrega a tu ~/.profile o ~/.bashrc:
    export PATH=~/.npm-global/bin:$PATH
    ```
