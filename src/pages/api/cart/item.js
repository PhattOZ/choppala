import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

//API for get items with ID from cart
export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case "POST":
      try {
        const data = await Item.find(
          {
            id: {
              $in: req.body,
            },
          },
          "name images price sellerName sellerId id -_id"
        ).lean()

        const items = data.map((item) => {
          let image = item.images[0]
          delete item.images
          return {
            ...item,
            image: image,
          }
        })

        res.status(200).json(items)
      } catch (error) {
        res
          .status(400)
          .send({ error: "error, GET method for getItemForCart api" })
      }
      break
    default:
      res.status(400)
      break
  }
}
