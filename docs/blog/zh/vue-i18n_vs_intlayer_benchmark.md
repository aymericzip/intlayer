---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n vs Intlayer: 2026 基准测试"
description: 在相同的 Vite + Vue 3 应用上测量 vue-i18n 和 Intlayer。库大小、每页 JavaScript、内容泄漏、组件大小和语言切换响应性，附带详细数据说明。
keywords:
  - vue-i18n
  - Intlayer
  - 国际化
  - i18n
  - 基准测试
  - 包大小
  - 博客
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n vs Intlayer | Vue 国际化（i18n）基准测试

`vue-i18n` 是 Vue 的参考 i18n 库。Intlayer 是一个基于编译器、组件作用域的替代方案，具有 Vue 集成（`vue-intlayer`）。我们已经比较过它们的[功能和开发体验](https://intlayer.org/blog/vue-i18n-vs-intlayer)。本文着眼于每个库在应用构建后的成本。

数据来自 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)，这是一个开源套件，使用每个库构建相同的应用程序，并记录浏览器实际下载和执行的内容。

<TOC/>
