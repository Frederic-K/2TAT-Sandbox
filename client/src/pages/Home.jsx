import BudgetForm from "../components/BudgetMarket/BudgetForm"
import EHList from "../components/EHList/EHList"
import Notes from "../components/Notes/Notes"

const Home = () => {
  return (
    <main className="min-h-screen">
      <BudgetForm />
      <EHList />
      <Notes />
    </main>
  )
}

export default Home
