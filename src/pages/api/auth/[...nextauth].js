import NextAuth from "next-auth"
// dbConnect
import dbConnect from "src/lib/dbConnect"
<<<<<<< Updated upstream
import clientPromise from "src/lib/mongodb"
=======
>>>>>>> Stashed changes
// Providers
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import EmailProvider from "next-auth/providers/email"
// Models
import User from "src/models/User"
// Adapters
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

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
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],

    pages: {
      signIn: "/signin", // ถ้า url เป็น /api/auth/signin ให้ไปที่ localhost:3000/signin
    },

    session: {
      jwt: true,
    },

    adapter: MongoDBAdapter({
      db: (await clientPromise).db("choppaladb"),
    }),

    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        await dbConnect()
        user.provider = account.provider
        user.wishlist = []
        user.sellerItem = []
        await User.create(user)
        return true
      },
    },
  })
}
