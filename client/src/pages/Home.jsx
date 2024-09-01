import { NavLink } from "react-router-dom"
import Title from "../components/PageTitle/PageTtile"

const Home = () => {
  const NAVLINKS = [
    { label: "Text Formatter", path: "/textformatter" },
    { label: "Market Calculator", path: "/marketcalculator" },
    // Add more navigation links as needed
  ]

  return (
    <main className="mt-12 min-h-screen">
      <div className="flex flex-col gap-4">
        {NAVLINKS.map(({ label, path }) => (
          <NavLink key={label} to={path}>
            <Title content={label} />
          </NavLink>
        ))}
      </div>
    </main>
  )
}

export default Home
