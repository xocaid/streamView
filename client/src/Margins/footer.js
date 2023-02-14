import React from 'react';
import './Margin.css';

let currentDate = new Date();
let date = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

function Footer() {
  return (
    <div className='footerPg'>
      <p>Copyright &copy; {date} Across the Streams. All Rights Reserved.</p>
    </div>
  )
}

export default Footer;