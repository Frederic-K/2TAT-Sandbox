import { Field } from "formik"
import Decimal from "decimal.js"
import Tooltip from "../Tooltip/Tooltip"

const YearlyBudgetInputs = ({
  startDate,
  endDate,
  budgetPerYear,
  calculatedBudgetPerYear,
}) => {
  if (!startDate || !endDate) return null

  const years = Array.from(
    { length: endDate.getFullYear() - startDate.getFullYear() + 1 },
    (_, i) => startDate.getFullYear() + i,
  )

  return (
    <div className="space-y-2">
      {years.map((year, yearIndex) => (
        <div key={yearIndex} className="flex items-center gap-2">
          <div className="w-44 whitespace-nowrap pl-1 font-semibold text-orange-600">
            Budget {year}
          </div>
          <Field
            name={`EH.budgetPerYear.${yearIndex}`}
            type="number"
            placeholder={`Budget for ${year}`}
            value={budgetPerYear[yearIndex] || 0}
            className="h-11 w-36 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
          />
          <Tooltip
            content={new Decimal(
              calculatedBudgetPerYear?.[yearIndex] || 0,
            ).toString()}
          >
            <div className="flex h-11 w-36 items-center justify-center rounded-md border bg-white px-3 py-2 font-semibold text-teal-600 dark:bg-zinc-500 dark:text-teal-200">
              {new Decimal(calculatedBudgetPerYear?.[yearIndex] || 0).toFixed(
                2,
              )}
            </div>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}

export default YearlyBudgetInputs
