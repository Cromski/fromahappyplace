import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ClothingItem, fetchVariants, Variant } from "@lib/FBclothesFunc";

type MyComponentProps = {
  item: ClothingItem
};

const ClothesSquare: React.FC<MyComponentProps> = ({ item }) => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([])

  useEffect(() => {
    const loadVariants = async () => {
      const fetchedClothes = await fetchVariants(item.id);
      setVariants(fetchedClothes);
      setUniqueColors([...new Set(fetchedClothes.map((v) => v.color))])
    };
    loadVariants();
  }, [item.id]);

  if (variants.length == 0) return null; //pretty much if it isnt loaded yet

  return (
    <Link href={`/${item.id}_${variants[0].color}`} className="block group relative">
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition duration-300 group-hover:shadow-2xl w-full max-w-md mx-auto hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-80 w-full">
          <Image
            src={item.images[0]}
            alt={item.Name}
            fill
            className="object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />

          {/* Color Swatches */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {uniqueColors.map((color) => (
              <div
                key={color}
                onClick={(e) => e.stopPropagation()}
                className="w-6 h-6 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                style={{
                  backgroundColor: color,
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.Name}</h3>
          <p className="text-gray-500 text-lg mb-2">{item.price.toFixed(2)} kr</p>
        </div>
      </div>
    </Link>
  );
};

export default ClothesSquare;
