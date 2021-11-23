import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default function Temp() {
  return <div>For add itemId to item</div>
}

export const getServerSideProps = async (ctx) => {
  await dbConnect()
  // --------------------- Add sellerName, sellerId to item ---------------------
  // const itemList = await Item.find({}).sort({ _id: -1 }).limit(10)
  // itemList.map(async (i) => {
  //   await Item.findByIdAndUpdate(i._id, {
  //     sellerName: "choppa la",
  //     sellerId: "6199f15648d19b623e177328",
  //   })
  // })
  // ----------------------------------------------------------------------------
  // ----------------------- Add itemId to item ---------------------------------
  const itemList = await Item.find({})
  itemList.map(async (i) => {
    const itemId = i._id.toString()
    await Item.findByIdAndUpdate(i._id, { id: itemId })
  })
  return {
    props: {
      data: null,
    },
  }
}
