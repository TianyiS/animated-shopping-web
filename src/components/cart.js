import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartAction'

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCheckOut : false,
            name : '',
            email : '',
            address : '',
        }
    }
    
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createOrder = (e) => {
        e.preventDefault(); // we are not gonna refresh the page when user click submit
        const order = {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            cartItems: this.props.cartItems,
        }
        this.props.createOrder(order);
    }

    render() {
        const { cartItems } = this.props;

        return (
            <div>
                {cartItems.length === 0 ? (<div className='cart cart-header'>Cart is empty</div>) 
                :
                (<div className='cart cart-header'>You have {cartItems.length} in the cart!</div>)
                }

                <div>
                    <div className="cart">
                        <Fade left cascade={true}>
                            <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                    {formatCurrency(item.price)} x {item.count}{" "}
                                    <button
                                        className="button"
                                        onClick={() => this.props.removeFromCart(item)}
                                    >
                                        Remove
                                    </button>
                                    </div>
                                </div>
                                </li>
                            ))}
                            </ul>
                        </Fade>
                    </div>

                    {cartItems.length !== 0 && (
                        <div>
                            <div className='cart'>
                                <div className='total'>
                                    <div>
                                        Total:{' '}
                                        { formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0)) }
                                    </div>
                                    <button 
                                        onClick={() => {
                                            this.setState({ showCheckOut : true })
                                        }}
                                        className='button primary'>Proceed
                                    </button>
                                </div>
                            </div> 

                            {this.state.showCheckOut && (
                                <Fade right cascade={true}>
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input name='email' type='email' required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input name='name' type='text' required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input name='address' type='text' required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <button type='submit' className='button primary'>Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div> 
                    )}
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    cartItems: state.cart.cartItems
}),{ removeFromCart })
(Cart);