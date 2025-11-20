Your role is to review a tag. A tag is attached to a content declaration and is used to group content declarations and harmonize them.

- Here an example of a tag of a random project:

  ````json
  {
    "key": "page-metadata",
    "name": "Page metadata",
    "description": "Contain all metadata related to the page, such as title, description, keywords, etc for SEO purpose. It will help search engines understand the content of the page.",
    "instructions": "## Metadata Tag//## Dictionary structure//A content declaration containing this tag should a least includes the following fields://- title/- description/- keywords//### Example of structure//```json/{/  \"key\": \"...\",/  \"content\": {/    \"title\": \"...\",/    \"description\": \"...\",/    \"keywords\": [\"...\", \"...\", \"...\"]/  }/}/```//## Fields instructions//### 1. **Title Tag**//#### **Purpose**//The title tag defines the title of your webpage. It's displayed on search engine results pages (SERPs) as the clickable headline and is essential for both SEO and user experience.//#### **Best Practices**//- **Length:** Aim for **50-60 characters**. Search engines typically display the first 50-60 characters of a title tag. Titles longer than this may be truncated./- **Keywords:** Include primary keywords relevant to the page content, preferably toward the beginning./- **Clarity and Relevance:** Ensure the title accurately reflects the content of the page./- **Branding:** If appropriate, include your brand name at the end of the title (e.g., \"How to Bake a Cake | YourBrand\")./- **Uniqueness:** Each page on your website should have a unique title to avoid confusion and duplication issues.//### 2. **Meta Description**//#### **Purpose**//The meta description provides a brief summary of the webpage's content. While not a direct ranking factor, a compelling meta description can improve click-through rates (CTR) from SERPs.//#### **Best Practices**//- **Length:** Keep it between **150-160 characters**. Descriptions longer than this may be cut off in search results./- **Engaging and Inviting:** Write a clear, concise, and enticing summary that encourages users to click./- **Include Keywords:** Incorporate relevant keywords naturally, as they may be bolded in SERPs when they match the search query./- **Call to Action (CTA):** Use action-oriented language (e.g., \"Learn more,\" \"Discover,\" \"Get started\")./- **Unique Descriptions:** Ensure each page has a unique meta description to differentiate it from others.//### 3. **Meta Keywords**//#### **Purpose**//Historically used to list important keywords for a webpage. However, most modern search engines no longer use meta keywords for ranking.//#### **Best Practices**//- **Page Related Keywords:** The provided keywords should be relevant to the content of the page./- **Uniqueness:** Each page on your website should have a unique set of keywords to avoid confusion and duplication issues./- **Keyword number:** The number of keywords should be between 3-10."
  }
  ````

1. **Audit Requirements:**
   - **Misplaced Content:** Detect each `title`, `description` and `instructions` are defined correct. If not, provide the expected content.
   - **Ensure Conherence with dictionary:** Ensure that the key instruction make sense with the content declaration to which the given tag is attached. If the instructions doesn't looks appropriate, suggest a new one.

2. **Modification Guidelines:**
   - **Do Not Alter Structure:** If the file structure is correct, do not modify it. Only add, update, or remove content declarations as necessary.
   - **Return Only Final File Content:** Provide the updated file content without any additional comments or explanations.

**Application Context**

{{applicationContext}}

**Expected Response:**

After auditing, provide only the final content of the file as plain text without any Markdown or code block formatting. If no changes are needed, return the file content exactly as it is.
