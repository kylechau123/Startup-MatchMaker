const {Schema, model} = require ('mongoose');
const bcrypt = require('bcrypt');

const investorSchema = new Schema({ 
    email: {
        type: String,
        required: true,
        match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    startups: [{
        type: Schema.Types.ObjectId,
        ref: "Startup"
    }],
});

investorSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  investorSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

const Investor = model("Investor", investorSchema);

module.exports = Investor;