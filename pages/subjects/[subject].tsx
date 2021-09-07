import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { db } from "../../firebase/firebase";
import { Note } from "../admin/[user]";
import details from "../../public/details.json";
import Link from "next/link";
import EditPopup from "../../components/user/EditPopup";
import { useAuth } from "../../context/AuthContext";
import DeletePopup from "../../components/user/DeletePopup";
import {
    Popover,
    PopoverCloseButton,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
} from "@chakra-ui/popover";
import { btnBorder } from "../../helpers/colors";

interface Props {}

const SubjectNotes = ({}: Props) => {
    const router = useRouter();
    const { subject, sem, group }: any = router.query;
    const { currentUser } = useAuth();

    const types: Array<string> = [
        "notes",
        "important questions",
        "question papers",
        "syllabus",
    ];

    const [notes, setNotes] = useState<Array<Note>>([]);

    useEffect(() => {
        setNotes([]);
        types.forEach((type) => {
            db.collection("subjects")
                .doc(subject)
                .collection(type)
                .onSnapshot((snap) => {
                    setNotes((prevNotes) => [
                        ...prevNotes,
                        ...snap.docs.map((doc) => ({
                            name: doc.data().name,
                            subject: doc.data().subject,
                            type: doc.data().type,
                            uploadedAt: doc.data().uploadedAt,
                            uploadedBy: doc.data().uploadedBy,
                            url: doc.data().url,
                            id: doc.id,
                        })),
                    ]);
                });
        });
    }, [subject]);

    const copyHandler = () => {
        navigator.clipboard.writeText(
            `https://yourounotes.vercel.app/subjects/${subject}?sem=${sem}&group=${group}`
        );
    };

    const copyNoteHandler = (noteUrl: string) => {
        navigator.clipboard.writeText(noteUrl);
    };

    return (
        <>
            <Head>
                <title>{subject} | Your OU Notes</title>
            </Head>
            <section className="container">
                {notes.filter((x) => x.name).length === 0 && (
                    <div className="colCenter px-8 py-4 h-64">
                        <p>We don't have the notes of {subject}.</p>
                    </div>
                )}
                {notes
                    ?.filter((x) => x.name)
                    ?.sort((a, b) =>
                        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
                    )
                    ?.map((note, index) => (
                        <div className="colCenter my-14" key={index}>
                            <div className="colCenter border-b-2 pb-4 space-y-4">
                                <a
                                    href={note.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium"
                                >
                                    {note.name}➚
                                </a>
                                <div>
                                    <p className="text-btn">
                                        Uploaded At:{" "}
                                        <span className="text-para">
                                            {note.uploadedAt}
                                        </span>
                                    </p>
                                    <p className="text-btn">
                                        Uploaded by: {"   "}
                                        <span className="text-para">
                                            {note.uploadedBy}
                                        </span>
                                    </p>
                                    <p className="text-btn">
                                        Type: {"   "}
                                        <span className="text-para">
                                            {note.type}
                                        </span>
                                    </p>
                                    <Popover>
                                        <PopoverTrigger>
                                            <p
                                                className="text-btn cursor-pointer font-medium text-center my-2"
                                                onClick={() =>
                                                    copyNoteHandler(note.url)
                                                }
                                            >
                                                Share this pdf
                                            </p>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            borderColor={btnBorder}
                                            borderWidth="2px"
                                            _focus={{
                                                borderColor: btnBorder,
                                                borderWidth: "2px",
                                            }}
                                        >
                                            <PopoverCloseButton />
                                            <PopoverHeader>
                                                Link copied successfully
                                            </PopoverHeader>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                {currentUser &&
                                    currentUser.name === note.uploadedBy && (
                                        <div style={{ margin: "-10px" }}>
                                            <DeletePopup
                                                currentUserEmail={
                                                    currentUser.email
                                                }
                                                note={note}
                                            />
                                            <EditPopup
                                                currentUserEmail={
                                                    currentUser.email
                                                }
                                                note={note}
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    ))}
                <div className="colCenter">
                    <ul className="mt-4 mb-8 space-y-2 ">
                        <li className="font-semibold text-2xl">
                            Similar Subjects
                        </li>
                        {details
                            .find((x) => x.sem === sem && x.group === group)
                            .subjects.filter((y) => y !== subject)
                            .map((subject, index) => (
                                <li key={index} className="list-item list-disc">
                                    <Link
                                        href={`/subjects/${subject}?sem=${sem}&group=${group}`}
                                    >
                                        <a>{subject}</a>
                                    </Link>
                                </li>
                            ))}
                        <li className="list-item list-disc font-medium underline">
                            <Link href="/subjects">All Subjects</Link>
                        </li>
                        <Popover>
                            <PopoverTrigger>
                                <li
                                    className="list-item list-disc font-medium cursor-pointer"
                                    onClick={copyHandler}
                                >
                                    Share this page
                                </li>
                            </PopoverTrigger>
                            <PopoverContent
                                borderColor={btnBorder}
                                borderWidth="2px"
                                _focus={{
                                    borderColor: btnBorder,
                                    borderWidth: "2px",
                                }}
                            >
                                <PopoverCloseButton />
                                <PopoverHeader>
                                    Link copied successfully
                                </PopoverHeader>
                            </PopoverContent>
                        </Popover>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default SubjectNotes;
