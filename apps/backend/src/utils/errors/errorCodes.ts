import { HttpStatusCodes } from '@utils/httpStatusCodes';
// @ts-ignore express-intlayer not build yet
import { LanguageContent } from 'express-intlayer';

type ErrorCode = {
  title: LanguageContent<string>;
  message: LanguageContent<string>;
  statusCode: HttpStatusCodes;
};

export const errorData = {
  USER_NOT_DEFINED: {
    title: {
      en: 'User not defined',
      fr: 'Utilisateur non défini',
      es: 'Usuario no definido',
    },
    message: {
      en: 'User is required, but not defined.',
      fr: 'Utilisateur requis, mais non défini.',
      es: 'Usuario es requerido, pero no está definido.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  USER_NOT_FOUND: {
    title: {
      en: 'User not found',
      fr: 'Utilisateur non trouvé',
      es: 'Usuario no encontrado',
    },
    message: {
      en: 'The user is probably not authenticated. Please try again.',
      fr: "L'utilisateur n'est probablement pas authentifié. Veuillez réessayer.",
      es: 'El usuario probablemente no está autenticado. Por favor, inténtelo de nuevo.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  USER_DATA_NOT_FOUND: {
    title: {
      en: 'User Data Not Found',
      fr: 'Données utilisateur non trouvées',
      es: 'Datos de usuario no encontrados',
    },
    message: {
      en: 'The user data was not found.',
      fr: "Les données utilisateur n'ont pas été trouvées.",
      es: 'Los datos del usuario no se han encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  USER_ALREADY_LOGGED_IN: {
    title: {
      en: 'User Already Logged In',
      fr: 'Utilisateur déjà connecté',
      es: 'Usuario ya conectado',
    },
    message: {
      en: 'The user is already logged in.',
      fr: "L'utilisateur est déjà connecté.",
      es: 'El usuario ya está conectado.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  USER_ID_MISMATCH: {
    title: {
      en: 'User ID Mismatch',
      fr: 'Identifiant utilisateur ne correspond pas',
      es: 'Identificador de usuario no coincide',
    },
    message: {
      en: 'The provided user ID does not match the expected value. Please verify and try again.',
      fr: "L'identifiant utilisateur fourni ne correspond pas à la valeur attendue. Veuillez vérifier et réessayer.",
      es: 'El identificador de usuario proporcionado no coincide con el valor esperado. Verifique e intente nuevamente.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  USER_INVALID_FIELDS: {
    title: {
      en: 'User Invalid Fields',
      fr: "Champs d'utilisateur invalides",
      es: 'Campos de usuario no válidos',
    },
    message: {
      en: 'The provided user fields are invalid.',
      fr: "Les champs fournis pour l'utilisateur sont invalides.",
      es: 'Los campos proporcionados para el usuario no son válidos.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  USER_CREATION_FAILED: {
    title: {
      en: 'User Creation Failed',
      fr: "Échec de la création de l'utilisateur",
      es: 'Error al crear el usuario',
    },
    message: {
      en: 'Failed to create the specified user.',
      fr: "La création de l'utilisateur a échoué.",
      es: 'No se pudo crear el usuario especificado.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  USER_SESSION_EXPIRED: {
    title: {
      en: 'User Session Expired',
      fr: 'Session utilisateur expirée',
      es: 'Sesión de usuario caducada',
    },
    message: {
      en: 'The user session has expired.',
      fr: "La session de l'utilisateur a expiré.",
      es: 'La sesión de usuario ha caducado.',
    },
    statusCode: HttpStatusCodes.UNAUTHORIZED_401,
  },
  USER_UPDATE_FAILED: {
    title: {
      en: 'User Update Failed',
      fr: "Échec de la mise à jour de l'utilisateur",
      es: 'Error al actualizar el usuario',
    },
    message: {
      en: 'Failed to update the specified user.',
      fr: "La mise à jour de l'utilisateur a échoué.",
      es: 'No se pudo actualizar el usuario especificado.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  USER_UPDATED_USER_NOT_FOUND: {
    title: {
      en: 'User Updated User Not Found',
      fr: 'Utilisateur utilisateur non trouvé',
      es: 'Usuario actualizado no encontrado',
    },
    message: {
      en: 'The updated user was not found.',
      fr: "L'utilisateur utilisateur n'a pas été trouvé.",
      es: 'El usuario actualizado no se ha encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  USER_COUNT_FAILED: {
    title: {
      en: 'User Count Failed',
      fr: 'Échec du comptage des utilisateurs',
      es: 'Error al contar los usuarios',
    },
    message: {
      en: 'Failed to count users.',
      fr: 'Le comptage des utilisateurs a échoué.',
      es: 'No se pudo contar los usuarios.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  USER_PROVIDER_NOT_FOUND: {
    title: {
      en: 'User Provider Not Found',
      fr: "Fournisseur d'utilisateur non trouvé",
      es: 'Proveedor de usuario no encontrado',
    },
    message: {
      en: 'The user provider was not found.',
      fr: "Le fournisseur d'utilisateur n'a pas été trouvé.",
      es: 'El proveedor de usuario no se ha encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  USER_PROVIDER_ALREADY_EXISTS: {
    title: {
      en: 'User Provider Already Exists',
      fr: "Fournisseur d'utilisateur existe déjà",
      es: 'Proveedor de usuario ya existe',
    },
    message: {
      en: 'The user provider already exists.',
      fr: "Le fournisseur d'utilisateur existe déjà.",
      es: 'El proveedor de usuario ya existe.',
    },
    statusCode: HttpStatusCodes.CONFLICT_409,
  },
  USER_PASSWORD_NOT_DEFINED: {
    title: {
      en: 'User Password Not Defined',
      fr: "Mot de passe de l'utilisateur non défini",
      es: 'Contraseña de usuario no definida',
    },
    message: {
      en: 'The user password was not defined.',
      fr: "Le mot de passe de l'utilisateur n'a pas été défini.",
      es: 'La contraseña de usuario no se ha definido.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  USER_PROVIDER_SECRET_NOT_VALID: {
    title: {
      en: 'User Provider Secret Not Valid',
      fr: "Secret du fournisseur d'utilisateur non valide",
      es: 'Secret del proveedor de usuario no válido',
    },
    message: {
      en: 'The user provider secret was not valid.',
      fr: "Le secret du fournisseur d'utilisateur n'a pas été valide.",
      es: 'El secret del proveedor de usuario no es válido.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  JWT_TOKEN_CREATION_FAILED_USER: {
    title: {
      en: 'JWT Token Creation Failed',
      fr: 'Echec de la création du jeton JWT',
      es: 'Error al crear el token JWT',
    },
    message: {
      en: 'JWT token creation failed for user.',
      fr: "Echec de la création du jeton JWT pour l'utilisateur.",
      es: 'Error al crear el token JWT para el usuario.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  JWT_TOKEN_CREATION_FAILED_ORGANIZATION: {
    title: {
      en: 'JWT Token Creation Failed',
      fr: 'Echec de la création du jeton JWT',
      es: 'Error al crear el token JWT',
    },
    message: {
      en: 'JWT token creation failed for organization.',
      fr: "Echec de la création du jeton JWT pour l'organisation.",
      es: 'Error al crear el token JWT para la organización.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  JWT_TOKEN_CREATION_FAILED_PROJECT: {
    title: {
      en: 'JWT Token Creation Failed',
      fr: 'Echec de la création du jeton JWT',
      es: 'Error al crear el token JWT',
    },
    message: {
      en: 'JWT token creation failed for project.',
      fr: 'Echec de la création du jeton JWT pour le projet.',
      es: 'Error al crear el token JWT para el proyecto.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  JWT_TOKEN_ORGANIZATION_MISMATCH_PROJECT: {
    title: {
      en: 'Organization Mismatch',
      fr: 'Organisation non correspondante',
      es: 'Organización no coincidente',
    },
    message: {
      en: 'The specified organization does not match the organization of the project.',
      fr: "L'organisation spécifiée ne correspond pas à l'organisation du projet.",
      es: 'La organización especificada no coincide con la organización del proyecto.',
    },
    statusCode: HttpStatusCodes.UNAUTHORIZED_401,
  },
  ORGANIZATION_NOT_FOUND: {
    title: {
      en: 'Organization not Found',
      fr: 'Organisation non trouvée',
      es: 'Organización no encontrada',
    },
    message: {
      en: 'Organization not found for the project.',
      fr: 'Organisation non trouvée pour le projet.',
      es: 'Organización no encontrada para el proyecto.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  ORGANIZATION_NOT_DEFINED: {
    title: {
      en: 'Organization not defined',
      fr: 'Organisation non définie',
      es: 'Organización no definida',
    },
    message: {
      en: 'Organization is required, but not defined.',
      fr: 'Organisation requise, mais non définie.',
      es: 'Organización es requerida, pero no está definida.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  ORGANIZATION_ID_NOT_FOUND: {
    title: {
      en: 'Organization ID Not Found',
      fr: "Identifiant de l'organisation non trouvé",
      es: 'Identificador de la organización no encontrado',
    },
    message: {
      en: 'The organization ID was not found.',
      fr: "L'identifiant de l'organisation n'a pas été trouvé.",
      es: 'El identificador de la organización no se ha encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  ORGANIZATION_COUNT_FAILED: {
    title: {
      en: 'Organization Count Failed',
      fr: "Échec du comptage de l'organisation",
      es: 'Error al contar la organización',
    },
    message: {
      en: 'Failed to count organizations.',
      fr: 'Le comptage des organisations a échoué.',
      es: 'No se pudo contar las organizaciones.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  ORGANIZATION_INVALID_FIELDS: {
    title: {
      en: 'Organization Invalid Fields',
      fr: "Champs de l'organisation invalides",
      es: 'Campos de la organización no válidos',
    },
    message: {
      en: 'The provided organization fields are invalid.',
      fr: "Les champs fournis pour l'organisation sont invalides.",
      es: 'Los campos proporcionados para la organización no son válidos.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  ORGANIZATION_DATA_NOT_FOUND: {
    title: {
      en: 'Organization Data Not Found',
      fr: "Données de l'organisation non trouvées",
      es: 'Datos de la organización no encontrados',
    },
    message: {
      en: 'The organization data was not found.',
      fr: "Les données de l'organisation n'ont pas été trouvées.",
      es: 'Los datos de la organización no se han encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  ORGANIZATION_UPDATE_FAILED: {
    title: {
      en: 'Organization Update Failed',
      fr: "Échec de la mise à jour de l'organisation",
      es: 'Error al actualizar la organización',
    },
    message: {
      en: 'Failed to update the specified organization.',
      fr: "La mise à jour de l'organisation a échoué.",
      es: 'No se pudo actualizar la organización especificada.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  ORGANIZATION_MUST_HAVE_MEMBER: {
    title: {
      en: 'Organization Must Have Member',
      fr: "L'organisation doit avoir au moins un membre",
      es: 'La organización debe tener al menos un miembro',
    },
    message: {
      en: 'The organization must have at least one member.',
      fr: "L'organisation doit avoir au moins un membre.",
      es: 'La organización debe tener al menos un miembro.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  ORGANIZATION_MUST_HAVE_ADMIN: {
    title: {
      en: 'Organization Must Have Admin',
      fr: "L'organisation doit avoir au moins un administrateur",
      es: 'La organización debe tener al menos un administrador',
    },
    message: {
      en: 'The organization must have at least one admin.',
      fr: "L'organisation doit avoir au moins un administrateur.",
      es: 'La organización debe tener al menos un administrador.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  ORGANIZATION_PROJECT_MISMATCH: {
    title: {
      en: 'Organization Project Mismatch',
      fr: "Projet non trouvé dans l'organisation",
      es: 'El proyecto no se encuentra en la organización',
    },
    message: {
      en: 'The specified organization does not have the requested project.',
      fr: "L'organisation spécifiée n'a pas le projet demandé.",
      es: 'La organización especificada no tiene el proyecto solicitado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  DICTIONARY_NOT_FOUND: {
    title: {
      en: 'Dictionary Not Found',
      fr: 'Dictionnaire non trouvé',
      es: 'Diccionario no encontrado',
    },
    message: {
      en: 'The specified dictionary could not be found.',
      fr: 'Le dictionnaire spécifié est introuvable.',
      es: 'El diccionario especificado no se pudo encontrar.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  DICTIONARY_DATA_NOT_FOUND: {
    title: {
      en: 'Dictionary Data Not Found',
      fr: 'Données du dictionnaire non trouvées',
      es: 'Datos del diccionario no encontrados',
    },
    message: {
      en: 'The dictionary data was not found.',
      fr: "Les données du dictionnaire n'ont pas été trouvées.",
      es: 'Los datos del diccionario no se han encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  DICTIONARY_ID_NOT_FOUND: {
    title: {
      en: 'Dictionary ID Not Found',
      fr: 'Identifiant de dictionnaire non trouvé',
      es: 'Identificador de diccionario no encontrado',
    },
    message: {
      en: 'The dictionary ID was not found.',
      fr: "L'identifiant de dictionnaire n'a pas été trouvé.",
      es: 'El identificador de diccionario no se ha encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  DICTIONARY_COUNT_FAILED: {
    title: {
      en: 'Dictionary Count Failed',
      fr: 'Echec du comptage du dictionnaire',
      es: 'Error al contar el diccionario',
    },
    message: {
      en: 'Failed to count dictionaries.',
      fr: 'Le comptage des dictionnaires a échoué.',
      es: 'No se pudo contar los diccionarios.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  DICTIONARY_INVALID_FIELDS: {
    title: {
      en: 'Dictionary Invalid Fields',
      fr: 'Champs du dictionnaire invalides',
      es: 'Campos del diccionario no válidos',
    },
    message: {
      en: 'The provided dictionary fields are invalid.',
      fr: 'Les champs fournis pour le dictionnaire sont invalides.',
      es: 'Los campos proporcionados para el diccionario no son válidos.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  DICTIONARIES_NOT_PROVIDED: {
    title: {
      en: 'Dictionaries Not Provided',
      fr: 'Aucune dictionnaire fourni',
      es: 'No se proporcionaron diccionarios',
    },
    message: {
      en: 'No dictionaries were provided.',
      fr: 'Aucune dictionnaire fourni.',
      es: 'No se proporcionaron diccionarios.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  DICTIONARY_PROJECT_MISMATCH: {
    title: {
      en: 'Dictionary Project Mismatch',
      fr: "Le dictionnaire n'est pas dans le projet",
      es: 'El diccionario no está en el proyecto',
    },
    message: {
      en: 'The specified dictionary is not in the project.',
      fr: "Le dictionnaire n'est pas dans le projet.",
      es: 'El diccionario no está en el proyecto.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  DICTIONARY_UPDATE_FAILED: {
    title: {
      en: 'Dictionary Update Failed',
      fr: 'Echec de la mise à jour du dictionnaire',
      es: 'Error al actualizar el diccionario',
    },
    message: {
      en: 'Failed to update the specified dictionary.',
      fr: 'La mise à jour du dictionnaire a échoué.',
      es: 'No se pudo actualizar el diccionario especificado.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  DICTIONARY_ACCESS_DENIED: {
    title: {
      en: 'Access Denied to Dictionary',
      fr: 'Accès refusé au dictionnaire',
      es: 'Acceso denegado al diccionario',
    },
    message: {
      en: 'You do not have access to this dictionary.',
      fr: "Vous n'avez pas accès à ce dictionnaire.",
      es: 'No tienes acceso a este diccionario.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  NO_DICTIONARIES_PROVIDED: {
    title: {
      en: 'No Dictionaries Provided',
      fr: 'Aucun dictionnaire fourni',
      es: 'No se proporcionaron diccionarios',
    },
    message: {
      en: 'No dictionaries were provided for the operation.',
      fr: 'Aucun dictionnaire n’a été fourni pour l’opération.',
      es: 'No se proporcionaron diccionarios para la operación.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  PROJECT_NOT_DEFINED: {
    title: {
      en: 'Project not defined',
      fr: 'Projet non défini',
      es: 'Proyecto no definido',
    },
    message: {
      en: 'Project is required, but not defined.',
      fr: 'Projet requis, mais non défini.',
      es: 'Proyecto es requerido, pero no está definido.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  PROJECT_NOT_FOUND: {
    title: {
      en: 'Project Not Found',
      fr: 'Projet non trouvé',
      es: 'Proyecto no encontrado',
    },
    message: {
      en: 'The specified project could not be found.',
      fr: 'Le projet spécifié est introuvable.',
      es: 'El proyecto especificado no se pudo encontrar.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  PROJECT_ID_NOT_FOUND: {
    title: {
      en: 'Project ID Not Found',
      fr: 'Identifiant de projet non trouvé',
      es: 'Identificador de proyecto no encontrado',
    },
    message: {
      en: 'The project ID was not found.',
      fr: "L'identifiant de projet n'a pas été trouvé.",
      es: 'El identificador de proyecto no se ha encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  PROJECT_ID_MISMATCH: {
    title: {
      en: 'Project ID Mismatch',
      fr: 'Identifiant de projet non correspondant',
      es: 'Identificador de proyecto no coincidente',
    },
    message: {
      en: 'The provided project ID does not match the expected value. Please verify and try again.',
      fr: "L'identifiant de projet fourni ne correspond pas à la valeur attendue. Veuillez vérifier et réessayer.",
      es: 'El identificador de proyecto proporcionado no coincide con el valor esperado. Verifique e intente nuevamente.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  PROJECT_COUNT_FAILED: {
    title: {
      en: 'Project Count Failed',
      fr: 'Échec du comptage du projet',
      es: 'Error al contar el proyecto',
    },
    message: {
      en: 'Failed to count projects.',
      fr: 'Le comptage des projets a échoué.',
      es: 'No se pudo contar los proyectos.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  PROJECT_INVALID_FIELDS: {
    title: {
      en: 'Project Invalid Fields',
      fr: 'Champs du projet invalides',
      es: 'Campos del proyecto no válidos',
    },
    message: {
      en: 'The provided project fields are invalid.',
      fr: 'Les champs fournis pour le projet sont invalides.',
      es: 'Los campos proporcionados para el proyecto no son válidos.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  PROJECT_UPDATE_FAILED: {
    title: {
      en: 'Project Update Failed',
      fr: 'Échec de la mise à jour du projet',
      es: 'Error al actualizar el proyecto',
    },
    message: {
      en: 'Failed to update the specified project.',
      fr: 'La mise à jour du projet a échoué.',
      es: 'No se pudo actualizar el proyecto especificado.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  PROJECT_MUST_HAVE_MEMBER: {
    title: {
      en: 'Project Must Have Member',
      fr: 'Le projet doit avoir au moins un membre',
      es: 'El proyecto debe tener al menos un miembro',
    },
    message: {
      en: 'The project must have at least one member.',
      fr: 'Le projet doit avoir au moins un membre.',
      es: 'El proyecto debe tener al menos un miembro.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  PROJECT_MUST_HAVE_ADMIN: {
    title: {
      en: 'Project Must Have Admin',
      fr: 'Le projet doit avoir au moins un administrateur',
      es: 'El proyecto debe tener al menos un administrador',
    },
    message: {
      en: 'The project must have at least one admin.',
      fr: 'Le projet doit avoir au moins un administrateur.',
      es: 'El proyecto debe tener al menos un administrador.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  ACCESS_KEY_NOT_FOUND: {
    title: {
      en: 'Access Key Not Found',
      fr: "Clé d'accès non trouvée",
      es: 'Clave de acceso no encontrada',
    },
    message: {
      en: 'The specified access key could not be found.',
      fr: "La clé d'accès spécifiée est introuvable.",
      es: 'La clave de acceso especificada no se pudo encontrar.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  ACCESS_KEY_CREATION_FAILED: {
    title: {
      en: 'Access Key Creation Failed',
      fr: "Échec de la création de la clé d'accès",
      es: 'Error al crear la clave de acceso',
    },
    message: {
      en: 'Failed to create a new access key for the project.',
      fr: "La création d'une nouvelle clé d'accès pour le projet a échoué.",
      es: 'No se pudo crear una nueva clave de acceso para el proyecto.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  ACCESS_KEY_DELETION_FAILED: {
    title: {
      en: 'Access Key Deletion Failed',
      fr: "Échec de la suppression de la clé d'accès",
      es: 'Error al eliminar la clave de acceso',
    },
    message: {
      en: 'Failed to delete the specified access key.',
      fr: "La suppression de la clé d'accès a échoué.",
      es: 'No se pudo eliminar la clave de acceso especificada.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  ACCESS_KEy_UPDATE_FAILED: {
    title: {
      en: 'Access Key Update Failed',
      fr: "Échec de la mise à jour de la clé d'accès",
      es: 'Error al actualizar la clave de acceso',
    },
    message: {
      en: 'Failed to update the specified access key.',
      fr: "La mise à jour de la clé d'accès a échoué.",
      es: 'No se pudo actualizar la clave de acceso especificada.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  ACCESS_KEY_INVALID: {
    title: {
      en: 'Invalid Access Key',
      fr: "Clé d'accès invalide",
      es: 'Clave de acceso no válida',
    },
    message: {
      en: 'The provided access key is invalid or expired.',
      fr: "La clé d'accès fournie est invalide ou expirée.",
      es: 'La clave de acceso proporcionada no es válida o ha expirado.',
    },
    statusCode: HttpStatusCodes.UNAUTHORIZED_401,
  },
  GITHUB_FETCH_USER_DATA_FAILED: {
    title: {
      en: 'GitHub Fetch User Data Failed',
      fr: 'Échec de la récupération des données utilisateur de GitHub',
      es: 'Error al obtener datos del usuario de GitHub',
    },
    message: {
      en: 'Failed to fetch user data from GitHub.',
      fr: 'Échec de la récupération des données utilisateur de GitHub.',
      es: 'Error al obtener datos del usuario de GitHub.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  GIT_HUB_FETCH_USER_EMAIL_FAILED: {
    title: {
      en: 'GitHub Fetch User Email Failed',
      fr: "Échec de la récupération de l'email utilisateur de GitHub",
      es: 'Error al obtener el correo electrónico del usuario de GitHub',
    },
    message: {
      en: 'Failed to fetch user email from GitHub.',
      fr: "Échec de la récupération de l'email utilisateur de GitHub.",
      es: 'Error al obtener el correo electrónico del usuario de GitHub.',
    },
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
  },
  LOGIN_FAILED: {
    title: {
      en: 'Login Failed',
      fr: 'Échec de la connexion',
      es: 'Error al iniciar sesión',
    },
    message: {
      en: 'The email or password provided is incorrect.',
      fr: "L'email ou le mot de passe fourni est incorrect.",
      es: 'El correo electrónico o la contraseña proporcionada es incorrecta.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  INVALID_USER_ID: {
    title: {
      en: 'Invalid User ID',
      fr: 'Identifiant utilisateur non valide',
      es: 'Identificador de usuario no válido',
    },
    message: {
      en: 'The provided user ID is invalid.',
      fr: "L'identifiant utilisateur fourni n'est pas valide.",
      es: 'El identificador de usuario proporcionado no es válido.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  EMAIL_NOT_PROVIDED: {
    title: {
      en: 'Email Not Provided',
      fr: 'Email non fourni',
      es: 'Email no proporcionado',
    },
    message: {
      en: 'Email not provided.',
      fr: 'Email non fourni.',
      es: 'Email no proporcionado.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  EMAIL_ALREADY_VALIDATED: {
    title: {
      en: 'Email Already Validated',
      fr: 'Email déjà validé',
      es: 'Email ya validado',
    },
    message: {
      en: 'The email has already been validated.',
      fr: "L'email a déjà été validé.",
      es: 'El correo electrónico ya ha sido validado.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  SECRET_NOT_PROVIDED: {
    title: {
      en: 'Secret Not Provided',
      fr: 'Secret non fourni',
      es: 'Secreto no proporcionado',
    },
    message: {
      en: 'Secret not provided.',
      fr: 'Secret non fourni.',
      es: 'Secreto no proporcionado.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  SESSION_NOT_FOUND: {
    title: {
      en: 'Session Not Found',
      fr: 'Session non trouvée',
      es: 'Sesión no encontrada',
    },
    message: {
      en: 'The session was not found.',
      fr: "La session n'a pas été trouvée.",
      es: 'La sesión no se ha encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  CLIENT_ID_NOT_FOUND: {
    title: {
      en: 'Client ID Not Found',
      fr: 'Identifiant client non trouvé',
      es: 'Identificador de cliente no encontrado',
    },
    message: {
      en: 'The client ID was not found.',
      fr: "L'identifiant client n'a pas été trouvé.",
      es: 'El identificador de cliente no se ha encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  USER_IS_NOT_ADMIN_OF_ORGANIZATION: {
    title: {
      en: 'User Is Not Admin Of Organization',
      fr: "L'utilisateur n'est pas administrateur de l'organisation",
      es: 'El usuario no es administrador de la organización',
    },
    message: {
      en: 'The user is not an admin of the organization.',
      fr: "L'utilisateur n'est pas administrateur de l'organisation.",
      es: 'El usuario no es administrador de la organización.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  USER_IS_NOT_ADMIN_OF_PROJECT: {
    title: {
      en: 'User Is Not Admin Of Project',
      fr: "L'utilisateur n'est pas administrateur du projet",
      es: 'El usuario no es administrador del proyecto',
    },
    message: {
      en: 'The user is not an admin of the project.',
      fr: "L'utilisateur n'est pas administrateur du projet.",
      es: 'El usuario no es administrador del proyecto.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  PROJECT_DATA_NOT_FOUND: {
    title: {
      en: 'Project Data Not Found',
      fr: 'Données du projet non trouvées',
      es: 'Datos del proyecto no encontrados',
    },
    message: {
      en: 'The project data was not found.',
      fr: "Les données du projet n'ont pas été trouvées.",
      es: 'Los datos del proyecto no se han encontrado.',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  PROJECT_NOT_IN_ORGANIZATION: {
    title: {
      en: 'Project Not In Organization',
      fr: "Projet non dans l'organisation",
      es: 'Proyecto no en la organización',
    },
    message: {
      en: 'The project is not in the organization.',
      fr: "Le projet n'est pas dans l'organisation.",
      es: 'El proyecto no está en la organización.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  DICTIONARY_RIGHTS_NOT_READ: {
    title: {
      en: 'Dictionary Rights Not Read',
      fr: 'Droits de dictionnaire non lus',
      es: 'Derechos de diccionario no leídos',
    },
    message: {
      en: 'You do not have read access to this dictionary.',
      fr: "Vous n'avez pas accès en lecture à ce dictionnaire.",
      es: 'No tienes acceso de lectura a este diccionario.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  DICTIONARY_RIGHTS_NOT_WRITE: {
    title: {
      en: 'Dictionary Rights Not Write',
      fr: 'Droits de dictionnaire non écrits',
      es: 'Derechos de diccionario no escritos',
    },
    message: {
      en: 'You do not have write access to this dictionary.',
      fr: "Vous n'avez pas accès en écriture à ce dictionnaire.",
      es: 'No tienes acceso de escritura a este diccionario.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  DICTIONARY_RIGHTS_NOT_ADMIN: {
    title: {
      en: 'Dictionary Rights Not Admin',
      fr: 'Droits de dictionnaire non admin',
      es: 'Derechos de diccionario no admin',
    },
    message: {
      en: 'You do not have admin access to this dictionary.',
      fr: "Vous n'avez pas accès en admin à ce dictionnaire.",
      es: 'No tienes acceso de admin a este diccionario.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  PROJECT_RIGHTS_NOT_READ: {
    title: {
      en: 'Project Rights Not Read',
      fr: 'Droits de projet non lus',
      es: 'Derechos de proyecto no leídos',
    },
    message: {
      en: 'You do not have read access to this project.',
      fr: "Vous n'avez pas accès en lecture à ce projet.",
      es: 'No tienes acceso de lectura a este proyecto.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  PROJECT_RIGHTS_NOT_WRITE: {
    title: {
      en: 'Project Rights Not Write',
      fr: 'Droits de projet non écrits',
      es: 'Derechos de proyecto no escritos',
    },
    message: {
      en: 'You do not have write access to this project.',
      fr: "Vous n'avez pas accès en écriture à ce projet.",
      es: 'No tienes acceso de escritura a este proyecto.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  PROJECT_RIGHTS_NOT_ADMIN: {
    title: {
      en: 'Project Rights Not Admin',
      fr: 'Droits de projet non admin',
      es: 'Derechos de proyecto no admin',
    },
    message: {
      en: 'You do not have admin access to this project.',
      fr: "Vous n'avez pas accès en admin à ce projet.",
      es: 'No tienes acceso de admin a este proyecto.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  ORGANIZATION_RIGHTS_NOT_READ: {
    title: {
      en: 'Organization Rights Not Read',
      fr: "Droits d'organisation non lus",
      es: 'Derechos de organización no leídos',
    },
    message: {
      en: 'You do not have read access to this organization.',
      fr: "Vous n'avez pas accès en lecture à cette organisation.",
      es: 'No tienes acceso de lectura a esta organización.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  ORGANIZATION_RIGHTS_NOT_WRITE: {
    title: {
      en: 'Organization Rights Not Write',
      fr: "Droits d'organisation non écrits",
      es: 'Derechos de organización no escritos',
    },
    message: {
      en: 'You do not have write access to this organization.',
      fr: "Vous n'avez pas accès en écriture à cette organisation.",
      es: 'No tienes acceso de escritura a esta organización.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  ORGANIZATION_RIGHTS_NOT_ADMIN: {
    title: {
      en: 'Organization Rights Not Admin',
      fr: "Droits d'organisation non admin",
      es: 'Derechos de organización no admin',
    },
    message: {
      en: 'You do not have admin access to this organization.',
      fr: "Vous n'avez pas accès en admin à cette organisation.",
      es: 'No tienes acceso de admin a esta organización.',
    },
    statusCode: HttpStatusCodes.FORBIDDEN_403,
  },
  PLAN_NOT_FOUND: {
    title: {
      en: 'Plan Not Found',
      fr: 'Plan non trouvé',
      es: 'Plan no encontrado',
    },
    message: {
      en: 'Plan not found',
      fr: 'Plan non trouvé',
      es: 'Plan no encontrado',
    },
    statusCode: HttpStatusCodes.NOT_FOUND_404,
  },
  MULTIPLE_PLANS_FOUND: {
    title: {
      en: 'Multiple Plans Found',
      fr: 'Plusieurs plans trouvés',
      es: 'Múltiples planes encontrados',
    },
    message: {
      en: 'Multiple plans found for the provided information.',
      fr: "Plusieurs plans trouvés pour l'information fournie.",
      es: 'Múltiples planes encontrados para la información proporcionada.',
    },
    statusCode: HttpStatusCodes.BAD_REQUEST_400,
  },
  PLAN_USER_LIMIT_REACHED: {
    title: {
      en: 'Plan User Limit Reached',
      fr: 'Limite de participants atteint',
      es: 'Límite de participantes alcanzado',
    },
    message: {
      en: 'The plan has reached its user limit. Please upgrade to add more users.',
      fr: 'Le plan a atteint son limite de participants. Veuillez mettre à niveau pour ajouter plus de participants.',
      es: 'El plan ha alcanzado su límite de participantes. Actualice para agregar más usuarios.',
    },
    statusCode: HttpStatusCodes.UNAUTHORIZED_401,
  },
  PLAN_PROJECT_LIMIT_REACHED: {
    title: {
      en: 'Plan Project Limit Reached',
      fr: 'Limite de projets atteint',
      es: 'Límite de proyectos alcanzado',
    },
    message: {
      en: 'The plan has reached its project limit. Please upgrade to add more projects.',
      fr: 'Le plan a atteint son limite de projets. Veuillez mettre à niveau pour ajouter plus de projets.',
      es: 'El plan ha alcanzado su límite de proyectos. Actualice para agregar más proyectos.',
    },
    statusCode: HttpStatusCodes.UNAUTHORIZED_401,
  },
} satisfies Record<string, ErrorCode>;

export type ErrorCodes = keyof typeof errorData;
