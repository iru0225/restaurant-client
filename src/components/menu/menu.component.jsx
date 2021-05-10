import React, {useEffect, useState} from 'react';

import './menu.style.scss'

const MenuComponent = () => {
    return(
        <>
            <div className="nav-user-order">
                <div className="nav-order">
                    <span>Order History</span>
                </div>
                <div className="nav-user">
                    <i className="far fa-user"></i>
                </div>
            </div>
        </>
    )
}

export default MenuComponent