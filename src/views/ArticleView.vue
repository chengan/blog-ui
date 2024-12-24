<template>
  <div class="article-view container">
    <Transition name="fade" appear>
      <article v-if="articleStore.currentArticle" class="article-content">
        <header class="article-header">
          <h1 class="article-title">{{ articleStore.currentArticle.title }}</h1>
          <div class="article-meta">
            <time :datetime="articleStore.currentArticle.date" class="article-date">
              {{ formatDate(articleStore.currentArticle.date) }}
            </time>
            <div class="article-tags">
              <RouterLink
                v-for="tag in articleStore.currentArticle.tags"
                :key="tag"
                :to="{ name: 'tag', params: { tag }}"
                class="tag"
              >
                {{ tag }}
              </RouterLink>
            </div>
          </div>
        </header>
        <div class="article-body markdown-content" v-html="articleStore.currentArticle.content"></div>
        <footer class="article-footer">
          <div class="article-navigation">
            <RouterLink to="/" class="nav-link">
              <el-icon><ArrowLeft /></el-icon>
              返回首页
            </RouterLink>
          </div>
        </footer>
      </article>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/article'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const articleStore = useArticleStore()

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  const id = route.params.id as string
  await articleStore.fetchArticleById(id)
})
</script>

<style scoped>
.article-view {
  padding: 40px 0;
  max-width: 900px;
}

.article-content {
  background: var(--card-background);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.article-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--text-secondary);
}

.article-date {
  font-size: 0.95rem;
}

.article-tags {
  display: flex;
  gap: 12px;
}

.tag {
  background: var(--background-light);
  color: var(--primary-color);
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.tag:hover {
  background: var(--primary-color);
  color: var(--background-dark);
  transform: translateY(-2px);
  border-color: var(--primary-color);
}

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.article-footer {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.article-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link:hover {
  transform: translateX(-4px);
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .article-view {
    padding: 20px 0;
  }

  .article-content {
    padding: 24px;
  }

  .article-title {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>

<style>
/* Markdown 内容样式 */
.markdown-content {
  color: var(--text-primary);
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  color: var(--text-primary);
  margin: 2em 0 1em;
  line-height: 1.3;
}

.markdown-content h1 {
  font-size: 2rem;
}

.markdown-content h2 {
  font-size: 1.75rem;
}

.markdown-content h3 {
  font-size: 1.5rem;
}

.markdown-content p {
  margin: 1.2em 0;
}

.markdown-content a {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px dashed var(--primary-color);
  transition: all 0.3s ease;
}

.markdown-content a:hover {
  border-bottom-style: solid;
}

.markdown-content img {
  max-width: 100%;
  border-radius: 8px;
  margin: 2em 0;
}

.markdown-content pre {
  background: var(--background-light);
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5em 0;
  border: 1px solid var(--border-color);
}

.markdown-content code {
  background: var(--background-light);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  border: 1px solid var(--border-color);
}

.markdown-content pre code {
  background: none;
  padding: 0;
  border: none;
}

.markdown-content blockquote {
  margin: 2em 0;
  padding: 1em 1.5em;
  border-left: 4px solid var(--primary-color);
  background: var(--background-light);
  border-radius: 0 8px 8px 0;
}

.markdown-content blockquote p {
  margin: 0;
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 1.5em;
  margin: 1.2em 0;
}

.markdown-content li {
  margin: 0.5em 0;
}

.markdown-content hr {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 2em 0;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 2em 0;
}

.markdown-content th,
.markdown-content td {
  padding: 12px;
  border: 1px solid var(--border-color);
  text-align: left;
}

.markdown-content th {
  background: var(--background-light);
  font-weight: 600;
}

.markdown-content tr:nth-child(even) {
  background: var(--background-light);
}
</style> 