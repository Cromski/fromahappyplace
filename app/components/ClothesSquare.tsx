import Image from "next/image";


type MyComponentProps = {
    num: number;
  };

const ClothesSquare: React.FC<MyComponentProps> = ({num}) => {
    return (
        <>
            <div className="relative w-full h-64 overflow-hidden">
                <Image src={`/drawn-clothes.jpg`} alt={`Product ${num}`} className="transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-semibold">Product {num + 1}</h3>
                <p className="text-sm mb-2">Stylish and trendy apparel.</p>
                <p className="text-lg font-bold">$XX.XX</p>
                <button className="mt-2 bg-white text-black py-2 px-4 rounded-md hover:bg-gray-300">
                    Add to Cart
                </button>
            </div>
        </>
    )
}

export default ClothesSquare