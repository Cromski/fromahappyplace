"use client";
import Image from "next/image";
import ClothesSquare from "@components/ClothesSquare";
import { useEffect, useState } from "react";
import { useUserStore } from "@stores/userStore";
import { ClothingItem, fetchClothes } from "@lib/FBclothesFunc";

export default function Home() {

//   const [clothes, setClothes] = useState<ClothingItem[]>([]);
//   const user = useUserStore((state) => state.userData)

//   useEffect(() => {
//     const loadClothes = async () => {
//       const fetchedClothes = await fetchClothes();
//       setClothes(fetchedClothes);
//     };
//     loadClothes();
//   }, []);

  return (
    <div className="w-screen h-screen bg-orange-100">
        <h1>hello</h1>
    </div>
  );
}
