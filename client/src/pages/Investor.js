import { Box, Heading, Card, CardHeader, CardBody, CardFooter, Text, Image, Tag, Link, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { numberWithCommas } from "../utils/utils";
import Loader from '../components/Loader';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { useQuery } from '@apollo/client';
import { GET_INVESTOR_BY_ID, GET_STARTUP } from '../utils/graphql';


const Investor = (props) => {
    const { id } = useParams();
    const [investor, setInvestor] = useState({});
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);


    const { loading: queryLoading, data } = useQuery(GET_INVESTOR_BY_ID, { variables: { id } });
    const { loading: queryLoading2, data: data2 } = useQuery(GET_STARTUP);

    useEffect(() => {
        if (data && data2) {
            setInvestor(data.investor2);

            let lk = false;
            if (data.investor2.likes.filter(l => l._id === data2.startup._id).length && data2.startup.likes.filter(l => l._id === data.investor2._id).length) {
                lk = true;
            }

            setLiked(lk);

            setLoading(false);
        }
    }, [data, data2, liked]);

    if (loading || queryLoading || queryLoading2) {
        return <Loader />
    }

    return (
        investor &&
        <><Box maxWidth="900px" m='auto' mb={5}><RouterLink to="/" style={{ fontSize: '30px' }}> <AiOutlineArrowLeft /></RouterLink></Box>
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
                    <Text my={5} display="flex" alignItems="center" gap={1}><AiFillHeart style={{ display: 'inline', fontSize: '20px' }} color='red' /> {investor.likes.length}</Text>
                    <Text fontSize='lg' fontWeight="bold" mb={5}>Total Investment Available: <Box as='span' display="inline" color="teal">${investor.investAmount ? numberWithCommas(investor.investAmount) : ''}</Box></Text>
                    <Text>Email: <Link href={`mailto: ${investor.user.email}`} > {investor.user.email} </Link></Text>
                </CardBody>
                <CardFooter flexDirection="column">
                    {investor && liked ? <>
                        <Text mt={5} mb={2} align="center"><Box as="span" color="teal" fontWeight={700}>{investor.user.username}</Box> and you have liked each other's profile so you can connect with them</Text>
                        <RouterLink to={`/connect/${investor.user._id} `} style={{ margin: 'auto', display: 'block', width: '60%' }}><Button colorScheme="teal" size="lg" m="auto" w="100%" mt={5}>Connect</Button></RouterLink>
                    </> : <Text mt={5} mb={2} align="center"><Box as="span" color="teal">Note:</Box> To be able to connect with this investor, you have to like them from the swipe screen. If they like you back, you'll be able to connect and receive funding from them.</Text>}
                </CardFooter>
            </Card >
        </>
    )
}

export default Investor;