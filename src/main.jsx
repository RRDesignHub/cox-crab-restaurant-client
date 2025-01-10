import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Provider/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Provider/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
