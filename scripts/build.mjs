import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output);

// Publish runtime files only; reports, prompts and source masters stay private
// to the checkout/repository instead of becoming routes on the live website.
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && (/\.(html|css)$/.test(entry.name) || entry.name === 'app.js')) {
    await cp(path.join(root, entry.name), path.join(output, entry.name));
  }
}
await cp(path.join(root, 'assets'), path.join(output, 'assets'), {
  recursive: true,
  filter: (source) => path.basename(source) !== 'manifest.json',
});
console.log('Static website built in dist/.');
