import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

interface Props {}

const upload = ({}: Props) => {
    const [pdfFile, setPdfFile] = useState<ArrayBuffer | string>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("File from submit : ", e.target[0].files[0]);
        const pdf = e.target[0].files[0];

        let reader = new FileReader();
        reader.readAsDataURL(pdf);
        reader.onloadend = (e) => {
            setPdfFile(e.target.result);
            axios.post("/api/upload", { pdf: e.target.result });
            // testingOcto(e.target.result as ArrayBuffer);
        };
    };

    // useEffect(() => {
    // console.log(pdfFile);
    // }, [pdfFile]);

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="file" name="upload" id="upload" />
                <div>
                    <button type="submit">upload</button>
                </div>
            </form>
        </div>
    );
};

export default upload;
