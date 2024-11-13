import { BookData } from '@/types'
import style from './page.module.css'
import { notFound } from 'next/navigation'

//generateStaticParams 내에 있는 params외에는 404페이지를 리턴
// export const dynamicParams = false

//build 타임에 만듦 page router 에서 getStaticPath 와 같은 역할
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>
}) {
  const { id } = await params
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  )
  const book: BookData = await response.json()

  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }
    return <div>오류가 있습니다..</div>
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  )
}
