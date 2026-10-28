"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import SectionTitle from "@/components/SectionTitle";
import { getCartItems, removeProduct, Increment, Decrement, clearCart } from "@/lib/cart";
import { specialties, deliveryZones, operators } from "@/data/data";
import { LuMinus, LuPlus, LuShoppingCart, LuTrash } from "react-icons/lu";
import Link from "next/link";
import { pay } from "@/server/pay";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [phone, setPhone] = useState("");
    const [deliveryZoneId, setDeliveryZoneId] = useState("");
    const [operator, setOperator] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const router = useRouter();

    useEffect(() => {
        const updateCart = () => { setCart(getCartItems()); };

        updateCart();
        setMounted(true);

        window.addEventListener("cart-updated", updateCart);

        const handleStorage = (event) => {
            if (event.key === "crave-cart") {
                updateCart();
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("cart-updated", updateCart);
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    // Associer les produits du panier aux données des spécialités
    const cartProducts = useMemo(() => {
        return cart.map((item) => {
            const product = specialties.find((specialty) => specialty.id === Number(item.id));

            if (!product) return null;

            return { ...product, qty: Number(item.qty) || 0 };
        }).filter((item) => item && item.qty > 0);
    }, [cart]);

    // Calcul automatique du total
    const totalItems = useMemo(() => {
        return cartProducts.reduce((total, product) => total + product.qty, 0);
    }, [cartProducts]);

    const totalPrice = useMemo(() => {
        return cartProducts.reduce((total, product) => total + product.price * product.qty, 0);
    }, [cartProducts]);

    const selectedZone = deliveryZones.find(
        (zone) => String(zone.id) === deliveryZoneId
    );

    const deliveryFee = Number(selectedZone?.fee ?? 0);

    const grandTotal = totalPrice + deliveryFee;

    const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price) + " FCFA";


    const handleCheckout = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            if (!deliveryZoneId) {
                toast.error("Veuillez choisir une zone de livraison.");
                return;
            }

            const data = await pay({
                operator,
                amount: grandTotal,
                phoneNumber: phone,
            });
            console.log(data)

            if (data?.status === 422) {
                setErrors(data.errors ?? {});
                return;
            }

            if (data?.status === "SUCCESSFUL") {
                clearCart()

                const params = new URLSearchParams({
                    reference: data.reference ?? "",
                    orderId: data.order ?? "",
                });

                router.push(`/payment/success?${params.toString()}`);
                return;
            }

            if (data?.status === "FAILED") {
                toast.error("Solde insuffisant !");
                return;
            }
        } catch (error) {
            console.error("Erreur de paiement :", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 bg-slate-100 py-12 md:py-20">
                <div className="conteneur">
                    <div className="mb-10">
                        <SectionTitle title="Votre panier" />
                    </div>

                    {!mounted ? (
                        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                            <p className="text-slate-500">
                                Chargement de votre panier...
                            </p>
                        </div>
                    ) : cartProducts.length === 0 ? (
                        <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm">
                            <div className="flex justify-center">
                                <LuShoppingCart className="size-10" />
                            </div>

                            <h2 className="mb-3 text-sm font-bold text-slate-800">
                                Votre panier est vide
                            </h2>

                            <Link
                                href="/our-specialties"
                                className="inline-flex items-center justify-center rounded-lg bg-amber-900 px-4 py-2 font-semibold text-white transition hover:bg-amber-700 text-sm"
                            >
                                Découvrir nos spécialités
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                            {/* Liste des produits */}
                            <section className="space-y-4 lg:col-span-2">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => clearCart()}
                                        className="text-sm font-medium text-red-500 transition hover:text-red-700 cursor-pointer"
                                    >
                                        Vider le panier
                                    </button>
                                </div>

                                {cartProducts.map((product, index) => (
                                    <article
                                        key={index}
                                        className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                                    >
                                        {/* Image du produit */}
                                        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
                                            <Image
                                                src={product.img}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 96px"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Informations */}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold text-slate-800 text-sm">
                                                {product.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {formatPrice(product.price)}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => removeProduct(product.id)}
                                                className="mt-3 text-sm text-red-500 transition hover:text-red-700 cursor-pointer"
                                            >
                                                <LuTrash className="size-4" />
                                            </button>
                                        </div>

                                        {/* Quantité */}
                                        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                            <div className="flex items-center rounded-lg border border-slate-200">
                                                <button
                                                    type="button"
                                                    onClick={() => Decrement(product.id)}
                                                    aria-label={`Retirer une unité de ${product.name}`}
                                                    className="flex h-10 w-10 items-center justify-center text-lg text-slate-700 transition hover:bg-slate-100 cursor-pointer"
                                                >
                                                    <LuMinus className="size-4" />
                                                </button>

                                                <span
                                                    aria-live="polite"
                                                    className="min-w-10 text-center font-semibold text-slate-800"
                                                >
                                                    {product.qty}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => Increment(product.id)}
                                                    aria-label={`Ajouter une unité de ${product.name}`}
                                                    className="flex h-10 w-10 items-center justify-center text-lg text-slate-700 transition hover:bg-slate-100 cursor-pointer"
                                                >
                                                    <LuPlus className="size-4" />
                                                </button>
                                            </div>

                                            <p className="font-bold text-orange-600">
                                                {formatPrice(product.price * product.qty)}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </section>

                            {/* Récapitulatif */}
                            <aside className="rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
                                <h2 className="mb-6 text-lg font-bold text-slate-800">
                                    Récapitulatif
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-3 text-slate-600">
                                        <span className="text-sm">Nombre d'articles</span>
                                        <span className="font-semibold text-slate-800">
                                            {totalItems}
                                        </span>
                                    </div>


                                    <div className="flex items-center justify-between gap-3 text-slate-600">
                                        <span className="text-sm">Sous-total</span>
                                        <span className="font-semibold text-slate-800">
                                            {formatPrice(totalPrice)}
                                        </span>
                                    </div>

                                    <div className="mb-6 border-t border-slate-200 pt-5">
                                        <h3 className="mb-4 font-bold text-slate-800">
                                            Informations de livraison
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                                    Numéro de téléphone *
                                                </label>

                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="22901XXXXXXXX"
                                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-amber-700 focus:ring-1"
                                                />

                                                {errors.phoneNumber && (<p className="text-sm text-destructive">{errors.phoneNumber[0]}</p>)}
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700"
                                                >
                                                    Zone de livraison *
                                                </label>

                                                <select
                                                    id="deliveryZone"
                                                    value={deliveryZoneId}
                                                    onChange={(e) => setDeliveryZoneId(e.target.value)}
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-700 focus:ring-1"
                                                >
                                                    <option value="">Choisir une zone</option>

                                                    {deliveryZones.map((zone, index) => (
                                                        <option key={index} value={zone.id}>
                                                            {zone.name} — {formatPrice(zone.fee)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-slate-700"
                                                >
                                                    Opérateur *
                                                </label>

                                                <select
                                                    id="deliveryZone"
                                                    value={operator}
                                                    onChange={(e) => setOperator(e.target.value)}
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-700 focus:ring-1"
                                                >
                                                    <option value="">Choisir un opérateur</option>

                                                    {operators.map((operator, index) => (
                                                        <option key={index} value={operator.id}>
                                                            {operator.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                {errors.operator && (<p className="text-sm text-destructive">{errors.operator[0]}</p>)}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center justify-between gap-3 text-slate-600">
                                        <span className="text-sm">Frais de livraison</span>

                                        <span className="font-semibold text-slate-800 text-base">
                                            {selectedZone
                                                ? formatPrice(deliveryFee)
                                                : "Choisir une zone"}
                                        </span>
                                    </div>

                                    <div className="border-t border-slate-200 pt-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-bold text-slate-800">
                                                Total à payer
                                            </span>

                                            <span className="text-lg font-bold text-amber-900">
                                                {formatPrice(grandTotal)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleCheckout}
                                    className="mt-6 w-full rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 cursor-pointer disabled:bg-amber-100"
                                >
                                    Passer la commande
                                </button>
                            </aside>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}