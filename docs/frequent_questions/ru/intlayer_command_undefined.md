---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Команда Intlayer не определена
description: Узнайте, как исправить ошибку "intlayer command undefined".
keywords:
  - intlayer
  - команда
  - не определена
  - ошибка
  - vscode
  - расширение
  - плагин
  - фреймворк
  - next.js
  - vite
slugs:
  - doc
  - faq
  - intlayer-command-undefined
---

# Команда Intlayer не определена

## Обзор

Интерфейс командной строки Intlayer предоставляет удобный способ управления вашим контентом intlayer, включая создание словарей, загрузку переводов и многое другое. Однако он не является обязательным для работы вашего проекта. Если вы используете плагин для сборщика (например, `withIntlayer()` для Next.js или `intlayer()` для Vite), Intlayer автоматически создаст словари во время сборки приложения или запуска сервера разработки. В режиме разработки он также будет отслеживать изменения и автоматически перестраивать файлы деклараций контента.

Вы можете получить доступ к командам intlayer разными способами:

- Используя команду CLI `intlayer` напрямую
- Используя [расширение VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)
- Используя SDK `@intlayer/cli`

## Проблема

При попытке использовать команду `intlayer` вы можете столкнуться с этой ошибкой:

```bash
'intlayer' не распознана как внутренняя или внешняя команда,
исполняемая программа или пакетный файл.
```

## Решения

Попробуйте следующие решения по порядку:

1. **Проверьте, что команда установлена**

```bash
npx intlayer -h
```

Ожидаемый вывод:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            вывод версии
    -h, --help               показать справку по команде

Commands:
    dictionary|dictionaries  операции со словарями
    configuration|config     операции с конфигурацией
    help [command]           показать справку по команде
```

2. **Установите пакет intlayer-cli глобально**

```bash
npm install intlayer-cli -g -g
```

> Это не должно быть необходимо, если вы уже установили пакет `intlayer`

3. **Установите пакет глобально**

```bash
npm install intlayer -g
```

4. **Перезапустите терминал**
   Иногда для распознавания новых команд требуется перезапуск терминала.

5. **Очистите и переустановите**
   Если предыдущие решения не помогли:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Проверьте файлы установки**
   Если проблема сохраняется, убедитесь, что существуют следующие файлы:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (должно содержать поле `bin`, ссылающееся на `./dist/cjs/cli.cjs`)

7. **Проверьте переменную окружения PATH**
   Убедитесь, что глобальный каталог npm bin включён в ваш PATH:

```bash
# Для систем на базе Unix (macOS/Linux)
echo $PATH
# Должно включать что-то вроде /usr/local/bin или ~/.npm-global/bin

# Для Windows
echo %PATH%
# Должно включать каталог глобальных бинарных файлов npm
```

8. **Используйте npx с полным путем**
   Если команда по-прежнему не найдена, попробуйте использовать npx с полным путем:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Проверьте наличие конфликтующих установок**

```bash
# Вывести список всех глобально установленных пакетов
npm list -g --depth=0

# Удалить любые конфликтующие глобальные установки
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Затем переустановить
npm install -g intlayer
```

10. **Проверьте версии Node.js и npm**
    Убедитесь, что используете совместимые версии:

```bash
node --version
npm --version
```

    Если у вас устаревшая версия, рассмотрите возможность обновления Node.js и npm.

11. **Проверьте проблемы с правами доступа**
    Если вы получаете ошибки, связанные с правами доступа:

    ```bash
    # Для систем на базе Unix
    sudo npm install -g intlayer

    # Или измените каталог по умолчанию для npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Добавьте в ваш ~/.profile или ~/.bashrc:
    export PATH=~/.npm-global/bin:$PATH
    ```
