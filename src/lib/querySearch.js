import Item from "src/models/Item"
import dbConnect from "./dbConnect"

export default async function querySearch(keyword, category) {
  await dbConnect()
  if (keyword && category) {
    const data = await Item.find({
      name: { $regex: keyword, $options: "i" },
      category,
    })
    return JSON.parse(JSON.stringify(data))
  } else if (keyword) {
    const data = await Item.find({ name: { $regex: keyword, $options: "i" } })
    return JSON.parse(JSON.stringify(data))
  } else if (category) {
    const data = await Item.find({ category })
    return JSON.parse(JSON.stringify(data))
  } else {
    return null
  }
}
