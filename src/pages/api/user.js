// Database
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import Item from "src/models/Item"
import Seller from "src/models/Seller"
// mongoose lib
import mongoose from "mongoose"

export default async function handler(req, res) {
  const { method } = req
  switch (method) {
    case "PUT":
      try {
        const { userId } = req.query
        const data = req.body
        const id = mongoose.Types.ObjectId(userId)
        await dbConnect()
        await User.findByIdAndUpdate(id, { ...data })
        res.status(200).json({ success: true })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    case "DELETE":
      try {
        const userId = req.query.userId
        const { sellerId } = req.body
        await dbConnect()
        const id = mongoose.Types.ObjectId(userId)
        await User.findByIdAndDelete(id)
        if (!!sellerId) {
          await Item.deleteMany({ sellerId })
          await Seller.findOneAndDelete({ id: sellerId })
        }
        res.status(200).json({ success: true })
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
  }
}
