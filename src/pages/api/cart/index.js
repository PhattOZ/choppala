import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const { method } = req
  const userSession = await getSession({ req })

  if (userSession === null) {
    res.status(200).json({ cart: [] })
  } else {
    const { user } = userSession
    await dbConnect()
    switch (method) {
      case "GET":
        try {
          const data = await User.findOne(
            { name: user.name, email: user.email },
            "cart -_id"
          )
          res.status(200).json(data.cart)
        } catch (error) {
          res.status(400).send({ error: "error, GET method for cart api" })
        }
        break
      case "POST":
        try {
          const filter = { name: user.name, email: user.email }
          const update = { cart: req.body }
          await User.findOneAndUpdate(filter, update)

          res.status(200).json({ success: true })
        } catch (error) {
          res.status(400).send({ error: "error, GET method for cart api" })
        }
        break
      default:
        res.status(400)
        break
    }
  }
}
