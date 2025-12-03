import { signOut } from "firebase/auth";
import { auth } from "@/library/firebase";

export async function signingOut() {
    try{
        await signOut(auth);
    } catch (error){
        console.error("Error when signing out:", error)
    }
}