For docs

- Keep everything concise as possible
- Focus on final user point of view. Avoid mention of internal subtleties
- Don't use '—' char

If not explicitly mentioned, never use AI generation for translations using the scripts `translate` or `review` + `MODE = 'apply'`. Those will consume extra token no included in the plan. But you can use `review` + `MODE = 'synthesis' | 'synthesis'` to validate the doc consistency.

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

- `docs/docs/{locale}/introduction.md`
- `docs/blog/{locale}/introduction.md`
- `docs/frequent_questions/{locale}/introduction.md`
- `docs/legal/{locale}/introduction.md`
