import ThemeToggle from "../ThemeToggle/ThemeToggle"

const Header = () => {
  return (
    <div className="mx-auto mb-4 flex h-12 items-center justify-end bg-[url('/images/background/waveBanner-1.webp')] bg-cover bg-center bg-no-repeat text-zinc-200 dark:bg-zinc-800">
      <ThemeToggle />
    </div>
  )
}

export default Header
