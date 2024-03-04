import { ChangeEventHandler } from "react";

export type FloatFormProps = {
    inputText: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    labelText: string;
    type: "text" | "password" | "number" | "date";
    id: string;
  };