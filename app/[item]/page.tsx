"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ClothingItem, fetchPiece, fetchVariants, Variant } from "../lib/FBclothesFunc"
import { useRouter } from "next/navigation";
import { addToCart } from "../services/cartService";
import { useUserStore } from "../stores/userStore";

  
export default function ProductPage() {
    const params = useParams<{item: string}>()
    const router = useRouter()
    const [chosenColor, setChosenColor] = useState('')
    const [chosenSize, setChosenSize] = useState('')
    const [piece, setPiece] = useState<ClothingItem | null>(null)
    const [variants, setVariants] = useState<Variant[]>([])
    const user = useUserStore((state) => state.userData)

    // console.log("user: ",user)

    const handleColorChange = (color: string) => {
        setChosenColor(color);
        router.push(`/${piece?.id}_${color}`);
    };

    useEffect(() => {
        const [clothesId, color] = params.item.split("_")
        setChosenColor(color)
        const loadPieceAndVariants = async () =>{
            const fetchedPiece = await fetchPiece(clothesId);
            const fetchedVariants = await fetchVariants(clothesId);
            console.log("aaaaaaaa",fetchedVariants)
            console.log("bbbbbbbb",fetchedPiece)
            setPiece(fetchedPiece)
            setVariants(fetchedVariants)
        }
        loadPieceAndVariants()
    },[])


    if (!piece){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Product Page</h1>
                <p className="text-lg text-gray-700">
                  Oops, this item could not be found:{" "}
                  <span className="font-mono text-black">{params.item}</span>
                </p>
              </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-10">
            {/* Image Section */}
            <div className="flex-1">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                src={piece.images[0]}
                alt={piece.Name}
                className="object-cover w-full h-full"
                />
            </div>

            {/* Optional thumbnails */}
            <div className="flex mt-4 gap-2">
                {piece?.images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`thumbnail-${index}`}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                />
                ))}
            </div>
            </div>

            {/* Info Section */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{piece.Name}</h1>
                <p className="text-gray-700 mb-6">{piece.description}</p>
                <h1 className="text-2xl font-medium mb-2">{piece.price} DKK</h1>

                {/* Color Selector */}
                <div className="mb-4">
                    <h2 className="font-medium mb-2">Select Color:</h2>
                    <div className="flex gap-2">
                        {[...new Set(variants.map((v) => v.color.toLowerCase()))].map((color) => {
                        const isSelected = chosenColor === color;
                        return (
                            <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className={`px-3 py-1 border rounded-full capitalize transition ${
                                isSelected
                                ? 'bg-black text-white border-black'
                                : 'hover:bg-gray-100 border-gray-300 text-black'
                            }`}
                            >
                            {color}
                            </button>
                        );
                        })}
                    </div>
                </div>

                {/* Size Selector */}
                {[...new Set(variants.map((v) => v.color.toLowerCase()))].includes(chosenColor) ? (
                <div className="flex gap-2 flex-wrap">
                    {variants
                    .filter((v) => v.color.toLowerCase() === chosenColor)
                    .map((v) => {
                        // Check if the size is the one selected
                        const isSelected = v.size === chosenSize;
                        
                        return (
                        <button
                            key={v.id}
                            className={`px-3 py-1 border rounded-md uppercase transition 
                            ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                            onClick={() => setChosenSize(v.size)} // Update the chosen size when clicked
                        >
                            {v.size}
                        </button>
                        );
                    })}
                </div>
                ) : (
                <p className="text-sm text-gray-500 italic">Please select a color first</p>
                )}
                {/* Add to Cart Button */}
                <div className="mt-6">
                <button
                    //onClick={() => addToCart({user, clothingId, variantId})} //{ userId, clothingId, variantId, quantity = 1 }
                    disabled={!chosenColor || !chosenSize}
                    className={`w-full px-4 py-2 rounded-md font-medium transition 
                    ${
                        chosenColor && chosenSize
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Add to Cart
                </button>
                </div>
            </div>
        </div>
    )
}