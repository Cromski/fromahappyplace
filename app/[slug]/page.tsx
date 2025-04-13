"use client"

import { useParams } from "next/navigation"

  
export default function ProductPage() {
    const { slug } = useParams()

    console.log("aaa",slug?.toString().split("_"))

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h1 className="text-2xl font-bold mb-4">Product Page</h1>
            <p className="text-lg text-gray-700">You are viewing: <span className="font-mono text-black">{slug}</span></p>
        </div>
        </div>
    )
}