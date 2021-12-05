import Item from "src/models/Item"
import dbConnect from "./dbConnect"

export default async function querySearch(
  keyword,
  category,
  minprice,
  maxprice,
  sortby
) {
  await dbConnect()

  // ============================ Dynamic query condition ============================
  const query = {
    ...(keyword && { name: { $regex: keyword, $options: "i" } }),
    ...(category && { category }),
    ...(minprice && { price: { $gte: minprice } }),
    ...(maxprice && { price: { $lte: maxprice } }),
    ...(!!minprice &&
      !!maxprice && {
        $and: [{ price: { $gte: minprice } }, { price: { $lte: maxprice } }],
      }),
  }

  // ================================= Sort condition =================================
  let sort = null
  if (sortby === "Latest") {
    sort = { _id: -1 }
  } else if (sortby === "Price low to high") {
    sort = { price: 1 }
  } else if (sortby === "Price high to low") {
    sort = { price: -1 }
  }

  const itemList = await Item.aggregate([
    { $match: query },
    {
      $project: {
        _id: 0,
        id: 1,
        name: 1,
        price: 1,
        image: { $arrayElemAt: ["$images", 0] },
        review_count: { $size: "$reviews" },
        avg_rating: { $round: [{ $avg: "$reviews.rating" }, 1] },
      },
    },
    sort && { $sort: sort },
  ])

  return itemList
}
