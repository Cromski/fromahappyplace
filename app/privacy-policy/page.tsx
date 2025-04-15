import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-sm text-gray-800">
      <h1 className="text-2xl font-semibold mb-6">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Effective Date: 15/04-2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">1. What We Collect</h2>
          <p>When you sign up or place an order, we collect:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your first and last name</li>
            <li>Your email address</li>
            <li>Your shopping cart and order history</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">2. How We Use Your Info</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>To save your cart between visits</li>
            <li>To show your name on the site when logged in</li>
            <li>To keep a history of your past purchases</li>
          </ul>
          <p className="mt-2">
            We don’t sell your data or use it for ads. It’s only used to make the site work
            properly.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">3. Payments</h2>
          <p>
            All payments are handled securely by <strong>Stripe</strong>. We don’t store any credit
            card information ourselves. Stripe may collect billing and payment data as part of the
            checkout process — see their{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">4. Where Your Data Lives</h2>
          <p>
            We use <strong>Firebase (by Google)</strong> to securely store your information. Your
            data may be stored on servers in the EU or US depending on your location.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">5. Cookies</h2>
          <p>
            We may use essential cookies to keep you logged in or remember your cart. These are
            required for the site to function. No tracking or marketing cookies are used.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">6. Your Rights</h2>
          <p>
            You can contact us anytime to ask what data we have, just email{" "}
            <a href="mailto:noEmail@yet.com" className="underline">
              noEmail@yet.com
            </a>
            .
            <br/>
            To delete your account, head over to your <Link href="/profile" className="underline">profile</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">7. Updates</h2>
          <p>
            We may update this policy occasionally. If we do, we’ll update the “Effective Date” at
            the top of this page.
          </p>
        </div>
      </section>
    </main>
  );
}
