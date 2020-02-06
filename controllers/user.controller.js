const authService = require('../services/auth.service');
const { to, RespondError, RespondSuccess } = require('../services/util.service');

const signup = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;
  if (!body.email) {
    return RespondError(res, 'Please enter an email to register: ');
  } else if (!body.password) {
    return RespondError(res, 'Please enter a password to register.');
  } else {
    let err, user;

    [err, user] = await to(authService.createUser(body));

    if (err) return RespondError(res, err, 422);
    return RespondSuccess(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
  }
}
module.exports.signup = signup;

const signin = async function (req, res) {
  const body = req.body;
  let err, user;

  [err, user] = await to(authService.authUser(body));
  if (err) return RespondError(res, err, 422);

  return RespondSuccess(res, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.signin = signin;

const getUserById = async function (req, res) {
}
module.exports.getUserById = getUserById;

const me = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let user = req.user;

  return RespondSuccess(res, { user: user.toWeb() });
}
module.exports.me = me;

const updatePassword = async function (req, res) {
  let err
  var user
  user = req.user;
  user.password = req.body.password

  [err, user] = await to(user.save());
  if (err) {
    return RespondError(res, err);
  }
  return RespondSuccess(res, { message: 'Updated User: ' + user.email });
}
module.exports.updatePassword = updatePassword;
