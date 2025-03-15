import { build } from "esbuild";

await build({
  entryPoints: ["lib/index.tsx"],
  mangleProps: /^res$|^rej$|^next$/,
  format: "esm",
  outfile: "./dist/index.js",
});

await build({
  entryPoints: ["lib/index.tsx"],
  minify: true,
  mangleProps: /^res$|^rej$|^next$/,
  format: "esm",
  outfile: "./dist/index.min.js",
});

await build({
  entryPoints: ["lib/index.tsx"],
  mangleProps: /^res$|^rej$|^next$/,
  format: "cjs",
  outfile: "./dist/index.cjs",
});
