---
createdAt: 2025-03-13
updatedAt: 2026-11-03
priority: 8
title: "תוכן קובץ: הטמעת קבצים חיצוניים"
description: "הטמע קבצים חיצוניים כגון markdown או טקסט לתוך מילוני Intlayer שלך באמצעות הפונקציה file(), תוך שמירה על סנכרון עם קובץ המקור."
keywords:
  - קובץ
  - בינאום
  - תיעוד
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תוכן קובץ / הטמעת קבצים ב-Intlayer

ב-Intlayer, הפונקציה `file` מאפשרת להטמיע תוכן של קובץ חיצוני לתוך מילון. גישה זו מבטיחה ש-Intlayer יזהה את קובץ המקור, מה שמאפשר אינטגרציה חלקה עם העורך החזותי (Visual Editor) וה-CMS של Intlayer.

## מדוע להשתמש ב-`file` במקום ב-`import`, `require` או `fs`?

בניגוד לשיטות קריאת קבצים באמצעות `import`, `require` או `fs`, שימוש ב-`file` מקשר את הקובץ ישירות למילון, ומאפשר ל-Intlayer לעקוב אחר התוכן ולעדכן אותו דינמית כאשר הקובץ נערך. כתוצאה מכך, שימוש ב-file מציע אינטגרציה טובה בהרבה עם העורך החזותי וה-CMS של Intlayer.

## הגדרת תוכן קובץ

כדי להטמיע תוכן קובץ בפרויקט Intlayer שלך, השתמש בפונקציה `file` בתוך מודול תוכן. להלן דוגמאות המדגימות מימושים שונים:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## שימוש בתוכן קובץ

<Tabs group="framework">
  <Tab label="React" value="react">

כדי להשתמש בתוכן קובץ מוטמע ברכיב React, ייבא והשתמש ב-hook‏ `useIntlayer` מתוך החבילה `react-intlayer`. פעולה זו שולפת את התוכן מהמפתח שצוין ומאפשרת להציג אותו באופן דינמי.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

כדי להשתמש בתוכן קובץ מוטמע ב-Client Components של Next.js, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

כדי להשתמש בתוכן קובץ מוטמע ברכיבי Vue, אחזר אותו באמצעות ה-composable‏ `useIntlayer`. הנה דוגמה:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myFile } = useIntlayer("my_key");
</script>

<template>
  <div>
    <pre>{{ myFile }}</pre>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

כדי להשתמש בתוכן קובץ מוטמע ברכיבי Svelte, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הגישה ל-store מתבצעת עם `$`. הנה דוגמה:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <pre>{$content.myFile}</pre>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

כדי להשתמש בתוכן קובץ מוטמע ברכיבי Preact, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

כדי להשתמש בתוכן קובץ מוטמע ברכיבי SolidJS, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const FileComponent: Component = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

כדי להשתמש בתוכן קובץ מוטמע ברכיבי Angular, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-file",
  template: `
    <div>
      <pre>{{ content().myFile }}</pre>
    </div>
  `,
})
export class FileComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

כדי להשתמש בתוכן קובץ מוטמע עם `vanilla-intlayer`, אחזר אותו באמצעות ה-hook‏ `useIntlayer`. הנה דוגמה:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("file-content")!.textContent = newContent.myFile;
});

// רינדור ראשוני
document.getElementById("file-content")!.textContent = content.myFile;
```

  </Tab>
</Tabs>

## דוגמה ל-Markdown רב-לשוני

כדי לתמוך בקובצי Markdown רב-לשוניים הניתנים לעריכה, תוכל להשתמש ב-`file` בשילוב עם `t()` ו-`md()` כדי להגדיר גרסאות שפה שונות של קובץ תוכן Markdown:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        he: file("src/components/test.he.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

תצורה זו מאפשרת לאחזר את התוכן באופן דינמי בהתבסס על העדפת השפה של המשתמש. בעת שימוש בעורך החזותי או ב-CMS של Intlayer, המערכת תזהה שהתוכן מגיע מקובצי ה-Markdown שצוינו ותוודא שהם נשארים פתוחים לעריכה.

## סוגי נתיבים שונים

בעת שימוש בפונקציה `file`, תוכל להשתמש בסוגי נתיבים שונים כדי לציין את הקובץ להטמעה:

- `file("./path/to/file.txt")` - נתיב יחסי לקובץ הנוכחי
- `file("path/to/file.txt")` - נתיב יחסי לתיקיית השורש של הפרויקט
- `file("/users/username/path/to/file.txt")` - נתיב מוחלט

## כיצד Intlayer מטפל בתוכן קובץ

הפונקציה `file` מבוססת על מודול ה-`fs` של Node.js כדי לקרוא את תוכן הקובץ שצוין ולהכניס אותו למילון. כאשר משתמשים בה בשילוב עם העורך החזותי או ה-CMS של Intlayer, ‏Intlayer יכול לעקוב אחר הקשר בין המילון לקובץ. הדבר מאפשר ל-Intlayer:

- לזהות שהתוכן מגיע מקובץ ספציפי.
- לעדכן אוטומטית את תוכן המילון כאשר הקובץ המקושר נערך.
- להבטיח סנכרון בין הקובץ למילון, תוך שמירה על שלמות התוכן.

## משאבים נוספים

למידע נוסף על הגדרה ושימוש בהטמעת קבצים ב-Intlayer, עיין במשאבים הבאים:

- [תיעוד Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
- [תיעוד React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_create_react_app.md)
- [תיעוד Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_15.md)
- [תיעוד תוכן Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [תיעוד תוכן תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/translation.md)

משאבים אלה מספקים תובנות נוספות לגבי הטמעת קבצים, ניהול תוכן והאינטגרציה של Intlayer עם מגוון פריימוורקים.
