// 커스텀 Hooks 를 만들 때에는 보통 이렇게 use 라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성

import { useCallback, useState } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);  // initialState : App컴포넌트 내 useReducer 함수의 두번째 파라미터로 들어간 초기상태
  // change
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({...form, [name]:value}))
  }, [])
  const reset = useCallback(() => setForm(initialForm), [initialForm])
  return [form, onChange, reset]
}

export default useInputs;