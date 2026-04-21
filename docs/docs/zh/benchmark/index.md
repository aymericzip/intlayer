---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: i18n 库基准测试
description: 了解 Intlayer 在性能和打包体积方面与其他 i18n 库的对比情况。
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "初始化基准测试"
---

# Benchmark Bloom — 报告

Benchmark Bloom 是一个性能基准测试套件，旨在衡量 i18n（国际化）库在多个 React 框架和加载策略下的真实影响。

请查看下面各框架的详细报告和技术文档：

- [**Next.js 基准测试报告**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)
- [**TanStack Start 基准测试报告**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)

---

## 当前结果

访问 [**交互式基准测试仪表板**](https://intlayer.org/benchmark) 获取实时对比和汇总数据。
| `scoped-dynamic` | 高（接近零泄漏） | 高 |

从 `static` 转向 `scoped-dynamic` 通常能减少 60-90% 的未使用内容，但需要更多的配置。像 Intlayer 这样的库将 scoped-dynamic 模式自动化，使得开发者无需编写模板代码即可获得高效性能。

### 如何阅读泄漏数值

页面泄漏率为 **35%** 意味着该页面下载的 JavaScript 中有 35% 包含来自其他页面的字符串——即用户在该页面上无法看到的内容。在一个 400 KB 的页面中，这就产生了约 140 KB 可避免的数据。

语言环境泄漏率为 **10%** 意味着打包包中有 10% 包含当前用户未使用语言的翻译。

### 响应性 vs 渲染时间

- **E2E 响应性**：衡量完整的用户体验：网络、框架开销、DOM 更新。
- **React Profiler 时间**：隔离 React 树重新渲染的成本。

如果切换语言涉及网络请求（获取新的语言文件），一个库的 Profiler 时间可能很低，但 E2E 时间却很高。相反，如果一个库能高效地合并更新，即使 Profiler 时间较长，用户感知仍会很快。
