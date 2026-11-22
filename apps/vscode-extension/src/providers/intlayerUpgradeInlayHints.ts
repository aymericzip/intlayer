import { dirname } from 'node:path';
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
import { runPackageInstallInTerminal } from '../utils/runIntlayerCli';

/** Setting turning the `package.json` upgrade hints on or off. */
export const UPGRADE_HINTS_SETTING = 'intlayer.upgradeHints.enabled';

/**
 * Command rewriting every outdated Intlayer dependency of a `package.json` to
 * its `latest` version, so all Intlayer packages stay aligned.
 */
export const UPGRADE_DEPENDENCY_COMMAND = 'intlayer.upgradeDependency';

/** Argument of {@link UPGRADE_DEPENDENCY_COMMAND}. */
type UpgradeDependencyReference = {
  uri: string;
};

/**
 * Rewrites every outdated Intlayer dependency range of a `package.json` in a
 * single editor edit, saves the file and runs the package manager install to
 * update the lock file. Ranges are recomputed from the current text so edits
 * made since the hint was rendered are respected.
 */
const upgradeIntlayerDependencies = async ({
  uri,
}: UpgradeDependencyReference): Promise<void> => {
  const document = await workspace.openTextDocument(Uri.parse(uri));
  const latestVersions = await getLatestIntlayerVersions(document.getText());
  const outdatedDependencies = findOutdatedIntlayerDependencies(
    document.getText(),
    latestVersions
  );

  if (outdatedDependencies.length === 0) return;

  const edit = new WorkspaceEdit();

  for (const dependency of outdatedDependencies) {
    edit.replace(
      document.uri,
      new Range(
        document.positionAt(dependency.rangeStartOffset),
        document.positionAt(dependency.rangeEndOffset)
      ),
      dependency.nextRange
    );
  }

  if (!(await workspace.applyEdit(edit))) return;

  // The install reads the file from disk
  if (!(await document.save())) return;

  runPackageInstallInTerminal(dirname(document.uri.fsPath));
};

const createHint = (
  document: TextDocument,
  dependency: OutdatedIntlayerDependency,
  outdatedDependencyCount: number
): InlayHint => {
  const reference: UpgradeDependencyReference = {
    uri: document.uri.toString(),
  };

  const upgradePart = new InlayHintLabelPart(
    outdatedDependencyCount > 1
      ? `upgrade all → ${dependency.nextRange}`
      : `upgrade → ${dependency.nextRange}`
  );
  upgradePart.tooltip = `Upgrade every outdated Intlayer package of this package.json to its latest version (${dependency.packageName}: ${dependency.currentRange} → ${dependency.nextRange}), keeping them aligned, then run your package manager's install to update the lock file. Use \`intlayer upgrade\` to upgrade every package.json of the project.`;
  upgradePart.command = {
    title: 'Upgrade Intlayer packages',
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
    const outdatedDependencies = findOutdatedIntlayerDependencies(
      document.getText(),
      latestVersions
    );

    return outdatedDependencies
      .filter((dependency) =>
        range.contains(document.positionAt(dependency.rangeStartOffset))
      )
      .map((dependency) =>
        createHint(document, dependency, outdatedDependencies.length)
      );
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
    commands.registerCommand(
      UPGRADE_DEPENDENCY_COMMAND,
      upgradeIntlayerDependencies
    ),
    workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(UPGRADE_HINTS_SETTING)) {
        changeEmitter.fire();
      }
    }),
  ];
};
