import { useRouter } from "next/router";
import PdfViewer from "../../../../components/PdfViewer";

interface Props {}

const index = ({}: Props) => {
    const router = useRouter();
    const subject = router.query.subject;
    const pdfName = router.query.notes;
    console.log(router.query);

    return (
        <div>
            lol
            <PdfViewer
                url={`https://raw.githubusercontent.com/yourounotes/sem3/main/CSE/${subject}/${pdfName}`}
            />
        </div>
    );
};

export default index;

//raw.githubusercontent.com/yourounotes/sem3/main/CSE/Biology%20for%20Engineers/BIO%20Important%20Questions%20for%20External.pdf
