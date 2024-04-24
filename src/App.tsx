import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

function App() {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-screen-2xl mx-auto">
          <Toaster toastOptions={{
            className: '',
            style: {
              padding: '5px 12px',
              background: '#EEEEFF',
            },
          }}
            position="bottom-center"
          />
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </NextUIProvider>
  )
}

export default App
