import { ClothingItem, fetchPiece, getVariant, Variant } from "@lib/FBclothesFunc";
import { cartInfo, useUserStore } from "@stores/userStore";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { removeFromCart, updateCartQuantity } from "@lib/cartService";
import Link from "next/link";

type MyProps = {
    userId: string;
    clothingId: string;
    variantId: string;
    quantity: number;
  };
  
  const ShoppingCartSquare: React.FC<MyProps> = ({ userId, clothingId, variantId, quantity }) => {
    const user = useUserStore((state) => state.userData)
    const [quantityVar, setQuantityVar] = useState(quantity)
    const [metaData, setMetaData] = useState<ClothingItem | null>(null)
    const [variantData, setVariantData] = useState<Variant | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      ( async () => {
        const meta = await fetchPiece(clothingId);
        const variant = await getVariant(clothingId, variantId);
        setMetaData(meta);
        setVariantData(variant);
        console.log("METADATA: ", meta)
        console.log("VARIANTDATA: ", variant)
      })();

    }, [clothingId, variantId])

    if(!metaData || !variantData) return <h1>loading...</h1>

    const debouncedUpdateCartQuantityInDB = (q: number) => {
      
      if (timerRef.current) clearTimeout(timerRef.current)
      
      timerRef.current = setTimeout(() => {
        updateCartQuantity(userId, clothingId, variantId, q)
        .catch((err) => console.error("failed update", err));
      },500)
    }

    return (
        <div className="relative my-3 p-4 bg-gray-100 rounded-xl shadow-lg flex items-center space-x-4">
            {/* Image */}
            <div className="w-20 h-20 bg-gray-300 rounded-xl overflow-hidden">
              <Link href={`/${metaData!.url}_${variantData?.url}`}>
                <Image
                  src={metaData.images[0].url} // Replace with actual image if available
                  alt={metaData.images[0].url}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </Link>
            </div>
    
            <button 
              onClick={() => removeFromCart(userId, metaData.id, variantData.id)}
              className=" absolute right-2 top-2 text-gray-400 hover:text-red-500 transition-colors text-lg cursor-pointer"
              >
                &times;
            </button>

            {/* Item details */}
            <div className="flex-1">
              <Link href={`/${metaData!.url}_${variantData?.url}`}>
                <div className="font-semibold text-lg">{metaData.name} ({variantData.color+"-"+variantData.size})</div>
                <div className="text-gray-500">{metaData.description}</div>
                <div className="mt-2 text-sm text-gray-700">
                  <span className="font-bold">Price:</span> DKK {metaData.price.toFixed(2)}
                </div>
              </Link>
              {/* Quantity Input */}
                <div className="mt-2 flex items-center">
                    <span className="font-bold mr-2">Quantity:</span>
                    <input
                    type="number"
                    value={quantityVar}
                    min="0"
                    onChange={(e) => {
                      const q = Math.max(0, Number(e.target.value));   // safe parse
                      setQuantityVar(q);
                      useUserStore.getState().setCartQuantity(clothingId, variantId, q); // update store
                      if(q === 0) return removeFromCart(userId, metaData.id, variantData.id)
                      debouncedUpdateCartQuantityInDB(q)
                    }}
                    className="w-16 text-center p-1 border rounded-md text-sm"
                    />
                </div>
            </div>
    
            {/* Price and Quantity */}
            <div className="text-right">
              <div className="text-xl font-semibold text-gray-900">
                DKK {(metaData!.price * quantityVar).toFixed(2)}
              </div>
            </div>
          </div>
    )
}

export default ShoppingCartSquare