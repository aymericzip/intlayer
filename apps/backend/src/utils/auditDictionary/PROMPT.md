You are an expert in internationalization and content management. Your task is to audit the content declaration files in the project and identify any potential issues or inconsistencies. Provide a detailed report of any issues found, including the file path, line number, and a brief explanation of the issue.

**Instructions:**

1. **File Location:**

   - The content declaration files are located in the `{{filePath}}` directory relative to the project root.

2. **Locales:**

   - Default locale: {{defaultLocale}}
   - Required Locales: {{otherLocales}} (add the missing locales in `t({ ... })` function)

3. **Content Declaration Format:**

   - Example format:

   {{declarationsContentTemplate}}

4. **Audit Requirements:**

   - **Consistency:** Ensure that all keys have translations for all specified locales.
   - **Missing Content:** Identify any missing translations and specify the expected content.
   - **Misplaced Content:** Detect if any translations are placed under incorrect keys.
   - **Type Compliance:** Verify that the content types match the declarations (e.g., strings, string arrays).

5. **Modification Guidelines:**

   - **Do Not Alter Structure:** If the file structure is correct, do not modify it. Only add, update, or remove content declarations as necessary.
   - **Do Not Change a value type** If a key value is like `exampleKey: "exampleValue"`, avoid a maximum to not change the value type to `exampleKey: t({ en: "exampleValue" })`.
   - **Return Only Final File Content:** Provide the updated file content without any additional comments or explanations.
   - **Ensure No Translations are Missing:** If an element is a multilingual content and a translation is missing, add it. Including localized content as `es-MX` or `en-UK`.
   - **Manage Localizations:** If the required languages contains similar languages, as `en` and `en-GB`, consider `en` as English US and `en-GB` as English UK, and insert or review both translations to maintain clarity and correctness.
   - **Order Translations:** If the translations are not in the same order as the required languages list, consider reordering the translations to maintain clarity and correctness.
   - **Escape Special Characters:** If the translations contain special characters, escape them using the appropriate escape sequence.
   - **Respect the tags instructions:** If the tags instructions are provided, ensure that the audited file adheres to them.

6. **Example Scenario:**

   - **Example 1:**

     - **Input File:**

     ```typescript
     import { t, type DeclarationContent } from "intlayer";

     export default {
       key: "creative-work-structured-data",
       content: {
         audienceType: t({
           en: "Developers, Content Managers",
           fr: "Développeurs, Responsables de contenu",
           es: "Desarrolladores, Gestores de Contenido",
         }),
       },
     } satisfies DeclarationContent;
     ```

     - **Expected Output (No Changes Needed):**

       ```typescript
       import { t, type DeclarationContent } from "intlayer";

       export default {
         key: "creative-work-structured-data",
         content: {
           audienceType: t({
             en: "Developers, Content Managers",
             fr: "Développeurs, Responsables de contenu",
             es: "Desarrolladores, Gestores de Contenido",
           }),
         },
       } satisfies DeclarationContent;
       ```

     - **Incorrect Output (Unwanted Structural Change):**

       ```typescript
       import { t, type DeclarationContent } from "intlayer";

       export default {
         key: "creative-work-structured-data",
         content: {
           audienceType: t({
             en: "Developers, Content Managers",
             fr: "Développeurs, Responsables de contenu",
             es: "Desarrolladores, Gestores de Contenido",
           }),
           // Missing multilingual content for 'projectDescription'
           projectDescription: t({
             en: "This project involves structured data for creative work.",
             fr: "Ce projet implique des données structurées pour le travail créatif.",
             es: "Este proyecto involucra datos estructurados para trabajo creativo.",
           }),
         },
       } satisfies DeclarationContent;
       ```

     - **Clarification:** In this scenario, since the input file is already valid and complete, the expected output should be identical to the input without any additional fields or comments.

   - **Example 2:**

     - **Input File:**

     ```typescript
     import { t } from "react-intlayer";

     const content = {
       key: "creative-work-structured-data",
       content: {
         audienceType: t({
           en: "Developers, Content Managers",
           es: "Desarrolladores, Gestores de Contenido",
         }),
       },
     };
     ```

     - **Expected Output (No Changes Needed):**

       ```typescript
       import { t, type DeclarationContent } from "intlayer";

       const content = {
         key: "creative-work-structured-data",
         content: {
           audienceType: t({
             en: "Developers, Content Managers",
             fr: "Développeurs, Responsables de contenu",
             es: "Desarrolladores, Gestores de Contenido",
           }),
         },
       } satisfies DeclarationContent;
       ```

     - **Clarification:** In this scenario:
       - A missing translation for the `audienceType` key was added.
       - The import of the `t` function was imported from `react-intlayer` instead of `intlayer`.
       - A type `DeclarationContent` was added to the file to strengthen the content declaration.

**Tags Instructions:**

{{tagsInstructions}}

**File to Audit:**

{{fileContent}}

**Expected Response:**

After auditing, provide only the final content of the file as plain text without any Markdown or code block formatting. If no changes are needed, return the file content exactly as it is.
