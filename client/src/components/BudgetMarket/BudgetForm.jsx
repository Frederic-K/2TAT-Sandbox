import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  initialBudget: Yup.number().required("Initial budget is required"),
  goalBudget: Yup.number().required("Goal budget is required"),
  remainder: Yup.number().required("Remainder is required"),

  markets: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Market name is required"),
      budget: Yup.number().required("Market budget is required"),
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
      <h1 className="mx-auto flex max-w-lg justify-center rounded-md border p-4">
        Market Overrun Calculator
      </h1>
      <Formik
        initialValues={{
          initialBudget: 0,
          goalBudget: 0,
          remainder: 0,

          markets: [
            {
              name: "",
              budget: 0,
              startYear: new Date().getFullYear(),
              endYear: new Date().getFullYear(),
              budgetPerYear: [],
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="mx-auto mt-8 max-w-lg space-y-6">
            <div className="flex flex-col space-y-2 rounded-md border p-4">
              <div className="flex gap-2">
                <div className="flex w-48 items-center rounded-md border px-3 py-2">
                  Initial Budget :
                </div>
                <Field
                  name="initialBudget"
                  type="number"
                  placeholder="Initial Budget"
                  className="w-full rounded-md border px-3 py-2"
                />
                <ErrorMessage
                  name="initialBudget"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex w-48 items-center rounded-md border px-3 py-2">
                  Gaol Budget :
                </div>
                <Field
                  name="goalBudget"
                  type="number"
                  placeholder="Goal Budget"
                  className="w-full rounded-md border px-3 py-2"
                />
                <ErrorMessage
                  name="goalBudget"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex w-48 items-center rounded-md border px-3 py-2">
                  Remainder :
                </div>
                <Field
                  name="remainder"
                  type="number"
                  placeholder="Remainder"
                  className="w-full rounded-md border px-3 py-2"
                />
                <ErrorMessage
                  name="remainder"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
            </div>
            <FieldArray name="markets">
              {({ remove, push }) => (
                <div className="space-y-4">
                  {values.markets.length > 0 &&
                    values.markets.map((market, index) => (
                      <div
                        key={index}
                        className="flex flex-col space-y-2 rounded-md border p-4"
                      >
                        <div className="flex w-full justify-between gap-2">
                          <div className="w-46 whitespace-nowrap rounded-md border px-3 py-2">
                            Market n°{index + 1} - Budget:
                          </div>
                          <Field
                            name={`markets.${index}.budget`}
                            type="number"
                            placeholder="Market Budget"
                            className="w-36 rounded-md border px-3 py-2"
                          />
                          <div className="flex w-36 items-center justify-center rounded-md border px-3">
                            Result
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-full whitespace-nowrap rounded-md border px-3 py-2">
                            Market duration:
                          </div>
                          <div className="flex gap-2">
                            <Field
                              name={`markets.${index}.startYear`}
                              type="number"
                              placeholder="Start Year"
                              className="w-36 rounded-md border px-4 py-2"
                            />
                            <Field
                              name={`markets.${index}.endYear`}
                              type="number"
                              placeholder="End Year"
                              className="w-36 rounded-md border px-4 py-2"
                            />
                          </div>
                        </div>

                        {market.startYear && market.endYear && (
                          <FieldArray name={`markets.${index}.budgetPerYear`}>
                            {() => (
                              <div className="space-y-2">
                                {Array.from(
                                  {
                                    length:
                                      market.endYear - market.startYear + 1,
                                  },
                                  (_, i) => market.startYear + i,
                                ).map((year, yearIndex) => (
                                  <div
                                    key={yearIndex}
                                    name={`markets.${index}.budgetPerYear.${yearIndex}`}
                                    className="flex items-center gap-4"
                                  >
                                    <div className="whitespace-nowrap pl-1">
                                      Budget {year}
                                    </div>
                                    <Field
                                      name={`markets.${index}.budgetPerYear.${yearIndex}`}
                                      type="number"
                                      placeholder={`Budget for ${year}`}
                                      className="w-full rounded-md border px-3 py-2"
                                    />
                                    <div className="flex w-full items-center justify-center rounded-md border px-3 py-2">
                                      Result
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </FieldArray>
                        )}
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="rounded-md bg-red-500 px-2 py-1 text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
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
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
                  >
                    Add Market
                  </button>
                </div>
              )}
            </FieldArray>
            <button
              type="submit"
              className="w-full rounded-md bg-green-500 px-4 py-2 text-white"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default BudgetForm
