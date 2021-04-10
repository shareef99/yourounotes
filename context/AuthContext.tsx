import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from "react";
import { auth, db } from "../firebase/firebase";
import firebase from "firebase";

type authContextType = {
    admins: string[];
    signInWithGoogle: () => void;
    signOut: () => void;
    currentUser: any;
    loginError: string;
};

const authContextDefaultValues: authContextType = {
    admins: null,
    signInWithGoogle: () => {},
    signOut: () => {},
    currentUser: null,
    loginError: null,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

interface Props {
    children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const [loginError, setLoginError] = useState<string>();
    const [currentUser, setCurrentUser] = useState<any>();

    const admins = [
        "sowmiyamam11@gmail.com",
        "nadeemshareef934@gmail.com",
        "shoaib733021@gmail.com",
        "noor000two@gmail.com",
        "nikhathsultan05@gmail.com",
    ];

    async function signIn(provider: firebase.auth.GoogleAuthProvider) {
        setLoginError("");
    }

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const user = result.user;

                const userInfo = {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.displayName,
                    photoURL: user?.photoURL,
                    providerId: credential?.providerId,
                };

                db.collection("users")
                    .doc(user?.uid)
                    .set(userInfo, { merge: true });
                setCurrentUser(userInfo);

                // history.push("/pages/selection");
            })
            .catch((err) => {
                setLoginError(`${err.message}`);
            });
    }

    async function signOut() {
        await auth.signOut();
        // history.push("/");
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        admins,
        signInWithGoogle,
        signOut,
        currentUser,
        loginError,
    };
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;
