import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/firebase";
import {
    btnBackground,
    btnBorder,
    btnText,
    hoverBorderColor,
} from "../../../helpers/colors";
import { MdDelete } from "react-icons/md";

interface Props {}

interface Note {
    id: string;
    name: string;
    url: string;
    uploadedBy: string;
    uploadedAt: string;
    subject: string;
    type: string;
}

const DynamicFaculty = (props: Props) => {
    const { currentUser, logout } = useAuth();

    // States
    const [notes, setNotes] = useState<Array<Note>>([]);
    const [subjects, setSubjects] = useState<Array<string>>([]);

    // Effects
    useEffect(() => {
        console.log(currentUser);

        db.collection("faculties")
            .doc(currentUser.email)
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

        db.collection("faculties")
            .doc(currentUser.email)
            .get()
            .then((res) => setSubjects(res.data().subjects));
    }, []);

    // Functions

    const deleteNoteFromSubjects = async ({ type, subject, id }: Note) => {
        db.collection("subjects")
            .doc(subject)
            .collection(type)
            .doc(id)
            .delete()
            .then(() => console.log("Deleted from subjects"))
            .catch((err) => console.log(err));
    };

    const deleteNoteFromFaculty = async ({ id }: Note) => {
        db.collection("faculties")
            .doc(currentUser.email)
            .collection("notes")
            .doc(id)
            .delete()
            .then(() => console.log("Deleted from faculties"))
            .catch((err) => console.log(err));
    };

    const deleteNote = async (note: Note) => {
        console.log(note);
        await deleteNoteFromSubjects(note);
        await deleteNoteFromFaculty(note);
    };

    return (
        <section className="my-14 container">
            <Heading mb={12}>Welcome {currentUser.name}</Heading>
            <Box mb={6}>
                <Text fontSize="2xl" fontWeight="medium" mb={3}>
                    Subjects {currentUser.name} teach
                </Text>
                <ul className="ml-4">
                    {subjects?.map((subject) => (
                        <li key={subject}>{subject}</li>
                    ))}
                </ul>
            </Box>
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
                                <Popover>
                                    {({ onClose }) => (
                                        <>
                                            <PopoverTrigger>
                                                <Button
                                                    mt={3}
                                                    variant="unstyled"
                                                    className="float-right cursor-pointer"
                                                >
                                                    <Icon
                                                        as={MdDelete}
                                                        boxSize="7"
                                                    />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                borderColor={btnBorder}
                                                borderWidth="2px"
                                                _focus={{
                                                    borderColor: btnBorder,
                                                    borderWidth: "2px",
                                                }}
                                                width="fit-content"
                                            >
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader>
                                                    Confirmation!
                                                </PopoverHeader>
                                                <PopoverBody className="flex justify-between space-x-4">
                                                    <Button
                                                        onClick={() =>
                                                            deleteNote(note)
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </>
                                    )}
                                </Popover>
                            </div>
                        </li>
                    ))}
                    {notes.length === 0 && (
                        <li>Looks like you have not uploaded any notes yet</li>
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
                    onClick={logout}
                >
                    <Link href="/upload">Log out</Link>
                </Button>
            </Flex>
        </section>
    );
};

export default DynamicFaculty;
