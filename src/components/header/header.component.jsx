import React from 'react';
import { Link } from 'react-router-dom';

import './header.style.scss';

const HeaderComponent = ({logout, user}) => {

    const logoutHandle = (e) => {
        e.preventDefault();
        logout(null);
    }
    return(
        <header id="header">
            <nav id="nav">
                <div className="header-icon">
                    <p>
                        <Link to="/">Some Logo</Link>
                    </p>
                </div>
                <div className="menu">
                    <div className="nav-user-order">
                        <div className="nav-order">
                            <Link to="/order_history">Order History</Link>
                        </div>
                        <div className="nav-order">
                            {
                                user ? <span onClick={logoutHandle}>Signout</span> : <Link to="/signin">Signin</Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent;