import { readdir, readFile } from 'node:fs/promises';
import { basename, extname, join, relative, resolve, sep } from 'node:path';
import { extractErrorMessage } from '@intlayer/config/utils';
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
import { getCachedConfig, getCachedDictionary } from '../utils/intlayerCache';

/** An Intlayer project and its built unmerged dictionaries. */
type Project = {
  projectDir: string;
  label: string;
  /** Unmerged dictionaries directory. */
  dictionariesDir: string;
  /** Dictionary JSON file names, sorted. */
  dictionaryFileNames: string[];
};

type ProjectNode = {
  type: 'project';
  label: string;
  projectDir: string;
};

type DictionaryNode = {
  type: 'dictionary';
  key: string;
  jsonPath: string;
  projectDir: string;
  projectLabel: string;
};

type FileNode = {
  type: 'file';
  /** Content declaration file, relative to the project. */
  filePath: string;
  projectDir: string;
  dictionaryJsonPath: string;
};

export type IntlayerTreeNode = ProjectNode | DictionaryNode | FileNode;

/** Source file paths declared by a built dictionary JSON file. */
const readDeclarationFilePaths = async (
  jsonPath: string
): Promise<string[]> => {
  const dictionaries = await getCachedDictionary(jsonPath);

  // A malformed build output may hold a non-array JSON value
  if (!Array.isArray(dictionaries)) return [];

  return dictionaries
    .map((dictionary) => dictionary?.filePath)
    .filter((filePath): filePath is string => typeof filePath === 'string');
};

/** Dictionary JSON file names of a directory, sorted; none when missing. */
const readDictionaryFileNames = async (
  dictionariesDir: string
): Promise<string[]> => {
  try {
    return (await readdir(dictionariesDir))
      .filter((fileName) => extname(fileName) === '.json')
      .sort();
  } catch {
    // Dictionaries not built yet
    return [];
  }
};

/** Name from the project's package.json, else its directory name. */
const readProjectLabel = async (projectDir: string): Promise<string> => {
  try {
    const { name } = JSON.parse(
      await readFile(join(projectDir, 'package.json'), 'utf8')
    );

    if (typeof name === 'string' && name) return name;
  } catch {
    // No or malformed package.json
  }

  return basename(projectDir);
};

/** Whether one directory contains the other (or both are the same). */
const isSameOrNested = (firstDir: string, secondDir: string): boolean => {
  const first = resolve(firstDir);
  const second = resolve(secondDir);

  return (
    first === second ||
    first.startsWith(second + sep) ||
    second.startsWith(first + sep)
  );
};

/** Projects that have built dictionaries; unloadable projects are skipped. */
const loadProjects = async (projectDirs: string[]): Promise<Project[]> => {
  const projects: Project[] = [];

  for (const projectDir of projectDirs) {
    try {
      const { unmergedDictionariesDir: dictionariesDir } = (
        await getCachedConfig(projectDir)
      ).system;
      const dictionaryFileNames =
        await readDictionaryFileNames(dictionariesDir);

      // Projects without any built dictionary are hidden
      if (dictionaryFileNames.length === 0) continue;

      projects.push({
        projectDir,
        label: await readProjectLabel(projectDir),
        dictionariesDir,
        dictionaryFileNames,
      });
    } catch {
      // Configuration failed to load
    }
  }

  return projects;
};

/** Every Intlayer project found in the workspace folders. */
const listWorkspaceProjectDirs = async (): Promise<string[]> => {
  const projectDirs = new Set<string>();

  for (const folder of workspace.workspaceFolders ?? []) {
    try {
      const { projectsPath } = await listProjects({
        baseDir: folder.uri.fsPath,
      });

      for (const projectDir of projectsPath) projectDirs.add(projectDir);
    } catch {
      // Folder scan failed
    }
  }

  return [...projectDirs];
};

export class DictionaryTreeDataProvider
  implements TreeDataProvider<IntlayerTreeNode>
{
  private readonly changeEmitter = new EventEmitter<
    IntlayerTreeNode | undefined
  >();
  readonly onDidChangeTreeData: Event<IntlayerTreeNode | undefined> =
    this.changeEmitter.event;

  private searchQuery: string | undefined;
  /** Dictionary kept visible by search, because it holds the revealed file. */
  private forcedRevealJsonPath: string | undefined;
  private cachedProjects: Project[] | undefined;
  /** Load shared by concurrent root requests (tree view and reveal lookup). */
  private pendingProjects: Promise<Project[]> | undefined;

  /** Refilters the listed projects; the workspace is not rescanned. */
  setSearchQuery(query: string | undefined) {
    this.searchQuery = query?.trim() || undefined;
    this.changeEmitter.fire(undefined);
  }

  getSearchQuery(): string {
    return this.searchQuery ?? '';
  }

  refresh(): void {
    this.cachedProjects = undefined;
    this.pendingProjects = undefined;
    this.changeEmitter.fire(undefined);
  }

  /** A listed project; paths are compared resolved (glob paths use `/`). */
  private findProject(projectDir: string): Project | undefined {
    const resolvedProjectDir = resolve(projectDir);

    return this.cachedProjects?.find(
      (project) => resolve(project.projectDir) === resolvedProjectDir
    );
  }

  /**
   * The file node of a content declaration file, searched in the projects
   * currently listed. When its project is not listed (filtered out for the
   * previously active editor, or new), refreshes once and searches again.
   */
  async findFileNodeByAbsolutePath(
    absolutePath: string
  ): Promise<FileNode | undefined> {
    const searchProjects = async (): Promise<FileNode | undefined> => {
      if (!this.cachedProjects) {
        await this.getChildren();
      }

      for (const project of this.cachedProjects ?? []) {
        const filePath = relative(project.projectDir, absolutePath);

        if (filePath.startsWith('..')) continue;

        for (const fileName of project.dictionaryFileNames) {
          const jsonPath = join(project.dictionariesDir, fileName);

          if ((await readDeclarationFilePaths(jsonPath)).includes(filePath)) {
            return {
              type: 'file',
              filePath,
              projectDir: project.projectDir,
              dictionaryJsonPath: jsonPath,
            };
          }
        }
      }

      return undefined;
    };

    let fileNode = await searchProjects();
    const projectDir = findProjectRoot(absolutePath);

    // A listed project missing the file is only unbuilt: refreshing won't help
    if (!fileNode && projectDir && !this.findProject(projectDir)) {
      this.refresh();
      fileNode = await searchProjects();
    }

    this.forcedRevealJsonPath = fileNode?.dictionaryJsonPath;

    return fileNode;
  }

  async getChildren(element?: IntlayerTreeNode): Promise<IntlayerTreeNode[]> {
    try {
      if (!element) return await this.getProjectNodes();

      if (element.type === 'project')
        return await this.getDictionaryNodes(element);

      if (element.type === 'dictionary')
        return await this.getFileNodes(element);

      return [];
    } catch (error) {
      await window.showErrorMessage(
        `Failed to load Intlayer dictionaries: ${extractErrorMessage(error)}`
      );
      return [];
    }
  }

  /**
   * Root nodes, from the cached projects until the next refresh. With several
   * projects, only those related to the active editor's project are listed
   * (all of them when none matches).
   */
  private async getProjectNodes(): Promise<ProjectNode[]> {
    if (!this.cachedProjects) {
      this.pendingProjects ??= this.loadVisibleProjects();
      const pendingProjects = this.pendingProjects;

      try {
        const projects = await pendingProjects;

        // A refresh during the load outdated it: wait for the newer one
        if (this.pendingProjects !== pendingProjects) {
          return await this.getProjectNodes();
        }

        this.cachedProjects = projects;
      } finally {
        if (this.pendingProjects === pendingProjects) {
          this.pendingProjects = undefined;
        }
      }
    }

    return this.cachedProjects.map(({ label, projectDir }) => ({
      type: 'project',
      label,
      projectDir,
    }));
  }

  private async loadVisibleProjects(): Promise<Project[]> {
    const allProjectDirs = await listWorkspaceProjectDirs();
    const activeProjectDir =
      allProjectDirs.length > 1 ? findProjectRoot() : undefined;
    const activeProjectDirs = activeProjectDir
      ? allProjectDirs.filter((projectDir) =>
          isSameOrNested(projectDir, activeProjectDir)
        )
      : [];

    let projects = await loadProjects(
      activeProjectDirs.length > 0 ? activeProjectDirs : allProjectDirs
    );

    if (projects.length === 0 && activeProjectDirs.length > 0) {
      projects = await loadProjects(allProjectDirs);
    }

    return projects;
  }

  /** Whether a dictionary matches the search query by key or content. */
  private async matchesSearch(
    project: Project,
    fileName: string,
    loweredQuery: string
  ): Promise<boolean> {
    const jsonPath = join(project.dictionariesDir, fileName);

    if (this.forcedRevealJsonPath === jsonPath) return true;

    if (basename(fileName, '.json').toLowerCase().includes(loweredQuery)) {
      return true;
    }

    const dictionaries = await getCachedDictionary(jsonPath);

    return JSON.stringify(dictionaries ?? '')
      .toLowerCase()
      .includes(loweredQuery);
  }

  private async getDictionaryNodes(
    node: ProjectNode
  ): Promise<DictionaryNode[]> {
    const project = this.findProject(node.projectDir);

    if (!project) return [];

    let fileNames = project.dictionaryFileNames;

    if (this.searchQuery) {
      const loweredQuery = this.searchQuery.toLowerCase();
      const matches = await Promise.all(
        fileNames.map((fileName) =>
          this.matchesSearch(project, fileName, loweredQuery)
        )
      );

      fileNames = fileNames.filter((_fileName, index) => matches[index]);
    }

    return fileNames.map((fileName) => ({
      type: 'dictionary',
      key: basename(fileName, '.json'),
      jsonPath: join(project.dictionariesDir, fileName),
      projectDir: project.projectDir,
      projectLabel: project.label,
    }));
  }

  private async getFileNodes(node: DictionaryNode): Promise<FileNode[]> {
    let filePaths = [...new Set(await readDeclarationFilePaths(node.jsonPath))];

    if (this.searchQuery) {
      // Files matching the query first; dictionaries are not refiltered here
      const loweredQuery = this.searchQuery.toLowerCase();
      const isMatch = (filePath: string) =>
        filePath.toLowerCase().includes(loweredQuery);

      filePaths = [
        ...filePaths.filter(isMatch),
        ...filePaths.filter((filePath) => !isMatch(filePath)),
      ];
    }

    return filePaths.map((filePath) => ({
      type: 'file',
      filePath,
      projectDir: node.projectDir,
      dictionaryJsonPath: node.jsonPath,
    }));
  }

  getParent(element: IntlayerTreeNode): IntlayerTreeNode | undefined {
    if (element.type === 'file') {
      return {
        type: 'dictionary',
        key: basename(element.dictionaryJsonPath, '.json'),
        jsonPath: element.dictionaryJsonPath,
        projectDir: element.projectDir,
        projectLabel:
          this.findProject(element.projectDir)?.label ??
          basename(element.projectDir),
      };
    }

    if (element.type === 'dictionary') {
      const project = this.findProject(element.projectDir);

      return project
        ? {
            type: 'project',
            label: project.label,
            projectDir: project.projectDir,
          }
        : undefined;
    }

    return undefined;
  }

  async getTreeItem(element: IntlayerTreeNode): Promise<TreeItem> {
    if (element.type === 'project') {
      const selectedEnvironment = getSelectedEnvironment(element.projectDir);
      const item = new TreeItem(
        selectedEnvironment
          ? `${element.label} [${selectedEnvironment}]`
          : element.label,
        TreeItemCollapsibleState.Collapsed
      );

      // Context values are referenced by the `view/item/context` menus
      item.contextValue = 'intlayer.environment';
      item.id = `env:${element.projectDir}`;
      item.tooltip = selectedEnvironment
        ? `${element.projectDir} — env: ${selectedEnvironment}`
        : element.projectDir;

      return item;
    }

    if (element.type === 'dictionary') {
      const item = new TreeItem(
        element.key,
        TreeItemCollapsibleState.Collapsed
      );

      item.contextValue = 'intlayer.dictionary';
      item.id = `dict:${element.jsonPath}`;
      item.tooltip = `${element.projectLabel} • ${element.jsonPath}`;

      return item;
    }

    const fileUri = Uri.file(join(element.projectDir, element.filePath));
    const workspaceFolder = workspace.getWorkspaceFolder(fileUri);
    const item = new TreeItem(
      workspaceFolder
        ? relative(workspaceFolder.uri.fsPath, fileUri.fsPath)
        : element.filePath,
      TreeItemCollapsibleState.None
    );

    item.contextValue = 'intlayer.file';
    item.id = `file:${element.dictionaryJsonPath}::${element.filePath}`;
    item.resourceUri = fileUri;
    item.command = {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [fileUri],
    };

    return item;
  }
}
