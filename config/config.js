require('dotenv').config();

let CONFIG = {}

CONFIG.app              = process.env.APP             || 'development';
CONFIG.port             = process.env.PORT            || '3000';
CONFIG.db_type          = process.env.DB_TYPE         || 'mongo';
CONFIG.db_host          = process.env.DB_HOST         || 'localhost';
CONFIG.db_port          = process.env.DB_PORT         || '27017';
CONFIG.db_name          = process.env.DB_NAME         || 'balkondb';
CONFIG.db_user          = process.env.DB_USER         || 'root';
CONFIG.db_password      = process.env.DB_PASSWORD     || '';
CONFIG.jwt_encryption   = process.env.JWT_ENCRYPTION  || 'Don`t use this create .env variable!';
CONFIG.jwt_expiration   = process.env.JWT_EXPIRATION  || '10000';

module.exports = CONFIG;
