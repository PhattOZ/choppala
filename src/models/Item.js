import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
  id: String, // id สินค้า
  name: String, // ชื่อสินค้า
  image: String, // รูปภาพสินค้า (url ที่ได้จาก S3 bucket)
  price: Number, // ราคาสินค้า
  detail: String, // รายละเอียดสินค้า
  sellerName: String, // ชื่อคนขายสินค้า
  sellerId: String, // ObjectId user account ที่ลงขายสินค้าชิ้นนี้
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
