---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Помилка ESBuild
description: Дізнайтеся, як виправляти помилки ESBuild.
keywords:
  - esbuild
  - error
  - intlayer
  - plugin
  - framework
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
---

# Помилка ESBuild

Якщо під час збірки ви стикаєтеся з помилкою ESBuild, швидше за все плагін Intlayer налаштовано неправильно.

ESBuild відповідає за читання файлів декларації контенту (`.content.{ts,js,mjs,cjs,json}`) та генерацію відповідних словників у папці `.intlayer/dictionary`. А також за читання файлу конфігурації (`intlayer.config.ts`).

Intlayer надає плагіни для інтеграції з вашими бандлерами. Це призначено для створення псевдонімів (alias) для компонентів, які мають виконуватися лише на сервері.

Якщо ви використовуєте фреймворк, такий як Next.js (Webpack / Turbopack), Vite, React Native, Lynx тощо, Intlayer надає плагін, який можна використати для інтеграції Intlayer у ваш застосунок. Тому зверніться до специфічної документації вашого фреймворка, щоб дізнатися, як інтегрувати плагін.
