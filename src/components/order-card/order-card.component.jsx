import React from 'react';
import moment from 'moment';
import './order-card.style.scss';

const OrderCard = ({items, clickHandle}) => {
    const parentCallback = () => {
        clickHandle(items.id);
    }

    return(
        <>
        <div className="history-wrapper">
            <div className="order-header">
                <span className="order-id">Order Id: {items.id}</span>
                <span>Order date: {moment(items.createdAt).format('DD-MM-YYYY h:mm:ss A')}</span>
            </div>
            <div className="order-detail">
                <span>Restaurant: {items.orderitems[0].restaurant.name}</span>
                <h4>Total: {items.total}</h4>
            </div>
            <div className="view-detail">
                <span onClick={parentCallback}>View Detail</span>
            </div>
        </div>
        </>
    )
}

export default OrderCard