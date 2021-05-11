import React from 'react';
import './cart.style.scss'

const Cart = (props) => {
    const {items, cart, addCart, reduceCart, processOrder} = props;
    const addCallback = (e) => {
        addCart(e.currentTarget);
    }
    const reduceCallback = (e) => {
        reduceCart(e.currentTarget);
    }

    const totalPrice = cart.reduce((a, c) => a + (c.price * c.qty), 0)

    return(
        <>
            {
                items ? 
                    <div className="modal-wrapper">
                        <div className="title">
                            <h2>{items.name}</h2>
                        </div>
                        <div className="list-menu">
                            <div className="option-list">
                                <span>{items.setOne[0]} - {items.setOne[1]}</span>
                                <button
                                    restoid={items.id}
                                    menu={items.setOne[0]}
                                    price={items.setOne[1].substring(3, items.setOne[1].length)}
                                    currency={items.setOne[1].substring(0,3)}
                                    onClick={addCallback}
                                >
                                    Order Item
                                </button>
                            </div>
                            <div className="option-list">
                                <span>{items.setTwo[0]} - {items.setTwo[1]}</span>
                                <button
                                    restoid={items.id}
                                    menu={items.setTwo[0]}
                                    price={items.setTwo[1].substring(3, items.setTwo[1].length)}
                                    currency={items.setTwo[1].substring(0,3)}
                                    onClick={addCallback}
                                >
                                    Order Item
                                </button>
                            </div>
                            <div className="option-list">
                                <span>{items.setThree[0]} - {items.setThree[1]}</span>
                                <button
                                    restoid={items.id}
                                    menu={items.setThree[0]}
                                    price={items.setThree[1].substring(3, items.setThree[1].length)}
                                    currency={items.setThree[1].substring(0,3)}
                                    onClick={addCallback}
                                >
                                    Order Item
                                </button>
                            </div>
                            <div className="option-list">
                                <span>{items.setFour[0]} - {items.setFour[1]}</span>
                                <button
                                    restoid={items.id}
                                    menu={items.setFour[0]}
                                    price={items.setFour[1].substring(3, items.setFour[1].length)}
                                    currency={items.setFour[1].substring(0,3)}
                                    onClick={addCallback}
                                >
                                    Order Item
                                </button>
                            </div>
                            <div className="option-list">
                                <span>{items.setFive[0]} - {items.setFive[1]}</span>
                                <button
                                    restoid={items.id}
                                    menu={items.setFive[0]}
                                    price={items.setFive[1].substring(3, items.setFive[1].length)}
                                    currency={items.setFive[1].substring(0,3)}
                                    onClick={addCallback}
                                >
                                    Order Item
                                </button>
                            </div>
                        </div>
                        {
                            cart.length > 0 ?
                                <div className="ordered-list">
                                    {
                                        cart.map((item, index) => {
                                            return(
                                                <div className="cart-items" key={index}>
                                                    <span>{item.menu}</span>
                                                    <div>
                                                        <span>
                                                            <button
                                                                className="cart-button"
                                                                restoid={items.id}
                                                                menu={item.menu}
                                                                price={item.price}
                                                                currency={item.currency}
                                                                onClick={reduceCallback}
                                                            >
                                                                -
                                                            </button>
                                                            <button
                                                                className="cart-button"
                                                                restoid={items.id}
                                                                menu={item.menu}
                                                                price={item.price}
                                                                currency={item.currency}
                                                                onClick={addCallback}
                                                            >
                                                                +
                                                            </button>
                                                        </span>
                                                        <span>{item.qty} x {item.currency} {item.price}</span>
                                                    </div>
                                                </div>        
                                            )
                                        })
                                    }
                                    <div className="cart-footer">
                                        <div className="cart-footer-detail">
                                            <span>
                                                Total: {cart[0].currency} {totalPrice}
                                            </span>
                                        </div>
                                        <div className="footer-button">
                                            <button onClick={processOrder} className="process-button">Process</button>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }
                    </div>
                : 
                    null
            }
        </>
    )
}

export default Cart