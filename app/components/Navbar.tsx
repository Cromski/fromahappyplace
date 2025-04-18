import { auth } from "@firebase/config"
import { useSignOut } from "react-firebase-hooks/auth"
import Link from "next/link";
import { useUserStore } from "@stores/userStore";


const Navbar = () => {

  const user = useUserStore((state) => state.userData)

  const [signOut] = useSignOut(auth);

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
          <Link href={"/"}><h1 className="text-2xl font-bold">From a happy place</h1></Link>
          <ul className="flex space-x-4">
            <li><Link href="#" className="hover:underline">About</Link></li>
            <li><Link href="/shopping-cart" className="hover:underline">Cart({user ? user.cart.length : '#'})</Link></li>
            {user ?
            <li><Link onClick={signOut} href="/" className="hover:underline">Log out</Link></li> :
            <li><Link href="/login" className="hover:underline">Login</Link></li>
            }
          </ul>
        </nav>
    )
}

export default Navbar