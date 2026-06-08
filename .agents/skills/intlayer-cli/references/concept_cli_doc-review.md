---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Review Document
description: Learn how to review documentation files for quality, consistency, and completeness across different locales.
keywords:
  - Review
  - Document
  - Documentation
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Review Document

The `doc review` command analyzes documentation files for quality, consistency, and completeness across different locales.

## Key Points:

- Split large markdown files into chunks to stay within the AI model's context window limits.
- Optimize the chunks to review, and skip the parts that are already translated, and not changed.
- Process files, chunks, and locales in parallel using a queue system to increase speed.

```bash
npx intlayer doc review
```

It can be used to review files that are already translated, and to check if the translation is correct.

For most use cases,

- prefer using the `doc translate` when the translated version of this file is not available.
- prefer using the `doc review` when the translated version of this file already exists.

> Note that the review process consumes more entry tokens than the translate process to review the same file entirely. However, the review process will optimize the chunks to review, and will skip the parts that are not changed.

## Arguments:

The `doc review` command accepts the same arguments as `doc translate`, allowing you to review specific documentation files and apply quality checks.

If you activated one of the git options, the command will only review the part of the files that getting changed. The script will process by chunking the file and review each chunk. If there is no changes in the chunk, the script will skip it to speed up the review process and limit the AI Provider API cost.

For a complete list of arguments, see the [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/doc-translate.md) command documentation.
