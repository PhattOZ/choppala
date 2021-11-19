import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "POST":
      try {
        const data = req.body
        const dbResponse = await Item.create(data)
        await Item.findByIdAndUpdate(dbResponse._id, {
          id: dbResponse._id.toString(),
        })
        res.status(200).json({ success: true })
      } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
      }
  }
}
