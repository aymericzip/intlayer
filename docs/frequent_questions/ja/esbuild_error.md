---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: "Intlayer の ESBuild エラーを直す"
description: "Intlayer のビルド中に起きる ESBuild エラーを修正。多くの場合、フレームワーク用のバンドラープラグインが未設定か誤って設定されています。"
keywords:
  - esbuild
  - エラー
  - intlayer
  - プラグイン
  - フレームワーク
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - frequent-questions
  - esbuild-error
author: aymericzip
---

# ESBuild エラー

ビルドプロセス中に ESBuild エラーが発生した場合、Intlayer プラグインが正しく設定されていない可能性があります。

ESBuild はコンテンツ宣言ファイル（`.content.{ts,js,mjs,cjs,json}`）を読み込み、対応する辞書を `.intlayer/dictionary` フォルダに生成する役割を担っています。また、設定ファイル（`intlayer.config.ts`）も読み込みます。

Intlayer はバンドラーと統合するためのプラグインを提供しています。これはサーバーサイドでのみ実行されるコンポーネントにエイリアスを設定するよう設計されています。

Next.js（Webpack / Turbopack）、Vite、React Native、Lynx などのフレームワークを使用している場合、Intlayer はアプリケーションに Intlayer を統合するために使用できるプラグインを提供しています。プラグインの統合方法については、使用しているフレームワークの特定のドキュメントを参照してください。
