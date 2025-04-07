
{/* Navbar */}
export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold">From a happy place</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
          </ul>
        </nav>
    )
}