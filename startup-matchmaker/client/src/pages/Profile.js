import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { Box, Flex, Heading, Input, Button, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { MultiSelect } from 'chakra-multiselect';

const Profile = (props) => {
    const navigate = useNavigate();
    const industryOptions = [
        { value: 'Agriculture', label: 'Agriculture' },
        { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
        { value: 'Automotive', label: 'Automotive' },
        { value: 'Banking', label: 'Banking' },
        { value: 'Biotechnology', label: 'Biotechnology' },
        { value: 'Chemical', label: 'Chemical' },
        { value: 'Computer', label: 'Computer' },
        { value: 'Construction', label: 'Construction' },
        { value: 'Consulting', label: 'Consulting' },
        { value: 'Consumer Products', label: 'Consumer Products' },
        { value: 'Cosmetics', label: 'Cosmetics' },
        { value: 'Design', label: 'Design' },
        { value: 'Education', label: 'Education' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Energy', label: 'Energy' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Environmental Services', label: 'Environmental Services' },
        { value: 'Fashion', label: 'Fashion' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Food & Beverage', label: 'Food & Beverage' },
        { value: 'Government', label: 'Government' },
        { value: 'Healthcare', label: 'Healthcare' },
        { value: 'Hospitality', label: 'Hospitality' },
        { value: 'Information Technology', label: 'Information Technology' },
        { value: 'Insurance', label: 'Insurance' },
        { value: 'Internet', label: 'Internet' },
        { value: 'Journalism', label: 'Journalism' },
        { value: 'Legal', label: 'Legal' },
        { value: 'Logistics', label: 'Logistics' },
        { value: 'Manufacturing', label: 'Manufacturing' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Media', label: 'Media' },
        { value: 'Music', label: 'Music' },
        { value: 'Nonprofit', label: 'Nonprofit' },
        { value: 'Petroleum', label: 'Petroleum' },
        { value: 'Pharmaceutical', label: 'Pharmaceutical' },
        { value: 'Public Relations', label: 'Public Relations' },
        { value: 'Publishing', label: 'Publishing' },
        { value: 'Real Estate', label: 'Real Estate' },
        { value: 'Retail', label: 'Retail' },
        { value: 'Service', label: 'Service' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Telecommunications', label: 'Telecommunications' },
        { value: 'Tourism', label: 'Tourism' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Video Game', label: 'Video Game' },
        { value: 'Web Service', label: 'Web Service' },
    ];
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startupInputValue, setStartupInputValue] = useState({
        name: '',
        description: '',
        industry: [],
        amountNeeded: '',
        website: ''
    });

    const [investorInputValue, setInvestorInputValue] = useState({
        investAmount: '',
        interests: [],
    });

    const { name, description, industry, amountNeeded, website } = startupInputValue;
    const { investAmount, interests } = investorInputValue;

    const handleChange = (e) => {
        let setInputValue = null;
        let inputValue = null;
        if (user.user.role === "startup") {
            setInputValue = setStartupInputValue;
            inputValue = startupInputValue;
        }
        else {
            setInputValue = setInvestorInputValue;
            inputValue = investorInputValue;
        }

        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
    }

    const handleSuccess = (message) => {
        toast.success(message, {
            position: "bottom-right"
        });
    }

    const multiSelectChange = (val) => {
        setInvestorInputValue({
            ...investorInputValue,
            interests: val
        });
    }

    const multiSelectChangeStartup = (val) => {
        setStartupInputValue({
            ...startupInputValue,
            industry: val
        });
    }

    const handleFileChange = async (e) => {
        let file = e.target.files[0];
        let name = 'photo';

        const formData = new FormData();
        formData.append(name, file);
        const { data } = await axios.post(
            `http://localhost:4000/user/fileUpload`,
            formData,
            { withCredentials: true }
        );
        const { success, fileLink } = data;
        if (success) {
            if (user.user.role === "startup") {
                setStartupInputValue({
                    ...startupInputValue,
                    logo: fileLink
                });
            }
            else {
                setInvestorInputValue({
                    ...investorInputValue,
                    photo: fileLink
                });
            }
        }
    }

    useEffect(() => {
        const getUser = async () => {

            const response = await axios.post(
                `http://localhost:4000/user`, {
                email: props.userEmail
            },
                { withCredentials: true }
            ).catch((err) => {
                console.log(err);
                navigate("/login");
            });

            if (response) {
                setUser(response.data);

                if (response.data.user && response.data.user.role === "startup" && response.data.startup) {
                    setStartupInputValue({
                        ...startupInputValue,
                        name: response.data.startup.name,
                        description: response.data.startup.description,
                        industry: response.data.startup.industry ? response.data.startup.industry : [],
                        amountNeeded: response.data.startup.amountNeeded,
                        website: response.data.startup.website,
                    });
                }
                else if (response.data.user && response.data.user.role === "investor" && response.data.investor) {
                    setInvestorInputValue({
                        ...investorInputValue,
                        investAmount: response.data.investor.investAmount,
                        interests: response.data.investor.interests ? response.data.investor.interests : [],
                    });
                }

                setLoading(false);
            }
        };
        getUser();
    }, [props.userEmail, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let inputValue = {};
        let setInputValue = null;
        let endpoint = null;
        if (user.user.role === "startup") {
            inputValue = startupInputValue;
            setInputValue = setStartupInputValue;
            endpoint = "startup/update";
        }
        else {
            inputValue = investorInputValue;
            setInputValue = setInvestorInputValue;
            endpoint = "investor/update";
        }
        try {
            const { data } = await axios.post(
                `http://localhost:4000/user/${endpoint}`,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            setLoading(false);
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleError = (message) => {
        toast.error(message, {
            position: "bottom-left"
        });
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {user.user && user.user.role === "startup" ?
                <>
                    <Box as="section" bg="gray.800" color="white" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
                        <Flex align="center" justify="center" direction="column">
                            <Heading as="h1" size="lg" mb="2rem">{user.startup ? <>Edit Your Startup Profile</> : <>Complete Your Startup Profile</>}</Heading>
                            <form onSubmit={handleSubmit}>
                                <FormControl id="name" mb="1rem" isRequired>
                                    <FormLabel>Startup Name</FormLabel>
                                    <Input type="text" name="name" value={name} onChange={handleChange} />
                                </FormControl>
                                <FormControl id="description" mb="1rem" isRequired>
                                    <FormLabel>Startup Description</FormLabel>
                                    <Textarea type="text" name="description" value={description} onChange={handleChange} rows={5} />
                                </FormControl>
                                <FormControl id="logo" mb="1rem">
                                    <FormLabel>Startup Logo</FormLabel>
                                    <Input type="file" name="logo" sx={{
                                        "::file-selector-button": {
                                            height: 10,
                                            padding: 0,
                                            mr: 4,
                                            background: "none",
                                            border: "none",
                                            fontWeight: "bold",
                                        },
                                    }} onChange={handleFileChange} />
                                </FormControl>
                                <FormControl id="industry" mb="1rem" isRequired>
                                    <FormLabel>Startup Industry</FormLabel>
                                    <MultiSelect name="industry" value={industry} onChange={multiSelectChangeStartup} options={industryOptions} />
                                </FormControl>
                                <FormControl id="amountNeeded" mb="1rem" isRequired>
                                    <FormLabel>Amount Needed ($)</FormLabel>
                                    <Input type="text" name="amountNeeded" value={amountNeeded} onChange={handleChange} />
                                </FormControl>
                                <FormControl id="website" mb="1rem" isRequired>
                                    <FormLabel>Startup Website</FormLabel>
                                    <Input type="text" name="website" value={website} onChange={handleChange} />
                                </FormControl>
                                <Button type="submit" colorScheme="teal" isLoading={loading} loadingText="Submitting">
                                    Submit
                                </Button>
                            </form>
                        </Flex>
                    </Box>
                </>

                :

                <></>
            }

            {user.user && user.user.role === "investor" ?
                <>
                    <Box as="section" bg="gray.800" color="white" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
                        <Flex align="center" justify="center" direction="column">
                            <Heading as="h1" size="lg" mb="2rem">{user.investor ? <>Edit Your Investor Profile</> : <>Complete Your Investor Profile</>}</Heading>
                            <form onSubmit={handleSubmit}>
                                <FormControl id="investAmount" mb="1rem" isRequired={true}>
                                    <FormLabel>Investment Amount ($)</FormLabel>
                                    <Input type="number" name="investAmount" value={investAmount} onChange={handleChange} />
                                </FormControl>
                                <FormControl id="Interests" mb="1rem" isRequired={true}>
                                    <FormLabel>Interests</FormLabel>
                                    <MultiSelect name="interests" value={interests} onChange={multiSelectChange} options={industryOptions} />
                                </FormControl>
                                <FormControl id="photo" mb="1rem">
                                    <FormLabel>Photo</FormLabel>
                                    <Input type="file" name="photo" sx={{
                                        "::file-selector-button": {
                                            height: 10,
                                            padding: 0,
                                            mr: 4,
                                            background: "none",
                                            border: "none",
                                            fontWeight: "bold",
                                        },
                                    }} onChange={(e) => handleFileChange(e)} />
                                </FormControl>
                                <Button type="submit" colorScheme="teal" isLoading={loading} loadingText="Submitting">
                                    Submit
                                </Button>
                            </form>
                        </Flex>
                    </Box>
                </>
                :
                <></>
            }
        </>
    );
}

export default Profile;