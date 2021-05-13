import React, {useState} from 'react';
import  ClickAwayListener from 'react-click-away-listener';
import './select.style.scss';

const SelectComponent = ({optionList, selectLabel, parentCallback}) => {
    const [open, setOpen] = useState(false);
    const [selectData, setSelectData] = useState(null);

    const handleClickAway = () => {
        setOpen(false);
    }

    const openClose = () => {
        let openList = !open;
        setOpen(openList);
    }

    const selectedData = async (e) => {
        let data = {id: e.target.getAttribute('data'), label: e.target.innerText};
        await setSelectData(data);
        parentCallback(data)
        openClose();
    }
    
    return(
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="select-wrapper">
                <div className="select-group" onClick={openClose}>
                    <input type="text" readOnly required value={selectData ? selectData.label : ''}/>
                    <label className={`label ${selectData || open ? 'focus' : null}`}>{selectLabel}</label>
                    <span className="bar"/>
                </div>
                <div className={`select-dropdown ${open ? 'open' : null}`}>
                    <div className="option-wrapper">
                        {   
                            optionList.length > 0 && optionList !== null ?
                                optionList.map(e => 
                                    <span className="option-list" key={e.id} data={e.id} onClick={selectedData}>{e.label}</span>
                                )
                            :
                                null
                        }
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default SelectComponent;