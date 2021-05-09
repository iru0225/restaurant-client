import React from 'react';
import './index.style.scss';

class IndexPage extends React.Component{

    render(){
        return(
            <div className="base-page">
                <header className="header">
                    <nav className="header-nav">
                        <h2>Some Logo</h2>

                        <div className="user">
                            <div className="order">
                                Some order
                            </div>
                            <div className="user-setting">
                                User setting
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="content">
                    <h1>web content</h1>
                </div>
            </div>
        )
    }
}

export default IndexPage