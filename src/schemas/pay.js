import { z } from "zod";

export const paySchema = z.object({
    operator: z
        .enum(["mtn", "moov", "celtiis"], "Sélectionner un opérateur"),
    amount: z
        .number("Le montant est invalide")
        .min(100, "Le montant minimum est de 100")
        .max(1000000, "Le montant maximum est de 1000000"),
    phoneNumber: z
        .string()
        .trim()
        .length(13, "Le numéro doit contenir exactement 13 chiffres")
        .regex(/^22901\d{8}$/, "Le numéro doit respecter le format 22901XXXXXXXX")
});