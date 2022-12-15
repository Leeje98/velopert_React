import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);  
// React.memo 사용법. 감싸주기만 하면 된다
// React.memo : 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능을 최적화하는 함수
// 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정가능
// React.memo(전체파일)을 사용함으로써 input 값 입력시에 리렌더링 일어나지 않음