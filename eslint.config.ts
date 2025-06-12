import baseConfig from '@itcode-dev/eslint-config/base';
import importConfig from '@itcode-dev/eslint-config/import';
import reactConfig from '@itcode-dev/eslint-config/react';
import sortKeysFixConfig from '@itcode-dev/eslint-config/sort-keys-fix';
import stylisticConfig from '@itcode-dev/eslint-config/stylistic';
import tseslintConfig from '@itcode-dev/eslint-config/tseslint';
import unusedImportsConfig from '@itcode-dev/eslint-config/unused-imports';
import tseslint from 'typescript-eslint';

import type { ConfigArray } from 'typescript-eslint';

export default [
	baseConfig,
	importConfig,
	reactConfig,
	sortKeysFixConfig,
	stylisticConfig,
	tseslintConfig,
	unusedImportsConfig,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		rules: {
			'no-console': 'off',
			'prefer-destructuring': 'off'
		}
	}
] as ConfigArray;