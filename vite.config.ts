import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const generatorScript = path.join(rootDir, "scripts", "generate-tailwind-css.mjs");

function runTailwindGenerator() {
  execFileSync(process.execPath, [generatorScript], { stdio: "inherit" });
}

function generatedTailwindPlugin(): Plugin {
  const watchedExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".html", ".css"]);

  return {
    name: "generated-tailwind-css",
    buildStart() {
      runTailwindGenerator();
    },
    configureServer(server) {
      runTailwindGenerator();

      server.watcher.on("change", (filePath) => {
        if (filePath.endsWith("tailwind.generated.css")) return;
        if (!filePath.includes(`${path.sep}src${path.sep}`)) return;
        if (!watchedExtensions.has(path.extname(filePath))) return;

        runTailwindGenerator();
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), generatedTailwindPlugin()],
});
