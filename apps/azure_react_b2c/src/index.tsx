import { createRoot } from 'react-dom/client'
import App from './app';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
]);

const root = createRoot(document.getElementById('app') as HTMLElement);
const jsx = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
root.render(jsx);