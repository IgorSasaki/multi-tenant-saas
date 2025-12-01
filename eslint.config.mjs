// eslint.config.mjs
import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import importHelpersPlugin from "eslint-plugin-import-helpers";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import svgJsxPlugin from "eslint-plugin-svg-jsx";
import nextPlugin from "@next/eslint-plugin-next";
import { fixupConfigRules } from "@eslint/compat";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "camelcase": "off",
      "space-before-function-paren": "off",
    },
  },

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  {
    plugins: {
      "import-helpers": importHelpersPlugin,
    },
    rules: {
      "import-helpers/order-imports": [
        "warn",
        {
          "newlinesBetween": "always",
          "groups": [
            ["module", "/^@ant/", "/^@fullstory/"],
            "/^@/",
            ["parent", "sibling", "index"]
          ],
          "alphabetize": { "order": "asc", "ignoreCase": true }
        }
      ],
      "sort-imports": "off",
    },
  },

  {
    plugins: {
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "none",
          "argsIgnorePattern": "^_"
        }
      ],
    },
  },

  {
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      "perfectionist/sort-interfaces": "error",
      "perfectionist/sort-jsx-props": [
        "error",
        {
          "type": "natural",
          "order": "asc",
          "groups": ["multiline", "unknown", "shorthand"]
        }
      ],
    },
  },

  {
    plugins: {
      "svg-jsx": svgJsxPlugin,
    },
    rules: {
      "svg-jsx/camel-case-dash": "error",
      "svg-jsx/camel-case-colon": "error",
      "svg-jsx/no-style-string": "error",
    },
  },

  {
    rules: {
      "no-useless-constructor": "off",
      "no-use-before-define": "off",
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "none",
          "argsIgnorePattern": "^_"
        }
      ],
    },
  },

  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/",
      "dist/",
      "coverage/",
    ],
  },
];
