import { z } from "zod";

export const adminRegisterSchema = z.object({
    lastName: z
        .string()
        .trim()
        .min(2, "2 carctères minimum")
        .max(15, "15 caractères maximum"),

    firstName: z
        .string()
        .trim()
        .min(2, "2 carctères minimum")
        .max(15, "15 caractères maximum"),

    email: z
        .string()
        .trim()
        .min(1, "L'adresse email est obligatoire")
        .email("Veuillez saisir une adresse email valide"),

    password: z
        .string()
        .trim()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
});