import { useEffect, useState } from "react"
import { ContractInput } from "./ContractInput"
import { getFunctionInputKey, getInitalTupleArrayFormState } from "./utilsContract"
import { replacer } from "~~/utils/common"

export const TupleArray = ({
  abiTupleParameter,
  setParentForm,
  parentStateObjectKey,
}) => {
  const [form, setForm] = useState(() => getInitalTupleArrayFormState(abiTupleParameter))
  const [additionalInputs, setAdditionalInputs] = useState([abiTupleParameter.components])

  const depth = (abiTupleParameter.type.match(/\[\]/g) || []).length

  useEffect(() => {
    const groupedFields = Object.keys(form).reduce((acc, key) => {
      const [indexPrefix, ...restArray] = key.split("_")
      const componentName = restArray.join("_")
      if (!acc[indexPrefix]) {
        acc[indexPrefix] = {}
      }
      acc[indexPrefix][componentName] = form[key]
      return acc
    }, {})

    let argsArray = []

    Object.keys(groupedFields).forEach(key => {
      const currentKeyValues = Object.values(groupedFields[key])

      const argsStruct = {}
      abiTupleParameter.components.forEach((component, componentIndex) => {
        argsStruct[component.name || `input_${componentIndex}_`] =
          currentKeyValues[componentIndex]
      })

      argsArray.push(argsStruct)
    })

    if (depth > 1) {
      argsArray = argsArray.map(args => {
        return args[abiTupleParameter.components[0].name || "tuple"]
      })
    }

    setParentForm(parentForm => {
      return {
        ...parentForm,
        [parentStateObjectKey]: JSON.stringify(argsArray, replacer),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(form, replacer)])

  const addInput = () => {
    setAdditionalInputs(previousValue => {
      const newAdditionalInputs = [...previousValue, abiTupleParameter.components]

      // Add the new inputs to the form
      setForm(form => {
        const newForm = { ...form }
        abiTupleParameter.components.forEach((component, componentIndex) => {
          const key = getFunctionInputKey(
            `${newAdditionalInputs.length - 1}_${abiTupleParameter.name || "tuple"}`,
            component,
            componentIndex,
          )
          newForm[key] = ""
        })
        return newForm
      })

      return newAdditionalInputs
    })
  }

  const removeInput = () => {
    // Remove the last inputs from the form
    setForm(form => {
      const newForm = { ...form }
      abiTupleParameter.components.forEach((component, componentIndex) => {
        const key = getFunctionInputKey(
          `${additionalInputs.length - 1}_${abiTupleParameter.name || "tuple"}`,
          component,
          componentIndex,
        )
        delete newForm[key]
      })
      return newForm
    })
    setAdditionalInputs(inputs => inputs.slice(0, -1))
  }

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200 pl-4 py-1.5 border-2 border-secondary">
        <input type="checkbox" className="min-h-fit peer" />
        <div className="collapse-title p-0 min-h-fit peer-checked:mb-1 text-primary-content/50">
          <p className="m-0 text-[1rem]">{abiTupleParameter.internalType}</p>
        </div>
        <div className="ml-3 flex-col space-y-2 border-secondary/70 border-l-2 pl-4 collapse-content">
          {additionalInputs.map((additionalInput, additionalIndex) => (
            <div key={additionalIndex} className="space-y-1">
              <span className="badge bg-base-300 badge-sm">
                {depth > 1 ? `${additionalIndex}` : `tuple[${additionalIndex}]`}
              </span>
              <div className="space-y-4">
                {additionalInput.map((param, index) => {
                  const key = getFunctionInputKey(
                    `${additionalIndex}_${abiTupleParameter.name || "tuple"}`,
                    param,
                    index,
                  )
                  return (
                    <ContractInput
                      setForm={setForm}
                      form={form}
                      key={key}
                      stateObjectKey={key}
                      paramType={param}
                    />
                  )
                })}
              </div>
            </div>
          ))}
          <div className="flex space-x-2">
            <button className="btn btn-sm btn-secondary" onClick={addInput}>
              +
            </button>
            {additionalInputs.length > 0 && (
              <button className="btn btn-sm btn-secondary" onClick={removeInput}>
                -
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
