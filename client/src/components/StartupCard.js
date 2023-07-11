import { Box, Card, CardBody, CardHeader, CardFooter, Heading, Image, Text, Button } from "@chakra-ui/react";
import { numberWithCommas } from "../utils/utils";
import { Link } from 'react-router-dom';

const StartupCard = (props) => {
    const startup = props.startup;

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mx="auto" maxW={500} maxHeight={700} className="smcard" id={startup._id}>
            <Box p="6">
                <Image src={startup.logo} alt={startup.name} mx="auto" w="30%" my={5} />
                <Box d="flex" alignItems="baseline">
                    {startup.industry.map((industry, index) => (
                        <Text
                            key={index}
                            textTransform="uppercase"
                            fontSize="sm"
                            letterSpacing="wide"
                            color="teal.600"
                            fontWeight="bold"
                            ml="2"
                        >
                            {industry}
                        </Text>
                    ))
                    }
                </Box>

                <Card>
                    <CardHeader>
                        <Heading as="h3" size="md" mb={2}>
                            {startup.name}
                        </Heading>
                    </CardHeader>

                    <CardBody>
                        <Text fontSize="sm" mb={2}>
                            {startup.description.substring(0, 200)}...
                        </Text>

                        <Text fontSize="md" mt={3} color="teal">
                            Amount Needed: ${numberWithCommas(startup.amountNeeded)}
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Link to={`/startup/${startup._id}`} style={{ margin: 'auto' }}>
                            <Button colorScheme="teal" size="md" m="auto">
                                View Startup
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </Box>
        </Box>
    );
};

export default StartupCard;