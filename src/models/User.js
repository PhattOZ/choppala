import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  provider: String,
  isSeller: Boolean,
  address: String,
  phoneNumber: String,
  dob: String, // วัน-เดือน-ปีเกิด
  wishlist: [
    {
      itemName: String,
      itemPrice: Number,
      itemReviews: [
        {
          username: String,
          rating: Number,
        },
      ],
    },
  ],
  sellerItem: [{ itemName: String }], // รายการสินค้าที่ลงขายแล้ว (กรณี activeSeller: true)
})

module.exports = mongoose.model("User", UserSchema)
