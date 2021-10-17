import dbConnect from "src/lib/DBconnect"
import Dev from "src/models/Dev"

export default async function handler(req, res) {
  await dbConnect()

  await Dev.create({
    fName: "Sorawong",
    lName: "Leardmongkonrut",
    nickname: "Wong",
  })

  res.json({ txt: "Hello" })
}
