import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "../../firebase/firebase";

interface Props {}

interface NotesType {
    docId: string;
    sem: string;
    group: string;
    subject: string;
    createdAt: any;
    createdBy: string;
    email: string;
    type: string;
    url: string;
    name: string;
    newName: string | undefined;
}

const Subject = (props: Props) => {
    const router = useRouter();
    const { sem, group, subject }: any = router.query;

    const [notes, setNotes] = useState<Array<NotesType>>([]);
    const [importantQuestions, setImportantQuestions] = useState<
        Array<NotesType>
    >([]);
    const [syllabus, setSyllabus] = useState<Array<NotesType>>([]);
    const [questionPapers, setQuestionPapers] = useState<Array<NotesType>>([]);

    useEffect(() => {
        const getDetails = async (
            type: string,
            setFunc: React.Dispatch<React.SetStateAction<Array<NotesType>>>
        ) => {
            db.collection("notes")
                .doc(sem)
                .collection(group)
                .doc(subject)
                .collection(type)
                .orderBy("name", "asc")
                .onSnapshot((snap) => {
                    setFunc(
                        snap.docs.map((doc) => ({
                            docId: doc.id,
                            createdAt: doc.data().createdAt,
                            createdBy: doc.data().createdBy,
                            email: doc.data().email,
                            group: doc.data().group,
                            newName: doc.data().newName,
                            name: doc.data().name,
                            sem: doc.data().sem,
                            subject: doc.data().subject,
                            type: doc.data().type,
                            url: doc.data().url,
                        }))
                    );
                });
        };

        getDetails("notes", setNotes);
        getDetails("important questions", setImportantQuestions);
        getDetails("syllabus", setSyllabus);
        getDetails("question paper", setQuestionPapers);
    }, [sem, group, subject]);

    const allNotes = [
        ...notes,
        ...importantQuestions,
        ...syllabus,
        ...questionPapers,
    ];

    return (
        <>
            <Head>
                <title>{subject} | Your OU Notes</title>
                <meta
                    name="keywords"
                    content={`${allNotes.map(
                        (note) => note.name
                    )} ${allNotes.map(
                        (note) => note.newName
                    )} ${subject}, ${sem} sem, ${sem} sem question papers, ${subject} question papers ,
                    ${subject} important questions, ${subject} syllabus, ${subject} notes ,${group} question papers,
                    ${group} important questions, ${group} syllabus, ${group} notes,  
                    isl, notes, engineering, shareef, shareef99, ou, be, question papers, osmania university
                    students, ou students, engineering notes, be notes, important questions, be syllabus`}
                />
            </Head>
            <section className="container">
                {allNotes?.length === 0 && (
                    <div className="colCenter h-screen -mt-16 px-8 py-4 space-y-4">
                        <p>
                            Sorry we don't have the notes of {subject} yet, We
                            will notify you once someone uploaded the notes
                        </p>
                        <p>
                            if you have the notes for {subject} you can{" "}
                            <a
                                href="https://onlineounotes.web.app/pages/upload"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium"
                            >
                                upload
                            </a>{" "}
                            it or{" "}
                            <a
                                href="https://onlineounotes.web.app/pages/request"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium"
                            >
                                request
                            </a>{" "}
                            it
                        </p>
                    </div>
                )}
                {allNotes
                    ?.sort((a, b) => (a.newName! < b.newName! ? -1 : 1))
                    .map((note) => (
                        <div className="colCenter my-14" key={note.docId}>
                            <div
                                key={note.docId}
                                className="colCenter border-b-2 pb-4 space-y-4"
                            >
                                <a
                                    href={note.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium"
                                >
                                    {note.newName
                                        ? `${note.newName}`
                                        : `${note.name}`}
                                    ➚
                                </a>
                                <div>
                                    <p className="text-btn">
                                        Uploaded At:{" "}
                                        <span className="text-para">
                                            {note.createdAt}
                                        </span>
                                    </p>
                                    <p className="text-btn">
                                        Uploaded by: {"   "}
                                        <span className="text-para">
                                            {note.createdBy}
                                        </span>
                                    </p>
                                    <p className="text-btn">
                                        Type: {"   "}
                                        <span className="text-para">
                                            {note.type.replace(
                                                note.type[0],
                                                note.type[0].toUpperCase()
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </>
    );
};

export default Subject;
