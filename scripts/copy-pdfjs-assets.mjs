// Copies PDF.js runtime assets from the INSTALLED pdfjs-dist package into
// public/pdfjs/, so the decoders always match the pdf.js version in use.
//   wasm/            JPEG2000 (openjpeg), JBIG2, colour management (qcms) decoders
//   iccs/            ICC profiles used when converting some image colour spaces
//   cmaps/           character maps for non-embedded CJK/legacy fonts
//   standard_fonts/  metric-compatible fonts for PDFs that don't embed them
// A mismatch between the wasm files and the pdf.js build is a classic reason
// for embedded images silently vanishing from a canvas render.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(root, 'node_modules', 'pdfjs-dist')
const target = path.join(root, 'public', 'pdfjs')

if (!fs.existsSync(source)) {
  console.warn('pdfjs-dist is not installed yet — run "npm install" first. Existing files in public/pdfjs are left untouched.')
  process.exit(0)
}
const version = JSON.parse(fs.readFileSync(path.join(source, 'package.json'), 'utf8')).version
let copied = 0
for (const dir of ['wasm', 'iccs', 'cmaps', 'standard_fonts']) {
  const from = path.join(source, dir)
  if (!fs.existsSync(from)) { console.warn(`  - pdfjs-dist ${version} has no "${dir}" folder; keeping any existing public/pdfjs/${dir}`); continue }
  fs.cpSync(from, path.join(target, dir), { recursive: true, force: true })
  copied += 1
}
fs.mkdirSync(target, { recursive: true })
fs.writeFileSync(path.join(target, 'VERSION.txt'), `pdfjs-dist ${version}\n`)
console.log(`PDF.js assets synced from pdfjs-dist ${version} (${copied} folders) -> public/pdfjs/`)
