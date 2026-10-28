"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    ShieldCheck,
    UserRound,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    LoaderCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAdminPage() {
    const router = useRouter()

    const [data, setData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Remplace par ton appel API de création d'administrateur.
            console.log("Données valides : ", data);
        } catch (error) {
            console.error("Erreur :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full bg-muted/30 p-4 sm:p-6 lg:p-10">
            <div className="w-full space-y-8">

                {/* Formulaire */}
                <Card className="w-full shadow-sm">
                    <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                <UserRound className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle>Enregistrer un administrateur</CardTitle>
                                <CardDescription className="mt-1">
                                    Renseignez les informations pour créer un nouveau compte administrateur.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-5 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">

                            {/* Nom */}
                            <div className="space-y-2">
                                <Label htmlFor="lastName">NOM</Label>

                                <div className="relative">
                                    <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={data.lastName}
                                        className="h-11 pl-10"
                                    />
                                </div>

                                {errors.lastName && (
                                    <p className="text-sm text-destructive">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>

                            {/* Prénom */}
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom(s)</Label>

                                <div className="relative">
                                    <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={data.firstName}
                                        onChange={handleChange}
                                        className="h-11 pl-10"
                                    />
                                </div>

                                {errors.firstName && (
                                    <p className="text-sm text-destructive">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse email</Label>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="h-11 pl-10"
                                    />
                                </div>

                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Mot de passe */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>

                                <div className="relative">
                                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={data.password}
                                        onChange={handleChange}
                                        className="h-11 pl-10 pr-11"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Boutons */}
                            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={loading}
                                    onClick={() => router.push('/super-admin/admins')}
                                    className="h-11"
                                >
                                    Annuler
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="h-11 gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            Enregistrer
                                        </>
                                    )}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </main>
    );
}
