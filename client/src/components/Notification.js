import { Card, CardBody, Text, Button } from "@chakra-ui/react";
import { IoIosNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Notification = (props) => {
    const { message, link, createdAt } = props.notification;
    return (
        <Link to={link}>
            <Card borderRadius="md"
                boxShadow="md"
                transition="transform 0.3s" _hover={{ transform: 'scale(1.05)' }} mb={3}>
                <CardBody display="flex" gap={5} alignItems="center" justifyContent="space-between">
                    <IoIosNotifications style={{ fontSize: '22px' }} /> <Text fontSize="md"> {message} </Text>
                    <Text fontSize="sm" color="gray.500" alignSelf="flex-end"> {new Date(parseInt(createdAt)).toLocaleString()} </Text>
                </CardBody>
            </Card>
        </Link>
    );
}

export default Notification;