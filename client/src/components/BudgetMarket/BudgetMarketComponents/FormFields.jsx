import { Field, ErrorMessage } from "formik"
import Decimal from "decimal.js"
import Tooltip from "../../Tooltip/Tooltip"
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker"
import YearlyBudgetInputs from "../../YearlyBudgetInputs/YearlyBudgetInputs"

const FormFields = ({ values, setValues }) => {
  return (
    <>
      <article className="flex justify-between gap-3 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
        <div className="flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex h-11 w-28 items-center rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              Remainder:
            </div>
            <Field
              name="remainder"
              type="number"
              placeholder="Remainder"
              className="w-44 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
            />
          </div>
          <ErrorMessage
            name="remainder"
            component="div"
            className="flex justify-end text-sm text-red-500"
          />
        </div>
        <div className="flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex h-11 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              Nb EHs:
            </div>
            <Field
              name="numberOfEHs"
              type="number"
              className="w-20 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
            />
          </div>
          <ErrorMessage
            name="numberOfEHs"
            component="div"
            className="flex justify-end text-sm text-red-500"
          />
        </div>
      </article>

      <article className="space-y-4 rounded-md">
        <div className="flex flex-col space-y-2 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
          <div className="flex w-full justify-between gap-2">
            <div className="h-11 w-[175px] whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              EH Budget
              {values.currentEHNumber > 0 ? values.currentEHNumber : ""} :
            </div>
            <Field
              name="EH.budget"
              type="number"
              placeholder="EH Budget"
              className="w-36 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
            />
            <Tooltip
              content={new Decimal(
                values.EH.calculatedBudget || values.EH.budget || 0,
              ).toString()}
            >
              <div className="flex h-11 w-36 items-center justify-center rounded-md border bg-white px-3 font-semibold text-teal-600 dark:bg-zinc-500 dark:text-teal-200">
                {new Decimal(
                  values.EH.calculatedBudget || values.EH.budget || 0,
                ).toFixed(2)}
              </div>
            </Tooltip>
          </div>
          <ErrorMessage
            name="EH.budget"
            component="div"
            className="text-sm text-red-500"
          />
          <div className="flex gap-2">
            <div className="h-11 w-full whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              Market duration:
            </div>
            <div className="flex gap-2">
              <CustomDatePicker
                selected={values.EH.startDate}
                onChange={(date) => {
                  setValues((prevValues) => ({
                    ...prevValues,
                    EH: {
                      ...prevValues.EH,
                      startDate: date,
                    },
                  }))
                }}
                name="EH.startDate"
              />
              <CustomDatePicker
                selected={values.EH.endDate}
                onChange={(date) => {
                  setValues((prevValues) => ({
                    ...prevValues,
                    EH: {
                      ...prevValues.EH,
                      endDate: date,
                    },
                  }))
                }}
                name="EH.endDate"
              />
            </div>
          </div>
          <div className="py-1">
            <hr className="border-t border-zinc-400 dark:border-zinc-500" />
          </div>
          <YearlyBudgetInputs
            startDate={values.EH.startDate}
            endDate={values.EH.endDate}
            budgetPerYear={values.EH.budgetPerYear}
            calculatedBudgetPerYear={values.EH.calculatedBudgetPerYear}
          />
        </div>
      </article>
    </>
  )
}

export default FormFields
