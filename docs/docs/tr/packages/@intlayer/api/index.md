---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: @intlayer/api - SDK for Intlayer API Integration
description: NPM package providing Software Development Kit (SDK) to interact with Intlayer API for content auditing, organizations, projects, and user management.
keywords:
  - intlayer
  - API
  - SDK
  - integration
  - content audit
  - organizations
  - projects
  - JavaScript
slugs:
  - doc
  - packages
  - intlayer
  - api
---

# @intlayer/api: Intlayer API ile etkileşim için NPM Paketi

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, React ve Express.js gibi çerçevelerle uyumludur.

**`@intlayer/api`** paketi, Intlayer API ile etkileşim için bir SDK'dir (Software Development Kit). İçerik beyanını denetlemek, organizasyonlarla, projelerle ve kullanıcılarla etkileşim kurmak vb. için bir dizi fonksiyon sağlar.

## Kullanım

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Kurulum

Tercih ettiğiniz paket yöneticisini kullanarak gerekli paketi yükleyin:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler     |
| ------ | ---------- | ----------------- |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı |
