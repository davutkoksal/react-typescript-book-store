/* eslint-disable no-restricted-globals */
import React from "react";
interface FormInputProps {
  inputName: string;
  label: string;
  value: string;
  className?: string;
  placeholder: string;
  handleChange: (e: any) => void;
  errorMessage:string
}
const FormInput = ({
  label,
  placeholder,
  handleChange,
  value,
  inputName,
  errorMessage,
}: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="ml-1" htmlFor={inputName}>
        {label}
      </label>
      <input
        name={inputName}
        onChange={handleChange}
        className="h-[40px] border border-gray-200 rounded-xl px-3"
        placeholder={placeholder}
        value={value}
      />
      <p>{errorMessage}</p>
    </div>
  );
};

export default FormInput;
