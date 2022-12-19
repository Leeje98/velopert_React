import React, { useReducer, useState } from 'react'


// reducer 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 된다
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT': 
      return state - 1;
    default:
      return state;
  }
}

export default function Counter() {

  // const [number, setNumber] = useState(0);
  const [number, dispatch] = useReducer(reducer, 0) 
                          // useReducer 에 넣는 첫번째 파라미터는 reducer 함수이고, 두번째 파라미터는 초기 상태

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
