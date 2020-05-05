import React from "react";
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect'

import { ReactComponent as ShopingIcon } from "../../assets/11.2 shopping-bag.svg";

import { selectCartItemsCount } from "../../Redux/cart/cart.selectors";

import { toggleCartHidden } from "../../Redux/cart/cart.action";

import "./cart.styles.scss";

const CartIcon = ({ toggleCartHidden,itemCount}) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShopingIcon className="shopping-icon" />
    <span className="item-count">{itemCount} </span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector ({
  itemCount:selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
