import { dirname, join } from 'node:path';
import type { Dictionary } from '@intlayer/types';
import { Hover, type HoverProvider, MarkdownString, Uri } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getCachedConfig } from '../utils/intlayerCache';
import { resolveIntlayerPath } from '../utils/intlayerPathResolver';
import {
  getValueFromPath,
  isReactElementLike,
  stripAccessorSuffix,
} from '../utils/intlayerValueResolver';
import { resolveProjectTarget } from '../utils/resolveDeclaration';

const REACT_NODE_PREVIEW = '`<ReactNode />`';

const isTranslationNode = (node: any): boolean =>
  typeof node === 'object' &&
  node?.nodeType === 'translation' &&
  Boolean(node.translation);

/**
 * Type shown for a field. Framework packages wrap translations in
 * `IntlayerNode`, unless read through an accessor (`.value`, `.raw`) or from
 * the core `intlayer` package, which returns content directly.
 */
const describeNodeType = (
  node: any,
  moduleSource: string | null,
  hasAccessor: boolean
): string => {
  if (isTranslationNode(node)) {
    const firstTranslation = Object.values(node.translation)[0];
    const primitiveType =
      firstTranslation === undefined
        ? 'unknown'
        : isReactElementLike(firstTranslation)
          ? 'ReactNode'
          : typeof firstTranslation;

    return moduleSource === 'intlayer' || hasAccessor
      ? primitiveType
      : `IntlayerNode<${primitiveType}>`;
  }

  if (typeof node === 'object') {
    return isReactElementLike(node) ? 'ReactNode' : 'Object';
  }

  return typeof node;
};

/** Markdown preview of a field's value: a locale table for translations. */
const appendNodePreview = (markdown: MarkdownString, node: any): void => {
  if (isTranslationNode(node)) {
    markdown.appendMarkdown('| Locale | Translation |\n| :--- | :--- |\n');

    for (const [locale, value] of Object.entries(node.translation)) {
      const preview = isReactElementLike(value) ? REACT_NODE_PREVIEW : value;

      markdown.appendMarkdown(`| **${locale}** | ${preview} |\n`);
    }

    return;
  }

  if (typeof node !== 'object') {
    markdown.appendMarkdown(`**Value**: ${node}`);
  } else if (isReactElementLike(node)) {
    markdown.appendMarkdown(`**Value**: ${REACT_NODE_PREVIEW}`);
  } else {
    markdown.appendCodeblock(JSON.stringify(node, null, 2), 'json');
  }
};

/** Hover over a field usage: its type, then its value per declaration. */
export const intlayerHoverProvider: HoverProvider = {
  provideHover: async (document, position) => {
    const origin = await resolveIntlayerPath(document, position);

    if (!origin) return null;

    const projectDir = findProjectRoot(dirname(document.uri.fsPath));

    if (!projectDir) return null;

    const { fieldPath, hasAccessor } = stripAccessorSuffix(origin.fieldPath);

    // Compat catalogs: `t('shared.footer.github')` may live in the whole-file
    // `index` dictionary under a flat `'shared.footer.github'` key.
    const resolved = await resolveProjectTarget(projectDir, {
      ...origin,
      fieldPath,
    });

    if (!resolved) return null;

    const { dictionaryKey, dictionaries } = resolved;
    const configuration = await getCachedConfig(projectDir);
    const defaultLocale = configuration.internationalization?.defaultLocale;

    const getFieldNode = (dictionary: Dictionary) =>
      getValueFromPath(
        dictionary.content,
        resolved.fieldPath,
        defaultLocale,
        false
      );

    const fieldNodes = dictionaries.map((dictionary) =>
      dictionary.location === 'remote' ? null : getFieldNode(dictionary)
    );
    const typedNode = fieldNodes.find(Boolean);

    const header = new MarkdownString();

    header.appendMarkdown(`### Intlayer: \`${dictionaryKey}\``);
    header.appendMarkdown(
      `\n\n**Path**: \`${resolved.fieldPath.join('.') || 'root'}\``
    );
    header.appendMarkdown(
      `\n\n**Type**: \`${
        typedNode
          ? describeNodeType(typedNode, origin.moduleSource, hasAccessor)
          : 'unknown'
      }\``
    );

    const sections: MarkdownString[] = [header];

    dictionaries.forEach((dictionary, index) => {
      const section = new MarkdownString();

      section.isTrusted = true;

      if (dictionary.location === 'remote') {
        const dashboardUrl = `${configuration.editor.cmsURL}/dictionary/${dictionaryKey}`;

        section.appendMarkdown(
          `\n---\n### Remote Dictionary\n[Open Dashboard](${dashboardUrl})`
        );
        sections.push(section);
        return;
      }

      const fieldNode = fieldNodes[index];

      if (!fieldNode) return;

      section.supportHtml = true;

      if (dictionary.filePath) {
        const fileUri = Uri.file(join(projectDir, dictionary.filePath));

        section.appendMarkdown(
          `**File Location:**\n[${dictionary.filePath}](${fileUri})`
        );
      } else {
        section.appendMarkdown('### Local Content');
      }

      section.appendMarkdown('\n\n---\n\n');
      appendNodePreview(section, fieldNode);
      sections.push(section);
    });

    return new Hover(sections);
  },
};
