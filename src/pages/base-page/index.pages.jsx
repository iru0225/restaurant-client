import React, {useEffect, useState} from 'react';
import './index.style.scss';

import HeaderComponent from '../../components/header/header.component';
import RestaurantList from '../../components/restaurant-list/restaurant-list.component';
import InputComponent from '../../components/input/input.component';
import SelectComponent from '../../components/select/select.component';



const IndexPage = () => {
    const [hour, setHour] = useState([]);
    const [minute, setMinute] = useState([]);
    const [ampm, setAmpm] = useState(['AM', 'PM']);

    useEffect(() => {
        let hours = [];
        let minutes = [];

        for (let i = 0; i <= 12; i++) {
            let temp = null;
            if (i.length < 2) {
                temp = {value: `0${i}`}
                return hours.push(temp);
            }

            temp = {value: `${i}`};
            hours.push(temp);
        }

        for (let i = 0; i <= 59; i++) {
            let temp = null;
            if (i.length < 2) {
                temp = {value: `0${i}`}
                return minutes.push(temp);
            }

            temp = {value: `${i}`};
            minutes.push(temp);
        }

        setHour(hours);
        setMinute(minutes);
    }, [])
    

    const testFunction = (val) => {
        console.log(val);
    }

    return(
        <div className="base-page">
            <HeaderComponent/>
            <div className="content">
                <div className="search">
                    <InputComponent
                        type={'date'}
                        parentCallback={testFunction}
                        labelName={'Booking Date'}
                    />
                    <SelectComponent
                        labelName={'Hour'}
                        items={hour}
                    />
                    <SelectComponent
                        labelName={'Minute'}
                        items={minute}
                    />
                    <SelectComponent
                        labelName={'AM/PM'}
                        items={ampm}
                    />
                </div>
                <RestaurantList/>
            </div>
        </div>
    )
}

export default IndexPage