import { listMissingTranslations } from '@intlayer/cli';
import { window, workspace } from 'vscode';
import { findAllProjectRoots, findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

// Helper to pretty-print details into a temporary editor document
const writeMissingReport = async (
  result: Awaited<ReturnType<typeof listMissingTranslations>>
) => {
  const lines: string[] = [];
  lines.push('## Intlayer — Missing Translations Report');
  lines.push('');
  lines.push(
    `- Missing locales (any): ${
      result.missingLocales.length ? result.missingLocales.join(', ') : '—'
    }`
  );
  lines.push(
    `- Missing required locales: ${
      result.missingRequiredLocales.length
        ? result.missingRequiredLocales.join(', ')
        : '—'
    }`
  );
  lines.push('');

  if (!result.missingTranslations.length) {
    lines.push('✔ No missing translation keys found.');
  } else {
    lines.push(
      `⚠ ${result.missingTranslations.length} missing translation key(s):`
    );
    lines.push('');
    for (const item of result.missingTranslations) {
      const filePath = item.filePath ?? '(unknown file)';
      lines.push(`### Key: ${String(item.key)}`);
      lines.push(`- File: ${filePath}`);
      lines.push(`- Missing locales: ${item.locales.join(', ')}`);
      lines.push('');
    }
  }

  const doc = await workspace.openTextDocument({
    language: 'markdown',
    content: lines.join('\n'),
  });
  await window.showTextDocument(doc, { preview: false });
};

export const testCommand = async () => {
  let projectDir = findProjectRoot();

  if (!projectDir) {
    const roots = await findAllProjectRoots();
    if (roots.length === 1) {
      projectDir = roots[0];
    } else if (roots.length > 1) {
      const picked = await window.showQuickPick(roots, {
        placeHolder: 'Select the Intlayer project to test',
      });
      if (!picked) return;
      projectDir = picked;
    } else {
      await window.showErrorMessage(
        `${prefix}Could not find intlayer project root.`
      );
      return;
    }
  }

  try {
    const configOptions = await getConfigurationOptions(projectDir);

    const result = listMissingTranslations(configOptions);

    const hasIssues =
      result.missingTranslations.length > 0 || result.missingLocales.length > 0;

    if (hasIssues) {
      await writeMissingReport(result);
    } else {
      await window.showInformationMessage(
        `${prefix}No missing translations found.`
      );
    }
  } catch (error) {
    await window.showErrorMessage(
      `${prefix} test failed: ${(error as Error).message}`
    );
  }
};
