<template>
  <div class="article-list">
    <template v-if="articles.length > 0">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </template>
    <div v-else class="no-articles">
      暂无文章
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArticleMeta } from '../../types/article'
import ArticleCard from './ArticleCard.vue'

defineProps<{
  articles: ArticleMeta[]
}>()
</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.no-articles {
  text-align: center;
  padding: 40px;
  color: #909399;
  font-size: 1.1rem;
}
</style> 