const express = require('express');
const UserController = require('../controllers/user.controller');
const ContactController = require('../controllers/contact.controller');
const CompanyController = require('../controllers/company.controller');
const passport = require('passport');
const router = express.Router();

require('./../middleware/passport')(passport)

router.get('/', function (req, res, next) {
  res.json({ status: "success", data: { "version_number": "v0.1.0" } })
});

router.post('/accounts/signup', UserController.signup);
router.post('/accounts/signin', UserController.signin);
router.get('/accounts/me', passport.authenticate('jwt', { session: false }), UserController.me)
router.patch('/accounts/me/updatePassword', passport.authenticate('jwt', { session: false }), UserController.updatePassword)
router.post('/company/create', CompanyController.createCompany)
router.post('/contact/create', passport.authenticate('jwt', { session: false }), ContactController.createContact);
router.get('/contact/get', passport.authenticate('jwt', { session: false }), ContactController.getContact);
router.delete('/contact/delete/:id', passport.authenticate('jwt', { session: false }), ContactController.deleteContact);
router.post('/contact/edit/:id', passport.authenticate('jwt', { session: false }), ContactController.editContact);

module.exports = router;

