import BookItem from '@/components/book-item'
import style from './page.module.css'
import { BookData } from '@/types'
import { delay } from '@/util/delay'
import { Suspense } from 'react'
import BookItemSkeleton from '@/components/skeleton/book-item-skeleton'
import BookListSkeleton from '@/components/skeleton/book-list-skeleton'

// export const dynamic = 'force-dynamic' //app router 에서는 컴포넌트에서 세밀하게 dynamic, static 을 설정해주기 때문에 해당 옵션 사용 자제
// test 할 수 있음
// 특정페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
//1. auto : 기본값, 아무것도 강제하지 않음
//2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
//3. force-static : 페이지를 강제로 Static 페이지로 설정
//4. error : 페이지를 강제로 Static 페이지 설정 (설정하면 안되는 이유 -> 빌드 오류)

async function AllBooks() {
  await delay(1500)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' }
  )
  const allBooks: BookData[] = await response.json()
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>
  }
  return (
    <>
      {allBooks.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  )
}

async function RecoBooks() {
  await delay(3000)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  )
  const recoBooks: BookData[] = await response.json()
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>
  }
  return (
    <>
      {recoBooks.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  )
}
export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  )
}
