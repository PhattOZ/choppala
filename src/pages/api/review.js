import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case "POST":
      try {
        const { id, ...review } = req.body

        const filter = { id: id }
        const update = { $push: { reviews: review } }
        await Item.findOneAndUpdate(filter, update)

        res.status(200).json()
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
  }
}
