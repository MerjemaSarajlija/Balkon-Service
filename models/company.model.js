const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


let CompanySchema = mongoose.Schema({
  companyName: {
        type: String,
        required: true,
        unique: true,
      },
  users: [{ type: ObjectId, ref: 'User', required: true}]
});

let Company = module.exports = mongoose.model('Company', CompanySchema);
