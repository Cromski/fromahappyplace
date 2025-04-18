"use client"
import { useUserStore } from "@stores/userStore"


const ShoppingCart = () => {
    const user = useUserStore((state) => state.userData)

    return (
        <div>
            {user?.cart.map((item) => (
                <div key={item.id}>{item.data.clothingId}</div>
            ))}
        </div>
    )
}

export default ShoppingCart