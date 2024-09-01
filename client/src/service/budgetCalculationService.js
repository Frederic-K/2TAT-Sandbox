import Decimal from "decimal.js"

// "penny pinching" algorithm
export function calculateBudget(values) {
  if (new Decimal(values.remainder).gt(0) && values.numberOfHSs > 0) {
    const remainderPerHS = new Decimal(values.remainder).div(values.numberOfHSs)
    const newHSsBudget = new Decimal(values.HS.budget).plus(remainderPerHS)

    const startDate = new Date(values.HS.startDate)
    const endDate = new Date(values.HS.endDate)
    const totalMonths = new Decimal(
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        endDate.getMonth() -
        startDate.getMonth() +
        1,
    )

    const remainderPerMonth = remainderPerHS.div(totalMonths)

    const updatedBudgetPerYear = []
    let currentYear = startDate.getFullYear()
    let monthsInCurrentYear = 12 - startDate.getMonth()
    let accumulatedFraction = new Decimal(0)

    while (currentYear <= endDate.getFullYear()) {
      if (currentYear === endDate.getFullYear()) {
        monthsInCurrentYear = endDate.getMonth() - startDate.getMonth() + 1
      } else if (currentYear > startDate.getFullYear()) {
        monthsInCurrentYear = 12
      }

      const yearIndex = currentYear - startDate.getFullYear()
      const initialBudget = new Decimal(values.HS.budgetPerYear[yearIndex] || 0)
      const yearBudget = initialBudget.plus(
        remainderPerMonth.times(monthsInCurrentYear),
      )

      updatedBudgetPerYear[yearIndex] = yearBudget.floor()
      accumulatedFraction = accumulatedFraction.plus(
        yearBudget.minus(updatedBudgetPerYear[yearIndex]),
      )

      currentYear++
    }

    const lastIndex = updatedBudgetPerYear.length - 1
    updatedBudgetPerYear[lastIndex] =
      updatedBudgetPerYear[lastIndex].plus(accumulatedFraction)

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
