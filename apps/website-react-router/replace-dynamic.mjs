import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/components/TMSLandingPage/index.tsx',
  'src/components/LandingPage/FeaturesSection/index.tsx',
  'src/components/LandingPage/index.tsx',
  'src/components/CMSLandingPage/index.tsx',
  'src/components/DocPage/DocumentationRender.tsx',
  'src/components/TranslationLandingPage/index.tsx',
  'src/components/Navbar/index.tsx',
  'src/app/[locale]/(playground)/playground/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes("import { lazy as dynamic } from 'react';")) {
    content = content.replace("import { lazy as dynamic } from 'react';", "import dynamic from '@utils/dynamic';");
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
}
