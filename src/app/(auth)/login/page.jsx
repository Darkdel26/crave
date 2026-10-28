"use client"
import Header from "@/components/public/Header";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setData((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(data)
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex flex-1 items-center justify-center">
                <div className="conteneur">
                    <div className="max-w-lg mx-auto p-8 rounded-lg flex flex-col gap-5 shadow-sm bg-amber-50">
                        <h1 className="text-2xl font-bold">Se connecter</h1>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">ADRESSE E-MAIL</label>
                                <input 
                                    type="text" 
                                    className="py-2 px-4 outline-none rounded-md border border-amber-700 text-sm"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium">MOT DE PASSE</label>
                                <input 
                                    type="password" 
                                    className="py-2 px-4 outline-none rounded-md border border-amber-700 text-sm"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <button type="submit" disabled={loading} className="cursor-pointer w-full p-4 text-center bg-amber-700 text-white disabled:opacity-70">Se connecter</button>
                        </form>

                        <p className="text-sm text-center">Première visite ? <Link href="/register" className="underline text-amber-700">Créer un compte</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
