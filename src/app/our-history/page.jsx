"use client"
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import SectionTitle from "@/components/SectionTitle";

export default function OurHistoryPage() {
    return (
        <div className="flex flex-col">
            <Header />

            <div className="py-20 bg-slate-100">
                <div className="conteneur">
                    <div className="mb-20">
                        <SectionTitle title="Notre histoire" subtitle="De la farine, du beurre, et du coeur." />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <div className="overflow-hidden h-75">
                                <img src="/about-img.jpg" alt="Crâve" className="object-cover transition duration-300 hover:scale-105 size-full"  />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <p className="text-sm md:text-lg">
                                Depuis 2012, Crave et son équipe imaginent une pâtisserie sincère, contemporaine et généreuse. Ici, tout est préparé sur place, en petites quantités, dans le respect du produit de saisons.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
