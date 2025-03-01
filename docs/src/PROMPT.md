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
   - You should return the translated file content without any additional comments or explanations.
   - Anyway the length of the file to translate, you should translate the whole file, and ensure that each part of the file is translated.
   - You should be sure to do not forgot to translate any content in {{localeName}}.
   - If a list of translation is provided, such as `t({en: 'Hello', fr: 'Bonjour', es: 'Hola'})`, and `{{locale}}:` is not present in the list, you should add the {{locale}} to the list.
     - Example for `fr`: `t({en: 'Hello', fr: 'Bonjour', es: 'Hola'})`.
     - Example for `zh`: `t({en: 'Hello', fr: 'Bonjour', es: 'Hola', zh: '你好'})`.

2. **Locales:**

   - Base file locale: en: English (US)
   - Desired Final file language: {{locale}} ({{localeName}})

**File to Translate:**

{{fileContent}}
