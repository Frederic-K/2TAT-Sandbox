/* eslint-disable react/prop-types */
const BurgerMenu = ({ props }) => {
  const { isOpen, setIsOpen } = props
  return (
    <button
      type="button"
      id="mobile-menu-button"
      // onClick={() => toggleOpenMenu()}
      onClick={() => setIsOpen(!isOpen)}
      className={isOpen ? "open group peer" : "group peer"}
    >
      <div className="relative top-0 h-1 w-8 rounded-full bg-zinc-200 transition-all group-open:top-2 group-open:rotate-45"></div>
      <div className="mt-1 h-1 w-8 rounded-full bg-zinc-200 opacity-100 transition-all group-open:opacity-0"></div>
      <div className="relative top-0 mt-1 h-1 w-8 rounded-full bg-zinc-200 transition-all group-open:-top-2 group-open:-rotate-45"></div>
    </button>
  )
}

export default BurgerMenu

// import { motion } from "framer-motion"

// const BurgerMenu = ({ isOpen, setIsOpen }) => {
//   return (
//     <button
//       type="button"
//       id="mobile-menu-button"
//       onClick={() => setIsOpen(!isOpen)}
//       className="group peer"
//     >
//       <div className="relative h-6 w-6 p-4">
//         <motion.div
//           animate={isOpen ? { top: "50%", rotate: 45 } : { top: 0, rotate: 0 }}
//           transition={{ duration: 0.2 }}
//           className="absolute h-1 w-6 -translate-y-1/2 transform bg-zinc-200"
//         />
//         <motion.div
//           animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
//           transition={{ duration: 0.2 }}
//           className="absolute top-1/2 h-1 w-6 -translate-y-1/2 transform bg-zinc-200"
//         />
//         <motion.div
//           animate={
//             isOpen ? { bottom: "50%", rotate: -45 } : { bottom: 0, rotate: 0 }
//           }
//           transition={{ duration: 0.2 }}
//           className="absolute h-1 w-6 translate-y-1/2 transform bg-zinc-200"
//         />
//       </div>
//     </button>
//   )
// }

// export default BurgerMenu
