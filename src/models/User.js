import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: { type: String }, // username
  email: String,
  image: String,
  customName: String,
  provider: String,
  isSeller: Boolean,
  address: String,
  phoneNumber: String,
  cart: [
    {
      itemName: String,
      itemPrice: Number,
    },
  ],
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

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)
