# React Test Project

A simple test application built using **React**, **TypeScript**, **MUI**, and **Redux Toolkit**, based on **Vite**.
The application demonstrates basic component usage, state management via Redux Toolkit, and styling with Material UI.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/EscaG/space-scutum
```

2. Navigate to the project folder:

```bash
cd todo-test
```

3. Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

---

## Running the Application

To start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be available at: [http://localhost:5173](http://localhost:5173).

---

## Build

To build the application for production:

```bash
npm run build
```

or

```bash
yarn build
```

The build will be created in the `dist` folder.

---

## Technologies Used

* **[React](https://reactjs.org/)** — library for building user interfaces. Used for component development.
* **[TypeScript](https://www.typescriptlang.org/)** — adds static typing to JavaScript, helps prevent errors and makes code more readable.
* **[MUI (Material UI)](https://mui.com/)** — library of ready-to-use components and styles, used for quickly creating a modern interface.
* **[Redux Toolkit](https://redux-toolkit.js.org/)** — simplifies global state management and makes Redux code cleaner.
* **[Vite](https://vitejs.dev/)** — modern bundler and dev server, faster than Create React App, used for development and build.

---

## Project Structure (FSD Architecture)
The project used the Feature-Sliced Design architecture framework. For reasons of convenience and speed, it was not possible to fully implement it.
```
project-root/
│
├─ src/
│  ├─ app/             # Application-level setup (store, providers, etc.)
│  │  └─ store/        # Redux Toolkit store and slices
│  │
│  ├─ entities/        # Core domain entities with state and logic
│  │  └─ counter/      # Example entity with slice and types
│  │
│  ├─ features/        # Application features (combine entities and UI)
│  │  └─ counterFeature/
│  │     └─ Counter.tsx # Component using the counter entity
│  │
│  ├─ shared/          # Shared utilities, components, and UI elements
│  │  └─ ui/
│  │     └─ Button.tsx  # Example shared UI component
│  │
│  ├─ widgets/         # Larger reusable components combining features
│  │
│  ├─ pages/           # Pages of the application
│  │  └─ HomePage.tsx
│  │
│  ├─ App.tsx          # Main app component
│  └─ main.tsx         # Entry point
│
├─ public/             # Static files
├─ vite.config.ts       # Vite configuration
└─ package.json         # Project dependencies and scripts
```

---

## Example of Redux Toolkit and MUI Usage

### Redux Toolkit:

```ts
// src/entities/counter/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

### Using in a Feature Component:

```tsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../entities/counter/counterSlice';
import Button from '@mui/material/Button';

const CounterFeature = () => {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <Button variant="contained" onClick={() => dispatch(increment())}>+</Button>
      <Button variant="outlined" onClick={() => dispatch(decrement())}>-</Button>
    </div>
  );
}

export default CounterFeature;
```

This demonstrates basic global state management with Redux Toolkit and UI components from MUI.

---

## Notes

* The project is intentionally simple and created to demonstrate the basic structure of a React application with Redux Toolkit and MUI using FSD (Feature-Sliced Design) architecture.
* Default local server port: `5173`.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
