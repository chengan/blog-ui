import { defineStore } from 'pinia'
import type { Article, ArticleMeta } from '../types/article'
import { parseArticle, parseArticleMeta } from '../utils/markdown'

// 导入所有文章
const articleFiles = import.meta.glob('/src/posts/*.md', { 
  eager: true,
  query: '?raw',
  import: 'default'
})

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [] as ArticleMeta[],
    currentArticle: null as Article | null,
    tags: new Set<string>()
  }),
  
  getters: {
    getArticlesByTag: (state) => {
      return (tag: string) => state.articles.filter(article => article.tags.includes(tag))
    }
  },
  
  actions: {
    async fetchArticles() {
      try {
        console.log('Fetching articles...')
        console.log('Article files:', articleFiles)
        
        const articles: ArticleMeta[] = []
        const tags = new Set<string>()

        // 解析每篇文章的元数据
        for (const [path, content] of Object.entries(articleFiles)) {
          console.log('Processing file:', path)
          console.log('Content type:', typeof content)
          // 从路径中提取文件名作为 ID
          const id = path.split('/').pop()?.replace('.md', '') || ''
          const meta = parseArticleMeta(content as string)
          articles.push({ ...meta, id })
          meta.tags.forEach(tag => tags.add(tag))
        }

        // 按日期排序，最新的在前面
        this.articles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        this.tags = tags
        console.log('Fetched articles:', this.articles)
        console.log('Tags:', this.tags)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      }
    },
    
    async fetchArticleById(id: string) {
      try {
        const filePath = `/src/posts/${id}.md`
        if (filePath in articleFiles) {
          const content = articleFiles[filePath] as string
          this.currentArticle = { ...parseArticle(content), id }
        } else {
          throw new Error('Article not found')
        }
      } catch (error) {
        console.error('Failed to fetch article:', error)
        this.currentArticle = null
      }
    }
  }
}) 