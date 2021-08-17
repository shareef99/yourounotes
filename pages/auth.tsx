import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {}

const createUser = async (email: string, password: string) => {
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
    }
    return data;
};

const Auth = (props: Props) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Log the user in
            return;
        }

        // Signup the user (Create the user)
        // createUser()
    };

    return (
        <Flex alignItems="center" justifyContent="center" marginY={10}>
            <Flex
                direction="column"
                p={12}
                rounded={6}
                className="w-full xs:w-9/10 sm:w-[30rem] bg-cardBg"
            >
                <Heading mb={8} textAlign="center">
                    {isLogin ? "Login" : "Sign Up"}
                </Heading>
                <form>
                    <FormControl id="email" isRequired mb={3}>
                        <FormLabel>Email Address</FormLabel>
                        <Input type="email" placeholder="kratos@godOfWar.com" />
                    </FormControl>
                    <FormControl id="password" isRequired mb={3}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="*********" />
                    </FormControl>
                    {!isLogin && (
                        <FormControl id="confirmPassword" isRequired mb={3}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password" placeholder="*********" />
                        </FormControl>
                    )}
                    <Button isFullWidth my={3}>
                        {isLogin ? "Login" : "Create Account"}
                    </Button>
                    <Button
                        variant="link"
                        isFullWidth
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </Button>
                </form>
            </Flex>
        </Flex>
    );
};

export default Auth;
