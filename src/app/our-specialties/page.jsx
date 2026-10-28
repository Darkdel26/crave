"use client"
import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";
import SectionTitle from "@/components/SectionTitle";
import { specialties } from "@/data/data";
import { addProduct } from "@/lib/cart";
import Image from "next/image";
import { useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function OurSpecialtiesPage() {

    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6;

    const filteredSpecialities = specialties.filter((item) =>
        item.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
        item.price.toLocaleString().toLowerCase().includes(searchText.trim().toLowerCase())
    );

    const totalPages = Math.ceil(filteredSpecialities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage
    const paginatedSpecialities = filteredSpecialities.slice(startIndex, endIndex);

    const goToPage = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div className="flex flex-col">
            <Header />

            <div className="py-20 bg-slate-100">
                <div className="conteneur">
                    <div className="mb-10">
                        <SectionTitle title="Nos incontournables" subtitle="Chaque création raconte une histoire de saison, de texture et de précision. À savouver seul, ou mieux encore, à partager." />
                    </div>

                    <div className="flex mb-10">
                        <input
                            type="search"
                            className="border border-amber-700 px-4 py-2 outline-none rounded-full text-sm focus:border-amber-900 max-w-md w-full"
                            placeholder="Rechercher..."
                            value={searchText}
                            onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedSpecialities.map((item, index) => (
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

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2.5 rounded-full bg-white border disabled:opacity-40 cursor-pointer">
                                <FaAngleLeft className="size-5" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} onClick={() => goToPage(page)} className={`size-10 rounded-full cursor-pointer ${currentPage === page ? "bg-amber-700 text-white font-bold" : "bg-white border hover:border-amber-50"}`}>
                                    {page}
                                </button>
                            ))}
                            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2.5 rounded-full bg-white border disabled:opacity-40 cursor-pointer">
                                <FaAngleRight className="size-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}
