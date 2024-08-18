import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
  remainder: Yup.string().required("Remainder is required"),
  numberOfEHs: Yup.number().required("Number of EHs is required").min(0),
  EH: Yup.object().shape({
    budget: Yup.string().required("EH budget is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after the start date"),
    budgetPerYear: Yup.array().of(
      Yup.string().required("Budget per year is required"),
    ),
  }),
})
