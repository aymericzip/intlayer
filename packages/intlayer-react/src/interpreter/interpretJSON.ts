import type { ContentModule } from 'intlayer';

export const interpretContent = (json: string): ContentModule => {
  return JSON.parse(json) as ContentModule;
};
