"use client"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'
import Navbar from "./components/Navbar";
import "./globals.css";
import { useUserStore } from "./stores/userStore";
import { useEffect } from "react";


export default function RootLayout({children}: Readonly<{ children: React.ReactNode}>) 
{
  const [user, loading] = useAuthState(auth);
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    if (!loading){
      setUser(user)
    }
  }, [user, loading])

  return (
    <html lang="en">
      <body>
        <Navbar user={!loading ? user : null} />
        {children}
      </body>
    </html>
  );
}
