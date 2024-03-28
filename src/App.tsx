import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import { NextUIProvider } from '@nextui-org/react'

function App() {
  return (
    <NextUIProvider>
      <div className="max-w-screen-2xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </NextUIProvider>
  )
}

export default App
