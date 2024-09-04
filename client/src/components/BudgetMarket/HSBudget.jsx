import { useFormikContext } from "formik"
import { LuListRestart } from "react-icons/lu"
import toast from "react-hot-toast"

import FormFields from "./BudgetMarketComponents/FormFields"
import SubmitButton from "./BudgetMarketComponents/SubmitButton"

const HSBudget = () => {
  const { values, setValues, isSubmitting } = useFormikContext()
  const handleReset = () => {
    toast.success("Form reset successfully!")
  }

  return (
    <section className="mx-auto max-w-lg">
      <FormFields values={values} setValues={setValues} />
      <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
        <button
          type="reset"
          tabIndex={2}
          onClick={handleReset}
          className="order-2 flex h-11 w-full items-center justify-center gap-4 rounded-md border border-zinc-900 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-4 py-2 text-lg font-semibold text-zinc-200 hover:from-zinc-400 hover:via-zinc-700 hover:to-zinc-400 sm:order-1"
        >
          <LuListRestart className="size-6" /> Reset
        </button>
        <SubmitButton isSubmitting={isSubmitting} tabIndex={1} />
      </div>
    </section>
  )
}

export default HSBudget
