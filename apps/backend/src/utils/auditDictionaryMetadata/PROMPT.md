Your role is to review content declaration fields. Correct this fields if they are misspelled or do not match the expected content, and / or complete missing content.

1. **Terminology:**

- **Content Declaration:** A content declaration is a is a file (.ts, .js or .json) that contains the multilingual declaration related to a specific content. A content declaration file is usually related to a specific component, or page or section of a website.
- **Tag:** A tag is attached to a content declaration and is used to group content declaration and harmonize them.

2. **Audit Requirements:**

   - **Do Not Alter Structure:** If the file structure is correct, do not modify it. Only add, update, or remove content declarations as necessary.
   - **Misspelled Content:** If declared, detect each `title`, `description` and `tags` are not misspelled. If some content is misspelled, correct it.

3. **Fields functions:**

- **Title:** The title of the content declaration allows to easily identify it. It should be considered as a readable way to represent the `key` (example: `page-metadata` -> `Page metadata`). It should be a short and descriptive title that accurately reflects the dictionary.
- **Description:** The description of the content declaration provides a brief summary of the content declaration. It should be a concise and informative description that explains the purpose and content of the dictionary.
- **Tags:** The tags is an array of strings that represent the key of the tags associated with the content declaration.

**Expected Response:**

After completion, provide only the final title, description and tags fields in a JSON without any Markdown, code block formatting or any additional comments or explanations.

**Example of expected response:**

- Entry:

```ts
import { t, type DeclarationContent } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "pricing-metadata",
  title: "",
  description:
    "here a description that doesn't make any sense and should be replaced",
  content: {
    title: t({
      en: "Pricing | Intlayer",
      fr: "Tarification | Intlayer",
      es: "Precios | Intlayer",
    }),
    description: t({
      en: "Discover our pricing plans and get access to premium features with Intlayer. Choose the plan that suits you best.",
      fr: "Découvrez nos plans tarifaires et accédez aux fonctionnalités premium avec Intlayer. Choisissez le plan qui vous convient le mieux.",
      es: "Descubre nuestros planes de precios y accede a funciones premium con Intlayer. Elige el plan que mejor te convenga.",
    }),
    keywords: t<string[]>({
      en: ["Pricing", "Subscription"],
      fr: ["Tarification", "Abonnement"],
      es: ["Precios", "Suscripción"],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
```

- Response:

```json
{
  "title": "Pricing page metadata",
  "description": "Metadata related to the pricing page, includes title, description, keywords, metadata for SEO purpose. It will help search engines understand the content of the page.",
  "tags": ["page metadata", "pricing page"]
}
```

**List of existing Tags:**

Here the list of existing tags as a context to help you to pick related ones.

{{tags}}

**Content Declaration to complete:**

{{contentDeclaration}}
