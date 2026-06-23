---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 函数文档 | vue-intlayer
description: 了解如何使用 vue-intlayer 包中的 usePathname 函数
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 国际化 (Internationalization)
  - 文档 (Documentation)
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "添加 usePathname 实用程序"
  - version: 8.2.0
    date: 2026-06-22
    changes: "初始化历史记录"
author: aymericzip
---

# Vue 集成：`usePathname` 文档

`usePathname` 函数返回当前浏览器的路径名（pathname），并以 Vue `ComputedRef<string>` 的形式提供移除了 locale 片段后的路径名。这对于构建可感知 locale 的导航非常有用——例如，确定哪个导航项处于激活状态——而无需手动移除 locale 前缀。

## 在 Vue 中导入 `usePathname`

```typescript
import { usePathname } from "vue-intlayer";
```

## 概览

`usePathname` 创建一个 Vue 计算引用 (computed ref)，它读取 `window.location.pathname`，通过 `getPathWithoutLocale` 移除 locale 前缀，并且每当浏览器触发 `popstate` 事件（后退/前进导航）时自动更新其值。该值可以直接在你的 Vue 模板或 setup 函数中使用。

## 用法

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## 返回值

| 类型                  | 描述                                                             |
| --------------------- | ---------------------------------------------------------------- |
| `ComputedRef<string>` | Vue Computed Ref，包含不带 locale 前缀的当前路径名（pathname）。 |

## 行为

- **Locale 剥离 (Locale stripping)**：移除路径开头的 locale 片段（例如：`/zh/dashboard` → `/dashboard`）。
- **响应式 (Reactive)**：在每次 `popstate` 事件（浏览器后退 / 前进导航）时更新值。
- **SSR 安全 (SSR-safe)**：当 `window` 不可用时返回 `""`。
- **清理 (Cleanup)**：`popstate` 监听器在初始化时全局添加，由于 Vue 对生命周期的管理，通常不需要在每个组件中手动进行清理。

## 示例

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/settings", label: "设置" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## 相关内容

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vue-intlayer/useLocale.md) — 当前 locale 及其切换器
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) — 此 hook 所使用的底层实用函数
