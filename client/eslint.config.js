import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			...pluginQuery.configs['flat/recommended'],
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react-hooks/rules-of-hooks': 'warn',
			'react-hooks/exhaustive-deps': 'warn',
			'no-unused-vars': 'warn', // Warn for unused variables
			// 'no-unused-const': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn', // Warn for unused variables
			'no-undef': 'error', // Error for undefined variables
			eqeqeq: ['warn', 'always'], // Enforce strict equality
			'no-console': 'off', // Allow console statements
			'react/prop-types': 'off', // Not needed with TypeScript
		},
	},
);
