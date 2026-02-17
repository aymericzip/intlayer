import { promises as fs } from 'node:fs';
import path from 'node:path';
import { readAsset } from 'utils:asset';
import { getMarkdownMetadata } from '@intlayer/core';

export const SKILLS_METADATA = {
  Usage: 'How to use Intlayer in your project',
  RemoteContent: 'How to use Intlayer with Remote/CMS/Server-side content',
  Config: 'Intlayer configuration documentation',
  Content: 'Reference for all Intlayer content node types (t, enu, etc.)',
  React: 'React-specific syntax and hooks usage',
  Angular: 'Angular-specific syntax and Injectable Function usage',
  NextJS: 'Next.js-specific usage (Server & Client components)',
  Vue: 'Vue-specific composables and syntax',
  Preact: 'Preact-specific syntax and hooks usage',
  Solid:
    'Integrates Intlayer internationalization with SolidJS components. Use when the user asks to "setup SolidJS i18n", use the "useIntlayer" hook in Solid, or manage locales in a SolidJS application.',
  Svelte: 'Svelte-specific stores and syntax',
  Astro: 'Astro-specific usage and getIntlayer',
  CLI: 'Intlayer CLI commands and usage',
} as const;

export const SKILLS = Object.keys(
  SKILLS_METADATA
) as (keyof typeof SKILLS_METADATA)[];

export type Skill = (typeof SKILLS)[number];

/**
 * Maps specific skill keys to special filenames if they differ from standard snake_case.
 */
const SKILL_FILENAME_MAP: Partial<Record<Skill, string>> = {};

/**
 * Configuration for Platform paths to keep code clean.
 */
const PLATFORM_DIRS = {
  Cursor: '.cursor/skills',
  Windsurf: '.windsurf/skills',
  Trae: '.trae/skills',
  OpenCode: '.opencode/skills',
  GitHub: '.github/skills',
  Claude: '.claude/skills',
  VSCode: '.vscode/skills', // Fixed: VSCode usually uses .vscode, not .github
  Antigravity: '.agent/skills',
  Augment: '.augment/skills',
  OpenClaw: 'skills',
  Cline: '.cline/skills',
  CodeBuddy: '.codebuddy/skills',
  CommandCode: '.commandcode/skills',
  Continue: '.continue/skills',
  Crush: '.crush/skills',
  Droid: '.factory/skills',
  Goose: '.goose/skills',
  Junie: '.junie/skills',
  IFlow: '.iflow/skills',
  KiloCode: '.kilocode/skills',
  Kiro: '.kiro/skills',
  Kode: '.kode/skills',
  MCPJam: '.mcpjam/skills',
  MistralVibe: '.vibe/skills',
  Mux: '.mux/skills',
  OpenHands: '.openhands/skills',
  Pi: '.pi/skills',
  Qoder: '.qoder/skills',
  Qwen: '.qwen/skills',
  RooCode: '.roo/skills',
  TraeCN: '.trae/skills',
  Zencoder: '.zencoder/skills',
  Neovate: '.neovate/skills',
  Pochi: '.pochi/skills',
  Other: 'skills',
};

type Platform = keyof typeof PLATFORM_DIRS;

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
  // 1. Determine destination directory
  const relativeDir = PLATFORM_DIRS[platform] ?? 'skills';
  const skillsBaseDir = path.join(projectRoot, relativeDir);

  const useAgentStructure = platform !== 'VSCode';

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

    if (useAgentStructure) {
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
            fileName = metadata.slugs
              .filter((slug) => slug !== 'doc')
              .join('_');
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
    } else {
      // Flat Structure (Generic/VSCode): .../skills/<skill-name>.md
      const fileName = `${skillName}.md`;
      const filePath = path.join(skillsBaseDir, fileName);

      await fs.writeFile(filePath, skillContent, 'utf-8');
      createdSkills.push(fileName);
    }
  }

  if (createdSkills.length === 0) {
    return `No skill files were created. Check your asset paths.`;
  }

  return `Created ${createdSkills.length} skills in ${skillsBaseDir}`;
};
