import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import { useState } from "react"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  remainder: Yup.number().required("Remainder is required"),
  EHs: Yup.array().of(
    Yup.object().shape({
      // name: Yup.string().required("EH name is required"),
      budget: Yup.number().required("EH budget is required"),
      startYear: Yup.number().required("Start year is required"),
      endYear: Yup.number()
        .required("End year is required")
        .min(Yup.ref("startYear")),
      budgetPerYear: Yup.array().of(
        Yup.number().required("Budget per year is required"),
      ),
    }),
  ),
})

const BudgetForm = () => {
  return (
    <>
      <h1 className="mx-auto flex max-w-lg justify-center rounded-md border border-zinc-400 bg-zinc-400/20 bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700 bg-clip-text p-2 text-2xl font-bold text-transparent dark:bg-zinc-200/10">
        Market Overrun Calculator
      </h1>
      <Formik
        initialValues={{
          remainder: 0,
          numberOfEHs: 1,

          EHs: [
            {
              budget: 0,
              startYear: new Date().getFullYear(),
              endYear: new Date().getFullYear(),
              budgetPerYear: [0],
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setValues }) => {
          setSubmitting(true)
          try {
            const updatedEHs = values.EHs.slice(0, values.numberOfEHs).map(
              (eh, index) => {
                const remainderPerEH =
                  values.remainder / (values.numberOfEHs - index)
                values.remainder -= remainderPerEH

                const newMarketBudget = eh.budget + remainderPerEH
                const yearCount = eh.endYear - eh.startYear + 1
                const remainderPerEHPerYear = remainderPerEH / yearCount

                const updatedBudgetPerYear = eh.budgetPerYear.map(
                  (yearBudget) => yearBudget + remainderPerEHPerYear,
                )

                return {
                  ...eh,
                  budget: newMarketBudget,
                  budgetPerYear: updatedBudgetPerYear,
                }
              },
            )
            setValues({ ...values, EHs: updatedEHs, remainder: 0 })
          } catch (error) {
            console.error("Error in form submission:", error)
            alert("An error occurred while calculating the EH budget.")
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="mx-auto mt-8 max-w-lg space-y-6">
            <article className="flex gap-2 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
              <div className="flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex w-28 items-center rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
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
                  <div className="flex items-center rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
                    Nb EHs:
                  </div>
                  <Field
                    name="numberOfEHs"
                    type="number"
                    // placeholder="numberOfEHs"
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
            <FieldArray name="EHs">
              {({ remove, push }) => (
                <article className="space-y-4 rounded-md">
                  {values.EHs.length > 0 &&
                    values.EHs.map((EH, index) => (
                      <div
                        key={index}
                        className="flex flex-col space-y-2 rounded-md border border-zinc-400 bg-zinc-400/20 p-4"
                      >
                        <div className="flex w-full justify-between gap-2">
                          <div className="w-[175px] whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
                            EH n°{index + 1} - Budget:
                          </div>
                          <Field
                            name={`EHs.${index}.budget`}
                            type="number"
                            placeholder="EH Budget"
                            className="w-36 rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                          />
                          <div className="flex w-36 items-center justify-center rounded-md border bg-white px-3 dark:bg-zinc-500 dark:text-zinc-200">
                            {EH.budget.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-full whitespace-nowrap rounded-md border border-zinc-600 bg-zinc-400/20 px-3 py-2 font-semibold text-orange-600 dark:border-zinc-300 dark:bg-zinc-200/10">
                            Market duration:
                          </div>
                          <div className="flex gap-2">
                            <Field
                              name={`EHs.${index}.startYear`}
                              type="number"
                              placeholder="Start Year"
                              className="w-36 rounded-md border px-4 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                            />
                            <Field
                              name={`EHs.${index}.endYear`}
                              type="number"
                              placeholder="End Year"
                              className="w-36 rounded-md border px-4 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                            />
                          </div>
                        </div>

                        {EH.startYear && EH.endYear && (
                          <FieldArray name={`EHs.${index}.budgetPerYear`}>
                            {() => (
                              <div className="space-y-2">
                                {Array.from(
                                  {
                                    length: EH.endYear - EH.startYear + 1,
                                  },
                                  (_, i) => EH.startYear + i,
                                ).map((year, yearIndex) => (
                                  <div
                                    key={yearIndex}
                                    name={`EHs.${index}.budgetPerYear.${yearIndex}`}
                                    className="flex items-center gap-4"
                                  >
                                    <div className="whitespace-nowrap pl-1 font-semibold text-orange-600">
                                      Budget {year}
                                    </div>
                                    <Field
                                      name={`EHs.${index}.budgetPerYear.${yearIndex}`}
                                      type="number"
                                      placeholder={`Budget for ${year}`}
                                      className="w-full rounded-md border px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200"
                                    />
                                    <div className="flex w-full items-center justify-center rounded-md border bg-white px-3 py-2 dark:bg-zinc-500 dark:text-zinc-200">
                                      {(
                                        EH.budgetPerYear[yearIndex] || 0
                                      ).toFixed(2)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </FieldArray>
                        )}
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                name: "",
                                budget: 0,
                                startYear: new Date().getFullYear(),
                                endYear: new Date().getFullYear(),
                                budgetPerYear: [],
                              })
                            }
                            className="rounded-md border border-zinc-600 bg-gradient-to-r px-2 py-1 font-semibold hover:border-orange-700 hover:from-orange-700 hover:via-orange-500 hover:to-orange-700 hover:text-zinc-200"
                          >
                            Add EH
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="rounded-md border border-red-700 bg-gradient-to-r px-2 py-1 font-semibold text-red-700 hover:border-red-700 hover:from-red-700 hover:via-red-500 hover:to-red-700 hover:text-zinc-200"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </article>
              )}
            </FieldArray>
            <article className="flex justify-between gap-14">
              <button
                type="reset"
                className="w-full rounded-md border border-zinc-900 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 px-4 py-2 font-semibold text-zinc-200 hover:from-zinc-400 hover:via-zinc-700 hover:to-zinc-400"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md border border-teal-900 bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700 px-4 py-2 font-semibold text-zinc-200 hover:from-teal-400 hover:via-teal-700 hover:to-teal-400"
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
                  "Calculate"
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
