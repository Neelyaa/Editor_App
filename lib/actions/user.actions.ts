"use server"
import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreatedUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error);
    }
}

// READ
export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });

        if (!user) throw new Error("Utilisateur inconnu");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

// UPDATE 
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updateUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        });

        if (!updateUser) throw new Error("Erreur, les changements n'ont pas étaient enregistrés");

        return JSON.parse(JSON.stringify(updateUser));
    } catch (error) {
        handleError(error);
    }
}

// DELETE
export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        //Find user to delete
        const userToDelete = await User.findOne({ clerkId });

        if (!userToDelete) {
            throw new Error("Utilistateur inconnu");
        }

        //Delete User
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}

// USER CREDITS
export async function updateCredits(userId: string, creditFee: number) {
    try {
        await connectToDatabase();

        const updateUserCredits = await User.findOneAndUpdate(
            { _id: userId },
            { $inc: { creditBalance: creditFee } },
            { new: true }
        )

        if (!updateUserCredits) throw new Error("Erreur lors de l'ajout de crédit");

        return JSON.parse(JSON.stringify(updateUserCredits));
    } catch (error) {
        handleError(error);
    }
}