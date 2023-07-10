import { Box, Card, CardBody, CardHeader, CardFooter, Heading, Image, Text, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const InvestorCard = (props) => {
    const investor = props.investor;

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mx="auto" maxW={500} maxHeight={700} className="smcard" id={investor._id}>
            <Box p="6">
                <Image src={investor.photo} alt={investor.user.username} mx="auto" w="30%" my={5} />
                <Box d="flex" alignItems="baseline">
                    {investor.interests.map((interest, index) => (
                        <Text
                            key={index}
                            textTransform="uppercase"
                            fontSize="sm"
                            letterSpacing="wide"
                            color="teal.600"
                            fontWeight="bold"
                            ml="2"
                        >
                            {interest}
                        </Text>
                    ))
                    }
                </Box>

                <Card>
                    <CardHeader>
                        <Heading as="h3" size="md">
                            {investor.user.username}
                        </Heading>
                    </CardHeader>

                    <CardBody>
                        <Text fontSize="md" color="teal">
                            Looking to Invest: ${numberWithCommas(investor.investAmount)}
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Link to={`/investor/${investor._id}`} style={{ margin: 'auto' }}>
                            <Button colorScheme="teal" size="md" m="auto">
                                View Investor
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </Box>
        </Box>
    );
};

export default InvestorCard;