import { t, type DeclarationContent } from 'intlayer';

const demoContent = {
  key: 'demo-page',
  content: {
    title: t({
      fr: 'Essayez le nouvel éditeur visuel Intlayer',
      en: 'Try the new Intlayer visual editor',
      es: 'Pruebe el nuevo editor visual de Intlayer',
    }),
    landingParagraph: t({
      fr: 'Déléguez la gestion de votre contenu à vos équipes en transformant votre application en CMS en un clique.',
      en: 'Delegate content management to your teams by transforming your application into a CMS with a single click.',
      es: 'Delegue la gestión de su contenido a sus equipos transformando su aplicación en un CMS con un solo clic.',
    }),
    imageAlt: t({
      fr: "Capture d'écran de l'éditeur Intlayer",
      en: 'Screenshort of the Intlayer editor',
      es: 'Captura de pantalla del editor de Intlayer',
    }),

    tutoParagraphs: [
      {
        title: t({
          fr: 'Sélectionnez le contenu à modifier',
          en: 'Hover the content to be modified',
          es: 'Pase el cursor sobre el contenido a modificar',
        }),
        description: t({
          fr: "Exercez un clic prolongé pour faire apparaître l'éditeur visuel. Le panneau d'édition s'étend de la droite et met en évidence le contenu sélectionné pour édition.",
          en: 'Press and hold to make the visual editor appear. The editing panel extends from the right, highlighting the content selected for editing.',
          es: 'Mantenga presionado para que aparezca el editor visual. El panel de edición se extiende desde la derecha y resalta el contenido seleccionado para editar.',
        }),
      },
      {
        title: t({
          fr: 'Faites vos modifications en remplaçant le texte concerné',
          en: 'Make your modifications by replacing the relevant text',
          es: 'Realice sus modificaciones reemplazando el texto correspondiente',
        }),
        description: t({
          fr: "Le texte mis en évidence dans le panneau d'édition peut être modifié ou remplacé à guise. Les modifications apparaîtront instantanément sur la page principale, facilitant la révision du contenu. Pour annuler les changements apportés, cliquez sur la croix.",
          en: 'The highlighted text in the editing panel can be modified or replaced at will. The changes will appear instantly on the main page, making it easy to review the content. To undo the changes made, click on the cross.',
          es: 'El texto resaltado en el panel de edición puede modificarse o reemplazarse a voluntad. Los cambios aparecerán instantáneamente en la página principal, facilitando la revisión del contenido. Para deshacer los cambios realizados, haga clic en la cruz.',
        }),
      },
      {
        title: t({
          fr: 'Validez vos changements',
          en: 'Confirm your changes',
          es: 'Confirme sus cambios',
        }),
        description: t({
          fr: 'Une fois vos changements effectués, validez les modifications apportées au champ concerné, puis validez les changements apportés au dictionnaire. Lorsque les changements apportés au dictionnaire sont validés, Intlayer écrira les modifications dans le fichier concerné.',
          en: 'Once your changes are made, validate the modifications made to the relevant field, then confirm the changes made to the dictionary. When the changes to the dictionary are validated, Intlayer will write the modifications to the relevant file.',
          es: 'Una vez realizados los cambios, valide las modificaciones hechas en el campo correspondiente, luego confirme los cambios hechos en el diccionario. Cuando se validen los cambios en el diccionario, Intlayer escribirá las modificaciones en el archivo correspondiente.',
        }),
      },
    ],

    tryItByYourself: {
      title: t({
        fr: 'Essayez-le par vous-même',
        en: 'Try it by yoursef',
        es: 'Pruébelo usted mismo',
      }),
    },
  },
} satisfies DeclarationContent;

export default demoContent;
