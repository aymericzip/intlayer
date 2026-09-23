---
createdAt: 2025-04-18
updatedAt: 2026-09-22
title: Aviso de Privacidad de Intlayer
description: Descubre cómo Intlayer maneja la información recopilada a través de nuestro sitio web y CMS. Sigue la documentación para entender los diferentes formatos y casos de uso.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Privacidad
  - Aviso
  - Cookies
  - Seguimiento
  - Analítica
  - Google Analytics
  - Meta (Facebook) Pixel
  - Autenticación
  - Datos de Usuario
slugs:
  - privacy-notice
author: aymericzip
---

# Aviso de Privacidad de Intlayer

## Introducción

En Intlayer, tomamos la privacidad en serio. Este aviso explica cómo manejamos la información recopilada a través de nuestro sitio web y CMS.

## Contacto

Si tiene alguna pregunta o inquietud sobre la privacidad, por favor contáctenos en la siguiente dirección: [contact@intlayer.org](mailto:contact@intlayer.org).

## Uso de Cookies y Tecnologías de Seguimiento

Utilizamos **Google Analytics** y el **Meta (Facebook) Pixel** para analizar el uso de nuestro sitio web y mejorar nuestros servicios. Estas herramientas generan estadísticas y otra información sobre el sitio web utilizando cookies almacenadas en los dispositivos de los usuarios.

Para más información:

- [Política de privacidad de Google](https://policies.google.com/privacy)
- [Política de privacidad de Meta](https://www.facebook.com/privacy/policy)

## Autenticación y Datos de Usuario

El acceso al CMS de Intlayer requiere autenticación de usuario. Ofrecemos tanto autenticación por correo electrónico/contraseña como inicio de sesión a través de terceros mediante **Google** y **GitHub**.

Durante el proceso de autenticación, recopilamos:

- Dirección de correo electrónico
- Nombre para mostrar (o nombre elegido)

Los usuarios también pueden acceder al CMS mediante tokens de acceso vinculados a su cuenta. Estos tokens están asociados con los mismos datos de autenticación.

## Intlayer i18n Scanner (extensión de Chrome)

La extensión de Chrome **Intlayer i18n Scanner** inspecciona la configuración de internacionalización de la página abierta en la pestaña actual.

- **Análisis local:** Cuando abre la ventana emergente de la extensión, esta lee la página actual (atributos de idioma, enlaces hreflang, etiquetas meta, variables globales del framework) directamente en su navegador. Este contenido no se envía a nuestros servidores.
- **Auditoría:** Solo cuando hace clic en el botón de escaneo, la URL de la página actual se envía a la API de Intlayer (`back.intlayer.org`) para realizar la auditoría. Solo almacenamos el **nombre de dominio** de la página escaneada, la **puntuación** obtenida y la **fecha** del escaneo, para calcular estadísticas agregadas. Este registro no está vinculado a su identidad ni a una cuenta de Intlayer.
- **Ninguna otra recopilación:** La extensión no recopila información personal, datos de autenticación ni actividad del usuario, no rastrea las páginas que visita, no utiliza cookies ni herramientas de análisis y no ejecuta código remoto.

## Almacenamiento y Seguridad de Datos

Los datos de autenticación de los usuarios se almacenan en una **base de datos MongoDB** alojada en **cloud.mongodb.com**:

- **Región:** AWS / Oregon (us-west-2)
- **Tipo:** Replica Set (3 nodos)
- **Seguridad de Contraseñas:** Todas las contraseñas están cifradas utilizando prácticas estándar de la industria.

No almacenamos datos personales innecesarios más allá de lo requerido para la autenticación y el acceso seguro al CMS.

## Compartición de Datos con Terceros

No vendemos ni compartimos sus datos personales con terceros, excepto cuando sea necesario para análisis (Google Analytics, Facebook Pixel) o como parte del proceso de autenticación (inicio de sesión con Google o GitHub).

## Derechos de los Usuarios

Como usuario, usted tiene el derecho a:

- Acceder a los datos personales que tenemos sobre usted
- Solicitar la corrección o eliminación de sus datos
- Revocar el acceso o eliminar su cuenta

Para cualquier solicitud relacionada con sus datos, contáctenos en [contact@intlayer.org](mailto:contact@intlayer.org).

## Cambios en este Aviso

Podemos actualizar este aviso de privacidad de vez en cuando. Se recomienda a los usuarios revisar esta página regularmente para mantenerse informados sobre cualquier cambio.
