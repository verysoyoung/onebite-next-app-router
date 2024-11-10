import ClientComponent from '../../../components/client-component'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params //동기적으로 가져옴
  return (
    <div>
      Book/[{id}] page
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  )
}
