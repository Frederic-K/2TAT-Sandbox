import { Field, ErrorMessage, useFormikContext } from "formik"
import { LuListRestart } from "react-icons/lu"
import { MdCalculate } from "react-icons/md"
import Decimal from "decimal.js"
import Tooltip from "../Tooltip/Tooltip"
import { formatNumber } from "../../service/numberFormatService"

const ConsistentValue = () => {
  const { values, setFieldValue } = useFormikContext()

  const handleConsistentValueCalculation = () => {
    const { initValue, manualValue, addToValue } = values.consistentValue
    let calculatedValue = 0
    let newRemainder = values.remainder

    if (initValue > 0 && addToValue > 0 && manualValue === 0) {
      calculatedValue = initValue + addToValue
      newRemainder = calculatedValue
    } else if (initValue > 0 && manualValue > 0) {
      calculatedValue = manualValue
      newRemainder = manualValue - initValue
    }

    setFieldValue("consistentValue.calculatedValue", calculatedValue)
    setFieldValue("remainder", newRemainder)
  }

  const resetConsistentValue = () => {
    setFieldValue("consistentValue", {
      initValue: 0,
      manualValue: 0,
      addToValue: 0,
      calculatedValue: 0,
    })
    setFieldValue("remainder", 0)
  }

  return (
    <section className="mt-6 grid gap-4 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
      <h3 className="text-lg font-semibold text-orange-600">
        Consistent Value Calculation
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {["initValue", "manualValue", "addToValue", "calculatedValue"].map(
          (field) => (
            <div key={field} className="grid gap-2">
              <div className="grid grid-cols-[auto,1fr] gap-2 sm:grid-cols-[1fr,2fr]">
                <div className="flex h-11 w-36 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 sm:w-full dark:border-zinc-300 dark:bg-zinc-200/10">
                  {field === "initValue"
                    ? "Init. Value"
                    : field === "manualValue"
                      ? "Manual Value"
                      : field === "addToValue"
                        ? "Add To Value"
                        : "Calculated Value"}
                  :
                </div>
                {field === "calculatedValue" ? (
                  <Tooltip
                    content={formatNumber(
                      new Decimal(values.consistentValue.calculatedValue || 0),
                    )}
                  >
                    <div className="flex h-11 items-center justify-start rounded-md border bg-white px-3 font-semibold text-teal-600 dark:bg-zinc-500 dark:text-teal-200">
                      {formatNumber(
                        new Decimal(
                          values.consistentValue.calculatedValue || 0,
                        ).toFixed(2),
                      )}
                    </div>
                  </Tooltip>
                ) : (
                  <Field
                    name={`consistentValue.${field}`}
                    type="number"
                    className="w-full rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                  />
                )}
              </div>
              <ErrorMessage
                name={`consistentValue.${field}`}
                component="div"
                className="text-right text-sm text-red-500"
              />
            </div>
          ),
        )}
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={resetConsistentValue}
          className="flex items-center justify-center gap-2 rounded-md border border-zinc-600 bg-zinc-500 px-4 py-2 text-white hover:bg-zinc-600"
        >
          <LuListRestart className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleConsistentValueCalculation}
          className="flex items-center justify-center gap-2 rounded-md border border-teal-600 bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
        >
          <MdCalculate className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default ConsistentValue
