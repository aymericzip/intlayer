# @intlayer/api: حزمة NPM للتفاعل مع واجهة برمجة التطبيقات لـ Intlayer

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري JavaScript. إنها متوافقة مع أطر العمل مثل React و Express.js.

حزمة **`@intlayer/api`** هي مجموعة أدوات تطوير البرمجيات (SDK) للتفاعل مع واجهة برمجة التطبيقات لـ Intlayer. توفر مجموعة من الوظائف لمراجعة إعلان المحتوى، والتفاعل مع المنظمات، والمشاريع، والمستخدمين، وما إلى ذلك.

## الاستخدام

```ts
import { intlayerAPI } from "@intlayer/api";

// الحصول على واجهة برمجة التطبيقات للمستخدم
intlayerAPI.user.getUserAPI({
  ids: ["user-id-1", "user-id-2"],
});
```

## التثبيت

قم بتثبيت الحزمة الضرورية باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
