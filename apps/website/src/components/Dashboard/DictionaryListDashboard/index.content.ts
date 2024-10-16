import { t, type DeclarationContent } from 'intlayer';

const dictionaryFormContent: DeclarationContent = {
  id: 'dictionary-form',

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

  createDictionaryTitle: t({
    en: 'No dictionary',
    fr: 'Aucune dictionaire',
    es: 'Sin diccionario',
  }),

  createDictionaryDescription: t({
    en: 'Create your first dictionary to start using Intlayer',
    fr: 'Créez votre première dictionaire pour commencer à utiliser Intlayer',
    es: 'Cree su primera diccionario para comenzar a usar Intlayer',
  }),

  createDictionaryButton: {
    text: t({
      en: 'Create dictionary',
      fr: 'Créer une dictionaire',
      es: 'Crear una diccionario',
    }),
    ariaLabel: t({
      en: 'Click to create dictionary',
      fr: 'Cliquez pour créer une dictionaire',
      es: 'Haga clic para crear una diccionario',
    }),
  },

  createDictionaryToasts: {
    dictionaryCreated: {
      title: t({
        en: 'Dictionary created',
        fr: 'Organisation créée',
        es: 'Organización creada',
      }),
      description: t({
        en: 'Your dictionary has been created successfully',
        fr: 'Votre dictionaire a été créée avec succès',
        es: 'Su diccionario se ha creado con éxito',
      }),
    },
    dictionaryCreationFailed: {
      title: t({
        en: 'Dictionary creation failed',
        fr: "La création de l'dictionaire a échoué",
        es: 'La creación de la diccionario ha fallado',
      }),
    },
  },
  updateDictionaryToasts: {
    dictionaryUpdated: {
      title: t({
        en: 'Dictionary updated',
        fr: 'Organisation mise à jour',
        es: '',
      }),
      description: t({
        en: 'Your dictionary has been updated successfully',
        fr: 'Votre dictionaire a été mise à jour avec succès',
        es: '',
      }),
    },
    dictionaryUpdateFailed: {
      title: t({
        en: 'Dictionary update failed',
        fr: "La mise à jour de l'dictionaire a échoué",
        es: '',
      }),
    },
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
};

export default dictionaryFormContent;
