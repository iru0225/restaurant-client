import React, {useState} from 'react';
import './input.style.scss';

const InputComponent = ({groupClass, type, maxLength, parentCallback, labelName}) => {
    const [currentValue, setCurrentValue] = useState(null);
    // const [oldValue, setOldValue] = useState(null);

    const inputFunction = (e) => {
        if (type === 'number') {
            if (maxLength && maxLength > 0) {
                if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= maxLength) {
                    setCurrentValue(e.target.value);
                    parentCallback(e.target.value);
                    return;
                }
                
                e.target.value = currentValue;
                parentCallback(currentValue);
                return;
            } else {
                if (/^[0-9]*$/.test(e.target.value)) {
                    setCurrentValue(e.target.value);
                    parentCallback(e.target.value);
                    return
                }

                e.target.value = currentValue;
                parentCallback(currentValue);
                return;
            }
        }

        parentCallback(e.target.value);
    }
    
    return(
        <div className={`group  ${groupClass}`}>
            <div className="form-group">
                <input type={`${type === 'number' ? 'text' : type}`} className={type} onInput={inputFunction} required/>
                <span className="bar"></span>
                <label>{labelName}</label>
            </div>
        </div>
    )
}

export default InputComponent