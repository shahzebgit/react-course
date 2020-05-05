import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../../Redux/cart/cart.selectors";
import CustomButton from "../custom-button/custom-button";
import CartItem from ".././cart-item/cart-item.component";
import { toggleCartHidden } from '../../Redux/cart/cart.action';

import {withRouter} from 'react-router-dom'


import "./cart-dropdown.scss";

const CartDropdown = ({ cartItems ,history,dispatch}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your Cart is Empty</span>
      )}
    </div>

    <CustomButton onClick={()=> {
      
      history.push('./checkout');
      dispatch(toggleCartHidden());
    
    }}
      >CHECKOUT!!</CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter (connect(mapStateToProps)(CartDropdown));
