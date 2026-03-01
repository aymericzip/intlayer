import * as readline from 'node:readline';
import { installSkills, SKILLS, type Skill } from '@intlayer/cli';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';

const PLATFORMS = [
  'Cursor',
  'Windsurf',
  'Trae',
  'OpenCode',
  'GitHub',
  'Claude',
  'VSCode',
  'Antigravity',
  'Augment',
  'OpenClaw',
  'Cline',
  'CodeBuddy',
  'CommandCode',
  'Continue',
  'Crush',
  'Droid',
  'Goose',
  'Junie',
  'IFlow',
  'KiloCode',
  'Kiro',
  'Kode',
  'MCPJam',
  'MistralVibe',
  'Mux',
  'OpenHands',
  'Pi',
  'Qoder',
  'Qwen',
  'RooCode',
  'TraeCN',
  'Zencoder',
  'Neovate',
  'Pochi',
  'Other',
] as const;

export const loadInstallSkillsTool = (server: McpServer): void => {
  server.registerTool(
    'intlayer-install-skills',
    {
      title: 'Install Intlayer Skills',
      description:
        'Install Intlayer documentation and skills to the project to assist AI agents. Ask the user for the platform (Cursor, VSCode, OpenCode, Claude, etc.) and which skills they want to install before calling this tool.',
      inputSchema: {
        platform: z
          .enum([
            'Cursor',
            'Windsurf',
            'Trae',
            'OpenCode',
            'GitHub',
            'Claude',
            'VSCode',
            'Antigravity',
            'Augment',
            'OpenClaw',
            'Cline',
            'CodeBuddy',
            'CommandCode',
            'Continue',
            'Crush',
            'Droid',
            'Goose',
            'Junie',
            'IFlow',
            'KiloCode',
            'Kiro',
            'Kode',
            'MCPJam',
            'MistralVibe',
            'Mux',
            'OpenHands',
            'Pi',
            'Qoder',
            'Qwen',
            'RooCode',
            'TraeCN',
            'Zencoder',
            'Neovate',
            'Pochi',
            'Other',
          ])
          .describe('The platform to install skills for'),
        skills: z.array(z.enum(SKILLS)).describe('List of skills to install'),
        projectRoot: z
          .string()
          .optional()
          .describe(
            'Root directory of the project. Defaults to current directory.'
          ),
      },
    },
    async ({ platform, skills, projectRoot }) => {
      try {
        const root = projectRoot || process.cwd();
        const message = await installSkills(
          root,
          platform as any,
          skills as any
        );

        return {
          content: [
            {
              type: 'text',
              text: message,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to install skills: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
};

export const runInstallSkillsCLI = async (): Promise<void> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> =>
    new Promise((resolve) => rl.question(query, resolve));

  try {
    console.log('Install Intlayer Skills');
    console.log('-----------------------');

    const platformInput = await question(
      'Which platform are you using? (Cursor, Windsurf, Trae, OpenCode, GitHub, Claude, VSCode, Cline, RooCode, etc. or "Other"): '
    );

    // we only accept a single platform here, not an array like the main CLI
    const platform =
      PLATFORMS.find(
        (platform) =>
          platform.toLowerCase() === platformInput.trim().toLowerCase()
      ) || ('Other' as const);

    console.log(`Selected platform: ${platform}`);

    console.log('\nAvailable skills:');

    SKILLS.forEach((skill, i) => {
      console.log(`${i + 1}. ${skill}`);
    });

    const skillsInput = await question(
      '\nWhich skills do you want to install? (comma separated numbers, e.g. 1,2,3 or "all"): '
    );

    let selectedSkills: Skill[] = [];
    if (skillsInput.trim().toLowerCase() === 'all') {
      selectedSkills = [...SKILLS];
    } else {
      const indices = skillsInput
        .split(',')
        .map((skill) => parseInt(skill.trim(), 10) - 1)
        .filter(
          (skill) => !Number.isNaN(skill) && skill >= 0 && skill < SKILLS.length
        );
      selectedSkills = indices.map((i) => SKILLS[i] as any);
    }

    if (selectedSkills.length === 0) {
      console.log('No valid skills selected. Exiting.');
      rl.close();
      return;
    }

    console.log(`Installing skills: ${selectedSkills.join(', ')}...`);
    const result = await installSkills(process.cwd(), platform, selectedSkills);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};
