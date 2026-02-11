import { promises as fs } from 'node:fs';
import path from 'node:path';
import { readAsset } from 'utils:asset';

export const SKILLS_METADATA = {
  Setup: 'General Intlayer setup guide',
  Usage: 'How to use Intlayer in your project',
  RemoteContent: 'How to use Intlayer with Remote/CMS/Server-side content',
  Config: 'Intlayer configuration documentation',
  ExtraAction: 'Additional CLI and automated actions',
  Content: 'Reference for all Intlayer content node types (t, enu, etc.)',
  React: 'React-specific syntax and hooks usage',
  Angular: 'Angular-specific syntax and Injectable Function usage',
  NextJS: 'Next.js-specific usage (Server & Client components)',
  Vue: 'Vue-specific composables and syntax',
  Svelte: 'Svelte-specific stores and syntax',
  Astro: 'Astro-specific usage and getIntlayer',
} as const;

export const SKILLS = Object.keys(
  SKILLS_METADATA
) as (keyof typeof SKILLS_METADATA)[];

export type Skill = (typeof SKILLS)[number];

/**
 * Helper to convert CamelCase to snake_case
 */
const camelToSnakeCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

const getSkillContent = (skill: Skill): string => {
  const fileName = `./skills/${camelToSnakeCase(skill)}.md`;
  return readAsset(fileName);
};

export const installSkills = async (
  projectRoot: string,
  platform: 'Cursor' | 'VSCode' | 'OpenCode' | 'Claude' | 'Other',
  skills: Skill[]
): Promise<string> => {
  const content = skills.map((skill) => getSkillContent(skill)).join('\n\n');

  if (platform === 'Cursor' || platform === 'Claude') {
    const fileName = platform === 'Cursor' ? '.cursorrules' : '.clauderules';
    const filePath = path.join(projectRoot, fileName);
    try {
      let existingContent = '';
      try {
        existingContent = await fs.readFile(filePath, 'utf-8');
      } catch {
        // File doesn't exist, ignore
      }

      const newContent = existingContent
        ? `${existingContent}\n\n${content}`
        : content;
      await fs.writeFile(filePath, newContent, 'utf-8');
      return `Updated ${fileName} with ${skills.join(', ')} skills.`;
    } catch (error) {
      throw new Error(`Failed to write ${fileName}: ${error}`);
    }
  } else {
    // For other platforms, write to .intlayer/skills
    const skillsDir = path.join(projectRoot, '.intlayer/skills');
    await fs.mkdir(skillsDir, { recursive: true });

    const createdFiles: string[] = [];

    for (const skill of skills) {
      const fileName = `${camelToSnakeCase(skill)}.md`;
      const filePath = path.join(skillsDir, fileName);
      await fs.writeFile(filePath, getSkillContent(skill), 'utf-8');
      createdFiles.push(filePath);
    }

    return `Created skills files in ${skillsDir}: ${createdFiles.map((f) => path.basename(f)).join(', ')}`;
  }
};
