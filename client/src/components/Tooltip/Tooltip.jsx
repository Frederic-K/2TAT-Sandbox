// import { useState } from "react"
// import PropTypes from "prop-types"

// const Tooltip = ({ children, content }) => {
//   const [isVisible, setIsVisible] = useState(false)

//   return (
//     <div className="relative inline-block">
//       <div
//         onMouseEnter={() => setIsVisible(true)}
//         onMouseLeave={() => setIsVisible(false)}
//       >
//         {children}
//       </div>
//       <div
//         className={`absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-md border border-zinc-700 bg-zinc-200 px-3 py-2 text-sm shadow-lg transition-opacity duration-300 ease-in-out dark:bg-zinc-700 dark:text-zinc-200 ${
//           isVisible ? "opacity-100" : "pointer-events-none opacity-0"
//         }`}
//       >
//         {content}
//       </div>
//     </div>
//   )
// }

// Tooltip.propTypes = {
//   children: PropTypes.node.isRequired,
//   content: PropTypes.node.isRequired,
// }

// export default Tooltip

import { useState } from "react"
import PropTypes from "prop-types"

const Tooltip = ({ children, content, width = "w-36" }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <div
        className={`absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-md border border-zinc-700 bg-zinc-200 px-3 py-2 text-sm shadow-lg transition-opacity duration-300 ease-in-out dark:bg-zinc-700 dark:text-zinc-200 ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        } ${width}`}
      >
        {content}
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  width: PropTypes.string,
}

export default Tooltip
