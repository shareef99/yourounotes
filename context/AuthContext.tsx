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
    role: string;
    department: string;
    subjects: Array<string>;
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
        role: "",
        department: "",
        subjects: [],
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
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log(user);
            if (!user) {
                setLoading(false);
                setCurrentUser(undefined);
                return;
            }
            const { email } = user;
            await db
                .collection("faculties")
                .doc(email)
                .get()
                .then((res) => {
                    setCurrentUser({
                        email: res.data().email,
                        uid: res.data().uid,
                        name: res.data().name,
                        role: res.data().role,
                        department: res.data().department,
                        subjects: res.data().subjects,
                    });
                    setLoading(false);
                })
                .catch((err) =>
                    console.log("Error from auth", err.message || err)
                );
            setLoading(false);
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
