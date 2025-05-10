import { cleandir } from "rollup-plugin-cleandir";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import path from "path";
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

const mode = process.env.MODE ?? 'production';
const distDir = path.resolve(process.cwd(), 'dist');
const srcDir = path.resolve(process.cwd(), 'src');

const entry = process.env.ENTRY ?? 'index.ts';
const entryPath = path.resolve(srcDir, entry);

const bundle = (config) => ({
  ...config,
  input: entryPath,
  external: (id) => /react|openai|mobx|meronex/.test(id),
})

const config = [
  bundle({
    plugins: [
      mode === 'production' && cleandir(),
      esbuild(),
      postcss({
        extensions: ['.scss'],
        extract: true,
        use: ['sass'], // Usa Dart Sass
      }),
      mode === 'production' && terser()
    ].filter(Boolean),
    output: [
      {
        dir: distDir,
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [
      dts(),
      postcss({
        extensions: ['.scss'],
        extract: true,
        use: ['sass'], // Usa Dart Sass
      }),
    ],
    output: {
      dir: distDir,
      format: "es",
      exports: "named",
      preserveModules: true,
      sourcemap: true,
    },
  }),
]

export default config;