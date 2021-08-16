import {
    Button,
    Flex,
    Heading,
    Input,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { FC } from "react";
// import { storage, timestamp, db } from "../firebase";
import details from "../public/details.json";
// import { useAuth } from "../contexts/AuthContext";

interface Props {}

const Upload: FC<Props> = () => {
    // const { user, admins } = useAuth();

    // const handleNonAdminUploads = () => {
    //     if (!admins.includes(user.email)) {
    //         setMessage("We will notify you, When it is uploaded");
    //     }
    // };

    return (
        <Flex alignItems="center" justifyContent="center" marginY={10}>
            <Flex
                direction="column"
                p={12}
                rounded={6}
                backgroundColor="gray.400"
            >
                <Heading mb={6}>Select Details</Heading>
                <form action="">
                    <Select placeholder="Sem" mb={3}>
                        <option value="first">Ist</option>
                        <option value="second">IInd</option>
                        <option value="third">IIIrd</option>
                        <option value="forth">IVth</option>
                    </Select>
                    <Select placeholder="Group" mb={3}>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="ME">ME</option>
                        <option value="CE">CE</option>
                        <option value="EEE">EEE</option>
                    </Select>
                    <Select placeholder="Subject" mb={3}>
                        {details?.map((x) =>
                            x.subjects.map((subject) => (
                                <option
                                    value={subject}
                                    key={subject}
                                    className="w-full max-w-full box-content"
                                >
                                    {subject}
                                </option>
                            ))
                        )}
                    </Select>
                    <Select placeholder="Type" mb={3}>
                        <option value="notes">Notes</option>
                        <option value="important questions">
                            Important Questions
                        </option>
                        <option value="syllabus">Syllabus</option>
                        <option value="question paper">Question Paper</option>
                    </Select>
                    <div>
                        <span>Number of notes : </span>
                        <NumberInput
                            mb={3}
                            defaultValue={3}
                            allowMouseWheel
                            aria-label="Number of notes"
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </div>
                    <div>
                        {[1, 2, 3].map((x) => (
                            <div className="my-4">
                                <span>Details of {x}</span>
                                <Input placeholder="Name" mb={2} />
                                <Input placeholder="Url" mb={2} />
                            </div>
                        ))}
                    </div>
                    <Button colorScheme="teal" width="full">
                        Submit
                    </Button>
                </form>
            </Flex>
        </Flex>
    );
};

export default Upload;
