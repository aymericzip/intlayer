import { promises as fs } from 'node:fs';
import path from 'node:path';
import { readAsset } from 'utils:asset';
import { getMarkdownMetadata } from '@intlayer/core/markdown';

/**
 * Metadata for each available documentation skill.
 */
export const SKILLS_METADATA = {
  Config: 'Intlayer configuration documentation',
  Content: 'Reference for all Intlayer content node types (t, enu, etc.)',
  Usage: 'How to use Intlayer in your project',
  CLI: 'Intlayer CLI commands and usage',
  Compiler:
    'Intlayer Compiler setup and usage for automatic content extraction without .content files',
  RemoteContent: 'How to use Intlayer with Remote/CMS/Server-side content',
  NextJS: 'Next.js-specific usage (Server & Client components)',
  React: 'React-specific syntax and hooks usage',
  Vue: 'Vue-specific composables and syntax',
  Svelte: 'Svelte-specific stores and syntax',
  Angular: 'Angular-specific syntax and Injectable Function usage',
  Preact: 'Preact-specific syntax and hooks usage',
  Solid:
    'Integrates Intlayer internationalization with SolidJS components. Use when the user asks to "setup SolidJS i18n", use the "useIntlayer" hook in Solid, or manage locales in a SolidJS application.',
  Astro: 'Astro-specific usage and getIntlayer',
} as const;

export type Skill = keyof typeof SKILLS_METADATA;

export const SKILLS = Object.keys(SKILLS_METADATA) as Skill[];

export const getInitialSkills = (
  deps: Record<string, string>
): (keyof typeof SKILLS_METADATA)[] => {
  const skills: (keyof typeof SKILLS_METADATA)[] = [
    'Usage',
    'Content',
    'Config',
    'CLI',
    'Compiler',
  ];

  if (deps.next) skills.push('NextJS');
  if (deps.react || !deps.next) skills.push('React');
  if (deps.preact) skills.push('Preact');
  if (deps['solid-js']) skills.push('Solid');
  if (deps.vue || deps.nuxt) skills.push('Vue');
  if (deps.svelte || deps['@sveltejs/kit']) skills.push('Svelte');
  if (deps.astro) skills.push('Astro');

  return skills;
};

export interface PlatformMetadata {
  label: string;
  dir: string;
  check?: () => boolean;
}

/**
 * Metadata and configuration for each supported platform.
 */
export const PLATFORMS_METADATA: Record<string, PlatformMetadata> = {
  Cursor: {
    label: 'Cursor',
    dir: '.cursor/skills',
    check: () =>
      process.env.CURSOR === 'true' || process.env.TERM_PROGRAM === 'cursor',
  },
  Windsurf: {
    label: 'Windsurf',
    dir: '.windsurf/skills',
    check: () =>
      process.env.WINDSURF === 'true' ||
      process.env.TERM_PROGRAM === 'windsurf',
  },
  Trae: {
    label: 'Trae',
    dir: '.trae/skills',
    check: () =>
      process.env.TRAE === 'true' || process.env.TERM_PROGRAM === 'trae',
  },
  TraeCN: {
    label: 'Trae CN',
    dir: '.trae/skills',
    check: () => process.env.TRAE_CN === 'true',
  },
  VSCode: {
    label: 'VS Code',
    dir: '.vscode/skills',
    check: () =>
      process.env.VSCODE === 'true' || process.env.TERM_PROGRAM === 'vscode',
  },
  OpenCode: {
    label: 'OpenCode',
    dir: '.opencode/skills',
    check: () => process.env.OPENCODE === 'true',
  },
  Claude: {
    label: 'Claude Code',
    dir: '.claude/skills',
    check: () => process.env.CLAUDE === 'true',
  },
  GitHub: {
    label: 'GitHub Copilot Workspace',
    dir: '.github/skills',
    check: () =>
      process.env.GITHUB_ACTIONS === 'true' || !!process.env.GITHUB_WORKSPACE,
  },
  Antigravity: {
    label: 'Antigravity',
    dir: '.agent/skills',
  },
  Augment: {
    label: 'Augment',
    dir: '.augment/skills',
  },
  OpenClaw: {
    label: 'OpenClaw',
    dir: 'skills',
  },
  Cline: {
    label: 'Cline',
    dir: '.cline/skills',
  },
  CodeBuddy: {
    label: 'CodeBuddy',
    dir: '.codebuddy/skills',
  },
  CommandCode: {
    label: 'Command Code',
    dir: '.commandcode/skills',
  },
  Continue: {
    label: 'Continue',
    dir: '.continue/skills',
  },
  Crush: {
    label: 'Crush',
    dir: '.crush/skills',
  },
  Droid: {
    label: 'Droid',
    dir: '.factory/skills',
  },
  Goose: {
    label: 'Goose',
    dir: '.goose/skills',
  },
  IFlow: {
    label: 'iFlow CLI',
    dir: '.iflow/skills',
  },
  Junie: {
    label: 'Junie',
    dir: '.junie/skills',
  },
  KiloCode: {
    label: 'Kilo Code',
    dir: '.kilocode/skills',
  },
  Kiro: {
    label: 'Kiro CLI',
    dir: '.kiro/skills',
  },
  Kode: {
    label: 'Kode',
    dir: '.kode/skills',
  },
  MCPJam: {
    label: 'MCPJam',
    dir: '.mcpjam/skills',
  },
  MistralVibe: {
    label: 'Mistral Vibe',
    dir: '.vibe/skills',
  },
  Mux: {
    label: 'Mux',
    dir: '.mux/skills',
  },
  OpenHands: {
    label: 'OpenHands',
    dir: '.openhands/skills',
  },
  Pi: {
    label: 'Pi',
    dir: '.pi/skills',
  },
  Qoder: {
    label: 'Qoder',
    dir: '.qoder/skills',
  },
  Qwen: {
    label: 'Qwen Code',
    dir: '.qwen/skills',
  },
  RooCode: {
    label: 'Roo Code',
    dir: '.roo/skills',
  },
  Zencoder: {
    label: 'Zencoder',
    dir: '.zencoder/skills',
  },
  Neovate: {
    label: 'Neovate',
    dir: '.neovate/skills',
  },
  Pochi: {
    label: 'Pochi',
    dir: '.pochi/skills',
  },
  Other: {
    label: 'Other',
    dir: 'skills',
  },
} as const;

export type Platform = keyof typeof PLATFORMS_METADATA;

export const PLATFORMS = Object.keys(PLATFORMS_METADATA) as Platform[];

/**
 * Maps specific skill keys to special filenames if they differ from standard snake_case.
 */
const SKILL_FILENAME_MAP: Partial<Record<Skill, string>> = {};

/**
 * Helper to convert CamelCase to kebab-case for directory naming
 */
const camelToKebabCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Reads the raw markdown content for a specific skill from the assets folder.
 */
const getSkillContent = (skill: Skill): string => {
  const baseName = SKILL_FILENAME_MAP[skill] ?? camelToKebabCase(skill);
  const fileName = `./skills/${baseName}.md`;

  try {
    return readAsset(fileName);
  } catch {
    console.warn(
      `Warning: Could not read asset for skill: ${skill} at ${fileName}`
    );
    return '';
  }
};

/**
 * Reads the licence content from the assets folder.
 */
const getLicenceContent = (): string => {
  try {
    return readAsset('./LICENCE.md');
  } catch {
    console.warn('Warning: Could not read LICENCE.md asset');
    return '';
  }
};

/**
 * Fetches the content of a URL using native fetch.
 */
const fetchUrlContent = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.text();
};

/**
 * Installs skills using the "Agent Skills" directory standard.
 * Standard: <PROJECT_ROOT>/<CONFIG_DIR>/skills/<SKILL_NAME>/SKILL.md
 */
export const installSkills = async (
  projectRoot: string,
  platform: Platform,
  skills: Skill[]
): Promise<string> => {
  // Determine destination directory
  const relativeDir = PLATFORMS_METADATA[platform].dir ?? 'skills';
  const skillsBaseDir = path.join(projectRoot, relativeDir);

  // Ensure the base directory exists
  await fs.mkdir(skillsBaseDir, { recursive: true });

  const createdSkills: string[] = [];
  const licenceContent = getLicenceContent();

  for (const skill of skills) {
    const baseName = SKILL_FILENAME_MAP[skill] ?? camelToKebabCase(skill);
    const skillName = `intlayer-${baseName}`;
    const skillContent = getSkillContent(skill);

    if (!skillContent) continue;

    // Extract unique URLs
    const urls = Array.from(
      new Set(
        skillContent.match(/https:\/\/intlayer\.org\/doc\/[^\s)]+\.md/g) || []
      )
    );

    // Agent Standard: .../skills/<skill-name>/SKILL.md
    const skillDir = path.join(skillsBaseDir, skillName);
    const referenceDir = path.join(skillDir, 'references');

    // Ensure directories exist
    await fs.mkdir(referenceDir, { recursive: true });

    // Write License
    if (licenceContent) {
      await fs.writeFile(
        path.join(skillDir, 'LICENCE.md'),
        licenceContent,
        'utf-8'
      );
    }

    let updatedSkillContent = skillContent;

    // Parallel download of references
    const downloadPromises = urls.map(async (url) => {
      try {
        const content = await fetchUrlContent(url);
        const metadata = getMarkdownMetadata<{ slugs?: string[] }>(content);

        let fileName = '';

        // Determine filename from slugs or URL path
        if (Array.isArray(metadata.slugs)) {
          fileName = metadata.slugs.filter((slug) => slug !== 'doc').join('_');
        } else {
          const urlPath = new URL(url).pathname;
          fileName = urlPath
            .split('/')
            .filter((part) => part && part !== 'doc')
            .map((part) => part.replace('.md', '')) // Clean extension for joining
            .join('_');
        }

        // Ensure it ends with .md
        fileName = fileName ? `${fileName}.md` : 'index.md';
        const localRefPath = `references/${fileName}`;

        return {
          url,
          localRefPath,
          fileName,
          content,
          success: true,
        };
      } catch (error) {
        console.warn(
          `Warning: Failed to download ref ${url} for skill ${skill}`,
          error
        );
        return { url, success: false };
      }
    });

    const results = await Promise.all(downloadPromises);

    // Process results: Write files and update content string
    for (const res of results) {
      if (res.success && res.fileName && res.content && res.localRefPath) {
        // Write the reference file
        await fs.writeFile(
          path.join(referenceDir, res.fileName),
          res.content,
          'utf-8'
        );

        // Update the main content to point to local file
        updatedSkillContent = updatedSkillContent.replaceAll(
          res.url,
          res.localRefPath
        );
      }
    }

    // Write the main SKILL.md
    const filePath = path.join(skillDir, 'SKILL.md');
    await fs.writeFile(filePath, updatedSkillContent, 'utf-8');
    createdSkills.push(`${skillName}/SKILL.md`);
  }

  if (createdSkills.length === 0) {
    return `No skill files were created. Check your asset paths.`;
  }

  return `Created ${createdSkills.length} skills in ${skillsBaseDir}`;
};
