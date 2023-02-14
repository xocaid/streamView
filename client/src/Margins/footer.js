import React from 'react';
import './Margin.css';

let currentDate = new Date();
let year = currentDate.getFullYear()

function Footer() {
  return (
    <div className='footerPg'>
      <p>Copyright &copy; {year} Across the Streams. All Rights Reserved.</p>
    </div>
  )
}

export default Footer;