import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../firebase/firebase";
import { verifyPassword } from "../../../helpers/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const data = req.body;
        // Send email and password from client side
        const { email, password } = data;

        try {
            auth.signInWithEmailAndPassword(email, password);
            res.status(201).json({ message: "Login successfully" });
        } catch (err) {
            res.status(400).json({ message: err.message || "bad request" });
        }
    }
};

export default handler;
