import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeletePopup from "../../../components/faculty/DeletePopup";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/firebase";
import {
    btnBackground,
    btnText,
    hoverBorderColor,
} from "../../../helpers/colors";

interface Props {}

export interface Note {
    id: string;
    name: string;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
    subject: string;
    type: string;
}

const DynamicFaculty = (props: Props) => {
    const router = useRouter();
    const { currentUser, logout } = useAuth();

    // States
    const [notes, setNotes] = useState<Array<Note>>([]);

    // Effects
    useEffect(() => {
        let isMounted = true;

        db.collection("faculties")
            .doc(currentUser?.email)
            .collection("notes")
            .onSnapshot((snapShot) => {
                setNotes(
                    snapShot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        uploadedBy: doc.data().uploadedBy,
                        uploadedAt: doc.data().uploadedAt,
                        subject: doc.data().subject,
                        type: doc.data().type,
                    }))
                );
            });

        return () => {
            isMounted = false;
        };
    }, [currentUser]);

    return (
        <section className="my-14 container">
            <Heading>Welcome {currentUser?.name}</Heading>
            <Box mb={6}>
                <Text fontSize="2xl" fontWeight="medium" mb={3}>
                    Notes uploaded by you
                </Text>
                <ul className="flex flex-wrap">
                    {notes?.map((note) => (
                        <li
                            key={note.id}
                            className="bg-cardBg p-4 m-4 rounded-md shadow-md"
                        >
                            <div>
                                Name: {note.name}
                                <br />
                                URL:{" "}
                                <a
                                    target="_blank"
                                    href="https://drive.google.com/file/d/1wEqfksAdJwi_LcnpKelS0i3Gjyl10gIl/view?usp=sharing"
                                >
                                    URL Link
                                </a>
                                <br />
                                Uploaded at: {note.uploadedAt}
                                <br />
                                Subject: {note.subject}
                                <br />
                                Type: {note.type}
                            </div>
                            <div>
                                <DeletePopup
                                    currentUserEmail={currentUser?.email}
                                    note={note}
                                />
                            </div>
                        </li>
                    ))}
                    {notes.length === 0 && (
                        <li>
                            It's like a desert in here! <br /> You haven't
                            uploaded any notes
                        </li>
                    )}
                </ul>
            </Box>
            <Flex className="space-x-2">
                <Button
                    variant="solid"
                    backgroundColor={btnBackground}
                    textColor={btnText}
                    _hover={{
                        backgroundColor: hoverBorderColor,
                        transitionProperty:
                            "background-color, border-color, color",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)",
                        transitionDuration: "500ms",
                    }}
                >
                    <Link href="/upload">Upload Notes</Link>
                </Button>
                <Button
                    variant="solid"
                    backgroundColor={btnBackground}
                    textColor={btnText}
                    _hover={{
                        backgroundColor: hoverBorderColor,
                        transitionProperty:
                            "background-color, border-color, color",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)",
                        transitionDuration: "500ms",
                    }}
                    onClick={() => {
                        logout().then(() => {
                            router.push("/");
                        });
                    }}
                >
                    Log out
                </Button>
            </Flex>
        </section>
    );
};

export default DynamicFaculty;
