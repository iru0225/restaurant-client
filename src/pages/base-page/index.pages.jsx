import React, {useEffect, useState, useRef, useCallback} from 'react';
import moment from 'moment';
import axios from 'axios';
import './index.style.scss';

import HeaderComponent from '../../components/header/header.component';
import ItemCardComponent from '../../components/item-card/item-card.component'
import InputComponent from '../../components/input/input.component';
import SelectComponent from '../../components/select/select.component';



const IndexPage = () => {
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [ampm, setAmpm] = useState([{id: 1, label: 'AM'}, {id:2, label:'PM'}]);
    const [date, setDate] = useState(null);
    const [day, setDay] = useState(null);
    const [hour, setHour] = useState(null)
    const [minute, setMinute] = useState(null);
    const [amOPm, setamOPm] = useState(null);
    const [itemList, setItemList] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setItemList([])
    }, [date, hour, minute, amOPm])

    useEffect(() => {
        if (hour && minute && date && amOPm) {
            let hours = null;
            let minutes = minute;

            if (amOPm.label === 'PM') {
                if (hour.label === '00') {
                    hours = hour.label;
                }else if (hour.label === '12') {
                    hours = '00';
                    console.log(hours);
                    return;
                } else {
                    hours = parseInt(hour.label) + 12;   
                }
            } else{
                hours = hour.label;
            }

            let time = `${hours}:${minutes.label}:00`;

            
            axios({
                method: 'GET',
                url: `http://localhost:8080/api/restaurant/${day}.${time}.${offset}`
            }).then((result) => {
                setItemList(itemList.concat(result.data))
            }).catch((err) => {
                console.log(err);
            })   
        }
    }, [offset])

    useEffect(() => {
        let hours = [];
        let minutes = [];

        for (let i = 0; i <= 12; i++) {
            let temp = null;
            let index = i.toString();

            if (index.length < 2) {
                temp = {id: `0${i}`, label: `0${i}`}
                hours.push(temp);
                
            } else {
                temp = {id: `${i}`, label: `${i}`};
                hours.push(temp);
            }
        }

        for (let i = 0; i <= 59; i++) {
            let temp = null;
            let index = i.toString();

            if (index.length < 2) {
                temp = {id: `0${i}`, label: `0${i}`}
                minutes.push(temp);
                
            } else {
                temp = {id: `${i}`, label: `${i}`};
                minutes.push(temp);
            }
        }

        setHours(hours);
        setMinutes(minutes);
    }, [])

    const observer = useRef();
    const lastElemet = useCallback(node => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset(itemList.length + 20);
            }
        })

        if(node){
            observer.current.observe(node)
        }
    }, [offset])    

    const checkDate = (val) => {
        let date = val;
        let day = moment(val).format('ddd');

        setDate(date);
        setDay(day.toLocaleLowerCase());
    }

    const searchData = () => {
        let hours = null;
        let minutes = minute;

        if (amOPm.label === 'PM') {
            if (hour.label === '00') {
                hours = hour.label;
            }else if (hour.label === '12') {
                hours = '00';
                console.log(hours);
                return;
            } else {
                hours = parseInt(hour.label) + 12;   
            }
        } else{
            hours = hour.label;
        }

        let time = `${hours}:${minutes.label}:00`;

        axios({
            method: 'GET',
            url: `http://localhost:8080/api/restaurant/${day}.${time}.0`
        }).then((result) => {
            setItemList(result.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className="base-page">
            <HeaderComponent/>
            <div className="content">
                <div className="search">
                    <InputComponent
                        type={'date'}
                        parentCallback={checkDate}
                        labelName={'Booking Date'}
                    />
                    <SelectComponent
                        optionList={hours}
                        selectLabel={'Hour'}
                        parentCallback={(val) => setHour(val)}
                    />
                    <SelectComponent
                        optionList={minutes}
                        selectLabel={'Minute'}
                        parentCallback={(val) => setMinute(val)}
                    />
                    <SelectComponent
                        optionList={ampm}
                        selectLabel={'AM/PM'}
                        parentCallback={(val) => setamOPm(val)}
                    />
                    <div className="button" onClick={searchData}>
                        <span>Search</span>
                    </div>
                </div>
                <div className="list-wrapper">
                    {   
                        itemList.length > 0 ?
                        itemList.map((e, index) => {
                            if (itemList.length === index + 1) {
                                return(
                                    <div className="item-container" key={e.id} ref={lastElemet} data={e.id}>
                                        <ItemCardComponent item={e}/>
                                    </div>
                                )
                            } else {
                                return(
                                    <div className="item-container" key={e.id} data={e.id}>
                                        <ItemCardComponent item={e}/>
                                    </div>
                                )
                            }
                        }) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default IndexPage