// import { createBrowserRouter, RouterProvider } from "react-router-dom"

// import RootLayout from "./components/RootLayout/RootLayout"

// import Home from "./pages/Home"
// import TextFormatter from "./pages/TextFormatter"
// import MarketCalculator from "./pages/MarketCalculator"
// import NotFound from "./pages/NotFound"

// const publicRoutes = [
//   { index: true, element: <Home /> },
//   { path: "marketcalculator", element: <MarketCalculator /> },
//   { path: "textformatter", element: <TextFormatter /> },
// ]

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <RootLayout />,
//       errorElement: <NotFound />,
//       children: [...publicRoutes],
//     },
//   ])

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   )
// }

// export default App

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import RootLayout from "./components/RootLayout/RootLayout"

import Home from "./pages/Home"
import TextFormatter from "./pages/TextFormatter"
import MarketCalculator from "./pages/MarketCalculator"
import NotFound from "./pages/NotFound"

const publicRoutes = [
  { index: true, element: <Home /> },
  { path: "marketcalculator", element: <MarketCalculator /> },
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
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  )
}

export default App
