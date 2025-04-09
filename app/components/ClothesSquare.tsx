import Image from "next/image";
import { ClothingItem } from "../page";
// import { useCartStore } from "../stores/cartStore";
import { useState } from "react";

// Define a type for the props that the ClothesSquare component will receive
type MyComponentProps = {
  item: ClothingItem;  // Expecting a single ClothingItem object
};

const ClothesSquare: React.FC<MyComponentProps> = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = item.images.length;
//   const addToCart = useCartStore((state) => state.addToCart);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    console.log("aaa",item)
  };

    // const handleAdd = () => {
    //     addToCart({ ...product, quantity: 1 });
    //   };

    return (
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl w-full max-w-md mx-auto">
          {/* Image Carousel */}
          <div className="relative h-80 w-full">
            <Image
              src={item.images[currentIndex]}
              alt={item.Name}
              fill
              className="object-cover rounded-t-2xl"
            />
    
            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            >
              ▶
            </button>
          </div>
    
          {/* Details */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">{item.Name}</h3>
            <p className="text-gray-600 text-md mb-4">${item.price.toFixed(2)}</p>
    
            <button
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      );
    };
    
    export default ClothesSquare;