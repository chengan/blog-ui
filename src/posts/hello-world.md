---
title: Hello World
date: 2024-01-01
tags: ["Vue", "TypeScript"]
description: 这是我的第一篇博客文章，介绍了如何使用 Vue 3 和 TypeScript 搭建个人博客。
---

# Hello World

欢迎来到我的个人技术博客！这是第一篇文章，主要介绍如何使用 Vue 3 和 TypeScript 搭建一个现代化的个人博客系统。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Element Plus
- Markdown-it

## 主要功能

1. Markdown 文章支持
2. 代码高亮
3. 文章分类
4. 响应式设计

## 代码示例

```typescript
interface Article {
  id: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  content: string;
}

// 文章解析函数
function parseArticle(content: string): Article {
  const { attributes, body } = frontMatter(content);
  return {
    ...(attributes as ArticleMeta),
    content: md.render(body),
  };
}
```

## 下一步计划

1. 添加评论功能
2. 优化 SEO
3. 添加文章目录
4. 支持暗色模式
