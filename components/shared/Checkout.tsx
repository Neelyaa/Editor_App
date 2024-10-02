"use client"

import { loadStripe } from "@stripe/stripe-js"
import { useEffect } from "react"

import { useToast } from "@/hooks/use-toast"
import { checkoutCredits } from "@/lib/actions/transaction.action"


import { Button } from "../ui/button"

const Checkout = ({
    plan,
    amount,
    credits,
    buyerId,
}: {
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
}) => {
    const { toast } = useToast();

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            toast({
                title: "Achat confirmé !",
                description: "Vous allez recevoir un e-mail de confirmation",
                duration: 5000,
                className: "success-toast",
            });
        }

        if (query.get("canceled")) {
            toast({
                title: "Achat annulé",
                description: "L'achat n'a pas pu être confirmé",
                duration: 5000,
                className: "error-toast",
            });
        }
    }, []);

    const onCheckout = async () => {
        const transaction = {
            plan,
            amount,
            credits,
            buyerId,
        };

        await checkoutCredits(transaction);
    };

    return (
        <form action={onCheckout} method="POST">
            <section>
                <Button
                    type="submit"
                    role="link"
                    className="w-full rounded-full bg-purple-gradient bg-cover"
                >
                    Acheter
                </Button>
            </section>
        </form>
    );
};

export default Checkout