"use client"
import ShoppingCartSquare from "@components/ShoppingCartSquare"
import { ClothingItem, fetchPiece } from "@lib/FBclothesFunc"
import { useUserStore } from "@stores/userStore"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";


const ShoppingCart = () => {
    const user = useUserStore((state) => state.userData)
    const [pieceInfo, setPieceInfo] = useState<ClothingItem | null>(null)
    const [totalAmount, setTotalAmount] = useState(0)
    const router = useRouter()

    
    useEffect(() => {
        const loadPieces = async () => {
            const piece = await fetchPiece("hoodie1")
            setPieceInfo(piece)
            console.log("shopping cart -> pieceInfo: ", piece)
            // console.log("shopping cart -> user: ", user)
            // console.log("shopping cart -> cart: ", user?.cart)
            if (!user) return
            const total = user!.cart.reduce((total, cartItem) => {
                return total + piece!.price * cartItem.data.quantity;
              }, 0);
            console.log("shopptin cart -> totalAmount: ", total)
            setTotalAmount(total)
        }
        loadPieces()
    }, [user])

    return (
        <div >
            {pieceInfo !== null ? (
                <div className="flex">
                    <div className="w-2/3 ">
                        {user?.cart.map((item) => (
                            <div key={item.data.variantId}>
                                <ShoppingCartSquare userId={user.id} item={item.data} pieceInfo={pieceInfo} />
                            </div>
                        ))}
                    </div>
                    <div className="w-1/4 min-w-[250px] h-60 mt-10 bg-white rounded-2xl shadow-md mx-auto p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total</h2>
                            <p className="text-2xl font-bold text-gray-900">DKK {totalAmount}</p>
                        </div>

                        <button
                            onClick={() => router.push('/payment')}
                            className="mt-4 bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
                
                ) : ( 
                    <p>loading...</p>
                )
            }
      </div>
    )
}

export default ShoppingCart