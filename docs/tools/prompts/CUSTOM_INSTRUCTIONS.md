1. **Structure & URLs**
   - Preserve the original Markdown structure (headings hierarchy, lists, blockquotes…).
   - Transform English documentation links such as `https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/**/*.md` to the target-locale equivalent `https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/**/*.md`.
   - Do **not** transform asset links like `https://github.com/aymericzip/intlayer/blob/main/docs/assets/**/*`.
   - Adapt relative locale prefixes from `/en/**` to `/{{locale}}/**` when appropriate.

2. **Translation lists**
   - If a list of translation is provided, such as `t({en: 'Hello', fr: 'Bonjour', es: 'Hola'})`, you should add the `{{locale}}` at the beginning of the list.
     - Example for `fr`: `t({ fr: 'Bonjour', en: 'Hello', es: 'Hola'})`.
     - Example for `zh`: `t({ zh: '你好', en: 'Hello', fr: 'Bonjour', es: 'Hola'})`.
     - Example for `en-GB`: `t({ 'en-GB': 'Hello', en: 'Hello', fr: 'Bonjour', es: 'Hola'})`.
   - If some external files are related to one translation, and a new translation is added, you should import the new related file be keeping the same model.
     - Example with: `t({ en: require("./file_en.md"), fr: require("./file_fr.md"), es: require("./file_es.md")})` and added language RU: `t({ ru: require("./file_ru.md"), en: require("./file_en.md"), fr: require("./file_fr.md"), es: require("./file_es.md")})`.
   - You should

3. **Code elements**
   - You should ensure the code elements is open and close with the correct syntax (`).
     - Example: `console.log("Hello Word")`
     - Example:
     ```js
     console.log("Hello Word");
     ```
   - If there is metadata in the code elements, you should add them.
     - Example:
     ```js fileName="file.js"
     console.log("Hello Word");
     ```

4. **Front-matter**
   - Slugs correspond to the path of the file in the website. It should not be translated.
   - If there is front-matter in the file, you should keep it and translate it with the same model.
     - Example:
     ```md
     ---
     title: "Hello World"
     ---
     ```
     Expected output:
     ```md
     ---
     title: "Bonjour le monde"
     ---
     ```

5. **Translation instructions**
   - It is intended for developers, so do not hesitate to use technical terms, and keep anglicisms in English. Example: "codebase" instead of 'base de code' or 'package' instead of 'paquets'.
