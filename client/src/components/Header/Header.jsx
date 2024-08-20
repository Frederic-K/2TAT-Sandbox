import ThemeToggle from "../ThemeToggle/ThemeToggle"
import NavLinks from "./HeaderComponents/NavLinks"

const Header = () => {
  return (
    <div className="mx-auto mb-6 flex h-12 items-center justify-end border-b-2 border-zinc-600/30 bg-[url('/images/background/waveBanner-1.webp')] bg-cover bg-center bg-no-repeat dark:bg-zinc-800">
      <NavLinks setIsOpen={null} />
      <ThemeToggle />
    </div>
  )
}

export default Header
