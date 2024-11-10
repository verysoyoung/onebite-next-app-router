import BookItem from '@/components/book-item'
import { BookData } from '@/types'

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`
  )
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
