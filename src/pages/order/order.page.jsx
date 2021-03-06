import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import './order.style.scss';

import OrderCard from '../../components/order-card/order-card.component';
import Modal from '../../components/modal/modal.component';

const OrderPage = ({user}) => {
    const [orderList, setOrderList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const [selectOrder, setSelectOrder] = useState(null);

    const observer = useRef();
    const lastElement = useCallback(node => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setOffset(orderList.length);
            }
        })

        if (node) {
            observer.current.observe(node);
        }
    }, [orderList])

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/order/${user.id}.${offset}`
        }).then(res => {
            setOrderList(oldVal => {
                return oldVal.concat(res.data)
            });
        }).catch(err => {
            console.log(err);
        })
    }, [offset])

    const openModal = (val)  => {
        let data = orderList.find(e => e.id === val)
        setSelectOrder(data);
        setIsOpen(true);
    }

    return(
        <div>
            <h1>Order History</h1>
            <div className="list-wrapper">
                {
                    orderList.length > 0 ?
                    orderList.map((e, index) => {
                        if (orderList.length === index + 1) {
                            return(
                                <div key={`${e.id}${Math.random()}`} ref={lastElement}>
                                    <OrderCard items={e} clickHandle={openModal}/>
                                </div>
                            )
                        } else{
                            return(
                                <div key={`${e.id}${Math.random()}`}>
                                    <OrderCard items={e} clickHandle={openModal}/>
                                </div>
                            )
                        }
                    }) : <span>Order Empty</span>
                }
            </div>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {
                    selectOrder ?
                    <div className="detail-order">
                        <div className="detail-order-id">
                            <span>Orde Id: {selectOrder.id}</span>
                            <div className="booking-detail">
                                <span>Restaurant: {selectOrder.orderitems[0].restaurant.name}</span>
                                <span>Booking Date: {moment(selectOrder.order_date).format('DD MMMM YYYY hh:mm A')}</span>
                            </div>
                        </div>
                        <div className="detail-order-item">
                            <div className="detail-items-header">
                                <span>Menu</span>
                                <span>Price & Qty</span>
                                <span>Sub Total</span>
                            </div>
                            {
                                selectOrder.orderitems.map(e => {
                                    return(
                                        <div key={`${Math.random()}${selectOrder.id}`} className="detail-items">
                                            <span>{e.item}</span>
                                            <span>{e.qty} x {e.currency} {e.price}</span>
                                            <span>{e.currency} {e.subtotal}</span>
                                        </div>
                                    )
                                })
                            }
                            <div className="total-price">
                                <h4>Total: {selectOrder.orderitems[0].currency} {selectOrder.total}</h4>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </Modal>
        </div>
    )
}

export default OrderPage