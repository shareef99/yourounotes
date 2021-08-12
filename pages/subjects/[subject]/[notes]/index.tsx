import { useRouter } from "next/router";
import React from "react";
import PdfViewer from "../../../../components/PdfViewer";

interface Props {}

const index = (props: Props) => {
    const router = useRouter();
    const subject = router.query.subject;
    const pdfName = router.query.notes;
    console.log({ subject, pdfName });

    return (
        <div>
            <PdfViewer url={`/subjects/${subject}/${pdfName}`} />
        </div>
    );
};

export default index;
