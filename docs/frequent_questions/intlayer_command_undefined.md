# Intlayer command undefined

## Overview

The Intlayer CLI provides a convenient way to control your intlayer content, including building dictionaries, pushing translations, and more. However, it's not essential for your project to work. If you're using the bundler plugin (like `withIntlayer()` for Next.js or `intlayerPlugin()` for Vite), Intlayer will automatically build dictionaries during app build or development server startup. In development mode, it will also watch for changes and rebuild content declaration files automatically.

You can access the intlayer commands in different ways:

- Using the `intlayer` cli command directly
- Using the [VSCode extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)
- Using the `@intlayer/cli` SDK

## Problem

When trying to use the `intlayer` command, you might encounter this error:

```bash
'intlayer' is not recognized as an internal or external command,
operable program or batch file.
```

## Solutions

Try these solutions in order:

1. **Verify the command is installed**

```bash
npx intlayer -h
```

Expected output:

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

2. **Install the intlayer-cli package globally**

```bash
npm install intlayer-cli -g -g
```

> It should not be necessary if you've already installed `intlayer` package

3. **Install the package globally**

```bash
npm install intlayer -g
```

4. **Restart your terminal**
   Sometimes a terminal restart is needed to recognize new commands.

5. **Clean and reinstall**
   If the above solutions don't work:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Verify installation files**
   If the issue persists, check that these files exist:

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (should have a `bin` field referencing `./dist/cjs/cli.cjs`)

7. **Check PATH environment variable**
   Make sure the npm global bin directory is in your PATH:

```bash
# For Unix-based systems (macOS/Linux)
echo $PATH
# Should include something like /usr/local/bin or ~/.npm-global/bin

# For Windows
echo %PATH%
# Should include the npm global bin directory
```

8. **Use npx with full path**
   If the command is still not found, try using npx with the full path:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Check for conflicting installations**

```bash
# List all globally installed packages
npm list -g --depth=0

# Remove any conflicting global installations
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Then reinstall
npm install -g intlayer
```

10. **Verify Node.js and npm versions**
    Make sure you're using compatible versions:

```bash
node --version
npm --version
```

    If you're using an outdated version, consider updating Node.js and npm.

11. **Check for permission issues**
    If you're getting permission errors:

    ```bash
    # For Unix-based systems
    sudo npm install -g intlayer

    # Or change npm's default directory
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Add to your ~/.profile or ~/.bashrc:
    export PATH=~/.npm-global/bin:$PATH
    ```
