import { Field, ErrorMessage } from "formik"
import Decimal from "decimal.js"
import Tooltip from "../../Tooltip/Tooltip"
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker"
import YearlyBudgetInputs from "../../YearlyBudgetInputs/YearlyBudgetInputs"

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

  const renderField = (name, label, placeholder, labelWidth, width) => (
    <div className="flex-col gap-2">
      <div className="flex gap-2">
        <div
          className={`${labelWidth} flex h-11 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10`}
        >
          {label}
        </div>
        <Field
          name={name}
          type="number"
          placeholder={placeholder}
          className={`${width} rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200`}
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="flex justify-end text-sm text-red-500"
      />
    </div>
  )

  return (
    <>
      <article className="flex justify-between gap-3 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
        {renderField("remainder", "Remainder:", "Remainder", null, "w-44")}
        {renderField("numberOfEHs", "Nb EHs:", null, null, "w-20")}
      </article>

      <article className="space-y-4 rounded-md">
        <div className="flex flex-col space-y-2 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
          <div className="flex w-full justify-between gap-2">
            {renderField(
              "EH.budget",
              `EH Budget${values.currentEHNumber > 0 ? ` ${values.currentEHNumber}` : ""}:`,
              "Enter budget",
              "w-44",
              "w-36",
            )}
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
          <div className="flex gap-2">
            <div className="h-11 w-full whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              Market duration:
            </div>
            <div className="flex gap-2">
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
          <hr className="border-t border-zinc-400 dark:border-zinc-500" />
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
