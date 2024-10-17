// import { NavLink } from "react-router-dom"

// const NavLinks = ({ setIsOpen }) => {
//   const links = [
//     { name: "Home", path: "/" },
//     { name: "Market Calculator", path: "/marketcalculator" },
//     { name: "Text Formatter", path: "/textformatter" },
//   ]

//   return (
//     <>
//       {links.map((link, idx) => (
//         <NavLink
//           key={`${link.name}-${idx}`}
//           to={link.path}
//           onClick={() => setIsOpen && setIsOpen(false)}
//           className={({ isActive }) =>
//             `${isActive ? "bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 bg-clip-text text-transparent" : "text-zinc-200 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:bg-clip-text hover:text-transparent"} text-lg font-bold`
//           }
//         >
//           {link.name}
//         </NavLink>
//       ))}
//     </>
//   )
// }

// export default NavLinks

import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { NAV_LINKS } from "../../../service/constants/navLinks"

const NavLinks = ({ setIsOpen }) => {
  return (
    <>
      {NAV_LINKS.map((link, idx) => (
        <motion.div
          key={`${link.name}-${idx}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
        >
          <NavLink
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 text-lg font-bold ${
                isActive
                  ? "bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 bg-clip-text text-transparent"
                  : "text-zinc-200 hover:bg-gradient-to-r hover:from-orange-700 hover:via-orange-400 hover:to-orange-700 hover:bg-clip-text hover:text-transparent"
              }`
            }
          >
            {link.name}
          </NavLink>
        </motion.div>
      ))}
    </>
  )
}

export default NavLinks
