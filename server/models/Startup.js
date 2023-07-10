const {Schema, model} = require ('mongoose');
const bcrypt = require('bcrypt');

const startupSchema = new Schema({ 
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    },
    phoneNum: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

startupSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  startupSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

const Startup = model("Startup", startupSchema);

module.exports = Startup;