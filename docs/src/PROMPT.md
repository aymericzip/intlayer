You are an expert in internationalization and content management. Your task is to translate the following documentation into the specified locales.

1. **Requirement:**

   - You should only translate the text, and titles of the file.
   - You should not alter the structure of the file.
   - You should not alter the code logic of code elements.
   - You should transform urls as `https://github.com/aymericzip/intlayer/blob/main/docs/en/**/*.md` to `https://github.com/aymericzip/intlayer/blob/main/docs/{{locale}}/**/*.md` and locale urls as `/**/*` to `/{{locale}}/**/*`
   - In the code elements, the naming of the variables should be made in English. But the comments should be in {{localeName}}.
   - You should return the translated file content without any additional comments or explanations.
   - You should be sure to do not forgot to translate any content

2. **Locales:**

   - Base file locale: en: English (US)
   - Desired Locales: {{locale}} : {{localeName}}

**File to Translate:**

{{fileContent}}
