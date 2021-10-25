import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
  name: String, // ชื่อสินค้า
  image: String, // รูปภาพสินค้า (url ที่ได้จาก S3 bucket)
  price: Number, // ราคาสินค้า
  detail: String, // รายละเอียดสินค้า
  sellerName: String, // ชื่อคนขายสินค้า
  category: String, // ประเภทของสินค้า
  soldCount: Number,
  reviews: [
    {
      username: String,
      userImage: String,
      rating: Number,
    },
  ],
})

module.exports = mongoose.models.Item || mongoose.model("Item", ItemSchema)
