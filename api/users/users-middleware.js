// Imports
const Users = require('./users-model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./secrets');

// Middleware
const checkUser = async (req, res, next) => {
	const { username } = req.body;
	const user = await Users.getBy({ username });

	if (user) {
		req.user = user;
		next();
	} else {
		next({ status: 401, message: 'Are you sure you are related?'});
	}
};

const restricted = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, JWT_SECRET, (err) => {
			if (err) {
				next({ status: 401, message: 'Invalid token.' });
			} else {
				next();
			}
		})
	} else {
		next({ status: 401, message: 'Token required.' });
	}
};

// Exports
module.exports = {
	checkUser,
	restricted
}