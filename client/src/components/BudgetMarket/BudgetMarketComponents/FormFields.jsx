import { Field, ErrorMessage } from "formik"
import { LuListRestart } from "react-icons/lu"
import { MdCalculate } from "react-icons/md"
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

  const handleCoherentValueCalculation = () => {
    const { initValue, manualValue, addToValue } = values.coherentValue
    let calculatedValue = 0
    let newRemainder = values.remainder

    if (initValue > 0 && addToValue > 0 && manualValue === 0) {
      calculatedValue = initValue + addToValue
      newRemainder = calculatedValue
    } else if (initValue > 0 && manualValue > 0) {
      calculatedValue = manualValue
      newRemainder = manualValue - initValue
    }

    setValues((prevValues) => ({
      ...prevValues,
      coherentValue: {
        ...prevValues.coherentValue,
        calculatedValue,
      },
      remainder: newRemainder,
    }))
  }

  const resetCoherentValue = () => {
    setValues((prevValues) => ({
      ...prevValues,
      coherentValue: {
        initValue: 0,
        manualValue: 0,
        addToValue: 0,
        calculatedValue: 0,
      },
    }))
  }

  return (
    <>
      <section className="mt-6 grid gap-4 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
        <h3 className="text-lg font-semibold text-orange-600">
          Coherent Value Calculation
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {["initValue", "manualValue", "addToValue", "calculatedValue"].map(
            (field) => (
              <div key={field} className="grid gap-2">
                <div className="grid grid-cols-[1fr,2fr] gap-2">
                  <div className="flex h-11 items-center whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
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
                        new Decimal(values.coherentValue.calculatedValue || 0),
                      )}
                    >
                      <div className="flex h-11 items-center justify-start rounded-md border bg-white px-3 font-semibold text-teal-600 dark:bg-zinc-500 dark:text-teal-200">
                        {formatNumber(
                          new Decimal(
                            values.coherentValue.calculatedValue || 0,
                          ).toFixed(2),
                        )}
                      </div>
                    </Tooltip>
                  ) : (
                    <Field
                      name={`coherentValue.${field}`}
                      type="number"
                      className="w-full rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                    />
                  )}
                </div>
                <ErrorMessage
                  name={`coherentValue.${field}`}
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
            onClick={resetCoherentValue}
            className="flex items-center justify-center gap-2 rounded-md border border-zinc-600 bg-zinc-500 px-4 py-2 text-white hover:bg-zinc-600"
          >
            <LuListRestart className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleCoherentValueCalculation}
            className="flex items-center justify-center gap-2 rounded-md border border-teal-600 bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
          >
            <MdCalculate className="h-5 w-5" />
          </button>
        </div>
      </section>

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
            <div className="flex h-11 items-center rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
              Duration:
            </div>
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
