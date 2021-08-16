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

    const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);

    // const handleNonAdminUploads = () => {
    //     if (!admins.includes(user.email)) {
    //         setMessage("We will notify you, When it is uploaded");
    //     }
    // };

    const onSubmit = (data: formData) => {
        // const promises: any = [];
        // files.forEach((file, index) => {
        //     let fileRef: firebase.default.storage.Reference;
        //     if (admins.includes(user.email)) {
        //         fileRef = storage.ref(
        //             `${data.sem} sem/${data.group}/${data.subject}/${type}/${file?.name}`
        //         );
        //     } else {
        //         fileRef = storage.ref(
        //             `unchecked/${data.sem} sem/${data.group}/${data.subject}/${type}/${file?.name}`
        //         );
        //     }
        //     const uploadTask = fileRef.put(file);
        //     promises.push(uploadTask);
        //     uploadTask.on(
        //         "state_changed",
        //         (snapshot: any) => {
        //             setMessage(`Uploading file(s)...`);
        //         },
        //         (err: any) => {
        //             setError(`Error while uploading! Try again in a while`);
        //         },
        //         async () => {
        //             const url = await fileRef.getDownloadURL();
        //             const createdAt = new Date(
        //                 timestamp.now().seconds * 1000
        //             ).toLocaleDateString();
        //             await db
        //                 .collection("notes")
        //                 .doc(data.sem)
        //                 .collection(data.group)
        //                 .doc(data.subject)
        //                 .collection(data.type)
        //                 .add({
        //                     url,
        //                     email: user.email,
        //                     createdBy: user.name,
        //                     createdAt,
        //                     group,
        //                     sem,
        //                     subject,
        //                     name: file?.name,
        //                     type,
        //                 });
        //         }
        //     );
        //     Promise.all(promises)
        //         .then(() => {
        //             setUploadedFiles(files);
        //             setFiles([]);
        //             handleNonAdminUploads();
        //             setIsUploaded(true);
        //             reset();
        //             setMessage(undefined);
        //         })
        //         .catch((err) => {
        //             setError(err.message);
        //         });
        // });
    };

    return (
        <section
            id="popup"
            className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16"
        >
            <div className="border-2 rounded-lg shadow-2xl px-10 py-8 mx-auto w-72 colCenter space-y-4">
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
                        <input
                            type="submit"
                            id="submit"
                            name="submit"
                            className="uploadPageBtn"
                        />
                    </label>
                </form>
            </div>
        </section>
    );
};

export default Upload;
