import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../service/slices/themeSlice"

import { FaMoon, FaSun } from "react-icons/fa"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  return (
    <button
      className="flex size-10 items-center justify-center hover:ring-orange-300/50"
      aria-label="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeToggle
