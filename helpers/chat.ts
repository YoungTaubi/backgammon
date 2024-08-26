import { db } from "@/firebase/config";
import { User } from "@/lib/features/userSlice";
import { doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { uid } from 'uid';

export async function createChat(myUser: User, chatPartner: User) {
    const chatId = uid(32);
    const ref = doc(db, "chats", chatId);
    await setDoc(ref, {
        chatPartners: [
            {
                userName: myUser.userName,
                id: myUser.id
            },
            {
                userName: chatPartner.userName,
                id: chatPartner.id
            },
        ]
    });
    const myUserRef = doc(db, "users", myUser.id);
    const myFriendRef = doc(db, "users", chatPartner.id);
    await updateDoc(myUserRef, {
        chats: arrayUnion(
            {
                chatPartnerName: chatPartner.userName,
                chatPartnerId: chatPartner.id,
                chatId
            }
        )
    });
    await updateDoc(myFriendRef, {
        chats: arrayUnion(
            {
                chatPartnerName: myUser.userName,
                chatPartnerId: myUser.id,
                chatId
            }
        )
    });
}