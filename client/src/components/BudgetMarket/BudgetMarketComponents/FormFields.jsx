import { Field, ErrorMessage } from "formik"
import Decimal from "decimal.js"
import Tooltip from "../../Tooltip/Tooltip"
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker"
import YearlyBudgetInputs from "../../YearlyBudgetInputs/YearlyBudgetInputs"
import { formatNumber } from "../../../service/numberFormatService"

const FormFields = ({ values, setValues }) => {
  const handleDateChange = (field) => (date) => {
    setValues((prevValues) => ({
      ...prevValues,
      EH: {
        ...prevValues.EH,
        [field]: date,
      },
    }))
  }

  return (
    <>
      <section className="grid grid-cols-1 gap-3 rounded-md border border-zinc-400 bg-zinc-400/20 p-4 sm:grid-cols-[2fr,1fr]">
        <div className="grid gap-2">
          <div className="grid grid-cols-[auto,1fr] gap-2">
            <div className="flex h-11 w-32 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 sm:w-full dark:border-zinc-300 dark:bg-zinc-200/10">
              Remainder:
            </div>
            <Field
              name="remainder"
              type="number"
              placeholder="Remainder"
              className="w-full rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
            />
          </div>
          <ErrorMessage
            name="remainder"
            component="div"
            className="text-right text-sm text-red-500"
          />
        </div>

        <div className="grid gap-2">
          <div className="grid grid-cols-[auto,1fr] gap-2">
            <div className="flex h-11 w-32 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 sm:w-full dark:border-zinc-300 dark:bg-zinc-200/10">
              Nb EHs:
            </div>
            <Field
              name="numberOfEHs"
              type="number"
              className="w-full rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
            />
          </div>
          <ErrorMessage
            name="numberOfEHs"
            component="div"
            className="text-right text-sm text-red-500"
          />
        </div>
      </section>

      <section className="grid gap-4 rounded-md">
        <div className="grid gap-2 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
          <article className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="flex h-11 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              {`EH Budget${values.currentEHNumber > 0 ? ` ${values.currentEHNumber}` : ""}:`}
            </div>
            <div className="grid gap-2">
              <Field
                name="EH.budget"
                type="number"
                placeholder="Enter budget"
                className="h-11 w-full rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
              />
              <ErrorMessage
                name="EH.budget"
                component="div"
                className="text-right text-sm text-red-500"
              />
            </div>
            <Tooltip
              content={formatNumber(
                new Decimal(
                  values.EH.calculatedBudget || values.EH.budget || 0,
                ),
              )}
            >
              <div className="flex h-11 items-center justify-start rounded-md border bg-white px-3 font-semibold text-teal-600 dark:bg-zinc-500 dark:text-teal-200">
                {formatNumber(
                  new Decimal(
                    values.EH.calculatedBudget || values.EH.budget || 0,
                  ).toFixed(2),
                )}
              </div>
            </Tooltip>
          </article>
          <article className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="flex h-11 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              Duration:
            </div>
            <div className="sm:col-span-2">
              <div className="xs:grid-cols-2 grid grid-cols-1 gap-2 sm:gap-3">
                <CustomDatePicker
                  selected={values.EH.startDate}
                  onChange={handleDateChange("startDate")}
                  name="EH.startDate"
                />
                <CustomDatePicker
                  selected={values.EH.endDate}
                  onChange={handleDateChange("endDate")}
                  name="EH.endDate"
                />
              </div>
            </div>
          </article>
          <hr className="border-t border-zinc-400 dark:border-zinc-500" />
          <YearlyBudgetInputs
            startDate={values.EH.startDate}
            endDate={values.EH.endDate}
            budgetPerYear={values.EH.budgetPerYear}
            calculatedBudgetPerYear={values.EH.calculatedBudgetPerYear}
          />
        </div>
      </section>
    </>
  )
}

export default FormFields
