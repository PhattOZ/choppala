import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req
  const { ID } = req.query
  await dbConnect()

  switch (method) {
    case "GET":
      try {
        let data = await Item.findOne({ id: ID }, "-_id").lean()

        let { images, reviews, ...newData } = data

        newData = {
          ...newData,
          image: images[0],
        }

        res.status(200).json(newData)
      } catch (error) {
        res.status(400).send({ error: "error, GET method for cart api" })
      }
      break
    default:
      res.status(400)
      break
  }
}
