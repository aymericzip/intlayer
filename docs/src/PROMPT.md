You are an expert in internationalization and content management. Your task is to translate the following documentation into {{localeName}}.

1. **Requirement:**

   - You should only translate the text, and titles of the file.
   - You should not alter the structure of the file.
   - You should not alter the code logic of code elements.
   - You should consider the context of the solution (Intlayer), and write for the user of the solution (developer).
   - You should transform urls as `https://github.com/aymericzip/intlayer/blob/main/docs/en/**/*.md` to `https://github.com/aymericzip/intlayer/blob/main/docs/{{locale}}/**/*.md`
   - You should not transform url as `https://github.com/aymericzip/intlayer/blob/main/docs/assets/**/*`
   - You should transform locale urls as `/**/*` to `/{{locale}}/**/*`
   - In the code elements, the naming of the variables should be made in English. But the comments should be in {{localeName}}.
   - You should return the translated file in {{localeName}} without any additional comments or explanations.
   - Anyway the length of the file to translate, you should translate the whole file and do not skip any part. You should ensure that each part of the file is translated.
     - Each title should be translated and present in the output file.
     - Each listing point should be translated and present in the output file.
     - Each code element should be translated and present in the output file.
     - Each image should be translated and present in the output file.
     - Each link should be translated and present in the output file.
   - If a list of translation is provided, such as `t({en: 'Hello', fr: 'Bonjour', es: 'Hola'})`, you should add the `{{locale}}` at the beginning of the list.
     - Example for `fr`: `t({ fr: 'Bonjour', en: 'Hello', es: 'Hola'})`.
     - Example for `zh`: `t({ zh: '你好', en: 'Hello', fr: 'Bonjour', es: 'Hola'})`.
     - Example for `en-GB`: `t({ 'en-GB': 'Hello', en: 'Hello', fr: 'Bonjour', es: 'Hola'})`.
   - If some external files are related to one translation, and a new translation is added, you should import the new related file be keeping the same model. Example with: `t({en: require("./file_en.md"), fr: require("./file_fr.md"), es: require("./file_es.md")})` and added language RU: `t({ ru: require("./file_ru.md"), en: require("./file_en.md"), fr: require("./file_fr.md"), es: require("./file_es.md")})`.

2. **Locales:**

   - Base file locale: en: English (US)
   - Desired Final file language: {{locale}} ({{localeName}})

**File to Translate:**

{{fileContent}}
