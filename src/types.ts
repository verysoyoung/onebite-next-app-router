export interface BookData {
  id: number
  title: string
  subTitle: string
  author: string
  publisher: string
  description: string
  coverImgUrl: string
}

export interface ReviewData {
  id: number
  createdAt: Date
  content: string
  author: string
  bookId: number
}
