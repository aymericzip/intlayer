# SEO & I18n: Полное руководство по созданию многоязычного веб-сайта

Хотите охватить больше пользователей по всему миру? Сделать ваш веб-сайт многоязычным — один из лучших способов расширить вашу аудиторию и улучшить SEO (поисковую оптимизацию). В этом блоге мы разберём основы международного SEO — часто называемого **i18n** (сокращение от «интернационализация») — простыми и понятными терминами. Вы узнаете о ключевых решениях, которые нужно принять, о том, как использовать технические элементы, такие как `hreflang`, и почему инструменты, такие как **Intlayer**, могут упростить ваши многоязычные проекты Next.js.

---

## 1. Что значит сделать ваш веб-сайт многоязычным?

Многоязычный веб-сайт предлагает свой контент на более чем одном языке. Например, у вас может быть английская версия (`example.com/en/`), французская версия (`example.com/fr/`) и испанская версия (`example.com/es/`). Этот подход позволяет поисковым системам отображать правильную языковую версию пользователям в зависимости от их предпочтений или географического местоположения.

Когда вы делаете это правильно, вы создаёте гораздо более удобный для пользователей опыт для неанглоговорящих пользователей — что приводит к лучшему взаимодействию, более высоким коэффициентам конверсии и улучшенному SEO в разных регионах.

---

## 2. Выбор правильной структуры URL

Если вы решите иметь несколько языковых версий, вам понадобится ясный и последовательный способ организации URL вашего сайта. У каждого языка (или региона) должен быть свой уникальный «адрес» в интернете. Ниже приведены три распространённых способа структурирования многоязычных веб-сайтов:

1. Доменные имена с кодом страны (ccTLD)

   - Пример: `example.fr`, `example.de`
   - **Плюсы:** Является сильным сигналом для поисковых систем о том, какой стране целевой контент (например, `.fr` = Франция).
   - **Минусы:** Управление несколькими доменами может быть дороже и сложнее.

2. **Субдомены**

   - **Пример:** `fr.example.com`, `de.example.com`
   - **Плюсы:** Каждый язык «живет» на своем собственном субдомене, что не очень сложно добавлять или удалять языки.
   - **Минусы:** Поисковые системы иногда рассматривают субдомены как отдельные сайты, что может размывать авторитет вашего основного домена.

3. **Подкаталоги (подпапки)**
   - **Пример:** `example.com/fr/`, `example.com/de/`
   - **Плюсы:** Удобно управлять, и весь трафик направляется на один основной домен.
   - **Минусы:** Не так сильно сигнализирует о локальном SEO, как ccTLD (хотя это все равно очень эффективно, если сделать правильно).

> **Совет:** Если у вас глобальный бренд и вы хотите упростить вещи, подкаталоги часто работают лучше. Если вы нацелены только на одну или две основные страны и хотите действительно выделить каждую из них, ccTLD может быть тем, что вам нужно.

---

## 3. Овладение целевым языком с помощью Hreflang

### 3.1. Что такое Hreflang?

Когда у вас есть идентичный или очень похожий контент на нескольких языках, поисковые системы, такие как Google, могут запутаться о том, какую версию отображать пользователю. **Hreflang** — это HTML-атрибут, который сообщает поисковым системам, какой язык (и регион) предназначен для данной страницы и какие страницы на альтернативных языках/регионах существуют.

### 3.2. Почему это важно?

1. Это предотвращает проблемы с **дублирующимся контентом** (когда поисковые системы думают, что вы публикуете один и тот же контент несколько раз).
2. Это гарантирует, что **французские пользователи видят французскую версию**, **испанские пользователи видят испанскую версию** и так далее.
3. Это улучшает общий пользовательский опыт, что означает лучшее взаимодействие и более высокий рейтинг SEO.

### 3.3. Как использовать Hreflang в `<head>` тегах

В вашем HTML вы добавите нечто подобное:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr" />
<link rel="alternate" hreflang="es" href="https://example.com/es" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en" />
```

- **`hreflang="en"`**: Указывает на английскую версию страницы.
- **`hreflang="fr"`**: Указывает на французскую версию страницы.
- **`hreflang="es"`**: Указывает на испанскую версию страницы.
- **`hreflang="x-default"`**: «Запасной» язык или URL по умолчанию, когда ни один из других языков не соответствует предпочтениям пользователя.

> **Быстрая заметка:** Убедитесь, что URL в этих тегах указывают непосредственно на конечную страницу, **без** дополнительных перенаправлений.

---

## 4. Делая контент по-настоящему «локальным» (не просто переведённым)

### 4.1. Локализация vs. Перевод

- **Перевод** означает преобразование текста с одного языка на другой слово в слово.
- **Локализация** означает адаптацию формата контента, валюты, измерений и культурных ссылок для местной аудитории. Например, если вы ориентируетесь на Францию, вы используете `€` вместо `You are an expert in internationalization and content management. Your task is to translate the following documentation into the specified locales.

1. **Requirement:**

   - You should only translate the text, and titles of the file.
   - You should not alter the structure of the file.
   - You should not alter the code logic of code elements.
   - You should transform urls as `https://github.com/aymericzip/intlayer/blob/main/docs/en/**/*.md` to `https://github.com/aymericzip/intlayer/blob/main/docs/ru/**/*.md`
   - You should not transform url as `https://github.com/aymericzip/intlayer/blob/main/docs/assets/**/*`
   - You should transform locale urls as `/**/*` to `/{{locale}}/**/*`
   - In the code elements, the naming of the variables should be made in English. But the comments should be in Русский.
   - You should return the translated file content without any additional comments or explanations.
   - You should be sure to do not forgot to translate any content

2. **Locales:**

   - Base file locale: en: English (US)
   - Desired Locales: {{locale}} : {{localeName}}

**File to Translate:**

, и, возможно, упоминайте местные праздники или специфичные для региона детали.

### 4.2. Избежание дублирующегося контента

Даже при хороших переводах поисковые системы могут пометить ваш сайт как дублирующийся контент, если он слишком похож по структуре. Hreflang помогает прояснить, что эти страницы не являются дубликатами, а являются языковыми вариациями.

---

## 5. Обязательные технические аспекты SEO

### 5.1. Заявления о языке (`lang` и `dir`)

В вашем HTML-теге вы можете объявить язык следующим образом:

```html
<html lang="en"></html>
```

- **`lang="en"`** помогает браузерам и вспомогательным технологиям понять язык.

Для языков справа налево (например, арабский или иврит) добавьте:

```html
<html dir="rtl" lang="ar"></html>
```

- **`dir="rtl"`** гарантирует, что направление текста будет справа налево.

### 5.2. Канонические теги

Канонические теги сообщают поисковым системам, какая страница является «оригинальной» или основной версией, если у вас есть почти дублирующие страницы. Обычно у вас будет **само-ссылающийся** канонический тег для многоязычных сайтов.

```html
<link rel="canonical" href="https://example.com/fr/produits" />
```

---

## 6. SEO на страницах на нескольких языках

### 6.1. Заголовки и мета-описания

- **Переведены и оптимизированы** для каждого языка.
- Проведите **исследование ключевых слов** для каждого рынка, потому что то, что ищут на английском, может различаться на французском или испанском.

### 6.2. Заголовки (H1, H2, H3)

Ваши заголовки должны отражать **местные фразы** или **ключевые слова** каждого региона. Не просто пропускайте ваш оригинальный английский заголовок через Google Translate и не называйте это законченной работой.

### 6.3. Изображения и медиа

- Локализуйте alt текст, подписи и названия файлов, если это необходимо.
- Используйте визуальные элементы, которые откликаются в целевой культуре.

---

## 7. Переключение языка и пользовательский опыт

### 7.1. Авто-перенаправление или селектор языка?

- **Авто-перенаправление** (на основе IP или настроек браузера) может быть удобным, но может отправить путешественников или пользователей VPN на неверную версию.
- **Селектор языка** часто более прозрачный — пользователи могут выбрать свой язык, если автоматически определённый неверен.

Вот упрощённый пример для Next.js + Intlayer:

```tsx
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const location = useLocation(); // Получите текущий URL путь. Пример: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Создайте URL с обновленным языком
    // Пример: /es/about с языком, установленным на испанский
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Обновите URL путь
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={locale === localeItem ? "x-default" : localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык на его собственном языке - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - например, Francés с установленным локалем Latin.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык на его собственном языке - например, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

### 7.2. Сохранение предпочтений

- Сохраните выбор языка пользователя в **cookie** или **сессии**.
- В следующий раз, когда они посетят ваш сайт, вы сможете автоматически загрузить их предпочтительный язык.

---

## 8. Создание местных обратных ссылок

**Обратные ссылки** (ссылки с внешних сайтов на ваш) остаются важным фактором SEO. Когда вы запускаете многоязычный сайт, учитывайте:

- Связывайтесь с местными новостными сайтами, блогами или форумами. Например, домен `.fr`, указывающий на ваш французский подкаталог, может повысить ваш местный французский SEO.
- Мониторинг обратных ссылок по языкам, чтобы увидеть, какие регионы требуют больше PR/маркетинговых усилий.

---

## 9. Мониторинг и поддержка вашего многоязычного сайта

### 9.1. Google Analytics и Search Console

- Сегментируйте свои данные для каждого языкового каталога (`/en/`, `/fr/`, `/es/`).
- Обратите внимание на **ошибки обхода**, **флаги дублирующегося контента** и **проблемы индексирования** на каждом языке.

### 9.2. Регулярные обновления контента

- Держите переводы свежими. Если вы изменяете описание продукта на английском, обновите его на французском, испанском и т. д.
- Устаревшие переводы могут сбивать с толку клиентов и подрывать доверие пользователей.

---

## 10. Общие ошибки, которых следует избегать

1. **Контент, переведённый машинным переводом**
   Автоматизированные переводы без проверки человеком могут содержать ошибки.

2. **Неправильные или отсутствующие теги `hreflang`**
   Поисковые системы не могут определить языковые версии самостоятельно, если ваши теги неполные или имеют неправильные коды.

3. **Переключение языка только с помощью JavaScript**
   Если Google не может проиндексировать уникальные URL для каждого языка, ваши страницы могут не появляться в правильных локальных результатах поиска.

4. **Игнорирование культурных нюансов**
   Шутка или фраза, которая работает в одной стране, может быть оскорбительной или бессмысленной в другой.

---

## Заключение

Создание многоязычного веб-сайта включает в себя гораздо больше, чем просто перевод текста. Это о структурировании URL эффективно, использовании тегов `hreflang`, чтобы помочь поисковым системам предлагать правильную версию, и обеспечении отличного пользовательского опыта — полного с локализованными визуальными элементами, селекторами языков и последовательной навигацией. Следуя этим лучшим практикам, вы получите успех на глобальных рынках, увеличите удовлетворенность пользователей и, в конечном итоге, получите лучшие результаты SEO в разных регионах.

Если вы используете Next.js (особенно App Router в Next.js 13+), инструмент, такой как **Intlayer**, может упростить этот процесс. Он помогает с чем угодно, от генерации локализованных карт сайта до автоматической обработки тегов `hreflang`, определения языка и многого другого — чтобы вы могли сосредоточиться на создании качественного многоязычного контента.

**Готовы выйти на международный уровень?** Начните реализовывать эти стратегии SEO и i18n прямо сейчас и наблюдайте, как новые посетители со всего мира открывают и взаимодействуют с вашим сайтом!