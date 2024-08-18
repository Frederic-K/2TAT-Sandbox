// "penny pinching" algorithm
import Decimal from "decimal.js"

export function calculateBudget(values) {
  if (new Decimal(values.remainder).gt(0) && values.numberOfEHs > 0) {
    const remainderPerEH = new Decimal(values.remainder).div(values.numberOfEHs)
    const newEHsBudget = new Decimal(values.EH.budget).plus(remainderPerEH)

    const startDate = new Date(values.EH.startDate)
    const endDate = new Date(values.EH.endDate)
    const totalMonths = new Decimal(
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        endDate.getMonth() -
        startDate.getMonth() +
        1,
    )

    const remainderPerMonth = remainderPerEH.div(totalMonths)

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
      const initialBudget = new Decimal(values.EH.budgetPerYear[yearIndex] || 0)
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
      calculatedBudget: newEHsBudget.toString(),
      calculatedBudgetPerYear: updatedBudgetPerYear.map((d) => d.toString()),
      remainder: new Decimal(values.remainder).minus(remainderPerEH).toString(),
      numberOfEHs: values.numberOfEHs - 1,
      currentEHNumber: values.currentEHNumber + 1,
    }
  }
  return null
}
