"use client"
import ShoppingCartSquare from "@components/ShoppingCartSquare"
import { ClothingItem, fetchPiece } from "@lib/FBclothesFunc"
import { useUserStore } from "@stores/userStore"
import { useEffect, useState } from "react"


const ShoppingCart = () => {
    const user = useUserStore((state) => state.userData)
    const [pieceInfo, setPieceInfo] = useState<ClothingItem | null>(null)

    useEffect(() => {
        const loadPieces = async () => {
            const piece = await fetchPiece("hoodie1")
            setPieceInfo(piece)
            console.log("shopping cart -> ", piece)
        }
        loadPieces()
    }, [])

    return (
        <div className="space-y-4">

        {pieceInfo !== null ? user?.cart.map((item) => (
            <div key={item.data.variantId}>
                <ShoppingCartSquare userId={user.id} item={item.data} pieceInfo={pieceInfo} />
            </div>
        )) : 
            <p>loading...</p>
        }
      </div>
    )
}

export default ShoppingCart