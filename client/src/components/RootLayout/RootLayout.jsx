import { Outlet, useLocation } from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { AnimatePresence } from "framer-motion"

const RootLayout = () => {
  const location = useLocation()

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default RootLayout
