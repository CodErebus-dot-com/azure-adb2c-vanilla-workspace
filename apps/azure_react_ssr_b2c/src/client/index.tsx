import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { loadableReady } from "@loadable/component";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
]);

const renderApp = () => {
  const rootContent = document.getElementById("root") as HTMLElement;

  const JSX = (
    <React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </React.StrictMode>
  );

  hydrateRoot(rootContent, JSX);
};

loadableReady(() => {
  renderApp();
});

if (module.hot) {
  module.hot.accept();
}
