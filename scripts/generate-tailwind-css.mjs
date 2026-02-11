import { compile } from "tailwindcss";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src");
const outputPath = path.join(srcDir, "tailwind.generated.css");
const tailwindBasePath = path.join(root, "node_modules", "tailwindcss", "index.css");

const FILE_EXT_RE = /\.(tsx?|jsx?|html)$/i;
const TOKEN_RE = /[A-Za-z0-9_!:/.[\]%-]+/g;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function isCandidateToken(token) {
  if (token.length < 2 || token.length > 80) return false;
  if (!/[A-Za-z]/.test(token)) return false;
  if (token.startsWith("http") || token.startsWith("https")) return false;
  return true;
}

async function collectCandidates() {
  const files = (await walk(srcDir)).filter(
    (filePath) => FILE_EXT_RE.test(filePath),
  );

  const candidates = new Set();

  for (const filePath of files) {
    const content = await fs.readFile(filePath, "utf8");
    const tokens = content.match(TOKEN_RE) ?? [];

    for (const token of tokens) {
      if (!isCandidateToken(token)) continue;
      candidates.add(token);
    }
  }

  return [...candidates];
}

async function generateTailwindCss() {
  const baseCss = await fs.readFile(tailwindBasePath, "utf8");
  const sourceCss = `@custom-variant dark (&:is(.dark *));\n${baseCss}`;
  const candidates = await collectCandidates();
  const compiler = await compile(sourceCss, {
    from: path.join(srcDir, "tailwind.source.css"),
    base: root,
  });
  const css = compiler.build(candidates);

  await fs.writeFile(outputPath, css, "utf8");
  console.log(`Generated ${path.relative(root, outputPath)} with ${candidates.length} candidates.`);
}

generateTailwindCss().catch((error) => {
  console.error(error);
  process.exit(1);
});