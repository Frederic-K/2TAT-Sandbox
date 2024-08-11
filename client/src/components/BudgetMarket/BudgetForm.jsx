
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  initialBudget: Yup.number().required('Initial budget is required'),
  goalBudget: Yup.number().required('Goal budget is required'),
  remainder: Yup.number().required('Remainder is required'),
  numberOfMarkets: Yup.number().required('Number of markets is required').min(1),
  markets: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Market name is required'),
      budget: Yup.number().required('Market budget is required'),
      startYear: Yup.number().required('Start year is required'),
      endYear: Yup.number().required('End year is required').min(Yup.ref('startYear')),
      budgetPerYear: Yup.array().of(Yup.number().required('Budget per year is required'))
    })
  )
});

const BudgetForm = () => {
    return (
      <Formik
        initialValues={{
          initialBudget: 0,
          goalBudget: 0,
          remainder: 0,
          numberOfMarkets: 1,
          markets: [{ name: '', budget: 0, startYear: new Date().getFullYear(), endYear: new Date().getFullYear(), budgetPerYear: [] }]
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="max-w-lg mx-auto mt-8 space-y-6">
            <div className="space-y-4">
              <Field name="initialBudget" type="number" placeholder="Initial Budget" className="w-full px-3 py-2 border rounded-md" />
              {errors.initialBudget && touched.initialBudget && <div className="text-red-500 text-sm">{errors.initialBudget}</div>}
  
              <Field name="goalBudget" type="number" placeholder="Goal Budget" className="w-full px-3 py-2 border rounded-md" />
              {errors.goalBudget && touched.goalBudget && <div className="text-red-500 text-sm">{errors.goalBudget}</div>}
  
              <Field name="remainder" type="number" placeholder="Remainder" className="w-full px-3 py-2 border rounded-md" />
              {errors.remainder && touched.remainder && <div className="text-red-500 text-sm">{errors.remainder}</div>}
  
              <Field name="numberOfMarkets" type="number" placeholder="Number of Markets" min="1" className="w-full px-3 py-2 border rounded-md" />
              {errors.numberOfMarkets && touched.numberOfMarkets && <div className="text-red-500 text-sm">{errors.numberOfMarkets}</div>}
            </div>
  
            <FieldArray name="markets">
              {({ remove, push }) => (
                <div className="space-y-4">
                  {values.markets.length > 0 &&
                    values.markets.map((market, index) => (
                      <div key={index} className="p-4 border rounded-md space-y-2">
                        <Field name={`markets.${index}.name`} placeholder="Market Name" className="w-full px-3 py-2 border rounded-md" />
                        <Field name={`markets.${index}.budget`} type="number" placeholder="Market Budget" className="w-full px-3 py-2 border rounded-md" />
                        <Field name={`markets.${index}.startYear`} type="number" placeholder="Start Year" className="w-full px-3 py-2 border rounded-md" />
                        <Field name={`markets.${index}.endYear`} type="number" placeholder="End Year" className="w-full px-3 py-2 border rounded-md" />
  
                        {market.startYear && market.endYear && (
                          <FieldArray name={`markets.${index}.budgetPerYear`}>
                            {() => (
                              <div className="space-y-2">
                                {Array.from({ length: market.endYear - market.startYear + 1 }, (_, i) => market.startYear + i).map((year, yearIndex) => (
                                  <Field
                                    key={yearIndex}
                                    name={`markets.${index}.budgetPerYear.${yearIndex}`}
                                    type="number"
                                    placeholder={`Budget for ${year}`}
                                    className="w-full px-3 py-2 border rounded-md"
                                  />
                                ))}
                              </div>
                            )}
                          </FieldArray>
                        )}
  
                        <button type="button" onClick={() => remove(index)} className="px-2 py-1 bg-red-500 text-white rounded-md">
                          Remove
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => push({ name: '', budget: 0, startYear: new Date().getFullYear(), endYear: new Date().getFullYear(), budgetPerYear: [] })}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add Market
                  </button>
                </div>
              )}
            </FieldArray>
  
            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-md">Submit</button>
          </Form>
        )}
      </Formik>
    );
  };

export default BudgetForm;