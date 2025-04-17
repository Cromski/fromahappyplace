import {  db } from '@/app/firebase/config'
import { doc, getDoc } from "firebase/firestore";
import { User } from 'firebase/auth'
import { UserData } from '../stores/userStore';

  export const fetchUserData = async (user: User | null | undefined): Promise<UserData | null> => {
    if (!user) return null;
  
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
  
    if (userSnap.exists()) {
      const data = userSnap.data();
  
      // Return data extended with uid as `id`
      const userData: UserData = {
        id: user.uid,
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        cart: data.cart || [], // default to empty cart if undefined
      };
  
      return userData;
    } else {
      console.log("No user data found in Firestore");
      return null;
    }
  };