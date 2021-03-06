const {to} = require('await-to-js');
const parseError = require('parse-error');

module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if(err) return [parseError(err)];

    return [null, res];
};

module.exports.RespondError = function(res, err, code){
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json({success:false, error: err});
};

module.exports.RespondSuccess = function(res, data, code){
    let send_data = {success:true};

    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

module.exports.ThrowError = ThrowError = function(err_message, log){
    if(log === true){
        console.error(err_message);
    }

    throw new Error(err_message);
};
