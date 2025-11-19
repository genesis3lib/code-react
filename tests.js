/**
 * Genesis3 Module Test Configuration
 *
 * This file defines test scenarios for the React module.
 * Genesis3 uses this to validate module functionality.
 */

module.exports = {
  moduleId: 'code-react',
  moduleName: 'React with Vite',

  scenarios: [
    {
      name: 'react-ts-vite',
      description: 'React 18 with TypeScript and Vite',
      config: {
        moduleId: 'react-ts-18',
        kind: 'code',
        type: 'react',
        layers: ['frontend'],
        enabled: true,
        fieldValues: {
          reactVersion: '18',
          useTypeScript: true,
          buildTool: 'vite'
        }
      },
      envConfigs: [
        {
          modules: ['react-ts-18'],
          key: 'VITE_API_URL',
          values: [
            { default: 'http://localhost:8080' },
            { dev: 'http://localhost:8080' },
            { staging: 'https://api-staging.grabl.in' },
            { prod: 'https://api.grabl.in' }
          ],
          isSecret: false
        },
        {
          modules: ['react-ts-18'],
          key: 'VITE_APP_TITLE',
          values: [
            { default: 'My App' },
            { dev: 'My App (Dev)' },
            { staging: 'My App (Staging)' },
            { prod: 'My App' }
          ],
          isSecret: false
        }
      ],
      expectedFiles: [
        'frontend/package.json',
        'frontend/vite.config.ts',
        'frontend/tsconfig.json',
        'frontend/tsconfig.node.json',
        'frontend/index.html',
        'frontend/.env',
        'frontend/.env.dev',
        'frontend/.env.staging',
        'frontend/.env.prod',
        'frontend/src/main.tsx',
        'frontend/src/App.tsx',
        'frontend/.nvmrc',
        'frontend/README.md'
      ],
      forbiddenFiles: [
        'frontend/.env.example',
        'frontend/application.yaml',
        'frontend/vite.config.js',
        'frontend/src/main.jsx'
      ],
      validations: [
        {
          file: 'frontend/.env',
          contains: ['VITE_API_URL=http://localhost:8080', 'VITE_APP_TITLE=My App']
        },
        {
          file: 'frontend/.env.dev',
          contains: ['VITE_API_URL=http://localhost:8080', 'VITE_APP_TITLE=My App (Dev)']
        },
        {
          file: 'frontend/.env.prod',
          contains: ['VITE_API_URL=https://api.grabl.in', 'VITE_APP_TITLE=My App']
        },
        {
          file: 'frontend/package.json',
          contains: [
            'react',
            'vite',
            'typescript',
            'axios',
            'tailwindcss',
            'lucide-react',
            'react-redux',
            'tailwind-merge',
            '@tailwindcss/vite',
            '@reduxjs/toolkit',
            'autoprefixer',
            'postcss'
          ]
        },
        {
          file: 'frontend/vite.config.ts',
          contains: ['defineConfig', 'react']
        },
        {
          file: 'frontend/.nvmrc',
          contains: ['lts/*']
        },
        {
          file: 'frontend/README.md',
          contains: [
            'shadcn/ui',
            'npx shadcn@latest add',
            'https://ui.shadcn.com/docs/components',
            'https://ui.shadcn.com/docs/cli',
            'axios',
            'Redux Toolkit',
            'Tailwind CSS'
          ]
        }
      ]
    },
    {
      name: 'react-js-vite',
      description: 'React 18 with JavaScript (no TypeScript)',
      config: {
        moduleId: 'react-js-18',
        kind: 'code',
        type: 'react',
        layers: ['frontend'],
        enabled: true,
        fieldValues: {
          reactVersion: '18',
          useTypeScript: false,
          buildTool: 'vite'
        }
      },
      envConfigs: [
        {
          modules: ['react-js-18'],
          key: 'VITE_API_URL',
          values: [
            { default: 'http://localhost:3000' },
            { dev: 'http://localhost:3000' },
            { prod: 'https://api.example.com' }
          ],
          isSecret: false
        }
      ],
      expectedFiles: [
        'frontend/package.json',
        'frontend/vite.config.js',
        'frontend/index.html',
        'frontend/.env',
        'frontend/.env.dev',
        'frontend/.env.prod',
        'frontend/src/main.jsx',
        'frontend/src/App.jsx',
        'frontend/.nvmrc',
        'frontend/README.md'
      ],
      forbiddenFiles: [
        'frontend/vite.config.ts',
        'frontend/tsconfig.json',
        'frontend/src/main.tsx'
      ],
      validations: [
        {
          file: 'frontend/vite.config.js',
          contains: ['defineConfig']
        },
        {
          file: 'frontend/package.json',
          contains: ['react', 'vite', 'axios', 'tailwindcss', 'lucide-react'],
          notContains: ['typescript', '@types/react']
        },
        {
          file: 'frontend/.nvmrc',
          contains: ['lts/*']
        },
        {
          file: 'frontend/README.md',
          contains: ['shadcn/ui', 'https://ui.shadcn.com/docs/components']
        }
      ]
    },
    {
      name: 'react-minimal',
      description: 'React with minimal env config',
      config: {
        moduleId: 'react-minimal',
        kind: 'code',
        type: 'react',
        layers: ['frontend'],
        enabled: true,
        fieldValues: {
          reactVersion: '18',
          useTypeScript: true,
          buildTool: 'vite'
        }
      },
      envConfigs: [],
      expectedFiles: [
        'frontend/package.json',
        'frontend/vite.config.ts',
        'frontend/.env',
        'frontend/.nvmrc',
        'frontend/README.md'
      ],
      validations: [
        {
          file: 'frontend/.env',
          contains: ['VITE_APP_NAME=', 'VITE_API_BASE=']
        },
        {
          file: 'frontend/.nvmrc',
          contains: ['lts/*']
        },
        {
          file: 'frontend/README.md',
          contains: ['shadcn/ui']
        }
      ]
    },
    {
      name: 'react-multi-env-vars',
      description: 'React with multiple environment variables',
      config: {
        moduleId: 'react-multi-env',
        kind: 'code',
        type: 'react',
        layers: ['frontend'],
        enabled: true,
        fieldValues: {
          reactVersion: '18',
          useTypeScript: true,
          buildTool: 'vite'
        }
      },
      envConfigs: [
        {
          modules: ['react-multi-env'],
          key: 'VITE_API_URL',
          values: [
            { default: 'http://localhost:8080' },
            { dev: 'http://localhost:8080' },
            { prod: 'https://api.prod.com' }
          ],
          isSecret: false
        },
        {
          modules: ['react-multi-env'],
          key: 'VITE_ANALYTICS_ID',
          values: [
            { dev: 'DEV-123' },
            { prod: 'PROD-456' }
          ],
          isSecret: false
        },
        {
          modules: ['react-multi-env'],
          key: 'VITE_FEATURE_FLAGS',
          values: [
            { dev: 'all-features' },
            { prod: 'stable-only' }
          ],
          isSecret: false
        }
      ],
      expectedFiles: [
        'frontend/.env',
        'frontend/.env.dev',
        'frontend/.env.prod',
        'frontend/.nvmrc',
        'frontend/README.md'
      ],
      validations: [
        {
          file: 'frontend/.env.dev',
          contains: [
            'VITE_API_URL=http://localhost:8080',
            'VITE_ANALYTICS_ID=DEV-123',
            'VITE_FEATURE_FLAGS=all-features'
          ]
        },
        {
          file: 'frontend/.env.prod',
          contains: [
            'VITE_API_URL=https://api.prod.com',
            'VITE_ANALYTICS_ID=PROD-456',
            'VITE_FEATURE_FLAGS=stable-only'
          ]
        },
        {
          file: 'frontend/.nvmrc',
          contains: ['lts/*']
        },
        {
          file: 'frontend/README.md',
          contains: ['shadcn/ui', 'npx shadcn@latest add']
        }
      ]
    }
  ]
};
