import React from 'react';

import './header.style.scss';
import MenuComponent from '../menu/menu.component';

const HeaderComponent = () => {
    return(
        <header id="header">
            <nav id="nav">
                <div className="header-icon">
                    <p>
                        <a>Some Logo</a>
                    </p>
                </div>
                <div className="menu">
                    <MenuComponent/>
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent;