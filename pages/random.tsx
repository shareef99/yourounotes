// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// @ts-ignore
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

interface Props {}

const random = (props: Props) => {
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
                            fileUrl="https://firebasestorage.googleapis.com/v0/b/onlineounotes.appspot.com/o/first%20sem%2FCSE%2FMathematics%20(M-I)%2Fimportant%20questions%2FImportant%20points%20of%20Unit%20I_M%20I.pdf?alt=media&token=c7b62f91-a0d5-4370-bd06-2c11581d5526"
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
            </div>
            {/* <Viewer fileUrl="/public/notes/Maths/random.pdf" /> */}
        </div>
    );
};

export default random;
