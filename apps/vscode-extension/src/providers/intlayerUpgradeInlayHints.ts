import {
  type CancellationToken,
  commands,
  type Disposable,
  EventEmitter,
  InlayHint,
  InlayHintLabelPart,
  type InlayHintsProvider,
  languages,
  Range,
  type TextDocument,
  Uri,
  WorkspaceEdit,
  workspace,
} from 'vscode';
import {
  findOutdatedIntlayerDependencies,
  getLatestIntlayerVersions,
  type OutdatedIntlayerDependency,
} from '../utils/intlayerDependencyUpgrades';

/** Setting turning the `package.json` upgrade hints on or off. */
export const UPGRADE_HINTS_SETTING = 'intlayer.upgradeHints.enabled';

/** Command rewriting one dependency range to its `latest` version. */
export const UPGRADE_DEPENDENCY_COMMAND = 'intlayer.upgradeDependency';

/** Argument of {@link UPGRADE_DEPENDENCY_COMMAND}. */
type UpgradeDependencyReference = {
  uri: string;
  packageName: string;
  currentRange: string;
  nextRange: string;
  rangeStartOffset: number;
};

/**
 * Rewrites a dependency range in its `package.json` (as an undoable editor
 * edit), unless the file changed since the hint was computed.
 */
const upgradeDependency = async ({
  uri,
  currentRange,
  nextRange,
  rangeStartOffset,
}: UpgradeDependencyReference): Promise<void> => {
  const document = await workspace.openTextDocument(Uri.parse(uri));
  const range = new Range(
    document.positionAt(rangeStartOffset),
    document.positionAt(rangeStartOffset + currentRange.length)
  );

  if (document.getText(range) !== currentRange) return;

  const edit = new WorkspaceEdit();
  edit.replace(document.uri, range, nextRange);

  await workspace.applyEdit(edit);
};

const createHint = (
  document: TextDocument,
  dependency: OutdatedIntlayerDependency
): InlayHint => {
  const reference: UpgradeDependencyReference = {
    uri: document.uri.toString(),
    packageName: dependency.packageName,
    currentRange: dependency.currentRange,
    nextRange: dependency.nextRange,
    rangeStartOffset: dependency.rangeStartOffset,
  };

  const upgradePart = new InlayHintLabelPart(
    `upgrade → ${dependency.nextRange}`
  );
  upgradePart.tooltip = `Upgrade ${dependency.packageName} from ${dependency.currentRange} to ${dependency.nextRange} (latest). Run your package manager's install afterwards, or \`intlayer upgrade\` to upgrade every Intlayer package at once.`;
  upgradePart.command = {
    title: 'Upgrade',
    command: UPGRADE_DEPENDENCY_COMMAND,
    arguments: [reference],
  };

  const hint = new InlayHint(
    document.lineAt(document.positionAt(dependency.rangeEndOffset).line).range
      .end,
    [upgradePart]
  );
  hint.paddingLeft = true;

  return hint;
};

const createProvider = (
  onDidChangeInlayHints: InlayHintsProvider['onDidChangeInlayHints']
): InlayHintsProvider => ({
  onDidChangeInlayHints,
  provideInlayHints: async (
    document: TextDocument,
    range: Range,
    token: CancellationToken
  ): Promise<InlayHint[]> => {
    if (!workspace.getConfiguration().get<boolean>(UPGRADE_HINTS_SETTING)) {
      return [];
    }

    const packageJsonText = document.getText();
    const latestVersions = await getLatestIntlayerVersions(packageJsonText);

    if (token.isCancellationRequested) return [];

    // The text may have changed while the versions were fetched
    return findOutdatedIntlayerDependencies(document.getText(), latestVersions)
      .filter((dependency) =>
        range.contains(document.positionAt(dependency.rangeStartOffset))
      )
      .map((dependency) => createHint(document, dependency));
  },
});

/**
 * End-of-line `upgrade → ^x.y.z` hints on the Intlayer dependencies of
 * `package.json` files that are older than their `latest` npm version.
 */
export const intlayerUpgradeInlayHintsProvider = (): Disposable[] => {
  const changeEmitter = new EventEmitter<void>();

  return [
    changeEmitter,
    languages.registerInlayHintsProvider(
      [
        { language: 'json', pattern: '**/package.json', scheme: 'file' },
        { language: 'jsonc', pattern: '**/package.json', scheme: 'file' },
      ],
      createProvider(changeEmitter.event)
    ),
    commands.registerCommand(UPGRADE_DEPENDENCY_COMMAND, upgradeDependency),
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(UPGRADE_HINTS_SETTING)) {
        changeEmitter.fire();
      }
    }),
  ];
};
