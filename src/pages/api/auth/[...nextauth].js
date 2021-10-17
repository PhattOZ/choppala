import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "src/lib/mongodb"
// Providers
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

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
    adapter: MongoDBAdapter({
      db: (await clientPromise).db("choppaladb"), // "choppaladb" คือชื่อ database, NextAuth จะสร้าง 3 Collection : accounts, sessions, users
    }),
  })
}
