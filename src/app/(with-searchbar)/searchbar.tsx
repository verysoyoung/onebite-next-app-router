'use client' //상호작용이 있는 컴포넌트 클라이언트 컴포넌트
import { useState } from 'react'

export default function Searchbar() {
  const [search, setSearch] = useState('')
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  )
}
