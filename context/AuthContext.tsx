import {
    useContext,
    useState,
    useEffect,
    createContext,
    ReactNode,
} from "react";

import {
    UserCredential,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Props {
    children: ReactNode;
}

interface User {
    email: string;
    name: string;
}

interface authContextType {
    currentUser: User;
    signUp(email: string, password: string): Promise<UserCredential>;
    login(email: string, password: string): Promise<UserCredential>;
    logout(): Promise<void>;
}

const authContextDefaultValues: authContextType = {
    currentUser: {
        email: "",
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
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setLoading(false);
                setCurrentUser(undefined);
                return;
            }
            const { email } = user;
            const userRef = doc(db, "uploaders", email);
            const res = await getDoc(userRef);
            setCurrentUser({
                email: res.data().email,
                name: res.data().name,
            });
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
