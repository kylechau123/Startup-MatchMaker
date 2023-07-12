import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Loader from '../components/Loader';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const GET_NOTIFICATIONS = gql`
    query {
        notifications {
            _id
            message
            link
            createdAt
        }
    }
    `;

    const { loading: queryLoading, data } = useQuery(GET_NOTIFICATIONS);

    useEffect(() => {
        if (data) {
            setNotifications(data.notifications);
        }
    }, [data]);

    if (queryLoading) return <Loader />;



    return (
        notifications && notifications.length > 0 ?
            <><Box maxWidth={600} m='auto' mb={5}><Link to="/" style={{ fontSize: '30px' }}> <AiOutlineArrowLeft /></Link></Box>
                <Box as="section" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
                    <Heading as="h2" textAlign="center" mb="2rem">Notifications</Heading>
                    {notifications.map((notification) => {
                        return <Notification key={notification._id} notification={notification} />
                    })}
                </Box>
            </>
            :
            <><Box maxWidth={600} m='auto' mb={5}><Link to="/" style={{ fontSize: '30px' }}> <AiOutlineArrowLeft /></Link></Box>
                <Box as="section" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
                    <Heading as="h2" textAlign="center" mb="2rem">No Notifications</Heading>
                </Box>
            </>
    )
}

export default Notifications;