import { db } from '@firebase/config'
import { getDocs, collection, DocumentData, getDoc, doc, query, where } from "firebase/firestore";

export interface ClothingItem {
  id: string;
  url: string;
  name: string;
  price: number;
  description: string;
  images: {
    fullUrl: string,
    tinyBase64: string,
    order: number,
    color: string,
  }[],
}

export interface Variant {
  id: string;
  url: string;
  color: string;
  size: string;
  stock: number;
  order: number;
};

//Get all clothes
export const fetchClothes = async () => {
    const querySnapshot = await getDocs(collection(db, "clothing"));
    const items: ClothingItem[] = [];
    querySnapshot.forEach((doc: DocumentData) => {
      const data = doc.data();
      items.push({
        id: doc.id,
        url: data.url,
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
      });
    });
    console.log("hey",items)
    return items
};


//Get one piece fromId
export const fetchPiece = async (itemId: string): Promise<ClothingItem | null> => {
  const itemRef = doc(db, "clothing", itemId);
  const docSnap = await getDoc(itemRef);

  if (!docSnap.exists()) return null

  const data = docSnap.data();

  const item: ClothingItem = {
    id: docSnap.id,
    url: data.url,
    name: data.name,
    description: data.description,
    price: data.price,
    images: data.images,
  };

  return item;
};

//Get clothing by URL
export async function getClothingBySlug(url: string) {
  const q = query(
    collection(db, "clothing"),
    where("url", "==", url)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data()
  };
}

//jeg burde store alle billederne på hver variant, så behøver jeg ikke få en get til hoodie1 og derefter til variant også
//men vent nej, fordi så får jeg alligevel ikke hoodie1.name

//Get all variants from item id
export const fetchVariants = async (itemId: string) => {
    const ref = collection(db, "clothing", itemId, "Variants");
    const snap = await getDocs(ref);
    const fetched: Variant[] = [];

    snap.forEach((doc) => {
        const data = doc.data()
        const id = doc.id;
        const url = data.url
        const color = data.color
        const size = data.size
        const stock = data.stock
        const order = data.order
        fetched.push({ id, url, color, size, stock, order });
    });
    return fetched
};

//Get all variants from item id
export const getVariant = async (clothingId: string, variantId: string): Promise<Variant | null> => {
    const ref = doc(db, "clothing", clothingId, "Variants", variantId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Variant;
};