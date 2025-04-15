import Link from "next/link";
import React from "react";

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-sm text-gray-800">
      <h1 className="text-2xl font-semibold mb-6">Terms of Service</h1>

      <p className="text-gray-500 mb-8">Effective Date: 15/04-2025</p>

      <section className="space-y-6">
        <div>
          <h1 className="text-lg font-medium mb-2">1. Who We Are</h1>
          <p>
            We’re an online clothing store. Our goal is to make shopping smooth, fun,
            and secure. If you have any questions, just reach out to us at{" "}
            <Link href="mailto:noEmail@yet.com" className="underline">
              noEmail@yet.com
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">2. What You Can Do Here</h2>
          <div>
            <p>You’re welcome to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Browse and buy clothing from our online shop</li>
              <li>Create an account to save your name, cart, and order history</li>
              <li>View your past purchases and saved items</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">3. Please Use the Site Respectfully</h2>
          <p>
            We want this to be a smooth and simple shopping experience for everyone.
            Just a few basic expectations:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Don’t use fake names or info when signing up</li>
            <li>Don’t try to access things you shouldn’t</li>
            <li>Don’t break the site or use it in a sketchy way</li>
          </ul>
          <p className="mt-2">That’s it! Basically: shop how you’d want others to shop.</p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">4. Accounts & Data</h2>
          <p>When you create an account, we store:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your first and last name</li>
            <li>Your shopping cart</li>
            <li>Your order history</li>
          </ul>
          <p className="mt-2">
            This data is securely stored using Firebase Firestore. For more on how we handle your info,
            see our{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>


        <div>
          <h2 className="text-lg font-medium mb-2">5. Payments</h2>
          <p>
            We use Stripe to securely process payments. We don’t store your card details — that’s
            all handled by Stripe. Their terms and policies may apply when you pay.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">6. Refunds & Returns</h2>
          <p>
            If you're not happy with your order, you can request a return within 14 days of
            receiving it. Items must be unworn and in original condition. Email us to start a
            return:{" "}
            <Link href="mailto:noEmail@yet.com" className="underline">
              noEmail@yet.com
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">7. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. If we do, we’ll update the “Effective
            Date” at the top. By continuing to use the site, you’re agreeing to the updated Terms.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">8. Contact</h2>
          <p>
            Got questions or feedback? Reach us at{" "}
            <Link href="mailto:noEmail@yet.com" className="underline">
              noEmail@yet.com
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
