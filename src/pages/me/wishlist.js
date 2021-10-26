import Sidebar from "src/components/UserProfileLayout"

export default function Wishlist() {
  return (
    <div>
      <Sidebar
        image_url={session.user.image}
        email={session.user.email}
        name={session.user.name}
        currentRoute={router.asPath}
      />
    </div>
  )
}
