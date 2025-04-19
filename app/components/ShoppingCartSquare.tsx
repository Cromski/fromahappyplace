import { ClothingItem } from "@lib/FBclothesFunc";
import { cartInfo } from "@stores/userStore";
import { useState } from "react";
import Image from "next/image";
import { removeFromCart } from "@lib/cartService";
import Link from "next/link";

type MyProps = {
    userId: string;
    item: cartInfo;
    pieceInfo: ClothingItem | null;
  };
  
  const ShoppingCartSquare: React.FC<MyProps> = ({ userId, item, pieceInfo }) => {
    const [quantityVar, setQuantityVar] = useState(item.quantity)

    return (
        <div className="relative my-3 p-4 bg-gray-100 rounded-xl shadow-lg flex items-center space-x-4">
            {/* Image */}
            <div className="w-20 h-20 bg-gray-300 rounded-xl overflow-hidden">
              <Link href={`/${item.clothingId}_${item.variantId}`}>
                <Image
                  src={pieceInfo!.images[0]} // Replace with actual image if available
                  alt={pieceInfo!.Name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </Link>
            </div>
    
            <button 
              onClick={() => removeFromCart(userId, item.clothingId, item.variantId)}
              className=" absolute right-2 top-2 text-gray-400 hover:text-red-500 transition-colors text-lg cursor-pointer"
              >
                &times;
            </button>

            {/* Item details */}
            <div className="flex-1">
              <Link href={`/${item.clothingId}_${item.variantId}`}>
                <div className="font-semibold text-lg">{pieceInfo?.Name} ({item.variantId})</div>
                <div className="text-gray-500">{pieceInfo?.description}</div>
                <div className="mt-2 text-sm text-gray-700">
                  <span className="font-bold">Price:</span> DKK {pieceInfo?.price.toFixed(2)}
                </div>
              </Link>
              {/* Quantity Input */}
                <div className="mt-2 flex items-center">
                    <span className="font-bold mr-2">Quantity:</span>
                    <input
                    type="number"
                    defaultValue={quantityVar}
                    min="0"
                    onChange={(e) => setQuantityVar(Math.max(0, parseInt(e.target.value, 10)))}
                    className="w-16 text-center p-1 border rounded-md text-sm"
                    />
                </div>
            </div>
    
            {/* Price and Quantity */}
            <div className="text-right">
              <div className="text-xl font-semibold text-gray-900">
                DKK {(pieceInfo!.price * quantityVar).toFixed(2)}
              </div>
            </div>
          </div>
    )
}

export default ShoppingCartSquare