import React from "react";

function User({ user, onRemove }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}


export default function UserList({ users, onRemove }) {
  return (
    <div>
      {/* {users.map((user) => (   */}
      {/* ㄴ 순서 정방향 정렬 */}
      {users.slice(0).reverse().map((user) => (
        // 순서 역순 정렬 (새로 추가한것이 위에)
        // 원본 배열을 건드리지 않고 역순으로 하려면 사본을 만든 다음 반대로 만들고 map을 실행
        <User user={user} key={user.id} onRemove={onRemove}/>
      ))}
    </div>
  );
}
