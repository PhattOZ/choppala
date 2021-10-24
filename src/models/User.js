import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String, // username
  email: String,
  image: String,
  password: String,
  displayName: { type: String, default: "" },
  provider: String,
  isSeller: { type: Boolean, default: false },
  shippingAddresses: [{ name: String, address: String }],
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
