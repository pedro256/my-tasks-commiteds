'use client';
import ReactSelect, { Props as ReactSelectProps } from "react-select";

export default function Select<T = { label: string; value: string }>(props: ReactSelectProps<T>){
    return <ReactSelect {...props} />;
}