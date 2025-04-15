import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, IPropsInput>(
  ({ label, ...props }, ref) => {
    return (
      <div>
        {label && <label htmlFor={props.id}>{label}</label>}
        <br></br>
        <input
          {...props}
          id={props.id}
          ref={ref}
          className={twMerge(" p-1 border rounded-md w-full", props.className)}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
