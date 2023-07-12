import { Card, CardBody, Image, Heading, Text, Flex } from "@chakra-ui/react";
import { GET_INVESTOR } from '../utils/graphql';
import { useQuery } from '@apollo/client';
import Loader from '../components/Loader';


const MyInvestments = (props) => {
    const { loading, data } = useQuery(GET_INVESTOR);

    if (loading) {
        return <Loader />
    }

    return (
        data && data.investor.investments.length > 0 ?
            <Card bg="gray.800" color="white" p="2rem" m="auto" borderRadius={10} maxW="900px">
                <Heading as="h1" size="lg" color="white" textAlign="center">My Investments</Heading>
                <CardBody>
                    {data.investor.investments.map((i, idx) => (
                        <Card key={idx} bg="gray.700" color="white" p="1rem" m="auto" borderRadius={10} maxW="900px" mb={5}>
                            <Flex justifyContent="space-between" alignItems="center">
                                <Image src={i.startup.logo} alt={i.startup.name} />
                                <Heading as="h1" size="lg" color="teal" textAlign="center">{i.startup.name}</Heading>
                                <Text fontSize="xl" textAlign="center">You invested <Text as="span" color="teal" fontWeight="bold">${i.amount}</Text></Text>
                            </Flex>
                        </Card>
                    ))}
                </CardBody>
            </Card>
            :
            <Heading as="h1" size="lg" textAlign="center">You have not invested in any startups yet.</Heading>
    )
}

export default MyInvestments;