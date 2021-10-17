import mongoose from "mongoose"

const DevSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  nickname: String,
})

module.exports = mongoose.model("Dev", DevSchema)
