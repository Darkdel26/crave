"use client";
import { useState } from "react";
import {
    UserRound,
    LockKeyhole,
    Mail,
    Eye,
    EyeOff
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LuSave } from "react-icons/lu";
import { updateProfileInfos, updateProfilePwds } from "@/server/profile";

export default function AdminProfile() {
    const [errors, setErrors] = useState({})

    const [showCurrentPwd, setShowCurrentPwd] = useState(false)
    const [showNewPwd, setShowNewPwd] = useState(false)
    const [showConfirmPwd, setShowConfirmPwd] = useState(false)

    const [loading, setLoading] = useState(false)

    const [userInfos, setUserInfos] = useState({
        lastName: "",
        firstName: "",
        email: ""
    });

    const [userPwds, setUserPwds] = useState({
        currentPwd: "",
        newPwd: "",
        confirmPwd: ""
    });

    const userInfosChange = (e) => { setUserInfos((prev) => ({ ...prev, [e.target.name]: e.target.value })) }
    const userPwdsChange = (e) => { setUserPwds((prev) => ({ ...prev, [e.target.name]: e.target.value })) }

    const userInfosSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateProfileInfos({
                lastName: userInfos.lastName,
                firstName: userInfos.firstName,
                email: userInfos.email,
            });

            if (res.status == 422) {
                setErrors(res.errors);
            }
            console.log(res);
        } catch (error) {
            console.error("SUBMIT_ADMIN_PROFILE_INFOS_ERROR", error);
        } finally {
            setLoading(false);
        }
    };

    const userPwdsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await updateProfilePwds({
                currentPwd: userPwds.currentPwd,
                newPwd: userPwds.newPwd,
                confirmPwd: userPwds.confirmPwd,
            });

            if (res.status == 422) {
                setErrors(res.errors);
            }
            console.log(res);
        } catch (error) {
            console.error("SUMBIT_ADMIN_PROFILE_PASSWORDS_ERROR ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="w-full space-y-8">

                {/* En-tête */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Paramètres du compte
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Gérez vos informations personnelles et la sécurité de votre compte.
                    </p>
                </div>

                {/* Informations personnelles */}
                <Card className="w-full border-border/60 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <UserRound className="h-5 w-5" />
                            </div>

                            <div className="space-y-1">
                                <CardTitle className="text-lg">
                                    Informations personnelles
                                </CardTitle>
                                <CardDescription>
                                    Modifiez vos informations personnelles.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="pt-6">
                        <form className="space-y-5" autoComplete="off" onSubmit={userInfosSubmit}>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">NOM</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={userInfos.lastName}
                                        onChange={userInfosChange}
                                        disabled={loading}
                                    />
                                    {errors.lastName && (<p className="text-sm text-destructive">{errors.lastName[0]}</p>)}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Prénom(s)</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={userInfos.firstName}
                                        onChange={userInfosChange}
                                        disabled={loading}
                                    />
                                    {errors.firstName && (<p className="text-sm text-destructive">{errors.firstName[0]}</p>)}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Adresse e-mail</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="pl-10"
                                        value={userInfos.email}
                                        onChange={userInfosChange}
                                        disabled={loading}
                                    />
                                </div>
                                {errors.email && (<p className="text-sm text-destructive">{errors.email[0]}</p>)}
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button type="submit" disabled={loading}>
                                    <LuSave className="mr-2 h-4 w-4" />
                                    Enregistrer les modifications
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Modification du mot de passe */}
                <Card className="w-full border-border/60 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <LockKeyhole className="h-5 w-5" />
                            </div>

                            <div className="space-y-1">
                                <CardTitle className="text-lg">
                                    Mot de passe
                                </CardTitle>
                                <CardDescription>
                                    Modifiez votre mot de passe pour sécuriser votre compte.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="pt-6">
                        <form className="space-y-5" autoComplete="off" onSubmit={userPwdsSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="currentPwd">Ancien mot de passe</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPwd"
                                        name="currentPwd"
                                        type={showCurrentPwd ? "text" : "password"}
                                        className="pr-11"
                                        value={userPwds.currentPwd}
                                        onChange={userPwdsChange}
                                        disabled={loading}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {showCurrentPwd ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.currentPwd && (<p className="text-sm text-destructive">{errors.currentPwd[0]}</p>)}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPwd">Nouveau mot de passe</Label>
                                <div className="relative">
                                    <Input
                                        id="newPwd"
                                        name="newPwd"
                                        type={showNewPwd ? "text" : "password"}
                                        className="pr-11"
                                        value={userPwds.newPwd}
                                        onChange={userPwdsChange}
                                        disabled={loading}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowNewPwd(!showNewPwd)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {showNewPwd ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.newPwd && (<p className="text-sm text-destructive">{errors.newPwd[0]}</p>)}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPwd">Confirmer le mot de passe</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPwd"
                                        name="confirmPwd"
                                        type={showConfirmPwd ? "text" : "password"}
                                        className="pr-11"
                                        value={userPwds.confirmPwd}
                                        onChange={userPwdsChange}
                                        disabled={loading}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {showConfirmPwd ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPwd && (<p className="text-sm text-destructive">{errors.confirmPwd[0]}</p>)}
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button type="submit" disabled={loading}>
                                    <LockKeyhole className="mr-2 h-4 w-4" />
                                    Modifier le mot de passe
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}