// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// @ts-ignore
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";

interface Props {
    url: string;
}

const PdfViewer = ({ url }: Props) => {
    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div>
            <h4 className="text-center">View PDF</h4>
            <div className="rowCenter">
                <div
                    className="flexCenter overflow-y-auto w-[90%] bg-gray-200 my-10"
                    style={{ height: "600px" }}
                >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                        <Viewer
                            fileUrl={url}
                            plugins={[defaultLayoutPluginInstance]}
                            httpHeaders={{
                                // "Access-Control-Allow-Origin": "*",
                                accept: "*",
                                // "Access-Control-Request-Headers":
                                // "access-control-allow-origin",
                                // "Access-Control-Request-Method": "GET",
                            }}
                            // withCredentials={true}
                        />
                    </Worker>
                </div>
            </div>
            {/* <Viewer fileUrl="/public/notes/Maths/random.pdf" /> */}
        </div>
    );
};

export default PdfViewer;
