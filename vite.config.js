import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [preact()],
    // Relative paths so the build works both at a domain root and under a
    // GitHub Pages project path like /NEScalculator/
    base: "./",
});
