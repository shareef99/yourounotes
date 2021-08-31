import {
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Select,
} from "@chakra-ui/react";
import { Formik, FormikHelpers, Form, FormikProps } from "formik";
import * as yup from "yup";
import Field from "../../components/forms/Field";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";
import {
    borderColor,
    focusBorderColor,
    hoverBorderColor,
} from "../../helpers/colors";
import { useRouter } from "next/router";
import { SolidButton } from "../../components/atoms/button";
import ErrorMessage from "../../components/forms/ErrorMessage";

interface Props {}

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = yup.object().shape({
    name: yup.string().required("Enter your name"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup
        .string()
        .required("Enter password")
        .min(8, "Password must be 8 character"),
    confirmPassword: yup
        .string()
        .required("Enter password again")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

const Login = (props: Props) => {
    const initialValues: FormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const router = useRouter();
    const { signUp } = useAuth();

    const submitHandler = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        const { email, password, name } = values;
        const { resetForm, setSubmitting, setFieldError } = formikHelpers;

        setSubmitting(true);

        try {
            const result = await signUp(email, password);
            if (result) {
                const email = result.user.email;
                await db.collection("uploaders").doc(email).set({
                    email,
                    name,
                    password,
                });
            }

            router.push(`/admin/${email}`);
        } catch (err) {
            setFieldError("Upload", err.message);
        }
        resetForm();
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
                    Sign Up
                </Heading>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(
                        values: FormValues,
                        formikHelpers: FormikHelpers<FormValues>
                    ) => submitHandler(values, formikHelpers)}
                >
                    {({
                        isSubmitting,
                        errors,
                        touched,
                        values,
                        handleBlur,
                        handleChange,
                        handleReset,
                    }: FormikProps<FormValues>) => (
                        <Form>
                            <Field
                                id="name"
                                label="Name"
                                type="text"
                                placeholder="Kratos"
                                value={values.name}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleReset={handleReset}
                                touch={touched.name}
                                error={Boolean(errors.name)}
                                errorMessage={errors.name}
                            />
                            <Field
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="name@yourounotes.com"
                                value={values.email}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleReset={handleReset}
                                touch={touched.email}
                                error={Boolean(errors.email)}
                                errorMessage={errors.email}
                            />
                            <Field
                                id="password"
                                label="Password"
                                type="password"
                                placeholder="*********"
                                value={values.password}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleReset={handleReset}
                                touch={touched.password}
                                error={Boolean(errors.password)}
                                errorMessage={errors.password}
                            />
                            <Field
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                placeholder="*********"
                                value={values.confirmPassword}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleReset={handleReset}
                                touch={touched.confirmPassword}
                                error={Boolean(errors.confirmPassword)}
                                errorMessage={errors.confirmPassword}
                            />
                            <SolidButton
                                label="Create Account"
                                isDisable={isSubmitting}
                                type="submit"
                            />
                        </Form>
                    )}
                </Formik>
            </Flex>
        </Flex>
    );
};

export default Login;
