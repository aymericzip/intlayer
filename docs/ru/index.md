# Документация Intlayer

Добро пожаловать в официальную документацию **Intlayer**! Здесь вы найдете все, что вам нужно для интеграции, настройки и освоения Intlayer для всех ваших нужд в области интернационализации (i18n) — независимо от того, работаете ли вы с **Next.js**, **React**, **Vite**, **Express** или другой средой JavaScript.

Intlayer предлагает гибкий, современный подход к переводу вашего приложения. Наша документация проведет вас от установки и настройки до продвинутых функций, таких как **перевод на основе ИИ**, **определения TypeScript** и поддержка **серверных компонентов** — позволяя вам создать бесшовный многоязычный опыт.

---

## Начало работы

- **[Введение](https://github.com/aymericzip/intlayer/blob/main/docs/ru/introduction.md)**  
  Получите представление о том, как работает Intlayer, его основных функциях и почему это изменяет правила игры для i18n.

- **[Как работает Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/how_works_intlayer.md)**  
  Погружение в архитектурный дизайн и изучение того, как Intlayer обрабатывает всё — от декларации контента до доставки переводов.

- **[Настройка](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md)**  
  Настройте Intlayer в соответствии с потребностями вашего проекта. Изучите варианты промежуточного ПО, структуры директорий и расширенные настройки.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)**  
  Управляйте контентом и переводами с помощью нашего инструмента командной строки. Узнайте, как загружать и выгружать контент, автоматизировать переводы и многое другое.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md)**  
  Упростите сотрудничество с непрофессионалами и усиливайте ваши переводы с помощью ИИ — прямо в нашей бесплатной интуитивно понятной CMS.

---

## Основные концепции

### Декларация контента

Организуйте ваш многоязычный контент близко к вашему коду, чтобы все оставалось последовательным и поддерживаемым.

- **[Начало работы](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md)**  
  Узнайте основы декларации вашего контента в Intlayer.

- **[Перевод](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/translation.md)**  
  Поймите, как генерируются, хранятся и используются переводы в вашем приложении.

- **[Перечисление](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/enumeration.md)**  
  Легко управляйте повторяющимися или фиксированными наборами данных на разных языках.

- **[Получение функций](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/function_fetching.md)**  
  Узнайте, как динамически получать контент с помощью пользовательской логики, соответствующей процессу вашего проекта.

---

## Среды и интеграции

Мы разработали Intlayer с учетом гибкости, предлагая бесшовную интеграцию с популярными фреймворками и инструментами сборки:

- **[Intlayer с Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)**
- **[Intlayer с Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md)**
- **[Intlayer с Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_page_router.md)**
- **[Intlayer с React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)**
- **[Intlayer с Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md)**
- **[Intlayer с Express](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_express.md)**

Каждое руководство по интеграции включает лучшие практики для использования функций Intlayer — таких как **серверная рендеринга**, **динамическая маршрутизация** или **клиентская рендеринга** — так что вы можете поддерживать быстрое, SEO-дружественное и высокомасштабируемое приложение.

---

## Пакеты

Модульный дизайн Intlayer предлагает специализированные пакеты для конкретных сред и нужд:

### `intlayer`

Основные утилиты для настройки и управления вашей i18n установкой.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

Используйте Intlayer в приложениях на основе **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/express-intlayer/t.md)**  
  Минимальный, простой помощник по переводу для ваших серверных маршрутов и представлений.

### `react-intlayer`

Улучшите ваши **React** приложения мощными хуками:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Бесшовная интеграция с **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useLocale.md)**

---

## Дополнительные ресурсы

- **[Блог: Intlayer и i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_i18next.md)**  
  Узнайте, как Intlayer дополняет и сравнивается с популярной библиотекой **i18next**.

- **[Прямой урок на YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Посмотрите всеобъемлющую демонстрацию и узнайте, как интегрировать Intlayer в реальном времени.

---

## Участие и обратная связь

Мы ценим силу открытого кода и развиваемое сообществом развитие. Если вы хотите предложить улучшения, добавить новое руководство или исправить любые проблемы в нашей документации, не стесняйтесь отправлять Pull Request или открывать проблему в нашем [репозитории на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Готовы переводить ваше приложение быстрее и эффективнее?** Погружайтесь в нашу документацию, чтобы начать использовать Intlayer уже сегодня. Испытайте надежный, упрощенный подход к интернационализации, который держит ваш контент организованным и вашу команду более продуктивной.

Счастливого перевода!  
— Команда Intlayer
