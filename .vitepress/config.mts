import { defineConfig } from 'vitepress'
import fs from 'node:fs'

export default async () => {
  const files: string[] = await fs.promises.readdir('./docs_md')

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
        const text = name.slice(0, 1).toUpperCase() + name.slice(1)
        return { text, link: `/${file.replace('.md', '')}` }
      }),

      socialLinks: [
        { icon: 'github', link: 'https://github.com/nvim-orgmode/orgmode' }
      ]
    },
    cleanUrls: true,
  })

}
