import { Formik, Form } from "formik"
import { calculateBudget } from "../service/budgetCalculationService"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import PageTitle from "../components/PageTitle/PageTtile"
import ConsistentValue from "../components/ConsistentValue/ConsistentValue"
import HSBudget from "../components/BudgetMarket/HSBudget"
import HSList from "../components/HSList/HSList"
import Notes from "../components/Notes/Notes"

const MarketCalculator = () => {
  const INITIAL_VALUES = {
    remainder: "0",
    numberOfHSs: 1,
    currentHSNumber: 0,
    HS: {
      budget: "0",
      calculatedBudget: "0",
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date(new Date().getFullYear(), 11, 31),
      budgetPerYear: ["0"],
      calculatedBudgetPerYear: ["0"],
    },
    consistentValue: {
      initValue: 0,
      manualValue: 0,
      addToValue: 0,
      calculatedValue: 0,
    },
  }

  return (
    <main className="min-h-screen">
      <Toaster position="bottom-left" reverseOrder={false} />
      <PageTitle content="Market Calculator" />
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, actions) => {
          try {
            const result = calculateBudget(values)
            if (result) {
              actions.setValues({
                ...values,
                HS: {
                  ...values.HS,
                  calculatedBudget: result.calculatedBudget,
                  calculatedBudgetPerYear: result.calculatedBudgetPerYear,
                },
                remainder: result.remainder,
                numberOfHSs: result.numberOfHSs,
                currentHSNumber: result.currentHSNumber,
              })
            }
            toast.success("HS budget calculated successfully!")
          } catch (error) {
            console.error("Error in form submission:", error)
            toast.error("An error occurred while calculating the HS budget!")
          } finally {
            actions.setSubmitting(false)
          }
        }}
      >
        <Form>
          <ConsistentValue />
          <HSBudget />
        </Form>
      </Formik>
      <HSList />
      <Notes />
    </main>
  )
}

export default MarketCalculator
