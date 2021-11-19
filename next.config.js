const withPWA = require("next-pwa")

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com", // Dummy data
      "platform-lookaside.fbsbx.com", // Facebook profile picture
      "scontent.fzty3-2.fna.fbcdn.net", // Facebook profile picture (2)
      "lh3.googleusercontent.com", // Google profile picture
      "avatars.githubusercontent.com", // Github profile picture
      "firebasestorage.googleapis.com", // Firebase image cloud storage
    ],
  },
  pwa: {
    dest: "public",
    disable: true,
    // disable: process.env.NODE_ENV === "development",
  },
})
