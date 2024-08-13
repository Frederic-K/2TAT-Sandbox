import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../../services/slices/themeSlice"

import { FaMoon, FaSun } from "react-icons/fa"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  return (
    <button
      className="flex h-10 w-12 items-center justify-center hover:ring-2 hover:ring-orange-300/50 focus:outline-none focus:ring-2 focus:ring-orange-300/50 dark:hover:ring-2"
      aria-label="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeToggle
