"use client"
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import SectionTitle from "@/components/SectionTitle";
import { LuClock, LuMessageCircleDashed } from "react-icons/lu";

export default function ContactPage() {
    return (
        <div className="flex flex-col">
            <Header />

            <div className="py-20 bg-slate-100">
                <div className="conteneur">
                    <div className="mb-20">
                        <SectionTitle title="Venez nous voir" subtitle="La porte est grande ouverte. Passez prendre un café, choisir votre dessert ou simplement dire bonjour." />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="p-4 bg-white shadow-sm rounded-xl flex flex-row gap-4 items-center w-full md:w-1/2">
                            <LuClock className="size-5 text-amber-900" />
                            <ul className="flex flex-col gap-1">
                                <li className="text-lg font-medium">HORAIRES</li>
                                <li className="text-sm">Lundi - Samedi : 8h - 19h30</li>
                                <li className="text-sm">Dimanche : 8h - 14h</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-white shadow-sm rounded-xl flex flex-row gap-4 items-center w-full md:w-1/2">
                            <LuMessageCircleDashed className="size-5 text-amber-900" />
                            <ul className="flex flex-col gap-1">
                                <li className="text-lg font-medium">NOUS ECRIRE</li>
                                <li className="text-sm">contactcrave@gmail.com</li>
                                <li className="text-sm">+229 01 42 81 24 24</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
