import {  db } from '@/app/firebase/config'
import { getDocs, collection, DocumentData } from "firebase/firestore";

export interface ClothingItem {
  id: string;
  Name: string;
  price: number;
  description: string;
  images: string[];
}

export interface Variant {
  id: string;
  color: string;
  size: string
};

//Get all clothes
export const fetchClothes = async () => {
    const querySnapshot = await getDocs(collection(db, "clothing"));
    const items: ClothingItem[] = [];

    querySnapshot.forEach((doc: DocumentData) => {
    const data = doc.data();
    items.push({
        id: doc.id,
        Name: data.Name,
        description: data.description,
        price: data.price,
        images: data.images,
        });
    });
    return items
};

//Get all variants from item id
export const fetchVariants = async (itemId: string) => {
    const ref = collection(db, "clothing", itemId, "variants");
    const snap = await getDocs(ref);
    const fetched: Variant[] = [];

    snap.forEach((doc) => {
        const data = doc.data()
        const id = doc.id;
        const color = data.color
        const size = data.size
        fetched.push({ id, color, size });
    });
    console.log("aaaaaaaa",fetched)
    return fetched
};