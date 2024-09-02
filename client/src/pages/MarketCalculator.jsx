import PageTitle from "../components/PageTitle/PageTtile"
import ConsistentValue from "../components/ConsistentValue/ConsistentValue"
import HSBudget from "../components/BudgetMarket/HSBudget"
import HSList from "../components/HSList/HSList"
import Notes from "../components/Notes/Notes"

const MarketCalculator = () => {
  return (
    <main className="min-h-screen">
      <PageTitle content="Market Calculator" />
      <ConsistentValue />
      <HSBudget />
      <HSList />
      <Notes />
    </main>
  )
}

export default MarketCalculator
