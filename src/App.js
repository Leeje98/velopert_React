import React, {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
// import Counter from "./Counter";
// import Hello from "./Hello";
// import InputSample from "./InputSample";
import UserList from "./UserList";
// import Wrapper from "./Wrapper";
import CreateUser from "./CreateUser";
import useInputs from "./Hooks/useInputs";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  // App 에서 사용 할 초기 상태를 컴포넌트 바깥으로 분리
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

// reducer 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 된다
function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT": // input창 입력시 value값 바뀌는 것 인지
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER": // 새로운 항목 생성
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER": // active 상태 관리
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER": // 항목 지우기
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);
// UserDispatch 라는 이름으로 내보낸다
// UserDispatch 라는 Context 를 만들어서, 어디서든지 dispatch 를 꺼내 쓸 수 있도록 준비를 해준 것

function App() {
  const [{ username, email }, onChange, onReset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer 에 넣는 첫번째 파라미터는 reducer 함수이고, 두번째 파라미터는 초기 상태
  const nextId = useRef(4);

  const { users } = state;
  // const { username, email } = state.inputs;

  // useCallback :
  // 첫번째 인자로 넘어온 함수를, 두번째 인자로 넘어온 배열 내의 값이 변경될 때까지 저장해놓고 재사용할 수 있게 해준다
  // 배열에 요소들이 없을 시(빈배열) 처음 기억해둔 함수를 끝까지 쓴다

  // const onChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   dispatch({
  //     type: "CHANGE_INPUT",
  //     name, // 구조분해할당
  //     value,
  //   });
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    onReset();
    nextId.current += 1;
  }, [username, email, onReset]);

  // const onToggle = useCallback((id) => {
  //   dispatch({
  //     type: "TOGGLE_USER",
  //     id,
  //   });
  // }, []);

  // const onRemove = useCallback((id) => {
  //   dispatch({
  //     type: "REMOVE_USER",
  //     id,
  //   });
  // }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <UserDispatch.Provider value={dispatch}>  
      {/* React.createContext로 전역적으로 사용할 수 있는 값을 관리 */}
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        {/* <UserList users={users} onToggle={onToggle} onRemove={onRemove} /> */}
        <UserList users={users} />
        <div>활성사용자 수 : {count}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;
