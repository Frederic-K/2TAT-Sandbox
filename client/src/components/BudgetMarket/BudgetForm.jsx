import { Formik, Form } from "formik"
import { LuListRestart } from "react-icons/lu"

import { validationSchema } from "../../service/validation/MarketOverrunValidation"
import { calculateBudget } from "../../service/budgetCalculationService"
import Title from "../PageTitle/PageTtile"
import FormFields from "./BudgetMarketComponents/FormFields"
import SubmitButton from "./BudgetMarketComponents/SubmitButton"

const INITIAL_VALUES = {
  consistentValue: {
    initValue: 0,
    manualValue: 0,
    addToValue: 0,
    calculatedValue: 0,
  },
  remainder: "0",
  numberOfHSs: 1,
  currentHSNumber: 0,
  HS: {
    budget: "0",
    calculatedBudget: "0",
    startDate: new Date(new Date().getFullYear(), 0, 1),
    //endDate: new Date(),
    endDate: new Date(new Date().getFullYear(), 11, 31),
    budgetPerYear: ["0"],
    calculatedBudgetPerYear: ["0"],
  },
}

const BudgetForm = () => {
  const handleSubmit = async (values, { setSubmitting, setValues }) => {
    setSubmitting(true)
    try {
      const result = await calculateBudget(values)
      if (result) {
        setValues({
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
    } catch (error) {
      console.error("Error in form submission:", error)
      alert("An error occurred while calculating the HS budget.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Title content="Market Calculator" />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setValues }) => (
          <Form className="mx-auto mt-8 max-w-lg space-y-6">
            <FormFields values={values} setValues={setValues} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
              <button
                type="reset"
                tabIndex={2}
                className="order-2 flex h-11 w-full items-center justify-center gap-4 rounded-md border border-zinc-900 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-4 py-2 text-lg font-semibold text-zinc-200 hover:from-zinc-400 hover:via-zinc-700 hover:to-zinc-400 sm:order-1"
              >
                <LuListRestart className="size-6" /> Reset
              </button>
              <SubmitButton isSubmitting={isSubmitting} tabIndex={1} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default BudgetForm
