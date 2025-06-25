# @intlayer/api: حزمة NPM للتفاعل مع واجهة برمجة تطبيقات Intlayer

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وExpress.js.

حزمة **`@intlayer/api`** هي SDK (مجموعة تطوير البرمجيات) للتفاعل مع واجهة برمجة تطبيقات Intlayer. توفر مجموعة من الوظائف لتدقيق إعلان المحتوى، والتفاعل مع المنظمات، والمشاريع، والمستخدمين، إلخ.

## الاستخدام

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"], // معرفات المستخدمين
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
