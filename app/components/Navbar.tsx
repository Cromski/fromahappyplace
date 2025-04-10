import { User } from "firebase/auth";
import { auth } from "@/app/firebase/config"
import { useSignOut } from "react-firebase-hooks/auth"
import Link from "next/link";

type MyComponentProps = {
  user: User | null | undefined;
};


const Navbar: React.FC<MyComponentProps> = ({user}) => {

  const [signOut] = useSignOut(auth);

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold">From a happy place</h1>
          <ul className="flex space-x-4">
            <li><Link href="#" className="hover:underline">Home</Link></li>
            <li><Link href="#" className="hover:underline">Shop</Link></li>
            <li><Link href="#" className="hover:underline">About</Link></li>
            <li><Link href="#" className="hover:underline">Contact</Link></li>
            {user ?
            <li><Link onClick={signOut} href="/" className="hover:underline">Log out</Link></li> :
            <li><Link href="/login" className="hover:underline">Login</Link></li>
            }
          </ul>
        </nav>
    )
}

export default Navbar