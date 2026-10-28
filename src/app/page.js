"use client"
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import SectionTitle from "@/components/SectionTitle";
import { specialties } from "@/data/data";
import { addProduct } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiCartAdd } from "react-icons/bi";
import { LuArrowRight, LuPlus } from "react-icons/lu";

export default function page() {

    const router = useRouter()

    return (
        <>
            <Header />

            <div className="my-20">
                <div className="conteneur">
                    <div className="rounded-md bg-hero bg-cover bg-center bg-no-repeat relative overflow-hidden">
                        <div className="absolute inset-0 backdrop-blur-[1.5px]"></div>
                        <div className="relative z-10 flex flex-col gap-10 py-20 px-10">
                            <h1 className="text-4xl font-bold text-white">La gourmandise, <span className="italic text-amber-950">tout simplement.</span></h1>
                            <p className="text-lg text-white">
                                Des pâtisseries d'exception, façonnées chaque matin dans notre atelier parisien <br /> avec des ingrédients choisis et beaucoup de passion.
                            </p>
                            <div>
                                <button type="button" className="bg-amber-900 cursor-pointer flex items-center gap-4 py-2 px-4 rounded-full text-white group" onClick={() => router.push("/our-specialties")}>
                                    Découvrir le catalogue <LuArrowRight className="size-5 group-hover:transform group-hover:translate-x-1 transition duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-gray-100">
                <div className="conteneur">
                    <div className="mb-10">
                        <SectionTitle title="Quelques unes de nos pâtisseries" subtitle="Petits bonheurs, grandes émotions." />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {specialties.slice(0, 3).map((item, index) => (
                            <div className="flex flex-col bg-white shadow-sm rounded-2xl overflow-hidden" key={index}>
                                <div className="relative overflow-hidden h-55">
                                    <Image src={item.img} alt={item.name} fill className="object-cover hover:scale-105 transition duration-500" />
                                    <button type="button" className="absolute bottom-3 right-3 size-9 flex items-center justify-center rounded-full bg-amber-900 text-white hover:bg-amber-800 cursor-pointer z-10" onClick={() => addProduct(item.id)}>
                                        <BiCartAdd className="size-5" />
                                    </button>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <h3 className="font-bold text-stone-900">{item.name}</h3>
                                    <p className="font-medium text-amber-900">{item.price} FCFA</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Link className="underline text-sm text-amber-700" href="/our-specialties">Voir plus</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
