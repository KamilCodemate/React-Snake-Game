import React from 'react';
import Square from './Square';
import '../css/Board.css';
const Board = (props) => {
  let retSquares = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      if (i === props.head[0] && j === props.head[1]) {
        retSquares.push(<Square key={i * 15 + j} actualColor='yellow' />);
      } else if (props.body.some((square) => square[0] === i && square[1] === j)) {
        retSquares.push(<Square key={i * 15 + j} actualColor='#00FF00' />);
      } else if (i === props.apple[0] && j === props.apple[1]) {
        retSquares.push(<Square key={i * 15 + j} actualColor='red' />);
      } else {
        retSquares.push(<Square key={i * 15 + j} actualColor='#171717' />);
      }
    }
  }
  return <div className='Board'>{retSquares}</div>;
};
export default Board;
