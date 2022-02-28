import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import {
  borderColor,
  focusBorderColor,
  hoverBorderColor,
  submitBtnBgColor,
  submitBtnHoverBgColor,
  placeholderColor,
} from "../helpers/colors";
import {
  FormikProps,
  Formik,
  FormikHelpers,
  Form,
  FieldArray,
  FieldArrayRenderProps,
} from "formik";
import * as yup from "yup";
import details from "../public/details.json";
import { ArrayFieldErrorMessage } from "../components/forms/ArrayFieldErrorMessage";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import ErrorMessage from "../components/forms/ErrorMessage";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { doc, setDoc } from "firebase/firestore";
import { useNotification } from "../context/NotificationContext";

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
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();

  const [message, setMessage] = useState<string>();

  if (!currentUser) {
    const router = useRouter();
    router.push("/");
  }

  const initialValues: FormValues = {
    sem: "",
    group: "",
    subject: "",
    type: "",
    notes: [{ name: "", url: "" }],
  };

  const uploadNotes = async ({ subject, type, notes }: FormValues) => {
    showNotification({
      title: "Uploading 🙌",
      message: "Uploading Notes",
      state: "pending",
    });

    notes.map(async (note) => {
      const { name, url } = note;
      const id = `${name} + random id: ${Math.floor(Math.random() * 10000)}`;
      try {
        const subjectsRef = doc(db, "subjects", subject, type, id);
        await setDoc(subjectsRef, {
          name,
          url,
          subject,
          type,
          uploadedAt: new Date().toDateString(),
          uploadedBy: currentUser.name,
        });
        try {
          const uploadersRef = doc(
            db,
            "uploaders",
            currentUser.email,
            "notes",
            id
          );
          await setDoc(uploadersRef, {
            name,
            url,
            subject,
            type,
            uploadedAt: new Date().toDateString(),
            uploadedBy: currentUser.name,
          });
        } catch (err) {
          showNotification({
            title: "Failed 😢",
            message: "Failed to upload notes",
            state: "error",
          });
        }
      } catch (err) {
        showNotification({
          title: "Failed 😢",
          message: "Failed to upload notes",
          state: "error",
        });
      }
    });

    showNotification({
      title: "Uploaded 🎉",
      message: "Successfully uploaded",
      state: "success",
    });
  };

  const submitHandler = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { setSubmitting, resetForm } = formikHelpers;
    setSubmitting(true);
    await uploadNotes(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Flex alignItems="center" justifyContent="center" marginY={10}>
      <Head>
        <title>Upload Notes | Your OU Notes</title>
        {/* Google Auto Ad Link */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019308769438850"
          crossOrigin="anonymous"
        ></script>
      </Head>
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
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => submitHandler(values, formikHelpers)}
        >
          {({
            isSubmitting,
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleReset,
          }: FormikProps<FormValues>) => (
            <Form>
              <Select
                _hover={{ borderColor: hoverBorderColor }}
                borderColor={borderColor}
                focusBorderColor={focusBorderColor}
                name="sem"
                placeholder="Sem"
                mb={3}
                value={values.sem}
                onChange={handleChange}
                onBlur={handleBlur}
                onReset={handleReset}
              >
                <option value="first">Ist</option>
                <option value="second">IInd</option>
                <option value="third">IIIrd</option>
                <option value="forth">IVth</option>
                {Boolean(values.group) === false ||
                values.group === "CSE" ||
                values.group === "IT" ||
                values.group === "ECE" ||
                values.group === "CE" ? (
                  <option value="fifth">Vth</option>
                ) : (
                  <></>
                )}
              </Select>
              <ErrorMessage
                touch={touched.sem}
                error={Boolean(errors.sem)}
                errMessage={errors.sem}
              />
              <Select
                _hover={{ borderColor: hoverBorderColor }}
                borderColor={borderColor}
                focusBorderColor={focusBorderColor}
                name="group"
                placeholder="Group"
                mb={3}
                value={values.group}
                onChange={handleChange}
                onBlur={handleBlur}
                onReset={handleReset}
              >
                {values.sem === "fifth" ? (
                  <>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="CE">CE</option>
                  </>
                ) : (
                  <>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                    <option value="EEE">EEE</option>
                  </>
                )}
              </Select>
              <ErrorMessage
                touch={touched.group}
                error={Boolean(errors.group)}
                errMessage={errors.group}
              />
              <Select
                _hover={{ borderColor: hoverBorderColor }}
                borderColor={borderColor}
                focusBorderColor={focusBorderColor}
                name="subject"
                placeholder="Subject"
                mb={3}
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                onReset={handleReset}
              >
                {details
                  ?.find(
                    (x) => x.group === values.group && x.sem === values.sem
                  )
                  ?.subjects.map((subject) => (
                    <option value={subject} key={subject}>
                      {subject}
                    </option>
                  ))}
              </Select>
              <ErrorMessage
                touch={touched.subject}
                error={Boolean(errors.subject)}
                errMessage={errors.subject}
              />
              <Select
                _hover={{ borderColor: hoverBorderColor }}
                borderColor={borderColor}
                focusBorderColor={focusBorderColor}
                name="type"
                placeholder="Type"
                mb={3}
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                onReset={handleReset}
              >
                <option value="notes">Notes</option>
                <option value="important questions">Important Questions</option>
                <option value="syllabus">Syllabus</option>
                <option value="question papers">Question Paper</option>
              </Select>
              <ErrorMessage
                touch={touched.type}
                error={Boolean(errors.type)}
                errMessage={errors.type}
              />
              <Text fontSize="2xl" mb={1}>
                Notes Details
              </Text>
              <FieldArray
                name="notes"
                validateOnChange={true}
                render={({ remove, insert }: FieldArrayRenderProps) => (
                  <Box mb={4}>
                    {values.notes.map((note, index) => (
                      <Box mb={3} key={index}>
                        <Box mb={1}>
                          <Input
                            borderColor={borderColor}
                            focusBorderColor={focusBorderColor}
                            name={`notes[${index}].name`}
                            value={note.name}
                            placeholder="Name of the PDF"
                            _placeholder={{
                              color: placeholderColor,
                            }}
                            _hover={{
                              borderColor: hoverBorderColor,
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onReset={handleReset}
                          />
                          <ArrayFieldErrorMessage
                            name={`notes[${index}].name`}
                          />
                          <Input
                            borderColor={borderColor}
                            focusBorderColor={focusBorderColor}
                            mt={3}
                            name={`notes[${index}].url`}
                            value={note.url}
                            placeholder="Google Drive URL"
                            _placeholder={{
                              color: placeholderColor,
                            }}
                            _hover={{
                              borderColor: hoverBorderColor,
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onReset={handleReset}
                          />
                          <ArrayFieldErrorMessage
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
                              if (values.notes.length > 1) {
                                remove(index);
                              }
                            }}
                            size="xs"
                            _focus={{
                              outline: "none",
                              backgroundColor: "#fff",
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
                              backgroundColor: "#fff",
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
        {Boolean(message) && (
          <Box className="colCenter py-4 space-y-2">
            <span className="font-medium text-[#28A745] text-lg">
              {message}
            </span>
            <Link href={`/admin/${currentUser.email}`}>
              <a className="font-medium underline hover:no-underline">
                Go to Dashboard
              </a>
            </Link>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Upload;
