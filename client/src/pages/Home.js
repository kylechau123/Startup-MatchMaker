import { Box, Heading, Text, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Slide from '../components/Slide';

const Home = (props) => {
    const user = props.user;

    setTimeout(() => {
        if (document.querySelector(".homeContainer")) document.querySelector(".homeContainer").style.display = "block";
    }, 1000);

    return (
        <>
            {user ?
                <>
                    <Box maxW="900px" mx="auto" textAlign="center">
                        <Slide userEmail={props.userEmail} />
                    </Box>
                </>

                :

                <></>
            }

            {!user ? <>
                <Box maxW="900px" mx="auto" textAlign="center" display="none" className="homeContainer">
                    <Heading as="h1" size="xl" mb={4}>
                        Startup Matchmaker: Find Your Perfect Business Match!
                    </Heading>
                    <Text fontSize="lg" mb={6}>
                        Are you an ambitious entrepreneur with a groundbreaking startup idea? Or
                        are you an experienced investor looking for promising ventures to
                        support? Look no further! Welcome to Startup Matchmaker, the ultimate
                        platform connecting entrepreneurs and investors for successful
                        collaborations.
                    </Text>
                    <Text fontSize="lg" mb={6}>
                        Startup Matchmaker is your go-to destination for discovering the perfect
                        business match. Whether you're seeking funding, mentorship, or valuable
                        connections, our platform simplifies the process by connecting you with
                        the right partners who share your vision and goals.
                    </Text>
                    <Text fontSize="lg" mb={6}>
                        Why choose Startup Matchmaker?
                    </Text>
                    <Accordion allowToggle mb={6}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Discover Opportunities
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Explore a diverse pool of startups and investors actively seeking partnerships. Our advanced matching algorithms ensure that you're presented with the most relevant and compatible opportunities.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Connect with Like-minded Individuals
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Connect with a community of driven entrepreneurs and seasoned investors who understand the startup landscape. Share ideas, collaborate, and build meaningful relationships with those who can help take your venture to new heights.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Tailored Recommendations
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Receive personalized recommendations based on your preferences, investment criteria, and business objectives. Our intelligent matching system analyzes your profile to deliver the most suitable matches for your specific needs.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Streamlined Communication
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Easily communicate with potential partners through our secure messaging system. Schedule meetings, exchange vital information, and make informed decisions about the right partnerships for your startup journey.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Track Your Progress
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Keep track of your interactions, partnerships, and investment opportunities all in one place. Our intuitive dashboard provides you with a comprehensive overview of your connections, allowing you to manage your networking efforts efficiently.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Text fontSize="lg" mb={6}>
                        Join Startup Matchmaker today and unlock endless possibilities for your
                        startup success. Let us help you find the perfect match to propel your
                        business forward. Together, we can transform your vision into reality!
                    </Text>
                    <Button colorScheme="teal" size="lg">
                        <Link to="/register">Sign up now!</Link>
                    </Button>
                </Box>
            </>
                :
                <></>
            }
        </>
    )
}

export default Home;