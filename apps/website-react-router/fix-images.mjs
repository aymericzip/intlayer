import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/components/I18nBenchmark/LibLogo.tsx',
  'src/components/CMSLandingPage/HeroSection.tsx',
  'src/components/ScannerPage/Analyzer/Results/AnalyzerSiteResults.tsx',
  'src/components/TMSLandingPage/HeroSection.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('const Image = (props: any) => <img {...props} />;\n')) {
    content = content.replace('const Image = (props: any) => <img {...props} />;\n', '');
    content = content + '\nconst Image = (props: any) => <img {...props} />;\n';
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
}
