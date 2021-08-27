import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import details from "../../public/details.json";

interface Props {}

interface selectSubjectFormType {
    group: string;
    sem: string;
}

const Subjects = (props: Props) => {
    const { register, watch } = useForm<selectSubjectFormType>();

    const group = watch("group");
    const sem = watch("sem");

    return (
        <>
            <Head>
                <title>Select Subject | Your OU Notes</title>
                <meta
                    name="keywords"
                    content="isl, notes, engineering, shareef, shareef99, ou, be, question papers, osmania university
                        students, ou students, engineering notes, be notes, important questions, be syllabus"
                />
            </Head>
            <section className="colCenter ">
                <form action="" className="mt-14 space-x-4">
                    <span className=" font-medium text-lg  text-btn">
                        filter by
                    </span>
                    <label htmlFor="group">
                        <select
                            id="group"
                            defaultValue="default"
                            {...register("group", { required: true })}
                        >
                            <option value="default">Group</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                            <option value="ME">ME</option>
                            <option value="CE">CE</option>
                            <option value="EEE">EEE</option>
                        </select>
                    </label>
                    <label htmlFor="sem">
                        <select
                            id="sem"
                            defaultValue="default"
                            {...register("sem", { required: true })}
                        >
                            <option value="default">Sem</option>
                            <option value="first">Ist</option>
                            <option value="second">IInd</option>
                            <option value="third">IIIrd</option>
                            <option value="forth">IVth</option>
                        </select>
                    </label>
                </form>
                <section className="container flex flex-col items-baseline md:items-center">
                    <div>
                        {details
                            .filter((x) => {
                                if (sem === undefined && group === undefined) {
                                    return x;
                                }
                                if (sem === "default" && group === "default") {
                                    return x;
                                }
                                if (sem !== "default" && group !== "default") {
                                    return x.group === group && x.sem === sem;
                                }
                                if (sem === "default") {
                                    return x.group === group;
                                }
                                if (group === "default") {
                                    return x.sem === sem;
                                }
                            })
                            .map((x, index) => (
                                <div
                                    key={index}
                                    className="colCenter items-start my-10"
                                >
                                    <h2 className="text-xl ">
                                        {x.group}{" "}
                                        {x.sem === "first"
                                            ? "Ist"
                                            : x.sem === "second"
                                            ? "IInd"
                                            : x.sem === "third"
                                            ? "IIIrd"
                                            : x.sem === "forth"
                                            ? "IVth"
                                            : ""}{" "}
                                        sem
                                    </h2>
                                    <ul className="ml-8 mt-4 space-y-2">
                                        {x.subjects.map((subject, index) => (
                                            <li
                                                key={index}
                                                className="list-item list-disc "
                                            >
                                                <Link
                                                    href={`/subjects/${subject}?sem=${x.sem}&group=${x.group}`}
                                                >
                                                    <a>{subject}</a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </section>
            </section>
        </>
    );
};

export default Subjects;
