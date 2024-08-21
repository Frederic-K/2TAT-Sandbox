import { useRef, useState, useEffect, useCallback } from "react"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import BurgerMenu from "./HeaderComponents/BurgerMenu"
import NavLinks from "./HeaderComponents/NavLinks"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  return (
    <div className="relative mx-auto mb-6 flex h-12 items-center justify-end border-b-2 border-zinc-600/30 bg-[url('/images/background/waveBanner-1.webp')] bg-cover bg-center bg-no-repeat dark:bg-zinc-800">
      <ThemeToggle />
      <div
        ref={menuRef}
        className="flex cursor-pointer flex-col justify-center px-4"
      >
        <BurgerMenu props={{ setIsOpen, isOpen }} />
        <div className="absolute left-0 top-12 flex w-full origin-top-right scale-y-0 flex-col items-center justify-center bg-zinc-800 py-2 transition-transform peer-open:z-30 peer-open:scale-y-100">
          <NavLinks setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  )
}

export default Header
