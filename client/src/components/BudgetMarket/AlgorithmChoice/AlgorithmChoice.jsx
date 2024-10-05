// import { Field } from "formik"

// const AlgorithmChoice = () => {
//   return (
//     <div className="mb-4">
//       <label className="mb-2 block font-bold">Choose Algorithm:</label>
//       <div>
//         <label className="mr-4 inline-flex items-center">
//           <Field
//             type="radio"
//             name="algorithmChoice"
//             value="simple"
//             className="mr-2"
//           />
//           Simple (Add all to last year)
//         </label>
//         <label className="inline-flex items-center">
//           <Field
//             type="radio"
//             name="algorithmChoice"
//             value="complex"
//             className="mr-2"
//           />
//           Complex (Distribute and add remaining to last year)
//         </label>
//       </div>
//     </div>
//   )
// }

// export default AlgorithmChoice
import { Field } from "formik"
import Tooltip from "../../Tooltip/Tooltip"

const AlgorithmChoice = () => {
  return (
    <section className="mx-auto mb-4 mt-6 grid max-w-lg gap-4 rounded-md border border-zinc-400 bg-zinc-400/20 p-4">
      <h3 className="text-lg font-semibold text-orange-600">
        Algorithm Selection
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {["simple", "complex"].map((algorithm) => (
          <div key={algorithm} className="flex items-center">
            <Field
              type="radio"
              name="algorithmChoice"
              value={algorithm}
              className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500"
            />
            <label className="flex-grow font-medium text-zinc-700 dark:text-zinc-300">
              {algorithm === "simple" ? "Simple" : "Complex"}
            </label>
            <Tooltip
              content={
                algorithm === "simple"
                  ? "Add all to last year"
                  : "Distribute and add remaining to last year"
              }
            >
              <span className="ml-2 cursor-help text-sm text-zinc-500 dark:text-zinc-400">
                ⓘ
              </span>
            </Tooltip>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AlgorithmChoice
