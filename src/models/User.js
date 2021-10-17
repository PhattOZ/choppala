import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  nickname: String,
})

module.exports = mongoose.model("User", UserSchema)
