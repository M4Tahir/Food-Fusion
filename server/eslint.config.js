import js from "@eslint/js";
import globals from "globals";
import pluginNode from "eslint-plugin-node";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["node_modules/", "dist/", "build/", ".env", "*.log"],
	},

	// Base recommended JavaScript rules
	js.configs.recommended,

	// Node.js + ES module settings
	{
		files: ["**/*.{js,mjs,cjs}"],
		...pluginNode.configs["flat/recommended-module"],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.nodeBuiltin,
			},
		},
		rules: {
			// Core rules
			"no-unused-vars": "warn",
			"no-undef": "warn",
			"no-console": "off",

			// Enforce multi-line curly blocks
			curly: ["error", "all"],
		},
	},

	// Prettier integration
	pluginPrettierRecommended,
]);
