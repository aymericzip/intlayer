---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Команда intlayer не визначена
description: Дізнайтеся, як виправити помилку «команда intlayer не визначена».
keywords:
  - intlayer
  - command
  - undefined
  - error
  - vscode
  - extension
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - intlayer-command-undefined
---

# Команда intlayer не визначена

## Огляд

Intlayer CLI надає зручний спосіб керування вашим вмістом intlayer, включно зі збіркою словників, відправкою перекладів та іншим. Однак він не є обов'язковим для роботи вашого проєкту. Якщо ви використовуєте bundler-плагін (наприклад, `withIntlayer()` для Next.js або `intlayer()` для Vite), Intlayer автоматично збирає словники під час збірки додатку або запуску dev-сервера. У режимі розробки він також відслідковує зміни та автоматично перебудовує файли декларацій вмісту.

Ви можете отримати доступ до команд intlayer різними способами:

- Використовуючи CLI-команду `intlayer` безпосередньо
- Використовуючи [розширення VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- Використовуючи SDK `@intlayer/cli`

## Проблема

Коли ви намагаєтеся використати команду `intlayer`, ви можете зіткнутися з цією помилкою:

```bash
'intlayer' is not recognized as an internal or external command,
operable program or batch file.
```

## Рішення

Спробуйте ці рішення в порядку:

1. **Перевірте, що команда встановлена**

```bash
npx intlayer -h
```

Очікуваний вивід:

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

2. **Встановіть пакет intlayer-cli глобально**

```bash
npm install intlayer-cli -g -g
```

> Це не має бути необхідним, якщо ви вже встановили пакет `intlayer`

3. **Встановіть пакет глобально**

```bash
npm install intlayer -g
```

4. **Перезапустіть термінал**
   Іноді потрібно перезапустити термінал, щоб він розпізнав нові команди.

5. **Очистіть і перевстановіть**
   Якщо наведені вище рішення не допомогли:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Перевірте файли встановлення**
   Якщо проблема зберігається, перевірте, що існують такі файли:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (має містити поле `bin`, що посилається на `./dist/cjs/cli.cjs`)

7. **Перевірте змінну середовища PATH**
   Переконайтеся, що директорія глобальних bin-файлів npm присутня у вашому PATH:

```bash
# Для Unix-подібних систем (macOS/Linux)
echo $PATH
# Має містити щось на кшталт /usr/local/bin або ~/.npm-global/bin

# Для Windows
echo %PATH%
# Має містити каталог глобальних бінарних файлів npm
```

8. **Use npx with full path**
   If the command is still not found, try using npx with the full path:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Check for conflicting installations**

```bash
# Перелічіть усі глобально встановлені пакети
npm list -g --depth=0

# Видаліть будь-які конфліктні глобальні встановлення
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Потім перевстановіть
npm install -g intlayer
```

10. **Verify Node.js and npm versions**
    Make sure you're using compatible versions:

```bash
node --version
npm --version
```

    If you're using an outdated version, consider updating Node.js and npm.

11. **Перевірте проблеми з дозволами**
    Якщо ви отримуєте помилки доступу:

    ```bash
    # Для Unix-подібних систем
    sudo npm install -g intlayer

    # Або змініть каталог за замовчуванням для npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Додайте в ваш ~/.profile або ~/.bashrc:
    export PATH=~/.npm-global/bin:$PATH
    ```
