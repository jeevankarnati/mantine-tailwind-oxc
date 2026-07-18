import { oxlintConfig } from "@narthia/toolkit/oxc-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [oxlintConfig],
  ignorePatterns: [".agents/**", ".husky/**"],
});
