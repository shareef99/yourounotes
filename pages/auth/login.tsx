import { Flex, Heading } from "@chakra-ui/react";
import { Formik, FormikHelpers, Form, FormikProps } from "formik";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Field from "../../components/forms/Field";
import { SolidButton } from "../../components/atoms/button";

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

    const router = useRouter();
    const { login } = useAuth();

    const submitHandler = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        const { email, password } = values;
        const { setSubmitting, setFieldError } = formikHelpers;
        setSubmitting(true);

        try {
            const result = await login(email, password);
            if (result) router.push(`/admin/${result.user.email}`);
        } catch (err) {
            setFieldError("password", err.message);
        }

        setSubmitting(false);
        return;
    };

    return (
        <Flex alignItems="center" justifyContent="center" marginY={10}>
            <Flex
                direction="column"
                p={12}
                rounded={6}
                className="w-full xs:w-9/10 sm:w-[30rem] bg-cardBg shadow-md"
            >
                <Heading mb={8} textAlign="center">
                    Faculty login
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
                        values,
                        touched,
                        handleBlur,
                        handleChange,
                        handleReset,
                    }: FormikProps<FormValues>) => (
                        <Form>
                            <Field
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="name@yourounotes.com"
                                value={values.email}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleReset={handleReset}
                                error={Boolean(errors.email)}
                                touch={touched.email}
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
                                error={Boolean(errors.password)}
                                touch={touched.password}
                                errorMessage={errors.password}
                            />
                            <SolidButton
                                label="Log In"
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

export default FacultyLogin;
