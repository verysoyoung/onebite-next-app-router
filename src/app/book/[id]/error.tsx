'use client'
import { useRouter } from 'next/navigation'
import { startTransition, useEffect } from 'react'

//기본적으로 오류는 서버, 클리어언트 모두 발생가능하기 때문에 클라이언트컴포넌트로 설정해줘야함

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    console.error(error.message)
  }, [error])
  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      <button
        onClick={() => {
          startTransition(() => {
            //한 번에 일괄적으로 실행함
            router.refresh() //현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 (서버측에서 다시 실행할 수 있게) 비동기
            reset() //에러상태를 초기화, 컴포넌트들을 다시 렏너링
          })
        }}
      >
        다시시도
      </button>
    </div>
  )
}
