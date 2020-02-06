const { User } = require('../models');
const validator = require('validator');
const { to, ThrowError } = require('../services/util.service');

const createUser = async function (userInfo) {
  let auth_info, err;

  auth_info = {}
  auth_info.status = 'create';

  if (!userInfo.email) ThrowError('An email was not entered: ', userInfo);

  if (validator.isEmail(userInfo.email)) {

    [err, user] = await to(User.create(userInfo));
    if (err) ThrowError(err.message);

    return user;
  } else {
    ThrowError('A valid email was not entered.');
  }
}
module.exports.createUser = createUser;

const authUser = async function (userInfo) {
  let auth_info = {};
  auth_info.status = 'login';

  if (!userInfo.email) ThrowError('Please enter an email to login');
  if (!userInfo.password) ThrowError('Please enter a password to login');

  let user;
  if (validator.isEmail(userInfo.email)) {
    auth_info.method = 'email';

    [err, user] = await to(User.findOne({ email: userInfo.email }));
    if (err) ThrowError(err.message);

  } else {
    ThrowError('A valid email was not entered');
  }

  if (!user) ThrowError('Not registered');

  [err, user] = await to(user.comparePassword(userInfo.password));

  if (err) ThrowError(err.message);

  return user;
}
module.exports.authUser = authUser;
