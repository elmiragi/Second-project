import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.tsx'
import { theme } from './styles/theme.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router}/>
  </ThemeProvider>
)
