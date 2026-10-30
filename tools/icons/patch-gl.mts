import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

/**
 * ANGLE declares `std::vector<Token>` in Macro.h behind nothing but a forward declaration, which modern
 * libstdc++ refuses to instantiate — `gl` therefore builds on neither gcc 16 nor clang 22 until the real
 * header is pulled in. Runs before the source build, since `icons:setup` installs with --ignore-scripts.
 */
const HEADER = join('angle', 'src', 'compiler', 'preprocessor', 'Macro.h')
const INCLUDE = '#include "Token.h"'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const header = join(rootDir, 'tools', 'icons', 'node_modules', 'gl', HEADER)

if (!existsSync(header)) {
  console.error(`mc-icons: ${header} is missing — install tools/icons before patching it`)
  process.exit(1)
}

const body = readFileSync(header, 'utf8')

if (body.includes(INCLUDE)) console.log('mc-icons: gl is already patched')
else {
  // Token.h includes nothing from pp, so pulling it in earlier cannot cycle
  const patched = body.replace('namespace pp', `${INCLUDE}\n\nnamespace pp`)
  if (patched === body) {
    console.error(`mc-icons: ${HEADER} no longer looks like the file this patch knows — check it by hand`)
    process.exit(1)
  }
  writeFileSync(header, patched)
  console.log(`mc-icons: patched ${HEADER}`)
}
