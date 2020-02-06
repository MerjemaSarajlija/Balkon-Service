const { to, RespondError, RespondSuccess } = require('../services/util.service');
const Contact = require('../models/contact.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createContact = async function (req, res) {
    let result, error;
    req.body.company = req.user.company;
    [error, result] = await to(Contact.create(req.body));
    if (error) {
        RespondError(res, error)
    }
    RespondSuccess(res, { "message": "Created contact", "company": result })
};
module.exports.createContact = createContact

const getContact = async function (req, res) {
    let result, error;
    req.body.company = req.user.company;
    [error, result] = await to(Contact.find(req.body).where('company').equals(req.body.company));
    if (error) {
        RespondError(res, error)
    }
    RespondSuccess(res, { "message": "contacts", "contacts": result })
};
module.exports.getContact = getContact

const deleteContact = async function (req, res) {
    var id = req.params.id;
    let result, error;
    [error, result] = await to(Contact.deleteOne({ _id: ObjectId(id) }));
    if (error) {
        RespondError(res, error)
    }
    RespondSuccess(res, { "message": "Deleted Contact", "contact": result })
};
module.exports.deleteContact = deleteContact

const editContact = async function (req, res) {
    let result, error;
    let contact = {}
    contact.firstName = req.body.firstName;
    contact.secondName = req.body.secondName;
    contact.phone = req.body.phone;
    contact.address = req.body.address;
    contact.note = req.body.note;
    let query = {_id : req.params.id};
    [error, result] = await to(Contact.update(query, contact));
    if (error) {
        RespondError(res, error)
    }
    RespondSuccess(res, { "message": "Edited contact", "contact": result })
};
module.exports.editContact = editContact













