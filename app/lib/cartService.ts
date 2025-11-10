import { db } from "@firebase/config";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, query, collection, where, getDocs } from "firebase/firestore";

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

//Get variant by color and size
export async function getVariantByColorAndSize(clothingId: string, color: string, size: string) {
  const q = query(
    collection(db, "clothing", clothingId, "Variants"),
    where("color", "==", color),
    where("size", "==", size)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data()
  };
}

export async function updateCartQuantity(userId: string, clothingId: string, variantId: string, quantity: number) {
  const ref = doc(db, "users", userId, "cartItems", clothingId+"_"+variantId)
  const snap = await getDoc(ref)

  if(!snap.exists()) {
    return await addToCart(userId, clothingId, variantId, quantity)
  }

  await setDoc(ref, { quantity }, { merge: true })
  console.log(`✅ Cart quantity updated → ${clothingId+"_"+variantId}: ${quantity}`);
}

export async function removeFromCart(userId: string, clothingId: string, variantId: string) :Promise<void> {
  const cartItemRef = doc(db, "users", userId, "cartItems", `${clothingId}_${variantId}`)
  try {
    await deleteDoc(cartItemRef);
    console.log("Item ",cartItemRef," removed from cart.");
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
}