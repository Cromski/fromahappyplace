import { db } from "@/app/firebase/config";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

type AddToCartOptions = {
    userId: string;
    clothingId: string;
    variantId: string;
    quantity?: number; // defaults to 1 if not provided
  };

  export async function addToCart({ userId, clothingId, variantId, quantity = 1 }: AddToCartOptions): Promise<void> {
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
  
      console.log(`✅ Added ${quantity} of ${clothingId} (${variantId}) to ${userId}'s cart`);
    } catch (error) {
      console.error("❌ Failed to add to cart:", error);
      throw error;
    }
  }