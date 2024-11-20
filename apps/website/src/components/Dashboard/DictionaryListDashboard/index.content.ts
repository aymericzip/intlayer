import { t, type DeclarationContent } from 'intlayer';

const dictionaryFormContent = {
  key: 'dictionary-form',
  content: {
    keyInput: {
      label: t({
        en: 'Key',
        fr: 'Clé',
        es: 'Clave',
      }),
      placeholder: t({
        en: 'Enter the key of your dictionary',
        fr: 'Entrez la clée de votre dictionaire',
        es: 'Ingrese el clave de su diccionario',
      }),
    },

    projectInput: {
      label: t({
        en: 'Project',
        fr: 'Projet',
        es: 'Proyecto',
      }),
      placeholder: t({
        en: 'Select one or more projects to associate with your dictionary',
        fr: 'Sélectionnez un ou plusieurs projets à associer à votre dictionnaire',
        es: 'Seleccione uno o más proyectos para asociar con su diccionario',
      }),
    },

    noDictionaryView: {
      title: t({
        en: 'No dictionary',
        fr: 'Aucune dictionaire',
        es: 'Sin diccionario',
      }),
      description: t({
        en: 'Create your first dictionary to start using Intlayer',
        fr: 'Créez votre première dictionaire pour commencer à utiliser Intlayer',
        es: 'Cree su primera diccionario para comenzar a usar Intlayer',
      }),
    },

    dictionaryList: {
      title: t({
        en: 'Dictionary list',
        fr: 'Liste des dictionnaires',
        es: 'Lista de diccionarios',
      }),
    },

    createDictionaryDescription: t({
      en: 'Create your first dictionary to start using Intlayer',
      fr: 'Créez votre première dictionaire pour commencer à utiliser Intlayer',
      es: 'Cree su primera diccionario para comenzar a usar Intlayer',
    }),

    createDictionaryButton: {
      text: t({
        en: 'Create new dictionary',
        fr: 'Créer un nouveau dictionnaire',
        es: 'Crear un nuevo diccionario',
      }),
      ariaLabel: t({
        en: 'Click to create a new dictionary',
        fr: 'Cliquez pour créer un nouveau dictionnaire',
        es: 'Haga clic para crear un nuevo diccionario',
      }),
    },

    editButton: {
      text: t({
        en: 'Edit dictionary',
        fr: "Modifier l'dictionaire",
        es: 'Editar la diccionario',
      }),
      ariaLabel: t({
        en: 'Click to edit',
        fr: 'Cliquez pour modifier',
        es: 'Haga clic para editar',
      }),
    },
  },
} satisfies DeclarationContent;

export default dictionaryFormContent;
