const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

let ContactSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String
    },
    company: { type: ObjectId, ref: 'Company', required: true}
  }, { timestamps: true });

  let Contact = module.exports = mongoose.model('Contact', ContactSchema);

  