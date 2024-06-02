const getFunctionInputKey = (functionName, input, inputIndex) => {
  const name = input?.name || `input_${inputIndex}_`;
  return functionName + "_" + name + "_" + input.internalType + "_" + input.type;
};

const isJsonString = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const deepParseValues = value => {
  if (typeof value === "string") {
    if (isJsonString(value)) {
      const parsed = JSON.parse(value);
      return deepParseValues(parsed);
    } else {
      return value;
    }
  } else if (Array.isArray(value)) {
    return value.map(element => deepParseValues(element));
  } else if (typeof value === "object" && value !== null) {
    return Object.entries(value).reduce((acc, [key, val]) => {
      acc[key] = deepParseValues(val);
      return acc;
    }, {});
  }

  if (value === "true" || value === "1" || value === "0x1" || value === "0x01" || value === "0x0001") {
    return true;
  } else if (value === "false" || value === "0" || value === "0x0" || value === "0x00" || value === "0x0000") {
    return false;
  }

  return value;
};

const getParsedContractFunctionArgs = form => {
  return Object.keys(form).map(key => {
    const valueOfArg = form[key];
    return deepParseValues(valueOfArg);
  });
};

const getInitialFormState = abiFunction => {
  const initialForm = {};
  if (!abiFunction.inputs) return initialForm;
  abiFunction.inputs.forEach((input, inputIndex) => {
    const key = getFunctionInputKey(abiFunction.name, input, inputIndex);
    initialForm[key] = "";
  });
  return initialForm;
};

const getInitalTupleFormState = abiTupleParameter => {
  const initialForm = {};
  if (abiTupleParameter.components.length === 0) return initialForm;

  abiTupleParameter.components.forEach((component, componentIndex) => {
    const key = getFunctionInputKey(abiTupleParameter.name || "tuple", component, componentIndex);
    initialForm[key] = "";
  });
  return initialForm;
};

const getInitalTupleArrayFormState = abiTupleParameter => {
  const initialForm = {};
  if (abiTupleParameter.components.length === 0) return initialForm;
  abiTupleParameter.components.forEach((component, componentIndex) => {
    const key = getFunctionInputKey("0_" + abiTupleParameter.name || "tuple", component, componentIndex);
    initialForm[key] = "";
  });
  return initialForm;
};

const adjustInput = input => {
  if (input.type.startsWith("tuple[")) {
    const depth = (input.type.match(/\[\]/g) || []).length;
    return {
      ...input,
      components: transformComponents(input.components, depth, {
        internalType: input.internalType || "struct",
        name: input.name,
      }),
    };
  } else if (input.components) {
    return {
      ...input,
      components: input.components.map(value => adjustInput(value)),
    };
  }
  return input;
};

const transformComponents = (components, depth, parentComponentData) => {
  if (depth === 1 || !components) {
    return [...components];
  }

  const wrappedComponents = {
    internalType: `${parentComponentData.internalType || "struct"}`.replace(/\[\]/g, "") + "[]".repeat(depth - 1),
    name: `${parentComponentData.name || "tuple"}`,
    type: `tuple${"[]".repeat(depth - 1)}`,
    components: transformComponents(components, depth - 1, parentComponentData),
  };

  return [wrappedComponents];
};

const transformAbiFunction = abiFunction => {
  return {
    ...abiFunction,
    inputs: abiFunction.inputs.map(value => adjustInput(value)),
  };
};

export {
  getFunctionInputKey,
  getInitialFormState,
  getParsedContractFunctionArgs,
  getInitalTupleFormState,
  getInitalTupleArrayFormState,
  transformAbiFunction,
};
