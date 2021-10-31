import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "POST":
      try {
        const { name, email } = req.body
        const filter = { name, email }
        const update = { isSeller: true }

        await User.findOneAndUpdate(filter, update)
        res.status(201).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
