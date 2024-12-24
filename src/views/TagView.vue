<template>
  <div class="tag-view container">
    <div class="tag-layout">
      <div class="tag-sidebar-wrapper">
        <div class="tag-sidebar">
          <h2>标签列表</h2>
          <div class="tag-list">
            <el-tag
              v-for="tag in Array.from(articleStore.tags)"
              :key="tag"
              :class="{ active: currentTag === tag }"
              @click="selectTag(tag)"
              class="tag-item"
              effect="plain"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
      <div class="tag-content-wrapper">
        <div class="tag-content">
          <h2 class="section-title">
            {{ currentTag ? `${currentTag}相关文章` : '所有文章' }}
          </h2>
          <div v-if="loading" class="loading-state">
            <el-skeleton :rows="3" animated />
          </div>
          <template v-else>
            <ArticleList :articles="tagArticles" />
            <div v-if="tagArticles.length === 0" class="no-articles">
              该标签下暂无文章
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article'
import ArticleList from '../components/blog/ArticleList.vue'
import { ElRow, ElCol, ElTag, ElSkeleton } from 'element-plus'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const currentTag = ref(route.params.tag as string || '')
const loading = ref(false)
let isUnmounted = false

const tagArticles = computed(() => {
  if (!currentTag.value) {
    return articleStore.articles
  }
  return articleStore.articles.filter(article => 
    article.tags.includes(currentTag.value)
  )
})

const selectTag = async (tag: string) => {
  if (currentTag.value === tag) {
    currentTag.value = ''
    await router.push({ name: 'tag' })
  } else {
    currentTag.value = tag
    await router.push({
      name: 'tag',
      params: { tag }
    })
  }
}

const fetchData = async () => {
  if (isUnmounted) return
  
  try {
    loading.value = true
    if (articleStore.articles.length === 0) {
      await articleStore.fetchArticles()
    }
  } catch (error) {
    console.error('Failed to fetch articles:', error)
  } finally {
    if (!isUnmounted) {
      loading.value = false
    }
  }
}

onMounted(() => {
  fetchData()
})

onUnmounted(() => {
  isUnmounted = true
})
</script>

<style scoped>
.tag-view {
  padding: 20px 0;
  min-height: calc(100vh - var(--header-height) - 40px);
}

.tag-layout {
  display: flex;
  gap: 20px;
  width: 100%;
}

.tag-sidebar-wrapper {
  width: 240px;
  flex-shrink: 0;
}

.tag-content-wrapper {
  flex: 1;
  min-width: 0;
}

.tag-sidebar {
  background: var(--card-background);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
  position: sticky;
  top: calc(var(--header-height) + 20px);
}

.tag-sidebar h2 {
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.tag-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--background-light);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  font-size: 0.95rem;
}

.tag-item:hover {
  transform: translateX(5px);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.tag-item.active {
  background: var(--primary-color);
  color: var(--background-dark);
  border-color: var(--primary-color);
}

.tag-content {
  background: var(--card-background);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-color);
}

.section-title {
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
}

.loading-state {
  padding: 20px;
}

.no-articles {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary);
  font-size: 1.1rem;
  background: var(--background-light);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-top: 20px;
}

@media (max-width: 768px) {
  .tag-view {
    padding: 10px;
  }

  .tag-layout {
    gap: 10px;
  }

  .tag-sidebar-wrapper {
    width: 180px;
  }

  .tag-sidebar, .tag-content {
    padding: 15px;
  }

  .tag-sidebar h2, .section-title {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  .tag-item {
    padding: 6px 10px;
    font-size: 0.85rem;
  }

  .no-articles {
    padding: 20px;
    font-size: 0.9rem;
  }
}
</style> 