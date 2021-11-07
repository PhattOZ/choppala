import NextAuth from "next-auth"
// dbConnect
import dbConnect from "src/lib/dbConnect"
// Providers
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import LineProvider from "next-auth/providers/line"
// Model
import User from "src/models/User"

export default async function auth(req, res) {
  try {
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
        LineProvider({
          scope: "profile openid email",
          clientId: process.env.LINE_CLIENT_ID,
          clientSecret: process.env.LINE_CLIENT_SECRET,
        }),
      ],
      pages: {
        signIn: "/signup", // ถ้า url เป็น /api/auth/signin ให้ไปที่ localhost:3000/signup
      },
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          await dbConnect()
          const checkUser = await User.findOne({
            name: user.name,
            email: user.email,
            image: user.image,
          })
          if (checkUser) {
            return true // user คนนี้มีใน db แล้ว (เคย signin แล้ว)
          } else {
            user.provider = account.provider
            await User.create(user)
            return true
          }
        },
      },
    })
  } catch (err) {
    throw new Error("Error in NextAuth")
  }
}
