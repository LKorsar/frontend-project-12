import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  {
		ignores: ["dist/*", "build/*", "/node_modules/*"],
	},
  { 
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  },
  pluginReact.configs.flat.recommended,
]);
