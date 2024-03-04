import { useState } from "react";
import './css/FloatInput.css';
import { FloatFormProps } from "./types/float-input-type";

const FloatInput: React.FC<FloatFormProps & { [prop: string]: any }> = ({ inputText,
    handleChange,
    labelText,
    type,
    id,
    ...otherProps 
}) => {

    const [active, setActive] = useState(false);
    return (
        <div className="form-group-float">
            <label
                htmlFor={id}
                className={`${active || inputText !== "" ? ` activeLabel` : ""
                    } label-float`}
            >
                {labelText}
            </label>
            <input
                type={type}
                className="form-input-float"
                id={id}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                onChange={handleChange}
                value={inputText}
                {...otherProps}
            />
        </div>
    );
};

export default FloatInput;