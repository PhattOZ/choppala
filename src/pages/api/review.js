import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case "POST":
      try {
        console.log(req.body)
        const { id, ...review } = req.body
        console.log(id)
        console.log(review)
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
