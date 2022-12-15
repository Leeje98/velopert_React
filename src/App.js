import { useMemo, useRef, useState } from "react";
import "./App.css";
// import Counter from "./Counter";
// import Hello from "./Hello";
// import InputSample from "./InputSample";
import UserList from "./UserList";
// import Wrapper from "./Wrapper";
import CreateUser from "./CreateUser";


function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const {username, email} = inputs;

  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    // setUsers([...users, user]) // 1. 스프레드 연산자(배열 복사)를 이용하여 배열 추가
    setUsers(users.concat(user)); // 2. concat을 이용하여 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만듦

    setInputs({
      username: '',
      email: ''
    })
    nextId.current += 1;
  };


  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  }
  const onToggle = id => {
    setUsers(
      users.map(user => 
        user.id === id ? { ...user, active: !user.active } : user
      )
    )
  }
  const count = useMemo(() => countActiveUsers(users), [users]) 
  // useMemo : 성능최적화를 위해 사용
  // 첫번째 인수에는 함수, 두번째 인수에는 배열을 넣어주면 된다.
  // 두번째 인수에 넣어준 배열의 값이 바뀔때만 함수가 실행된다.
  // 그렇지 않다면 이전의 값을 재사용한다.
  // users의 값이 바뀔때만 호출하고 싶은데 input에 값을 입력할때에도 불필요하게 호출 되어서 사용한다
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수: {count}</div>
    </>
  );
}

export default App;
