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
import { useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import {
    borderColor,
    focusBorderColor,
    hoverBorderColor,
    submitBtnBgColor,
    submitBtnHoverBgColor,
} from "../../helpers/colors";

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

const FacultyLogin = (props: Props) => {
    const initialValues: FormValues = {
        email: "",
        password: "",
    };
    const [isLogin, setIsLogin] = useState<boolean>(true);

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    const { login, signUp } = useAuth();

    const submitHandler = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        const { email, password } = values;
        const { resetForm, setSubmitting } = formikHelpers;

        setSubmitting(true);
        if (isLogin) {
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
        }

        // Signup the user (Create the user)
        // Creating a new user

        try {
            // const result = await createUser(email, password);
            const result = await signUp(email, password);
            if (result) {
                const { user } = result;
                const { email, uid } = user;
                db.collection("users").doc(email).set({
                    email,
                    uid,
                });
            }
        } catch (err) {
            console.log(err.message || err);
        }
        setSubmitting(false);
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
                    {/* Faculty login */}
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
                                    _hover={{ borderColor: hoverBorderColor }}
                                    borderColor={borderColor}
                                    focusBorderColor={focusBorderColor}
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
                                    _hover={{ borderColor: hoverBorderColor }}
                                    borderColor={borderColor}
                                    focusBorderColor={focusBorderColor}
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
                                className="text-btnText"
                                backgroundColor={submitBtnBgColor}
                                _hover={{
                                    backgroundColor: submitBtnHoverBgColor,
                                }}
                            >
                                {isLogin ? "Login" : "Create Account"}
                                {/* Log In */}
                            </Button>
                            <Button
                                variant="link"
                                isFullWidth
                                onClick={switchAuthModeHandler}
                                isDisabled={isSubmitting}
                            >
                                {isLogin
                                    ? "Create new account"
                                    : "Login with existing account"}
                            </Button>
                            {/* <Button onClick={logout}>logout</Button> */}
                        </Form>
                    )}
                </Formik>
            </Flex>
        </Flex>
    );
};

export default FacultyLogin;
