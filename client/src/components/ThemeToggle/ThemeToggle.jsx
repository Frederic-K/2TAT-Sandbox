import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../service/slices/themeSlice"

import { FaMoon, FaSun } from "react-icons/fa"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)

  return (
    <button
      className="flex items-center justify-center px-4 hover:ring-orange-300/50"
      aria-label="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-400 hover:text-orange-400">
            Light
          </span>{" "}
          <FaSun className="text-lg text-orange-500" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-400 hover:text-orange-400">
            Dark
          </span>{" "}
          <FaMoon className="text-lg text-orange-500" />
        </div>
      )}
    </button>
  )
}

export default ThemeToggle
