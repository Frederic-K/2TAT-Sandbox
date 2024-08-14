import { createBrowserRouter, RouterProvider } from "react-router-dom"

import RootLayout from "./components/RootLayout/RootLayout"

import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

const publicRoutes = [{ index: true, element: <Home /> }]

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [...publicRoutes],
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
