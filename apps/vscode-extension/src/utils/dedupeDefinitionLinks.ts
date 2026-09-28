import type { DefinitionLink } from 'vscode';

/**
 * Drops links that point at the same file and the same target position.
 *
 * A dictionary key can be listed more than once in the unmerged dictionaries
 * (per-locale entries, autofilled variants) while resolving to a single source
 * file, which would otherwise make Go-to-Definition offer the same destination
 * several times.
 */
export const dedupeDefinitionLinks = (
  links: DefinitionLink[]
): DefinitionLink[] => {
  const seen = new Set<string>();

  return links.filter((link) => {
    const { start, end } = link.targetRange;
    const id = `${link.targetUri.toString()}|${start.line}:${start.character}|${end.line}:${end.character}`;

    if (seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
};
