You are an expert in internationalization, copy writing and content management. Your task is to audit the given dictionary. If the element is not declared, review it. If this element is missing, write it by considering the given context of the dictionary, and by following instructions.

**Instructions:**

1. **Terminology:**

- **Dictionary:** A dictionary is a is a file (.ts, .js or .json) that contains the multilingual declaration related to a specific content. A dictionary file is usually related to a specific component, or page or section of a website.
- **Tag:** A tag is attached to a dictionary and is used to group dictionary and harmonize them.
- **KeyPath** The KeyPath correspond to to the path to retrieve the targeted element from the `content` key of the dictionary file.

2.  **Locales:**

    - Required Locales: {{otherLocales}}

3.  **Audit Requirements:**

    - **Consistency:** Ensure that all keys have translations for all specified locales.
    - **Incoherence:** Ensure that all content is coherent and not misspelled.
    - **Missing Content:** Identify any missing translations and specify the expected content.
    - **Misplaced Content:** Detect if any translations are placed under incorrect keys.
    - **Type Compliance:** Verify that the content types match the declarations (e.g., strings, string arrays).

4.  **Modification Guidelines:**

    - **Return Only the Targeted Content:** Provide the updated targeted content as plain text without any markdown, additional comments or explanations.
    - **Consider the locale context:** If the targeted field correspond to a specific language, contains similar languages, as `zh` or `en-GB`, consider return the content in this specified language.
    - **Fix Incoherent Content:** If the content is inconsistent, misspelled, understandable, or contains errors, fix it by providing a more accurate content.
    - **Escape Special Characters:** If the content contain special characters, escape them using the appropriate escape sequence.
    - **Respect the tags instructions:** If the tags instructions are provided, ensure that the audited file adheres to them.

5.  **Example Scenario:**

    - **Example 1:**

      - **Input File:**

      ```typescript
      import { t, type Dictionary } from "intlayer";

      export default {
        key: "creative-work-structured-data",
        content: {
          audienceType: t({
            en: "Developers, Content Managers",
            fr: "Développeurs, Responsables de contenu",
            es: "",
          }),
        },
      } satisfies Dictionary;
      ```

      - **Input keyPath:**

        `[{type: "object", key: "audienceType"},{type: "translation", key: "es"}]`

      - **Expected Output:**

        Desarrolladores, Gestores de Contenido

    - **Example 2:**

      - **Input File:**

      ```typescript
      import { t, enu, type Dictionary } from "intlayer";

      const content = {
        key: "creative-work-structured-data",
        content: {
          en: {
            audienceType: t({
              en: "Developers, Content Managers",
              fr: "Développeurs, Responsables de contenu",
              es: "Desarrolladores, Gestores de Contenido",
            }),
          },
          audienceType: {
            object1: enu({
              "1": t({
                en: "Developes, _lln_ Managers",
                es: "Desarrolladores, Gestores de Contenido",
                fr: "Développeurs, Responsables de contenu",
              }),
              ">2": t({
                en: "Developers, Content Managers",
                es: "Desarrolladores, Gestores de Contenido",
                fr: "Here content thst make no sense and should be replaced",
              }),
            }),
          },
        },
      } satisfies Dictionary;
      ```

      - **Input target:**

      `[{type: "object", key: "audienceType"},{type: "enumeration", key: ">2"},{type: "translation", key: "es"}]`

      - **Expected Output:**

      Desarrolladores, Gestores de Contenido

      - **Input target:**

      `[{type: "object", key: "audienceType"},{type: "enumeration", key: "1"},{type: "translation", key: "fr"}]`

      - **Expected Output:**

      Développeurs, Responsables de contenu

**Application Context**

{{applicationContext}}

**Tags Instructions:**

{{tagsInstructions}}

**File to Audit:**

{{fileContent}}

**KeyPath:**

{{keyPath}}

**Expected Response:**

After auditing, provide only the targeted content as plain text without any Markdown or code block formatting. If no changes are needed, return the targeted content
