import React from 'react';

import './search-box.style.css';

export const SearchBox = ({placeholder, change}) =>(
    <input 
    className='search' 
    type="search" 
    placeholder={placeholder} 
    onChange ={change} 
    />
);
