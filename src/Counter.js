import React, { useReducer, useState } from 'react'


function reducer(state, active) {
  switch (active.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT' :
      return state - 1;
    default:
      return state;
  }
}


export default function Counter() {

  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    // setNumber(prevNumber => prevNumber + 1);
    dispatch({ type: 'INCREMENT' })
  }

  const onDecrease = () => {
    // setNumber(prevNumber => prevNumber - 1);
    dispatch({ type: 'DECREMENT' })
  }
 

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
