import { faImages } from "@fortawesome/free-solid-svg-icons"
import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "POST":
      try {
        // const re = "/" + req.body + "/"
        const data = await Item.find(
          { name: { $regex: req.body, $options: "i" } },
          "name images"
        )
        const items = data.map((item) => {
          return {
            name: item.name,
            image: item.images[0],
            id: item._id.toString(),
          }
        })

        res.status(200).json(items)
      } catch (error) {
        res.status(400).send({ error: "error, GET method for searchItem api" })
      }
      break
    default:
      res.status(400)
      break
  }
}
