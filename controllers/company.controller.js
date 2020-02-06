const { to, RespondError, RespondSuccess } = require('../services/util.service');
const Company = require('../models/company.model');


const createCompany = async function (req, res) {
    let result, error;

    [error, result] = await to(Company.create({ companyName: req.body.companyName }));
    if (error) {
        RespondError(res, error)
    }
    RespondSuccess(res, { "message": "Created company", "company" : result })
};
module.exports.createCompany = createCompany
