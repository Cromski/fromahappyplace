import { User } from "firebase/auth";
import { auth } from "@/app/firebase/config"
import { useSignOut } from "react-firebase-hooks/auth"

type MyComponentProps = {
  user: User | null | undefined;
};


const Navbar: React.FC<MyComponentProps> = ({user}) => {

  const [signOut] = useSignOut(auth);

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold">From a happy place</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            {user ?
            <li><a onClick={signOut} href="/" className="hover:underline">Log out</a></li> :
            <li><a href="/login" className="hover:underline">Login</a></li>
            }
          </ul>
        </nav>
    )
}

export default Navbar