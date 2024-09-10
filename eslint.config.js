// Importing the Prettier plugin using ES modules syntax
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Manually include recommended rules
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'eqeqeq': ['error', 'always'],
      'no-implicit-coercion': 'error',
      'no-magic-numbers': ['warn', { ignore: [0, 1] }],

      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
    },
  },
];
