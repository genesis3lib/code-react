# React Frontend

This module creates a modern React application with TypeScript and Vite. React is a popular JavaScript library for building user interfaces.

## What This Creates

A React application with:
- React 19 with hooks
- TypeScript (or JavaScript)
- Vite (fast build tool)
- Tailwind CSS for styling
- Redux Toolkit for state management
- Axios for API calls

---

## Configuration Fields

### React Version `reactVersion`
**What it is**: The version of the React library.

**Options**:
- `18` - Previous stable version
- `19` - Latest version with new features (recommended)

**When to choose**:

**React 19** (recommended):
- New projects
- Want latest features (improved hooks, better performance)
- Future-proof your app

**React 18**:
- Need compatibility with older libraries
- Existing project uses React 18
- Some dependencies not yet React 19 compatible

**Note**: React 19 is recommended for all new projects.

---

### Use TypeScript `useTypeScript`
**What it is**: Whether to use TypeScript instead of JavaScript.

**Options**:
- `true` - Use TypeScript (recommended)
- `false` - Use plain JavaScript

**When to choose**:

**TypeScript (true)** - Recommended:
- Catch errors before runtime
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Easier to maintain large projects
- Industry standard for professional projects

**JavaScript (false)**:
- Simpler, less to learn
- Faster initial development for small projects
- No type definitions needed
- Good for prototypes or very small apps

**If unsure**: Choose TypeScript. Modern development strongly favors it.

**What's the difference**:
```typescript
// TypeScript - catches errors at compile time
function greet(name: string): string {
  return `Hello, ${name}`;
}
greet(123);  // ERROR: number is not assignable to string

// JavaScript - errors only appear at runtime
function greet(name) {
  return `Hello, ${name}`;
}
greet(123);  // Runs, but might cause issues later
```

---

### Build Tool `buildTool`
**What it is**: The tool used to bundle and build your React application.

**Options**:
- `vite` - Modern, fast build tool (recommended)
- `create-react-app` - Traditional, slower but stable

**When to choose**:

**Vite** (recommended):
- Much faster development server
- Faster builds
- Better performance
- Modern ESM-based
- Hot Module Replacement (HMR) works better
- Industry moving towards Vite

**Create React App (CRA)**:
- More established, larger ecosystem
- More tutorials available
- Some libraries only document CRA setup
- Webpack-based (slower but stable)

**If unsure**: Choose Vite. It's significantly faster and the future of React tooling.

**Speed comparison**:
- Vite dev server: < 1 second startup
- CRA dev server: 10-30 seconds startup

---

## What Gets Created

### Project Structure
```
frontend/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Main App component
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Page components
│   ├── utils/                   # Utility functions
│   ├── hooks/                   # Custom React hooks
│   └── styles/                  # CSS/styling files
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

---

## Runtime Configuration

### App Name `VITE_APP_NAME`
**What it is**: The name of your application (displayed in browser tab, page title, etc.).

**Example**: `My Awesome App`, `Customer Portal`, `Admin Dashboard`

**Where it's used**:
- Browser tab title
- Page headers
- Meta tags for SEO

---

### Frontend Application URL `VITE_APP_HOST`
**What it is**: The full URL where your frontend is accessible.

**Format**: `https://{projectName}[-{environment}].{domain}`

**Examples**:
- Production: `https://myapp.example.com`
- Staging: `https://myapp-staging.example.com`
- Development: `http://localhost:5173`

**Why it matters**: Used for redirect URLs, canonical URLs, and OAuth callbacks.

---

### Backend API Base URL `VITE_API_BASE`
**What it is**: The full URL of your backend API that the frontend calls.

**Format**: `https://{projectName}-api[-{environment}].{domain}`

**Examples**:
- Production: `https://myapp-api.example.com`
- Staging: `https://myapp-api-staging.example.com`
- Development: `http://localhost:8080`

**Why it matters**: All API calls from frontend use this base URL.

**Usage in code**:
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE  // Uses this config
});

// API call
const response = await apiClient.get('/api/users');
```

---

## Common Commands

### Development Server
```bash
npm run dev
```
Opens http://localhost:5173 by default.

### Build for Production
```bash
npm run build
```
Creates optimized bundle in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Run Tests
```bash
npm test
```

### Install Dependencies
```bash
npm install
```

---

## Common Issues

### "Port 5173 Already in Use"
**Problem**: Another Vite app is running on that port.

**Solutions**:
- Stop the other application
- Change port in `vite.config.ts`: `server: { port: 5174 }`
- Kill the process: `lsof -i :5173` then `kill -9 <PID>`

### "Module Not Found"
**Problem**: Missing npm package.

**Solutions**:
- Run `npm install` to install all dependencies
- Check `package.json` has the package listed
- Clear node_modules: `rm -rf node_modules package-lock.json` then `npm install`

### "TypeScript Errors"
**Problem**: Type checking errors.

**Solutions**:
- Read error message carefully (TypeScript errors are helpful!)
- Add proper type annotations
- Use `any` as temporary workaround (not recommended long-term)
- Check TypeScript documentation for correct types

### "API Calls Failing (CORS)"
**Problem**: Browser blocks API requests due to CORS policy.

**Solutions**:
- Verify `VITE_API_BASE` is correct
- Backend must allow requests from frontend origin
- Check backend CORS configuration includes frontend URL
- In development, backend should allow `http://localhost:5173`

### "Environment Variables Not Working"
**Problem**: `import.meta.env.VITE_*` is undefined.

**Solutions**:
- Environment variables MUST start with `VITE_`
- Defined in `.env` file in project root
- Restart dev server after changing `.env` file
- Check `.env` file is not in `.gitignore` for local development

---

## Best Practices

1. **Use TypeScript** - Catch errors early, better IDE support
2. **Use Vite** - Much faster than Create React App
3. **Use latest React version** - React 19 has better performance
4. **Component structure**: Keep components small and focused
5. **Use custom hooks** for reusable logic
6. **Use Tailwind CSS** for consistent styling
7. **Use Redux Toolkit** for complex state management

---

## File Structure Best Practices

```
src/
├── components/          # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── pages/              # Page-level components
│   ├── Home.tsx
│   ├── Profile.tsx
│   └── Dashboard.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   └── useApi.ts
├── utils/              # Helper functions
│   ├── api.ts
│   └── formatters.ts
├── store/              # Redux store
│   ├── store.ts
│   └── slices/
└── types/              # TypeScript type definitions
    └── index.ts
```

---

## Additional Resources

- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vite.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Redux Toolkit**: https://redux-toolkit.js.org/
