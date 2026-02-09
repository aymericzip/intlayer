import { promises as fs } from 'node:fs';
import path from 'node:path';
import { readAsset } from 'utils:asset';

export const SKILLS = [
  'Setup',
  'Usage',
  'ServerContent',
  'Config',
  'ExtraAction',
  'Content',
] as const;

export type Skill = (typeof SKILLS)[number];

const getSkillContent = (skill: Skill): string => {
  const fileName = `./skills/${skill.toLowerCase()}.md`;
  return readAsset(fileName);
};

export const installSkills = async (
  projectRoot: string,
  platform: 'Cursor' | 'VSCode' | 'OpenCode' | 'Claude' | 'Other',
  skills: Skill[]
): Promise<string> => {
  const content = skills.map((skill) => getSkillContent(skill)).join('\n\n');

  if (platform === 'Cursor') {
    const cursorRulesPath = path.join(projectRoot, '.cursorrules');
    try {
      let existingContent = '';
      try {
        existingContent = await fs.readFile(cursorRulesPath, 'utf-8');
      } catch (e) {
        // File doesn't exist, ignore
      }

      const newContent = existingContent
        ? `${existingContent}\n\n${content}`
        : content;
      await fs.writeFile(cursorRulesPath, newContent, 'utf-8');
      return `Updated .cursorrules with ${skills.join(', ')} skills.`;
    } catch (error) {
      throw new Error(`Failed to write .cursorrules: ${error}`);
    }
  } else {
    // For other platforms, write to .intlayer/skills
    const skillsDir = path.join(projectRoot, '.intlayer/skills');
    await fs.mkdir(skillsDir, { recursive: true });

    const createdFiles: string[] = [];

    for (const skill of skills) {
      const fileName = `${skill.toLowerCase()}.md`;
      const filePath = path.join(skillsDir, fileName);
      await fs.writeFile(filePath, getSkillContent(skill), 'utf-8');
      createdFiles.push(filePath);
    }

    return `Created skills files in ${skillsDir}: ${createdFiles.map((f) => path.basename(f)).join(', ')}`;
  }
};
