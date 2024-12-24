export interface ArticleMeta {
  id: string
  title: string
  date: string
  tags: string[]
  description: string
}

export interface Article extends ArticleMeta {
  content: string
} 