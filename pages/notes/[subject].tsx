import React from "react";
import { useRouter } from "next/router";

interface Props {}

const Subject = (props: Props) => {
    const router = useRouter();
    const { sem, group, subject } = router.query;

    return (
        <div>
            <h1>
                you are visiting {sem + " sem " + group + " " + subject} notes
                page
            </h1>
        </div>
    );
};

export default Subject;
