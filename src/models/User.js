import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, // username
  email: {
    type: String,
    required: true,
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
  sellerId: String,
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
      itemID: { type: String, ref: "Item" },
      quantity: Number,
      isConfirm: Boolean,
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
  purchaseHistory: [
    {
      itemID: String,
      name: String,
      image: String,
      price: Number,
      sellerName: String,
      quantity: Number,
      isRating: { type: Boolean, default: false },
      orderAt: { type: Date, default: Date.now },
    },
  ],
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)
