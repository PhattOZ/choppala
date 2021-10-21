import NextAuth from "next-auth"
// dbConnect
import dbConnect from "src/lib/DBconnect"
// Providers
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
// Model
import User from "src/models/User"

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: "/signin", // ถ้า url เป็น /api/auth/signin ให้ไปที่ localhost:3000/signin
    },
    session: {
      jwt: true, // ใช้ jwt แทน database session (ใน db จะไม่มี collection session)
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        await dbConnect()
        user.customName = ""
        user.provider = account.provider
        user.isSeller = false
        user.address = ""
        user.phoneNumber = ""
        user.cart = []
        user.wishlist = []
        user.sellerItem = []
        await User.create(user)
        return true
      },
    },
  })
}
