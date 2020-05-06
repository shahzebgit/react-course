import React from 'react';

import {connect} from 'react-redux'
 

import CustomButton from "../custom-button/custom-button";
import  {addItem} from '../../Redux/cart/cart.action';

import './collection-item.scss'


const CollectionItem = ({ item, addItem }) => {
  const {name ,price, imageUrl} =item;

  return(
    <div className="collection-item">
    <div
      className="image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className="collection-footer">
      <span className="name">{name} </span>
      <span className="price">{price} </span>
    </div>
    <CustomButton onClick={()=>addItem(item)} inverted>ADD TO CART</CustomButton>
  </div>
  );
}

const mapDispatchToProps =disptach =>({
  addItem: item => disptach(addItem(item))
})

export default connect(
  null,
  mapDispatchToProps)
(CollectionItem) ;