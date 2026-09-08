import { execSync } from 'node:child_process'
import { rmSync, existsSync } from 'node:fs'

/**
 * Publishes ./dist to the gh-pages branch.
 * `npm run deploy` rebuilds first, so this always ships current output.
 * The dist folder gets its own throwaway git repo — the source history on
 * main stays clean and unrelated to the built artefacts.
 */
const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim()
if (!remote) throw new Error('No git remote named "origin".')

if (!existsSync('dist/index.html')) throw new Error('dist/ is empty — run the build first.')

rmSync('dist/.git', { recursive: true, force: true })
const run = (cmd) => execSync(cmd, { cwd: 'dist', stdio: 'inherit' })

run('git init -q -b gh-pages')
run('git add -A')
run('git -c user.name="deploy" -c user.email="deploy@local" commit -q -m "Deploy ARVÉRA demo"')
run(`git remote add origin ${remote}`)
run('git push -f -q origin gh-pages')
rmSync('dist/.git', { recursive: true, force: true })

console.log('\nDeployed dist/ to the gh-pages branch.')
