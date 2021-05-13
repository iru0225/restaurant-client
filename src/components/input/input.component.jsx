import React, {useState} from 'react';
import moment from 'moment';
import './input.style.scss';

const InputComponent = ({groupClass, type, maxLength, parentCallback, labelName, error, beforeToday}) => {
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
            <div className={`form-group ${error.hasError ? 'error' : null}`}>
                {
                    type === 'date'
                    ?
                        !beforeToday
                        ?
                            <input type={type} className={type} onInput={inputFunction} required/>
                        :
                            <input type={type} min={moment().format('YYYY-MM-DD')} className={type} onInput={inputFunction} required/>
                    :
                        <input type={`${type === 'number' ? 'text' : type}`} className={type} onInput={inputFunction} required/>
                }
                <span className={`bar ${error.hasError ? 'error' : null}`}></span>
                <label>{labelName}</label>
            </div>
            {
                error.hasError ?
                    <span style={{color: '#DA3D26'}}>{error.message}</span>
                :
                    null
            }
        </div>
    )
}

export default InputComponent