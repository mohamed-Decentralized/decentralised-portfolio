import { WriteOnlyFunctionForm } from "~~/app/debug/_components/contract";

export const ContractWriteMethods = ({ onChange, deployedContractData }) => {
  if (!deployedContractData) {
    return null;
  }

  const functionsToDisplay = deployedContractData.abi
    .filter(part => part.type === "function")
    .filter(fn => {
      const isWriteableFunction = fn.stateMutability !== "view" && fn.stateMutability !== "pure";
      return isWriteableFunction;
    })
    .map(fn => {
      return {
        fn,
        inheritedFrom: deployedContractData?.inheritedFunctions?.[fn.name],
      };
    })
    .sort((a, b) => (b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1));

  if (!functionsToDisplay.length) {
    return <>No write methods</>;
  }

  return (
    <>
      {functionsToDisplay.map(({ fn, inheritedFrom }, idx) => (
        <WriteOnlyFunctionForm
          abi={deployedContractData.abi}
          key={`${fn.name}-${idx}}`}
          abiFunction={fn}
          onChange={onChange}
          contractAddress={deployedContractData.address}
          inheritedFrom={inheritedFrom}
        />
      ))}
    </>
  );
};
