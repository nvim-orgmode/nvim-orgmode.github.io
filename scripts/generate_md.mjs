import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const generateMd = async () => {
  const existingFiles = await fs.promises.readdir(path.resolve(__dirname, '../docs_md'))
  for (const file of existingFiles) {
    if (file.endsWith('.md')) {
      await fs.promises.rm(path.resolve(__dirname, '../docs_md', file), { force: true });
    }
  }

  const files = await fs.promises.readdir(path.resolve(__dirname, '../docs'))
  for await (const file of files) {
    execSync(`pandoc --lua-filter=${__dirname}/pandoc_fix_links.lua -s ${__dirname}/../docs/${file} -o ${__dirname}/../docs_md/${path.parse(file).name}.md -t gfm`)
  }
}

generateMd().then(() => {
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
