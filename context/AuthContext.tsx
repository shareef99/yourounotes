import { resolve } from "node:path";
import {
    useContext,
    useState,
    useEffect,
    createContext,
    ReactNode,
} from "react";
import { auth, db } from "../firebase/firebase";

interface Props {
    children: ReactNode;
}

interface User {
    email: string;
    uid: string;
    name: string;
}

interface authContextType {
    currentUser: User;
    signUp(
        email: string,
        password: string
    ): Promise<firebase.default.auth.UserCredential>;
    login(
        email: string,
        password: string
    ): Promise<firebase.default.auth.UserCredential>;
    logout(): Promise<void>;
}

const authContextDefaultValues: authContextType = {
    currentUser: {
        email: "",
        uid: "",
        name: "",
    },
    signUp: () => new Promise(() => {}),
    login: () => new Promise(() => {}),
    logout: () => new Promise(() => {}),
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    async function signUp(email: string, password: string) {
        return await auth.createUserWithEmailAndPassword(email, password);
    }

    async function login(email: string, password: string) {
        return await auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    // function resetPassword(email) {
    //     return auth.sendPasswordResetEmail(email);
    // }

    // function updateEmail(email) {
    //     return currentUser.updateEmail(email);
    // }

    // function updatePassword(password) {
    //     return currentUser.updatePassword(password);
    // }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                const { email } = user;
                db.collection("users")
                    .doc(email)
                    .get()
                    .then((res) => {
                        setCurrentUser({
                            email: res.data().email,
                            uid: res.data().uid,
                            name: res.data().name || "no name",
                        });
                        setLoading(false);
                    })
                    .catch((err) =>
                        console.log("Error from auth", err.message || err)
                    );
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
