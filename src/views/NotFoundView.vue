<template>
  <div class="not-found container">
    <div class="not-found-content">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在</p>
      <RouterLink to="/" class="back-home">
        <el-button type="primary">返回首页</el-button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.not-found-content {
  text-align: center;
  padding: 40px;
  background: var(--card-background);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.not-found h1 {
  font-size: 6rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0 0 20px;
  line-height: 1;
}

.not-found p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0 0 30px;
}

.back-home {
  text-decoration: none;
}
</style> 