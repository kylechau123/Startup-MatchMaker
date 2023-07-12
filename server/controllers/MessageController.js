import Thread from "../models/Thread.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";


const getThread = async (data) => {
    try {
        if (!data.userEmail || !data.user2Email) return console.log("No user email or user2 email");
        const user1Email = data.userEmail;
        const user2Email = data.user2Email;
        const user1 = await User.findOne({ email: user1Email });
        const user2 = await User.findOne({ email: user2Email });
        const thread = await Thread.findOne({ $or: [{ user1: user1._id, user2: user2._id }, { user1: user2._id, user2: user1._id }] }).populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: 'email'
            },
            sort: { createdAt: -1 }
        });
        if (thread) {
            return thread.messages;
        } else {
            return [];
        }
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

const saveMessage = async ({ userEmail, user2Email, message }) => {
    try {
        const user1 = await User.findOne({ email: userEmail });
        const user2 = await User.findOne({ email: user2Email });
        const thread = await Thread.findOne({ $or: [{ user1: user1._id, user2: user2._id }, { user1: user2._id, user2: user1._id }] });
        if (thread) {
            const newMessage = new Message({
                sender: user1._id,
                text: message
            });
            await newMessage.save();
            thread.messages.push(newMessage._id);
            await thread.save();

            const curMsg = await Message.findOne({ _id: newMessage._id }).populate({
                path: 'sender',
                select: 'email'
            });

            const notification = new Notification({
                user: user2._id,
                message: `${user1.username} sent you a message`,
                link: `/connect/${user1._id}`
            });

            notification.save();

            user2.notifications.push(notification._id);

            await user2.save();

            return curMsg;
        } else {
            const newThread = new Thread({
                user1: user1._id,
                user2: user2._id,
                messages: []
            });
            const newMessage = new Message({
                sender: user1._id,
                text: message
            });
            await newMessage.save();
            newThread.messages.push(newMessage._id);
            await newThread.save();

            const curMsg = await Message.findOne({ _id: newMessage._id }).populate({
                path: 'sender',
                select: 'email'
            });

            const notification = new Notification({
                user: user2._id,
                message: `${user1.username} sent you a message`,
                link: `/connect/${user1._id}`
            });

            notification.save();

            user2.notifications.push(notification._id);
            await user2.save();

            return curMsg;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export { getThread, saveMessage }