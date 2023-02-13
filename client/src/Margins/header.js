import React from 'react'
import './Margin.css';
import banner from '../Images/banner.png';

function Header() {
    return (
        <div className='headerPg'>
            <img src={banner} alt='acrossTheStreamsBanner' className='banner'></img>
        </div>
    )
}

export default Header;