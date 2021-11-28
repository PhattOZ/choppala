import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "GET":
      try {
        const items = await Item.find({}, { _id: 0 }).limit(18).lean()
        res.status(200).json({ items: items })
      } catch (err) {
        res.status(404)
      }
      break
    default:
      res.status(400)
      break
  }
}
