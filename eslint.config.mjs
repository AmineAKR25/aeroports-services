import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // The archived capture is read-only evidence, not application code. Linting
    // it produced 199 errors and 1,408 warnings from 2017-era WordPress
    // JavaScript that must never be modified.
    "reference/**",

    // Design deliverables: standalone styleframes and the map pipeline's
    // Python and JSON. Not part of the application build.
    ".design/**",

    // Vendored agent tooling. Third-party scripts, not this application's code.
    ".agents/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
