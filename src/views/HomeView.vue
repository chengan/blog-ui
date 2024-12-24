<template>
  <div class="home container">
    <div class="content">
      <section class="latest-articles">
        <div class="section-header">
          <h1 class="section-title">最新文章</h1>
          <div class="section-divider"></div>
        </div>
        <ArticleList :articles="articleStore.articles" />
      </section>
    </div>
    <aside class="sidebar">
      <div class="sidebar-section about-me">
        <h2 class="sidebar-title">关于我</h2>
        <div class="avatar">
          <el-avatar :size="120" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
        <p class="bio">专注于AI编程领域的技术分享</p>
        <div class="social-links">
          <a href="https://github.com" target="_blank" title="GitHub" class="social-link">
            <el-icon><svg t="1703404362661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4254" width="24" height="24"><path d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" fill="currentColor" p-id="4255"></path></svg></el-icon>
          </a>
          <a href="https://twitter.com" target="_blank" title="Twitter" class="social-link">
            <el-icon><svg t="1703404394456" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5359" width="24" height="24"><path d="M919.759462 318.994613c0.631595-8.810595 0.947607-17.684405 0.947607-26.558215 0-8.810595-0.316012-17.621405-0.947607-26.432-1.895215-31.806577-7.580405-63.613155-17.621405-94.261559-10.041005-30.648372-24.157384-59.506577-41.847577-86.065166-17.621405-26.558589-38.678577-50.063779-62.665548-69.983779-23.986971-19.983785-50.695374-35.509578-79.011768-46.270577-28.316394-10.761-58.243768-16.168798-89.234166-16.168798-30.990398 0-60.917772 5.407798-89.234166 16.168798-28.316394 10.761-55.024797 26.286793-79.011768 46.270577-23.986971 19.92-45.044144 43.425189-62.665548 69.983779-17.690193 26.558589-31.806577 55.416794-41.847577 86.065166-10.041 30.648404-15.726189 62.454982-17.621405 94.261559-0.631595 8.810595-0.947607 17.621405-0.947607 26.432 0 8.873595 0.316012 17.747405 0.947607 26.558215 1.895215 31.806577 7.580405 63.613155 17.621405 94.261559 10.041 30.648372 24.157384 59.506577 41.847577 86.065166 17.621405 26.558589 38.678577 50.063779 62.665548 69.983779 23.986971 19.983785 50.695374 35.509578 79.011768 46.270577 28.316394 10.761 58.243768 16.168798 89.234166 16.168798 30.990398 0 60.917772-5.407798 89.234166-16.168798 28.316394-10.761 55.024797-26.286793 79.011768-46.270577 23.986971-19.92 45.044144-43.425189 62.665548-69.983779 17.690193-26.558589 31.806577-55.416794 41.847577-86.065166C912.179057 382.607768 917.864246 350.80119 919.759462 318.994613L919.759462 318.994613zM512.631595 761.071781c-137.265166 0-248.709166-111.444-248.709166-248.709166s111.444-248.709166 248.709166-248.709166 248.709166 111.444 248.709166 248.709166S649.896761 761.071781 512.631595 761.071781L512.631595 761.071781zM512.631595 761.071781" fill="currentColor" p-id="5360"></path></svg></el-icon>
          </a>
        </div>
      </div>
      <div class="sidebar-section tag-cloud">
        <h2 class="sidebar-title">标签云</h2>
        <TagCloud :tags="Array.from(articleStore.tags)" />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useArticleStore } from '../stores/article'
import ArticleList from '../components/blog/ArticleList.vue'
import TagCloud from '../components/blog/TagCloud.vue'

const articleStore = useArticleStore()

onMounted(async () => {
  console.log('HomeView mounted')
  await articleStore.fetchArticles()
  console.log('Articles loaded:', articleStore.articles)
  console.log('Tags:', articleStore.tags)
})
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  padding: 40px 0;
}

.content {
  min-width: 0;
}

.section-header {
  margin-bottom: 32px;
  position: relative;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  padding-bottom: 16px;
}

.section-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

.sidebar {
  position: sticky;
  top: calc(var(--header-height) + 40px);
  height: fit-content;
}

.sidebar-section {
  background: var(--card-background);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 20px 0;
}

.about-me {
  text-align: center;
}

.avatar {
  margin: 0 auto 20px;
}

.bio {
  color: var(--text-secondary);
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-link {
  color: var(--text-secondary);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--background-light);
  border: 1px solid var(--border-color);
}

.social-link:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .home {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none;
  }
}
</style> 