"use server"
import { paySchema } from "@/schemas/pay"
const test_key = process.env.FEEX_PAY_API_KEY
const shop_id = process.env.FEEX_PAY_ID

function generateOrderId() {
    return `cmd-${Math.random().toString(36).substring(2, 7)}`;
}

export async function pay(data) {

    const result = paySchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;

        return {
            status: 422,
            errors: JSON.parse(JSON.stringify(errors)),
        };
    }

    const { operator, amount, phoneNumber } = result.data;

    if (!test_key || !shop_id) {
        console.error("La configuration FeexPay est manquante")
        return {
            status: 500,
            message: "La configuration FeexPay est manquante",
        };
    }

    if (operator === "mtn") {
        const orderId = generateOrderId();
        try {
            const response = await fetch("https://sandbox-api.feexpay.me/api/transactions/public/requesttopay/mtn", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${test_key}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount,
                    phoneNumber,
                    shop: shop_id,
                    description: `Commande ${orderId}`,
                    callback_info: {
                        order: orderId
                    }
                })
            });
            const result = await response.json()
            return {
                status: result.status,
                reference: result.reference,
                order: result.callback_info.order
            };
        } catch (error) {
            console.error("MTN_PAYMENT_ERROR : ", error)
        }
    }

    if (operator === "moov") {
        const orderId = generateOrderId();
        try {
            const response = await fetch("https://sandbox-api.feexpay.me/api/transactions/public/requesttopay/moov", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${test_key}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount,
                    phoneNumber,
                    shop: shop_id,
                    description: `Commande ${orderId}`,
                    callback_info: {
                        order: orderId
                    }
                })
            });
            const result = await response.json()
            return {
                status: result.status,
                reference: result.reference,
                order: result.callback_info.order
            };
        } catch (error) {
            console.error("MOOV_PAYMENT_ERROR : ", error)
        }
    }

    if (operator === "celtiis") {
        const orderId = generateOrderId();
        try {
            const response = await fetch("https://sandbox-api.feexpay.me/api/transactions/public/requesttopay/celtiis_bj", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${test_key}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount,
                    phoneNumber,
                    shop: shop_id,
                    description: `Commande ${orderId}`,
                    callback_info: {
                        order: orderId
                    }
                })
            });
            const result = await response.json()
            return {
                status: result.status === "PENDING" ? "SUCCESSFUL" : "FAILED",
                reference: result.reference,
                order: result.callback_info.order
            };
        } catch (error) {
            console.error("CELTIIS_PAYMENT_ERROR : ", error)
        }
    }
}