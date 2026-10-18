---
trigger: always_on
---

---

description: Nuxt UI 项目核心架构与开发规范
globs: ["**/*.vue", "**/*.ts", "**/*.css", "nuxt.config.ts"]
alwaysApply: true

---

# 项目开发规范 (Nuxt UI)

## 1. 核心目录结构

请严格遵守以下文件路径约定，不要创建默认目录之外的结构：

- **页面目录**: `app/pages`
  - 所有路由页面必须放置在此处。
  - 使用 Nuxt 的自动路由规则。
- **样式目录**: `app/assets/css`
  - 全局样式文件（如 `main.css`）应存放在此。
  - 必须在 `nuxt.config.ts` 中正确引用 css 文件。
- **组件目录**: `app/components` (如果需要创建通用组件)

## 2. 技术栈与框架

- **核心框架**: Nuxt 4 (Vue 3 Composition API)
- **UI 库**: **Nuxt UI** (基于 Headless UI + Tailwind CSS)
- **样式引擎**: Tailwind CSS

## 3. 编码规范

### 组件使用 (Nuxt UI)

- **优先使用 Nuxt UI 组件**：禁止使用原生 HTML 元素编写基础组件。
  - ✅ 正确: `<UButton>`, `<UInput>`, `<UCard>`, `<UContainer>`
  - ❌ 错误: `<button>`, `<input>`, `<div class="card">`
- **图标系统**: 使用 Nuxt UI 内置的图标支持 (例如 `icon="i-heroicons-home"`).

### 脚本规范

- 必须使用 `<script setup lang="ts">` 语法。
- 使用 TypeScript 进行类型定义。
- 数据获取优先使用 `useFetch` 或 `useAsyncData`。

### 样式规范

- 优先使用 Tailwind Utility Class 直接写在 template 中。
- 如果必须编写自定义 CSS，请放入 `app/assets/css` 目录并在组件中引用，或定义在 `<style scoped>` 中。

## 4. 配置检查 (AI 注意事项)

- 在修改样式时，请优先检查 `app.config.ts` 中的 Nuxt UI 主题配置，而不是覆盖 CSS。
- 确保 `nuxt.config.ts` 中 `css` 数组包含了 `~/assets/css/xxx.css`。
