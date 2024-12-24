<template>
  <RouterLink :to="{ name: 'article', params: { id: article.id }}" class="article-card">
    <article class="card-content">
      <header class="card-header">
        <h2 class="card-title">{{ article.title }}</h2>
        <time class="card-date">{{ formatDate(article.date) }}</time>
      </header>
      <p class="card-description">{{ article.description }}</p>
      <footer class="card-footer">
        <div class="tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <span class="read-more">阅读全文 <el-icon><ArrowRight /></el-icon></span>
      </footer>
    </article>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ArticleMeta } from '@/types/article'
import { ArrowRight } from '@element-plus/icons-vue'

defineProps<{
  article: ArticleMeta
}>()

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-card {
  display: block;
  background: var(--card-background);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-primary);
}

.article-card:hover {
  transform: translateY(-2px);
  background: var(--card-hover);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

.card-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  white-space: nowrap;
}

.card-description {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: var(--background-light);
  color: var(--primary-color);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.tag:hover {
  background: var(--primary-color);
  color: var(--background-dark);
}

.read-more {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--primary-color);
  font-weight: 500;
  transition: all 0.3s ease;
}

.read-more:hover {
  gap: 8px;
}

.el-icon {
  transition: transform 0.3s ease;
}

.article-card:hover .read-more .el-icon {
  transform: translateX(4px);
}
</style> 