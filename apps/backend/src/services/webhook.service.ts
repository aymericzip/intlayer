import { createHmac } from 'node:crypto';
import { logger } from '@logger';
import { Octokit } from '@octokit/rest';
import type { Project } from '@/types/project.types';

export type TriggerResult = {
  target: string;
  success: boolean;
  message?: string;
};

/**
 * Main entry point to trigger all configured CI pipelines for a project
 */
export const triggerAll = async (
  project: Project
): Promise<TriggerResult[]> => {
  const results: TriggerResult[] = [];

  // Trigger Git Provider Pipeline (if configured)
  if (project.repository && project.webhooks?.autoTriggerBuilds) {
    try {
      await triggerGitPipeline(project);
      results.push({
        target: project.repository.provider,
        success: true,
      });
    } catch (error: any) {
      logger.error(`Failed to trigger ${project.repository.provider}`, error);
      results.push({
        target: project.repository.provider,
        success: false,
        message: error.message || String(error),
      });
    }
  }

  // Trigger Generic Webhooks (Vercel, etc.)
  const webhooks = project.webhooks?.webhooks || [];

  // Using Promise.all is often better here, but keeping your sequential loop logic for safety
  for (const hook of webhooks) {
    if (!hook.enabled) continue;
    try {
      await triggerGenericWebhook(hook);
      results.push({ target: hook.name, success: true });
    } catch (error: any) {
      logger.error(`Failed to trigger webhook ${hook.name}`, error);
      results.push({
        target: hook.name,
        success: false,
        message: error.message || String(error),
      });
    }
  }

  return results;
};

/**
 * Triggers a single webhook by index
 */
export const triggerSingleWebhook = async (
  project: Project,
  webhookIndex: number
): Promise<TriggerResult> => {
  const webhooks = project.webhooks?.webhooks || [];

  if (webhookIndex < 0 || webhookIndex >= webhooks.length) {
    throw new Error(`Webhook index ${webhookIndex} is out of range`);
  }

  const hook = webhooks[webhookIndex];

  if (!hook.enabled) {
    throw new Error(`Webhook "${hook.name}" is disabled`);
  }

  try {
    await triggerGenericWebhook(hook);
    return { target: hook.name, success: true };
  } catch (error: any) {
    logger.error(`Failed to trigger webhook ${hook.name}`, error);
    return {
      target: hook.name,
      success: false,
      message: error.message || String(error),
    };
  }
};

// Internal Helper Functions (equivalent to private static methods)

const triggerGitPipeline = async (project: Project) => {
  const { repository, oAuth2Access } = project;

  if (!repository) throw new Error('No repository configured');

  const token = oAuth2Access?.[0]?.accessToken?.[0]; // Get the first valid token

  if (!token) throw new Error('No valid OAuth token found');

  const { provider } = repository;

  switch (provider) {
    case 'github':
      return triggerGithub(repository, token);
    case 'gitlab':
      return triggerGitlab(repository, token);
    case 'bitbucket':
      return triggerBitbucket(repository, token);
    default:
      throw new Error(`Unknown provider: ${provider as string}`);
  }
};

const triggerGithub = async (repo: any, token: string) => {
  const octokit = new Octokit({ auth: token });

  // Triggers a 'repository_dispatch' event
  // Workflow must listen to: types: [intlayer_cms_update]
  await octokit.repos.createDispatchEvent({
    owner: repo.owner,
    repo: repo.repository,
    event_type: 'intlayer_cms_update',
    client_payload: {
      timestamp: new Date().toISOString(),
      source: 'intlayer-cms',
    },
  });

  logger.info(
    `Successfully triggered GitHub Action for ${repo.owner}/${repo.repository}`
  );
};

// GitLab
const triggerGitlab = async (repo: any, token: string) => {
  // GitLab needs Project ID (int) or URL-encoded path "owner/repo"
  const projectId = encodeURIComponent(`${repo.owner}/${repo.repository}`);
  const branch = repo.branch || 'main';
  const baseUrl = repo.instanceUrl || 'https://gitlab.com';

  const url = `${baseUrl}/api/v4/projects/${projectId}/trigger/pipeline`;

  const formData = new FormData();
  formData.append('token', token); // Or a specific trigger token if stored separately
  formData.append('ref', branch);
  formData.append('variables[INTLAYER_UPDATE]', 'true');

  const res = await fetch(url, { method: 'POST', body: formData });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitLab error: ${res.status} - ${errorText}`);
  }

  logger.info(
    `Successfully triggered GitLab pipeline for ${repo.owner}/${repo.repository}`
  );
};

// Bitbucket
const triggerBitbucket = async (repo: any, token: string) => {
  const workspace = repo.workspace || repo.owner; // Bitbucket uses 'workspace'
  const branch = repo.branch || 'main';
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repo.repository}/pipelines/`;

  const body = {
    target: {
      ref_type: 'branch',
      type: 'pipeline_ref_target',
      ref_name: branch,
      // Optional: Target a custom pipeline for security
      // selector: { type: 'custom', pattern: 'intlayer-update' }
    },
    variables: [{ key: 'INTLAYER_UPDATE', value: 'true', secured: false }],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Bitbucket error: ${res.status} - ${errorText}`);
  }

  logger.info(
    `Successfully triggered Bitbucket pipeline for ${workspace}/${repo.repository}`
  );
};

// Generic Webhook
const triggerGenericWebhook = async (hook: any) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add secret signature if provided (for webhook verification)
  if (hook.secret) {
    // Simple HMAC-SHA256 signature (can be enhanced)
    const payload = JSON.stringify({ event: 'intlayer_cms_update' });
    const signature = createHmac('sha256', hook.secret)
      .update(payload)
      .digest('hex');
    headers['X-Intlayer-Signature'] = signature;
  }

  const res = await fetch(hook.url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      event: 'intlayer_cms_update',
      timestamp: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Webhook ${hook.name} failed: ${res.status} - ${errorText}`
    );
  }

  logger.info(`Successfully triggered webhook: ${hook.name}`);
};
