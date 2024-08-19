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

  const renderField = (name, label, placeholder, labelWidth, width) => (
    <div className="grid gap-2">
      <div className="grid grid-cols-[auto,1fr] gap-2">
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
        className="text-right text-sm text-red-500"
      />
    </div>
  )

  return (
    <>
      <article className="grid grid-cols-1 gap-3 rounded-md border border-zinc-400 bg-zinc-400/20 p-4 sm:grid-cols-[2fr,1fr]">
        {renderField("remainder", "Remainder:", "Remainder", null, "w-full")}
        {renderField("numberOfEHs", "Nb EHs:", null, null, "w-full")}
      </article>

      <article className="grid gap-4 rounded-md">
        <div className="grid gap-2 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
          <div className="grid grid-cols-[1fr,auto] gap-2">
            {renderField(
              "EH.budget",
              `EH Budget${values.currentEHNumber > 0 ? ` ${values.currentEHNumber}` : ""}:`,
              "Enter budget",
              "w-full",
              "w-full",
            )}
            <Tooltip
              content={formatNumber(
                new Decimal(
                  values.EH.calculatedBudget || values.EH.budget || 0,
                ),
              )}
            >
              <div className="flex h-11 w-36 items-center justify-center rounded-md border bg-white px-3 font-semibold text-teal-600 dark:bg-zinc-500 dark:text-teal-200">
                {formatNumber(
                  new Decimal(
                    values.EH.calculatedBudget || values.EH.budget || 0,
                  ).toFixed(2),
                )}
              </div>
            </Tooltip>
          </div>
          <div className="grid grid-cols-[auto,1fr] gap-2">
            <div className="h-11 w-44 whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              Market duration:
            </div>
            <div className="grid grid-cols-2 gap-2">
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
