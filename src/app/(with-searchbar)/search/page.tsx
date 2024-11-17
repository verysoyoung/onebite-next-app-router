import BookItem from '@/components/book-item'
import BookListSkeleton from '@/components/skeleton/book-list-skeleton'
import { BookData } from '@/types'
import { delay } from '@/util/delay'
import { Suspense } from 'react'

async function SearchResult({ q }: { q: string }) {
  await delay(1500)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  ) //한 번 검색된 페이지는 빠르게 검색됨
  const searchBooks: BookData[] = await response.json()
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>
  }

  return (
    <div>
      {searchBooks.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) {
  const { q } = await searchParams
  return (
    <Suspense key={q || ''} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  )
}

//Suspense Component
//내부 컴포넌트 로딩이 완료된 이후에는 기본적으로는 새롭게 로딩상태로 변하지 않는다.
//그렇기 때문에 key값을 바꿔서 새로운 컴포넌트로 인식 할 수 있도록 key값을 활용한다.
