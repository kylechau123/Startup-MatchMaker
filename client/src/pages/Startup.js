import { Box, Heading, Card, CardHeader, CardBody, CardFooter, Text, Image, Tag, Link, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { numberWithCommas } from "../utils/utils";
import Loader from '../components/Loader';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { useQuery } from '@apollo/client';
import { GET_INVESTOR, GET_STARTUP_BY_ID } from '../utils/graphql';

const Startup = (props) => {
    const { id } = useParams();
    const [startup, setStartup] = useState({});
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [myInvestment, setMyInvestment] = useState(0);

    const { loading: queryLoading, data } = useQuery(GET_STARTUP_BY_ID, { variables: { id } });
    const { loading: queryLoading2, data: data2 } = useQuery(GET_INVESTOR);


    useEffect(() => {
        if (data && data2) {
            setStartup(data.startup2);

            let lk = false;
            if (data.startup2.likes.filter(l => l._id === data2.investor._id).length && data2.investor.likes.filter(l => l._id === data.startup2._id).length) {
                lk = true;
            }

            let investment = 0;
            data.startup2.backers.forEach(i => {
                if (i.investor._id === data2.investor._id) {
                    investment += parseFloat(i.amount);
                }
            })

            setMyInvestment(investment);

            setLiked(lk);

            setLoading(false);
        }
    }, [data, data2, liked]);

    if (loading || queryLoading || queryLoading2) {
        return <Loader />
    }

    return (
        startup &&
        <><Box maxWidth="900px" m='auto' mb={5}><RouterLink to="/" style={{ fontSize: '30px' }}> <AiOutlineArrowLeft /></RouterLink></Box>
            <Card bg="gray.800" color="white" p="2rem" m="auto" borderRadius={10} maxW="900px">
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
                    <Text my={5} display="flex" alignItems="center" gap={1}><AiFillHeart style={{ display: 'inline', fontSize: '20px' }} color='red' /> {startup.likes.length}</Text>
                    <Text whiteSpace="pre-wrap" mb={5}>{startup.description}</Text>
                    <Text fontSize='lg' fontWeight="bold">Amount Needed: <Box as='span' display="inline" color="teal">${startup.amountNeeded ? numberWithCommas(startup.amountNeeded) : ''}</Box></Text>
                    {myInvestment !== 0 ? <Text fontSize='md' fontWeight="bold" mt={5}>Your Investment in this startup: <Box as='span' display="inline" color="teal">${myInvestment ? numberWithCommas(myInvestment) : ''}</Box></Text> : ''}

                </CardBody>
                <CardFooter flexDirection="column">
                    <Text>Contact Person: {startup.user.username}</Text>
                    <Text>Email: <Link href={`mailto:${startup.user.email}`} > {startup.user.email} </Link></Text>
                    <Text>Website: <Link href={startup.website} > {startup.website} </Link></Text>

                    {startup && liked ? <>
                        <Text mt={5} mb={2} align="center"><Box as="span" color="teal" fontWeight={700}>{startup.name}</Box> and you have liked each other's profile so you can connect and fund them</Text>
                        <RouterLink to={`/connect/${startup.user._id}`} style={{ margin: 'auto', display: 'block', width: '60%' }}><Button colorScheme="teal" size="lg" m="auto" w="100%" mt={5}>Connect</Button></RouterLink>
                        <RouterLink to={`/fund/${startup._id}`} style={{ margin: 'auto', display: 'block', width: '60%' }}><Button colorScheme="teal" size="lg" m="auto" w="100%" mt={5}>Fund Startup</Button></RouterLink>
                    </> : <Text mt={5} mb={2} align="center"><Box as="span" color="teal">Note:</Box> To be able to connect and investment in this startup, you have to like them from the swipe screen. If they like you back, you'll be able to invest and connect with them.</Text>}
                </CardFooter>
            </Card >
        </>
    )
}

export default Startup;