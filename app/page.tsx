"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import ClothesSquare from "./components/ClothesSquare";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"

export default function Home() {

  const [user, loading] = useAuthState(auth);

  console.log(user)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar user={!loading ? user : null} />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-gray-300 flex items-center justify-center">
        <Image src="/blyde-river-canyon.jpg" alt="Fashion" layout="fill" objectFit="cover" className="opacity-75" />
        <h2 className="absolute text-5xl font-bold text-white drop-shadow-lg">Your new style is here{!loading && user ? ", " + user?.email : ""}</h2>
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
              <ClothesSquare num={i} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
