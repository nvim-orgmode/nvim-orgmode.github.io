import { defineConfig } from 'vitepress'
import fs from 'node:fs'

export default async () => {
  const files: string[] = await fs.promises.readdir('./docs_md')
  const name_maps = {
    index: 'Home',
  }

  const sorting = ['Home', 'Installation', 'Configuration', 'Plugins']

  // https://vitepress.dev/reference/site-config
  return defineConfig({
    title: "Nvim Orgmode",
    description: "Documentation for Nvim Orgmode",
    srcDir: './docs_md',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
      ],

      sidebar: files.filter(file => file.endsWith('.md')).map((file) => {
        const name = file.replace('.md', '')
        let text = name.slice(0, 1).toUpperCase() + name.slice(1)
        text = name_maps[name] || text
        return { text, link: `/${file.replace('.md', '')}` }
      }).sort((a, b) => {
        if (sorting.includes(a.text) && sorting.includes(b.text)) {
          return sorting.indexOf(a.text) - sorting.indexOf(b.text)
        }
        if (sorting.includes(a.text)) return -1
        if (sorting.includes(b.text)) return 1
        return a.text.localeCompare(b.text)
      }),

      socialLinks: [
        { icon: 'github', link: 'https://github.com/nvim-orgmode/orgmode' }
      ],
      outline: {
        level: [2 ,3]
      }
    },
    cleanUrls: true,
    markdown: {
      anchor: {
        slugify: (s: string) => s.replace(/\s/g, '-').replace(/\./g, '').toLowerCase()
      },
    }
  })

}
