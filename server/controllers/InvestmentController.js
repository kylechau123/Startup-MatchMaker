import Investor from "../models/Investor.js";
import Startup from "../models/Startup.js";


const addInvestment = async (startupId, investorId, amount) => {
    const startup = await Startup.findOne({ _id: startupId });
    const investor = await Investor.findOne({ _id: investorId });
    if (startup.amountNeeded > 0) {
        startup.amountNeeded -= amount;
        startup.backers.push({ investor: investorId, amount: amount });
        await startup.save();
        investor.investments.push({ startup: startupId, amount: amount });
        await investor.save();
        return { success: true, message: "Investment successful" };
    }
    else {
        return { success: false, message: "Investment unsuccessful" };
    }
}

const checkAmount = async (startupId, amount) => {
    const startup = await Startup.findOne({ _id: startupId });
    if (startup.amountNeeded <= amount) {
        return { success: true, message: "Investment successful" };
    }
    else {
        return { success: false, message: "Investment unsuccessful" };
    }
}

export { addInvestment, checkAmount }