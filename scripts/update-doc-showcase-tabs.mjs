#!/usr/bin/env node
/**
 * For all Markdown under docs/docs with applicationTemplate + applicationShowcase:
 * - Tabs containing the matching ide.intlayer.org embed get a Demo tab when missing.
 * - Standalone IDE iframes for that repo are removed; full Tabs (Video/Code/Demo) are inserted after the first H1 when no such Tabs exist.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.join(__dirname, '..', 'docs', 'docs');

const LABELS = {
  en: { video: 'Video', code: 'Code', demo: 'Demo' },
  'en-GB': { video: 'Video', code: 'Code', demo: 'Demo' },
  fr: { video: 'Vidéo', code: 'Code', demo: 'Démo' },
  de: { video: 'Video', code: 'Code', demo: 'Demo' },
  es: { video: 'Vídeo', code: 'Código', demo: 'Demo' },
  it: { video: 'Video', code: 'Codice', demo: 'Demo' },
  pt: { video: 'Vídeo', code: 'Código', demo: 'Demo' },
  pl: { video: 'Wideo', code: 'Kod', demo: 'Demo' },
  ru: { video: 'Видео', code: 'Код', demo: 'Демо' },
  uk: { video: 'Відео', code: 'Код', demo: 'Демо' },
  ja: { video: '動画', code: 'コード', demo: 'デモ' },
  zh: { video: '视频', code: '代码', demo: '演示' },
  ko: { video: '동영상', code: '코드', demo: '데모' },
  vi: { video: 'Video', code: 'Mã nguồn', demo: 'Bản demo' },
  ar: { video: 'فيديو', code: 'كود', demo: 'تجربة' },
  hi: { video: 'वीडियो', code: 'कोड', demo: 'डेमो' },
  tr: { video: 'Video', code: 'Kod', demo: 'Demo' },
  id: { video: 'Video', code: 'Kode', demo: 'Demo' },
  cs: { video: 'Video', code: 'Kód', demo: 'Demo' },
  nl: { video: 'Video', code: 'Code', demo: 'Demo' },
  bn: { video: 'ভিডিও', code: 'কোড', demo: 'ডেমো' },
  ur: { video: 'ویڈیو', code: 'کوڈ', demo: 'ڈیمو' },
};

function labelsFor(locale) {
  return LABELS[locale] || LABELS.en;
}

function parseGithubRepo(url) {
  const m = String(url)
    .trim()
    .match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/);
  if (!m) return null;
  const repo = m[2].replace(/\.git$/i, '');
  return { owner: m[1], repo };
}

function youtubeId(url) {
  if (!url) return null;
  const u = String(url).trim();
  let m = u.match(/[?&]v=([^&]+)/);
  if (m) return m[1];
  m = u.match(/youtu\.be\/([^?]+)/);
  return m ? m[1] : null;
}

function parseFrontmatterKeys(fm) {
  const keys = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (m) keys[m[1]] = m[2].trim();
  }
  return keys;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function ideSrcFromRepo(owner, repo) {
  return `https://ide.intlayer.org/${owner}/${repo}?embed=1&ctl=1&file=intlayer.config.ts`;
}

function findTabsBlockForRepo(body, owner, repo) {
  const needle = `ide.intlayer.org/${owner}/${repo}`;
  let pos = 0;
  while (pos < body.length) {
    const tabsStart = body.indexOf('<Tabs', pos);
    if (tabsStart === -1) return null;
    const tabsEnd = body.indexOf('</Tabs>', tabsStart);
    if (tabsEnd === -1) return null;
    const end = tabsEnd + '</Tabs>'.length;
    const block = body.slice(tabsStart, end);
    if (block.includes(needle)) return { start: tabsStart, end, block };
    pos = tabsStart + 5;
  }
  return null;
}

function buildTabsBlock({
  labels,
  videoId,
  ideSrc,
  showcaseUrl,
  codeIframeTitle,
  demoIframeTitle,
}) {
  const iframeClass =
    'className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"';
  const demoIframe = `<iframe
      src="${showcaseUrl}"
      ${iframeClass}
      title="${demoIframeTitle.replace(/"/g, '&quot;')}"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      loading="lazy"
    />`;

  const codeIframe = `<iframe
  src="${ideSrc}"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="${codeIframeTitle.replace(/"/g, '&quot;')}"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>`;

  if (videoId) {
    const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1`;
    return `<Tabs defaultTab="video">
  <Tab label="${labels.video}" value="video">
  
<iframe title="Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="${embedSrc}"/>

  </Tab>
  <Tab label="${labels.code}" value="code">

${codeIframe}

  </Tab>
  <Tab label="${labels.demo}" value="demo">
    ${demoIframe}
  </Tab>
</Tabs>`;
  }

  return `<Tabs defaultTab="code">
  <Tab label="${labels.code}" value="code">

${codeIframe}

  </Tab>
  <Tab label="${labels.demo}" value="demo">
    ${demoIframe}
  </Tab>
</Tabs>`;
}

function blockHasDemoWithShowcase(block, showcaseUrl) {
  if (!block.includes('value="demo"')) return false;
  const norm = (u) => u.replace(/\/$/, '');
  const n = norm(showcaseUrl);
  return block.includes(`src="${n}"`) || block.includes(`src="${showcaseUrl}"`);
}

function insertDemoTabIntoTabsBlock(block, labels, showcaseUrl, demoTitle) {
  if (blockHasDemoWithShowcase(block, showcaseUrl)) return block;
  const iframeClass =
    'className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"';
  const demoTab = `
  <Tab label="${labels.demo}" value="demo">
    <iframe
      src="${showcaseUrl}"
      ${iframeClass}
      title="${demoTitle.replace(/"/g, '&quot;')}"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      loading="lazy"
    />
  </Tab>`;
  return block.replace(/(\n)<\/Tabs>/, `${demoTab}$1</Tabs>`);
}

function extractCodeIframeTitleFromTabsBlock(block) {
  const m = block.match(
    /<iframe[\s\S]*?title="([^"]*)"[\s\S]*?ide\.intlayer\.org/s
  );
  if (m) return m[1];
  return 'Demo CodeSandbox — Intlayer';
}

/** Remove IDE iframes for ideSrc that start before beforeIndex (exclusive). */
function removeIdeIframesBeforeIndex(body, ideSrc, beforeIndex) {
  const re = new RegExp(
    `<iframe[\\s\\n]+src="${escapeRegex(ideSrc)}"[\\s\\S]*?/>\\n*`,
    'g'
  );
  return body.replace(re, (match, offset) =>
    beforeIndex < 0 || offset < beforeIndex ? '' : match
  );
}

/** Remove every standalone iframe pointing at ideSrc. */
function removeAllIdeIframes(body, ideSrc) {
  const re = new RegExp(
    `<iframe[\\s\\n]+src="${escapeRegex(ideSrc)}"[\\s\\S]*?/>\\n*`,
    'g'
  );
  return body.replace(re, '');
}

function insertTabsAfterFirstHeading(body, tabsBlock) {
  const lines = body.split('\n');
  let i = 0;
  while (i < lines.length && !lines[i].startsWith('# ')) i++;
  if (i >= lines.length) return body;
  i++;
  const insertAt = i;
  const prefix = lines.slice(0, insertAt).join('\n');
  const suffix = lines.slice(insertAt).join('\n');
  const gap = suffix.startsWith('\n') || suffix === '' ? '' : '\n';
  return `${prefix}\n\n${tabsBlock}\n${gap}${suffix}`;
}

function processFile(filePath, locale) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { changed: false, reason: 'no-frontmatter' };
  const fm = fmMatch[1];
  const body = fmMatch[2];
  const keys = parseFrontmatterKeys(fm);
  const template = keys.applicationTemplate;
  const showcase = keys.applicationShowcase;
  if (!template || !showcase)
    return { changed: false, reason: 'no-template-showcase' };

  const gh = parseGithubRepo(template);
  if (!gh) return { changed: false, reason: 'bad-github-url' };

  const ideSrc = ideSrcFromRepo(gh.owner, gh.repo);
  const videoId = youtubeId(keys.youtubeVideo || '');
  const labels = labelsFor(locale);
  const demoTitle = `${labels.demo} — ${gh.repo}`;

  const tabsInfo = findTabsBlockForRepo(body, gh.owner, gh.repo);
  const standaloneRe = new RegExp(
    `<iframe[\\s\\n]+src="${escapeRegex(ideSrc)}"`,
    ''
  );
  const hasStandalone = standaloneRe.test(body);

  let changed = false;

  if (tabsInfo) {
    let newBody = body;
    if (!blockHasDemoWithShowcase(tabsInfo.block, showcase)) {
      const codeTitle = extractCodeIframeTitleFromTabsBlock(tabsInfo.block);
      const newBlock = insertDemoTabIntoTabsBlock(
        tabsInfo.block,
        labels,
        showcase,
        demoTitle
      );
      newBody =
        newBody.slice(0, tabsInfo.start) +
        newBlock +
        newBody.slice(tabsInfo.end);
      changed = true;
    }
    const cleaned = removeIdeIframesBeforeIndex(
      newBody,
      ideSrc,
      tabsInfo.start
    );
    if (cleaned !== newBody) {
      newBody = cleaned;
      changed = true;
    }
    if (changed) {
      newBody = newBody.replace(/\n{4,}/g, '\n\n\n');
      return { changed: true, body: `---\n${fm}\n---\n${newBody}` };
    }
    return { changed: false, reason: 'already-complete' };
  }

  if (hasStandalone) {
    const m = body.match(
      new RegExp(
        `<iframe[\\s\\n]+src="${escapeRegex(ideSrc)}"[\\s\\S]*?title="([^"]*)"`,
        ''
      )
    );
    const codeTitle = m ? m[1] : 'Demo CodeSandbox — Intlayer';
    const tabs = buildTabsBlock({
      labels,
      videoId,
      ideSrc,
      showcaseUrl: showcase,
      codeIframeTitle: codeTitle,
      demoIframeTitle: demoTitle,
    });
    let newBody = removeAllIdeIframes(body, ideSrc);
    newBody = insertTabsAfterFirstHeading(newBody, tabs);
    newBody = newBody.replace(/\n{4,}/g, '\n\n\n');
    if (newBody !== body) {
      return { changed: true, body: `---\n${fm}\n---\n${newBody}` };
    }
  }

  // Template + showcase but no embed yet: add tabs after H1
  const tabs = buildTabsBlock({
    labels,
    videoId,
    ideSrc,
    showcaseUrl: showcase,
    codeIframeTitle: 'Demo CodeSandbox — Intlayer',
    demoIframeTitle: demoTitle,
  });
  const newBody = insertTabsAfterFirstHeading(body, tabs);
  if (newBody !== body) {
    return {
      changed: true,
      body: `---\n${fm}\n---\n${newBody.replace(/\n{4,}/g, '\n\n\n')}`,
    };
  }

  return { changed: false, reason: 'noop' };
}

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

let updated = 0;
let skipped = 0;
for (const file of walk(DOCS_ROOT)) {
  const localeFolder = path.basename(path.dirname(file));
  const res = processFile(file, localeFolder);
  if (res.changed) {
    fs.writeFileSync(file, res.body, 'utf8');
    updated++;
    console.log('updated:', path.relative(DOCS_ROOT, file));
  } else {
    skipped++;
  }
}

console.log({ updated, skipped });
