import {  db } from '@/app/firebase/config'
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { User } from 'firebase/auth'
import { cartInfo, UserData } from '../stores/userStore';

  export const fetchUserData = async (user: User | null | undefined): Promise<UserData | null> => {
    if (!user) return null;
  
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userCartRef = collection(db, "users", user.uid, "cartItems")
    const userCartSnap = await getDocs(userCartRef)
  
    if (userSnap.exists()) {
      const data = userSnap.data();
  
      const cartItems = userCartSnap.docs.map(doc => ({
        id: doc.id,
        data: doc.data() as cartInfo, 
      }));
      // Return data extended with uid as `id`
      const userData: UserData = {
        id: user.uid,
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        cart: cartItems || [], // default to empty cart if undefined
      };
  
      return userData;
    } else {
      console.log("No user data found in Firestore");
      return null;
    }
  };