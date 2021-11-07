import Item from "src/models/Item"
import dbConnect from "./dbConnect"
import { sortConditions } from "./sortTitles"

export default async function querySearch(
  keyword,
  category,
  minprice,
  maxprice,
  sortby
) {
  await dbConnect()

  // ============================ Dynamic query condition ============================
  const query = {
    ...(keyword && { name: { $regex: keyword, $options: "i" } }),
    ...(category && { category }),
    ...(minprice && { price: { $gte: minprice } }),
    ...(maxprice && { price: { $lte: maxprice } }),
    ...(!!minprice &&
      !!maxprice && {
        $and: [{ price: { $gte: minprice } }, { price: { $lte: maxprice } }],
      }),
  }

  // ================================= Sort condition =================================
  let itemList = null
  try {
    if (sortby === "Latest") {
      itemList = await Item.find(query).sort({ _id: -1 })
    } else if (sortby === "Price low to high") {
      itemList = await Item.find(query).sort({ price: 1 })
    } else if (sortby === "Price high to low") {
      itemList = await Item.find(query).sort({ price: -1 })
    } else {
      itemList = await Item.find(query)
    }
    return JSON.parse(JSON.stringify(itemList))
  } catch (err) {
    throw new Error("Error, cannot query data for filter page")
  }
}
