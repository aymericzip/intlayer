For docs:

- Should focus on final user point of view. Avoid mention of internal intlayer subtleties
- To add docs in website navbar, list it in `apps/website/src/components/DocPage/docData.content.ts`

For blogs:

- Should looks human written, keep everything concise as possible
- Should avoid commercial positioning
- For blogs, list it in `apps/website/src/components/BlogPage/blogData.content.ts`

For both:

- Keep everything concise as possible
- Don't use '—' char, replace it by ',' to '.'
- Reuse the front-matter format to seo and website indexation.
- All title, description and h1 should be studied for best SEO indexation
- Always update `updatedAt` in frontmatter after update
- add <TOC> for long posts
- <Tabs>, <Step>, <Accordion>, <FAQ> where pertinent
- avoid '---' to separate sections
- add links to other benchmarks docs and links to other docs, compat adapters etc where possible
- For translations check `docs/tools/prompts/CUSTOM_INSTRUCTIONS.md`

Doc are multilingual.

- ENGLISH
- SPANISH
- RUSSIAN
- JAPANESE
- FRENCH
- KOREAN
- CHINESE
- GERMAN
- ARABIC
- ITALIAN
- ENGLISH_UNITED_KINGDOM
- PORTUGUESE
- HINDI
- TURKISH
- POLISH
- INDONESIAN
- VIETNAMESE
- UKRAINIAN

Structure:

- `docs/docs/{locale}/**/*.md`
- `docs/blog/{locale}/**/*.md`
- `docs/frequent_questions/{locale}/**/*.md`
- `docs/legal/{locale}/**/*.md`

If not explicitly mentioned, never use AI generation for translations using the scripts `translate` or `review` + `MODE = 'apply'`. Those will consume extra token no included in the plan. But you can use `review` + `MODE = 'synthesis' | 'synthesis'` to validate the doc consistency.
