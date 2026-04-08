import React from "react";
import { FieldError } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormCheckboxGroupProps = {
  label?: string;
  name: string;
  options: Option[];
  error?: FieldError;
};

const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  label,
  name,
  options,
  error,
}) => {
  return (
    <div>
      {label && <label className="block font-medium mb-2">{label}</label>}
      <div className="space-y-1">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={opt.value}
              id={`${name}-${opt.value}`}
            />
            <label htmlFor={`${name}-${opt.value}`}>{opt.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 mt-1 text-xs">{error.message}</p>}
    </div>
  );
};

export default FormCheckboxGroup;
