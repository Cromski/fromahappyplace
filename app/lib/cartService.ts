import { db } from "@firebase/config";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function addToCart(userId: string, clothingId: string, variantId: string, quantity:number = 1): Promise<void> {
  try {
    const docId = `${clothingId}_${variantId}`;
    const cartItemRef = doc(db, "users", userId, "cartItems", docId);

    const existing = await getDoc(cartItemRef);

    if (existing.exists()) {
      const existingQuantity = existing.data().quantity || 0;
      await updateDoc(cartItemRef, {
        quantity: existingQuantity + quantity,
      });
    } else {
      await setDoc(cartItemRef, {
        clothingId,
        variantId,
        quantity,
      });
    }

    console.log(`cartService.ts -> ✅ Added ${quantity} of ${clothingId} (${variantId}) to ${userId}'s cart`);
  } catch (error) {
    console.error("❌ Failed to add to cart:", error);
    throw error;
  }
}

export async function removeFromCart(userId: string, clothingId: string, variantId: string) :Promise<void> {
  const cartItemRef = doc(db, "users", userId, "cartItems", `${clothingId}_${variantId}`)
  try {
    await deleteDoc(cartItemRef);
    console.log(`Item ${cartItemRef} removed from cart.`);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
}