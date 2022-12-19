import React, { useContext, useEffect } from "react";
import { UserDispatch } from "./App";

// const User = React.memo(function User({ user, onRemove, onToggle }) {
const User = React.memo(function User({ user }) {
  // useEffect(() => {
  //   console.log(user);
  // });
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => {
          dispatch({ type: 'TOGGLE_USER', id: user.id });  // Context API 를 사용해서 dispatch 를 어디서든지 조회해서 사용해줄 수 있다
        }}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>&nbsp;&nbsp;
      <button onClick={() => {
        dispatch({ type: 'REMOVE_USER', id: user.id })
      }}>삭제</button>
    </div>
  );
})

// function UserList({ users, onRemove, onToggle }) {
function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        // {/* ㄴ 순서 정방향 정렬 */}
        // {users.slice(0).reverse().map((user) => (
        // 순서 역순 정렬 (새로 추가한것이 위에)
        // 원본 배열을 건드리지 않고 역순으로 하려면 사본을 만든 다음 반대로 만들고 map을 실행
        <User
          user={user}
          key={user.id}
          // onRemove={onRemove}
          // onToggle={onToggle}
        />
      ))}
    </div>
  );
}


export default React.memo(UserList);