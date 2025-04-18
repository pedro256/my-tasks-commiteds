"use client";
import "./styles.module.css";
import Skelleton from "../skelleton/Skelleton";
import ReactSelect, { MultiValue, SingleValue } from "react-select";

export interface ISelectOption {
  label: string;
  value: string;
}

interface IPropsSelect{
  options?: ISelectOption[];
  label?: string;
  value?: MultiValue<ISelectOption> | SingleValue<ISelectOption>
  loading?: boolean;
  onSelect?: (value: MultiValue<ISelectOption> | SingleValue<ISelectOption>) => void;
  isMulti?:boolean
  
}

export default function Select({
  options,
  label,
  loading,
  isMulti,
  onSelect,
  value
}: IPropsSelect) {
  if (loading) {
    return <Skelleton className="w-full h-12" />;
  }
  return (
    <div className="relative w-full">
      <label htmlFor="">{label}</label>
      <ReactSelect
        className="app-combobox-container"
        classNamePrefix="app-combobox"
        isMulti={isMulti}
        value={value}
        styles={{
          menu: (base) => ({
            ...base,
            backgroundColor: "transparent",
            zIndex: 9999,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "gray"
              : state.isFocused
              ? "gray"
              : "white",
            color: "black",
            cursor: "pointer",
          }),
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "gray" : "#ccc",
            backgroundColor: "white",
            color: "black",
          }),
          singleValue: (base) => ({
            ...base,
            color: "black",
          }),
          input: (base) => ({
            ...base,
            color: "black",
          }),
        }}
        options={options}
        onChange={(v)=>{onSelect?.(v)}}
      />
    </div>
  );
}
