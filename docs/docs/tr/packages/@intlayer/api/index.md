---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: @intlayer/api - Intlayer API Entegrasyonu için SDK
description: İçerik denetimi, organizasyonlar, projeler ve kullanıcı yönetimi için Intlayer API ile etkileşim kurmak üzere Yazılım Geliştirme Kiti (SDK) sağlayan NPM paketi.
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

**Intlayer**, özellikle JavaScript geliştiricileri için tasarlanmış bir paket paketidir. React, Next.js ve Express.js gibi çerçevelerle uyumludur.

**`@intlayer/api`** paketi, Intlayer API ile etkileşim için bir SDK'dir. İçerik bildirimini denetlemek, organizasyonlarla, projelerle ve kullanıcılarla etkileşim kurmak için bir dizi fonksiyon sağlar, vb.

## Kullanım

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## Kurulum

Gerekli paketi tercih ettiğiniz paket yöneticisi kullanarak yükleyin:

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
