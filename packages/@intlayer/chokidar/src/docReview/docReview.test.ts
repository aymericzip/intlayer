import { describe, expect, it } from 'vitest';
import { buildAlignmentPlan, mergeReviewedSegments } from './pipeline';
import { buildReviewReport, formatReviewReport } from './reviewReport';
import { segmentDocument } from './segmentDocument';

describe('docReview', () => {
  describe('segmentDocument', () => {
    it('splits a document into blocks on headings', () => {
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

      expect(blocks).toHaveLength(2);
      expect(blocks[0].content).toContain('# Title');
      expect(blocks[0].content).toContain('Intro paragraph.');
      expect(blocks[1].content).toContain('## Section');
      expect(blocks[1].content).toContain('Body.');
    });

    it('keeps frontmatter as a single leading block', () => {
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

      const blocks = segmentDocument(text);

      expect(blocks[0].content).toContain('title: Hello');
      expect(blocks[0].lineStart).toBe(1);
    });

    it('does not split on headings inside fenced code blocks', () => {
      const text = ['# Title', '', '```md', '# Not a heading', '```', ''].join(
        '\n'
      );

      const blocks = segmentDocument(text);

      expect(blocks).toHaveLength(1);
      expect(blocks[0].content).toContain('# Not a heading');
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
  });
});
