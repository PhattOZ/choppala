const withPWA = require("next-pwa")

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google OAuth
      "source.unsplash.com", // Dummy data
      "profile.line-scdn.net", // LINE OAuth
    ],
  },
  pwa: {
    dest: "public",
    disable: true,
  },
})
