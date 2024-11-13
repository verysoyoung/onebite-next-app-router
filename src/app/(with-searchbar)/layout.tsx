import { ReactNode, Suspense } from 'react'
import Searchbar from '../../components/searchbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <div>{new Date().toLocaleString()}</div> 리렌더링 되는지 확인하고 싶을때 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  )
}

//Suspense로 감싸주면 서버측 사전 렌더링에서는 완전히 배제됨
