import { Box, Heading, Card, CardHeader, CardBody, CardFooter, Image, FormControl, Input, FormLabel } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Loader from '../components/Loader';
import { useQuery } from '@apollo/client';
import { GET_STARTUP_BY_ID, GET_INVESTOR } from '../utils/graphql';
import Stripe from "react-stripe-checkout";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Fund = (props) => {
    const { id } = useParams();
    const [amount, setAmount] = useState(100);
    const [startup, setStartup] = useState('');
    const { loading: queryLoading, data } = useQuery(GET_STARTUP_BY_ID, { variables: { id } });
    const { loading: queryLoading2, data: data2 } = useQuery(GET_INVESTOR);
    const [investor, setInvestor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data2) {
            setStartup(data.startup2);
            setInvestor(data2.investor);
        }
    }, [data, data2]);

    if (queryLoading || !startup || queryLoading2) {
        return <Loader />
    }

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    const handleToken = (token) => {
        try {
            axios.post("http://localhost:4000/payment", {
                token,
                amount: amount,
                startupId: startup._id,
                investorId: investor._id
            }).then((response) => {
                const { data } = response;
                if (data.success) {
                    toast.success("Payment Successful");
                    navigate(`/startup/${startup._id}`);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        startup && <><Box maxWidth="900px" m='auto' mb={5}><RouterLink to="/" style={{ fontSize: '30px' }}> <AiOutlineArrowLeft /></RouterLink></Box>
            <Card bg="gray.800" color="white" p="2rem" m="auto" borderRadius={10} maxW="900px">
                <CardHeader>
                    {startup.logo && <Image src={startup.logo} alt={startup.name} w="30%" m="auto" mb={5} />}
                    <Heading as="h1" size="lg" color="teal" textAlign="center">Invest in {startup.name}</Heading>
                </CardHeader>
                <CardBody>

                    <FormControl id="amount" mb={5}>
                        <FormLabel>How much would like to invest? (Max: {numberWithCommas(startup.amountNeeded)})</FormLabel>
                        <Input type="number" placeholder="Amount" value={amount} onChange={handleAmount} max={startup ? startup.amountNeeded : ''} />
                    </FormControl>
                    <Stripe
                        stripeKey='pk_test_51NQFMfHcWPUXand3xatZWBwj0mHp20bPkvsUN7v0BLetWQoMkiBIIg4YVnJaMpPtQHgwISy6bEDWILJmkRozSC4q00HINSKwHY'
                        token={handleToken}
                        name={startup.name}
                        amount={amount * 100}
                        currency="USD"
                    />
                </CardBody>
                <CardFooter flexDirection="column">

                </CardFooter>
            </Card >
        </>
    )
}

export default Fund;