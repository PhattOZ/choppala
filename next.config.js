const withPWA = require("next-pwa")

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com", // Dummy data
      "platform-lookaside.fbsbx.com", // Facebook profile picture
      "lh3.googleusercontent.com", // Google profile picture
      "avatars.githubusercontent.com", // Github profile picture
    ],
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
})
