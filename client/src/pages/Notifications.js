import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Notification from "../components/Notification";
import { toast } from 'react-toastify';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/user/notifications", { withCredentials: true }).then((res) => {
            const { data } = res;
            if (data.success) {
                setNotifications(data.notifications);
            }
            else {
                console.log(data.message);
                toast.error(data.message, {
                    position: "bottom-left"
                });
            }
        }).catch((err) => {
            console.log(err.message);
            toast.error(err.message, {
                position: "bottom-left"
            });
        });
    }, []);



    return (
        notifications && notifications.length > 0 ?
            <Box as="section" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
                <Heading as="h2" textAlign="center" mb="2rem">Notifications</Heading>
                {notifications.map((notification) => {
                    return <Notification key={notification._id} notification={notification} />
                })}
            </Box>
            :
            <Box as="section" p="2rem" maxWidth={600} m="auto" borderRadius={10}>
                <Heading as="h2" textAlign="center" mb="2rem">No Notifications</Heading>
            </Box>
    )
}

export default Notifications;