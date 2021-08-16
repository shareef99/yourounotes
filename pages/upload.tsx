import { Box, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
// import { storage, timestamp, db } from "../firebase";
import details from "../public/details.json";
// import { useAuth } from "../contexts/AuthContext";
// import BackToHome from "../components/BackToHome";

interface Props {}

interface formData {
    group: string;
    sem: string;
    subject: string;
    type: string;
}

const Upload: FC<Props> = () => {
    // const { user, admins } = useAuth();

    // const handleNonAdminUploads = () => {
    //     if (!admins.includes(user.email)) {
    //         setMessage("We will notify you, When it is uploaded");
    //     }
    // };

    return (
        <section>
            <Box className="border-2 rounded-lg shadow-2xl px-10 py-8 mx-auto w-72 colCenter space-y-4">
                <h3 className="font-semibold text-lg">Select Details</h3>
                <form className="colCenter flex-wrap w-full space-y-2">
                    <label htmlFor="sem" className="w-full">
                        <select
                            id="sem"
                            defaultValue="default"
                            className="select"
                        >
                            <option value="default" disabled>
                                Sem
                            </option>
                            <option value="first">Ist</option>
                            <option value="second">IInd</option>
                            <option value="third">IIIrd</option>
                            <option value="forth">IVth</option>
                        </select>
                    </label>
                    <label htmlFor="group" className="w-full">
                        <select
                            id="group"
                            defaultValue="default"
                            className="select"
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
                    <label htmlFor="type" className="w-full">
                        <select
                            id="type"
                            defaultValue="default"
                            className="select"
                        >
                            <option value="default" disabled>
                                type
                            </option>
                            <option value="notes">Notes</option>
                            <option value="important questions">
                                Important Questions
                            </option>
                            <option value="syllabus">Syllabus</option>
                            <option value="question paper">
                                Question Paper
                            </option>
                        </select>
                    </label>
                    <label htmlFor="subjects" className="w-full">
                        <select
                            id="subjects"
                            defaultValue="default"
                            className="select"
                        >
                            <option
                                value="default"
                                disabled
                                className="box-content max-w-full w-full"
                            >
                                Subjects
                            </option>
                            {details?.map((x) =>
                                x.subjects.map((subject) => (
                                    <option
                                        value={subject}
                                        key={subject}
                                        className="w-full max-w-full box-content"
                                    >
                                        {subject}
                                    </option>
                                ))
                            )}
                        </select>
                    </label>

                    <label
                        htmlFor="upload-files"
                        className="pt-4 w-full flexCenter"
                    >
                        <span className="uploadPageBtn">Upload file</span>
                        <input
                            type="file"
                            id="upload-files"
                            className="opacity-0 w-0 h-0 absolute"
                            // onChange={handleFileSelection}
                            multiple={true}
                        />
                    </label>
                    <label htmlFor="submit" className="w-full flexCenter">
                        <Input
                            type="submit"
                            id="submit"
                            name="submit"
                            className="uploadPageBtn"
                        />
                    </label>
                </form>
            </Box>
        </section>
    );
};

export default Upload;
