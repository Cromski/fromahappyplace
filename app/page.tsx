"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import ClothesSquare from "./components/ClothesSquare";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from '@/app/firebase/config'
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface UserData {
  first_name: string,
  last_name: string,
  email: string,
};

export default function Home() {

  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);



  console.log(user)

  useEffect(() =>{
    const fetchUserData = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserData;
        setUserData(data);
      } else {
        console.log("No user data found in Firestore");
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar user={!loading ? user : null} />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-gray-300 flex items-center justify-center">
        <Image src="/blyde-river-canyon.jpg" alt="Fashion" layout="fill" objectFit="cover" className="opacity-75" />
        <h2 className="absolute text-5xl font-bold text-white drop-shadow-lg">Your new style is here{!loading && user ? ", " + userData?.first_name : ""}</h2>
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
