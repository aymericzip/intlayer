import {
  cond,
  type Dictionary,
  enu,
  gender,
  html,
  insert,
  md,
  nest,
  plural,
  select,
  t,
} from 'intlayer';

const benchmarkContent = {
  key: 'benchmark',
  content: {
    // === BASIC NODES ===
    n01_t: t({
      en: 'Hello World',
      es: 'Hola Mundo',
      fr: 'Bonjour le monde',
    }),

    n02_enu: enu({
      '<-1': 'Less than -1',
      '-1': 'Minus one',
      '0': t({ en: 'No items', es: 'Sin artículos', fr: 'Aucun article' }),
      '1': t({ en: 'One item', es: 'Un artículo', fr: 'Un article' }),
      '>5': t({
        en: 'Several items',
        es: 'Varios artículos',
        fr: 'Plusieurs articles',
      }),
      '>19': t({
        en: 'Many items',
        es: 'Muchos artículos',
        fr: "Beaucoup d'articles",
      }),
      fallback: t({
        en: 'Some items',
        es: 'Algunos artículos',
        fr: 'Des articles',
      }),
    }),

    n03_cond: cond({
      true: t({
        en: 'Condition is true',
        es: 'La condición es verdadera',
        fr: 'La condition est vraie',
      }),
      false: t({
        en: 'Condition is false',
        es: 'La condición es falsa',
        fr: 'La condition est fausse',
      }),
      fallback: t({
        en: 'Condition unknown',
        es: 'Condición desconocida',
        fr: 'Condition inconnue',
      }),
    }),

    n04_gender: gender({
      male: t({
        en: 'He is a user',
        es: 'Él es un usuario',
        fr: 'Il est un utilisateur',
      }),
      female: t({
        en: 'She is a user',
        es: 'Ella es una usuaria',
        fr: 'Elle est une utilisatrice',
      }),
      fallback: t({
        en: 'They are a user',
        es: 'Son un usuario',
        fr: 'Ils sont un utilisateur',
      }),
    }),

    n05_insert: insert('Hello {{name}}, you are {{age}} years old!'),

    n06_md: md('## Title\n\nSome **bold** and *italic* text.'),

    n07_html: html('<p>Hello <b>World</b>!</p>'),

    // === COMBINATIONS ===
    n08_insert_t: insert(
      t({
        en: 'Hello {{name}}, welcome to {{place}}!',
        es: '¡Hola {{name}}, bienvenido a {{place}}!',
        fr: 'Bonjour {{name}}, bienvenue à {{place}}!',
      })
    ),

    n09_t_of_md: t({
      en: md('## English Title\n\nContent in **English**'),
      es: md('## Título Español\n\nContenido en **Español**'),
      fr: md('## Titre Français\n\nContenu en **Français**'),
    }),

    n10_md_t: md(
      t({
        en: '## Hello\n\nThis is **English** content.',
        es: '## Hola\n\nEste es contenido en **Español**.',
        fr: '## Bonjour\n\nCeci est du contenu **Français**.',
      })
    ),

    n11_enu_t: enu({
      '0': t({ en: 'No cars', es: 'Sin autos', fr: 'Aucune voiture' }),
      '1': t({ en: 'One car', es: 'Un auto', fr: 'Une voiture' }),
      '>1': t({
        en: 'Many cars',
        es: 'Muchos autos',
        fr: 'Beaucoup de voitures',
      }),
      fallback: t({ en: 'Some cars', es: 'Algunos autos', fr: 'Des voitures' }),
    }),

    n12_insert_enu_t: insert(
      enu({
        '0': t({ en: 'No items', es: 'Sin artículos', fr: 'Aucun article' }),
        '1': t({
          en: 'One item: {{name}}',
          es: 'Un artículo: {{name}}',
          fr: 'Un article: {{name}}',
        }),
        '>1': t({
          en: '{{count}} items incl. {{name}}',
          es: '{{count}} artículos incl. {{name}}',
          fr: '{{count}} articles dont {{name}}',
        }),
      })
    ),

    n13_cond_t: cond({
      true: t({ en: 'Show all', es: 'Mostrar todo', fr: 'Afficher tout' }),
      false: t({ en: 'Show less', es: 'Mostrar menos', fr: 'Afficher moins' }),
    }),

    n14_cond_insert_t: cond({
      true: insert(
        t({
          en: 'Welcome back, {{name}}!',
          es: '¡Bienvenido de nuevo, {{name}}!',
          fr: 'Content de vous revoir, {{name}}!',
        })
      ),
      false: insert(
        t({
          en: 'Goodbye, {{name}}!',
          es: '¡Adiós, {{name}}!',
          fr: 'Au revoir, {{name}}!',
        })
      ),
    }),

    n15_gender_insert_t: gender({
      male: insert(
        t({
          en: '{{name}} updated his profile',
          es: '{{name}} actualizó su perfil',
          fr: '{{name}} a mis à jour son profil',
        })
      ),
      female: insert(
        t({
          en: '{{name}} updated her profile',
          es: '{{name}} actualizó su perfil',
          fr: '{{name}} a mis à jour son profil',
        })
      ),
      fallback: insert(
        t({
          en: '{{name}} updated their profile',
          es: '{{name}} actualizó su perfil',
          fr: '{{name}} a mis à jour son profil',
        })
      ),
    }),

    // === DATA STRUCTURES ===
    n17_nested_object: {
      level1: {
        level2: t({
          en: 'Deep nested value',
          es: 'Valor profundamente anidado',
          fr: 'Valeur profondément imbriquée',
        }),
      },
    },

    n18_array_strings: ['item1', 'item2', 'item3'],

    n19_array_translations: [
      t({ en: 'First', es: 'Primero', fr: 'Premier' }),
      t({ en: 'Second', es: 'Segundo', fr: 'Deuxième' }),
      t({ en: 'Third', es: 'Tercero', fr: 'Troisième' }),
    ],

    n20_array_objects: [
      {
        name: 'Alice',
        role: t({ en: 'Developer', es: 'Desarrolladora', fr: 'Développeuse' }),
      },
      {
        name: 'Bob',
        role: t({ en: 'Designer', es: 'Diseñador', fr: 'Concepteur' }),
      },
    ],

    // === NESTING ===
    n21_nest: nest('app', 'title'),
    n22_plural: plural({
      one: t({
        en: '{{count}} item',
        es: '{{count}} artículo',
        fr: '{{count}} article',
      }),
      other: t({
        en: '{{count}} items',
        es: '{{count}} artículos',
        fr: '{{count}} articles',
      }),
    }),

    // plural() wrapping html() — the `{{count}}` placeholder must be
    // interpolated inside the raw HTML string before it is rendered.
    n23_plural_html: t({
      en: plural({
        one: html('<b>{{count}}</b> day'),
        other: html('<b>{{count}}</b> days'),
      }),
      es: plural({
        one: html('<b>{{count}}</b> día'),
        other: html('<b>{{count}}</b> días'),
      }),
      fr: plural({
        one: html('<b>{{count}}</b> jour'),
        other: html('<b>{{count}}</b> jours'),
      }),
    }),

    // insert() wrapping html() — the `{{name}}` placeholder must be
    // interpolated inside the raw HTML string before it is rendered.
    n24_insert_html: insert(
      t({
        en: html('Hello <b>{{name}}</b>'),
        es: html('Hola <b>{{name}}</b>'),
        fr: html('Bonjour <b>{{name}}</b>'),
      })
    ),

    // plural() wrapping md() — the `{{count}}` placeholder must be
    // interpolated inside the raw Markdown string before it is rendered.
    n25_plural_md: t({
      en: plural({
        one: md('**{{count}}** day'),
        other: md('**{{count}}** days'),
      }),
      es: plural({
        one: md('**{{count}}** día'),
        other: md('**{{count}}** días'),
      }),
      fr: plural({
        one: md('**{{count}}** jour'),
        other: md('**{{count}}** jours'),
      }),
    }),

    // insert() wrapping md() — the `{{name}}` placeholder must be
    // interpolated inside the raw Markdown string before it is rendered.
    n26_insert_md: insert(
      t({
        en: md('Hello **{{name}}**'),
        es: md('Hola **{{name}}**'),
        fr: md('Bonjour **{{name}}**'),
      })
    ),

    // select() — switch on an arbitrary string value (the ICU `select`
    // equivalent). Use it when the discriminant is neither a quantity
    // (`enu`), a boolean (`cond`), nor a gender (`gender`).
    n27_select: select({
      draft: t({
        en: 'This post is a draft',
        es: 'Esta publicación es un borrador',
        fr: 'Cet article est un brouillon',
      }),
      published: t({
        en: 'This post is live',
        es: 'Esta publicación está publicada',
        fr: 'Cet article est en ligne',
      }),
      scheduled: t({
        en: 'This post is scheduled',
        es: 'Esta publicación está programada',
        fr: 'Cet article est programmé',
      }),
      fallback: t({
        en: 'Unknown status',
        es: 'Estado desconocido',
        fr: 'Statut inconnu',
      }),
    }),

    // select() wrapping insert() — the selected case is interpolated.
    n28_select_insert_t: select({
      draft: insert(
        t({
          en: '{{name}} saved a draft',
          es: '{{name}} guardó un borrador',
          fr: '{{name}} a enregistré un brouillon',
        })
      ),
      published: insert(
        t({
          en: '{{name}} published the post',
          es: '{{name}} publicó la publicación',
          fr: '{{name}} a publié l’article',
        })
      ),
      fallback: insert(
        t({
          en: '{{name}} updated the post',
          es: '{{name}} actualizó la publicación',
          fr: '{{name}} a mis à jour l’article',
        })
      ),
    }),
  },

  filled: true,
  title: 'Benchmark content',
  description:
    'Benchmark content dictionary for localization testing. Includes examples of enumeration, condition, gender, insertion, markdown, HTML, nested objects, arrays and other translation nodes.',
  tags: ['benchmark', 'localization', 'translations', 'i18n', 'testing'],
} satisfies Dictionary;

export default benchmarkContent;
