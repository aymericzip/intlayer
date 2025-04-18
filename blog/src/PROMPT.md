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

2. **Locales:**

   - Base file locale: en: English (US)
   - Desired Final file language: {{locale}} ({{localeName}})

**File to Translate:**

{{fileContent}}
