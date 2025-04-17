"use client"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'
import Navbar from "./components/Navbar";
import "./globals.css";
import { useUserStore } from "./stores/userStore";
import { useEffect } from "react";
import { fetchUserData } from "./lib/FBuserFunc";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode}>) 
{
  const [user, loading] = useAuthState(auth);
  const setUserData = useUserStore((state) => state.setUserData)

  useEffect(() => {
    if (!loading){
      const loadUserInfo = async () => {
        const userInfo = await fetchUserData(user);
        console.log("bbbbbb",userInfo)
        setUserData(userInfo)
      }
      loadUserInfo()
    }
  }, [user, loading, setUserData])

  return (
    <html lang="en">
      <body>
        <Navbar user={!loading ? user : null} />
        {children}
      </body>
    </html>
  );
}
