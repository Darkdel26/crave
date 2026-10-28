import Link from "next/link";

export default function Footer() {

    return (
        <div className="bg-amber-900 py-15 text-white">
            <div className="conteneur flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full md:w-2/4">
                        <h2 className="text-lg md:text-xl font-semibold">Crave.</h2>
                        <p className="text-xs md:text-sm">Le beau, le bon, fait avec passion</p>
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/4">
                        <h2 className="text-lg md:text-xl font-semibold">EXPLORER</h2>
                        <ul className="flex flex-col gap-1">
                            <Link href="/our-specialties" className="text-xs md:text-sm">Nos spécialités</Link>
                            <Link href="/our-history" className="text-xs md:text-sm">Notre histoire</Link>
                            <Link href="/contact" className="text-xs md:text-sm">Contact</Link>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1 w-full md:w-1/4">
                        <h2 className="text-lg md:text-xl font-semibold">À VOTRE SERVICE</h2>
                        <ul className="flex flex-col gap-1">
                            <Link href="/login" className="text-xs md:text-sm">Mon compte</Link>
                            <Link href="/cart" className="text-xs md:text-sm">Non panier</Link>
                        </ul>
                    </div>
                </div>

                <hr />

                <p className="mb-0 text-xs md:text-sm text-left md:text-center">&copy; 2025 - Tout les droits sont reservés</p>
            </div>
        </div>
    )
}
