import { z } from "zod";

// Validation des informations personnelles
export const userInfosSchema = z.object({
    lastName: z
        .string()
        .trim()
        .min(2, "Le nom doit contenir au moins 2 caractères.")
        .max(15, "Le nom ne doit pas dépasser 15 caractères."),
    firstName: z
        .string()
        .trim()
        .min(2, "Le prénom doit contenir au moins 2 caractères.")
        .max(15, "Le prénom ne doit pas dépasser 15 caractères."),

    email: z
        .string()
        .trim()
        .min(1, "L'adresse e-mail est obligatoire.")
        .pipe(z.email("L'adresse e-mail est invalide.")),
});

// Validation des mots de passe
export const userPwdsSchema = z.object({
    currentPwd: z
        .string()
        .trim()
        .min(1, "Le mot de passe actuel est obligatoire."),
    newPwd: z
        .string()
        .trim()
        .min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères."),
    confirmPwd: z
        .string()
        .trim()
        .min(1, "La confirmation du mot de passe est obligatoire."),
})
    .refine((data) => data.newPwd === data.confirmPwd, {
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirmPwd"],
    });