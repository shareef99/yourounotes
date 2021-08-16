import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { octokit } from "../../octo";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const testingOcto = async (pdfContent: ArrayBuffer) => {
            // console.log(pdfContent);
            try {
                const response = await octokit.request(
                    "POST /repos/{owner}/{repo}/git/blobs",
                    {
                        owner: "shareef99",
                        repo: "yournotes",
                        // path: "public",
                        // subject: "Maths",
                        content: `${pdfContent}`,
                        headers: {
                            // "Access-Control-Allow-Origin": "http://localhost:9000",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "X-Requested-With",
                            "content-type": "application/pdf",
                            // content: `${pdfContent}`,
                            encoding: "base64",
                            accept: "application/vnd.github.v3+json",
                            authorization:
                                "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",
                        },
                    }
                );

                res.status(200).json({ message: response });
            } catch (err) {
                console.log("Error : ", err);
                res.status(200).json({ message: "Failed" });
            }
        };

        console.log("from api/upload file: ", req.body);

        const { pdf } = req.body;

        testingOcto(pdf);
    }
};

export default handler;
