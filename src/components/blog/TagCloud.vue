<template>
  <div class="tag-cloud">
    <RouterLink
      v-for="tag in tags"
      :key="tag"
      :to="{ name: 'tag', params: { tag } }"
      class="tag"
    >
      {{ tag }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  tags: string[]
}>()
</script>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  background: var(--background-light);
  color: var(--text-secondary);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid var(--border-color);
}

.tag:hover {
  background: var(--primary-color);
  color: var(--background-dark);
  transform: translateY(-2px);
  border-color: var(--primary-color);
}
</style> 