export default function EditProduct({ data }) {
  return <div>{data}</div>
}

export async function getServerSideProps(context) {
  const { itemId } = context.query
  console.log(itemId)
  return {
    props: {
      data: itemId,
    },
  }
}
