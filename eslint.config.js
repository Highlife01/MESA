import js from '@eslint/js';

export default [
  { ignores: ['node_modules/**', 'dist/**', '.firebase/**', 'tmp/**', 'artifacts/**'] },
  {
    files: ['src/**/*.{js,jsx}', 'scripts/**/*.js', '*config.js', 'tests/**/*.{js,jsx}', 'public/sw.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: Object.fromEntries([
        'window', 'document', 'navigator', 'localStorage', 'sessionStorage',
        'console', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval',
        'URL', 'URLSearchParams', 'Event', 'CustomEvent', 'Blob', 'Image', 'FileReader',
        'IntersectionObserver', 'ResizeObserver', 'requestAnimationFrame', 'cancelAnimationFrame',
        'alert', 'confirm', 'prompt', 'fetch', 'crypto', 'performance', 'process', 'Buffer',
        'self', 'caches', 'Response', 'global', 'HTMLElement',
      ].map(name => [name, 'readonly'])),
    },
    rules: { ...js.configs.recommended.rules, 'no-unused-vars': 'off' },
  },
];
