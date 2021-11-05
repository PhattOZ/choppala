import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, // username
  email: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  customName: {
    type: String,
    default: "",
  }, // Firstname-Lastname ที่ผู้ใช้ตั้งเอง
  provider: {
    type: String,
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
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
          userImage: String,
          rating: Number,
        },
      ],
    },
  ],
  sellerItem: [{ itemName: String }], // รายการสินค้าที่ลงขายแล้ว (กรณี activeSeller: true)
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)
