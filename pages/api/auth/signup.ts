import { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../../firebase/firebase";
import { hashPassword } from "../../../helpers/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const data = req.body;
        // Send email and password from client side
        const { email, password } = data;

        if (
            !email ||
            !email.includes("@") ||
            !password ||
            password.trim().length < 8
        ) {
            res.status(422).json({
                message:
                    "Invalid input - password should also be at least 8 characters long.",
            });
            return;
        }

        db.collection("emails").add({ email });

        const hashedPassword = await hashPassword(password);

        try {
            await db.collection("users").doc(email).set({
                email,
                password: hashedPassword,
            });
            auth.createUserWithEmailAndPassword(email, password);
            res.status(201).json({ message: "Created user!" });
        } catch (err) {
            res.status(400).json({ message: err.message || "bad request" });
        }
        console.log(data);
    }
};

export default handler;
