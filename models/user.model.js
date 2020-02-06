const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const { ThrowError, to } = require('../services/util.service');
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.ObjectId

let UserSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    required: true,
    validate: [validate({
      validator: 'isEmail',
      message: 'Not a valid email.',
    }),]
  },
  password: {
    type: String ,
    required: true
  },
  company: { type: ObjectId, ref: 'Company', required: true}

}, { timestamps: true });


UserSchema.pre('save', async function (next) {
if (this.isModified('password') || this.isNew) {

    let err, salt, hash;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) ThrowError(err.message, true);

    [err, hash] = await to(bcrypt.hash(this.password, salt));
    if (err) ThrowError(err.message, true);

    this.password = hash;

  } else {
    return next();
  }
})

UserSchema.methods.comparePassword = async function (pw) {
  let err, pass;
  if (!this.password) ThrowError('password not set');

  [err, pass] = await to(bcrypt_p.compare(pw, this.password));

  if (err) ThrowError(err);
  if (!pass) ThrowError('invalid password');

  return this;
}

UserSchema.methods.getJWT = function () {
  let expiration_time = parseInt(CONFIG.jwt_expiration);
  return "Bearer " + jwt.sign({ user_id: this._id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
};

UserSchema.methods.toWeb = function () {
  let json = this.toJSON();
  json.id = this._id;
  delete json.createdAt
  delete json.updatedAt
  delete json.__v
  delete json._id
  delete json.password
  return json;
};

let User = module.exports = mongoose.model('User', UserSchema);
