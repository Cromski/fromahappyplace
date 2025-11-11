import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserStore } from "@stores/userStore";
import { ClothingItem, fetchVariants, Variant } from "@lib/FBclothesFunc";
import { addToCart, getVariantByColorAndSize } from "@lib/cartService";
import { sizeOrder } from "@lib/constants";

type MyComponentProps = {
  item: ClothingItem
};

const ClothesSquare: React.FC<MyComponentProps> = ({ item }) => {
  const user = useUserStore((state) => state.userData)
  const [variants, setVariants] = useState<Variant[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [sizeCollection, setSizeCollection] = useState<Record<string, string[]>>({})
  const images: { fullUrl: string, tinyBase64: string, order: number, color: string}[] = (item.images.sort((a, b) => a.order - b.order))
  const [filteredImages, setFilteredImages] = useState<{ fullUrl: string, tinyBase64: string, order: number, color: string}[]>([])
  const [imageIndex, setImageIndex] = useState<number>(0)
  const [hovered, setHovered] = useState<boolean>(false)  

  useEffect(() => {
    const loadVariants = async () => {
      console.log("XD", item.id)
      const fetchedVariants = await fetchVariants(item.id);
      setVariants(fetchedVariants.sort((a,b) => a.order - b.order));
      setSelectedColor(fetchedVariants[0].color)
      const sizeMap = fetchedVariants.reduce((acc, item) => {
        if (!acc[item.color]) acc[item.color] = [];

        acc[item.color].push(item.size);

        return acc;
      }, {} as Record<string, string[]>);

      Object.keys(sizeMap).forEach(color => {
        sizeMap[color].sort((a, b) =>
          sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
        );
      });

      setSizeCollection(sizeMap)
      console.log("yes: ",sizeMap)
      setUniqueColors([...new Set(fetchedVariants.map((v) => v.color))])
    };
    loadVariants();
  }, [item.id]);

  useEffect(() => {
    setImageIndex(0)
    setFilteredImages(images.filter(img => img.color === selectedColor))
  }, [selectedColor, images])

  const handleAddToCart = async (clothingId: string, color: string, size: string) => {
    const variant = await getVariantByColorAndSize(clothingId, color, size)
    addToCart(user!.id, clothingId, variant!.id)
  }

  if (variants.length == 0) return null; //pretty much if it isnt loaded yet


  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageIndex((i) => (i > 0 ? i - 1 : filteredImages.length - 1))
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageIndex((i) => (i < filteredImages.length - 1 ? i + 1 : 0))
  }

  if(filteredImages.length === 0) return <div>no images</div>

  return (
    <div className="block group relative"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <Link href={item.url+"_"+selectedColor} className="">
          {/* Image */}
        <div className="relative h-full aspect-4/5 shadow-xl w-full max-w-md mx-auto">
          <Image
            src={filteredImages[imageIndex].fullUrl}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover "
            quality={70}
            placeholder={filteredImages[imageIndex]?.tinyBase64 ? "blur" : undefined}
            blurDataURL={filteredImages[imageIndex]?.tinyBase64}
            priority
            />

        </div>
      </Link>  
        <button
        onClick={prevImage}
        className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-1"
        >
          <span className="text-white text-2xl drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]">❮</span>
        </button>
        <button
        onClick={nextImage}
        className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1"
        >
          <span className="text-white text-2xl drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]">❯</span>
        </button>
        {/* Details */}
      <div className="text-left h-25">
        { !hovered ?
          <h3 className="text-xl font-semibold h-1/2 text-gray-800 p-3">{item.name}</h3>
        :
          <div className="p-3 ml-1 flex gap-4 h-1/2 leading-7 ">
            {sizeOrder.map((v) => {
              const isAvailable = sizeCollection[selectedColor]?.includes(v);
              return (
                isAvailable ? 
                  <button
                  key={v}
                  onClick={() => handleAddToCart(item.id, selectedColor, v)}
                  className={"text-black cursor-pointer"}
                  >{v}</button>
                :
                  <h1
                  key={v}
                  className={"text-gray-400"}
                  >{v}</h1>
              )}
            )}
          </div>
        }
        <div className=" flex">
          <p className="text-gray-500 mr-5 text-lg leading-[18px] px-3">{item.price.toFixed(2)} kr</p>
          {/* colors */}
          {uniqueColors.map((color) => (
            <div
            key={color}
            onClick={() => setSelectedColor(color)}
            className="w-8 h-6 border-1 mr-1 hover:scale-110 transition-transform"
            style={{
              backgroundColor: color,
              borderColor: selectedColor === color ? "black" : "white",
            }}
            title={color}
            />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default ClothesSquare;
