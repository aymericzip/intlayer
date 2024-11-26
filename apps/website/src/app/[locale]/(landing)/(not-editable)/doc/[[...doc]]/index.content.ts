import { t, type DeclarationContent } from 'intlayer';

const docContent = {
  key: 'doc-page',
  content: {
    contribution: {
      text: t({
        en: 'If you have an idea for improving this documentation, please feel free to contribute by submitting a pull request on GitHub.',
        fr: 'Si vous avez une idée d’amélioration pour améliorer cette documentation, n’hésitez pas à contribuer en submitant une pull request sur GitHub.',
        es: 'Si tienes una idea para mejorar esta documentación, no dudes en contribuir enviando una pull request en GitHub.',
      }),
      button: t({
        en: 'GitHub link to the documentation',
        fr: 'Lien GitHub de la documentation',
        es: 'Enlace de GitHub a la documentación',
      }),
      buttonLabel: t({
        en: 'Click here to contribute',
        fr: 'Cliquez ici pour contribuer',
        es: 'Haga clic aquí para contribuir',
      }),
    },
  },
} satisfies DeclarationContent;

export default docContent;
