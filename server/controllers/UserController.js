import User from "../models/User.js";
import Startup from "../models/Startup.js";
import Investor from "../models/Investor.js";
import Notification from "../models/Notification.js";


const getReleventProfile = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select("-__v");
        if (user) {
            // remove password
            user.password = undefined;
            if (user.role === "startup") {
                const startup = await Startup.findOne({ user: user._id }).select("-__v");
                return res.json({ user, startup });
            } else if (user.role === "investor") {
                const investor = await Investor.findOne({ user: user._id }).select("-__v");
                return res.json({ user, investor });
            }
            else {
                return res.json({ error: "User not found" });
            }
        }
        else {
            return res.json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
    }
};

const getCards = async (req, res) => {
    const user = res.locals.user;
    try {
        if (user.role === "startup") {
            // get investors whose intersets match startup's industry
            const startup = await Startup.findOne({ user: user._id });
            const investors = await Investor.find({ interests: { $in: startup.industry } }).populate({
                path: "user",
                select: "-__v",
            }).select("-__v");
            return res.json({
                success: true,
                role: user.role,
                cards: investors,
            });
        }
        else if (user.role === "investor") {
            // get startups whose industry matches investor's interests
            const investor = await Investor.findOne({ user: user._id });
            const startups = await Startup.find({ industry: { $in: investor.interests } }).select("-__v");
            return res.json({
                success: true,
                role: user.role,
                cards: startups,
            });
        }
    } catch (error) {
        console.error(error);
        res.json({ message: "Something went wrong", success: false });
    }
}

const addLike = async (req, res) => {
    const cardId = req.params.id;
    const user = res.locals.user;
    try {
        if (user.role === "startup") {
            const startup = await Startup.findOne({ user: user._id });
            if (!startup.likes.includes(cardId)) {
                startup.likes.push(cardId);
                await startup.save();
                const investor = await Investor.findOne({ _id: cardId }).populate({
                    path: "user",
                    select: "-__v",
                });
                const notification = new Notification({
                    message: `${startup.name} liked your profile`,
                    link: `/startup/${startup._id}`,
                });

                await notification.save();

                investor.user.notifications.push(notification._id);

                await investor.user.save();

                return res.json({ success: true, message: `You liked ${investor.user.username}'s profile` });
            }
            else {
                return res.json({ success: false, message: "You already liked this profile" });
            }
        }
        else if (user.role === "investor") {
            let investor = await Investor.findOne({ user: user._id });
            await investor.save();
            if (!investor.likes.includes(cardId)) {
                investor.likes.push(cardId);
                await investor.save();
                const startup = await Startup.findOne({ _id: cardId }).populate({
                    path: "user",
                    select: "-__v",
                });

                investor = await Investor.findOne({ user: user._id }).populate({
                    path: "user",
                    select: "-__v",
                });
                const notification = new Notification({
                    message: `${investor.user.username} liked your profile`,
                    link: `/investor/${investor._id}`,
                });

                await notification.save();

                startup.user.notifications.push(notification._id);

                await startup.user.save();

                return res.json({ success: true, message: `You liked ${startup.name}'s profile` });
            }
            else {
                return res.json({ success: false, message: "You already liked this profile" });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.json({ message: "Something went wrong", success: false });
    }
}

export { getReleventProfile, getCards, addLike };