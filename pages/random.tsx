import Link from "next/link";
import PdfViewer from "../components/PdfViewer";
import details from "../public/details.json";

interface Props {}

const random = (props: Props) => {
    return (
        <div>
            <PdfViewer url="https://drive.google.com/file/d/1wEqfksAdJwi_LcnpKelS0i3Gjyl10gIl/view" />
            {/* <a
                target="_blank"
                href="https://drive.google.com/file/d/1wEqfksAdJwi_LcnpKelS0i3Gjyl10gIl/view?usp=sharing"
            >
                DASH
            </a> */}
        </div>
    );
};

export default random;
