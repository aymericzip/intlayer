import { describe, expect, it } from 'vitest';
import { buildAlignmentPlan, mergeReviewedSegments } from './pipeline';
import { buildReviewReport, formatReviewReport } from './reviewReport';
import { segmentDocument, segmentSections } from './segmentDocument';

describe('docReview', () => {
  describe('segmentDocument', () => {
    it('splits a document into one block per heading and paragraph', () => {
      const text = [
        '# Title',
        '',
        'Intro paragraph.',
        '',
        '## Section',
        '',
        'Body.',
        '',
      ].join('\n');

      const blocks = segmentDocument(text);

      // Fine granularity: a change to one paragraph never pulls its whole
      // heading section into review.
      expect(blocks).toHaveLength(4);
      expect(blocks[0]?.content).toContain('# Title');
      expect(blocks[1]?.content).toContain('Intro paragraph.');
      expect(blocks[2]?.content).toContain('## Section');
      expect(blocks[3]?.content).toContain('Body.');
    });

    it('keeps a fenced code block whole and ignores its inner headings', () => {
      const text = [
        '# Title',
        '',
        '```md',
        '# Not a heading',
        '',
        '# Still inside the fence',
        '```',
        '',
      ].join('\n');

      const blocks = segmentDocument(text);
      const codeBlock = blocks.find((block) => block.type === 'code_block');

      expect(codeBlock).toBeDefined();
      expect(codeBlock?.content).toContain('# Not a heading');
      expect(codeBlock?.content).toContain('# Still inside the fence');
    });

    it('partitions the document exactly (blocks concatenate back to source)', () => {
      const text = [
        '---',
        'id: doc',
        '---',
        '',
        '# Title',
        '',
        'First paragraph with **bold** text.',
        '',
        'Second paragraph here.',
        '',
        '## Code',
        '',
        '```ts',
        'const a = 1;',
        '',
        'const b = 2;',
        '```',
        '',
        '- item one',
        '- item two',
        '',
        'Closing line.',
        '',
      ].join('\n');

      expect(
        segmentDocument(text)
          .map((block) => block?.content)
          .join('')
      ).toBe(text);
    });
  });

  describe('segmentSections', () => {
    it('groups a heading and its paragraphs into a single section', () => {
      const text = [
        '# Title',
        '',
        'Intro paragraph.',
        '',
        '## Section',
        '',
        'First body paragraph.',
        '',
        'Second body paragraph.',
        '',
      ].join('\n');

      const sections = segmentSections(text);

      // Two heading sections, each keeping all of their paragraphs.
      expect(sections).toHaveLength(2);
      expect(sections[0]?.content).toContain('# Title');
      expect(sections[0]?.content).toContain('Intro paragraph.');
      expect(sections[1]?.content).toContain('## Section');
      expect(sections[1]?.content).toContain('First body paragraph.');
      expect(sections[1]?.content).toContain('Second body paragraph.');
    });

    it('carries the depth of the heading opening each section', () => {
      const text = [
        '---',
        'title: Hello',
        '---',
        '',
        '# Title',
        '',
        '## Section',
        '',
        'Body.',
        '',
        '#### Deep',
        '',
      ].join('\n');

      expect(
        segmentSections(text).map((section) => section.headingDepth)
      ).toEqual([null, 1, 2, 4]);
    });

    it('keeps frontmatter as its own leading section', () => {
      const text = [
        '---',
        'title: Hello',
        '---',
        '',
        '# Heading',
        '',
        'Body.',
        '',
      ].join('\n');

      const sections = segmentSections(text);

      expect(sections[0]?.content).toContain('title: Hello');
      expect(sections[0].lineStart).toBe(1);
      expect(sections[1]?.content).toContain('# Heading');
    });

    it('partitions the document exactly (sections concatenate back to source)', () => {
      const text = [
        '# A',
        '',
        'Alpha.',
        '',
        '## B',
        '',
        'Beta one.',
        '',
        'Beta two.',
        '',
      ].join('\n');

      expect(
        segmentSections(text)
          .map((section) => section?.content)
          .join('')
      ).toBe(text);
    });
  });

  describe('buildAlignmentPlan', () => {
    it('reuses every aligned block when no line changed', () => {
      const baseText = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## Section',
        '',
        'Body 1234.',
        '',
      ].join('\n');
      const targetText = [
        '# Titre',
        '',
        'Bonjour le monde.',
        '',
        '## Section',
        '',
        'Corps 1234.',
        '',
      ].join('\n');

      const { plan, segmentsToReview } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      expect(segmentsToReview).toHaveLength(0);
      expect(plan.actions.every((action) => action.kind === 'reuse')).toBe(
        true
      );
    });

    it('flags only the block touched by a changed line for review', () => {
      const baseText = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## Section',
        '',
        'Body 1234.',
        '',
      ].join('\n');
      const targetText = [
        '# Titre',
        '',
        'Bonjour le monde.',
        '',
        '## Section',
        '',
        'Corps 1234.',
        '',
      ].join('\n');

      // Line 3 belongs to the first block ("Hello world.")
      const { plan, segmentsToReview } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: [3],
      });

      expect(segmentsToReview).toHaveLength(1);
      const reviewActions = plan.actions.filter(
        (action) => action.kind === 'review'
      );
      expect(reviewActions).toHaveLength(1);
    });

    it('detects a brand new block as an insertion', () => {
      const baseText = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## New Section',
        '',
        'New body.',
        '',
      ].join('\n');
      const targetText = ['# Titre', '', 'Bonjour le monde.', ''].join('\n');

      const { plan, segmentsToReview } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      const insertActions = plan.actions.filter(
        (action) => action.kind === 'insert_new'
      );
      expect(insertActions).toHaveLength(1);
      expect(segmentsToReview).toHaveLength(1);
      expect(segmentsToReview[0].targetBlockText).toBeNull();
    });

    it('reuses unchanged target blocks when merging', () => {
      const baseText = ['# Title', '', 'Hello world.', ''].join('\n');
      const targetText = ['# Titre', '', 'Bonjour le monde.', ''].join('\n');

      const { plan, targetBlocks } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      const merged = mergeReviewedSegments(plan, targetBlocks, new Map());
      expect(merged).toContain('Bonjour le monde.');
    });

    it('keeps extra target paragraphs in a changed section (no data loss)', () => {
      // The base section has two paragraphs; the translation split its prose
      // into three. Editing the first base paragraph must not delete the extra
      // target paragraph that has no base counterpart.
      const baseText = [
        '## Section',
        '',
        'First paragraph 111.',
        '',
        'Second paragraph 222.',
        '',
      ].join('\n');
      const targetText = [
        '## Section',
        '',
        'Premier paragraphe 111.',
        '',
        'Paragraphe supplémentaire propre à la traduction.',
        '',
        'Deuxième paragraphe 222.',
        '',
      ].join('\n');

      const { plan, targetBlocks } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: [3], // edits "First paragraph 111."
      });

      // No fine block is deleted: the extra translation-only paragraph is kept.
      expect(plan.actions.some((action) => action.kind === 'delete')).toBe(
        false
      );

      // Without any AI translation the merge falls back to existing target
      // content, so every original target paragraph survives verbatim.
      const merged = mergeReviewedSegments(plan, targetBlocks, new Map());
      expect(merged).toContain(
        'Paragraphe supplémentaire propre à la traduction.'
      );
      expect(merged).toContain('Deuxième paragraphe 222.');
    });

    it('never pairs sections whose heading depths differ', () => {
      // The translation demoted `## Usage` to a `###`. Reusing it would keep the
      // stale `###` while the base `## Usage` is translated again next to it.
      const baseText = [
        '## Usage',
        '',
        'Install it 1234 and run 5678.',
        '',
      ].join('\n');
      const targetText = [
        '### Utilisation',
        '',
        'Installez-le 1234 et lancez 5678.',
        '',
      ].join('\n');

      const { plan } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      expect(plan.actions.some((action) => action.kind === 'reuse')).toBe(
        false
      );
      expect(plan.actions.some((action) => action.kind === 'insert_new')).toBe(
        true
      );
      expect(plan.actions.some((action) => action.kind === 'delete')).toBe(
        true
      );
    });

    it('never pairs a bare heading section with a section that has a body', () => {
      // Regression: `## Usage` became a bare heading once its content moved into
      // subsections, while the translation still held the whole body. Pairing
      // them reused that body *and* inserted the translated `## Usage` next to
      // it, emitting the same heading twice.
      const baseText = [
        '## Usage',
        '',
        '### Standalone',
        '',
        'When you compose the plugin stack yourself, intlayerPrune and',
        'intlayerMinify share a PruneContext created once and passed to both.',
        '',
      ].join('\n');
      const targetText = [
        '## Utilisation',
        '',
        'Lorsque vous composez la pile de plugins vous-même, intlayerPrune et',
        'intlayerMinify partagent un PruneContext créé une fois et passé aux deux.',
        '',
      ].join('\n');

      const { plan, baseBlocks, targetBlocks } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      const reusedPairs = plan.actions.filter(
        (action) => action.kind === 'reuse'
      );
      expect(reusedPairs).toHaveLength(0);

      // `apply` mode resolves every deletion to an empty string, so the stale
      // section is dropped instead of surviving next to its own retranslation.
      const resolvedSegments = new Map<number, string>();
      plan.actions.forEach((action, actionIndex) => {
        if (action.kind === 'delete') resolvedSegments.set(actionIndex, '');
        else if (action.kind === 'insert_new') {
          resolvedSegments.set(
            actionIndex,
            baseBlocks[action.baseIndex]!.content
          );
        }
      });

      const merged = mergeReviewedSegments(
        plan,
        targetBlocks,
        resolvedSegments
      );

      expect(merged).not.toContain('## Utilisation');
      expect(merged.match(/^## /gm)).toHaveLength(1);
    });

    it('separates a block appended after the end of the translation', () => {
      // Regression: blocks own the blank lines that trail them, but the block
      // that ended the document owns none. Appending a new section after it
      // glued the two together ("…intlayerPrune`.### 6. Build optimisations").
      const baseText = [
        '## Description',
        '',
        'The plugin does the following:',
        '',
        '1. **Prepare** the dictionaries.',
        '',
        '### 6. Build optimisations',
        '',
        'During a production build the plugin adds intlayerOptimize.',
        '',
      ].join('\n');
      // Note the absence of a trailing blank line: the file ends right here.
      const targetText = [
        '## Description',
        '',
        'Le plugin effectue les tâches suivantes :',
        '',
        '1. **Préparer** les dictionnaires.',
        '',
      ].join('\n');

      const { plan, baseBlocks, targetBlocks } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      const resolvedSegments = new Map<number, string>();
      plan.actions.forEach((action, actionIndex) => {
        if (action.kind === 'insert_new') {
          resolvedSegments.set(
            actionIndex,
            baseBlocks[action.baseIndex]!.content
          );
        }
      });

      const merged = mergeReviewedSegments(
        plan,
        targetBlocks,
        resolvedSegments
      );

      expect(merged).toContain(
        'les dictionnaires.\n\n### 6. Build optimisations'
      );
      // No heading may sit directly under a non-blank line.
      const mergedLines = merged.split('\n');
      const gluedHeadings = mergedLines.filter(
        (line, index) =>
          index > 0 &&
          /^\s*#{1,6}\s+/.test(line) &&
          mergedLines[index - 1]!.trim().length > 0
      );
      expect(gluedHeadings).toHaveLength(0);
    });

    it('merges an unchanged translation back byte for byte', () => {
      // The separator logic must never reformat a document that has nothing to
      // change, otherwise every review would rewrite untouched files.
      const baseText = ['# Title', '', 'Hello world 42.', ''].join('\n');
      const targetText = ['# Titre', '', 'Bonjour le monde 42.', ''].join('\n');

      const { plan, targetBlocks } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      expect(plan.actions.every((action) => action.kind === 'reuse')).toBe(
        true
      );
      expect(mergeReviewedSegments(plan, targetBlocks, new Map())).toBe(
        targetText
      );
    });

    it('reports a paragraph missing inside an aligned section when the changed lines are unknown', () => {
      // Both documents share the same single section, so the section-level
      // alignment pairs them. Without opening that section, the base paragraph
      // the translation never received would stay invisible.
      const baseText = [
        '## Section',
        '',
        'First paragraph 111.',
        '',
        'Second paragraph 222.',
        '',
      ].join('\n');
      const targetText = ['## Section', '', 'Premier paragraphe 111.', ''].join(
        '\n'
      );

      const { plan } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      const insertActions = plan.actions.filter(
        (action) => action.kind === 'insert_new'
      );
      expect(insertActions).toHaveLength(1);
    });

    it('reuses everything when the changed lines are known to be empty', () => {
      // An empty array is not the same as `undefined`: git answered, and it
      // answered that nothing changed, so no section is opened.
      const baseText = [
        '## Section',
        '',
        'First paragraph 111.',
        '',
        'Second paragraph 222.',
        '',
      ].join('\n');
      const targetText = ['## Section', '', 'Premier paragraphe 111.', ''].join(
        '\n'
      );

      const { plan, segmentsToReview } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: [],
      });

      expect(segmentsToReview).toHaveLength(0);
      expect(plan.actions.every((action) => action.kind === 'reuse')).toBe(
        true
      );
    });

    it('keeps a target-only paragraph verbatim when it is reported as delete', () => {
      // Comparing a whole document surfaces a translation-only paragraph as
      // `delete` for visibility, but the merge must still keep its content.
      const baseText = ['## Section', '', 'First paragraph 111.', ''].join(
        '\n'
      );
      const targetText = [
        '## Section',
        '',
        'Premier paragraphe 111.',
        '',
        'Paragraphe obsolète propre à la traduction.',
        '',
      ].join('\n');

      const { plan, targetBlocks } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      expect(plan.actions.some((action) => action.kind === 'delete')).toBe(
        true
      );

      const merged = mergeReviewedSegments(plan, targetBlocks, new Map());
      expect(merged).toContain('Paragraphe obsolète propre à la traduction.');
    });

    it('reports no divergence when a document is compared with itself', () => {
      // Opening every section must not turn aligned blocks into false
      // positives: an identical document has strictly nothing to report.
      const text = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## Section',
        '',
        'Body 1234.',
        '',
      ].join('\n');

      const { plan } = buildAlignmentPlan({
        baseText: text,
        targetText: text,
        changedLines: undefined,
      });

      expect(plan.actions.every((action) => action.kind === 'reuse')).toBe(
        true
      );
    });

    it('keeps a target-only section verbatim even when it is reported as delete', () => {
      // The translation has a section the base no longer aligns to (e.g. a
      // reordering the aligner cannot follow). It is reported as `delete` but the
      // merge must keep it so the translation never loses a whole section.
      const baseText = ['# Title', '', 'Hello world.', ''].join('\n');
      const targetText = [
        '# Titre',
        '',
        'Bonjour le monde.',
        '',
        '## Section orpheline',
        '',
        'Contenu traduit à conserver.',
        '',
      ].join('\n');

      const { plan, targetBlocks } = buildAlignmentPlan({
        baseText,
        targetText,
        changedLines: undefined,
      });

      expect(plan.actions.some((action) => action.kind === 'delete')).toBe(
        true
      );

      const merged = mergeReviewedSegments(plan, targetBlocks, new Map());
      expect(merged).toContain('## Section orpheline');
      expect(merged).toContain('Contenu traduit à conserver.');
    });
  });

  describe('buildReviewReport', () => {
    it('reports inserted blocks with their base line range', () => {
      const baseText = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## New Section',
        '',
        'New body.',
        '',
      ].join('\n');
      const targetText = ['# Titre', '', 'Bonjour le monde.', ''].join('\n');

      const report = buildReviewReport({ baseText, targetText });

      expect(report.summary.insertNew).toBe(1);
      const inserted = report.blocks.find(
        (block) => block.action === 'insert_new'
      );
      expect(inserted).toBeDefined();
      expect(inserted?.baseContent).toContain('New body.');
      expect(inserted?.baseLineRange?.start).toBeGreaterThan(0);
      expect(inserted?.targetContent).toBeUndefined();
    });

    it('reports a changed block with both base and target content', () => {
      const baseText = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## Section',
        '',
        'Body 1234.',
        '',
      ].join('\n');
      const targetText = [
        '# Titre',
        '',
        'Bonjour le monde.',
        '',
        '## Section',
        '',
        'Corps 1234.',
        '',
      ].join('\n');

      const report = buildReviewReport({
        baseText,
        targetText,
        changedLines: [3],
      });

      expect(report.summary.review).toBe(1);
      const reviewed = report.blocks.find((block) => block.action === 'review');
      expect(reviewed?.baseContent).toContain('Hello world.');
      expect(reviewed?.targetContent).toContain('Bonjour le monde.');
    });

    it('returns no blocks when nothing diverges', () => {
      const baseText = ['# Title', '', 'Hello world.', ''].join('\n');
      const targetText = ['# Titre', '', 'Bonjour le monde.', ''].join('\n');

      const report = buildReviewReport({ baseText, targetText });

      expect(report.blocks).toHaveLength(0);
      expect(formatReviewReport(report)).toContain('No changes needed.');
    });

    it('reports a block missing inside an aligned section without any changed line', () => {
      // The `doc review` tool runs with no git history behind it; comparing a
      // document with its translation must still surface untranslated content
      // living inside a section both documents share.
      const baseText = [
        '## Section',
        '',
        'First paragraph 111.',
        '',
        'Second paragraph 222.',
        '',
      ].join('\n');
      const targetText = ['## Section', '', 'Premier paragraphe 111.', ''].join(
        '\n'
      );

      const report = buildReviewReport({ baseText, targetText });

      expect(report.summary.insertNew).toBe(1);
      // Aligned prose cannot be flagged without knowing which lines changed.
      expect(report.summary.review).toBe(0);
      expect(
        report.blocks.find((block) => block.action === 'insert_new')
          ?.baseContent
      ).toContain('Second paragraph 222.');
    });

    it('reports a translation-only block inside an aligned section as delete', () => {
      const baseText = ['## Section', '', 'First paragraph 111.', ''].join(
        '\n'
      );
      const targetText = [
        '## Section',
        '',
        'Premier paragraphe 111.',
        '',
        'Paragraphe obsolète propre à la traduction.',
        '',
      ].join('\n');

      const report = buildReviewReport({ baseText, targetText });

      expect(report.summary.delete).toBe(1);
      expect(
        report.blocks.find((block) => block.action === 'delete')?.targetContent
      ).toContain('Paragraphe obsolète propre à la traduction.');
    });

    it('formats a readable log with base and target labels', () => {
      const baseText = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## New Section',
        '',
        'New body.',
        '',
      ].join('\n');
      const targetText = ['# Titre', '', 'Bonjour le monde.', ''].join('\n');

      const report = buildReviewReport({ baseText, targetText });
      const formatted = formatReviewReport(report, {
        baseLabel: 'en',
        targetLabel: 'fr',
      });

      expect(formatted).toContain('[insert_new]');
      expect(formatted).toContain('[en]');
      expect(formatted).toContain('[fr]');
    });

    it('treats labels as opaque display strings (already-formatted locales)', () => {
      // The CLI passes pre-formatted labels such as "English (en)". The
      // formatter must use them verbatim and never re-resolve them as locale ids
      // (which would throw `RangeError: argument is not a language id`).
      const baseText = [
        '# Title',
        '',
        'Hello world.',
        '',
        '## New Section',
        '',
        'New body.',
        '',
      ].join('\n');
      const targetText = ['# Titre', '', 'Bonjour le monde.', ''].join('\n');

      const report = buildReviewReport({ baseText, targetText });

      expect(() =>
        formatReviewReport(report, {
          baseLabel: 'English (en)',
          targetLabel: 'Spanish (es)',
        })
      ).not.toThrow();

      const formatted = formatReviewReport(report, {
        baseLabel: 'English (en)',
        targetLabel: 'Spanish (es)',
      });
      expect(formatted).toContain('[English (en)]');
    });
  });
});
