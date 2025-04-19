import { ClothingItem } from "@lib/FBclothesFunc";
import { cartInfo } from "@stores/userStore";
import { useState } from "react";
import Image from "next/image";

type MyProps = {
    item: cartInfo;
    pieceInfo: ClothingItem | null;
  };
  
  const ShoppingCartSquare: React.FC<MyProps> = ({ item, pieceInfo }) => {
    const [quantityVar, setQuantityVar] = useState(item.quantity)

    return (
        <div className="w-2/3 mx-auto my-3 p-4 bg-gray-100 rounded-xl shadow-lg flex items-center space-x-4">
            {/* Image */}
            <div className="w-20 h-20 bg-gray-300 rounded-xl overflow-hidden">
              <Image
                src={pieceInfo!.images[0]} // Replace with actual image if available
                alt={pieceInfo!.Name}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
    
            {/* Item details */}
            <div className="flex-1">
              <div className="font-semibold text-lg">{pieceInfo?.Name} ({item.variantId})</div>
              <div className="text-gray-500">{pieceInfo?.description}</div>
              <div className="mt-2 text-sm text-gray-700">
                <span className="font-bold">Price:</span> ${pieceInfo?.price.toFixed(2)}
              </div>
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
                ${(pieceInfo!.price * quantityVar).toFixed(2)}
              </div>
            </div>
          </div>
    )
}

export default ShoppingCartSquare