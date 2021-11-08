import Item from "src/models/Item"
import dbConnect from "./dbConnect"

export default async function querySearch(
  keyword,
  category,
  minPrice,
  maxPrice
) {
  await dbConnect()
  const query = {
    ...(keyword && { name: { $regex: keyword, $options: "i" } }),
    ...(category && { category }),
    ...(minPrice && { price: { $gte: minPrice } }),
    ...(maxPrice && { price: { $lte: maxPrice } }),
    ...(!!minPrice &&
      !!maxPrice && {
        $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
      }),
  }
  const itemList = await Item.find(query)
  return JSON.parse(JSON.stringify(itemList))
}
