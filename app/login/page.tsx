"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

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
                className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          )}

          <button
            onClick={() => alert("bingo")}
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
