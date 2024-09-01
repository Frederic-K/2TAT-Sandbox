import BudgetForm from "../components/BudgetMarket/BudgetForm"
import HSList from "../components/HSList/HSList"
import Notes from "../components/Notes/Notes"

const HSCalculator = () => {
  return (
    <main className="min-h-screen">
      <BudgetForm />
      <HSList />
      <Notes />
    </main>
  )
}

export default HSCalculator
