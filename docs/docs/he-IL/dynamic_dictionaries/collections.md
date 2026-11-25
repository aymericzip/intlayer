---
createdAt: 2026-06-12
updatedAt: 2026-11-24
priority: 8
title: "קולקציות: רשימות מתורגמות לפי מיקום או מזהה"
description: "בנו רשימות מתורגמות ב-Intlayer מקובץ תוכן אחד לכל פריט: שאלות נפוצות, פוסטים בבלוג או רשומות ממסד נתונים, שנבחרים לפי מיקום או מזהה, עם מטא-דאטה לדפי רשימה."
keywords:
  - קולקציות
  - רשימת תוכן
  - מזהה מסד נתונים
  - תוכן דינמי
  - Intlayer
  - בינאום
slugs:
  - doc
  - concept
  - collections
history:
  - version: 9.9.0
    date: 2026-11-24
    changes: "הוספת `metadata` לפריטים, הסלקטור `metadataOnly` ומזהי פריט מסוג מחרוזת"
  - version: 9.0.0
    date: 2026-06-12
    changes: "שחרור תכונת מילוני קולקציה"
author: aymericzip
---

# קולקציות: רשימות מתורגמות של פריטים

**קולקציה** (collection) היא קבוצה של קובצי תוכן החולקים `key` מילון אחד, כשכל אחד מהם מצהיר על `item` שונה. Intlayer ממזג אותם בזמן הבנייה לרשימה שאפשר לקרוא במלואה או פריט אחר פריט. פריט מזוהה לפי מיקום (`1`, `2`…) או לפי מזהה מחרוזת, כמו מזהה של רשומה במסד נתונים.

## תוכן העניינים

<TOC />

## הצהרה על פריטים

כל קובץ הוא פריט אחד:

```ts fileName="faq.1.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 1,
  content: {
    question: t({ en: "What is Intlayer?", fr: "Qu'est-ce qu'Intlayer ?" }),
    answer: t({ en: "An i18n toolkit.", fr: "Une boîte à outils i18n." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="faq.2.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  item: 2,
  content: {
    question: t({ en: "Is it free?", fr: "Est-ce gratuit ?" }),
    answer: t({ en: "Yes, open-source.", fr: "Oui, open-source." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### פריטים שמזוהים לפי מזהה מחרוזת

כשהפריטים מגיעים ממסד נתונים או מ-CMS, השתמשו במזהה הרשומה בתור `item`:

```ts fileName="src/products/desk-lamp.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "products",
  item: "6620d4e8a1b2c3d4e5f60718",
  content: {
    name: t({ en: "Desk lamp", fr: "Lampe de bureau" }),
  },
} satisfies Dictionary;

export default dictionary;
```

- **סדר**: הרשימה המלאה מחזירה קודם פריטים מספריים לפי ערכם, ואחר כך מזהי מחרוזת לפי קוד התו, ולכן ObjectId של MongoDB ו-UUIDv7 מופיעים לפי סדר היצירה.
- **מספרים כטקסט**: `item: "2"` ו-`item: 2` הם אותו פריט. `"007"` נשאר מזהה מחרוזת.
- **Frontmatter של Markdown**: עטפו במירכאות מזהים ש-YAML קורא כמספרים. בלי מירכאות, `0012` הופך ל-`12` ו-`123e4567` הופך ל-`Infinity`.
- **אותיות גדולות וקטנות**: עם `importMode: "dynamic"`, הימנעו ממזהים שנבדלים רק בגודל האותיות (`abc` ו-`ABC`). הם מתנגשים במערכות הקבצים של macOS ו-Windows.

### תוכן משותף לכל הפריטים

קובץ עם אותו `key` וללא `item` מכיל תוכן שמשותף לכל הפריטים. כל פריט מושלם באמצעותו, ושומר על הערך שלו כששניהם מצהירים על אותו שדה:

```ts fileName="faq.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "faq",
  content: {
    contactLabel: t({
      en: "Still stuck? Contact us",
      fr: "Toujours bloqué ? Contactez-nous",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

כעת לכל פריט של `useIntlayer("faq")` יש `question`, `answer` ו-`contactLabel`.

## קריאת קולקציה

### כל הפריטים

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "react-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "next-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="FAQ.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const items = useIntlayer("faq");
    </script>

    <template>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <strong>{{ item.question }}</strong>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="FAQ.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const items = useIntlayer("faq");
    </script>

    <ul>
      {#each $items as item}
        <li>
          <strong>{item.question}</strong>
          <p>{item.answer}</p>
        </li>
      {/each}
    </ul>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "preact-intlayer";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.question}</strong>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="FAQ.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { For } from "solid-js";

    export const FAQ = () => {
      const items = useIntlayer("faq"); // { question: string; answer: string }[]

      return (
        <ul>
          <For each={items()}>
            {(item) => (
              <li>
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </li>
            )}
          </For>
        </ul>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="faq.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-faq",
      template: `
        <ul>
          @for (item of items(); track $index) {
            <li>
              <strong>{{ item.question }}</strong>
              <p>{{ item.answer }}</p>
            </li>
          }
        </ul>
      `,
    })
    export class FAQComponent {
      items = useIntlayer("faq");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="faq.js"
    import { useIntlayer } from "vanilla-intlayer";

    const faq = useIntlayer("faq");

    faq.forEach((item) => {
      console.log(item.question);
      console.log(item.answer);
    });
    ```

  </Tab>
</Tabs>

### פריט אחד

```tsx
// לפי מיקום
const faq2 = useIntlayer("faq", { item: 2 });
// → { question: string; answer: string }

// לפי מזהה
const lamp = useIntlayer("products", { item: "6620d4e8a1b2c3d4e5f60718" });
// → { name: string }

// עם שפה מפורשת
const faq2Fr = useIntlayer("faq", { item: 2, locale: "fr" });
```

`item` שאף קובץ לא מצהיר עליו מחזיר `null`, כך שדף פרטים יכול להציג את מצב "לא נמצא".

## מטא-דאטה של פריטים

כל פריט יכול להצהיר על `metadata`: נתונים פשוטים (כותרת, תאריך, תגיות…) שנשמרים בנפרד מהתוכן ומוחזרים כפי שהוצהרו. דף רשימה קורא את המטא-דאטה של כל הפריטים בלי לטעון את הפריטים עצמם, וכך בלוג עם 1,000 פוסטים נשאר מהיר.

בקובץ `.content.md`, ה-frontmatter הופך למטא-דאטה, למעט הגדרות המילון (`key`, `locale`, `item`, `variant`, `importMode`, `fill`, `location`, `priority`, `version`). הצהירו על קובץ אחד לכל שפה כדי לתרגם אותו:

```md fileName="src/blog/first-post.en.content.md"
---
key: blog
locale: en
item: 65f1c0a2b3c4d5e6f7a8b9c0
id: 65f1c0a2b3c4d5e6f7a8b9c0
title: First post
---

# First post
```

`item` אינו חלק מהמטא-דאטה, ולכן `id` חוזר עליו כדי לקשר כל רשומה ברשימה לדף שלה.

בקובץ `.content.ts`, הגדירו את השדה `metadata`, למשל `metadata: { id: "65f1c0a2b3c4d5e6f7a8b9c0", date: "2026-11-24" }`. בהצהרה רב-לשונית, הוא חל על כל השפות.

בעורך החזותי וב-CMS, הלשונית **Metadata** של מילון עורכת את השדות האלה ושומרת אותם בחזרה בקובץ ההצהרה.

### דפי רשימה ודפי פרטים

`metadataOnly: true` קורא את המטא-דאטה, ו-`item` קורא את התוכן של פריט אחד:

```tsx fileName="BlogList.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogList = () => {
  const posts = useIntlayer("blog", { metadataOnly: true });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <a href={`/blog/${post.id}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
};
```

```tsx fileName="BlogPost.tsx"
import { useIntlayer } from "react-intlayer";

export const BlogPost = ({ postId }: { postId: string }) => {
  const post = useIntlayer("blog", { item: postId });

  if (!post) return <p>Post not found</p>;

  return <article>{post}</article>;
};
```

שלבו את שניהם כדי לקרוא את המטא-דאטה של פריט אחד, למשל ב-`<head>` של הדף: `useIntlayer("blog", { item: postId, metadataOnly: true })`.

## טעינת פריטים לפי דרישה

עם `importMode: "dynamic"` בקובצי הפריטים, כל פריט נשלח ב-chunk משלו לכל שפה:

- `{ item }` טוען רק את הפריט הזה.
- הרשימה המלאה טוענת את כל הפריטים, במקביל.
- `{ metadataOnly: true }` על הרשימה המלאה טוען אינדקס מטא-דאטה יחיד, ולעולם לא את הפריטים.

המצבים הסטטי והדינמי מחזירים את אותם ערכים. `importMode: "fetch"` עדיין לא תומך בקולקציות: הן חוזרות לייבוא סטטי, עם אזהרה בזמן הבנייה. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) למצבי הייבוא.

## שילוב עם וריאנטים

פריטים יכולים גם להצהיר על `variant` (ראו [וריאנטים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/variants.md)). אז כל קובץ פריט של המפתח מצהיר גם על `item` וגם על `variant`:

```tsx
// פריטים שהוצהרו עבור "promo", כל אחד מושלם בגרסת ה-"default" שלו
const promoItems = useIntlayer("banner", { variant: "promo" });

// פריט אחד של הווריאנט "promo"
const promoItem = useIntlayer("banner", { variant: "promo", item: 2 });
```

פריט ללא הצהרת `promo` לא נכלל ברשימת `promo`.

## תרחישי שימוש נפוצים

- רשימות שאלות ותשובות (FAQ)
- רמות מחיר (Pricing tiers)
- שקופיות של קרוסלה וסליידר
- הוראות שלב-אחר-שלב
- פוסטים בבלוג
- רשומות ממסד נתונים או מ-CMS, לפי מזהה
