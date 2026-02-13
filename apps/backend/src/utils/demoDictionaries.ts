import { gender, html, insert, md, t } from 'intlayer';
import type { DictionaryData } from '@/types/dictionary.types';

export const getDemoDictionaries = (
  projectIds: string[],
  creatorId: any
): DictionaryData[] => [
  {
    key: 'demo-page',
    title: 'Demo Page',
    projectIds,
    creatorId,
    content: new Map([
      [
        'v1',
        {
          content: {
            // 1. Simple Translation
            pageTitle: t({
              en: 'Welcome to your new project',
              fr: 'Bienvenue dans votre nouveau projet',
              es: 'Bienvenido a tu nuevo proyecto',
            }),

            // 2. Markdown Content (Great for blog posts, articles, or rich text blocks)
            introSection: md(
              t({
                en: '## Getting Started \n This is a **randomly generated** dictionary to demonstrate the capabilities of Intlayer.',
                fr: "## Commencer \n Ceci est un dictionnaire **généré aléatoirement** pour démontrer les capacités d'Intlayer.",
                es: "## Empezando \n Este es un diccionario **generado aléatoirement** pour démontrer les capacités d'Intlayer.",
              })
            ),

            // 3. Variable Insertion (Interpolation)
            welcomeMessage: insert(
              t({
                en: 'Hello, {{ userName }}! You have {{ notificationCount }} new messages.',
                fr: 'Bonjour, {{ userName }} ! Vous avez {{ notificationCount }} nouveaux messages.',
                es: '¡Hola, {{ userName }}! Tienes {{ notificationCount }} nuevos messages.',
              })
            ),

            // 4. Gender Logic (Context-aware translation)
            userActivity: gender({
              male: t({
                en: 'He updated his profile.',
                fr: 'Il a mis à jour son profil.',
                es: 'Él actualizó su perfil.',
              }),
              female: t({
                en: 'She updated her profile.',
                fr: 'Elle a mis à jour son profil.',
                es: 'Ella actualizó su perfil.',
              }),
              fallback: t({
                en: 'They updated their profile.',
                fr: 'Ils ont mis à jour leur profil.',
                es: 'Ellos actualizaron su profil.',
              }),
            }),

            // 5. HTML Injection (For legacy content or specific component embedding)
            ctaButton: html(
              t({
                en: '<button class="primary-btn">Start <strong>Now</strong></button><IconArrowRight />',
                fr: '<button class="primary-btn">Commencer <strong>Maintenant</strong></button><IconArrowRight />',
                es: '<button class="primary-btn">Empezar <strong>Ahora</strong></button><IconArrowRight />',
              })
            ),

            // 6. Nested Objects (For grouping related labels)
            nav: {
              home: t({ en: 'Home', fr: 'Accueil', es: 'Inicio' }),
              about: t({ en: 'About', fr: 'À propos', es: 'Acerca de' }),
              contact: t({ en: 'Contact', fr: 'Contact', es: 'Contacto' }),
            },
          } as any,
        },
      ],
    ]),
  },
  {
    key: 'demo-common',
    title: 'Demo Common Labels',
    projectIds,
    creatorId,
    content: new Map([
      [
        'v1',
        {
          content: {
            save: t({ en: 'Save', fr: 'Enregistrer', es: 'Guardar' }),
            cancel: t({ en: 'Cancel', fr: 'Annuler', es: 'Cancelar' }),
            delete: t({ en: 'Delete', fr: 'Supprimer', es: 'Eliminar' }),
            edit: t({ en: 'Edit', fr: 'Modifier', es: 'Editar' }),
          } as any,
        },
      ],
    ]),
  },
];
