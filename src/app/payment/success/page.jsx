"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LucideCheck, LucideCheckCircle, LucideCopyCheck, LucideShoppingBag } from "lucide-react";
// import { LuCheck, LuCopy, LuShoppingBag, LuCheckCircle } from "react-icons/lu";

function SuccessContent() {
    const searchParams = useSearchParams();

    const reference = searchParams.get("reference") || "";
    const orderId = searchParams.get("orderId") || "";

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const launchConfetti = async () => {
            const confetti = (await import("canvas-confetti")).default;

            if (cancelled) return;

            // Première explosion
            confetti({
                particleCount: 120,
                spread: 100,
                origin: { y: 0.6 },
                colors: ["#16a34a", "#f59e0b", "#ffffff", "#0f766e"],
            });

            // Deuxième explosion
            setTimeout(() => {
                if (cancelled) return;

                confetti({
                    particleCount: 70,
                    angle: 60,
                    spread: 65,
                    origin: { x: 0, y: 0.65 },
                    colors: ["#16a34a", "#f59e0b", "#0f766e"],
                });

                confetti({
                    particleCount: 70,
                    angle: 120,
                    spread: 65,
                    origin: { x: 1, y: 0.65 },
                    colors: ["#16a34a", "#f59e0b", "#0f766e"],
                });
            }, 400);
        };

        launchConfetti();

        return () => {
            cancelled = true;
        };
    }, []);

    const copyReference = async () => {
        try {
            await navigator.clipboard.writeText(reference);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Impossible de copier la référence", error);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 via-white to-amber-50 px-4 py-12">
            {/* Décoration de fond */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

            <section className="relative w-full max-w-lg animate-[fadeInUp_0.7s_ease-out]">
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-emerald-900/10">

                    {/* En-tête */}
                    <div className="bg-emerald-700 px-6 py-8 text-center text-white sm:px-10">
                        <div className="mx-auto mb-4 flex h-20 w-20 animate-[successPop_0.6s_ease-out] items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
                            <LucideCheck className="h-11 w-11 stroke-[3]" />
                        </div>
                        <h1 className="text-2xl font-extrabold sm:text-3xl">
                            Félicitations !
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-emerald-50">
                            Votre paiement a été effectué avec succès.
                            Merci pour votre confiance !
                        </p>
                    </div>

                    {/* Détails de la commande */}
                    <div className="px-6 py-8 sm:px-10">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <LucideShoppingBag className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="font-bold text-slate-800">
                                    Détails de la commande
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Conservez ces informations.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Identifiant de commande
                                </p>

                                <p className="break-all font-mono text-sm font-bold text-slate-800">
                                    {orderId || "Non disponible"}
                                </p>
                            </div>

                            <div className="border-t border-dashed border-slate-200" />

                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Référence de paiement
                                </p>

                                <div className="flex items-center justify-between gap-3">
                                    <p className="break-all font-mono text-sm font-bold text-emerald-800">
                                        {reference || "Non disponible"}
                                    </p>

                                    {reference && (
                                        <button
                                            type="button"
                                            onClick={copyReference}
                                            aria-label="Copier la référence"
                                            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-600 hover:text-emerald-700"
                                        >
                                            {copied ? (
                                                <>
                                                    <LucideCheckCircle className="h-4 w-4" />
                                                    Copié
                                                </>
                                            ) : (
                                                <>
                                                    <LucideCopyCheck className="h-4 w-4" />
                                                    Copier
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                            <LucideCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />

                            <p className="text-sm leading-6 text-emerald-900">
                                Votre paiement a été confirmé. Gardez votre
                                référence pour faciliter le suivi de votre
                                commande.
                            </p>
                        </div>

                        <a
                            href="/our-specialties"
                            className="mt-7 flex w-full items-center justify-center rounded-xl bg-amber-800 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-900/10 transition hover:-translate-y-0.5 hover:bg-amber-900 hover:shadow-xl"
                        >
                            Continuer mes achats
                        </a>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(24px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes successPop {
                    0% {
                        opacity: 0;
                        transform: scale(0.4) rotate(-20deg);
                    }
                    70% {
                        transform: scale(1.12) rotate(5deg);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) rotate(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    section {
                        animation: none !important;
                    }
                }
            `}</style>
        </main>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-white text-slate-500">
                    Chargement de la confirmation...
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
