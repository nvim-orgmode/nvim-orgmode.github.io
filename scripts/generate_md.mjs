import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const generateMd = async () => {
  const files = fs.readdirSync(path.resolve(__dirname, '../docs'))
  fs.mkdirSync(path.resolve(__dirname, '../docs_md'))
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
