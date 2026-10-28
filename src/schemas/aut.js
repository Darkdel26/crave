import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "L'adresse email est obligatoire")
        .email("Veuillez saisir une adresse email valide"),
    password: z
        .string()
        .trim()
        .min(1, "Le mot de passe est obligatoire")
});

export const registerSchema = z.object({
    lastName: z
        .string()
        .trim()
        .min(1, "Le nom est obligatoire")
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(15, "Le nom ne doit pas dépasser 15 caractères"),
    firstName: z
        .string()
        .trim()
        .min(1, "Le prénom est obligatoire")
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .max(15, "Le nom ne doit pas dépasser 15 caractères"),
    email: z
        .string()
        .trim()
        .min(1, "L'adresse email est obligatoire")
        .email("Veuillez saisir une adresse email valide"),
    password: z
        .string()
        .trim()
        .min(1, "Le mot de passe est obligatoire")
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
});