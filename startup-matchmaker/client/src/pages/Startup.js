import { Box, Heading, Card, CardHeader, CardBody, CardFooter, Text, Image, Tag, Link, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { numberWithCommas } from "../utils/utils";
import Loader from '../components/Loader';

const Startup = (props) => {
    const { id } = useParams();
    const [startup, setStartup] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`http://localhost:4000/user/startup/${id}`, { withCredentials: true }).then((res) => {
            const { data } = res;
            if (data.success) {
                setStartup(data.startup);
            }
            else {
                toast.error(res.message, {
                    position: "bottom-left"
                });
            }
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong", {
                position: "bottom-left"
            });
        });
    }, [id]);

    if (loading) {
        return <Loader />
    }

    return (
        startup.name &&
        <Card bg="gray.800" color="white" p="2rem" maxWidth={600} m="auto" borderRadius={10} maxW="900px">
            <CardHeader>
                <Image src={startup.logo} alt={startup.name} w="30%" m="auto" mb={5} />
                <Heading as="h1" size="lg" color="teal" textAlign="center">{startup.name}</Heading>
            </CardHeader>
            <CardBody>
                <Box mb={5}>
                    {startup.industry &&
                        startup.industry.map((industry, index) => {
                            return (
                                <Tag key={index} colorScheme="teal" mr={2}>{industry}</Tag>
                            )
                        })
                    }
                </Box>
                <Text whiteSpace="pre-wrap" mb={5}>{startup.description}</Text>
                <Text fontSize='lg' fontWeight="bold">Amount Needed: <Box as='span' display="inline" color="teal">${startup.amountNeeded ? numberWithCommas(startup.amountNeeded) : ''}</Box></Text>
            </CardBody>
            <CardFooter flexDirection="column">
                <Text>Contact Person: {startup.user.username}</Text>
                <Text>Email: <Link href={`mailto:${startup.user.email}`} > {startup.user.email} </Link></Text>
                <Text>Website: <Link href={startup.website} > {startup.website} </Link></Text>

                <Link href={`/connect/${id}`} m="auto" w="60%" mt={5}><Button colorScheme="teal" size="lg" w="100%">Connect</Button></Link>
            </CardFooter>
        </Card >
    )
}

export default Startup;