import Decimal from "decimal.js"

// "penny pinching" algorithm
export function calculateBudget(values) {
  if (new Decimal(values.remainder).gt(0) && values.numberOfHSs > 0) {
    const remainderPerHS = new Decimal(values.remainder).div(values.numberOfHSs)
    const newHSsBudget = new Decimal(values.HS.budget).plus(remainderPerHS)

    const startDate = new Date(values.HS.startDate)
    const endDate = new Date(values.HS.endDate)
    endDate.setMonth(endDate.getMonth() + 1, 0) // Set to last day of the selected month

    const totalMonths = new Decimal(
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth()) +
        1,
    )

    console.log(`Start date: ${startDate.toISOString().split("T")[0]}`)
    console.log(`End date: ${endDate.toISOString().split("T")[0]}`)
    console.log(`Total months: ${totalMonths.toString()}`)

    const remainderPerMonth = remainderPerHS.div(totalMonths)

    const updatedBudgetPerYear = []
    let currentYear = startDate.getFullYear()
    let accumulatedFraction = new Decimal(0)
    let totalDistributed = new Decimal(0)

    // Calculate updated budget per year (penny pinching)
    while (currentYear <= endDate.getFullYear()) {
      const yearStartMonth =
        currentYear === startDate.getFullYear() ? startDate.getMonth() : 0
      const yearEndMonth =
        currentYear === endDate.getFullYear() ? endDate.getMonth() : 11
      const monthsInCurrentYear = yearEndMonth - yearStartMonth + 1

      const yearIndex = currentYear - startDate.getFullYear()

      const yearBudget = remainderPerMonth.times(monthsInCurrentYear)

      updatedBudgetPerYear[yearIndex] = yearBudget.floor()
      accumulatedFraction = accumulatedFraction.plus(
        yearBudget.minus(updatedBudgetPerYear[yearIndex]),
      )
      totalDistributed = totalDistributed.plus(updatedBudgetPerYear[yearIndex])

      currentYear++
    }

    // Add all accumulated cents to the last year
    const lastIndex = updatedBudgetPerYear.length - 1
    const remaining = remainderPerHS.minus(totalDistributed)
    updatedBudgetPerYear[lastIndex] =
      updatedBudgetPerYear[lastIndex].plus(remaining)

    return {
      calculatedBudget: newHSsBudget.toString(),
      calculatedBudgetPerYear: updatedBudgetPerYear.map((d) => d.toString()),
      remainder: new Decimal(values.remainder).minus(remainderPerHS).toString(),
      numberOfHSs: values.numberOfHSs - 1,
      currentHSNumber: values.currentHSNumber + 1,
    }
  }
  return null
}

// ORIGINAL Version with : Distribute the accumulated fraction among the years nd adding remaining cents to the last year.
// import Decimal from "decimal.js"

// // "penny pinching" algorithm
// export function calculateBudget(values) {
//   if (new Decimal(values.remainder).gt(0) && values.numberOfHSs > 0) {
//     const remainderPerHS = new Decimal(values.remainder).div(values.numberOfHSs)
//     const newHSsBudget = new Decimal(values.HS.budget).plus(remainderPerHS)

//     const startDate = new Date(values.HS.startDate)
//     const endDate = new Date(values.HS.endDate)
//     endDate.setMonth(endDate.getMonth() + 1, 0) // Set to last day of the selected month

//     const totalMonths = new Decimal(
//       (endDate.getFullYear() - startDate.getFullYear()) * 12 +
//         (endDate.getMonth() - startDate.getMonth()) +
//         1,
//     )

//     console.log(`Start date: ${startDate.toISOString().split("T")[0]}`)
//     console.log(`End date: ${endDate.toISOString().split("T")[0]}`)
//     console.log(`Total months: ${totalMonths.toString()}`)

//     const remainderPerMonth = remainderPerHS.div(totalMonths)

//     const updatedBudgetPerYear = []
//     let currentYear = startDate.getFullYear()
//     let accumulatedFraction = new Decimal(0)
//     let totalDistributed = new Decimal(0)

//     // Calculate updated budget per year
//     while (currentYear <= endDate.getFullYear()) {
//       const yearStartMonth =
//         currentYear === startDate.getFullYear() ? startDate.getMonth() : 0
//       const yearEndMonth =
//         currentYear === endDate.getFullYear() ? endDate.getMonth() : 11
//       const monthsInCurrentYear = yearEndMonth - yearStartMonth + 1

//       const yearIndex = currentYear - startDate.getFullYear()

//       const yearBudget = remainderPerMonth.times(monthsInCurrentYear)

//       updatedBudgetPerYear[yearIndex] = yearBudget.floor()
//       accumulatedFraction = accumulatedFraction.plus(
//         yearBudget.minus(updatedBudgetPerYear[yearIndex]),
//       )
//       totalDistributed = totalDistributed.plus(updatedBudgetPerYear[yearIndex])

//       currentYear++
//     }

//     // Distribute the accumulated fraction
//     let remainingCents = accumulatedFraction.floor()
//     for (
//       let i = 0;
//       i < updatedBudgetPerYear.length && remainingCents.gt(0);
//       i++
//     ) {
//       updatedBudgetPerYear[i] = updatedBudgetPerYear[i].plus(1)
//       remainingCents = remainingCents.minus(1)
//       totalDistributed = totalDistributed.plus(1)
//     }

//     // Add any remaining cents to the last year
//     const lastIndex = updatedBudgetPerYear.length - 1
//     const remaining = remainderPerHS.minus(totalDistributed)
//     updatedBudgetPerYear[lastIndex] =
//       updatedBudgetPerYear[lastIndex].plus(remaining)

//     return {
//       calculatedBudget: newHSsBudget.toString(),
//       calculatedBudgetPerYear: updatedBudgetPerYear.map((d) => d.toString()),
//       remainder: new Decimal(values.remainder).minus(remainderPerHS).toString(),
//       numberOfHSs: values.numberOfHSs - 1,
//       currentHSNumber: values.currentHSNumber + 1,
//     }
//   }
//   return null
// }
