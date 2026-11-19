import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { collectMessageUsages } from '@intlayer/lsp/utils';
import { describe, expect, it } from 'vitest';
import {
  extractAngularTemplateExpressions,
  inlineAngularTemplates,
} from './angularTemplate';

describe('extractAngularTemplateExpressions', () => {
  it('collects interpolations and attribute bindings', () => {
    const template = [
      `<h1>{{ content().title }}</h1>`,
      `<div [innerHTML]="content().html"></div>`,
      `<button (click)="select(content().id)">x</button>`,
    ].join('\n');

    expect(extractAngularTemplateExpressions(template)).toEqual([
      'content().title',
      'content().html',
      'select(content().id)',
    ]);
  });

  it('reads control-flow parameters with nested parentheses', () => {
    const template = `@for (item of content().items; track $index) {}`;

    expect(extractAngularTemplateExpressions(template)).toEqual([
      'content().items',
      '$index',
    ]);
  });

  it('strips pipes, micro-syntax and aliases', () => {
    const template = [
      `<p>{{ content().date | date:'short' }}</p>`,
      `<li *ngFor="let item of content().list; trackBy: trackItem"></li>`,
      `@if (content().user; as user) {}`,
    ].join('\n');

    expect(extractAngularTemplateExpressions(template)).toEqual([
      'content().date',
      'content().list',
      'trackItem',
      'content().user',
    ]);
  });

  it('drops expressions that do not parse', () => {
    expect(extractAngularTemplateExpressions(`{{ a b c }}{{ ok }}`)).toEqual([
      'ok',
    ]);
  });
});

describe('inlineAngularTemplates', () => {
  it('replaces templateUrl with the external template expressions', async () => {
    const source = `@Component({ templateUrl: './app.html' }) class App {}`;

    expect(
      await inlineAngularTemplates(source, async () => `{{ content().title }}`)
    ).toBe(`@Component({ template: [content().title] }) class App {}`);
  });

  it('keeps an unreadable templateUrl untouched', async () => {
    const source = `@Component({ templateUrl: './missing.html' }) class App {}`;

    expect(await inlineAngularTemplates(source, async () => null)).toBe(source);
  });

  it('traces every field the angular example reads', async () => {
    const appDirectory = resolve(
      __dirname,
      '../../../../examples/angular-22-app/src/app'
    );
    const source = await readFile(resolve(appDirectory, 'app.ts'), 'utf-8');
    const script = await inlineAngularTemplates(source, (templateUrl) =>
      readFile(resolve(appDirectory, templateUrl), 'utf-8')
    );

    const fieldPaths = collectMessageUsages(script)
      .filter(
        (usage) => usage.dictionaryKey === 'app' && usage.kind === 'member'
      )
      .map((usage) => usage.fieldPath.join('.'));

    expect(fieldPaths).toEqual(
      expect.arrayContaining([
        'title',
        'congratulations',
        'cars',
        'nested.deep.text',
        'arrayStrings',
        'arrayObjects',
      ])
    );
  });
});
