import { db } from "../firebase/firebase";
import { Note } from "../pages/admin/[user]";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export const deleteNoteFromSubjects = async () => {};

export const deleteNote = async (note: Note, email: string) => {
    const { type, subject, id } = note;
    try {
        const uploaderRef = doc(db, "uploaders", email, "notes", id);
        await deleteDoc(uploaderRef);
        try {
            const subjectRef = doc(db, "subjects", subject, type, id);
            await deleteDoc(subjectRef);
        } catch (err) {
            throw Error(err.message);
        }
    } catch (err) {
        throw Error(err.message);
    }
};

export const updateNameAndUrl = async (
    note: Note,
    email: string,
    newValues: { name: string; url: string }
) => {
    const { name, url } = newValues;
    const { id, subject, type } = note;
    console.log(id);
    try {
        const uploaderRef = doc(db, "uploaders", email, "notes", id);
        await updateDoc(uploaderRef, { name, url });
        try {
            const subjectRef = doc(db, "subjects", subject, type, id);
            await updateDoc(subjectRef, { name, url });
            console.log("Update successfully");
        } catch (err) {
            console.log("error from subjects");
            throw Error(err.message);
        }
    } catch (err) {
        console.log("error from uploaders");
        throw Error(err.message);
    }
};
