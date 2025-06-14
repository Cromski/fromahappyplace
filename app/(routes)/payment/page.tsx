"use client"
import { ClothingItem, fetchPiece } from "@lib/FBclothesFunc";
import { useUserStore } from "@stores/userStore";
import { useEffect, useState } from "react";

import Pay from "@components/Pay";
import convertToSubcurrency from "@lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const PaymentPage = () => {
    const user = useUserStore((state) => state.userData)
    const [pieceInfo, setPieceInfo] = useState<ClothingItem | null>(null)
    const [totalAmount, setTotalAmount] = useState(0)

    
    useEffect(() => {
        const loadPieces = async () => {
            const piece = await fetchPiece("hoodie1")
            setPieceInfo(piece)
            console.log(pieceInfo) //only here to make ESLINT happy for now
            console.log("shopping cart -> pieceInfo: ", piece)
            if (!user) return
            const total = user!.cart.reduce((total, cartItem) => {
                return total + piece!.price * cartItem.data.quantity;
              }, 0);
            console.log("payment -> totalAmount: ", total)
            setTotalAmount(total)
        }
        loadPieces()
    }, [user])

    return (
        <div>
            {totalAmount !== 0 ? (
                <>
                    <div className="w-full px-4 py-3 flex flex-col items-center bg-gray-400">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-medium mb-1">Pay up!</h1>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">DKK {totalAmount}</h1>
                    </div>
                    <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: convertToSubcurrency(totalAmount),
                        currency: "dkk",
                    }}
                    >
                        <Pay amount={totalAmount} />
                    </Elements> 
                </>
                ) : ( 
                    <p>loading...</p>
                )
            }
        </div>
        


    )
}

export default PaymentPage