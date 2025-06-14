"use client";
import Image from "next/image";
import ClothesSquare from "@components/ClothesSquare";
import { useEffect, useState } from "react";
import { useUserStore } from "@stores/userStore";
import { ClothingItem, fetchClothes } from "@lib/FBclothesFunc";

export default function Home() {

  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const user = useUserStore((state) => state.userData)

  useEffect(() => {
    const loadClothes = async () => {
      const fetchedClothes = await fetchClothes();
      setClothes(fetchedClothes);
    };
    loadClothes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-gray-300 flex items-center justify-center">
        <Image src="/better-blyde.png" alt="Fashion" layout="fill" objectFit="cover" className="opacity-75" />
        <h2 className="absolute text-5xl font-bold text-white drop-shadow-lg">Your new style is here{user && user != undefined ? ", " + user.first_name : ""}</h2>
      </section>
      
      {/* Product Grid */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Shop Our Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothes.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden bg-white shadow-lg rounded-lg group"
            >
              <ClothesSquare item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
