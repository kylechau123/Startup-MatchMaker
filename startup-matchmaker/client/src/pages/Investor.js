import { Box, Heading, Card, CardHeader, CardBody, CardFooter, Text, Image, Tag, Link, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { numberWithCommas } from "../utils/utils";
import Loader from '../components/Loader';

const Investor = (props) => {
    const { id } = useParams();
    const [investor, setInvestor] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`http://localhost:4000/user/investor/${id}`, { withCredentials: true }).then((res) => {
            const { data } = res;
            if (data.success) {
                setInvestor(data.investor);
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
        investor.investAmount &&
        <Card bg="gray.800" color="white" p="2rem" maxWidth={600} m="auto" borderRadius={10} maxW="900px">
            <CardHeader>
                <Image src={investor.photo} alt={investor.user.username} w="30%" m="auto" mb={5} />
                <Heading as="h1" size="lg" color="teal" textAlign="center">{investor.user.username}</Heading>
            </CardHeader>
            <CardBody>
                <Text whiteSpace="pre-wrap" mb={5}>Interested In: </Text>
                <Box mb={5}>
                    {investor.interests &&
                        investor.interests.map((interest, index) => {
                            return (
                                <Tag key={index} colorScheme="teal" mr={2}>{interest}</Tag>
                            )
                        })
                    }
                </Box>
                <Text fontSize='lg' fontWeight="bold" mb={5}>Total Investment Available: <Box as='span' display="inline" color="teal">${investor.investAmount ? numberWithCommas(investor.investAmount) : ''}</Box></Text>
                <Text>Email: <Link href={`mailto:${investor.user.email}`} > {investor.user.email} </Link></Text>
            </CardBody>
            <CardFooter>
                <Link href={`/connect/${id}`} m="auto" w="60%"><Button colorScheme="teal" size="lg" w="100%">Connect</Button></Link>
            </CardFooter>
        </Card >
    )
}

export default Investor;