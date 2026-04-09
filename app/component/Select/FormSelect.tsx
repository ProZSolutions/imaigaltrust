import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type FormSelectProps = {
  label?: string;
  options: Option[];
  error?: FieldError;
  registration: UseFormRegisterReturn;
};

const FormSelect: React.FC<FormSelectProps> = ({ label, options, error, registration }) => {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <select {...registration} className="border p-2 w-full rounded">
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 mt-1 text-xs">{error.message}</p>}
    </div>
  );
};

export default FormSelect;
