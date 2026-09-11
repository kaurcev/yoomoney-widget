import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: false,
  minify: false,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom'],

  loader: {
    '.svg': 'dataurl',
    '.woff2': 'file',
  },

  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    };
  },

  onSuccess: async () => {
    const fs = await import('node:fs/promises');
    const content = await fs.readFile('dist/index.js', 'utf-8');
    if (!content.startsWith('"use client"')) {
      await fs.writeFile('dist/index.js', `"use client";\n${content}`);
    }
  },
});
