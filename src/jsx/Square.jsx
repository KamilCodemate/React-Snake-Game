import React from 'react';
import '../css/Square.css';
const Square = (props) => {
  return <div className='square' style={{ backgroundColor: `${props.actualColor}` }}></div>;
};

export default Square;
