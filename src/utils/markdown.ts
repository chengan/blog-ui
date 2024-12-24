import MarkdownIt from 'markdown-it'
import type { Article, ArticleMeta } from '../types/article'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

function parseFrontMatter(content: string): { attributes: Record<string, any>; body: string } {
  if (typeof content !== 'string') {
    console.error('Invalid content type:', typeof content)
    throw new Error('Content must be a string')
  }

  console.log('Parsing front matter from content:', content.substring(0, 100))
  const lines = content.trim().split('\n')
  const frontMatterLines: string[] = []
  let isInFrontMatter = false
  let bodyStartIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line === '---') {
      if (!isInFrontMatter) {
        isInFrontMatter = true
        continue
      } else {
        bodyStartIndex = i + 1
        break
      }
    }
    if (isInFrontMatter && line) {
      frontMatterLines.push(line)
    }
  }

  const attributes: Record<string, any> = {}
  frontMatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(':').map(part => part.trim())
    if (key) {
      const value = valueParts.join(':').trim()
      if (key === 'tags') {
        // 解析标签数组
        attributes[key] = value
          .replace(/[\[\]"']/g, '')
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean)
      } else {
        attributes[key] = value
      }
    }
  })

  const body = lines.slice(bodyStartIndex).join('\n').trim()
  console.log('Parsed attributes:', attributes)
  console.log('Body starts with:', body.substring(0, 100))
  return { attributes, body }
}

export function parseArticle(content: string): Article {
  if (typeof content !== 'string') {
    throw new Error('Content must be a string')
  }
  const { attributes, body } = parseFrontMatter(content)
  return {
    ...(attributes as ArticleMeta),
    content: md.render(body)
  }
}

export function parseArticleMeta(content: string): ArticleMeta {
  if (typeof content !== 'string') {
    throw new Error('Content must be a string')
  }
  const { attributes } = parseFrontMatter(content)
  return attributes as ArticleMeta
} 