Your role is to describe a content declaration.

1. **Terminology:**

- **Dictionary:** A content declaration is a is a file (.ts, .js or .json) that contains the multilingual declaration related to a specific content. A content declaration file is usually related to a specific component, or page or section of a website.
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

Correct this fields if they are misspelled or do not match the expected content, and / or complete missing title / description / tags.

**Application Context**

{{applicationContext}}

**List of existing Tags:**

Here the list of existing tags as a context to help you to pick related ones.

{{tags}}
