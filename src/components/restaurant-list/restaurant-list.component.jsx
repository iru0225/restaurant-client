import React from 'react';
import './restaurant-list.style.scss';

const RestaurantList = () => {
    return(
        <div className="list-wrapper">
            <div className="item-cart">
                <div className="item-detail">
                    <span><h3>Resto Name1</h3></span>
                    <span>Off Days: Sun & Fri</span>
                    <span>Open Hours: 10:00 AM ~ 09:00PM</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantList;