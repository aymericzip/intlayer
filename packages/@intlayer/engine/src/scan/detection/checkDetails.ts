/**
 * Turn the details attached to a scan check into short printable lines: its
 * message, then the listed issues / links / URLs. Shared by the CLI report and
 * the Chrome extension popup.
 *
 * @param details - The `success` / `warning` / `error` payload of a check.
 * @returns The message first, then one line per listed item.
 */
export const getCheckDetailLines = (details: unknown): string[] => {
  if (typeof details === 'string') return [details];
  if (Array.isArray(details)) return details.map(String);
  if (!details || typeof details !== 'object') return [];

  const { message, issues, links, alternates, urls } = details as Record<
    string,
    unknown
  >;
  const listedItems = [issues, links, alternates, urls].find(Array.isArray) as
    | unknown[]
    | undefined;

  return [
    ...(typeof message === 'string' ? [message] : []),
    ...(listedItems ?? []).map(String),
  ];
};
