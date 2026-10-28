"use client"
import Header from "@/components/public/Header";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {

    const [showEmailForm, setShowEmailForm] = useState(true)
    const [email, setEmail] = useState("")

    const [showTokenForm, setShowTokenForm] = useState(false)
    const [token, setToken] = useState("")

    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    
    const handleVerifyEmailSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        console.log(email)
        setEmail(email)
        setShowEmailForm(false)
        setShowTokenForm(true)
        setDisabled(false)
    }
    const handleVerifyTokenSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        console.log(email)
        console.log(token)
        setShowEmailForm(false)
        setShowTokenForm(false)
        setShowNewPasswordForm(true)
        setDisabled(false)
    }
    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        console.log(email)
        console.log(newPassword)
        setShowEmailForm(false)
        setShowTokenForm(false)
        setShowNewPasswordForm(false)
        setDisabled(false)
    }

    const [disabled, setDisabled] = useState(false)

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex-1 flex justify-center items-center">
                <div className="conteneur">
                    <div className="max-w-lg shadow-sm rounded-md mx-auto p-4">
                        <h1 className="text-lg md:text-xl font-medium">
                            {showEmailForm && "Vérification de mon adresse email"}
                            {showTokenForm && "Vérification du code envoyé par email"}
                            {showNewPasswordForm && "Mis à jour de mon mot de passe"}
                        </h1>

                        {showEmailForm && (
                            <form onSubmit={handleVerifyEmailSubmit} className="flex flex-col space-y-5 mt-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">E-mail</label>
                                    <input
                                        type="text"
                                        className="bg-1/20 rounded-md outline-none py-2 px-4 text-sm"
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={disabled}
                                        value={email}
                                    />
                                </div>
                                <div>
                                    <button type="submit" disabled={disabled} className="py-2 px-4 text-center bg-5 text-white w-full rounded-full cursor-pointer hover:bg-5/90 transition duration-300">Confirmer</button>
                                </div>

                                <p className="text-sm text-center">J'ai déjà un compte <Link href="/login" className="underline text-5">Se connecter</Link></p>
                            </form>
                        )}

                        {showTokenForm && (
                            <form onSubmit={handleVerifyTokenSubmit} className="flex flex-col space-y-5 mt-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">Code</label>
                                    <input
                                        type="text"
                                        className="bg-1/20 rounded-md outline-none py-2 px-4 text-sm"
                                        onChange={(e) => setToken(e.target.value)}
                                        disabled={disabled}
                                        value={token}
                                        maxLength={6}
                                    />
                                </div>
                                <div>
                                    <button type="submit" disabled={disabled} className="py-2 px-4 text-center bg-5 text-white w-full rounded-full cursor-pointer hover:bg-5/90 transition duration-300">Confirmer</button>
                                </div>

                                <p className="text-sm text-center">J'ai déjà un compte <Link href="/login" className="underline text-5">Se connecter</Link></p>
                            </form>
                        )}

                        {showNewPasswordForm && (
                            <form onSubmit={handleNewPasswordSubmit} className="flex flex-col space-y-5 mt-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="bg-1/20 rounded-md outline-none py-2 px-4 text-sm"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={disabled}
                                        value={newPassword}
                                    />
                                </div>
                                <div>
                                    <button type="submit" disabled={disabled} className="py-2 px-4 text-center bg-5 text-white w-full rounded-full cursor-pointer hover:bg-5/90 transition duration-300">Confirmer</button>
                                </div>

                                <p className="text-sm text-center">J'ai déjà un compte <Link href="/login" className="underline text-5">Se connecter</Link></p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}