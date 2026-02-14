import { promises as fs } from 'node:fs';
import https from 'node:https';
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
  Solid: 'Solid-specific primitives and syntax',
  Svelte: 'Svelte-specific stores and syntax',
  Astro: 'Astro-specific usage and getIntlayer',
  CLI: 'Intlayer CLI commands and usage',
} as const;

export const SKILLS = Object.keys(
  SKILLS_METADATA
) as (keyof typeof SKILLS_METADATA)[];

export type Skill = (typeof SKILLS)[number];

export type Platform =
  | 'Cursor'
  | 'Windsurf'
  | 'Trae'
  | 'OpenCode'
  | 'GitHub'
  | 'Claude'
  | 'VSCode'
  | 'Antigravity'
  | 'Augment'
  | 'OpenClaw'
  | 'Cline'
  | 'CodeBuddy'
  | 'CommandCode'
  | 'Continue'
  | 'Crush'
  | 'Droid'
  | 'Goose'
  | 'Junie'
  | 'IFlow'
  | 'KiloCode'
  | 'Kiro'
  | 'Kode'
  | 'MCPJam'
  | 'MistralVibe'
  | 'Mux'
  | 'OpenHands'
  | 'Pi'
  | 'Qoder'
  | 'Qwen'
  | 'RooCode'
  | 'TraeCN'
  | 'Zencoder'
  | 'Neovate'
  | 'Pochi'
  | 'Other';

/**
 * Maps specific skill keys to special filenames if they differ from standard snake_case.
 */
const SKILL_FILENAME_MAP: Partial<Record<Skill, string>> = {};

/**
 * Helper to convert CamelCase to snake_case for directory naming
 */
const camelToSnakeCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

/**
 * Reads the raw markdown content for a specific skill from the assets folder.
 */
const getSkillContent = (skill: Skill): string => {
  const baseName = SKILL_FILENAME_MAP[skill] ?? camelToSnakeCase(skill);
  // Source files are flat: ./skills/vue.md
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
 * Fetches the content of a URL (supporting redirects).
 */
const fetchUrl = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;

        if (statusCode === 301 || statusCode === 302) {
          const redirectUrl = res.headers.location;
          if (redirectUrl) {
            return fetchUrl(redirectUrl).then(resolve).catch(reject);
          }
        }

        if (statusCode !== 200) {
          return reject(
            new Error(`Failed to fetch ${url}: Status Code ${statusCode}`)
          );
        }

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });

/**
 * Installs skills using the "Agent Skills" directory standard.
 * Standard: <PROJECT_ROOT>/<CONFIG_DIR>/skills/<SKILL_NAME>/SKILL.md
 */
export const installSkills = async (
  projectRoot: string,
  platform: Platform,
  skills: Skill[]
): Promise<string> => {
  let skillsBaseDir = '';
  const useAgentStructure = platform !== 'VSCode';

  // Determine the root configuration directory based on Platform
  switch (platform) {
    case 'Cursor':
      skillsBaseDir = path.join(projectRoot, '.cursor/skills');
      break;
    case 'Windsurf':
      skillsBaseDir = path.join(projectRoot, '.windsurf/skills');
      break;
    case 'Trae':
      skillsBaseDir = path.join(projectRoot, '.trae/skills');
      break;
    case 'OpenCode':
      skillsBaseDir = path.join(projectRoot, '.opencode/skills');
      break;
    case 'GitHub': // GitHub Copilot Workspace
      skillsBaseDir = path.join(projectRoot, '.github/skills');
      break;
    case 'Claude': // Claude Desktop / Agent
      skillsBaseDir = path.join(projectRoot, '.claude/skills');
      break;
    case 'VSCode':
      skillsBaseDir = path.join(projectRoot, '.github/skills');
      break;
    case 'Antigravity':
      skillsBaseDir = path.join(projectRoot, '.agent/skills');
      break;
    case 'Augment':
      skillsBaseDir = path.join(projectRoot, '.augment/skills');
      break;
    case 'OpenClaw':
      skillsBaseDir = path.join(projectRoot, 'skills');
      break;
    case 'Cline':
      skillsBaseDir = path.join(projectRoot, '.cline/skills');
      break;
    case 'CodeBuddy':
      skillsBaseDir = path.join(projectRoot, '.codebuddy/skills');
      break;
    case 'CommandCode':
      skillsBaseDir = path.join(projectRoot, '.commandcode/skills');
      break;
    case 'Continue':
      skillsBaseDir = path.join(projectRoot, '.continue/skills');
      break;
    case 'Crush':
      skillsBaseDir = path.join(projectRoot, '.crush/skills');
      break;
    case 'Droid':
      skillsBaseDir = path.join(projectRoot, '.factory/skills');
      break;
    case 'Goose':
      skillsBaseDir = path.join(projectRoot, '.goose/skills');
      break;
    case 'Junie':
      skillsBaseDir = path.join(projectRoot, '.junie/skills');
      break;
    case 'IFlow':
      skillsBaseDir = path.join(projectRoot, '.iflow/skills');
      break;
    case 'KiloCode':
      skillsBaseDir = path.join(projectRoot, '.kilocode/skills');
      break;
    case 'Kiro':
      skillsBaseDir = path.join(projectRoot, '.kiro/skills');
      break;
    case 'Kode':
      skillsBaseDir = path.join(projectRoot, '.kode/skills');
      break;
    case 'MCPJam':
      skillsBaseDir = path.join(projectRoot, '.mcpjam/skills');
      break;
    case 'MistralVibe':
      skillsBaseDir = path.join(projectRoot, '.vibe/skills');
      break;
    case 'Mux':
      skillsBaseDir = path.join(projectRoot, '.mux/skills');
      break;
    case 'OpenHands':
      skillsBaseDir = path.join(projectRoot, '.openhands/skills');
      break;
    case 'Pi':
      skillsBaseDir = path.join(projectRoot, '.pi/skills');
      break;
    case 'Qoder':
      skillsBaseDir = path.join(projectRoot, '.qoder/skills');
      break;
    case 'Qwen':
      skillsBaseDir = path.join(projectRoot, '.qwen/skills');
      break;
    case 'RooCode':
      skillsBaseDir = path.join(projectRoot, '.roo/skills');
      break;
    case 'TraeCN':
      skillsBaseDir = path.join(projectRoot, '.trae/skills');
      break;
    case 'Zencoder':
      skillsBaseDir = path.join(projectRoot, '.zencoder/skills');
      break;
    case 'Neovate':
      skillsBaseDir = path.join(projectRoot, '.neovate/skills');
      break;
    case 'Pochi':
      skillsBaseDir = path.join(projectRoot, '.pochi/skills');
      break;
    default:
      skillsBaseDir = path.join(projectRoot, 'skills');
      break;
  }

  // Ensure the base directory exists
  await fs.mkdir(skillsBaseDir, { recursive: true });

  const createdSkills: string[] = [];
  const licenceContent = getLicenceContent();

  for (const skill of skills) {
    const baseName = SKILL_FILENAME_MAP[skill] ?? camelToSnakeCase(skill);
    const skillName = `intlayer_${baseName}`;
    const skillContent = getSkillContent(skill);

    if (!skillContent) continue;

    const urls = Array.from(
      new Set(
        skillContent.match(/https:\/\/intlayer\.org\/doc\/[^\s)]+\.md/g) || []
      )
    );

    if (useAgentStructure) {
      // Agent Standard: .../skills/<skill-name>/SKILL.md
      const skillDir = path.join(skillsBaseDir, skillName);

      await fs.mkdir(skillDir, { recursive: true });

      const filePath = path.join(skillDir, 'SKILL.md');

      await fs.writeFile(filePath, skillContent, 'utf-8');

      if (licenceContent) {
        const licencePath = path.join(skillDir, 'LICENCE.md');

        await fs.writeFile(licencePath, licenceContent, 'utf-8');
      }

      // Fetch and save documentation files
      const referenceDir = path.join(skillDir, 'reference');

      await fs.mkdir(referenceDir, { recursive: true });

      for (const url of urls) {
        try {
          const content = await fetchUrl(url);
          const metadata = getMarkdownMetadata<{
            slugs?: string[];
          }>(content);

          let fileName = '';

          if (Array.isArray(metadata.slugs)) {
            fileName = metadata.slugs
              .filter((slug) => slug !== 'doc')
              .join('_');
          } else {
            const urlPath = new URL(url).pathname;

            fileName = urlPath
              .split('/')
              .filter((part) => part !== '' && part !== 'doc')
              .map((part, index, array) => {
                if (index === array.length - 1) {
                  return part.replace('.md', '');
                }
                return part;
              })
              .join('_');
          }

          fileName = fileName ? `${fileName}.md` : 'index.md';

          const docPath = path.join(referenceDir, fileName);

          await fs.writeFile(docPath, content, 'utf-8');
        } catch (error) {
          console.warn(
            `Warning: Could not fetch documentation for ${skill} from ${url}:`,
            error
          );
        }
      }

      createdSkills.push(`${skillName}/SKILL.md`);
    } else {
      // Flat Structure (Generic): .../skills/<skill-name>.md
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
