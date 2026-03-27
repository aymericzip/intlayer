import {
  cond,
  type Dictionary,
  enu,
  gender,
  html,
  insert,
  md,
  nest,
  t,
} from 'intlayer';

const benchmarkContent = {
  key: 'benchmark',
  content: {
    // === BASIC NODES ===
    n01_t: t({
      en: 'Hello World',
      fr: 'Bonjour le Monde',
      es: 'Hola Mundo',
    }),

    n02_enu: enu({
      '<-1': 'Less than -1',
      '-1': 'Minus one',
      '0': t({ en: 'No items', fr: 'Aucun article', es: 'Sin artículos' }),
      '1': t({ en: 'One item', fr: 'Un article', es: 'Un artículo' }),
      '>5': t({
        en: 'Several items',
        fr: 'Plusieurs articles',
        es: 'Varios artículos',
      }),
      '>19': t({
        en: 'Many items',
        fr: "Beaucoup d'articles",
        es: 'Muchos artículos',
      }),
      fallback: t({
        en: 'Some items',
        fr: 'Des articles',
        es: 'Algunos artículos',
      }),
    }),

    n03_cond: cond({
      true: t({
        en: 'Condition is true',
        fr: 'La condition est vraie',
        es: 'La condición es verdadera',
      }),
      false: t({
        en: 'Condition is false',
        fr: 'La condition est fausse',
        es: 'La condición es falsa',
      }),
      fallback: t({
        en: 'Condition unknown',
        fr: 'Condition inconnue',
        es: 'Condición desconocida',
      }),
    }),

    n04_gender: gender({
      male: t({
        en: 'He is a user',
        fr: 'Il est un utilisateur',
        es: 'Él es un usuario',
      }),
      female: t({
        en: 'She is a user',
        fr: 'Elle est une utilisatrice',
        es: 'Ella es una usuaria',
      }),
      fallback: t({
        en: 'They are a user',
        fr: 'Ils sont un utilisateur',
        es: 'Son un usuario',
      }),
    }),

    n05_insert: insert('Hello {{name}}, you are {{age}} years old!'),

    n06_md: md('## Title\n\nSome **bold** and *italic* text.'),

    n07_html: html('<p>Hello <b>World</b>!</p>'),

    // === COMBINATIONS ===
    n08_insert_t: insert(
      t({
        en: 'Hello {{name}}, welcome to {{place}}!',
        fr: 'Bonjour {{name}}, bienvenue à {{place}}!',
        es: '¡Hola {{name}}, bienvenido a {{place}}!',
      })
    ),

    n09_t_of_md: t({
      en: md('## English Title\n\nContent in **English**'),
      fr: md('## Titre Français\n\nContenu en **Français**'),
      es: md('## Título Español\n\nContenido en **Español**'),
    }),

    n10_md_t: md(
      t({
        en: '## Hello\n\nThis is **English** content.',
        fr: '## Bonjour\n\nCeci est du contenu **Français**.',
        es: '## Hola\n\nEste es contenido en **Español**.',
      })
    ),

    n11_enu_t: enu({
      '0': t({ en: 'No cars', fr: 'Aucune voiture', es: 'Sin autos' }),
      '1': t({ en: 'One car', fr: 'Une voiture', es: 'Un auto' }),
      '>1': t({
        en: 'Many cars',
        fr: 'Beaucoup de voitures',
        es: 'Muchos autos',
      }),
      fallback: t({ en: 'Some cars', fr: 'Des voitures', es: 'Algunos autos' }),
    }),

    n12_insert_enu_t: insert(
      enu({
        '0': t({ en: 'No items', fr: 'Aucun article', es: 'Sin artículos' }),
        '1': t({
          en: 'One item: {{name}}',
          fr: 'Un article: {{name}}',
          es: 'Un artículo: {{name}}',
        }),
        '>1': t({
          en: '{{count}} items incl. {{name}}',
          fr: '{{count}} articles dont {{name}}',
          es: '{{count}} artículos incl. {{name}}',
        }),
      })
    ),

    n13_cond_t: cond({
      true: t({ en: 'Show all', fr: 'Afficher tout', es: 'Mostrar todo' }),
      false: t({ en: 'Show less', fr: 'Afficher moins', es: 'Mostrar menos' }),
    }),

    n14_cond_insert_t: cond({
      true: insert(
        t({
          en: 'Welcome back, {{name}}!',
          fr: 'Content de vous revoir, {{name}}!',
          es: '¡Bienvenido de nuevo, {{name}}!',
        })
      ),
      false: insert(
        t({
          en: 'Goodbye, {{name}}!',
          fr: 'Au revoir, {{name}}!',
          es: '¡Adiós, {{name}}!',
        })
      ),
    }),

    n15_gender_insert_t: gender({
      male: insert(
        t({
          en: '{{name}} updated his profile',
          fr: '{{name}} a mis à jour son profil',
          es: '{{name}} actualizó su perfil',
        })
      ),
      female: insert(
        t({
          en: '{{name}} updated her profile',
          fr: '{{name}} a mis à jour son profil',
          es: '{{name}} actualizó su perfil',
        })
      ),
      fallback: insert(
        t({
          en: '{{name}} updated their profile',
          fr: '{{name}} a mis à jour son profil',
          es: '{{name}} actualizó su perfil',
        })
      ),
    }),

    // === DATA STRUCTURES ===
    n17_nested_object: {
      level1: {
        level2: t({
          en: 'Deep nested value',
          fr: 'Valeur profondément imbriquée',
          es: 'Valor profundamente anidado',
        }),
      },
    },

    n18_array_strings: ['item1', 'item2', 'item3'],

    n19_array_translations: [
      t({ en: 'First', fr: 'Premier', es: 'Primero' }),
      t({ en: 'Second', fr: 'Deuxième', es: 'Segundo' }),
      t({ en: 'Third', fr: 'Troisième', es: 'Tercero' }),
    ],

    n20_array_objects: [
      {
        name: t({ en: 'Alice', fr: 'Alice', es: 'Alice' }),
        role: t({ en: 'Developer', fr: 'Développeuse', es: 'Desarrolladora' }),
      },
      {
        name: t({ en: 'Bob', fr: 'Bob', es: 'Bob' }),
        role: t({ en: 'Designer', fr: 'Concepteur', es: 'Diseñador' }),
      },
    ],

    // === NESTING ===
    n21_nest: nest('app', 'title'),
  },
} satisfies Dictionary;

export default benchmarkContent;
