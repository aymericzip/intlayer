import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/structuredData/TranslateSoftwareApplicationHeader.tsx',
  'src/structuredData/OrganizationHeader.tsx',
  'src/structuredData/ScannerSoftwareApplicationHeader.tsx',
  'src/structuredData/TMSProductHeader.tsx',
  'src/structuredData/BreadcrumbsHeader.tsx',
  'src/structuredData/FAQPageHeader.tsx',
  'src/structuredData/TranslateProductHeader.tsx',
  'src/structuredData/CreativeWorkHeader.tsx',
  'src/structuredData/SoftwareApplication.tsx',
  'src/structuredData/ProductHeader.tsx',
  'src/structuredData/WebsiteHeader.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('const Script = (props: any) => <script {...props} />;\n')) {
    content = content.replace('const Script = (props: any) => <script {...props} />;\n', '');
    content = content + '\nconst Script = (props: any) => <script {...props} />;\n';
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
}
