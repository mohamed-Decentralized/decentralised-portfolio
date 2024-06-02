"use client";

import { Tuple } from "./Tuple";
import { TupleArray } from "./TupleArray";
import { AddressInput, Bytes32Input, BytesInput, InputBase, IntegerInput, IntegerVariant } from "~~/components/eth";

export const ContractInput = ({ setForm, form, stateObjectKey, paramType }) => {
  const inputProps = {
    name: stateObjectKey,
    value: form?.[stateObjectKey],
    placeholder: paramType.name ? `${paramType.type} ${paramType.name}` : paramType.type,
    onChange: value => {
      setForm(form => ({ ...form, [stateObjectKey]: value }));
    },
  };

  const renderInput = () => {
    switch (paramType.type) {
      case "address":
        return <AddressInput {...inputProps} />;
      case "bytes32":
        return <Bytes32Input {...inputProps} />;
      case "bytes":
        return <BytesInput {...inputProps} />;
      case "string":
        return <InputBase {...inputProps} />;
      case "tuple":
        return (
          <Tuple
            setParentForm={setForm}
            parentForm={form}
            abiTupleParameter={paramType}
            parentStateObjectKey={stateObjectKey}
          />
        );
      default:
        if (paramType.type.includes("int") && !paramType.type.includes("[")) {
          return <IntegerInput {...inputProps} variant={paramType.type} />;
        } else if (paramType.type.startsWith("tuple[")) {
          return (
            <TupleArray
              setParentForm={setForm}
              parentForm={form}
              abiTupleParameter={paramType}
              parentStateObjectKey={stateObjectKey}
            />
          );
        } else {
          return <InputBase {...inputProps} />;
        }
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center ml-2">
        {paramType.name && <span className="text-xs font-medium mr-2 leading-none">{paramType.name}</span>}
        <span className="block text-xs font-extralight leading-none">{paramType.type}</span>
      </div>
      {renderInput()}
    </div>
  );
};
