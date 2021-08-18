import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
} from "@chakra-ui/react";
import { Formik, FormikHelpers, Form, FormikProps } from "formik";
// import { useEffect, useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
// import { db } from "../../firebase/firebase";

interface Props {}

interface FormValues {
    email: string;
    password: string;
}

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup
        .string()
        .required("Enter password")
        .min(8, "Password must be 8 character"),
});

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

const loginUser = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
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
    const initialValues: FormValues = {
        email: "",
        password: "",
    };
    // const [isLogin, setIsLogin] = useState<boolean>(true);

    // function switchAuthModeHandler() {
    //     setIsLogin((prevState) => !prevState);
    // }

    const { login } = useAuth();

    const submitHandler = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        const { email, password } = values;
        const { resetForm, setSubmitting } = formikHelpers;

        setSubmitting(true);
        // if (isLogin) {
        // Log the user in
        try {
            // const result = await loginUser(email, password);
            const result = await login(email, password);
            console.log(result);
            resetForm();
        } catch (err) {
            resetForm();
            console.log(err.message || err);
        }
        resetForm();
        setSubmitting(false);
        return;
        // }

        // Signup the user (Create the user)
        // Creating a new user

        // try {
        //     // const result = await createUser(email, password);
        //     const result = await signUp(email, password);
        //     if (result) {
        //         const { user } = result;
        //         const { email, uid } = user;
        //         db.collection("users").doc(email).set({
        //             email,
        //             uid,
        //         });
        //     }
        // } catch (err) {
        //     console.log(err.message || err);
        // }
        // setSubmitting(false);
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
                    {/* {isLogin ? "Login" : "Sign Up"} */}
                    Faculty login
                </Heading>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validateOnMount={false}
                    onSubmit={(
                        values: FormValues,
                        formikHelpers: FormikHelpers<FormValues>
                    ) => submitHandler(values, formikHelpers)}
                >
                    {({
                        isSubmitting,
                        errors,
                        values,
                        handleBlur,
                        handleChange,
                        handleReset,
                    }: FormikProps<FormValues>) => (
                        <Form>
                            <FormControl id="email" isRequired mb={3}>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="name@yourounotes.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onReset={handleReset}
                                />
                                {errors.email && (
                                    <Text
                                        mb={3}
                                        className="font-medium text-error"
                                    >
                                        {errors.email}
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl id="password" isRequired mb={3}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="*********"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onReset={handleReset}
                                />
                                {errors.password && (
                                    <Text
                                        mb={3}
                                        className="font-medium text-error"
                                    >
                                        {errors.password}
                                    </Text>
                                )}
                            </FormControl>
                            <Button
                                isFullWidth
                                my={3}
                                isDisabled={isSubmitting}
                                type="submit"
                            >
                                {/* {isLogin ? "Login" : "Create Account"} */}
                                Login
                            </Button>
                            {/* <Button
                                variant="link"
                                isFullWidth
                                onClick={switchAuthModeHandler}
                                isDisabled={isSubmitting}
                            >
                                {isLogin
                                    ? "Create new account"
                                    : "Login with existing account"}
                            </Button> */}
                            {/* <Button onClick={logout}>logout</Button> */}
                        </Form>
                    )}
                </Formik>
            </Flex>
        </Flex>
    );
};

export default Auth;
