import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "GET":
      // Get all items that sellerId sold
      try {
        const sellerId = req.query.sellerId
        const itemsLeanResponse = await Item.find({ sellerId }, { _id: 0 })
          .sort({ _id: -1 })
          .lean()
        res.status(200).json({ item: itemsLeanResponse })
      } catch (err) {
        res.status(404).json({ success: false })
      }
      break
    case "POST":
      try {
        const data = req.body
        const dbResponse = await Item.create(data)
        await Item.findByIdAndUpdate(dbResponse._id, {
          id: dbResponse._id.toString(),
        })
        res.status(200).json({ success: true })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    case "PUT":
      try {
        const data = req.body
        await Item.findOneAndUpdate({ id: data.id }, { ...data })
        res.status(200).json({ success: true })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    case "DELETE":
      try {
        const itemId = req.query.itemId
        await Item.findOneAndDelete({ id: itemId })
        res.status(200).json({ success: true })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
  }
}
