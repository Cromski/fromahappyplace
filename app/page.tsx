import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">From a happy place</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Shop</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-gray-300 flex items-center justify-center">
        <Image src="/hero-image.jpg" alt="Fashion" layout="fill" objectFit="cover" className="opacity-75" />
        <h2 className="absolute text-5xl font-bold text-white drop-shadow-lg">Discover Your Style</h2>
      </section>
      
      {/* Product Grid */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Shop Our Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="relative overflow-hidden bg-white shadow-lg rounded-lg group"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image src={`/product-${i + 1}.jpg`} alt={`Product ${i + 1}`} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-semibold">Product {i + 1}</h3>
                <p className="text-sm mb-2">Stylish and trendy apparel.</p>
                <p className="text-lg font-bold">$XX.XX</p>
                <button className="mt-2 bg-white text-black py-2 px-4 rounded-md hover:bg-gray-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
