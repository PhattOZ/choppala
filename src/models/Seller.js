import mongoose from "mongoose"

const SellerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  storeName: { type: String, required: true },
  storeEmail: { type: String, required: true },
  sellerItems: [String],
})

module.exports =
  mongoose.models.Seller || mongoose.model("Seller", SellerSchema)
