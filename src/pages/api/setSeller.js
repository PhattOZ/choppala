import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"

export default async function handler(req, res) {
  await dbConnect()
  const { name, email } = req.body
  const filter = { name, email }
  const update = { isSeller: true }
  await User.findOneAndUpdate(filter,update)
  res.status(201)
}
