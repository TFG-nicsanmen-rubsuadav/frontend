import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import codeCoverageTask from "@cypress/code-coverage/task.js";

export default defineConfig({
  projectId: "7bb3si",
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      on("file:preprocessor", vitePreprocessor());
      return config;
    },
  },
});
