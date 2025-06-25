# Intlayer Документация

Добро пожаловать в официальную документацию **Intlayer**! Здесь вы найдете все, что нужно для интеграции, настройки и освоения Intlayer для всех ваших нужд в интернационализации (i18n), будь то работа с **Next.js**, **React**, **Vite**, **Express** или другой средой JavaScript.

Intlayer предлагает гибкий, современный подход к переводу вашего приложения. Наша документация проведет вас от установки и настройки до продвинутых функций, таких как **перевод с использованием ИИ**, определения **TypeScript** и поддержка **серверных компонентов**, позволяя создать бесшовный, многоязычный опыт.

---

## Начало работы

- **[Введение](https://github.com/aymericzip/intlayer/blob/main/docs/ru/introduction.md)**  
  Получите общее представление о работе Intlayer, его основных функциях и о том, почему это революционное решение для i18n.

- **[Как работает Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/how_works_intlayer.md)**  
  Погрузитесь в архитектурный дизайн и узнайте, как Intlayer обрабатывает все, от декларации контента до доставки перевода.

- **[Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md)**  
  Настройте Intlayer под нужды вашего проекта. Изучите параметры middleware, структуру директорий и продвинутые настройки.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)**  
  Управляйте контентом и переводами с помощью нашей командной строки. Узнайте, как загружать и выгружать контент, автоматизировать переводы и многое другое.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md)**  
  Упростите сотрудничество с недевелоперами и используйте мощь ИИ для перевода прямо в нашем бесплатном, интуитивно понятном CMS.

---

## Основные концепции

### Словарь

Организуйте ваш многоязычный контент рядом с вашим кодом, чтобы все оставалось последовательным и удобным для поддержки.

- **[Начало работы](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md)**  
  Узнайте основы декларации контента в Intlayer.

- **[Перевод](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/translation.md)**  
  Поймите, как переводы создаются, хранятся и используются в вашем приложении.

- **[Перечисления](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/enumeration.md)**  
  Легко управляйте повторяющимися или фиксированными наборами данных на разных языках.

- **[Функциональный запрос](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/function_fetching.md)**  
  Узнайте, как динамически запрашивать контент с помощью пользовательской логики, соответствующей рабочему процессу вашего проекта.

---

## Среды и интеграции

Мы разработали Intlayer с учетом гибкости, предлагая бесшовную интеграцию с популярными фреймворками и инструментами сборки:

- **[Intlayer с Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)**
- **[Intlayer с Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md)**
- **[Intlayer с Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_page_router.md)**
- **[Intlayer с React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)**
- **[Intlayer с Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md)**
- **[Intlayer с Express](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_express.md)**

Каждое руководство по интеграции включает лучшие практики использования функций Intlayer, таких как **рендеринг на стороне сервера**, **динамическая маршрутизация** или **рендеринг на стороне клиента**, чтобы вы могли поддерживать быстрое, SEO-дружественное и высокомасштабируемое приложение.

---

## Пакеты

Модульный дизайн Intlayer предлагает специализированные пакеты для конкретных сред и нужд:

### `intlayer`

Основные утилиты для настройки и управления вашей i18n конфигурацией.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslation](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getTranslation.md)**
- **[getEnumeration](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getEnumeration.md)**

### `express-intlayer`

Используйте Intlayer в приложениях на основе **Express**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/express-intlayer/t.md)**  
  Минимальный, простой помощник перевода для ваших серверных маршрутов и представлений.

### `react-intlayer`

Улучшите ваши приложения на **React** с помощью мощных хуков:

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

- **[Живой урок на YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Посмотрите подробную демонстрацию и узнайте, как интегрировать Intlayer в реальном времени.

---

## Участие и обратная связь

Мы ценим силу open-source и разработки, управляемой сообществом. Если вы хотите предложить улучшения, добавить новое руководство или исправить какие-либо ошибки в нашей документации, не стесняйтесь отправить Pull Request или открыть issue в нашем [репозитории GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Готовы переводить ваше приложение быстрее и эффективнее?** Погрузитесь в нашу документацию, чтобы начать использовать Intlayer уже сегодня. Испытайте надежный, упрощенный подход к интернационализации, который упорядочивает ваш контент и делает вашу команду более продуктивной.

Удачного перевода!  
, Команда Intlayer
