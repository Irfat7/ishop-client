import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <div className="mx-auto max-w-screen-2xl">
          <Toaster
            toastOptions={{
              className: "",
              style: {
                padding: "5px 12px",
                background: "#EEEEFF",
              },
            }}
            position="bottom-center"
          />
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App;
