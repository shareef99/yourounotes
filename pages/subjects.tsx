import React from "react";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import details from "../public/details.json";

interface Props {}

interface selectSubjectFormType {
    group: string;
    sem: string;
}

const Subjects = (props: Props) => {
    const { register, watch } = useForm<selectSubjectFormType>();

    const group = watch("group");
    const sem = watch("sem");

    console.log(sem);

    return (
        <>
            <Head>
                <title>Select Subject | Your OU Notes</title>
            </Head>
            <section className="colCenter">
                <form action="">
                    filter by
                    <label htmlFor="group">
                        <select
                            id="group"
                            defaultValue="default"
                            {...register("group", { required: true })}
                        >
                            <option value="default" disabled>
                                Group
                            </option>
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
                            <option value="default" disabled>
                                Semester
                            </option>
                            <option value="first">Ist</option>
                            <option value="second">IIst</option>
                            <option value="third">IIIst</option>
                            <option value="forth">IVst</option>
                        </select>
                    </label>
                </form>
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
                        <div key={index}>
                            <p>
                                {x.group} {x.sem}
                            </p>
                            {x.subjects.map((subject, index) => (
                                <p key={index}>{subject}</p>
                            ))}
                        </div>
                    ))}
            </section>
        </>
    );
};

export default Subjects;
