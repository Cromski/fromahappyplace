import {  db } from '@/app/firebase/config'
import { doc, getDoc } from "firebase/firestore";
import { User } from 'firebase/auth'

export interface UserData {
    first_name: string,
    last_name: string,
    email: string,
  };


export const fetchUserData = async (user: User | null | undefined) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
    const data = userSnap.data() as UserData;
    return data
    } else {
    console.log("No user data found in Firestore");
    return null
    }
};