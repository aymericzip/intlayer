---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - حزمة تطوير برمجيات لتكامل واجهة برمجة تطبيقات Intlayer
description: حزمة NPM توفر مجموعة تطوير برمجيات (SDK) للتفاعل مع واجهة برمجة تطبيقات Intlayer لتدقيق المحتوى، والمنظمات، والمشاريع، وإدارة المستخدمين.
keywords:
  - intlayer
  - API
  - SDK
  - التكامل
  - تدقيق المحتوى
  - المنظمات
  - المشاريع
  - جافا سكريبت
slugs:
  - doc
  - packages
  - intlayer
  - api
---

# @intlayer/api: حزمة NPM للتفاعل مع واجهة برمجة تطبيقات Intlayer

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. وهي متوافقة مع أُطُر العمل مثل React وExpress.js.

تُعد حزمة **`@intlayer/api`** مجموعة تطوير برمجيات (SDK) للتفاعل مع واجهة برمجة تطبيقات Intlayer. توفر مجموعة من الوظائف لتدقيق إعلان المحتوى، والتفاعل مع المنظمات، والمشاريع، والمستخدمين، وغيرها.

## الاستخدام

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
