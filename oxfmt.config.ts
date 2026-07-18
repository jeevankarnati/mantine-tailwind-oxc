import { oxfmtConfig } from "@narthia/toolkit/oxc-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...oxfmtConfig,
  ignorePatterns: [".agents/**", ".husky/**"],
  sortTailwindcss: {
    stylesheet: "./src/index.css",
    functions: ["clsx", "cn"],
    preserveWhitespace: false,
  },
});
