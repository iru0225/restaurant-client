import React, {useEffect, useState, useRef, useCallback} from 'react';
import moment from 'moment';
import axios from 'axios';
import './index.style.scss';

import HeaderComponent from '../../components/header/header.component';
import ItemCardComponent from '../../components/item-card/item-card.component'
import InputComponent from '../../components/input/input.component';
import SelectComponent from '../../components/select/select.component';
import Modal from '../../components/modal/modal.component';
import Cart from '../../components/cart/cart.component';

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
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectItem, setSelectItem] = useState(null);
    const [orderItem, setOrderItem] = useState([]);

    useEffect(() => {
        if (isOpen) {
            return
        }
        setItemList([])
        setSelectItem([])
        setOrderItem([])
        
    }, [date, hour, minute, amOPm, isOpen])

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
    const lastElement = useCallback(node => {
        if(loading) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setOffset(itemList.length);
            }
        })

        if (node) {
            observer.current.observe(node);
        }
    }, [itemList])

    useEffect(() => {
        if (hour && minute && amOPm) {
            let time = moment(`${hour.label}:${minute.label} ${amOPm.label}`, 'hh:mm A').format('HH:mm:ss');

            axios({
                method: 'get',
                url: `http://localhost:8080/api/restaurant/${day}.${time}.${offset}`
            }).then(res => {
                let ids = new Set(itemList.map(d => d.id));
                setItemList(oldVal => {
                    return [...oldVal, ...res.data.filter(d => !ids.has(d.id))]
                });
            }).catch(err => {
                console.log(err);
            })   
        }
    }, [offset]);    

    const checkDate = (val) => {
        let date = val;
        let day = moment(val).format('ddd');

        setDate(date);
        setDay(day.toLocaleLowerCase());
    }

    const searchData = () => {
        setLoading(true);
        let time = moment(`${hour.label}:${minute.label} ${amOPm.label}`, 'hh:mm A').format('HH:mm:ss');

        axios({
            method: 'GET',
            url: `http://localhost:8080/api/restaurant/${day}.${time}.0`
        }).then((result) => {
            setItemList(result.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(true);
        })
    }

    const openModal = (e) => {
        let id = e.currentTarget.getAttribute('data');
        let data = itemList.filter(item => item.id === parseInt(id));

        data = data.map(e => {
            let temp = Object.assign({}, e)
            temp.setOne = e.setOne.split(' - ');
            temp.setTwo = e.setTwo.split(' - ');
            temp.setThree = e.setThree.split(' - ');
            temp.setFour = e.setFour.split(' - ');
            temp.setFive = e.setFive.split(' - ');
            return temp;
        });
    
        setSelectItem(data[0]);
        setIsOpen(true);
    }

    const addOrderItem = (e) => {
        let restoid = e.getAttribute('restoid');
        let menu = e.getAttribute('menu');
        let price = e.getAttribute('price');
        let currency = e.getAttribute('currency');
        if (orderItem.length > 0) {
            let duplicate = orderItem.find(item => {
                return item.restoid === parseInt(restoid) && item.menu === menu;
            })

            if (duplicate) {
                setOrderItem(orderItem.map(e => e.restoid === parseInt(restoid) && e.menu === menu ? {...duplicate, qty: duplicate.qty + 1} : e))
                return;
            }
        }

        let data = {
            restoid: parseInt(restoid),
            menu: menu,
            price: parseInt(price),
            currency: currency,
            qty: 1
        };

        setOrderItem(oldData => {
            return [...oldData, data]
        });
    }

    const reduceCart = (e) => {
        let restoid = e.getAttribute('restoid');
        let menu = e.getAttribute('menu');
        let price = e.getAttribute('price');
        let currency = e.getAttribute('currency');
        if (orderItem.length > 0) {
            let duplicate = orderItem.find(item => {
                return item.restoid === parseInt(restoid) && item.menu === menu;
            })

            if (duplicate) {
                if (duplicate.qty === 1) {
                    setOrderItem(orderItem.filter(e => e.restoid !== parseInt(restoid) && e.menu !== menu));
                    return
                }
                setOrderItem(orderItem.map(e => e.restoid === parseInt(restoid) && e.menu === menu ? {...duplicate, qty: duplicate.qty - 1} : e))
                return;
            }
        }

        let data = {
            restoid: parseInt(restoid),
            menu: menu,
            price: parseInt(price),
            currency: currency,
            qty: 1
        };

        setOrderItem(oldData => {
            return [...oldData, data]
        });
    }

    const processOrder = () => {
        console.log(orderItem);
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
                                    <div className="item-container" key={e.id} ref={lastElement} data={e.id} onClick={openModal}>
                                        <ItemCardComponent item={e}/>
                                    </div>
                                )
                            } else {
                                return(
                                    <div className="item-container" key={e.id} data={e.id} onClick={openModal}>
                                        <ItemCardComponent item={e}/>
                                    </div>
                                )
                            }
                        }) : null
                    }
                </div>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <Cart items={selectItem} cart={orderItem} addCart={addOrderItem} reduceCart={reduceCart} processOrder={processOrder}/>
                </Modal>
            </div>
        </div>
    )
}

export default IndexPage