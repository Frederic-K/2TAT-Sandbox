import { createBrowserRouter, RouterProvider } from "react-router-dom"

import RootLayout from "./components/RootLayout/RootLayout"

import Home from "./pages/Home"
import TextFormatter from "./pages/TextFormatter"
import EHCalculator from "./pages/EHCalculator"
import NotFound from "./pages/NotFound"

const publicRoutes = [
  { index: true, element: <Home /> },
  { path: "ehcalculator", element: <EHCalculator /> },
  { path: "textformatter", element: <TextFormatter /> },
]

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
