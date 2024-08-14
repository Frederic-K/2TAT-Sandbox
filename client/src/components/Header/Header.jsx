import ThemeToggle from "../ThemeToggle/ThemeToggle"

const Header = () => {
  return (
    <div className="mx-auto mb-4 flex h-12 items-center justify-center bg-[url('/images/background/origamiBanner.webp')] bg-cover bg-center bg-no-repeat dark:bg-zinc-800">
      Header
      <ThemeToggle />
    </div>
  )
}

export default Header
