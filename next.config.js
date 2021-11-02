const withPWA = require("next-pwa")

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "source.unsplash.com"],
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
})
