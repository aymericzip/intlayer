---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Construyendo un Asistente de Documentación Potenciado por RAG (Fragmentación, Embeddings y Búsqueda)
description: Construyendo un Asistente de Documentación Potenciado por RAG (Fragmentación, Embeddings y Búsqueda)
keywords:
  - RAG
  - Documentación
  - Asistente
  - Fragmentación
  - Embeddings
  - Búsqueda
slugs:
  - blog
  - rag-powered-documentation-assistant
---

# Construyendo un Asistente de Documentación Potenciado por RAG (Fragmentación, Embeddings y Búsqueda)

## Lo que obtienes

He construido un asistente de documentación potenciado por RAG y lo empaqueté en una plantilla que puedes usar de inmediato.

- Viene con una aplicación lista para usar (Next.js + API de OpenAI)
- Incluye una pipeline RAG funcional (fragmentación, embeddings, similitud coseno)
- Proporciona una interfaz completa de chatbot construida en React
- Todos los componentes de la interfaz de usuario son completamente editables con Tailwind CSS
- Registra cada consulta del usuario para ayudar a identificar documentación faltante, puntos de dolor del usuario y oportunidades de producto

👉 [Demostración en vivo](https://intlayer.org/doc/why) 👉 [Plantilla de código](https://github.com/aymericzip/smart_doc_RAG)

## Introducción

Si alguna vez te has perdido en la documentación, desplazándote sin fin en busca de una respuesta, sabes lo doloroso que puede ser. La documentación es útil, pero es estática y buscar en ella a menudo se siente torpe.

Ahí es donde entra **RAG (Generación Aumentada por Recuperación)**. En lugar de obligar a los usuarios a buscar entre el texto, podemos combinar **recuperación** (encontrar las partes correctas de la documentación) con **generación** (dejar que un LLM lo explique de forma natural).

En esta publicación, te guiaré a través de cómo construí un chatbot de documentación potenciado por RAG y cómo no solo ayuda a los usuarios a encontrar respuestas más rápido, sino que también ofrece a los equipos de producto una nueva forma de entender los puntos de dolor de los usuarios.

## ¿Por qué usar RAG para la documentación?

RAG se ha convertido en un enfoque popular por una razón: es una de las formas más prácticas de hacer que los grandes modelos de lenguaje sean realmente útiles.

Para la documentación, los beneficios son claros:

- Respuestas instantáneas: los usuarios preguntan en lenguaje natural y obtienen respuestas relevantes.
- Mejor contexto: el modelo solo ve las secciones de documentación más relevantes, reduciendo las alucinaciones.
- Búsqueda que se siente humana: más como Algolia + FAQ + chatbot, todo en uno.
- Ciclo de retroalimentación: al almacenar las consultas, descubres con qué realmente tienen dificultades los usuarios.

Ese último punto es crucial. Un sistema RAG no solo responde preguntas, sino que te dice qué es lo que la gente está preguntando. Eso significa:

- Descubres información faltante en tus documentos.
- Ves solicitudes de funciones emergentes.
- Detectas patrones que incluso pueden guiar la estrategia del producto.

Así que, RAG no es solo una herramienta de soporte. También es un **motor de descubrimiento de producto**.

## Cómo funciona la canalización RAG

![RAG Pipeline](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

A grandes rasgos, esta es la receta que usé:

1.  **Dividir la documentación en fragmentos** Los archivos grandes de Markdown se dividen en fragmentos. Dividir permite proporcionar como contexto solo las partes relevantes de la documentación.
2.  **Generar embeddings** Cada fragmento se convierte en un vector usando la API de embeddings de OpenAI (text-embedding-3-large) o una base de datos vectorial (Chroma, Qdrant, Pinecone).
3.  **Indexación y almacenamiento** Los embeddings se almacenan en un archivo JSON simple (para mi demo), pero en producción, probablemente usarías una base de datos vectorial.
4.  **Recuperación (R en RAG)** Se incrusta la consulta del usuario, se calcula la similitud coseno y se recuperan los fragmentos que mejor coinciden.
5.  **Aumento + Generación (AG en RAG)** Esos fragmentos se inyectan en el prompt para ChatGPT, de modo que el modelo responda con el contexto real de la documentación.
6.  **Registro de consultas para retroalimentación** Cada consulta del usuario se almacena. Esto es oro para entender puntos problemáticos, documentación faltante o nuevas oportunidades.

<Steps>

<Step number={1} title="Leer la documentación">

El primer paso fue simple: necesitaba una forma de escanear una carpeta docs/ para todos los archivos .md. Usando Node.js y glob, obtuve el contenido de cada archivo Markdown en memoria.

Esto mantiene la canalización flexible: en lugar de Markdown, podrías obtener documentos de una base de datos, un CMS o incluso una API.

</Step>

<Step number={2} title="Dividir la Documentación en Fragmentos">

¿Por qué dividir en fragmentos? Porque los modelos de lenguaje tienen **límites de contexto**. Alimentarlos con un libro entero de documentación no funcionará.

Entonces, la idea es dividir el texto en fragmentos manejables (por ejemplo, 500 tokens cada uno) con solapamiento (por ejemplo, 100 tokens). El solapamiento asegura continuidad para que no pierdas el significado en los límites de los fragmentos.

**Ejemplo:**

- Fragmento 1 → “…la vieja biblioteca que muchos habían olvidado. Sus estanterías imponentes estaban llenas de libros…”
- Fragmento 2 → “…las estanterías estaban llenas de libros de todos los géneros imaginables, cada uno susurrando historias…”

El solapamiento asegura que ambos fragmentos contengan contexto compartido, por lo que la recuperación permanece coherente.

Este compromiso (tamaño del fragmento vs superposición) es clave para la eficiencia de RAG:

- Demasiado pequeño → obtienes ruido.
- Demasiado grande → explotas el tamaño del contexto.

</Step>

<Step number={3} title="Generación de Embeddings">

Una vez que los documentos están fragmentados, generamos **embeddings**, vectores de alta dimensión que representan cada fragmento.

Usé el modelo text-embedding-3-large de OpenAI, pero podrías usar cualquier modelo moderno de embeddings.

**Ejemplo de embedding:**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 elementos
];
```

Cada vector es una huella matemática del texto, que permite la búsqueda por similitud.

</Step>

<Step number={4} title="Indexación y Almacenamiento de Embeddings">

Para evitar regenerar embeddings múltiples veces, los almacené en embeddings.json.

En producción, probablemente querrás una base de datos vectorial como:

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, etc.

Las bases de datos vectoriales manejan la indexación, escalabilidad y búsqueda rápida. Pero para mi prototipo, un JSON local funcionó bien.

</Step>

<Step number={5} title="Recuperación con Similitud del Coseno">

Cuando un usuario hace una pregunta:

1. Generar un embedding para la consulta.
2. Compararlo con todos los embeddings de los documentos usando **similitud del coseno**.
3. Mantener solo los N fragmentos más similares.

La similitud del coseno mide el ángulo entre dos vectores. Una coincidencia perfecta obtiene un puntaje de **1.0**.

De esta manera, el sistema encuentra los pasajes del documento más cercanos a la consulta.

</Step>

<Step number={6} title="Aumento + Generación">

Ahora viene la magia. Tomamos los fragmentos principales y los inyectamos en el **prompt del sistema** para ChatGPT.

Eso significa que el modelo responde como si esos fragmentos fueran parte de la conversación.

El resultado: respuestas precisas y **basadas en la documentación**.

</Step>

<Step number={7} title="Registro de Consultas de Usuarios">

Este es el superpoder oculto.

Cada pregunta realizada se almacena. Con el tiempo, construyes un conjunto de datos de:

- Preguntas más frecuentes (ideal para FAQs)
- Preguntas sin respuesta (documentación faltante o poco clara)
- Solicitudes de funciones disfrazadas de preguntas (“¿Se integra con X?”)
- Casos de uso emergentes que no habías previsto

Esto convierte a tu asistente RAG en una **herramienta continua de investigación de usuarios**.

</Step>

<Step number={8} title="¿Cuánto Cuesta?">

Una objeción común a RAG es el costo. En la práctica, es sorprendentemente barato:

- Generar embeddings para ~200 documentos toma alrededor de **5 minutos** y cuesta **1–2 euros**.
- La función de búsqueda en documentos es 100% gratuita.
- Para las consultas, usamos gpt-4o-latest sin el modo de “pensamiento”. En Intlayer, vemos alrededor de **300 consultas de chat por mes**, y la factura de la API de OpenAI rara vez supera los **10 $**.

Además de eso, puedes incluir el costo de alojamiento.

</Step>

<Step number={9} title="Detalles de Implementación">

Stack:

- Monorepo: espacio de trabajo pnpm
- Paquete de documentación: Node.js / TypeScript / API de OpenAI
- Frontend: Next.js / React / Tailwind CSS
- Backend: ruta API de Node.js / API de OpenAI

El paquete `@smart-doc/docs` es un paquete TypeScript que maneja el procesamiento de la documentación. Cuando se agrega o modifica un archivo markdown, el paquete incluye un script `build` que reconstruye la lista de documentación en cada idioma, genera embeddings y los almacena en un archivo `embeddings.json`.

Para el frontend, usamos una aplicación Next.js que proporciona:

- Renderizado de Markdown a HTML
- Una barra de búsqueda para encontrar documentación relevante
- Una interfaz de chatbot para hacer preguntas sobre la documentación

Para realizar una búsqueda en la documentación, la aplicación Next.js incluye una ruta API que llama a una función del paquete `@smart-doc/docs` para recuperar fragmentos de documentación que coincidan con la consulta. Usando estos fragmentos, podemos devolver una lista de páginas de documentación relevantes para la búsqueda del usuario.

Para la funcionalidad del chatbot, seguimos el mismo proceso de búsqueda pero además inyectamos los fragmentos de documentación recuperados en el prompt enviado a ChatGPT.

Aquí hay un ejemplo de un prompt enviado a ChatGPT:

Prompt del sistema:

```txt
Eres un asistente útil que puede responder preguntas sobre la documentación de Intlayer.

Fragmentos relacionados:

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/es/getting-started"
---

# Cómo empezar

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/es/another-doc"
---

# Otro documento

...
```

Consulta del usuario:

```txt
¿Cómo empezar?
```

Usamos SSE para transmitir la respuesta desde la ruta API.

Como se mencionó, usamos gpt-4-turbo sin modo "pensando". Las respuestas son relevantes y la latencia es baja.
Experimentamos con gpt-5, pero la latencia era demasiado alta (a veces hasta 15 segundos para una respuesta). Pero lo revisaremos en el futuro.

👉 [Prueba la demo aquí](https://intlayer.org/doc/why) 👉 [Consulta la plantilla de código en GitHub](https://github.com/aymericzip/smart_doc_RAG)

</Step>

<Step number={10} title="Ir más allá">

Este proyecto es una implementación mínima. Pero puedes ampliarlo de muchas maneras:

- Servidor MCP → la función de búsqueda en la documentación a un servidor MCP para conectar la documentación con cualquier asistente de IA

- Bases de datos vectoriales → escalar a millones de fragmentos de documentación
- LangChain / LlamaIndex → frameworks listos para usar para pipelines RAG
- Paneles de análisis → visualizar consultas de usuarios y puntos problemáticos
- Recuperación multisource → obtener no solo documentos, sino entradas de bases de datos, publicaciones de blogs, tickets, etc.
- Mejora en el prompting → reordenamiento, filtrado y búsqueda híbrida (palabra clave + semántica)

</Step>

<Step number={11} title="Limitaciones que hemos encontrado">

- La segmentación y el solapamiento son empíricos. El equilibrio correcto (tamaño del fragmento, porcentaje de solapamiento, número de fragmentos recuperados) requiere iteración y pruebas.
- Los embeddings no se regeneran automáticamente cuando los documentos cambian. Nuestro sistema reinicia los embeddings para un archivo solo si el número de fragmentos difiere de lo almacenado.
- En este prototipo, los embeddings se almacenan en JSON. Esto funciona para demostraciones pero contamina Git. En producción, es mejor usar una base de datos o un almacén vectorial dedicado.

</Step>

<Step number={12} title="Por qué esto importa más allá de la documentación">

La parte interesante no es solo el chatbot. Es el **bucle de retroalimentación**.

Con RAG, no solo respondes:

- Aprendes qué confunde a los usuarios.
- Descubres qué características esperan.
- Adaptas tu estrategia de producto basándote en consultas reales.

**Ejemplo:**

Imagina lanzar una nueva función y ver instantáneamente:

- El 50% de las preguntas son sobre el mismo paso de configuración poco claro
- Los usuarios piden repetidamente una integración que aún no soportas
- La gente busca términos que revelan un nuevo caso de uso

Eso es **inteligencia de producto** directamente de tus usuarios.

</Step>

<Step number={13} title="Conclusión">

- En este prototipo, los embeddings se almacenan en JSON. Esto funciona para demostraciones pero contamina Git. En producción, es mejor usar una base de datos o un almacén vectorial dedicado.

</Step>

<Step number={14} title="Por qué esto importa más allá de la documentación">

La parte interesante no es solo el chatbot. Es el **ciclo de retroalimentación**.

Con RAG, no solo respondes:

- Aprendes qué confunde a los usuarios.
- Descubres qué funciones esperan.
- Adaptas tu estrategia de producto basándote en consultas reales.

**Ejemplo:**

Imagina lanzar una nueva función y ver instantáneamente:

- El 50% de las preguntas son sobre el mismo paso de configuración poco claro
- Los usuarios piden repetidamente una integración que aún no soportas
- La gente busca términos que revelan un nuevo caso de uso

Eso es **inteligencia de producto** directamente de tus usuarios.

</Step>

<Step number={15} title="Conclusión">

RAG es una de las formas más simples y poderosas de hacer que los LLMs sean prácticos. Al combinar **recuperación + generación**, puedes convertir documentos estáticos en un **asistente inteligente** y, al mismo tiempo, obtener un flujo continuo de información sobre el producto.

Para mí, este proyecto mostró que RAG no es solo un truco técnico. Es una forma de transformar la documentación en:

- un sistema de soporte interactivo
- un canal de retroalimentación
- una herramienta de estrategia de producto

👉 [Prueba la demo aquí](https://intlayer.org/doc/why) 👉 [Consulta la plantilla de código en GitHub](https://github.com/aymericzip/smart_doc_RAG)

Y si también estás experimentando con RAG, me encantaría saber cómo lo estás usando.

</Step>

</Steps>
