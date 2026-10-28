"use server";
import { userInfosSchema, userPwdsSchema } from "@/schemas/profile";

export async function updateProfileInfos(data) {
    const result = userInfosSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;

        return {
            status: 422,
            errors: JSON.parse(JSON.stringify(errors)),
        };
    }
}

export async function updateProfilePwds(data) {
    const result = userPwdsSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;

        return {
            status: 422,
            errors: JSON.parse(JSON.stringify(errors)),
        };
    }
}