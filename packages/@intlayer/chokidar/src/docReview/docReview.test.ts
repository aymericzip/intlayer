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
      expect(blocks[0].content).toContain('# Title');
      expect(blocks[1].content).toContain('Intro paragraph.');
      expect(blocks[2].content).toContain('## Section');
      expect(blocks[3].content).toContain('Body.');
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
          .map((block) => block.content)
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
      expect(sections[0].content).toContain('# Title');
      expect(sections[0].content).toContain('Intro paragraph.');
      expect(sections[1].content).toContain('## Section');
      expect(sections[1].content).toContain('First body paragraph.');
      expect(sections[1].content).toContain('Second body paragraph.');
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

      expect(sections[0].content).toContain('title: Hello');
      expect(sections[0].lineStart).toBe(1);
      expect(sections[1].content).toContain('# Heading');
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
          .map((section) => section.content)
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
