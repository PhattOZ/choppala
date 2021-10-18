import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
  name: String, // ชื่อสินค้า
  price: Number, // ราคาสินค้า
  detail: String, // รายละเอียดสินค้า
  sellerName: String, // ชื่อคนขายสินค้า
  category: String, // ประเภทของสินค้า
  soldCount: Number,
  reviews: [
    {
      username: String,
      rating: Number,
    },
  ],
})

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item
