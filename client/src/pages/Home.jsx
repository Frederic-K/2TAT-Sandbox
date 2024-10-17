import { NavLink } from "react-router-dom"
import Title from "../components/PageTitle/PageTtile"
import { NAV_LINKS } from "../service/constants/navLinks"
import { motion } from "framer-motion"

const Home = () => {
  // const NAVLINKS = [
  //   { label: "Text Formatter", path: "/textformatter" },
  //   { label: "Market Calculator", path: "/marketcalculator" },
  //   // Add more navigation links as needed
  // ]

  return (
    <main className="mt-12 min-h-screen">
      <div className="flex flex-col gap-4">
        {NAV_LINKS.slice(1).map(({ name, path }) => (
          <motion.div
            key={name}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <NavLink to={path}>
              <Title content={name} />
            </NavLink>
          </motion.div>
        ))}
      </div>
    </main>
  )
}

export default Home
