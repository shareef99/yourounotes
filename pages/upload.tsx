import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
import { FC } from "react";
import details from "../public/details.json";
import {
    FormikProps,
    Formik,
    FormikHelpers,
    Form,
    FieldArray,
    FieldArrayRenderProps,
} from "formik";
import * as yup from "yup";
import { ErrorMessage } from "../components/ErrorMessage";
import { db } from "../firebase/firebase";
import {
    borderColor,
    focusBorderColor,
    hoverBorderColor,
    submitBtnBgColor,
    submitBtnHoverBgColor,
    placeholderColor,
} from "../helpers/colors";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

interface Props {}

interface Note {
    name: string;
    url: string;
}

interface FormValues {
    sem: string;
    group: string;
    subject: string;
    type: string;
    notes: Array<Note>;
}

const validationSchema = yup.object().shape({
    sem: yup.string().required("Select Sem").not(["sem"], "Select Sem"),
    group: yup.string().required("Select group").not(["group"], "Select Group"),
    subject: yup.string().required("Select Subject"),
    type: yup.string().required("Required"),
    notes: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string().required("Required"),
                url: yup.string().required("Required").url("Must be URL"),
            })
        )
        .required("Required"),
});

const Upload = (Props: Props) => {
    // Context
    const { currentUser } = useAuth();

    if (!currentUser) {
        const router = useRouter();
        return router.push("/");
    }

    const initialValues: FormValues = {
        sem: "",
        group: "",
        subject: "",
        type: "",
        notes: [{ name: "", url: "" }],
    };

    const uploadNotesToFaculty = (
        subject: string,
        type: string,
        notes: Array<Note>,
        id: string
    ) => {
        notes.map((note) => {
            const { name, url } = note;
            db.collection("faculties")
                // .doc(currentUser.email)
                .doc(currentUser.email)
                .collection("notes")
                .doc(id)
                .set({
                    name,
                    url,
                    subject,
                    type,
                    uploadedAt: new Date().toDateString(),
                    uploadedBy: currentUser.name,
                })
                .then((res) => console.log("update successfully", res))
                .catch((err) => console.log(err.message || err));
        });
    };

    const uploadNotesToSubjects = ({ subject, type, notes }: FormValues) => {
        notes.map((note) => {
            const { name, url } = note;
            const id = `${name} + random id: ${Math.floor(
                Math.random() * 100
            )}`;
            db.collection("subjects")
                .doc(subject)
                .collection(type)
                .doc(id)
                .set({
                    name,
                    url,
                    subject,
                    type,
                    uploadedAt: new Date().toDateString(),
                    uploadedBy: currentUser.name,
                })
                .then((res) => {
                    console.log("update successfully", res);
                    uploadNotesToFaculty(subject, type, notes, id);
                })
                .catch((err) => console.log(err.message || err));
        });
    };

    const submitHandler = (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        const { setSubmitting, resetForm } = formikHelpers;
        setSubmitting(true);
        console.log(values);

        uploadNotesToSubjects(values);

        setSubmitting(false);
        // resetForm();
    };

    return (
        <Flex alignItems="center" justifyContent="center" marginY={10}>
            <Flex
                direction="column"
                p={12}
                rounded={6}
                className="w-full xs:w-9/10 sm:w-[30rem] bg-cardBg"
            >
                <Heading mb={6} textAlign="center">
                    Select Details
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
                        values,
                        handleBlur,
                        handleChange,
                        handleReset,
                        errors,
                    }: FormikProps<FormValues>) => (
                        <Form
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            autoSave="off"
                        >
                            <Select
                                _hover={{ borderColor: hoverBorderColor }}
                                borderColor={borderColor}
                                focusBorderColor={focusBorderColor}
                                name="sem"
                                placeholder="Sem"
                                value={values.sem}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                            >
                                <option value="first">Ist</option>
                                <option value="second">IInd</option>
                                <option value="third">IIIrd</option>
                                <option value="forth">IVth</option>
                            </Select>
                            <Text mb={3} className="font-medium text-error">
                                {errors.sem && errors.sem}
                            </Text>
                            <Select
                                _hover={{ borderColor: hoverBorderColor }}
                                borderColor={borderColor}
                                focusBorderColor={focusBorderColor}
                                name="group"
                                placeholder="Group"
                                value={values.group}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                            >
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="ECE">ECE</option>
                                <option value="ME">ME</option>
                                <option value="CE">CE</option>
                                <option value="EEE">EEE</option>
                            </Select>
                            <Text mb={3} className="font-medium text-error">
                                {errors.group && errors.group}
                            </Text>
                            <Select
                                _hover={{ borderColor: hoverBorderColor }}
                                borderColor={borderColor}
                                focusBorderColor={focusBorderColor}
                                name="subject"
                                placeholder="Subject"
                                value={values.subject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                            >
                                {details
                                    ?.find(
                                        (x) =>
                                            x.group === values.group &&
                                            x.sem === values.sem
                                    )
                                    ?.subjects.map((subject) => (
                                        <option value={subject} key={subject}>
                                            {subject}
                                        </option>
                                    ))}
                            </Select>
                            <Text mb={3} className="font-medium text-error">
                                {errors.subject && errors.subject}
                            </Text>
                            <Select
                                _hover={{ borderColor: hoverBorderColor }}
                                borderColor={borderColor}
                                focusBorderColor={focusBorderColor}
                                name="type"
                                placeholder="Type"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onReset={handleReset}
                            >
                                <option value="notes">Notes</option>
                                <option value="important questions">
                                    Important Questions
                                </option>
                                <option value="syllabus">Syllabus</option>
                                <option value="question paper">
                                    Question Paper
                                </option>
                            </Select>
                            <Text mb={3} className="font-medium text-error">
                                {errors.type && errors.type}
                            </Text>
                            <Text fontSize="2xl" mb={1}>
                                Notes Details
                            </Text>
                            <FieldArray
                                name="notes"
                                validateOnChange={true}
                                render={({
                                    remove,
                                    insert,
                                }: FieldArrayRenderProps) => (
                                    <Box mb={4}>
                                        {values.notes.map((note, index) => (
                                            <Box mb={3} key={index}>
                                                <Box mb={1}>
                                                    <Input
                                                        borderColor={
                                                            borderColor
                                                        }
                                                        focusBorderColor={
                                                            focusBorderColor
                                                        }
                                                        name={`notes[${index}].name`}
                                                        placeholder="Name of the PDF"
                                                        _placeholder={{
                                                            color: placeholderColor,
                                                        }}
                                                        _hover={{
                                                            borderColor:
                                                                hoverBorderColor,
                                                        }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        onReset={handleReset}
                                                    />
                                                    <ErrorMessage
                                                        name={`notes[${index}].name`}
                                                    />
                                                    <Input
                                                        borderColor={
                                                            borderColor
                                                        }
                                                        focusBorderColor={
                                                            focusBorderColor
                                                        }
                                                        mt={3}
                                                        name={`notes[${index}].url`}
                                                        placeholder="Google Drive URL"
                                                        _placeholder={{
                                                            color: placeholderColor,
                                                        }}
                                                        _hover={{
                                                            borderColor:
                                                                hoverBorderColor,
                                                        }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        onReset={handleReset}
                                                    />
                                                    <ErrorMessage
                                                        name={`notes[${index}].url`}
                                                    />
                                                </Box>
                                                <Flex
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    mb={3}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            if (
                                                                values.notes
                                                                    .length > 1
                                                            ) {
                                                                remove(index);
                                                            }
                                                        }}
                                                        size="xs"
                                                        _focus={{
                                                            outline: "none",
                                                        }}
                                                        variant="ghost"
                                                        fontSize="3xl"
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            insert(index, {
                                                                name: "",
                                                                url: "",
                                                            })
                                                        }
                                                        _focus={{
                                                            outline: "none",
                                                        }}
                                                        size="xs"
                                                        variant="ghost"
                                                        fontSize="2xl"
                                                    >
                                                        +
                                                    </Button>
                                                </Flex>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            />
                            <Button
                                width="full"
                                type="submit"
                                isDisabled={isSubmitting}
                                className="text-btnText"
                                backgroundColor={submitBtnBgColor}
                                _hover={{
                                    backgroundColor: submitBtnHoverBgColor,
                                }}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Flex>
        </Flex>
    );
};

export default Upload;
