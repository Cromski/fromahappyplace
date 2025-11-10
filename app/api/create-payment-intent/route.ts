import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json()

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "dkk",
            automatic_payment_methods: { enabled: true },
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret})

    } catch (error) {
        console.error("Megaa dårlig Internal Error: (route.ts)", error)
        return NextResponse.json(
            { error: `Mega dårlig Internal Server Error fra (route.ts): ${error}`},
            { status: 500 }
        )
    }
}
