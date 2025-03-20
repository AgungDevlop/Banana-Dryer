import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import DryingLogs from "./pages/DryingLogs";
import Histories from "./pages/Histories";
import Schedules from "./pages/Schedules";
import Documentation from "./pages/Documentation"; // Import halaman baru
import ErrorBoundary from "./components/ErrorBoundary";
import SplashScreen from "./components/SplashScreen";
import "./index.css";

const ErrorFallback: React.FC = () => (
  <div className="text-center text-orange-600 p-4">
    <h1 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h1>
    <p>Maaf, terjadi kesalahan yang tidak terduga.</p>
    <button
      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      onClick={() => window.location.reload()}
    >
      Muat Ulang Halaman
    </button>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorFallback />,
      },
      {
        path: "drying_logs",
        element: <DryingLogs />,
        errorElement: <ErrorFallback />,
      },
      {
        path: "histories",
        element: <Histories />,
        errorElement: <ErrorFallback />,
      },
      {
        path: "schedules",
        element: <Schedules />,
        errorElement: <ErrorFallback />,
      },
      {
        path: "documentation",
        element: <Documentation />, // Route baru untuk dokumentasi
        errorElement: <ErrorFallback />,
      },
    ],
  },
]);

const RootApp: React.FC = () => (
  <>
    <SplashScreen />
    <RouterProvider router={router} />
  </>
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <RootApp />
    </ErrorBoundary>
  </React.StrictMode>
);