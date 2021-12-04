import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "GET":
      try {
        // const items = await Item.find({}, { _id: 0 }).limit(18).lean()
        const items = await Item.aggregate([
          {
            $project: {
              _id: 0,
              id: 1,
              name: 1,
              price: 1,
              image: { $arrayElemAt: ["$images", 0] },
              reviews: 1,
              avg_rating: { $round: [{ $avg: "$reviews.rating" }, 1] },
            },
          },
          { $sort: { _id: -1 } },
          { $limit: 20 },
        ])

        res.status(200).json({ items: items })
      } catch (err) {
        res.status(404).json()
      }
      break
    default:
      res.status(400).json()
      break
  }
}
