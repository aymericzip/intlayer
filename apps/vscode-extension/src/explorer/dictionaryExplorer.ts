import {
  existsSync,
  promises as fsPromises,
  readdirSync,
  readFileSync,
} from 'node:fs';
import { basename, extname, join, relative, resolve, sep } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { listProjects } from '@intlayer/engine/cli';
import {
  type Event,
  EventEmitter,
  type TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  Uri,
  window,
  workspace,
} from 'vscode';
import { getSelectedEnvironment } from '../utils/envStore';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { hasClientId } from '../utils/hasClientId';

type DictionaryEntry = {
  filePath?: string;
};

type EnvironmentNode = {
  type: 'environment';
  label: string;
  projectDir: string;
  dir: string; // unmerged dictionaries dir
};

type DictionaryNode = {
  type: 'dictionary';
  key: string;
  jsonPath: string;
  projectDir: string;
  envLabel: string;
};

type FileNode = {
  type: 'file';
  filePath: string;
  projectDir: string;
  dictionaryJsonPath: string;
};

export type IntlayerTreeNode = EnvironmentNode | DictionaryNode | FileNode;

export class DictionaryTreeDataProvider
  implements TreeDataProvider<IntlayerTreeNode>
{
  private readonly changeEmitter = new EventEmitter<
    IntlayerTreeNode | undefined
  >();
  readonly onDidChangeTreeData: Event<IntlayerTreeNode | undefined> =
    this.changeEmitter.event;

  private searchQuery: string | undefined;
  private forcedRevealJsonPath: string | undefined;
  private cachedEnvironments:
    | { projectDir: string; dir: string; files: string[]; label: string }[]
    | undefined;

  setSearchQuery(query: string | undefined) {
    this.searchQuery =
      query && query.trim().length > 0 ? query.trim() : undefined;
    this.refresh();
  }

  getSearchQuery(): string {
    return this.searchQuery ?? '';
  }

  refresh(): void {
    this.cachedEnvironments = undefined;
    this.changeEmitter.fire(undefined);
  }

  /**
   * Find a file node by its project-relative path across all dictionaries.
   */
  async findFileNodeByAbsolutePath(
    absolutePath: string
  ): Promise<IntlayerTreeNode | undefined> {
    this.forcedRevealJsonPath = undefined;
    if (!this.cachedEnvironments) {
      await this.getChildren();
    }
    const envs = this.cachedEnvironments ?? [];
    for (const env of envs) {
      const relPath = relative(env.projectDir, absolutePath);
      // If the absolute path is outside this env, the relative path will start with ..
      if (relPath.startsWith('..')) {
        continue;
      }
      for (const file of env.files) {
        try {
          const jsonPath = join(env.dir, file);
          const content = readFileSync(jsonPath, 'utf8');
          const dictionaries = JSON.parse(content) as DictionaryEntry[];
          const hasMatch = (dictionaries ?? [])
            .filter(Boolean)
            .some((d) => d.filePath === relPath);
          if (hasMatch) {
            this.forcedRevealJsonPath = jsonPath;
            return {
              type: 'file',
              filePath: relPath,
              projectDir: env.projectDir,
              dictionaryJsonPath: jsonPath,
            };
          }
        } catch {
          // ignore malformed files
        }
      }
    }
    return undefined;
  }

  async getChildren(element?: IntlayerTreeNode): Promise<IntlayerTreeNode[]> {
    try {
      if (!element) {
        // Retrieve all project roots by scanning workspace folders for Intlayer configs
        const workspaceFolders = workspace.workspaceFolders ?? [];
        const foundRoots: string[] = [];

        for (const folder of workspaceFolders) {
          try {
            const { projectsPath } = await listProjects({
              baseDir: folder.uri.fsPath,
            });
            foundRoots.push(...projectsPath);
          } catch {
            // Ignore folders where scan fails
          }
        }

        let uniqueRoots = Array.from(new Set(foundRoots));

        if (!uniqueRoots.length) {
          return [];
        }

        // If multiple projects exist, show only the one matching the active file
        const allRoots = uniqueRoots;
        let wasFiltered = false;
        if (uniqueRoots.length > 1) {
          const activeProjectRoot = findProjectRoot();
          if (activeProjectRoot) {
            const normalizedActive = resolve(activeProjectRoot);
            const filtered = uniqueRoots.filter((r) => {
              const normalizedRoot = resolve(r);
              return (
                normalizedRoot === normalizedActive ||
                normalizedRoot.startsWith(normalizedActive + sep) ||
                normalizedActive.startsWith(normalizedRoot + sep)
              );
            });
            if (filtered.length > 0) {
              uniqueRoots = filtered;
              wasFiltered = true;
            }
          }
        }

        const buildEnvs = async (roots: string[]) => {
          const result: {
            projectDir: string;
            dir: string;
            files: string[];
            label: string;
          }[] = [];

          for (const projectDir of roots) {
            try {
              const configOptions = await getConfigurationOptions(
                projectDir,
                false
              );
              const config = getConfiguration(configOptions);
              const dir =
                (config.system.unmergedDictionariesDir as string | undefined) ??
                projectDir;

              const files = existsSync(dir)
                ? readdirSync(dir)
                    .filter((f) => extname(f) === '.json')
                    .sort()
                : [];

              // FILTER: Skip project if it has no .content (empty dictionary files)
              if (files.length === 0) {
                continue;
              }

              // derive label from package.json name or fallback to directory name
              let label = basename(projectDir);
              try {
                const fileContent = await fsPromises.readFile(
                  join(projectDir, 'package.json'),
                  'utf8'
                );
                const pkg = JSON.parse(fileContent);
                if (pkg?.name && typeof pkg.name === 'string') {
                  label = pkg.name;
                }
              } catch {}

              result.push({ projectDir, dir, files, label });
            } catch {
              // If configuration loading fails, skip this project
            }
          }
          return result;
        };

        let envs = await buildEnvs(uniqueRoots);

        // If the active-project filter yielded nothing, fall back to all projects
        if (envs.length === 0 && wasFiltered) {
          envs = await buildEnvs(allRoots);
        }

        this.cachedEnvironments = envs;

        // Always return environments as roots (keep grouping by project)
        const envNodes: EnvironmentNode[] = envs.map((env) => ({
          type: 'environment',
          label: env.label,
          projectDir: env.projectDir,
          dir: env.dir,
        }));
        return envNodes;
      }

      if (element.type === 'environment') {
        // List dictionaries for this environment
        const env = (this.cachedEnvironments ?? []).find(
          (e) => e.projectDir === element.projectDir
        );
        if (!env) {
          return [];
        }
        let files = env.files;
        if (this.searchQuery) {
          const lowered = this.searchQuery.toLowerCase();
          files = files.filter((file) => {
            const jsonPath = join(env.dir, file);
            if (this.forcedRevealJsonPath === jsonPath) {
              return true;
            }

            const key = basename(file, '.json').toLowerCase();
            if (key.includes(lowered)) {
              return true;
            }
            try {
              const raw = readFileSync(join(env.dir, file), 'utf8');
              let contentString = '';
              try {
                contentString = JSON.stringify(JSON.parse(raw));
              } catch {
                contentString = raw;
              }
              return contentString.toLowerCase().includes(lowered);
            } catch {
              return false;
            }
          });
        }
        return files.map((file) => ({
          type: 'dictionary' as const,
          key: basename(file, '.json'),
          jsonPath: join(env.dir, file),
          projectDir: env.projectDir,
          envLabel: env.label,
        }));
      }

      if (element.type === 'dictionary') {
        try {
          const content = readFileSync(element.jsonPath, 'utf8');
          const dictionaries = JSON.parse(content) as DictionaryEntry[];
          const entries = (dictionaries ?? []).filter(Boolean);

          let filePaths = entries
            .map((d) => d.filePath)
            .filter((p): p is string => typeof p === 'string');

          if (this.searchQuery) {
            const lowered = this.searchQuery.toLowerCase();
            // Reorder by path match; do not refilter dictionaries here
            filePaths = filePaths
              .filter((p) => p.toLowerCase().includes(lowered))
              .concat(
                filePaths.filter((p) => !p.toLowerCase().includes(lowered))
              );
          }

          const uniquePaths = Array.from(new Set(filePaths));

          return uniquePaths.map((filePath) => ({
            type: 'file',
            filePath,
            projectDir: element.projectDir,
            dictionaryJsonPath: element.jsonPath,
          }));
        } catch (error) {
          window.showWarningMessage(
            `Failed to read dictionary ${element.key}: ${
              (error as Error).message
            }`
          );
          return [];
        }
      }

      return [];
    } catch (error) {
      await window.showErrorMessage(
        `Failed to load Intlayer dictionaries: ${(error as Error).message}`
      );
      return [];
    }
  }

  getParent(element: IntlayerTreeNode) {
    if (element.type === 'file') {
      return {
        type: 'dictionary',
        key: basename(element.dictionaryJsonPath, '.json'),
        jsonPath: element.dictionaryJsonPath,
        projectDir: element.projectDir,
        envLabel:
          (this.cachedEnvironments ?? []).find(
            (e) => e.projectDir === element.projectDir
          )?.label ?? basename(element.projectDir),
      } as DictionaryNode;
    }
    if (element.type === 'dictionary') {
      const dict = element as DictionaryNode;
      const env = (this.cachedEnvironments ?? []).find(
        (e) => e.projectDir === dict.projectDir
      );
      if (!env) {
        return undefined;
      }
      return {
        type: 'environment',
        label: env.label,
        projectDir: env.projectDir,
        dir: env.dir,
      } as EnvironmentNode;
    }
    return undefined;
  }

  async getTreeItem(element: IntlayerTreeNode): Promise<TreeItem> {
    if (element.type === 'environment') {
      const selectedEnv = getSelectedEnvironment(element.projectDir);
      const item = new TreeItem(
        selectedEnv ? `${element.label} [${selectedEnv}]` : element.label,
        TreeItemCollapsibleState.Collapsed
      );

      // Set context value based on whether the project has clientId
      const clientIdExists = await hasClientId(element.projectDir);
      item.contextValue = clientIdExists
        ? 'intlayer.environment.cms'
        : 'intlayer.environment';

      item.id = `env:${element.projectDir}`;
      item.tooltip = selectedEnv
        ? `${element.projectDir} — env: ${selectedEnv}`
        : element.projectDir;
      (item as any).projectDir = element.projectDir;
      return item;
    }

    if (element.type === 'dictionary') {
      const item = new TreeItem(
        element.key,
        TreeItemCollapsibleState.Collapsed
      );
      item.contextValue = 'intlayer.dictionary';
      item.id = `dict:${element.jsonPath}`;
      item.tooltip = `${element.envLabel} • ${element.jsonPath}`;
      // Pass metadata for context commands
      (item as any).key = element.key;
      (item as any).projectDir = element.projectDir;
      return item;
    }

    const fileAbs = join(element.projectDir, element.filePath);
    const wsFolder = workspace.getWorkspaceFolder(Uri.file(fileAbs));
    const workspaceRelative = wsFolder
      ? relative(wsFolder.uri.fsPath, fileAbs)
      : element.filePath;
    const item = new TreeItem(workspaceRelative, TreeItemCollapsibleState.None);
    item.contextValue = 'intlayer.file';
    item.id = `file:${element.dictionaryJsonPath}::${element.filePath}`;
    item.resourceUri = Uri.file(fileAbs);
    item.command = {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [Uri.file(fileAbs)],
    };
    // Pass metadata for context commands
    (item as any).jsonPath = element.dictionaryJsonPath;
    (item as any).projectDir = element.projectDir;
    (item as any).filePath = element.filePath;
    return item;
  }
}
