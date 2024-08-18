import Decimal from "decimal.js"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { validationSchema } from "../../service/validation/MarketOverrunValidation"
import { calculateBudget } from "../../service/budgetCalculationService"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Tooltip from "../Tooltip/Tooltip"
import { LuListRestart } from "react-icons/lu"
import { MdCalculate } from "react-icons/md"
import Title from "../PageTitle/PageTtile"

const INITIAL_VALUES = {
  remainder: "0",
  numberOfEHs: 1,
  currentEHNumber: 0,
  EH: {
    budget: "0",
    calculatedBudget: "0",
    startDate: new Date(),
    endDate: new Date(),
    budgetPerYear: ["0"],
    calculatedBudgetPerYear: ["0"],
  },
}

const BudgetForm = () => {
  return (
    <>
      <Title content={"Market Overrun Calculator"} />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        // "penny pinching" algorithm
        onSubmit={(values, { setSubmitting, setValues }) => {
          setSubmitting(true)
          try {
            const result = calculateBudget(values)
            if (result) {
              setValues({
                ...values,
                EH: {
                  ...values.EH,
                  calculatedBudget: result.calculatedBudget,
                  calculatedBudgetPerYear: result.calculatedBudgetPerYear,
                },
                remainder: result.remainder,
                numberOfEHs: result.numberOfEHs,
                currentEHNumber: result.currentEHNumber,
              })
            }
          } catch (error) {
            console.error("Error in form submission:", error)
            alert("An error occurred while calculating the EH budget.")
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ values, isSubmitting, setValues }) => (
          <Form className="mx-auto mt-8 max-w-lg space-y-6">
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
                    EH Budget{" "}
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
                    <div>
                      <DatePicker
                        todayButton="Today"
                        shouldCloseOnSelect={true}
                        selected={values.EH.startDate}
                        onChange={(date) =>
                          setValues((prevValues) => ({
                            ...prevValues,
                            EH: {
                              ...prevValues.EH,
                              startDate: date,
                            },
                          }))
                        }
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className="h-11 w-36 rounded-md border px-4 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                        calendarClassName=""
                      />
                      <ErrorMessage
                        name="EH.startDate"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                    <div>
                      <DatePicker
                        todayButton="Today"
                        shouldCloseOnSelect={true}
                        selected={values.EH.endDate}
                        onChange={(date) =>
                          setValues((prevValues) => ({
                            ...prevValues,
                            EH: {
                              ...prevValues.EH,
                              endDate: date,
                            },
                          }))
                        }
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className="h-11 w-36 rounded-md border px-4 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                      />
                      <ErrorMessage
                        name="EH.endDate"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <hr className="border-t border-zinc-400 dark:border-zinc-500" />
                </div>
                {values.EH.startDate && values.EH.endDate && (
                  <div className="space-y-2">
                    {Array.from(
                      {
                        length:
                          values.EH.endDate.getFullYear() -
                          values.EH.startDate.getFullYear() +
                          1,
                      },
                      (_, i) => values.EH.startDate.getFullYear() + i,
                    ).map((year, yearIndex) => (
                      <div key={yearIndex} className="flex items-center gap-2">
                        <div className="w-44 whitespace-nowrap pl-1 font-semibold text-orange-600">
                          Budget {year}
                        </div>
                        <Field
                          name={`EH.budgetPerYear.${yearIndex}`}
                          type="number"
                          placeholder={`Budget for ${year}`}
                          value={values.EH.budgetPerYear[yearIndex] || 0}
                          className="h-11 w-36 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                        />
                        <Tooltip
                          content={new Decimal(
                            values.EH.calculatedBudgetPerYear?.[yearIndex] || 0,
                          ).toString()}
                        >
                          <div className="flex h-11 w-36 items-center justify-center rounded-md border bg-white px-3 py-2 font-semibold text-teal-600 dark:bg-zinc-500 dark:text-teal-200">
                            {new Decimal(
                              values.EH.calculatedBudgetPerYear?.[yearIndex] ||
                                0,
                            ).toFixed(2)}
                          </div>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
            <article className="flex justify-between gap-14">
              <button
                type="reset"
                className="flex h-11 w-full items-center justify-center gap-4 rounded-md border border-zinc-900 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-4 py-2 text-lg font-semibold text-zinc-200 hover:from-zinc-400 hover:via-zinc-700 hover:to-zinc-400"
              >
                <LuListRestart className="size-6" /> Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-11 w-full items-center justify-center gap-4 rounded-md border border-teal-900 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700 px-4 py-2 text-lg font-semibold text-zinc-200 hover:from-teal-400 hover:via-teal-700 hover:to-teal-400"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-3 h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  <>
                    <MdCalculate className="size-6" />
                    Calculate
                  </>
                )}
              </button>
            </article>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default BudgetForm
