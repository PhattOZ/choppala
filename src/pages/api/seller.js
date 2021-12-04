import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import Seller from "src/models/Seller"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query
        const seller = await Seller.findOne({ userId })
        res.status(200).json(seller)
      } catch (err) {
        res.status(400).json({ success: false })
      }
      break
    case "POST":
      try {
        const { userId, username, userEmail, userImage } = req.body
        // Create seller in Seller collection
        const newSeller = {
          userId,
          storeName: username,
          storeEmail: userEmail,
          storeImage: userImage,
        }
        const dbResponse = await Seller.create(newSeller)
        // Generate id field for seller
        await Seller.findByIdAndUpdate(dbResponse._id, {
          id: dbResponse._id.toString(),
        }).lean()

        // Update user isSeller: true
        const filter = { name: username, email: userEmail }
        const update = { isSeller: true, sellerId: dbResponse._id.toString() }
        await User.findOneAndUpdate(filter, update)
        res.status(201).json()
      } catch (error) {
        res.status(400).json()
      }
      break
    case "PUT":
      try {
        const { userId } = req.query
        const { storeName, storeEmail } = req.body
        const newSeller = await Seller.findOneAndUpdate(
          { userId },
          { storeName, storeEmail }
        ).lean()
        const newItems = await Item.updateMany(
          { sellerId: newSeller.id },
          { sellerName: newSeller.storeName }
        )
        res.status(201).json()
      } catch (error) {
        res.status(400).json()
      }
      break
    default:
      res.status(400).json()
      break
  }
}
