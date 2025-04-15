"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth, db } from '@/app/firebase/config'
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignUp = async () => {
    if(firstName == '' || lastName == '' || email == '' || password == '' || cPassword == ''){
      alert("You have to fill all inputs")
      return
    }
    if(password !== cPassword){
      alert("passwords must match")
      return
    }
    if(!agreeToTerms){
      alert("You must agree to Terms of Service & Privacy Policy")
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(email, password)
        console.log({userCredential})
        const user = userCredential?.user
        await setDoc(doc(db, "users", user!.uid), {
          first_name: firstName,
          last_name: lastName,
          email: user?.email
        });
        setEmail('')
        setPassword('')
        router.push("/")
    }
    catch (e){
        alert("something went wrong, maybe try a different email")
        console.error(e)
    }
  }

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password)
        console.log({res})
        setEmail('')
        setPassword('')
        router.push("/")
    } catch(e){
        console.error(e)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h1>

        <div className="space-y-4">
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </>
          )}

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {isSignUp && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setCPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <p className="ml-3 text-gray-500 text-xs">I’ve read and agree to the <Link href="/terms-of-service" className="underline">Terms of Service</Link> and <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.</p>
              </div>
            </>
          )}

          <button
            onClick={() => isSignUp ? handleSignUp() : handleSignIn()}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:underline"
          >
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
